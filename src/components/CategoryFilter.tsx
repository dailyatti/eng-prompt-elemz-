import React from 'react';
import { sportsCategories } from '../data/sportsData';

interface CategoryFilterProps {
  selectedCategory: string;
  selectedSport: string;
  selectedType: string;
  onCategoryFocus?: () => void;
  onCategoryChange: (category: string) => void;
  onSportChange: (sport: string) => void;
  onTypeChange: (type: string) => void;
  darkMode?: boolean;
}

export function CategoryFilter({
  selectedCategory,
  selectedSport,
  selectedType,
  onCategoryFocus,
  onCategoryChange,
  onSportChange,
  onTypeChange,
  darkMode,
}: CategoryFilterProps) {
  const categories = [
    { id: 'all', name: 'All Sports', category: 'all' },
    { id: 'traditional', name: 'Traditional Sports', category: 'traditional' },
    { id: 'racing', name: 'Racing', category: 'racing' },
    { id: 'esports', name: 'Esports', category: 'esports' },
  ];

  const types = [
    { id: 'all', name: 'All Types' },
    { id: 'general', name: 'General EV Scanners' },
    { id: 'specific', name: 'Specific Match Analysis' },
  ];
  const filteredSports = selectedCategory === 'all' 
    ? sportsCategories 
    : sportsCategories.filter(sport => sport.category === selectedCategory);

  return (
    <div className={`backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-6 lg:p-8 mb-4 sm:mb-8 lg:mb-10 animate-fade-in-up hover-lift transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-800/90 border border-gray-700/30' 
        : 'bg-white/90 border border-white/30'
    }`}>
      <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <span className="text-lg sm:text-2xl">🎯</span>
        <span className="hidden sm:inline">Filter by Category & Sport</span>
        <span className="sm:hidden">Filters</span>
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 transition-colors duration-300 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="text-sm sm:text-lg">📂</span>
            <span className="hidden sm:inline">Category</span>
            <span className="sm:hidden">Cat</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              onCategoryFocus?.();
              onCategoryChange(e.target.value);
              onSportChange('all'); // Reset sport filter when category changes
            }}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 font-semibold border-2 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-xs sm:text-base ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 transition-colors duration-300 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="text-sm sm:text-lg">⚡</span>
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 font-semibold border-2 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-xs sm:text-base ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
          >
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className={`block text-xs sm:text-sm font-bold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 transition-colors duration-300 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="text-sm sm:text-lg">🏆</span>
            Sport
          </label>
          <select
            value={selectedSport}
            onChange={(e) => onSportChange(e.target.value)}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 font-semibold border-2 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-xs sm:text-base ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-200' 
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
          >
            <option value="all">All Sports</option>
            {filteredSports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.icon} {sport.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}