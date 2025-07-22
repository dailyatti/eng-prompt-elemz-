import React, { useState } from 'react';
import { X, Upload, Sparkles, Zap, Image as ImageIcon, Key, Loader2, Clipboard } from 'lucide-react';
import { sportsCategories } from '../data/sportsData';

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (matches: any[], sport: string, apiKey: string, images?: File[]) => void;
  darkMode?: boolean;
}

export function AIGenerationModal({ isOpen, onClose, onGenerate, darkMode }: AIGenerationModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragOver, setDragOver] = useState(false);

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

  const validateApiKey = (key: string): boolean => {
    return key.startsWith('sk-') && key.length > 20;
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
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
            resolve(resizedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const extractMatchesFromImages = async (base64Images: string[], apiKey: string, sport: string) => {
    if (!validateApiKey(apiKey)) {
      throw new Error('Invalid API key format. Must start with sk- and be at least 20 characters long.');
    }

    const imageContent = base64Images.map((image, index) => ({
      type: "image_url" as const,
      image_url: {
        url: image,
        detail: "high" as const
      }
    }));
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `🔍 **PRECISE MATCH AND ODDS DATA EXTRACTION**

**CRITICAL: ALL VISIBLE ODDS ACCURATELY!**
📅 **DATE & TIME:** Read the match date and time precisely  
🏆 **LEAGUE/COMPETITION:** What competition they're playing in
📍 **VENUE:** Home/Away, stadium name if visible  
⚽ **MATCH TYPE:** League, cup, international

🎯 **1X2 MARKET (MANDATORY):**
- Home Win odds (e.g: 1.64)
- Draw odds (e.g: 4.20) 
- Away Win odds (e.g: 5.50)

⚽ **GOALS MARKETS (ALL VISIBLE):**
- Over/Under 0.5, 1.5, 2.5, 3.5 (exact odds: 1.25, 3.90)
- Specific team goal counts (e.g: England Over 1.5: 1.64)

🔥 **BTTS (BOTH TEAMS TO SCORE):**
- Yes odds (e.g: 1.82)
- No odds (e.g: 1.99)

🏆 **ADVANCEMENT MARKETS:** 
- Who advances odds (e.g: England 1.30, Italy 3.50)

📐 **COMBINATIONS:**
- 1X2 + BTTS combinations (e.g: Home and Yes: 3.35)
- Double Chance: 1X, X2, 12

🎲 **OTHER MARKETS IF VISIBLE:**
- Asian Handicap, Corners, Cards, Player Props, First Half

📊 **Current Score:** If live match
⏱️ **Match Status:** Live, Upcoming, HT
💰 **Bookmaker:** Which bookmaker

**JSON FORMAT - ALL ODDS ACCURATELY:**

[
  {
    "teamA": "Team Name A",
    "teamB": "Team Name B", 
    "matchDate": "2024-01-15",
    "matchTime": "20:00",
    "league": "Premier League",
    "venue": "Home/Away",
    "matchStatus": "Upcoming/Live/HT",
    "currentScore": "1-0",
    "sport": "${sport}",
    "odds": {
      "main1X2": {
        "home": "1.64",
        "draw": "4.20",
        "away": "5.50"
      },
      "btts": {
        "yes": "1.82",
        "no": "1.99"
      },
      "totalGoals": {
        "over05": "1.03",
        "under05": "12.00",
        "over15": "1.25", 
        "under15": "3.90",
        "over20": "1.36",
        "under20": "3.10",
        "over25": null,
        "under25": null
      },
      "teamAGoals": {
        "over05": "1.09",
        "under05": "5.00",
        "over15": "1.64",
        "under15": "2.00",
        "over25": "3.00",
        "under25": "1.28"
      },
      "advancement": {
        "teamA": "1.30",
        "teamB": "3.50"
      },
      "combinations": {
        "homeAndBttsYes": "3.35",
        "drawAndBttsYes": "5.00",
        "awayAndBttsNo": "9.25"
      }
    }
  }
]

**🚨 IMPORTANT RULES:**
1. RETURN ONLY JSON array, no other text!
2. ALL visible odds accurately, in decimal format (1.64, 4.20)
3. If no data, give "null" value
4. Date in YYYY-MM-DD format
5. Team names exactly as they appear`
              },
              ...imageContent
            ]
          }
        ],
        max_tokens: 8000,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `${response.status} ${response.statusText}`;
      throw new Error(`OpenAI API Error: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid response from OpenAI API');
    }
    
    const content = data.choices[0]?.message?.content;
    
    try {
      console.log('🔍 AI Response for match extraction:');
      console.log(content);
      
      // Clean response - remove markdown formatting
      let cleanContent = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      
      // METHOD 1: Try direct JSON parse
      let matches = [];
      
      try {
        matches = JSON.parse(cleanContent);
        if (Array.isArray(matches) && matches.length > 0) {
          console.log(`✅ DIRECT JSON PARSE SUCCESS: Found ${matches.length} matches`);
          return validateAndDeduplicateMatches(matches, sport);
        }
      } catch (e) {
        console.log('❌ Direct JSON parse failed, trying regex...');
      }
      
      // METHOD 2: Extract JSON array with regex
      const jsonArrayMatch = cleanContent.match(/\[[\s\S]*\]/);
      if (jsonArrayMatch) {
        try {
          matches = JSON.parse(jsonArrayMatch[0]);
          if (Array.isArray(matches) && matches.length > 0) {
            console.log(`✅ REGEX JSON PARSE SUCCESS: Found ${matches.length} matches`);
            return validateAndDeduplicateMatches(matches, sport);
          }
        } catch (e) {
          console.log('❌ Regex JSON parse failed, trying object extraction...');
        }
      }
      
      // METHOD 3: Extract individual JSON objects
      const jsonObjects = cleanContent.match(/\{[^{}]*\}/g);
      if (jsonObjects && jsonObjects.length > 0) {
        try {
          matches = jsonObjects
            .map(obj => JSON.parse(obj))
            .filter(match => match.teamA && match.teamB);
          if (matches.length > 0) {
            console.log(`✅ OBJECT EXTRACTION SUCCESS: Found ${matches.length} matches`);
            return validateAndDeduplicateMatches(matches, sport);
          }
        } catch (e) {
          console.log('❌ Object extraction failed, trying text parsing...');
        }
      }
      
      console.log('❌ ALL JSON PARSING FAILED');
      throw new Error(`No valid JSON found. AI Response: "${content.substring(0, 500)}..."`);
      
    } catch (error) {
      console.error('❌ EXTRACTION ERROR:', error);
      console.log('📄 FULL AI RESPONSE:', content);
      throw new Error(`Failed to extract matches. Details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Helper function to validate and remove duplicates
  const validateAndDeduplicateMatches = (matches: any[], sport: string) => {
    console.log(`🔍 Validating ${matches.length} raw matches...`);
    
    // Filter valid matches
    const validMatches = matches.filter(match => {
      if (!match.teamA || !match.teamB) return false;
      if (typeof match.teamA !== 'string' || typeof match.teamB !== 'string') return false;
      if (match.teamA.trim().length < 2 || match.teamB.trim().length < 2) return false;
      return true;
    });
    
    console.log(`✅ ${validMatches.length} valid matches after filtering`);
    
    // Remove duplicates based on team names (case insensitive)
    const uniqueMatches = [];
    const seenMatches = new Set();
    
    for (const match of validMatches) {
      const teamA = match.teamA.trim().toLowerCase();
      const teamB = match.teamB.trim().toLowerCase();
      
      // Create unique identifiers (both directions)
      const id1 = `${teamA}|||${teamB}`;
      const id2 = `${teamB}|||${teamA}`;
      
      if (!seenMatches.has(id1) && !seenMatches.has(id2)) {
        seenMatches.add(id1);
        seenMatches.add(id2);
        
        // Ensure proper structure
        uniqueMatches.push({
          teamA: match.teamA.trim(),
          teamB: match.teamB.trim(),
          odds: match.odds || null,
          sport: sport,
          league: match.league || null,
          matchTime: match.matchTime || null
        });
      }
    }
    
    console.log(`🎯 FINAL: ${uniqueMatches.length} unique matches`);
    console.log('Unique matches:', uniqueMatches.map(m => `${m.teamA} vs ${m.teamB}`).join(', '));
    
    if (uniqueMatches.length === 0) {
      throw new Error('No valid unique matches found after deduplication');
    }
    
    return uniqueMatches;
  };

  const handleGenerate = async () => {
    if (selectedImages.length === 0 || !selectedSport || !apiKey) return;

    if (!validateApiKey(apiKey)) {
      alert('Invalid API key! Must start with sk- and be at least 20 characters long.');
      return;
    }
    setIsGenerating(true);
    
    try {
      // Process all images
      console.log(`🖼️ Processing ${selectedImages.length} images...`);
      const base64Images: string[] = [];
      
      for (let i = 0; i < selectedImages.length; i++) {
        console.log(`📷 Processing image ${i + 1}/${selectedImages.length}: ${selectedImages[i].name}`);
        const resizedImage = await resizeImage(selectedImages[i]);
        const base64Image = await convertImageToBase64(resizedImage);
        base64Images.push(base64Image);
      }
      
      console.log(`🔍 Extracting matches from ${base64Images.length} images...`);
      const matches = await extractMatchesFromImages(base64Images, apiKey, selectedSport);
      
      console.log(`🎯 Found ${matches.length} matches:`, matches);
      
      if (matches.length === 0) {
        throw new Error(`No matches found in the ${selectedImages.length} image(s). Please ensure the images contain visible betting odds or match listings.`);
      }

      console.log(`🚀 Generating ${matches.length} prompts...`);
      await onGenerate(matches, selectedSport, apiKey, selectedImages);
      onClose();
      setSelectedImages([]);
      setSelectedSport('');
      setApiKey('');
    } catch (error) {
      console.error('AI Generation Error:', error);
      
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          errorMessage = 'Invalid API Key! Please check your OpenAI API key.';
        } else if (error.message.includes('400')) {
          errorMessage = 'Bad request! Check image format and API key.';
        } else if (error.message.includes('429')) {
          errorMessage = 'API rate limit reached. Please try again later.';
        } else if (error.message.includes('500')) {
          errorMessage = 'OpenAI server error. Please try again later.';
        } else if (error.message.includes('No matches found')) {
          errorMessage = `No matches detected in image. ${error.message}`;
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
      onClose();
      setSelectedImages([]);
      setSelectedSport('');
      setApiKey('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`backdrop-blur-xl rounded-2xl shadow-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900/95 border border-gray-700/20' 
          : 'bg-white/95 border border-white/20'
      }`}>
        <div className={`flex justify-between items-center p-6 transition-colors duration-300 ${
          darkMode 
            ? 'border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 to-pink-900/20' 
            : 'border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-pink-50'
        }`}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            <Sparkles className="text-purple-600" size={24} />
            AI Prompt Generation
          </h2>
          <button onClick={resetForm} className={`p-2 transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-gray-200' 
              : 'text-gray-400 hover:text-gray-600'
          }`}>
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className={`block text-sm font-bold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                <ImageIcon className="text-purple-600" size={16} />
                Upload Match Screenshots ({selectedImages.length} selected)
                <span className={`text-xs font-normal ml-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  (Drag & drop, file upload, or Ctrl+V)
                </span>
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragOver 
                    ? darkMode 
                      ? 'border-purple-400 bg-purple-900/20' 
                      : 'border-purple-500 bg-purple-50'
                    : selectedImages.length > 0
                      ? darkMode
                        ? 'border-green-400 bg-green-900/20'
                        : 'border-green-500 bg-green-50'
                      : darkMode
                        ? 'border-gray-600 hover:border-purple-400 bg-gray-800/20'
                        : 'border-gray-300 hover:border-purple-400'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
              >
                {selectedImages.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg shadow-md"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className={`font-semibold transition-colors duration-300 ${
                      darkMode ? 'text-green-400' : 'text-green-700'
                    }`}>
                      {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                    </p>
                    <button
                      onClick={() => setSelectedImages([])}
                      className={`font-medium transition-colors ${
                        darkMode 
                          ? 'text-red-400 hover:text-red-300' 
                          : 'text-red-600 hover:text-red-800'
                      }`}
                    >
                      Remove All
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className={`mx-auto transition-colors duration-300 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} size={48} />
                    <div>
                      <p className={`font-medium mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Drop your image here, paste with Ctrl+V, or
                      </p>
                      <label className="text-purple-600 hover:text-purple-800 font-bold cursor-pointer">
                        browse files
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => e.target.files && handleMultipleImageUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <span className={`transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Supports: JPG, PNG, WebP
                      </span>
                      <span className="flex items-center gap-1 text-blue-600">
                        <Clipboard size={12} />
                        Ctrl+V to paste
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sport Selection */}
              <div>
                <label className={`block text-sm font-bold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <Zap className="text-orange-600" size={16} />
                  Select Sport
                </label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all font-medium ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-200' 
                      : 'bg-white border-gray-200 text-gray-800'
                  }`}
                >
                  <option value="">Choose a sport...</option>
                  {sportsCategories.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.icon} {sport.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* API Key */}
              <div>
                <label className={`block text-sm font-bold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <Key className="text-red-600" size={16} />
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all font-medium ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400' 
                      : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                  }`}
                  placeholder="sk-proj-... (OpenAI API Key)"
                />
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" className="text-blue-500 hover:underline">OpenAI Platform</a>
                </p>
              </div>
            </div>

            {/* AI Features Info */}
            <div className={`p-4 rounded-xl transition-colors duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
            }`}>
              <h4 className={`font-bold mb-2 flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                <Sparkles className="text-purple-600" size={16} />
                Multi-Image Analysis
              </h4>
              <div className={`text-sm space-y-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <p>1. 📸 <strong>Upload multiple screenshots</strong> - drag & drop, file picker, or Ctrl+V</p>
                <p>2. 🏆 <strong>Select sport</strong> - provides context for AI analysis</p>
                <p>3. 🔑 <strong>OpenAI API key</strong> - secure, not stored permanently</p>
                <p>4. 🤖 <strong>AI processes ALL images</strong> - extracts matches and complete odds</p>
                <p>5. 📋 <strong>PhD-level prompts</strong> - detailed analysis with all visible odds included</p>
                <p>6. ⚡ <strong>Loading screen</strong> - shows progress for multiple matches</p>
                <p>7. 🎯 <strong>Complete market coverage</strong> - corners, cards, BTTS, totals, handicaps</p>
              </div>
            </div>

            {/* Generate Button */}
            <div className={`flex justify-end pt-6 transition-colors duration-300 ${
              darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
            }`}>
              <button
                onClick={handleGenerate}
                disabled={selectedImages.length === 0 || !selectedSport || !apiKey || isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-3 disabled:transform-none"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing {selectedImages.length} images...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Analyze {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}