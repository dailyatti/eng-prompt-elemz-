import React, { useState } from 'react';
import { X, Upload, Sparkles, Zap, Image as ImageIcon, Key, Loader2, Clipboard, Eye, EyeOff } from 'lucide-react';
import { useApiKey } from '../hooks/useLocalStorage';
import { sportsCategories } from '../data/sportsData';
import { matchPromptGenerator, MatchData } from '../utils/matchPromptGenerator';

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (matches: any[], sport: string, images?: File[]) => void;
  darkMode?: boolean;
}

export function AIGenerationModal({ isOpen, onClose, onGenerate, darkMode }: AIGenerationModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  
  const { apiKey, isValid, saveApiKey, clearApiKey, validateApiKey } = useApiKey();

  // Use complete sports list from sportsData
  const availableSports = sportsCategories;

  // Handle clipboard paste
  React.useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (!isOpen) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            handleImageUpload(blob);
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  // Initialize temp API key when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setTempApiKey(apiKey);
      setApiKeyError('');
    }
  }, [isOpen, apiKey]);

  const handleImageUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedImages((prev: File[]) => [...prev, file]);
    }
  };

  const handleMultipleImageUpload = (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    setSelectedImages((prev: File[]) => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev: File[]) => prev.filter((_: File, i: number) => i !== index));
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleMultipleImageUpload(e.dataTransfer.files);
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:image/jpeg;base64, prefix for OpenAI API
        const base64 = result.split(',')[1];
        resolve(`data:image/jpeg;base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleApiKeySave = () => {
    const valid = saveApiKey(tempApiKey);
    if (valid) {
      setApiKeyError('');
    } else {
      setApiKeyError('Invalid API key format. Must start with "sk-" and be at least 20 characters long.');
    }
  };

  const handleApiKeyClear = () => {
    clearApiKey();
    setTempApiKey('');
    setApiKeyError('');
  };

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        const maxSize = 1024;
        let { width, height } = img;
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          } else {
            resolve(file);
          }
        }, file.type, 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const extractMatchesFromImages = async (base64Images: string[], apiKey: string, sport: string) => {
    console.log(`🔍 Extracting matches from ${base64Images.length} images for ${sport}`);
    
    const allMatches: any[] = [];
    
    for (let i = 0; i < base64Images.length; i++) {
      const image = base64Images[i];
      console.log(`📸 Processing image ${i + 1}/${base64Images.length}`);
      
      const prompt = `CRITICAL: Analyze this sports betting image and extract ALL matches and their odds data. You MUST find and extract EVERY single match visible in the image.

**SPORT:** ${sport}

**CRITICAL EXTRACTION REQUIREMENTS:**
1. 🔍 SCAN THE ENTIRE IMAGE - Look in every corner, section, and area
2. 📋 FIND ALL MATCHES - There may be 1, 2, 3, 4, 5, 6, or more matches visible
3. 📊 EXTRACT COMPLETE DATA - Get all match details and odds for each match
4. ✅ DO NOT MISS ANY MATCHES - If you see multiple matches, extract ALL of them
5. 🔄 LOOK FOR SCROLLABLE CONTENT - Check if there are more matches below or above
6. 📱 CHECK ALL SECTIONS - Look for tabs, categories, or different pages
7. 🎯 BE THOROUGH - If you see ANY team names, create a match entry

**VISUAL SCANNING INSTRUCTIONS:**
- Look at the top, middle, and bottom of the image
- Check all sections, tabs, or panels
- Look for match lists, fixtures, or schedules
- Check for multiple games, events, or competitions
- Look for different leagues or tournaments
- Check for live matches and upcoming matches
- Look for any table format with multiple rows

**MATCH DATA TO EXTRACT FOR EACH MATCH:**
- Team A vs Team B
- Match date and time
- League/tournament name
- Venue (if visible)
- Current score (if live match)
- Match status (if visible)

**ODDS DATA TO EXTRACT FOR EACH MATCH:**
- 1X2 odds (Home/Draw/Away)
- Both Teams To Score (BTTS)
- Over/Under goals (0.5, 1.5, 2.0, 2.5, 3.5)
- Team goals (0.5, 1.5, 2.5)
- Any other visible odds markets

**OUTPUT FORMAT:**
Return a JSON array of matches, each containing:
{
  "teamA": "Team Name",
  "teamB": "Team Name", 
  "matchDate": "YYYY-MM-DD",
  "matchTime": "HH:MM",
  "league": "League Name",
  "venue": "Venue Name",
  "currentScore": "0-0",
  "matchStatus": "Not Started",
  "odds": {
    "main1X2": {"home": "1.50", "draw": "3.20", "away": "2.10"},
    "btts": {"yes": "1.80", "no": "2.00"},
    "totalGoals": {"over05": "1.20", "under05": "4.50", "over15": "1.60", "under15": "2.30", "over25": "2.10", "under25": "1.70"},
    "teamAGoals": {"over05": "1.40", "under05": "2.80", "over15": "2.20", "under15": "1.65"},
    "teamBGoals": {"over05": "1.60", "under05": "2.30", "over15": "2.80", "under15": "1.45"}
  }
}

**FINAL REMINDER:** 
- If you see 1 match, return an array with 1 object
- If you see 2 matches, return an array with 2 objects  
- If you see 3 matches, return an array with 3 objects
- If you see 4+ matches, return an array with ALL matches
- NEVER return just 1 match if you can see more
- ALWAYS return an array, even if only 1 match is found`;

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: prompt },
                  {
                    type: 'image_url',
                    image_url: {
                      url: image,
                      detail: 'high'
                    }
                  }
                ]
              }
            ],
            max_tokens: 4000,
            temperature: 0.1
          })
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        
        if (!content) {
          throw new Error('No content received from OpenAI API');
        }

        console.log(`📊 Raw API response for image ${i + 1}:`, content);

        // Extract JSON from response - multiple patterns
        let matches: any[] = [];
        
        console.log(`🔍 Attempting to parse JSON from response for image ${i + 1}`);
        console.log(`📄 Raw response content:`, content);
        
        // Try to find JSON array first - more robust pattern
        const jsonArrayMatch = content.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (jsonArrayMatch) {
          try {
            matches = JSON.parse(jsonArrayMatch[0]);
            console.log(`✅ Extracted ${matches.length} matches from JSON array for image ${i + 1}:`, matches);
          } catch (parseError) {
            console.error(`❌ JSON array parse error for image ${i + 1}:`, parseError);
            console.log(`🔍 Failed JSON array content:`, jsonArrayMatch[0]);
            
            // Try to fix common JSON issues
            try {
              let fixedJson = jsonArrayMatch[0]
                .replace(/(\w+):/g, '"$1":') // Add quotes to keys
                .replace(/'/g, '"') // Replace single quotes with double quotes
                .replace(/,\s*}/g, '}') // Remove trailing commas
                .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays
              
              matches = JSON.parse(fixedJson);
              console.log(`✅ Fixed and extracted ${matches.length} matches from JSON array for image ${i + 1}:`, matches);
            } catch (fixError) {
              console.error(`❌ JSON fix failed for image ${i + 1}:`, fixError);
            }
          }
        }
        
        // If no array found, try to find individual JSON objects with more flexible pattern
        if (matches.length === 0) {
          console.log(`🔍 Trying to find individual JSON objects...`);
          const jsonObjectMatches = content.match(/\{[^{}]*"teamA"[^{}]*\}/g);
          if (jsonObjectMatches) {
            try {
              matches = jsonObjectMatches.map(obj => JSON.parse(obj));
              console.log(`✅ Extracted ${matches.length} matches from individual JSON objects for image ${i + 1}:`, matches);
            } catch (parseError) {
              console.error(`❌ JSON object parse error for image ${i + 1}:`, parseError);
            }
          }
        }
        
        // Try to find any JSON-like structure
        if (matches.length === 0) {
          console.log(`🔍 Trying to find any JSON-like structure...`);
          const allJsonMatches = content.match(/\{[^{}]*\}/g);
          if (allJsonMatches) {
            for (const jsonStr of allJsonMatches) {
              try {
                const parsed = JSON.parse(jsonStr);
                if (parsed.teamA && parsed.teamB) {
                  matches.push(parsed);
                  console.log(`✅ Found valid match object:`, parsed);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
            console.log(`✅ Extracted ${matches.length} matches from JSON-like structures for image ${i + 1}`);
          }
        }
        
        // If still no matches, try to extract from text with more patterns
        if (matches.length === 0) {
          console.warn(`⚠️ No JSON found in response for image ${i + 1}, trying text extraction`);
          
          // Try multiple team name patterns
          const teamPatterns = [
            /([A-Z][a-zA-Z\s]+)\s+vs\s+([A-Z][a-zA-Z\s]+)/g,
            /([A-Z][a-zA-Z\s]+)\s*-\s*([A-Z][a-zA-Z\s]+)/g,
            /([A-Z][a-zA-Z\s]+)\s*@\s*([A-Z][a-zA-Z\s]+)/g,
            /([A-Z][a-zA-Z\s]+)\s+versus\s+([A-Z][a-zA-Z\s]+)/g,
            /([A-Z][a-zA-Z\s]+)\s+vs\.\s+([A-Z][a-zA-Z\s]+)/g
          ];
          
          for (const pattern of teamPatterns) {
            const teamMatches = content.match(pattern);
            if (teamMatches) {
              matches = teamMatches.map((match: string) => {
                let teamA: string = 'Unknown Team A';
                let teamB: string = 'Unknown Team B';
                if (match.includes(' vs ')) {
                  [teamA, teamB] = match.split(' vs ');
                } else if (match.includes(' - ')) {
                  [teamA, teamB] = match.split(' - ');
                } else if (match.includes(' @ ')) {
                  [teamA, teamB] = match.split(' @ ');
                } else if (match.includes(' versus ')) {
                  [teamA, teamB] = match.split(' versus ');
                } else if (match.includes(' vs. ')) {
                  [teamA, teamB] = match.split(' vs. ');
                }
                return {
                  teamA: teamA.trim(),
                  teamB: teamB.trim(),
                  matchDate: new Date().toISOString().split('T')[0],
                  odds: {}
                };
              });
              console.log(`✅ Extracted ${matches.length} matches from text pattern for image ${i + 1}:`, matches);
              break;
            }
          }
          
          // If still no matches, try to extract any team names mentioned
          if (matches.length === 0) {
            console.log(`🔍 Trying to extract any team names from text...`);
            const teamNameMatches = content.match(/([A-Z][a-zA-Z\s]{2,20})/g);
            if (teamNameMatches && teamNameMatches.length >= 2) {
              // Create matches from any two consecutive team names
              for (let j = 0; j < teamNameMatches.length - 1; j += 2) {
                const teamA = teamNameMatches[j].trim();
                const teamB = teamNameMatches[j + 1].trim();
                if (teamA !== teamB && teamA.length > 2 && teamB.length > 2) {
                  matches.push({
                    teamA,
                    teamB,
                    matchDate: new Date().toISOString().split('T')[0],
                    odds: {}
                  });
                }
              }
              console.log(`✅ Extracted ${matches.length} matches from team names for image ${i + 1}:`, matches);
            }
          }
        }
        
        // Add all found matches
        if (matches.length > 0) {
          console.log(`🎯 Adding ${matches.length} matches from image ${i + 1} to total collection`);
          allMatches.push(...matches);
          console.log(`📊 Total matches collected so far: ${allMatches.length}`);
        } else {
          console.error(`❌ No matches could be extracted from image ${i + 1}`);
          console.log(`🔍 Full response content for debugging:`, content);
        }

      } catch (error) {
        console.error(`❌ Error processing image ${i + 1}:`, error);
        throw error;
      }
    }

    return allMatches;
  };

  const validateAndDeduplicateMatches = (matches: any[], sport: string) => {
    console.log(`🔍 Validating and deduplicating ${matches.length} matches`);
    
    const validMatches = matches.filter(match => {
      // Basic validation
      if (!match.teamA || !match.teamB) {
        console.warn(`⚠️ Skipping match with missing teams:`, match);
        return false;
      }
      
      // Check for duplicate matches (same teams and date)
      const isDuplicate = matches.some(otherMatch => 
        otherMatch !== match &&
        otherMatch.teamA === match.teamA &&
        otherMatch.teamB === match.teamB &&
        otherMatch.matchDate === match.matchDate
      );
      
      if (isDuplicate) {
        console.warn(`⚠️ Skipping duplicate match: ${match.teamA} vs ${match.teamB}`);
        return false;
      }
      
      return true;
    });

    console.log(`✅ Validated ${validMatches.length} unique matches`);
    return validMatches;
  };

  const handleGenerate = async () => {
    if (!selectedSport) {
      alert('Please select a sport');
      return;
    }

    if (!isValid) {
      setApiKeyError('Please enter a valid API key');
      return;
    }

    if (selectedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsGenerating(true);
    setApiKeyError('');

    try {
      console.log(`🚀 Starting multi-match extraction from ${selectedImages.length} images`);
      
      // Resize images for better processing
      const resizedImages = await Promise.all(selectedImages.map(resizeImage));
      console.log(`📏 Resized ${resizedImages.length} images`);
      
      // Convert to base64
      const base64Images = await Promise.all(resizedImages.map(convertImageToBase64));
      console.log(`🔄 Converted ${base64Images.length} images to base64`);
      
      // Extract matches from all images
      const extractedMatches = await extractMatchesFromImages(base64Images, apiKey, selectedSport);
      console.log(`📊 Extracted ${extractedMatches.length} total matches from all images`);
      
             // Use MatchPromptGenerator to validate and ensure all matches are processed
       const matchDataArray: MatchData[] = matchPromptGenerator.ensureAllMatchesProcessed(extractedMatches);
       const validMatches = matchPromptGenerator.validateMatches(matchDataArray);
       
       console.log(`✅ MatchPromptGenerator validated ${validMatches.length} matches:`, validMatches);
       
       if (validMatches.length === 0) {
         alert('No valid matches found in the uploaded images. Please try with different images.');
         return;
       }

              // Generate prompts for all matches
       console.log(`🎯 FINAL STEP: Calling onGenerate with ${validMatches.length} matches:`, validMatches);
       
       // Show user how many matches were found
       if (validMatches.length > 0) {
         const matchList = validMatches.map((match, index) => `${index + 1}. ${match.teamA} vs ${match.teamB}`).join('\n');
         console.log(`📋 Matches found:\n${matchList}`);
         
         // Show success message without blocking alert
         console.log(`✅ Found ${validMatches.length} matches:\n${matchList}\n\nGenerating prompts for all matches...`);
         
         console.log(`✅ Final validated matches for generation: ${validMatches.length}`, validMatches);
         
         // Call onGenerate with the validated matches
         await onGenerate(validMatches, selectedSport, selectedImages);
         
         // Automatically close modal after successful generation
         setTimeout(() => {
           console.log(`🎉 Generation completed successfully! Closing modal...`);
           onClose();
         }, 1500);
         
       } else {
         alert('No valid matches found. Please try with different images.');
       }
       console.log(`✅ onGenerate completed successfully for ${validMatches.length} matches`);
       
       // Reset form
       resetForm();
      
    } catch (error) {
      console.error('❌ Generation error:', error);
      setApiKeyError(`Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setSelectedImages([]);
    setSelectedSport('');
    setDragOver(false);
    setApiKeyError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900' : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Prompt Generation</h2>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Upload images to extract match data and generate prompts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* API Key Section */}
          <div className={`p-6 rounded-xl border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
              }`}>
                <Key className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">OpenAI API Key</h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Required for AI-powered match extraction
                </p>
              </div>
              {isValid && (
                <div className="ml-auto flex items-center space-x-1 text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Valid</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="sk-..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } ${apiKeyError ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                  }`}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={handleApiKeySave}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Save
              </button>
              <button
                onClick={handleApiKeyClear}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                Clear
              </button>
            </div>
            
            {apiKeyError && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{apiKeyError}</p>
              </div>
            )}
            
            <p className={`text-sm mt-3 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              🔒 Your API key is stored locally and never sent to our servers.
            </p>
          </div>

          {/* Sport Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center space-x-2">
              <div className={`p-1.5 rounded ${
                darkMode ? 'bg-orange-600/20' : 'bg-orange-100'
              }`}>
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <span>Select Sport</span>
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-gray-400`}
            >
              <option value="">Choose a sport...</option>
              {availableSports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.icon} {sport.name}
                </option>
              ))}
            </select>
            {selectedSport && (
              <p className={`text-sm mt-2 ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                ✓ Selected: {availableSports.find(sport => sport.id === selectedSport)?.icon} {availableSports.find(sport => sport.id === selectedSport)?.name}
              </p>
            )}
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold mb-3 flex items-center space-x-2">
              <div className={`p-1.5 rounded ${
                darkMode ? 'bg-green-600/20' : 'bg-green-100'
              }`}>
                <ImageIcon className="w-4 h-4 text-green-500" />
              </div>
              <span>Upload Images</span>
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center ${
                dragOver
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
                  : darkMode
                  ? 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                darkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className={`font-semibold mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Drop your images here
              </h4>
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Drag and drop images here, or click to select
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleMultipleImageUpload(e.target.files)}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`inline-block px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Select Images
              </label>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full">
                <p className={`text-xs ${
                  darkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  📸 Supports multiple images • 🎯 Each image can contain multiple matches • 🔍 AI extracts all visible data
                </p>
              </div>
            </div>
          </div>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <div className={`p-6 rounded-xl border ${
              darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center space-x-2">
                  <div className={`p-1.5 rounded ${
                    darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                  }`}>
                    <ImageIcon className="w-4 h-4 text-purple-500" />
                  </div>
                  <span>Selected Images ({selectedImages.length})</span>
                </h4>
                <button
                  onClick={() => setSelectedImages([])}
                  className={`text-sm px-3 py-1 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-red-400 hover:bg-red-900/20' 
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-colors">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !isValid || !selectedSport || selectedImages.length === 0}
              className={`flex items-center space-x-3 px-8 py-3 rounded-lg font-medium transition-all ${
                isGenerating || !isValid || !selectedSport || selectedImages.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Prompts</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}