'use server';

/**
 * @fileOverview Provides AI-powered assignment grading assistance.
 *
 * - gradeAssignment - A function that suggests a grade, strengths, and weaknesses for a submission.
 * - GradeAssignmentInput - The input type for the function.
 * - GradeAssignmentOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradeAssignmentInputSchema = z.object({
  instructions: z.string().describe('As instruções ou o enunciado do trabalho.'),
  submissionText: z.string().describe('O texto do trabalho submetido pelo aluno.'),
});
export type GradeAssignmentInput = z.infer<typeof GradeAssignmentInputSchema>;

const GradeAssignmentOutputSchema = z.object({
  suggestedGrade: z.number().describe('A nota sugerida para o trabalho, numérico de 0 a 10. Pode ter casas decimais.'),
  strengths: z.array(z.string()).describe('Uma lista de 2 a 3 pontos fortes do trabalho.'),
  weaknesses: z.array(z.string()).describe('Uma lista de 2 a 3 pontos a melhorar.'),
  feedback: z.string().describe('Um parágrafo de feedback geral para o aluno.'),
});
export type GradeAssignmentOutput = z.infer<typeof GradeAssignmentOutputSchema>;

export async function gradeAssignment(input: GradeAssignmentInput): Promise<GradeAssignmentOutput> {
  return gradeAssignmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gradeAssignmentPrompt',
  input: {schema: GradeAssignmentInputSchema},
  output: {schema: GradeAssignmentOutputSchema},
  prompt: `Você é um assistente de professor especialista em avaliar trabalhos de alunos.

  Sua tarefa é analisar o trabalho enviado por um aluno com base nas instruções fornecidas. Você deve:
  1.  Sugerir uma nota de 0 a 10. A nota deve ser puramente baseada na qualidade do conteúdo e na resposta às instruções. Seja rigoroso e justo.
  2.  Identificar 2 ou 3 pontos fortes específicos do trabalho.
  3.  Identificar 2 ou 3 pontos fracos ou áreas para melhoria.
  4.  Escrever um parágrafo de feedback construtivo para o aluno.

  Instruções do Trabalho:
  {{{instructions}}}

  Texto Enviado pelo Aluno:
  {{{submissionText}}}
  `,
});

const gradeAssignmentFlow = ai.defineFlow(
  {
    name: 'gradeAssignmentFlow',
    inputSchema: GradeAssignmentInputSchema,
    outputSchema: GradeAssignmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
