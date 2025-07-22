import React from 'react';
import { Search, Plus, Sparkles, Heart, Bot, FileText } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchFocus?: () => void;
  onAddNew: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: (show: boolean) => void;
  onToggleFocus?: () => void;
  onShowAI: () => void;
  onShowExportImport: () => void;
  onResetToOriginal?: () => void;
  onResetToPrevious?: () => void;
  darkMode?: boolean;
  isAIPage?: boolean;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  onSearchFocus,
  onAddNew, 
  showFavoritesOnly, 
  onToggleFavorites,
  onToggleFocus,
  onShowAI,
  onShowExportImport,
  onResetToOriginal,
  onResetToPrevious,
  darkMode,
  isAIPage = false
}: SearchBarProps) {
  return (
    <div className={`backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up hover-lift transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-800/90 border border-gray-700/30' 
        : 'bg-white/90 border border-white/30'
    }`}>
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Search and Main Actions */}
        {!isAIPage && (
          <div className="flex justify-end">
            <button
              onClick={onAddNew}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg ripple micro-bounce whitespace-nowrap"
            >
              <Plus size={18} />
              <Sparkles size={16} className="hidden sm:block" />
              <span className="hidden sm:inline">Add New Prompt</span>
              <span className="sm:hidden">Add Prompt</span>
            </button>
          </div>
        )}

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          {/* Reset Buttons */}
          {(onResetToOriginal || onResetToPrevious) && (
            <>
              <button
                onClick={onResetToOriginal}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-yellow-400'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-yellow-400'
                }`}
                title="Reset all filters to original state"
              >
                🔄 <span className="hidden sm:inline">Reset All</span>
              </button>
              
              <button
                onClick={onResetToPrevious}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 border-2 border-gray-600 hover:border-orange-400'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-400'
                }`}
                title="Reset to previous state"
              >
                ↩️ <span className="hidden sm:inline">Previous</span>
              </button>
            </>
          )}

          <button
            onClick={() => {
              onToggleFocus?.();
              onToggleFavorites(!showFavoritesOnly);
            }}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
              showFavoritesOnly
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-200 border-2 border-gray-600 hover:border-red-400'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-400'
            }`}
          >
            <Heart size={16} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
            <span className="hidden sm:inline">
              {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
            </span>
            <span className="sm:hidden">Fav</span>
          </button>

          <button
            onClick={onShowAI}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
              isAIPage
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
            }`}
          >
            <Bot size={16} />
            <span className="hidden sm:inline">{isAIPage ? 'Generate More' : 'AI Generate'}</span>
            <span className="sm:hidden">{isAIPage ? '+AI' : 'AI'}</span>
          </button>

          <button
            onClick={onShowExportImport}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Export/Import</span>
            <span className="sm:hidden">Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}