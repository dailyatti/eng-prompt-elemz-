import React, { useState } from 'react';
import { X, Download, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Prompt } from '../types';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: Prompt[];
  onImport: (prompts: Prompt[]) => void;
}

export function ExportImportModal({ isOpen, onClose, prompts, onImport }: ExportImportModalProps) {
  const [importData, setImportData] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  const handleExport = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sports-betting-prompts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(importData);
      
      if (!Array.isArray(parsedData)) {
        throw new Error('Invalid format: Expected an array of prompts');
      }

      // Validate prompt structure
      const validPrompts = parsedData.filter(prompt => {
        return prompt.id && prompt.title && prompt.content && prompt.sport;
      });

      if (validPrompts.length === 0) {
        throw new Error('No valid prompts found in the data');
      }

      // Add missing fields with defaults
      const processedPrompts = validPrompts.map(prompt => ({
        ...prompt,
        isFavorite: prompt.isFavorite || false,
        usageCount: prompt.usageCount || 0,
        lastUsed: prompt.lastUsed || new Date().toISOString(),
        successRate: prompt.successRate || 0,
        totalBets: prompt.totalBets || 0,
        winningBets: prompt.winningBets || 0,
        roi: prompt.roi || 0,
        createdAt: prompt.createdAt || new Date().toISOString(),
        updatedAt: prompt.updatedAt || new Date().toISOString(),
      }));

      onImport(processedPrompts);
      setImportStatus('success');
      setImportMessage(`Successfully imported ${processedPrompts.length} prompts!`);
      setImportData('');
      
      setTimeout(() => {
        setImportStatus('idle');
        setImportMessage('');
        onClose();
      }, 2000);

    } catch (error) {
      setImportStatus('error');
      setImportMessage(error instanceof Error ? error.message : 'Invalid JSON format');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-3xl w-full max-w-3xl border border-white/20">
        <div className="flex justify-between items-center p-6 border-b border-gray-200/50 bg-gradient-to-r from-green-50 to-blue-50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
            <FileText className="text-green-600" size={24} />
            Export / Import Prompts
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Download className="text-green-600" size={20} />
                Export Prompts
              </h3>
              <p className="text-gray-600">
                Download all your prompts as a JSON file for backup or sharing.
              </p>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-900 mb-1">{prompts.length}</div>
                <div className="text-sm text-green-700 font-semibold">Total Prompts</div>
              </div>
              <button
                onClick={handleExport}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Export All Prompts
              </button>
            </div>

            {/* Import Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Upload className="text-blue-600" size={20} />
                Import Prompts
              </h3>
              <p className="text-gray-600">
                Upload a JSON file to import prompts. This will add to your existing prompts.
              </p>
              
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">Upload JSON File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
                  />
                </label>

                <div className="text-center text-gray-500 font-medium">or</div>

                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">Paste JSON Data</span>
                  <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all font-mono text-sm resize-none"
                    placeholder="Paste your JSON data here..."
                  />
                </label>
              </div>

              {importStatus !== 'idle' && (
                <div className={`p-3 rounded-xl flex items-center gap-2 ${
                  importStatus === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {importStatus === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span className="font-semibold">{importMessage}</span>
                </div>
              )}

              <button
                onClick={handleImport}
                disabled={!importData.trim() || importStatus === 'success'}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Upload size={20} />
                Import Prompts
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
              <AlertCircle className="text-yellow-600" size={16} />
              Important Notes
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Import will add prompts to your existing collection (no duplicates by ID)</li>
              <li>• Make sure to backup your current prompts before importing</li>
              <li>• Invalid prompts will be filtered out automatically</li>
              <li>• Analytics data will be preserved if present in the import file</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}