import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, Flame, MailOpen, TrendingUp, Info, Check, Copy, Send } from 'lucide-react';
import { GrowthStrategyResponse, LeadProfile } from '../types';

interface DashboardShowcaseProps {
  strategy: GrowthStrategyResponse | null;
  isLoading: boolean;
}

export default function DashboardShowcase({ strategy, isLoading }: DashboardShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'leads' | 'outreach'>('chart');
  const [copied, setCopied] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadProfile | null>(null);

  // Default mock data corresponding to the original landing page image
  const defaultMetrics = [
    { title: 'Revenue', value: '$284,750', rate: '↑ 12.4%', color: 'text-primary' },
    { title: 'Leads', value: '2,487', rate: '↑ 8.1%', color: 'text-primary' },
    { title: 'Conversion', value: '18.6%', rate: '↑ 4.3%', color: 'text-tertiary' },
    { title: 'Meetings', value: '126', rate: '↑ 15.0%', color: 'text-secondary' },
  ];

  const defaultLeads: LeadProfile[] = [
    {
      company: 'NexaLogistics Group',
      contactPerson: 'Cynthia Vance (VP Logistics)',
      fitScore: 94,
      scoreReason: 'Matched intent signals for premium fleet scheduling software and high employee growth (32% YoY).',
      status: 'qualified'
    },
    {
      company: 'Apex Solutions Inc',
      contactPerson: 'Marcus Brodie (IT Director)',
      fitScore: 89,
      scoreReason: 'Searching actively for decentralized firewall integrations. Registered for webinar event yesterday.',
      status: 'highly_interested'
    },
    {
      company: 'Synthetix Energy',
      contactPerson: 'Aris Thorne (VP of Strategy)',
      fitScore: 82,
      scoreReason: 'Downloaded carbon auditing case-studies. Fits firmographic profile of mid-market clean energy.',
      status: 'outreach_sent'
    }
  ];

  const currentMetrics = strategy ? [
    { title: 'ARR Impact', value: strategy.projectedRevenue, rate: 'Qualified Forecast', color: 'text-cyan-400' },
    { title: 'Monthly Target Leads', value: strategy.projectedLeadsCount, rate: 'Estimated AI Output', color: 'text-cyan-400' },
    { title: 'Efficiency Uplift', value: strategy.qualificationRate, rate: 'Automation gain', color: 'text-tertiary' },
    { title: 'B2B Pipelines', value: `${strategy.leadsList?.length || 3} Active`, rate: 'Verified Leads', color: 'text-secondary' },
  ] : defaultMetrics;

  const currentLeads = strategy?.leadsList || defaultLeads;
  const showLead = selectedLead || currentLeads[0];

  const handleCopyEmail = () => {
    const emailBody = strategy?.emailHtmlTemplate || '';
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Responsive coordinates for a highly professional glowing chart SVG path
  const chartPoints = [
    { x: 0, y: 160 },
    { x: 50, y: 130 },
    { x: 100, y: 170 },
    { x: 150, y: 110 },
    { x: 200, y: 190 },
    { x: 250, y: 80 },
    { x: 300, y: 140 },
    { x: 350, y: 160 },
    { x: 400, y: 60 },
    { x: 450, y: 120 },
    { x: 500, y: 40 },
    { x: 550, y: 90 },
    { x: 600, y: 30 },
  ];

  // SVG path construction
  const pathData = chartPoints.reduce((acc, point, i) => {
    return i === 0 ? `M 0 ${point.y}` : `${acc} L ${(i * (100 / (chartPoints.length - 1)))}% ${point.y}`;
  }, '');

  // Fill path beneath the line for background gradient
  const fillPath = `${pathData} L 100% 280 L 0% 280 Z`;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Sidebar explanation */}
      <div className="lg:w-1/3 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-3xl font-bold tracking-tight text-white mb-4">
            {strategy ? "Your Dynamic SaaS Output" : "Command Your Growth Command Center"}
          </h3>
          <p className="text-on-surface-variant text-base leading-relaxed mb-6">
            {strategy 
              ? `AI has analyzed your inputs and projected a pipeline for your target audience. You can copy the generated email, qualify your leads, and accelerate your custom conversion steps.`
              : "Get a bird's-eye view of your entire sales operation with technical-grade visualization tools and real-time AI insights."
            }
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Live conversion tracking</span>
                <span className="text-xs text-on-surface-variant">Real-time tracking of qualified web traffic.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Multi-channel B2B attribution</span>
                <span className="text-xs text-on-surface-variant">Identify exactly which source triggered high-intent.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">AI lead qualification scoring</span>
                <span className="text-xs text-on-surface-variant">Intelligent scoring based on 100+ firmographic data points.</span>
              </div>
            </div>
          </div>
        </div>

        {strategy && (
          <div className="mt-8 p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-2xl flex gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">AI Forecast Insights</p>
              <p className="text-xs text-on-surface-variant mt-1">{strategy.forecastInsights}</p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive dashboard sandbox panel */}
      <div className="lg:w-2/3 glass-card p-5 md:p-6 rounded-3xl glow-indigo border-white/10 flex flex-col justify-between relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-brand-bg/85 backdrop-blur-md z-45 flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
            <h4 className="text-lg font-bold text-white">Synthesizing Lead Landscape...</h4>
            <p className="text-sm text-on-surface-variant max-w-sm mt-1">
              Gemini model is extracting audience characteristics, qualifying benchmark organizations, and drafting high-converting copy.
            </p>
          </div>
        )}

        {/* Dashboard top segment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {currentMetrics.map((met, idx) => (
            <div key={idx} className="bg-brand-bg/50 p-4 rounded-2xl border border-white/5 shadow-sm transition-all hover:border-white/10">
              <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">{met.title}</p>
              <p className="text-xl md:text-2xl font-bold font-display text-white mt-1">{met.value}</p>
              <span className={`text-xs font-bold ${met.color} block mt-1`}>{met.rate}</span>
            </div>
          ))}
        </div>

        {/* Tabs picker */}
        <div className="flex border-b border-white/10 mb-5 gap-2">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all border-b-2 shrink-0 ${
              activeTab === 'chart' 
                ? 'border-cyan-400 text-white' 
                : 'border-transparent text-on-surface-variant hover:text-white'
            }`}
          >
            📊 Analytics Chart
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all border-b-2 shrink-0 ${
              activeTab === 'leads' 
                ? 'border-cyan-400 text-white' 
                : 'border-transparent text-on-surface-variant hover:text-white'
            }`}
          >
            🎯 Qualified Leads ({currentLeads.length})
          </button>
          {strategy && (
            <button
              onClick={() => setActiveTab('outreach')}
              className={`px-4 py-2.5 text-xs font-bold tracking-wider uppercase transition-all border-b-2 shrink-0 ${
                activeTab === 'outreach' 
                  ? 'border-cyan-400 text-cyan-400' 
                  : 'border-transparent text-on-surface-variant hover:text-cyan-200'
              }`}
            >
              ✉️ Cold outreach email
            </button>
          )}
        </div>

        {/* Active tab panels */}
        <div className="flex-1 min-h-[260px]">
          {activeTab === 'chart' && (
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300 font-mono">Conversion Velocity Index</span>
                <span className="text-[10px] text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  LIVE SIMULATION ACTIVE
                </span>
              </div>
              
              {/* Custom SVG Line Chart */}
              <div className="w-full h-44 bg-brand-bg/40 rounded-2xl border border-white/5 relative overflow-hidden flex items-end">
                {/* SVG Graph path drawing */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#c0c1ff" />
                      <stop offset="50%" stopColor="#4cd7f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill area */}
                  <path d={fillPath} fill="url(#chartGrad)" />
                  
                  {/* Glow shadow line */}
                  <path d={pathData} fill="none" stroke="#4cd7f6" strokeWidth="5" strokeLinecap="round" opacity="0.15" />
                  
                  {/* Main line */}
                  <path d={pathData} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Interactive tracking points */}
                  {chartPoints.map((pt, i) => (
                    i % 3 === 0 && (
                      <g key={i}>
                        <circle cx={`${(i * (100 / (chartPoints.length - 1)))}%`} cy={pt.y} r="5" fill="#0b1020" stroke="#4cd7f6" strokeWidth="2" />
                        <circle cx={`${(i * (100 / (chartPoints.length - 1)))}%`} cy={pt.y} r="8" fill="#4cd7f6" opacity="0.3" className="animate-ping" style={{ animationDuration: '3s' }} />
                      </g>
                    )
                  ))}
                </svg>

                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>WEEK 1</span>
                  <span>WEEK 2</span>
                  <span>WEEK 3</span>
                  <span>WEEK 4</span>
                  <span>WEEK 5</span>
                </div>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed mt-2.5">
                ▲ Solid undulating lines map key intent threshold scores based on visitor firmographic profiles. Faint cyan glows signify active conversion windows monitored automatically.
              </p>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Leads side-scroller */}
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {currentLeads.map((lead, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                      showLead.company === lead.company 
                        ? 'bg-primary-dark/15 border-cyan-400' 
                        : 'bg-brand-bg/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white font-display">{lead.company}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{lead.contactPerson}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                        {lead.fitScore}% Fit
                      </span>
                      <span className="block text-[8px] text-slate-500 uppercase tracking-wider mt-1">Qualified</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Lead detailed card representation */}
              <div className="p-4 bg-brand-bg/70 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-cyan-300 font-mono">INTENT ANALYSIS PROFILE</span>
                    <span className="text-[9px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Ready for follow-up
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">{showLead.company}</h4>
                  <p className="text-xs text-slate-300 font-semibold mt-1">Primary: {showLead.contactPerson}</p>
                  
                  <div className="mt-3 p-2.5 bg-brand-bg/50 rounded-lg border border-white/5">
                    <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Qualification reason:</p>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {showLead.scoreReason}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                  <button 
                    onClick={() => {
                        if (strategy) setActiveTab('outreach');
                        else alert("Run the AI simulation with your actual industry parameters first to generate your custom outreach copywriting templates!");
                    }}
                    className="flex-1 flex items-center justify-center gap-1 text-[11px] font-bold text-white bg-primary-dark hover:bg-opacity-90 py-2 rounded-lg transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Configure outreach</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outreach' && strategy && (
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="text-slate-400 font-mono">SUBJECT:</span>
                  <span className="font-bold text-white">{strategy.emailSubjectLine}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/15 py-1 px-2.5 rounded-lg font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied email!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy outreach</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                className="w-full flex-1 max-h-[190px] p-4 rounded-xl bg-brand-bg border border-white/5 text-xs text-on-surface-variant font-mono leading-relaxed focus:outline-none resize-none select-all"
                value={strategy.emailHtmlTemplate}
              />
              <p className="text-[10px] text-slate-500 italic text-center mt-2">
                ▲ This customized template was fully crafted by Google Gemini 3.5 Flash for your specific B2B audience matrix. Select Copy to employ it instantly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
