import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qexptgmfgdcehirzfflo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFleHB0Z21mZ2RjZWhpcnpmZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NDA3MTgsImV4cCI6MjA2MTAxNjcxOH0.k-aUvqkS-YZBgNcg9Kz_q2msyUQekvvu3eebj7e4WLI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PortfolioProject = {
  id: string;
  created_at: string;
  title: string;
  title_bg: string;
  description: string;
  description_bg: string;
  image_url: string;
  website_url: string;
  tags: string[];
  featured: boolean;
  order: number;
};

export type ContactSubmission = {
  id?: string;
  name: string;
  email: string;
  company: string;
  industry: string; 
  service: string;
  message: string;
  created_at?: string;
};

export type EmailSubscription = {
  id?: string;
  email: string;
  source_id: string;
  created_at?: string;
};

export async function getPortfolioProjects() {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('order', { ascending: true });
  
  if (error) {
    console.error('Error fetching portfolio projects:', error);
    return [];
  }
  
  return data as PortfolioProject[];
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('featured', true)
    .order('order', { ascending: true });
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  
  return data as PortfolioProject[];
}

export async function submitContactForm(submission: ContactSubmission) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submission]);
  
  if (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
  
  return { success: true, data };
}

export async function subscribeToEmail(email: string, sourceId: string) {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .insert([{ email, source_id: sourceId }]);
  
  if (error) {
    console.error('Error subscribing to email:', error);
    return { success: false, error };
  }
  
  return { success: true, data };
} 