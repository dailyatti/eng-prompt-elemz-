import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { PromptAnalytics } from '../types';

export function usePromptAnalytics() {
  const [analytics, setAnalytics] = useLocalStorage<PromptAnalytics[]>('prompt-analytics', []);

  const trackUsage = useCallback((promptId: string) => {
    setAnalytics(prev => {
      const existing = prev.find(a => a.promptId === promptId);
      if (existing) {
        return prev.map(a => 
          a.promptId === promptId 
            ? { ...a, usageCount: a.usageCount + 1, lastUsed: new Date().toISOString() }
            : a
        );
      } else {
        return [...prev, {
          promptId,
          usageCount: 1,
          lastUsed: new Date().toISOString(),
          successRate: 0,
          totalBets: 0,
          winningBets: 0,
          roi: 0
        }];
      }
    });
  }, [setAnalytics]);

  const updateSuccessRate = useCallback((promptId: string, won: boolean, betAmount: number, winAmount: number) => {
    setAnalytics(prev => {
      return prev.map(a => {
        if (a.promptId === promptId) {
          const newTotalBets = a.totalBets + 1;
          const newWinningBets = won ? a.winningBets + 1 : a.winningBets;
          const newSuccessRate = (newWinningBets / newTotalBets) * 100;
          const profit = won ? winAmount - betAmount : -betAmount;
          const newRoi = a.roi + profit;
          
          return {
            ...a,
            totalBets: newTotalBets,
            winningBets: newWinningBets,
            successRate: newSuccessRate,
            roi: newRoi
          };
        }
        return a;
      });
    });
  }, [setAnalytics]);

  const getAnalytics = useCallback((promptId: string) => {
    return analytics.find(a => a.promptId === promptId);
  }, [analytics]);

  return {
    analytics,
    trackUsage,
    updateSuccessRate,
    getAnalytics
  };
}