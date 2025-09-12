/**
 * API route: /api/generate
 * Generates a new PortfolioConfig and writes it to /training/config.json
 * 
 * Usage:
 * POST /api/generate
 * Optional body: Partial<PortfolioConfig> to override defaults
 * Returns: PortfolioConfig
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { PortfolioConfig, DEFAULT_CONFIG } from '@/components/models/PortfolioConfig';

const CONFIG_PATH = path.join(process.cwd(), 'training', 'config.json');

export async function GET() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    const config: PortfolioConfig = JSON.parse(data);
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json(DEFAULT_CONFIG);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const currentConfig = await getCurrentConfig();
    
    // Merge incoming config with current config
    const newConfig: PortfolioConfig = {
      ...currentConfig,
      ...body,
    };

    // Write to config.json
    await fs.writeFile(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
    
    return NextResponse.json(newConfig);
  } catch (error) {
    console.error('Error generating config:', error);
    return NextResponse.json(
      { error: 'Failed to generate configuration' },
      { status: 500 }
    );
  }
}

async function getCurrentConfig(): Promise<PortfolioConfig> {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return DEFAULT_CONFIG;
  }
}