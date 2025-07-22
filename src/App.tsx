import React, { useState, useMemo } from 'react';
import { Trophy, Target, Zap, Sparkles, TrendingUp, Award, BarChart3, FileText, Heart, Bot, Moon, Sun } from 'lucide-react';
import { Prompt } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { usePromptAnalytics } from './hooks/usePromptAnalytics';
import { useLazyLoading } from './hooks/useLazyLoading';
import { initialPrompts } from './data/initialPrompts';
import { PromptCard } from './components/PromptCard';
import { PromptModal } from './components/PromptModal';
import { AnalyticsModal } from './components/AnalyticsModal';
import { AIGenerationModal } from './components/AIGenerationModal';
import { ExportImportModal } from './components/ExportImportModal';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { AIPromptPage } from './components/AIPromptPage';
import { LoadingScreen } from './components/LoadingScreen';
import { sportsCategories } from './data/sportsData';

function App() {
  const [prompts, setPrompts] = useLocalStorage<Prompt[]>('sports-betting-prompts', initialPrompts);
  const [aiPrompts, setAiPrompts] = useLocalStorage<Prompt[]>('ai-generated-prompts', []);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false);
  const { updateSuccessRate } = usePromptAnalytics();
  const [currentPage, setCurrentPage] = useState<'regular' | 'ai'>('regular');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExportImportModalOpen, setIsExportImportModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | undefined>();
  const [analyticsPrompt, setAnalyticsPrompt] = useState<Prompt | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, currentMatch: '' });

  // Store previous state for reset functionality
  const [previousState, setPreviousState] = useState({
    searchTerm: '',
    selectedCategory: 'all',
    selectedSport: 'all', 
    selectedType: 'all',
    showFavoritesOnly: false,
    currentPage: 'regular' as 'regular' | 'ai'
  });

  const filteredPrompts = useMemo(() => {
    const currentPrompts = currentPage === 'regular' ? prompts : aiPrompts;
    
    return currentPrompts.filter(prompt => {
      // Category filter
      if (selectedCategory !== 'all' && prompt.category !== selectedCategory) return false;
      
      // Sport filter
      if (selectedSport !== 'all' && prompt.sport !== selectedSport) return false;
      
      // Type filter
      if (selectedType !== 'all' && prompt.type !== selectedType) return false;
      
      // Favorites filter
      if (showFavoritesOnly && !prompt.isFavorite) return false;

      return true;
    });
  }, [prompts, aiPrompts, currentPage, selectedCategory, selectedSport, selectedType, showFavoritesOnly]);

  const handleSavePrompt = (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    
    if (editingPrompt) {
      // Update existing prompt
      if (currentPage === 'regular') {
        setPrompts(prompts.map(p => 
          p.id === editingPrompt.id 
            ? { ...promptData, id: editingPrompt.id, createdAt: editingPrompt.createdAt, updatedAt: now }
            : p
        ));
      } else {
        setAiPrompts(aiPrompts.map(p => 
          p.id === editingPrompt.id 
            ? { ...promptData, id: editingPrompt.id, createdAt: editingPrompt.createdAt, updatedAt: now }
            : p
        ));
      }
    } else {
      // Add new prompt
      const newPrompt: Prompt = {
        ...promptData,
        id: Math.random().toString(36).substr(2, 9),
        isFavorite: false,
        usageCount: 0,
        lastUsed: now,
        successRate: 0,
        totalBets: 0,
        winningBets: 0,
        roi: 0,
        createdAt: now,
        updatedAt: now,
      };
      if (currentPage === 'regular') {
        setPrompts([...prompts, newPrompt]);
      } else {
        setAiPrompts([...aiPrompts, newPrompt]);
      }
    }
    
    setEditingPrompt(undefined);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (id: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      if (currentPage === 'regular') {
        setPrompts(prompts.filter(p => p.id !== id));
      } else {
        setAiPrompts(aiPrompts.filter(p => p.id !== id));
      }
    }
  };

  const handleAddNew = () => {
    setEditingPrompt(undefined);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (id: string) => {
    if (currentPage === 'regular') {
      setPrompts(prompts.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ));
    } else {
      setAiPrompts(aiPrompts.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ));
    }
  };

  const handleShowAnalytics = (prompt: Prompt) => {
    setAnalyticsPrompt(prompt);
    setIsAnalyticsModalOpen(true);
  };

  const handleUpdateSuccess = (won: boolean, betAmount: number, winAmount: number) => {
    if (analyticsPrompt) {
      updateSuccessRate(analyticsPrompt.id, won, betAmount, winAmount);
    }
  };

  // Save current state before changes
  const saveCurrentState = () => {
    setPreviousState({
      searchTerm,
      selectedCategory,
      selectedSport,
      selectedType,
      showFavoritesOnly,
      currentPage
    });
  };

  // Reset to original state
  const handleResetToOriginal = () => {
    if (window.confirm('⚠️ FIGYELEM! Ez visszaállítja az ÖSSZES promptot az eredeti állapotba és törli az összes változtatásod! Biztos vagy benne?')) {
      // Save current state
      saveCurrentState();
      
      // Reset ALL prompts to original state
      setPrompts(initialPrompts);
      setAiPrompts([]);
      
      // Reset all filters
      setSelectedCategory('all');
      setSelectedSport('all');
      setSelectedType('all');
      setShowFavoritesOnly(false);
      setCurrentPage('regular');
      
      // Show success message
      setTimeout(() => {
        alert('✅ Minden visszaállítva az eredeti állapotba!');
      }, 100);
    }
  };

  // Reset to previous state
  const handleResetToPrevious = () => {
    setSearchTerm(previousState.searchTerm);
    setSelectedCategory(previousState.selectedCategory);
    setSelectedSport(previousState.selectedSport);
    setSelectedType(previousState.selectedType);
    setShowFavoritesOnly(previousState.showFavoritesOnly);
    setCurrentPage(previousState.currentPage);
  };

  const handleAIGeneration = async (matches: any[], sport: string, apiKey: string, images?: File[]) => {
    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: matches.length, currentMatch: '' });
    
    console.log(`🚀 Starting AI generation for ${matches.length} matches from ${images?.length || 0} images:`, matches);
    
    try {
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        console.log(`⚙️ Generating prompt ${i + 1}/${matches.length} for: ${match.teamA} vs ${match.teamB}`);
        setGenerationProgress({ current: i + 1, total: matches.length, currentMatch: `${match.teamA} vs ${match.teamB}` });
        
        const now = new Date().toISOString();
        const promptContent = await generateMatchPrompt(match, sport, apiKey);
        
        const newPrompt: Prompt = {
          id: Math.random().toString(36).substr(2, 9),
          title: `AI Generated: ${match.teamA} vs ${match.teamB}`,
          content: promptContent,
          sport,
          category: 'traditional',
          type: 'specific',
          tags: ['AI Generated', 'Match Analysis', 'Complete Odds', images?.length ? `${images.length} Images` : 'Multi-Source'].filter(Boolean),
          isFavorite: false,
          usageCount: 0,
          lastUsed: now,
          successRate: 0,
          totalBets: 0,
          winningBets: 0,
          roi: 0,
          createdAt: now,
          updatedAt: now,
        };
        
        setAiPrompts(prev => [newPrompt, ...prev]);
        console.log(`✅ Created prompt ${i + 1}: "${newPrompt.title}"`);
        
        // Delay between generations
        if (i < matches.length - 1) {
          console.log(`⏳ Waiting 1 second before next generation...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      // Switch to AI page after generation
      setCurrentPage('ai');
    } catch (error) {
      console.error('❌ AI Generation Error:', error);
      console.error('AI Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMatchPrompt = async (match: any, sport: string, apiKey: string) => {
    console.log(`🧠 Generating PhD-level prompt for: ${match.teamA} vs ${match.teamB}`);
    
    // Build extracted match data header in English
    let matchHeader = `**MATCH DATA EXTRACTED FROM IMAGE:**\n\n`;
    matchHeader += `🏆 **MATCH:** ${match.teamA} vs ${match.teamB}\n`;
    
    if (match.matchDate) matchHeader += `📅 **DATE:** ${match.matchDate}\n`;
    if (match.matchTime) matchHeader += `⏰ **TIME:** ${match.matchTime}\n`;
    if (match.league) matchHeader += `🏆 **LEAGUE:** ${match.league}\n`;
    if (match.venue) matchHeader += `📍 **VENUE:** ${match.venue}\n`;
    if (match.currentScore) matchHeader += `⚽ **SCORE:** ${match.currentScore}\n`;
    if (match.matchStatus) matchHeader += `🟢 **STATUS:** ${match.matchStatus}\n`;
    
    matchHeader += `\n💰 **EXTRACTED ODDS DATA:**\n`;
    
    // Extract and format all available odds in English
    if (match.odds) {
      const odds = match.odds;
      
      // 1X2 Main Market
      if (odds.main1X2) {
        matchHeader += `- **1X2 Market:** ${match.teamA} ${odds.main1X2.home} | Draw ${odds.main1X2.draw} | ${match.teamB} ${odds.main1X2.away}\n`;
      }
      
      // BTTS
      if (odds.btts) {
        matchHeader += `- **BTTS:** Yes ${odds.btts.yes} | No ${odds.btts.no}\n`;
      }
      
      // Total Goals
      if (odds.totalGoals) {
        const goals = odds.totalGoals;
        if (goals.over05 && goals.under05) matchHeader += `- **Over/Under 0.5:** ${goals.over05} / ${goals.under05}\n`;
        if (goals.over15 && goals.under15) matchHeader += `- **Over/Under 1.5:** ${goals.over15} / ${goals.under15}\n`;
        if (goals.over20 && goals.under20) matchHeader += `- **Over/Under 2.0:** ${goals.over20} / ${goals.under20}\n`;
        if (goals.over25 && goals.under25) matchHeader += `- **Over/Under 2.5:** ${goals.over25} / ${goals.under25}\n`;
      }
      
      // Team Goals
      if (odds.teamAGoals) {
        const teamGoals = odds.teamAGoals;
        if (teamGoals.over05 && teamGoals.under05) matchHeader += `- **${match.teamA} Goals 0.5:** ${teamGoals.over05} / ${teamGoals.under05}\n`;
        if (teamGoals.over15 && teamGoals.under15) matchHeader += `- **${match.teamA} Goals 1.5:** ${teamGoals.over15} / ${teamGoals.under15}\n`;
        if (teamGoals.over25 && teamGoals.under25) matchHeader += `- **${match.teamA} Goals 2.5:** ${teamGoals.over25} / ${teamGoals.under25}\n`;
      }
      
      // Advancement/Qualification
      if (odds.advancement) {
        matchHeader += `- **Advancement:** ${match.teamA} ${odds.advancement.teamA} | ${match.teamB} ${odds.advancement.teamB}\n`;
      }
      
      // Combination Bets
      if (odds.combinations) {
        const combo = odds.combinations;
        let combos = [];
        if (combo.homeAndBttsYes) combos.push(`Home+BTTS ${combo.homeAndBttsYes}`);
        if (combo.drawAndBttsYes) combos.push(`Draw+BTTS ${combo.drawAndBttsYes}`);
        if (combo.awayAndBttsNo) combos.push(`Away+BTTS No ${combo.awayAndBttsNo}`);
        if (combos.length > 0) {
          matchHeader += `- **Combinations:** ${combos.join(' | ')}\n`;
        }
      }
    } else {
      matchHeader += `- **Odds:** Could not be automatically extracted - please analyze the latest market data\n`;
    }
    
    matchHeader += `\n---\n\n`;
    
    // Create comprehensive PhD-level prompt request in English
    const promptRequest = `**PHD-LEVEL SPORTS BETTING ANALYSIS PROMPT REQUEST**

**MATCH INFORMATION:**
- Teams: ${match.teamA} vs ${match.teamB}
- League: ${match.league || 'Not specified'}
- Date/Time: ${match.matchDate || 'TBD'} ${match.matchTime || ''}
- Venue: ${match.venue || 'Not specified'}
- Current Status: ${match.matchStatus || 'Upcoming'}
- Sport: ${sport}

**REQUEST:**
Create a comprehensive, PhD-level sports betting analysis prompt for the above match. This prompt should be designed to be used with ChatGPT or similar AI models to generate professional betting analysis.

**PROMPT REQUIREMENTS:**

1. **COMPREHENSIVE DATA COLLECTION FRAMEWORK**
   - Request the most recent team statistics (last 10-15 matches)
   - Head-to-head historical data analysis
   - Current form indicators and trends
   - Player availability and injury reports
   - Tactical analysis requirements

2. **ADVANCED STATISTICAL ANALYSIS**
   - Performance metrics and advanced statistics
   - Home/away performance differentials
   - Goal-scoring patterns and defensive records
   - Set-piece effectiveness
   - Possession and control statistics

3. **MARKET ANALYSIS AND VALUE IDENTIFICATION**
   - Odds comparison across multiple bookmakers
   - Implied probability calculations
   - Value betting opportunities identification
   - Market movement analysis
   - Risk assessment and bankroll management

4. **PROFESSIONAL RECOMMENDATION STRUCTURE**
   - Clear betting recommendations with rationale
   - Confidence levels for each recommendation
   - Alternative betting options
   - Risk-reward analysis
   - Portfolio approach to betting

5. **ACADEMIC-LEVEL METHODOLOGY**
   - Statistical significance testing
   - Confidence intervals
   - Regression analysis considerations
   - Machine learning model validation approaches
   - Peer-reviewed methodology references

**OUTPUT FORMAT:**
The prompt should request a structured analysis with:
- Executive summary
- Detailed statistical breakdown
- Market analysis with specific odds evaluation
- Risk assessment matrix
- Specific betting recommendations with confidence levels
- Alternative scenarios and contingency plans

**LANGUAGE:** Write the entire prompt in English, regardless of the original language of the match data.

**ACADEMIC STANDARD:** This should be at PhD dissertation level, suitable for professional sports analysts and academic research.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{
            role: "user",
            content: promptRequest
          }],
          temperature: 0.2
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }
      console.log(`✅ Generated ${content.length} character PhD-level prompt for ${match.teamA} vs ${match.teamB}`);
      return matchHeader + content;
    } catch (error) {
      console.error(`❌ Error generating prompt for ${match.teamA} vs ${match.teamB}:`, error);
      return generateSportSpecificPrompt([match], sport)[0];
    }
  };

  const generateSportSpecificPrompt = (matches: any[], sport: string) => {
    return matches.map((match, index) => {
      // Extract match data for prompt header in English
      const matchHeader = `**MATCH DATA EXTRACTED FROM IMAGE:**

🏆 **MATCH:** ${match.teamA} vs ${match.teamB}
📅 **DATE/TIME:** ${match.matchDate || 'TBD'} ${match.matchTime || ''}
📍 **LEAGUE:** ${match.league || sport.toUpperCase()}
⚽ **SPORT:** ${sport}

💰 **ODDS DATA FROM IMAGE:**`;

      // Build odds section in English
      let oddsSection = '';
      if (match.odds) {
        if (match.odds.main1X2) {
          oddsSection += `\n- **1X2 Market:** ${match.teamA} ${match.odds.main1X2.home} | Draw ${match.odds.main1X2.draw} | ${match.teamB} ${match.odds.main1X2.away}`;
        }
        if (match.odds.btts) {
          oddsSection += `\n- **BTTS:** Yes ${match.odds.btts.yes} | No ${match.odds.btts.no}`;
        }
        if (match.odds.totalGoals) {
          const goals = match.odds.totalGoals;
          if (goals.over15 && goals.under15) {
            oddsSection += `\n- **Over/Under 1.5:** ${goals.over15} / ${goals.under15}`;
          }
          if (goals.over20 && goals.under20) {
            oddsSection += `\n- **Over/Under 2.0:** ${goals.over20} / ${goals.under20}`;
          }
        }
        if (match.odds.teamAGoals) {
          const teamGoals = match.odds.teamAGoals;
          if (teamGoals.over15 && teamGoals.under15) {
            oddsSection += `\n- **${match.teamA} Goals 1.5:** ${teamGoals.over15} / ${teamGoals.under15}`;
          }
          if (teamGoals.over25 && teamGoals.under25) {
            oddsSection += `\n- **${match.teamA} Goals 2.5:** ${teamGoals.over25} / ${teamGoals.under25}`;
          }
        }
        if (match.odds.advancement) {
          oddsSection += `\n- **Advancement:** ${match.teamA} ${match.odds.advancement.teamA} | ${match.teamB} ${match.odds.advancement.teamB}`;
        }
        if (match.odds.combinations) {
          const combo = match.odds.combinations;
          oddsSection += `\n- **Combinations:**`;
          if (combo.homeAndBttsYes) oddsSection += ` Home+BTTS ${combo.homeAndBttsYes}`;
          if (combo.drawAndBttsYes) oddsSection += ` | Draw+BTTS ${combo.drawAndBttsYes}`;
          if (combo.awayAndBttsNo) oddsSection += ` | Away+BTTS No ${combo.awayAndBttsNo}`;
        }
      } else {
        oddsSection = '\n- **Odds:** Could not be extracted from image';
      }

      switch (sport) {
        case 'football':
        case 'american-football':
          return `${matchHeader}${oddsSection}

---

🏈 **PHD-LEVEL FOOTBALL ANALYSIS PROMPT REQUEST:**

⏰ **TIME PRIORITY:**
1️⃣ **FIRST PRIORITY: TODAY'S matches** - ${new Date().toLocaleDateString('en-US')} 
2️⃣ **Second priority: Tomorrow's programs**
3️⃣ **Third priority: Next day (only if necessary)**

🎯 **REQUEST:**
Create a PhD-level, professional betting analysis prompt for this match. Use the latest data and statistics.

**📊 ANALYSIS FRAMEWORK:**

**1. TEAM FORM ANALYSIS**
- Last 10 match results (W-D-L)
- Home/away performance separately
- Goal statistics (scored/conceded average)
- Injuries, suspensions list

**2. HEAD-TO-HEAD RECORD**
- Last 5 meeting results
- Number of goals in these matches
- Home/away advantage in this pairing

**3. TACTICAL ANALYSIS**
- Playing style comparison
- Strengths and weaknesses
- Formation and key players

**4. MARKET ANALYSIS**
- Odds evaluation for all markets
- Value bet identification
- Implied probability vs real probability

**5. RECOMMENDATIONS**
- Best value bets
- Risk/reward ratio
- Bankroll management suggestions

**IMPORTANT:** Justify every recommendation with statistics and logical arguments!`;

        case 'tennis':
          return `${matchHeader}${oddsSection}

---

🎾 **PHD-LEVEL TENNIS ANALYSIS PROMPT REQUEST:**

⏰ **TIME PRIORITY:**
1️⃣ **FIRST PRIORITY: TODAY'S matches** - ${new Date().toLocaleDateString('en-US')} 
2️⃣ **Second priority: Tomorrow's ATP/WTA**
3️⃣ **Third priority: Next day (only if necessary)**

🎯 **REQUEST:**
Create a PhD-level, professional tennis betting analysis prompt for this match.

**📊 ANALYSIS FRAMEWORK:**

**1. PLAYER FORM**
- Last 10 match results
- Current ranking and trend
- Injuries, physical condition

**2. SURFACE ANALYSIS**
- Performance on this surface
- Favorite/least favorite surface
- Weather factors impact

**3. HEAD-TO-HEAD RECORD**
- H2H record
- Last meeting results
- Surface breakdown

**4. PLAYING STYLE COMPARISON**
- Serve vs return
- Baseline vs net play
- Physical vs technical game

**5. BETTING OPPORTUNITIES**
- Match winner
- Set betting
- Game handicap
- Over/Under games

**IMPORTANT:** Justify every recommendation with ATP/WTA statistics!`;

        case 'basketball':
          return `${matchHeader}${oddsSection}

---

🏀 **PHD-LEVEL BASKETBALL ANALYSIS PROMPT REQUEST:**

⏰ **TIME PRIORITY:**
1️⃣ **FIRST PRIORITY: TODAY'S NBA matches** - ${new Date().toLocaleDateString('en-US')} 
2️⃣ **Second priority: Tomorrow's programs**
3️⃣ **Third priority: Next day (only if necessary)**

🎯 **REQUEST:**
Create a PhD-level, professional NBA/basketball betting analysis prompt.

**📊 ANALYSIS FRAMEWORK:**

**1. TEAM STATISTICS**
- Offensive/Defensive rating
- Pace of play
- Shooting percentages
- Rebounding differentials

**2. KEY PLAYERS**
- Injuries, questionable status
- Usage rate, efficiency
- Matchup advantages

**3. SITUATIONAL FACTORS**
- Back-to-back games
- Home court advantage
- Rest days
- Travel distance

**4. BETTING MARKETS**
- Point spread
- Total points (Over/Under)
- Player props
- Quarter/Half bets

**5. ADVANCED METRICS**
- True shooting %
- Effective field goal %
- Turnover rate
- Free throw rate

**IMPORTANT:** Use NBA.com and Basketball Reference data!`;

        default:
          return `${matchHeader}${oddsSection}

---

🎯 **PHD-LEVEL ${sport.toUpperCase()} ANALYSIS PROMPT REQUEST:**

**🔍 BASIC RESEARCH - BEFORE ALL DATA:**
1️⃣ **Today's date:** ${new Date().toLocaleDateString('en-US')}
2️⃣ **Match to search:** ${match.teamA} vs ${match.teamB}
3️⃣ **Sport:** ${sport}

**📊 COMPLETE ANALYSIS FRAMEWORK:**

**1. BASIC DATA COLLECTION**
- Exact match time
- League/competition information
- Venue and conditions

**2. TEAM/PLAYER ANALYSIS**
- Current form
- Statistical indicators
- Injuries, absences

**3. MARKET ANALYSIS**
- Odds comparison
- Value bet search
- Implied probability calculation

**4. RISK ANALYSIS**
- Bankroll management
- Kelly criterion application
- Expected value calculation

**5. FINAL RECOMMENDATIONS**
- Specific betting recommendations
- Justification for each recommendation
- Risk level determination

**IMPORTANT:** Get all information from the latest sources!`;
      }
    });
  };

  const handleImportPrompts = (importedPrompts: Prompt[]) => {
    // Merge with existing prompts, avoiding duplicates by ID
    const existingIds = new Set([...prompts, ...aiPrompts].map(p => p.id));
    const newPrompts = importedPrompts.filter(p => !existingIds.has(p.id));
    
    // Separate AI and regular prompts
    const aiGeneratedPrompts = newPrompts.filter(p => p.tags?.includes('AI Generated'));
    const regularPrompts = newPrompts.filter(p => !p.tags?.includes('AI Generated'));
    
    if (aiGeneratedPrompts.length > 0) {
      setAiPrompts([...aiPrompts, ...aiGeneratedPrompts]);
    }
    if (regularPrompts.length > 0) {
      setPrompts([...prompts, ...regularPrompts]);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'traditional': return <Trophy className="text-blue-600" size={24} />;
      case 'racing': return <Target className="text-orange-600" size={24} />;
      case 'esports': return <Zap className="text-purple-600" size={24} />;
      default: return <Trophy className="text-gray-600" size={24} />;
    }
  };

  const getCategoryStats = () => {
    const allPrompts = [...prompts, ...aiPrompts];
    return {
      total: allPrompts.length,
      favorites: allPrompts.filter(p => p.isFavorite).length,
      traditional: allPrompts.filter(p => p.category === 'traditional').length,
      racing: allPrompts.filter(p => p.category === 'racing').length,
      esports: allPrompts.filter(p => p.category === 'esports').length,
      general: allPrompts.filter(p => p.type === 'general').length,
      specific: allPrompts.filter(p => p.type === 'specific').length,
      aiGenerated: aiPrompts.length,
    };
  };

  const stats = getCategoryStats();

  // Lazy loading for filtered prompts
  const {
    visibleItems: visiblePrompts,
    hasMore,
    isLoading: isLoadingMore,
    loadMore,
    visibleCount,
    totalCount,
    loadMoreRef
  } = useLazyLoading(filteredPrompts, {
    initialCount: 6,
    increment: 4,
    delay: 300,
    threshold: 0.1,
    rootMargin: '100px'
  });

  if (isGenerating) {
    return <LoadingScreen progress={generationProgress} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/30 to-cyan-600/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <div className={`relative backdrop-blur-xl shadow-2xl sticky top-0 z-40 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900/90 border-b border-gray-700/30' 
          : 'bg-white/90 border-b border-white/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between animate-fade-in-down space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="relative p-2 sm:p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-xl sm:rounded-2xl shadow-2xl animate-glow">
                <Trophy className="text-white" size={24} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                  Sports Betting Prompt Manager
                </h1>
                <p className={`mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Sparkles className="text-yellow-500" size={16} />
                  PhD-level analysis prompts for professional betting decisions
                </p>
              </div>
            </div>
            
            {/* Page Navigation & Dark Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => {
                    saveCurrentState();
                    setCurrentPage('regular');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === 'regular'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  Regular Prompts
                </button>
                <button
                  onClick={() => {
                    saveCurrentState();
                    setCurrentPage('ai');
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    currentPage === 'ai'
                      ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                  }`}
                >
                  <Bot size={16} />
                  AI Generated ({stats.aiGenerated})
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 sm:grid-cols-7 lg:flex lg:items-center gap-3 sm:gap-4 lg:gap-8">
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">{stats.total}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold flex items-center justify-center gap-1">
                  <BarChart3 size={12} className="hidden sm:block" />
                  <span className="hidden sm:inline">Total</span>
                  <span className="sm:hidden">All</span>
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-red-600 to-pink-700 bg-clip-text text-transparent">{stats.favorites}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-semibold flex items-center justify-center gap-1">
                  <Heart size={12} className="hidden sm:block" />
                  <span className="hidden sm:inline">Favorites</span>
                  <span className="sm:hidden">Fav</span>
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-purple-600 to-violet-700 bg-clip-text text-transparent">{stats.aiGenerated}</div>
                <div className={`text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Bot size={12} className="hidden sm:block" />
                  <span className="hidden sm:inline">AI Generated</span>
                  <span className="sm:hidden">AI</span>
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-emerald-600 to-emerald-700 bg-clip-text text-transparent">{stats.traditional}</div>
                <div className={`text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Trophy size={12} className="hidden sm:block" />
                  <span className="hidden sm:inline">Traditional</span>
                  <span className="sm:hidden">Trad</span>
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent">{stats.racing}</div>
                <div className={`text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Target size={12} className="hidden sm:block" />
                  Racing
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-purple-600 to-violet-700 bg-clip-text text-transparent">{stats.esports}</div>
                <div className={`text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Zap size={12} className="hidden sm:block" />
                  Esports
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-cyan-600 to-teal-700 bg-clip-text text-transparent">{stats.general}</div>
                <div className={`text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <TrendingUp size={12} className="hidden sm:block" />
                  <span className="hidden sm:inline">EV Scanners</span>
                  <span className="sm:hidden">EV</span>
                </div>
              </div>
              <div className="text-center group hover-scale">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black bg-gradient-to-br from-violet-600 to-purple-700 bg-clip-text text-transparent">{stats.specific}</div>
                <div className={`text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Award size={12} className="hidden sm:block" />
                  <span className="hidden sm:inline">Match Analysis</span>
                  <span className="sm:hidden">Match</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dark Mode Toggle - Top Right Corner */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg ${
                darkMode 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-400' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {currentPage === 'ai' ? (
          <AIPromptPage
            prompts={aiPrompts}
            onEdit={handleEditPrompt}
            onDelete={handleDeletePrompt}
            onToggleFavorite={handleToggleFavorite}
            onShowAnalytics={handleShowAnalytics}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearchFocus={saveCurrentState}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavorites={setShowFavoritesOnly}
            onShowAI={() => setIsAIModalOpen(true)}
            onShowExportImport={() => setIsExportImportModalOpen(true)}
            onResetToOriginal={handleResetToOriginal}
            onResetToPrevious={handleResetToPrevious}
            selectedCategory={selectedCategory}
            selectedSport={selectedSport}
            selectedType={selectedType}
            onCategoryChange={setSelectedCategory}
            onCategoryFocus={saveCurrentState}
            onSportChange={setSelectedSport}
            onTypeChange={setSelectedType}
            darkMode={darkMode}
          />
        ) : (
          <>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddNew={handleAddNew}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavorites={setShowFavoritesOnly}
          onToggleFocus={saveCurrentState}
          onShowAI={() => setIsAIModalOpen(true)}
          onShowExportImport={() => setIsExportImportModalOpen(true)}
          onResetToOriginal={handleResetToOriginal}
          onResetToPrevious={handleResetToPrevious}
          darkMode={darkMode}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          selectedSport={selectedSport}
          selectedType={selectedType}
          onCategoryFocus={saveCurrentState}
          onCategoryChange={setSelectedCategory}
          onSportChange={setSelectedSport}
          onTypeChange={setSelectedType}
          darkMode={darkMode}
        />

        {/* Results Count */}
        <div className="mb-6 sm:mb-8 animate-fade-in-up">
          <p className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Showing <span className="font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{visibleCount}</span> 
            of <span className="font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{totalCount}</span>
            {totalCount === 1 ? ' prompt' : ' prompts'}
            {showFavoritesOnly && <span className="text-red-600"> (favorites only)</span>}
          </p>
        </div>

        {/* Prompts Grid */}
        {totalCount === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20 animate-fade-in-up">
            <div className={`backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 hover-lift mx-4 sm:mx-0 transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800/90 border border-gray-700/30' 
                : 'bg-white/90 border border-white/30'
            }`}>
              <div className="relative mb-6">
                <Trophy className={`mx-auto animate-float transition-colors duration-300 ${
                  darkMode ? 'text-gray-600' : 'text-gray-400'
                }`} size={60} />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                No prompts found
              </h3>
              <p className={`mb-6 sm:mb-8 text-base sm:text-lg font-medium transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {selectedCategory !== 'all' || selectedSport !== 'all' || selectedType !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'Get started by adding your first prompt.'}
              </p>
              <button
                onClick={handleAddNew}
                className="btn-success ripple micro-bounce"
              >
                <Sparkles className="inline mr-2" size={20} />
                Add Your First Prompt
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {visiblePrompts.map((prompt) => (
                <PromptCard
                key={prompt.id}
                prompt={prompt}
                onEdit={handleEditPrompt}
                onDelete={handleDeletePrompt}
                onToggleFavorite={handleToggleFavorite}
                onShowAnalytics={handleShowAnalytics}
                darkMode={darkMode}
                />
              ))}
            </div>
            
            {/* Load More Button - Auto-loading with Intersection Observer */}
            {hasMore && (
              <div 
                ref={loadMoreRef}
                className="text-center mt-12 animate-fade-in-up"
              >
                {isLoadingMore ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className={`font-medium transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Loading more prompts...
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={loadMore}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto"
                  >
                    <Sparkles size={20} />
                    Load More Prompts ({totalCount - visibleCount} remaining)
                  </button>
                )}
                <p className={`mt-3 text-sm font-medium transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Showing {visibleCount} of {totalCount} prompts
                </p>
              </div>
            )}
          </>
        )}
        </>
        )}
      </div>

      {/* Modal */}
      <PromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePrompt}
        prompt={editingPrompt}
        darkMode={darkMode}
      />

      {/* Analytics Modal */}
      {analyticsPrompt && (
        <AnalyticsModal
          isOpen={isAnalyticsModalOpen}
          onClose={() => setIsAnalyticsModalOpen(false)}
          prompt={analyticsPrompt}
          onUpdateSuccess={handleUpdateSuccess}
          darkMode={darkMode}
        />
      )}

      {/* AI Generation Modal */}
      <AIGenerationModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGeneration}
        darkMode={darkMode}
      />

      {/* Export/Import Modal */}
      <ExportImportModal
        isOpen={isExportImportModalOpen}
        onClose={() => setIsExportImportModalOpen(false)}
        prompts={[...prompts, ...aiPrompts]}
        onImport={handleImportPrompts}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;