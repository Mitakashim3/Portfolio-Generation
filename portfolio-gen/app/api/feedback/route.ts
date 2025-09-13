/**
 * API route: /api/feedback
 * Logs feedback events to /training/feedback.json for RL training
 * 
 * Usage:
 * POST /api/feedback
 * Body: FeedbackEvent
 * Returns: { success: boolean, reward?: number }
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { FeedbackEvent } from '@/components/models/PortfolioConfig';

const FEEDBACK_PATH = path.join(process.cwd(), 'training', 'feedback.json');

export async function POST(request: NextRequest) {
  try {
    const feedbackEvent: FeedbackEvent = await request.json();
    
    // Add timestamp if not provided
    if (!feedbackEvent.timestamp) {
      feedbackEvent.timestamp = new Date().toISOString();
    }

    // Read existing feedback
    let feedbackLog: FeedbackEvent[] = [];
    try {
      const data = await fs.readFile(FEEDBACK_PATH, 'utf8');
      feedbackLog = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, start with empty array
      feedbackLog = [];
    }

    // Append new feedback
    feedbackLog.push(feedbackEvent);

    // Write back to file
    await fs.writeFile(FEEDBACK_PATH, JSON.stringify(feedbackLog, null, 2));

    // Calculate simple reward for this event
    const reward = calculateReward(feedbackEvent);

    return NextResponse.json({ 
      success: true, 
      reward,
      message: `Feedback logged: ${feedbackEvent.event}` 
    });
  } catch (error) {
    console.error('Error logging feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(FEEDBACK_PATH, 'utf8');
    const feedbackLog = JSON.parse(data);
    return NextResponse.json(feedbackLog);
  } catch (error) {
    console.error('Error reading feedback:', error);
    return NextResponse.json([]);
  }
}

function calculateReward(event: FeedbackEvent): number {
  // Enhanced reward mapping for new design system
  const rewardMap: Record<string, number> = {
    // User engagement rewards
    'like': 5,
    'dislike': -3,
    'keep_theme': 1,
    'change_theme': -1,
    'keep_layout': 1,
    'change_layout': -1,
    'publish': 10,
    'abandon': -10,
    'save_config': 2,
    'edit': -1,
    
    // Component selection rewards
    'add_component': 2,
    'remove_component': -1,
    'reorder_components': 1,
    
    // Animation and design rewards
    'add_animation': 3,
    'remove_animation': -1,
    'change_animation': 1,
    'enable_hover_effects': 2,
    'disable_hover_effects': -1,
    
    // Theme and styling rewards
    'apply_liquid_design': 4,
    'use_green_palette': 3,
    'improve_contrast': 5,
    'add_glass_effect': 2,
    'use_gradients': 2,
    
    // User experience rewards
    'increase_accessibility': 5,
    'improve_readability': 4,
    'optimize_animations': 3,
    'reduce_motion': 2,
    
    // Preview interactions
    'preview_desktop': 1,
    'preview_tablet': 1,
    'preview_mobile': 1,
    'switch_view_mode': 1,
    
    // Advanced features
    'use_rl_recommendation': 3,
    'follow_ai_suggestion': 4,
    'customize_beyond_suggestions': 2,
  };

  // Additional context-based rewards
  let contextualReward = 0;
  
  if (event.details) {
    // Reward for using recommended color combinations
    if (event.details.theme === 'minimal' && event.details.animations?.includes('fade-in')) {
      contextualReward += 1;
    }
    
    // Reward for good component combinations
    const hasNavAndHero = event.details.config?.components?.includes('navbar') && 
                         event.details.config?.components?.includes('hero');
    if (hasNavAndHero) {
      contextualReward += 2;
    }
    
    // Reward for accessibility improvements
    if (event.details.improvedContrast || event.details.betterReadability) {
      contextualReward += 3;
    }
  }

  return (rewardMap[event.event] || 0) + contextualReward;
}