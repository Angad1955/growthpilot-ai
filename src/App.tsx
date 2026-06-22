import React, { useState, useRef } from 'react';
import { 
  Brain, 
  Share2, 
  Mail, 
  TrendingUp, 
  MessageSquare, 
  Rocket, 
  Star, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Globe, 
  Calendar, 
  Users, 
  ShieldAlert,
  Compass,
  ArrowRightLeft
} from 'lucide-react';
import { FAQItem, TestimonialItem, PricingPlan, GrowthStrategyResponse } from './types';
import LeadGenerator from './components/LeadGenerator';
import DashboardShowcase from './components/DashboardShowcase';

export default function App() {
  const [strategy, setStrategy] = useState<GrowthStrategyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const sandboxRef = useRef<HTMLDivElement>(null);

  const scrollToSandbox = () => {
    sandboxRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: billingPeriod === 'monthly' ? '$29' : '$23',
      frequency: '/mo',
      description: 'For early-stage startups.',
      features: [
        '500 AI Monthly Credits',
        'Basic CRM Integration',
        'Email Automation',
      ],
      omittedFeatures: [
        'Advanced Revenue Analytics',
        'Dedicated Success Manager',
        'Custom AI training datasets'
      ],
      ctaText: 'Get Started'
    },
    {
      name: 'Growth',
      price: billingPeriod === 'monthly' ? '$99' : '$79',
      frequency: '/mo',
      description: 'Best for expanding teams.',
      features: [
        '2,500 AI Monthly Credits',
        'All CRM Integrations',
        'Smart Scheduling Systems',
        'Revenue Analytics Engine',
      ],
      ctaText: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Scale',
      price: billingPeriod === 'monthly' ? '$299' : '$239',
      frequency: '/mo',
      description: 'For high-volume outreach.',
      features: [
        '10,000 AI Monthly Credits',
        'Team Shared Workspaces',
        'Full Developers API Access',
        'Custom Sales Workflows',
      ],
      ctaText: 'Get Started'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      frequency: '',
      description: 'Tailored for global giants.',
      features: [
        'Unlimited AI B2B Credits',
        'Dedicated Success Manager',
        'SOC2 Enterprise Compliance',
        'Custom AI Model Training',
      ],
      ctaText: 'Contact Sales'
    }
  ];

  const testimonials: TestimonialItem[] = [
    {
      stars: 5,
      quote: "GrowthPilot AI increased our lead conversion rate by 183% within 90 days. It's transformed how we think about outbound.",
      author: "Sarah Mitchell",
      role: "CEO, NovaTech",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQJ1mYuIC0aA4rnJsRiilkX4_OADAD2nRbhJ2gFywkjPh3AoqSJjR8cAVVDKwXhIMHI91eV6y9B7ZovJfEwwomEtvqLzEaotaIuyMGd7Ud5vkAnUB7LRieAITqqnd7jf7L_Y4y6D4JHGmSsYTTVEe8yfxIHoAGJ60Cf-2XFGaWXBmgZJ7pqpp-BVdjGfGJbg0Z4VnCBSpRpcUvaCoy_YAHQp7EYcfNL1GMtNEGcrJtAEp-L-SJ0tzpU3fRnC4Reip9cooRT4F436w"
    },
    {
      stars: 5,
      quote: "The AI qualification engine is frighteningly accurate. It’s like having our best SDR working 24/7 at 100x the speed.",
      author: "David Chen",
      role: "CTO, CloudScale",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXlhJ256QGE32hGF3crPHpZVSmE3x8n45a-zSJHFHVh8C2Kx2Kp1g2is4PbkMfOKvMVgFQKww3j2a6uzQuzO3xg7KOmmg_lQ0nCQbgdEO0La4uEY-721GjKHBpuShyHDJ4zMujypYUePugCsRz0XgMykRco9-lqzCytk7UbCKjgFgkb5CNUDLCcFzwsCsLCFsVy5WHEEoC4126MmXL623HMLmKwrC52yvrGNdiwCO54Id2Zoord75gld8q521hzhaMMrLPoHa5Plc",
      verified: true
    },
    {
      stars: 5,
      quote: "Integration was seamless. Within a week, GrowthPilot was already delivering high-intent meetings directly into our calendars.",
      author: "Elena Rodriguez",
      role: "Head of Sales, Vertex",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbQiXfBUdL4ahdri30j7uCD47EbEq4xh_BI9Jc0gvxA-HorvGM8Nufif7_hcQjSNxWZ6Y9TQyga2D6YnEmuFxaQ3pJ9L03qK1SHi6wW0zJwC14NpGU6IRTB2Af-roC3kCQGkvjT6JTPbaANQGGhz-RB1CzEWlvDf3sm_elY24yAwd_PL8u3uOU-I--H0H2ELrA7_cHu9D4i9-_RTSPfsFIh-FtG8qo4p_sauOMnto6fU3DqDZXXOJLvHrcqzFlGl-Xnlrc7gqF5pY"
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "How does the pricing work for AI credits?",
      answer: "One credit equals one fully qualified prospect interaction or automated sequence step. Unused credits roll over if you stay on the same plan level."
    },
    {
      question: "Is my data secure and compliant?",
      answer: "Yes, GrowthPilot AI is SOC2 Type II compliant and GDPR ready. We never train our public AI models on your private customer data."
    },
    {
      question: "Which CRMs do you integrate with?",
      answer: "We offer native integrations for Salesforce, HubSpot, Pipedrive, and Monday.com, plus custom webhook support and Zapier connectivity."
    },
    {
      question: "How long is the free trial?",
      answer: "Our standard trial is 14 days and includes 50 AI credits so you can see real-world results before committing."
    }
  ];

  // Default path-to-revenue steps
  const defaultSteps = [
    {
      step: "Capture Leads",
      details: "Our AI identifies and monitors anonymous traffic across your digital properties."
    },
    {
      step: "AI Qualification",
      details: "Instantly scoring prospects based on over 100+ firmographic and intent signals."
    },
    {
      step: "Automated Follow-up",
      details: "Hyper-personalized messaging triggered at the exact moment intent is highest."
    },
    {
      step: "Convert Into Customers",
      details: "Hand off qualified, meeting-ready prospects to your closing team in real-time."
    }
  ];

  const currentSteps = strategy?.acceleratedRevenueSteps || defaultSteps;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingCompany) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingModalOpen(false);
      setBookingName('');
      setBookingEmail('');
      setBookingCompany('');
    }, 3000);
  };

  const handleCTAAction = (plan: PricingPlan) => {
    if (plan.name === 'Enterprise') {
      setIsBookingModalOpen(true);
    } else {
      scrollToSandbox();
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg text-on-surface flex flex-col font-sans select-none antialiased">
      <div className="fixed inset-0 bg-noise z-0 pointer-events-none"></div>

      {/* Decorative backdrop glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-indigo-900/10 rounded-full blur-[160px] z-0 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[45%] aspect-square bg-cyan-900/10 rounded-full blur-[160px] z-0 pointer-events-none"></div>

      {/* Sticky Top Navigation Bar */}
      <nav className="sticky top-0 w-full z-40 bg-brand-bg/75 backdrop-blur-xl border-b border-white/10 h-20 flex justify-between items-center px-6 md:px-12 shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-display text-2xl font-extrabold text-white tracking-tight cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            GrowthPilot<span className="text-primary-dark italic font-semibold"> AI</span>
          </span>
          <div className="hidden md:flex gap-6 ml-6">
            <a className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="#features">Features</a>
            <a className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="#showcase">Dashboard</a>
            <a className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="#pricing">Pricing</a>
            <a className="text-on-surface-variant hover:text-white transition-colors text-sm font-medium" href="#faqs">Resources</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            className="hidden md:block px-4 py-2 text-on-surface-variant hover:text-white transition-all text-sm font-bold cursor-pointer"
          >
            Book Demo
          </button>
          <button 
            type="button"
            onClick={scrollToSandbox}
            className="px-5 py-2.5 bg-primary hover:bg-white text-on-primary font-bold rounded-xl shadow-lg hover:shadow-primary/10 active:scale-95 transition-all text-xs tracking-wider uppercase cursor-pointer"
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[calc(110vh-80px)] flex flex-col items-center justify-center py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 w-fit mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-dark animate-pulse shadow-sm"></span>
                <span className="text-[10px] font-bold font-mono text-primary uppercase tracking-widest">v2.0 Now Live</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                AI-Powered Growth Engine for <span className="text-primary italic font-semibold">Modern Businesses</span>
              </h1>
              <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-6 leading-relaxed max-w-xl">
                Capture, qualify, and convert B2B leads automatically with intelligent sales automation. Eliminate tedious manual outreach and focus entirely on closing.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button 
                  type="button"
                  onClick={scrollToSandbox}
                  className="px-8 py-4 bg-primary text-on-primary hover:bg-white font-bold rounded-xl shadow-xl hover:shadow-primary/10 transition-all active:scale-[0.98] text-sm cursor-pointer"
                >
                  Start Free Trial
                </button>
                <button 
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/20 transition-all active:scale-[0.98] text-sm cursor-pointer"
                >
                  Book Demo
                </button>
              </div>
            </div>

            {/* Glowing Hero Visual elements */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-square glass-card rounded-3xl p-2.5 glow-indigo shadow-2xl hover:border-indigo-400/25 transition-all">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-brand-bg">
                  <img 
                    alt="GrowthPilot Mockup Dashboard"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoGAQjMDR1u5aIbxyY-81K-eYCbbNcAWj9pHiNQGWKcvuXooTS6O_LWs9orrECdyv_BfTq6tS-jAJ6U2xEqjG-lp9wSQWIkT3aWsnPALmVJTnHtHSCbKQfEgtmNgFXUb60bDL4VhnBRjroMpgRX0TraohE3HwZ58fBKo2PuXD6_0nBwsAH1KO37o3qHOWRvHFS-j-g0-UJl21tUzT5r4h7mW0cNRvpxrXgVV2FaezS_qhnfxwiARWOno1pjoU4uF1J33TOwDFaFak" 
                  />
                  {/* Floating Stats widgets */}
                  <div className="absolute top-6 left-6 glass-card p-3 rounded-2xl border-white/10 shadow-lg select-none hover:scale-105 transition-all">
                    <p className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Lead Growth</p>
                    <p className="text-xl font-bold font-display text-white mt-1">+247%</p>
                  </div>
                  <div className="absolute bottom-6 right-6 glass-card p-3 rounded-2xl border-white/10 shadow-lg select-none hover:scale-105 transition-all">
                    <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Revenue Influenced</p>
                    <p className="text-xl font-bold font-display text-tertiary mt-1">$48M</p>
                  </div>
                  <div className="absolute top-1/2 -right-4 translate-y-[-50%] glass-card p-3 rounded-2xl border-white/10 shadow-lg hidden sm:flex items-center gap-2.5 select-none hover:scale-105 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Active Users</p>
                      <p className="text-xs font-black text-white mt-0.5">12,000+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Leaders Banner */}
        <section className="py-12 border-y border-white/5 bg-surface-container-lowest/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <p className="text-center text-[10px] font-black text-on-surface-variant uppercase tracking-[0.25em] mb-8">
              Powering Growth for Global Leaders
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center opacity-40 hover:opacity-75 transition-opacity duration-300">
              <span className="font-display text-base font-black text-white tracking-widest hover:text-cyan-400 cursor-default">NovaTech</span>
              <span className="font-display text-base font-black text-white tracking-widest hover:text-cyan-400 cursor-default">CloudScale</span>
              <span className="font-display text-base font-black text-white tracking-widest hover:text-cyan-400 cursor-default">Growth Labs</span>
              <span className="font-display text-base font-black text-white tracking-widest hover:text-cyan-400 cursor-default">Vertex AI</span>
              <span className="font-display text-base font-black text-white tracking-widest hover:text-cyan-400 cursor-default">Momentum</span>
              <span className="font-display text-base font-black text-white tracking-widest hover:text-cyan-400 cursor-default">SkyBridge</span>
            </div>
          </div>
        </section>

        {/* Features specifications Grid Section */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Intelligent Features for Rapid Scale
            </h2>
            <p className="text-on-surface-variant text-base mt-3">
              Everything you need to automate your sales pipelines and outpace your competition with AI-driven precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 group hover:-translate-y-1 transition-all relative overflow-hidden bg-brand-bg/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-purple-500/15 transition-all">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">AI Lead Qualification</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                Automatically score, tag, and qualify prospects based on intent, firmographic profiles, and physical online behavior.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 group hover:-translate-y-1 transition-all relative overflow-hidden bg-brand-bg/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-cyan-500/15 transition-all">
                <Compass className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Smart CRM Integration</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                A centralized pipeline intelligence wrapper that synchronizes with your current software stack, keeping records fresh.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 group hover:-translate-y-1 transition-all relative overflow-hidden bg-brand-bg/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-indigo-500/15 transition-all">
                <Mail className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Email Copywriting</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                Say goodbye to generic templates. Gemini-crafted highly-personalized email sequences boost reply parameters up to 3x.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 group hover:-translate-y-1 transition-all relative overflow-hidden bg-brand-bg/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-pink-500/15 transition-all">
                <TrendingUp className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Revenue Analytics</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                Trace pipeline conversions down to exact interactions. Forecast ARR targets using real market simulation.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 group hover:-translate-y-1 transition-all relative overflow-hidden bg-brand-bg/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-cyan-500/15 transition-all">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">24/7 AI Concierge</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                Instantly capture anonymous web traffic, resolve basic utility FAQs, and book priority meetings while your team rests.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 group hover:-translate-y-1 transition-all relative overflow-hidden bg-brand-bg/40">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-3xl"></div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-purple-500/15 transition-all">
                <Rocket className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Pipeline Automation</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                Automatically transition deals through different funnel stages triggered by direct buyer intent milestones.
              </p>
            </div>
          </div>
        </section>

        {/* Live AI Sandbox Input Section & Visual Dashboard representation combined! */}
        <section id="showcase" className="py-20 bg-surface-container-lowest/10 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12" ref={sandboxRef}>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 items-stretch">
              
              {/* Form Input block (col-span 2) */}
              <div className="xl:col-span-2">
                <div className="mb-6">
                  <h2 className="font-display text-4xl font-extrabold text-white tracking-tight">
                    Custom Market Intelligence
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-2">
                    Why look at static templates? Synthesize custom B2B target lead profiles and automated sequence drafts for your business using Gemini.
                  </p>
                </div>
                <LeadGenerator 
                  onStrategyGenerated={setStrategy} 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                />
              </div>

              {/* Showcase Dashboard block (col-span 3) */}
              <div className="xl:col-span-3">
                <DashboardShowcase strategy={strategy} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </section>

        {/* Accelerated steps path */}
        <section className="py-24">
          <div className="max-w-2xl mx-auto text-center mb-16 px-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Simple Path to Accelerated Revenue
            </h2>
            <p className="text-on-surface-variant text-base mt-3">
              We've automated the entire B2B top-of-funnel journey so your closing team can focus on what they do best: building human relationships.
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-6 md:px-12 relative">
            {/* Timeline center spine line */}
            <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-tertiary to-primary-dark opacity-15"></div>

            <div className="space-y-12">
              {currentSteps.map((stp, idx) => {
                const colors = ['bg-indigo-500 text-white', 'bg-cyan-400 text-neutral-900', 'bg-purple-500 text-white', 'bg-pink-400 text-neutral-900'];
                const isEven = idx % 2 === 0;

                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-stretch ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Content segment */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                      <div className="glass-card p-5 rounded-2xl border-white/5 hover:border-white/10 group bg-brand-bg/30">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest font-mono">Stage 0{idx + 1}</span>
                        <h4 className="text-base font-extrabold text-white font-display mt-1">{stp.step}</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-2.5">{stp.details}</p>
                      </div>
                    </div>

                    {/* Timeline Node Badge */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 w-10 h-10 rounded-full border-4 border-brand-bg flex items-center justify-center font-black text-xs z-10 shadow-lg select-none ring-4 ring-indigo-500/5 hover:scale-110 transition-transform cursor-pointer" style={{ backgroundColor: isEven ? '#6366f1' : '#4cd7f6', color: isEven ? '#fff' : '#0b1020' }}>
                      0{idx + 1}
                    </div>

                    {/* Spacing alignment helper */}
                    <div className="hidden md:block w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Beautiful Client Testimonials Section */}
        <section className="py-24 bg-surface-container-lowest/25 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test, idx) => (
                <div key={idx} className="glass-card p-6 md:p-8 rounded-3xl border-white/10 relative overflow-hidden bg-brand-bg/40 flex flex-col justify-between">
                  {test.verified && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-black rounded-full uppercase tracking-wider select-none">
                      Verified Result
                    </div>
                  )}

                  <div>
                    {/* Visual Star values */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: test.stars }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary shrink-0" />
                      ))}
                    </div>
                    <p className="text-sm text-white italic leading-relaxed font-sans mt-2">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-white/5">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                      <img className="w-full h-full object-cover" src={test.avatar} alt={test.author} referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white font-display">{test.author}</p>
                      <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold mt-0.5">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Segment */}
        <section id="pricing" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Transparent Plans for Every Stage
            </h2>
            <p className="text-on-surface-variant text-base mt-3">
              Simple, scalable pricing that grows with your business profile.
            </p>

            {/* Toggle Switch switcher */}
            <div className="inline-flex items-center gap-3 mt-8 p-1.5 rounded-xl bg-brand-bg border border-white/10">
              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  billingPeriod === 'monthly' 
                    ? 'bg-primary text-on-primary shadow' 
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Monthly basis
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod('annually')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  billingPeriod === 'annually' 
                    ? 'bg-primary text-on-primary shadow' 
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                <span>Annually</span>
                <span className="text-[8px] bg-cyan-400 text-neutral-900 px-1.5 py-0.5 rounded-full font-black uppercase">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`glass-card p-6 md:p-8 rounded-3xl border-white/10 flex flex-col justify-between transition-all hover:border-white/20 select-none ${
                  plan.highlighted 
                    ? 'bg-gradient-to-b from-primary-dark/15 to-transparent border-primary ring-1 ring-primary/30 relative scale-102 lg:scale-105 z-15 shadow-2xl' 
                    : 'bg-brand-bg/40'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-on-primary text-[10px] font-black rounded-full uppercase tracking-wider select-none">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white font-display">{plan.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{plan.description}</p>
                  
                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-white font-display">{plan.price}</span>
                    <span className="text-xs text-on-surface-variant ml-1 font-mono uppercase">{plan.frequency}</span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-white/5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.omittedFeatures?.map((feat, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2 text-xs text-on-surface-variant opacity-45">
                        <X className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleCTAAction(plan)}
                  className={`w-full mt-8 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                    plan.highlighted 
                      ? 'bg-primary text-on-primary text-slate-900 shadow-lg hover:bg-white' 
                      : 'border border-white/10 hover:bg-white/5 text-slate-200'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Accordions */}
        <section id="faqs" className="py-24 max-w-3xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-on-surface-variant text-sm mt-2">
              Have specific constraints about software deployment or credit operations? Explore below.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="glass-card rounded-2xl border-white/5 overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4.5 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-sm tracking-wide text-white">{faq.question}</span>
                    <span className="shrink-0 p-1 rounded-lg bg-white/5 border border-white/5">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-on-surface-variant border-t border-white/5 bg-slate-950/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="py-20 px-6 md:px-12 mb-16">
          <div className="max-w-7xl mx-auto glass-card rounded-[40px] overflow-hidden p-8 md:p-16 relative bg-gradient-to-r from-primary-dark/10 via-brand-bg/95 to-cyan-500/5 group text-center flex flex-col items-center">
            <div className="absolute top-[-20%] left-[-20%] w-[50%] aspect-square bg-indigo-500/10 rounded-full blur-[100px] z-0"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Ready to Accelerate Your <span className="text-primary italic font-semibold">Growth?</span>
              </h2>
              <p className="text-on-surface-variant text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
                Join 12,000+ top-growth enterprise operations utilizing GrowthPilot AI to redefine their B2B limits. Start your sandbox audit today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button 
                  type="button"
                  onClick={scrollToSandbox}
                  className="px-10 py-4 bg-primary text-slate-900 border border-primary hover:bg-white hover:border-white font-bold rounded-xl shadow-2xl transition-all text-sm cursor-pointer"
                >
                  Start Free Trial
                </button>
                <button 
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-10 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/20 transition-all text-sm cursor-pointer"
                >
                  Book A Strategy Call
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Corporate Strategy call Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-brand-bg/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 md:p-8 rounded-3xl max-w-md w-full border-white/20 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] bg-primary/10 text-primary uppercase font-bold tracking-widest px-2 py-0.5 rounded-full font-mono">
                  priority scheduler
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-2">Book Your Strategy Call</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4 animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-display">Priority Booking Registered</h4>
                <p className="text-xs text-on-surface-variant mt-2 max-w-xs leading-relaxed mx-auto">
                  Excellent! We've scheduled your onboarding. A GrowthPilot advisor will contact you within 1 business hour with tailored analysis coordinates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Cynthia Rogers"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Company Corporate Email</label>
                  <input 
                    type="email" 
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="e.g. crogers@novatech.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Corporate Domain / Company</label>
                  <input 
                    type="text" 
                    required
                    value={bookingCompany}
                    onChange={(e) => setBookingCompany(e.target.value)}
                    placeholder="e.g. NovaTech Corp"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Ideal Date</label>
                  <input 
                    type="date" 
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl shadow-lg transition-all text-xs tracking-wider uppercase mt-6 cursor-pointer"
                >
                  Register Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Comprehensive Footer */}
      <footer className="bg-surface-container-lowest border-t border-white/5 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-4">
            <span className="font-display text-xl font-extrabold text-white tracking-tight">
              GrowthPilot<span className="text-primary-dark italic font-semibold"> AI</span>
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs">
              The premium, automated intelligence platform built exclusively for modern hyper-growth sales units.
            </p>
            <div className="flex gap-4">
              <span className="p-2 rounded-lg bg-white/5 border border-white/5 hover:text-cyan-400 transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 border border-white/5 hover:text-cyan-400 transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={scrollToSandbox} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">Live Simulation</button></li>
              <li><a className="text-on-surface-variant hover:text-white transition-colors" href="#features">Key Features</a></li>
              <li><a className="text-on-surface-variant hover:text-white transition-colors" href="#pricing">Licensing Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setIsBookingModalOpen(true)} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">About Us</button></li>
              <li><button onClick={() => setIsBookingModalOpen(true)} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">Careers</button></li>
              <li><button onClick={() => setIsBookingModalOpen(true)} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">Terms & Privacy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-4">Contact & Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setIsBookingModalOpen(true)} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">Support Center</button></li>
              <li><button onClick={() => setIsBookingModalOpen(true)} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">Sales Inquiries</button></li>
              <li><button onClick={() => setIsBookingModalOpen(true)} className="text-on-surface-variant hover:text-white transition-colors cursor-pointer">System Status</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 text-center px-6">
          <p className="text-[11px] text-on-surface-variant">
            © {new Date().getFullYear()} GrowthPilot AI. Crafted following B2B SaaS standards for high-performance marketing targets.
          </p>
        </div>
      </footer>
    </div>
  );
}
