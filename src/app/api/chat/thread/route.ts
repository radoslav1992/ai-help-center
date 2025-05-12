import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST() {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
    }
    
    // Create a new thread
    const thread = await openai.beta.threads.create();
    
    return NextResponse.json({ threadId: thread.id }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating thread:', error?.message || error);
    return NextResponse.json({ error: 'Failed to create thread' }, { status: 500 });
  }
} 