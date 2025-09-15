'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/translate-learning-material-summary.ts';
import '@/ai/flows/summarize-learning-material.ts';
import '@/ai/flows/suggest-complementary-material.ts';
import '@/ai/flows/grade-assignment.ts';
import '@/ai/flows/virtual-assistant-flow.ts';
