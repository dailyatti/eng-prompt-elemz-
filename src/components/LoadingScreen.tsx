import React from 'react';
import { Bot, Sparkles, Zap, Target } from 'lucide-react';

interface LoadingScreenProps {
  progress: {
    current: number;
    total: number;
    currentMatch: string;
  };
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const percentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* AI Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
            <Bot className="text-white" size={40} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse shadow-lg flex items-center justify-center">
            <Sparkles size={16} className="text-yellow-900" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Generating Prompts
        </h1>
        
        {/* Subtitle */}
        <p className="text-purple-200 text-lg font-semibold mb-8 flex items-center justify-center gap-2">
          <Zap className="text-yellow-400" size={16} />
          Creating PhD-level betting analysis
        </p>
        
        {/* Auto-switch notice */}
        <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 mb-6">
          <p className="text-yellow-200 text-sm font-medium">
            ⚡ Will automatically switch to AI Prompts page when complete
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-purple-300 mb-2 font-semibold">
            <span>Progress: {progress.current}/{progress.total}</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-purple-900/50 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Current Match */}
        {progress.currentMatch && (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="text-green-400" size={16} />
              <span className="text-green-400 font-bold text-sm">Currently Processing</span>
            </div>
            <p className="text-white font-bold text-lg">{progress.currentMatch}</p>
          </div>
        )}

        {/* Feature List */}
        <div className="text-left bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <h3 className="text-white font-bold mb-3 text-center">What's Being Generated:</h3>
          <div className="space-y-2 text-sm text-purple-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Team/Player analysis for each match</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span>Odds analysis and value identification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span>Kelly Criterion bet sizing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <span>Risk assessment framework</span>
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}