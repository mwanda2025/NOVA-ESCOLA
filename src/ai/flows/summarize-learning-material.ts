'use server';

/**
 * @fileOverview Summarizes learning material and generates revision questions using AI.
 *
 * - summarizeLearningMaterial - A function that summarizes the given learning material and creates questions.
 * - SummarizeLearningMaterialInput - The input type for the summarizeLearningMaterial function.
 * - SummarizeLearningMaterialOutput - The return type for the summarizeLearningMaterial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLearningMaterialInputSchema = z.object({
  material: z
    .string()
    .describe('O material de aprendizagem a ser resumido.'),
  language: z.string().describe('O idioma para o resumo.'),
});
export type SummarizeLearningMaterialInput = z.infer<
  typeof SummarizeLearningMaterialInputSchema
>;

const SummarizeLearningMaterialOutputSchema = z.object({
  summary: z.string().describe('O resumo do material de aprendizagem.'),
  revisionQuestions: z.array(z.string()).describe('Três perguntas de revisão baseadas no material original.'),
});
export type SummarizeLearningMaterialOutput = z.infer<
  typeof SummarizeLearningMaterialOutputSchema
>;

export async function summarizeLearningMaterial(
  input: SummarizeLearningMaterialInput
): Promise<SummarizeLearningMaterialOutput> {
  return summarizeLearningMaterialFlow(input);
}

const summarizeLearningMaterialPrompt = ai.definePrompt({
  name: 'summarizeLearningMaterialPrompt',
  input: {schema: SummarizeLearningMaterialInputSchema},
  output: {schema: SummarizeLearningMaterialOutputSchema},
  prompt: `Você é um especialista em resumir materiais de aprendizagem e criar conteúdo educacional.

  1. Resuma o seguinte material de aprendizagem no idioma fornecido.
  2. Crie exatamente 3 perguntas de revisão concisas, baseadas no conteúdo do material original, para ajudar o aluno a testar seu conhecimento.

  Idioma: {{{language}}}
  Material: {{{material}}}
  `,
});

const summarizeLearningMaterialFlow = ai.defineFlow(
  {
    name: 'summarizeLearningMaterialFlow',
    inputSchema: SummarizeLearningMaterialInputSchema,
    outputSchema: SummarizeLearningMaterialOutputSchema,
  },
  async input => {
    const {output} = await summarizeLearningMaterialPrompt(input);
    return output!;
  }
);
