'use server';

/**
 * @fileOverview A translation AI agent for learning material summaries.
 *
 * - translateLearningMaterialSummary - A function that handles the translation process.
 * - TranslateLearningMaterialSummaryInput - The input type for the translateLearningMaterialSummary function.
 * - TranslateLearningMaterialSummaryOutput - The return type for the translateLearningMaterialSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateLearningMaterialSummaryInputSchema = z.object({
  summary: z.string().describe('O resumo do material de aprendizagem a ser traduzido.'),
  language: z.string().describe('O idioma de destino para a tradução.'),
});
export type TranslateLearningMaterialSummaryInput = z.infer<typeof TranslateLearningMaterialSummaryInputSchema>;

const TranslateLearningMaterialSummaryOutputSchema = z.object({
  translatedSummary: z.string().describe('O resumo traduzido do material de aprendizagem.'),
});
export type TranslateLearningMaterialSummaryOutput = z.infer<typeof TranslateLearningMaterialSummaryOutputSchema>;

export async function translateLearningMaterialSummary(input: TranslateLearningMaterialSummaryInput): Promise<TranslateLearningMaterialSummaryOutput> {
  return translateLearningMaterialSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateLearningMaterialSummaryPrompt',
  input: {schema: TranslateLearningMaterialSummaryInputSchema},
  output: {schema: TranslateLearningMaterialSummaryOutputSchema},
  prompt: `Traduza o seguinte resumo de material de aprendizagem para o idioma especificado.\n\nResumo: {{{summary}}}\n\nIdioma: {{{language}}}\n\nTradução:`,
});

const translateLearningMaterialSummaryFlow = ai.defineFlow(
  {
    name: 'translateLearningMaterialSummaryFlow',
    inputSchema: TranslateLearningMaterialSummaryInputSchema,
    outputSchema: TranslateLearningMaterialSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
