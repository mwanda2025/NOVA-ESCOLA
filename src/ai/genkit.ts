import { genkit } from 'genkit';
import { googleGenAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleGenAI()],
  model: 'google-genai/gemini-2.0-flash',
});
