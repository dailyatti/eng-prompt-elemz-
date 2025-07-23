import React, { useState } from 'react';
import { X, Upload, Sparkles, Zap, Image as ImageIcon, Key, Loader2, Clipboard, Eye, EyeOff } from 'lucide-react';
import { sportsCategories } from '../data/sportsData';
import { useApiKey } from '../hooks/useLocalStorage';

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
      setSelectedImages(prev => [...prev, file]);
    }
  };

  const handleMultipleImageUpload = (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    setSelectedImages(prev => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
      
      const prompt = `Analyze this sports betting image and extract ALL matches and their odds data. Look for multiple matches if present.

**SPORT:** ${sport}

**EXTRACTION REQUIREMENTS:**
1. Find ALL matches in the image (there may be multiple)
2. Extract complete match data for each match
3. Extract ALL available odds for each match
4. Maintain data accuracy and completeness

**MATCH DATA TO EXTRACT:**
- Team A vs Team B
- Match date and time
- League/tournament name
- Venue (if visible)
- Current score (if live match)
- Match status (if visible)

**ODDS DATA TO EXTRACT:**
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

**IMPORTANT:** If multiple matches are visible, extract ALL of them. Return an array with each match as a separate object.`;

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4-vision-preview',
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

        // Extract JSON from response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          try {
            const matches = JSON.parse(jsonMatch[0]);
            console.log(`✅ Extracted ${matches.length} matches from image ${i + 1}:`, matches);
            allMatches.push(...matches);
          } catch (parseError) {
            console.error(`❌ JSON parse error for image ${i + 1}:`, parseError);
            console.log('Raw content:', content);
          }
        } else {
          console.warn(`⚠️ No JSON array found in response for image ${i + 1}`);
          console.log('Raw content:', content);
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
      
      // Validate and deduplicate
      const validMatches = validateAndDeduplicateMatches(extractedMatches, selectedSport);
      console.log(`✅ Final valid matches:`, validMatches);
      
      if (validMatches.length === 0) {
        alert('No valid matches found in the uploaded images. Please try with different images.');
        return;
      }

             // Generate prompts for all matches
       await onGenerate(validMatches, selectedSport, selectedImages);
      
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
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold">AI Prompt Generation</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-opacity-80 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* API Key Section */}
          <div className={`p-4 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              <Key className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold">OpenAI API Key</h3>
              {isValid && <span className="text-green-500 text-sm">✓ Valid</span>}
            </div>
            
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="sk-..."
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${apiKeyError ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                  }`}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={handleApiKeySave}
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Save
              </button>
              <button
                onClick={handleApiKeyClear}
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                Clear
              </button>
            </div>
            
            {apiKeyError && (
              <p className="text-red-500 text-sm mt-2">{apiKeyError}</p>
            )}
            
            <p className="text-sm text-gray-500 mt-2">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>

          {/* Sport Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Sport</label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">Choose a sport...</option>
              {sportsCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload Images</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragOver
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : darkMode
                  ? 'border-gray-600 bg-gray-800'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">
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
                className={`inline-block px-4 py-2 rounded-lg font-medium cursor-pointer ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Select Images
              </label>
              <p className="text-xs text-gray-400 mt-2">
                Supports multiple images. Each image can contain multiple matches.
              </p>
            </div>
          </div>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Selected Images ({selectedImages.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium ${
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
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium ${
                isGenerating || !isValid || !selectedSport || selectedImages.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
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