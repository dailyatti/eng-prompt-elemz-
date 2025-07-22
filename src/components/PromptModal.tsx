import React, { useState, useEffect } from 'react';
import { X, Save, Sparkles } from 'lucide-react';
import { Prompt } from '../types';
import { sportsCategories } from '../data/sportsData';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  prompt?: Prompt;
}

export function PromptModal({ isOpen, onClose, onSave, prompt }: PromptModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    sport: '',
    category: 'traditional' as 'traditional' | 'racing' | 'esports',
    type: 'general' as 'general' | 'specific',
    tags: '',
    teamA: '',
    teamB: '',
  });

  useEffect(() => {
    if (prompt) {
      setFormData({
        title: prompt.title,
        content: prompt.content,
        sport: prompt.sport,
        category: prompt.category,
        type: prompt.type,
        tags: prompt.tags.join(', '),
        teamA: '',
        teamB: '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        sport: '',
        category: 'traditional',
        type: 'general',
        tags: '',
        teamA: '',
        teamB: '',
      });
    }
  }, [prompt, isOpen]);

  const updatePromptContent = (content: string, teamA: string, teamB: string) => {
    if (formData.type === 'specific' && teamA && teamB) {
      return content
        .replace(/\[TEAM A\]/g, teamA.toUpperCase())
        .replace(/\[Team A\]/g, teamA)
        .replace(/\[TEAM B\]/g, teamB.toUpperCase())
        .replace(/\[Team B\]/g, teamB)
        .replace(/\[PLAYER A\]/g, teamA)
        .replace(/\[Player A\]/g, teamA)
        .replace(/\[PLAYER B\]/g, teamB)
        .replace(/\[Player B\]/g, teamB);
    }
    return content;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const finalContent = updatePromptContent(formData.content, formData.teamA, formData.teamB);

    onSave({
      title: formData.title,
      content: finalContent,
      sport: formData.sport,
      category: formData.category,
      type: formData.type,
      tags,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-3xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-white/20 animate-scale-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 lg:p-8 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50 space-y-3 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
            <Sparkles className="text-yellow-500" size={24} />
            {prompt ? 'Edit Prompt' : 'Add New Prompt'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:bg-gray-100 rounded-lg sm:rounded-xl self-end sm:self-auto"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-160px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-base sm:text-lg">📝</span>
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400 font-medium text-gray-800 shadow-sm hover:shadow-md"
                placeholder="Enter prompt title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                <span className="text-base sm:text-lg">🏆</span>
                Sport
                <span className="text-xs text-gray-500 ml-2">(Optional)</span>
              </label>
              <select
                value={formData.sport}
                onChange={(e) => {
                  const selectedSport = sportsCategories.find(s => s.id === e.target.value);
                  setFormData({ 
                    ...formData, 
                    sport: e.target.value,
                    category: selectedSport?.category || (e.target.value ? 'traditional' : 'traditional')
                  });
                }}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium text-gray-800 shadow-sm hover:shadow-md cursor-pointer"
              >
                <option value="">Other / Not Specified</option>
                {sportsCategories.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                <span className="text-base sm:text-lg">⚡</span>
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'general' | 'specific' })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium text-gray-800 shadow-sm hover:shadow-md cursor-pointer sm:col-span-2 lg:col-span-1"
                required
              >
                <option value="general">General EV Scanner</option>
                <option value="specific">Specific Match Analysis</option>
              </select>
            </div>
          </div>

          {formData.type === 'specific' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl sm:rounded-2xl border border-blue-200/50 shadow-inner">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="text-base sm:text-lg">🥇</span>
                  Team/Player A
                </label>
                <input
                  type="text"
                  value={formData.teamA}
                  onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
                  placeholder="Enter team or player name"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400 font-medium text-gray-800 shadow-sm hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <span className="text-base sm:text-lg">🥈</span>
                  Team/Player B
                </label>
                <input
                  type="text"
                  value={formData.teamB}
                  onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
                  placeholder="Enter team or player name"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400 font-medium text-gray-800 shadow-sm hover:shadow-md"
                />
              </div>
            </div>
          )}

          <div className="mb-6 sm:mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-base sm:text-lg">🏷️</span>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., statistics, weather, form analysis"
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400 font-medium text-gray-800 shadow-sm hover:shadow-md"
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
              <span className="text-base sm:text-lg">📋</span>
              Prompt Content
              {formData.type === 'specific' && (
                <span className="text-xs sm:text-sm text-blue-600 ml-2 font-medium block sm:inline">
                  (Use [TEAM A], [TEAM B], [PLAYER A], [PLAYER B] placeholders - they will be replaced with the names above)
                </span>
              )}
            </label>
            <textarea
              value={updatePromptContent(formData.content, formData.teamA, formData.teamB)}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={16}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400 font-mono text-sm leading-relaxed text-gray-800 shadow-sm hover:shadow-md resize-none"
              placeholder="Enter your detailed prompt content here..."
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 sm:px-8 py-3 sm:py-4 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 font-bold text-base sm:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 order-1 sm:order-2"
            >
              <Save size={18} />
              {prompt ? 'Update Prompt' : 'Add Prompt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}