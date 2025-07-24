import React from 'react';
import { Prompt } from '../types';
import { PromptCard } from './PromptCard';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { Bot, Sparkles, Trophy } from 'lucide-react';

interface AIPromptPageProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onShowAnalytics: (prompt: Prompt) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchFocus?: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: (show: boolean) => void;
  onResetToOriginal?: () => void;
  onResetToPrevious?: () => void;
  onShowAI: () => void;
  onShowExportImport: () => void;
  selectedCategory: string;
  selectedSport: string;
  selectedType: string;
  onCategoryFocus?: () => void;
  onCategoryChange: (category: string) => void;
  onSportChange: (sport: string) => void;
  onTypeChange: (type: string) => void;
  darkMode?: boolean;
}

export function AIPromptPage({
  prompts,
  onEdit,
  onDelete,
  onToggleFavorite,
  onShowAnalytics,
  searchTerm,
  onSearchChange,
  onSearchFocus,
  showFavoritesOnly,
  onToggleFavorites,
  onResetToOriginal,
  onResetToPrevious,
  onShowAI,
  onShowExportImport,
  selectedCategory,
  selectedSport,
  selectedType,
  onCategoryFocus,
  onCategoryChange,
  onSportChange,
  onTypeChange,
  darkMode
}: AIPromptPageProps) {
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = searchTerm === '' || 
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesSport = selectedSport === 'all' || prompt.sport === selectedSport;
    const matchesType = selectedType === 'all' || prompt.type === selectedType;
    const matchesFavorites = !showFavoritesOnly || prompt.isFavorite;

    return matchesSearch && matchesCategory && matchesSport && matchesType && matchesFavorites;
  });

  return (
    <>
      {/* AI Page Header */}
      <div className={`backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 mb-4 sm:mb-8 transition-colors duration-300 ${
        darkMode 
          ? 'bg-purple-900/20 border border-purple-700/30' 
          : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg sm:rounded-xl shadow-lg">
              <Bot className="text-white" size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Generated Prompts
              </h2>
              <p className={`text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Sparkles className="text-yellow-500" size={12} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Automatically created with GPT-4o Vision</span>
                <span className="sm:hidden">GPT-4o Vision powered</span>
              </p>
            </div>
          </div>
          <div className={`text-center sm:text-right transition-colors duration-300 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <div className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {prompts.length}
            </div>
            <div className="text-xs sm:text-sm font-semibold">AI Prompts</div>
          </div>
        </div>
        
        {/* AI Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
            darkMode ? 'bg-blue-900/20' : 'bg-blue-100'
          }`}>
            <div className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
              darkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              📸 Image Recognition
            </div>
            <div className={`text-xs transition-colors duration-300 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <span className="hidden sm:inline">Extracts matches & odds from screenshots</span>
              <span className="sm:hidden">Extracts match data</span>
            </div>
          </div>
          <div className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
            darkMode ? 'bg-purple-900/20' : 'bg-purple-100'
          }`}>
            <div className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
              darkMode ? 'text-purple-300' : 'text-purple-800'
            }`}>
              🧠 PhD-Level Analysis
            </div>
            <div className={`text-xs transition-colors duration-300 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              <span className="hidden sm:inline">Professional betting frameworks</span>
              <span className="sm:hidden">Pro frameworks</span>
            </div>
          </div>
          <div className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
            darkMode ? 'bg-green-900/20' : 'bg-green-100'
          }`}>
            <div className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
              darkMode ? 'text-green-300' : 'text-green-800'
            }`}>
              ⚡ Multi-Match Support
            </div>
            <div className={`text-xs transition-colors duration-300 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}>
              <span className="hidden sm:inline">Separate prompts for each match</span>
              <span className="sm:hidden">Multi-match prompts</span>
            </div>
          </div>
        </div>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={onToggleFavorites}
        onShowAI={onShowAI}
        onShowExportImport={onShowExportImport}
        onResetToOriginal={onResetToOriginal}
        onResetToPrevious={onResetToPrevious}
        darkMode={darkMode}
        onAddNew={() => {}} // AI page doesn't need manual add
        isAIPage={true}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        selectedSport={selectedSport}
        selectedType={selectedType}
        onCategoryFocus={onCategoryFocus}
        onCategoryChange={onCategoryChange}
        onSportChange={onSportChange}
        onTypeChange={onTypeChange}
        darkMode={darkMode}
      />

      {/* Results Count */}
      <div className="mb-4 sm:mb-8 animate-fade-in-up">
        <p className={`text-sm sm:text-lg font-semibold transition-colors duration-300 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Showing <span className="font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{filteredPrompts.length}</span> 
          {filteredPrompts.length === 1 ? ' AI prompt' : ' AI prompts'}
          {showFavoritesOnly && <span className="text-red-600"> (favorites only)</span>}
          {searchTerm && (
            <span> matching "<span className="font-bold text-purple-600">{searchTerm}</span>"</span>
          )}
        </p>
      </div>

      {/* AI Prompts Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="text-center py-8 sm:py-20 animate-fade-in-up">
          <div className={`backdrop-blur-xl rounded-xl sm:rounded-3xl shadow-2xl p-6 sm:p-16 hover-lift mx-2 sm:mx-0 transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800/90 border border-gray-700/30' 
              : 'bg-white/90 border border-white/30'
          }`}>
            <div className="relative mb-6">
              <Bot className={`mx-auto animate-float transition-colors duration-300 ${
                darkMode ? 'text-purple-400' : 'text-purple-500'
              }`} size={60} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              No AI prompts yet
            </h3>
            <p className={`mb-8 text-lg font-medium transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Upload betting screenshots to generate professional analysis prompts with AI.
            </p>
            <button
              onClick={onShowAI}
              className="btn-primary ripple micro-bounce"
            >
              <Bot className="inline mr-2" size={20} />
              Generate AI Prompts
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
              onShowAnalytics={onShowAnalytics}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </>
  );
}