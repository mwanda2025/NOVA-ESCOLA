'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wand2, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { gradeAssignment, GradeAssignmentOutput } from '@/ai/flows/grade-assignment';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { assignmentDetails } from '@/lib/data/assignments';

export default function GradeAssignmentPage() {
    const [gradingResult, setGradingResult] = useState<GradeAssignmentOutput | null>(null);
    const [finalGrade, setFinalGrade] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAIAssist = async () => {
        setIsLoading(true);
        setGradingResult(null);
        try {
            const result = await gradeAssignment({
                instructions: assignmentDetails.instructions,
                submissionText: assignmentDetails.submissionText
            });
            setGradingResult(result);
            setFinalGrade(result.suggestedGrade.toFixed(1));
        } catch (error) {
            console.error("Error grading assignment:", error);
            toast({
                title: "Erro de IA",
                description: "Não foi possível obter a sugestão da IA. Tente novamente.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Corrigir Trabalho</h1>
                <p className="text-muted-foreground">Utilize o assistente de IA para apoiar a sua correção.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Detalhes do Trabalho</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Aluno</Label>
                            <p className="text-sm font-semibold">{assignmentDetails.student}</p>
                        </div>
                        <div>
                            <Label>Trabalho</Label>
                            <p className="text-sm font-semibold">{assignmentDetails.title}</p>
                        </div>
                         <div>
                            <Label>Enunciado</Label>
                            <p className="text-sm text-muted-foreground">{assignmentDetails.instructions}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleAIAssist} disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Wand2 className="mr-2 h-4 w-4" />
                            )}
                            Corrigir com IA
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Submissão do Aluno</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm dark:prose-invert max-w-full bg-muted p-4 rounded-md h-96 overflow-y-auto">
                            <p>{assignmentDetails.submissionText}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {(isLoading || gradingResult) && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Análise da IA</CardTitle>
                        <CardDescription>Esta é uma sugestão para o ajudar. A decisão final é sua.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         {isLoading ? (
                             <div className="space-y-6">
                                <Skeleton className="h-10 w-48" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                 <div className="space-y-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-4/6" />
                                </div>
                             </div>
                         ) : gradingResult ? (
                             <>
                                <div>
                                    <Label htmlFor="suggested-grade">Nota Sugerida</Label>
                                    <div className="flex items-center gap-4 mt-1">
                                        <Input
                                            id="suggested-grade"
                                            type="number"
                                            value={finalGrade}
                                            onChange={(e) => setFinalGrade(e.target.value)}
                                            className="w-24 text-lg font-bold"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                        />
                                        <p className="text-sm text-muted-foreground">A IA sugeriu: <span className="font-bold">{gradingResult.suggestedGrade.toFixed(1)}</span></p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold flex items-center gap-2 mb-2"><CheckCircle className="h-5 w-5 text-green-500"/> Pontos Fortes</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            {gradingResult.strengths.map((point, index) => <li key={`str-${index}`}>{point}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold flex items-center gap-2 mb-2"><AlertCircle className="h-5 w-5 text-yellow-500"/> Pontos a Melhorar</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-sm">
                                            {gradingResult.weaknesses.map((point, index) => <li key={`weak-${index}`}>{point}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Feedback Geral Sugerido</h3>
                                  <div className="text-sm bg-muted p-3 rounded-md">
                                    <p>{gradingResult.feedback}</p>
                                  </div>
                                </div>
                             </>
                         ) : null}
                    </CardContent>
                    <CardFooter>
                        <Button size="lg">Publicar Nota e Feedback</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
