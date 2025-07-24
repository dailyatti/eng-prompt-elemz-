import React, { useState } from 'react';
import { Copy, Edit3, Trash2, Check, Sparkles, Calendar, Tag, Heart, BarChart3, TrendingUp } from 'lucide-react';
import { Prompt } from '../types';
import { usePromptAnalytics } from '../hooks/usePromptAnalytics';

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onShowAnalytics: (prompt: Prompt) => void;
  darkMode?: boolean;
}

export function PromptCard({ prompt, onEdit, onDelete, onToggleFavorite, onShowAnalytics, darkMode }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const { trackUsage, getAnalytics } = usePromptAnalytics();
  const analytics = getAnalytics(prompt.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      trackUsage(prompt.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeColor = (type: string) => {
    return type === 'general' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-purple-100 text-purple-800';
  };

  const getTypeLabel = (type: string) => {
    return type === 'general' ? 'EV Scanner' : 'Match Analysis';
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-3 sm:p-6 lg:p-8 animate-fade-in-up group ${
      darkMode 
        ? 'bg-gray-800/95 border border-gray-700/40' 
        : 'bg-white/95 border border-white/40'
    }`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-6 space-y-3 sm:space-y-0">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <button
              onClick={() => onToggleFavorite(prompt.id)}
              className={`p-2 rounded-lg transition-all ${
                prompt.isFavorite 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : darkMode
                    ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              title={prompt.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={16} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          <h3 className={`text-base sm:text-xl lg:text-2xl font-black mb-2 sm:mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {prompt.title}
          </h3>
          <div className="flex flex-wrap gap-1 sm:gap-3 mb-2 sm:mb-4">
            <span className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-lg sm:rounded-xl font-bold shadow-md ${getTypeColor(prompt.type)} flex items-center gap-1 sm:gap-2`}>
              <Sparkles size={10} className="sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">{getTypeLabel(prompt.type)}</span>
              <span className="sm:hidden">{prompt.type === 'general' ? 'EV' : 'Match'}</span>
            </span>
            {analytics && analytics.usageCount > 0 && (
              <span className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs sm:text-sm rounded-lg sm:rounded-xl font-bold shadow-sm flex items-center gap-1">
                <TrendingUp size={10} />
                <span className="hidden sm:inline">Used {analytics.usageCount}x</span>
                <span className="sm:hidden">{analytics.usageCount}x</span>
              </span>
            )}
            {prompt.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs sm:text-sm rounded-lg sm:rounded-xl font-bold shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1"
              >
                <Tag size={10} className="hidden sm:block" />
                <span className="hidden sm:inline">{tag}</span>
                <span className="sm:hidden">{tag.length > 8 ? tag.substring(0, 8) + '...' : tag}</span>
              </span>
            ))}
            {prompt.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-bold">
                +{prompt.tags.length - 2}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 sm:gap-3 sm:ml-6 justify-center sm:justify-start">
          <button
            onClick={() => onShowAnalytics(prompt)}
            className="p-2 sm:p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ripple micro-bounce"
            title="View analytics"
          >
            <BarChart3 size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 sm:p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg sm:rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 flex items-center gap-1 sm:gap-2 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ripple micro-bounce"
            title="Copy prompt"
          >
            {copied ? <Check size={14} className="sm:w-4 sm:h-4" /> : <Copy size={14} className="sm:w-4 sm:h-4" />}
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
          <button
            onClick={() => onEdit(prompt)}
            className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ripple micro-bounce"
            title="Edit prompt"
          >
            <Edit3 size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onDelete(prompt.id)}
            className="p-2 sm:p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg sm:rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ripple micro-bounce"
            title="Delete prompt"
          >
            <Trash2 size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      
      <div className={`rounded-lg sm:rounded-2xl p-2 sm:p-4 lg:p-6 mb-3 sm:mb-6 shadow-inner transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 border border-gray-600' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
      }`}>
        <pre className={`text-xs sm:text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto transition-colors duration-300 ${
          darkMode 
            ? 'text-gray-200 selection:bg-blue-600/30' 
            : 'text-gray-800 selection:bg-blue-200'
        }`}>
          {prompt.content.length > 200 
            ? `${prompt.content.substring(0, 200)}...`
            : prompt.content
          }
        </pre>
      </div>
      
      <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm font-semibold space-y-1 sm:space-y-0 transition-colors duration-300 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <span className="flex items-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-lg">🏆</span>
          <span className="font-bold hidden sm:inline">Sport:</span>
          <span className="font-bold sm:hidden">🏆</span>
          <span className="hidden sm:inline">{prompt.sport}</span>
          <span className="sm:hidden">{prompt.sport.length > 10 ? prompt.sport.substring(0, 10) + '...' : prompt.sport}</span>
        </span>
        {analytics && analytics.successRate > 0 && (
          <span className="flex items-center gap-1 sm:gap-2">
            <TrendingUp size={10} className="sm:w-3 sm:h-3" />
            <span className="font-bold hidden sm:inline">Success:</span>
            <span className="font-bold sm:hidden">✓</span>
            <span>{analytics.successRate.toFixed(1)}%</span>
          </span>
        )}
        <span className="flex items-center gap-1 sm:gap-2">
          <Calendar size={10} className="sm:w-3 sm:h-3" />
          <span className="font-bold hidden sm:inline">Updated:</span>
          <span className="font-bold sm:hidden">📅</span>
          <span className="hidden sm:inline">{formatDate(prompt.updatedAt)}</span>
          <span className="sm:hidden">{new Date(prompt.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </span>
      </div>
    </div>
  );
}