export interface LeadProfile {
  company: string;
  contactPerson: string;
  fitScore: number;
  scoreReason: string;
  status: 'highly_interested' | 'qualified' | 'outreach_sent';
}

export interface GrowthStep {
  step: string;
  details: string;
}

export interface GrowthStrategyResponse {
  projectedRevenue: string;
  projectedLeadsCount: string;
  qualificationRate: string;
  forecastInsights: string;
  leadsList: LeadProfile[];
  emailSubjectLine: string;
  emailHtmlTemplate: string;
  acceleratedRevenueSteps: GrowthStep[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  stars: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  verified?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
  omittedFeatures?: string[];
  ctaText: string;
  highlighted?: boolean;
}
