import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// The assistant ID
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || 'asst_P1ZorWdiyaKNI9LapQiwSsz7';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
    }
    
    const { threadId, message } = await request.json();

    if (!threadId || !message) {
      return NextResponse.json(
        { error: 'Thread ID and message are required' },
        { status: 400 }
      );
    }

    // Add the user message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    // Wait for the run to complete (with timeout)
    const startTime = Date.now();
    const MAX_TIMEOUT = 60000; // 60 seconds timeout
    
    while (
      runStatus.status !== 'completed' && 
      runStatus.status !== 'failed' &&
      runStatus.status !== 'cancelled' &&
      runStatus.status !== 'expired' &&
      Date.now() - startTime < MAX_TIMEOUT
    ) {
      // Wait for a second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    if (runStatus.status !== 'completed') {
      return NextResponse.json(
        { error: `Run did not complete successfully. Status: ${runStatus.status}` },
        { status: 500 }
      );
    }

    // Get the latest message from the thread (which should be the assistant's response)
    const messages = await openai.beta.threads.messages.list(threadId, {
      limit: 1,
      order: 'desc',
    });

    if (messages.data.length === 0) {
      return NextResponse.json(
        { error: 'No messages found in thread' },
        { status: 500 }
      );
    }

    const latestMessage = messages.data[0];
    
    if (latestMessage.role !== 'assistant') {
      return NextResponse.json(
        { error: 'Failed to get assistant response' },
        { status: 500 }
      );
    }

    // Extract the text content from the message
    if (latestMessage.content.length === 0) {
      return NextResponse.json(
        { error: 'No content in assistant response' },
        { status: 500 }
      );
    }

    const messageContent = latestMessage.content[0];
    let responseText = '';
    
    if (messageContent.type === 'text') {
      responseText = messageContent.text.value;
    }

    return NextResponse.json({ response: responseText }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing message:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 