import React from 'react';
import { X, TrendingUp, Target, DollarSign, Calendar, Award } from 'lucide-react';
import { Prompt } from '../types';
import { usePromptAnalytics } from '../hooks/usePromptAnalytics';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: Prompt;
  onUpdateSuccess: (won: boolean, betAmount: number, winAmount: number) => void;
}

export function AnalyticsModal({ isOpen, onClose, prompt, onUpdateSuccess }: AnalyticsModalProps) {
  const { getAnalytics } = usePromptAnalytics();
  const analytics = getAnalytics(prompt.id);
  const [betAmount, setBetAmount] = React.useState('');
  const [winAmount, setWinAmount] = React.useState('');

  const handleSuccess = (won: boolean) => {
    const bet = parseFloat(betAmount) || 0;
    const win = parseFloat(winAmount) || 0;
    onUpdateSuccess(won, bet, win);
    setBetAmount('');
    setWinAmount('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-3xl w-full max-w-2xl border border-white/20">
        <div className="flex justify-between items-center p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <TrendingUp className="text-blue-600" size={24} />
            Prompt Analytics
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{prompt.title}</h3>
          
          {analytics ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-blue-600" size={20} />
                  <span className="font-semibold text-blue-800">Usage Count</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{analytics.usageCount}</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-green-600" size={20} />
                  <span className="font-semibold text-green-800">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {analytics.totalBets > 0 ? `${analytics.successRate.toFixed(1)}%` : 'N/A'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="text-purple-600" size={20} />
                  <span className="font-semibold text-purple-800">ROI</span>
                </div>
                <div className={`text-2xl font-bold ${analytics.roi >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                  ${analytics.roi.toFixed(2)}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-orange-600" size={20} />
                  <span className="font-semibold text-orange-800">Last Used</span>
                </div>
                <div className="text-sm font-bold text-orange-900">
                  {new Date(analytics.lastUsed).toLocaleDateString('en-US')}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No analytics data yet. Use this prompt to start tracking!</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-bold text-gray-800 mb-4">Update Bet Result</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bet Amount ($)</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Win Amount ($)</label>
                <input
                  type="number"
                  value={winAmount}
                  onChange={(e) => setWinAmount(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  placeholder="180"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleSuccess(true)}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
              >
                Won 🎉
              </button>
              <button
                onClick={() => handleSuccess(false)}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
              >
                Lost 😔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}