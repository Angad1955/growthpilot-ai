import React, { useState } from 'react';
import { ArrowRight, Sparkles, AlertCircle, Copy, Check, ChevronRight, Mail, Users, Target, Activity } from 'lucide-react';
import { GrowthStrategyResponse, LeadProfile } from '../types';

interface LeadGeneratorProps {
  onStrategyGenerated: (strategy: GrowthStrategyResponse) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function LeadGenerator({ onStrategyGenerated, isLoading, setIsLoading }: LeadGeneratorProps) {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Default pre-packaged demo details to fill forms quickly
  const PRESETS = [
    {
      name: 'CyberMetrics',
      industry: 'Cybersecurity SaaS',
      audience: 'Enterprise CISOs and Security directors',
      description: 'An AI-powered security threat analysis platform that automatically maps organizational attack surfaces.'
    },
    {
      name: 'SustainaPack',
      industry: 'Green Packaging Logistics',
      audience: 'E-commerce operations and supply chain managers',
      description: 'Zero-waste eco-friendly bulk shipping materials and automatic carbon offset tracking integrations.'
    },
    {
      name: 'VeloRecruit',
      industry: 'HR Tech & Recruiter automation',
      audience: 'Talent Acquisition leads at Series-A tech firms',
      description: 'Automated video interviews assessor that extracts core developer competencies without standard bias.'
    }
  ];

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setBusinessName(preset.name);
    setIndustry(preset.industry);
    setTargetAudience(preset.audience);
    setDescription(preset.description);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !industry || !description) {
      setError('Please fill out all required fields (Business Name, Industry, and Description)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessName,
          industry,
          targetAudience,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze B2B market.');
      }

      onStrategyGenerated(data);
    } catch (err: any) {
      setError(err.message || 'Connecting to Gen-AI service failed. Verify your secret configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl glow-indigo border-white/10" id="ai-generator-sandbox">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            Live AI Playground
          </div>
          <h3 className="text-xl font-bold font-display text-white">Interactive Growth Engine Simulator</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Input your real B2B business profiles below to generate real qualified leads, dynamic outreach templates, and forecasted revenues.
          </p>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
          Or apply an instant pre-packaged portfolio preset:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary-dark transition-all text-slate-200"
            >
              🚀 {preset.name} ({preset.industry})
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
              Business Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. ApexLogistics"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
              Industry vertical <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Cloud Security, HR Recruiting SaaS"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
            Ideal Customer Target (Optional)
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g. Mid-market CTOs, E-commerce operations heads"
            className="w-full px-4 py-2.5 rounded-xl bg-brand-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1.5">
            Product / Service Explanation <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief summary of what your business does and the main value you offer."
            className="w-full px-4 py-3 rounded-xl bg-brand-bg border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm transition-all resize-none"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-dark hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-55 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing AI Market Signals...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Launch Growth Simulation Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
