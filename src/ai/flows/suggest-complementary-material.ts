'use server';

/**
 * @fileOverview Suggests complementary learning materials based on a given context.
 *
 * - suggestComplementaryMaterial - A function that suggests videos and articles.
 * - SuggestComplementaryMaterialInput - The input type for the function.
 * - SuggestComplementaryMaterialOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComplementaryMaterialInputSchema = z.object({
  context: z
    .string()
    .describe('O contexto (resumo ou tópico) para o qual as sugestões devem ser baseadas.'),
});
export type SuggestComplementaryMaterialInput = z.infer<
  typeof SuggestComplementaryMaterialInputSchema
>;

const SuggestComplementaryMaterialOutputSchema = z.object({
  articles: z.array(z.string()).describe('Uma lista de 2 a 3 sugestões de artigos ou leituras, com uma breve descrição do que o aluno irá aprender.'),
  videos: z.array(z.string()).describe('Uma lista de 2 a 3 sugestões de vídeos (ex: do YouTube), com uma breve descrição do conteúdo.'),
});
export type SuggestComplementaryMaterialOutput = z.infer<
  typeof SuggestComplementaryMaterialOutputSchema
>;

export async function suggestComplementaryMaterial(
  input: SuggestComplementaryMaterialInput
): Promise<SuggestComplementaryMaterialOutput> {
  return suggestComplementaryMaterialFlow(input);
}

const suggestMaterialPrompt = ai.definePrompt({
  name: 'suggestMaterialPrompt',
  input: {schema: SuggestComplementaryMaterialInputSchema},
  output: {schema: SuggestComplementaryMaterialOutputSchema},
  prompt: `Você é um curador de conteúdo educacional especialista.
  
  Baseado no seguinte contexto, sugira materiais de aprendizagem complementares. Forneça 2 a 3 sugestões de artigos/leituras e 2 a 3 sugestões de vídeos.
  Para cada sugestão, adicione uma frase curta a descrever o que o aluno pode esperar aprender. Não invente URLs, apenas descreva o tipo de conteúdo a procurar.

  Exemplo de resposta:
  - Artigos: ["'O Teorema de Pitágoras Simplificado' - Um artigo que explica o conceito com exemplos visuais.", "'Aplicações do Teorema de Pitágoras no Mundo Real' - Mostra como a fórmula é usada em engenharia e navegação."]
  - Vídeos: ["'Khan Academy: Introdução ao Teorema de Pitágoras' - Uma aula em vídeo que detalha a prova do teorema.", "'3Blue1Brown: A Essência de Pitágoras' - Uma animação visual que oferece uma perspetiva intuitiva."]

  Contexto: {{{context}}}
  `,
});

const suggestComplementaryMaterialFlow = ai.defineFlow(
  {
    name: 'suggestComplementaryMaterialFlow',
    inputSchema: SuggestComplementaryMaterialInputSchema,
    outputSchema: SuggestComplementaryMaterialOutputSchema,
  },
  async input => {
    const {output} = await suggestMaterialPrompt(input);
    return output!;
  }
);
