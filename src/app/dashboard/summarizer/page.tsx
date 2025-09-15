'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { summarizeLearningMaterial, SummarizeLearningMaterialOutput } from "@/ai/flows/summarize-learning-material";
import { translateLearningMaterialSummary } from "@/ai/flows/translate-learning-material-summary";
import { suggestComplementaryMaterial, SuggestComplementaryMaterialOutput } from "@/ai/flows/suggest-complementary-material";
import { Loader2, Wand2, Languages, BookOpen, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function SummarizerPage() {
  const [material, setMaterial] = useState('');
  const [summaryData, setSummaryData] = useState<SummarizeLearningMaterialOutput | null>(null);
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [complementaryMaterial, setComplementaryMaterial] = useState<SuggestComplementaryMaterialOutput | null>(null);
  const [summaryLanguage, setSummaryLanguage] = useState('Português');
  const [translationLanguage, setTranslationLanguage] = useState('Inglês');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!material.trim()) {
      toast({ title: "Erro", description: "Por favor, insira algum material para resumir.", variant: "destructive" });
      return;
    }
    setIsSummarizing(true);
    setSummaryData(null);
    setTranslatedSummary('');
    setComplementaryMaterial(null);
    try {
      const result = await summarizeLearningMaterial({ material, language: summaryLanguage });
      setSummaryData(result);
    } catch (error) {
      console.error(error);
      toast({ title: "Falha ao Resumir", description: "Ocorreu um erro ao gerar o resumo.", variant: "destructive" });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleTranslate = async () => {
    if (!summaryData?.summary) {
       toast({ title: "Erro", description: "Por favor, gere um resumo primeiro.", variant: "destructive" });
      return;
    }
    setIsTranslating(true);
    try {
      const result = await translateLearningMaterialSummary({ summary: summaryData.summary, language: translationLanguage });
      setTranslatedSummary(result.translatedSummary);
    } catch (error) {
      console.error(error);
      toast({ title: "Falha na Tradução", description: "Ocorreu um erro ao traduzir o resumo.", variant: "destructive" });
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleSuggest = async () => {
    if (!summaryData?.summary) {
       toast({ title: "Erro", description: "Por favor, gere um resumo primeiro para obter sugestões.", variant: "destructive" });
      return;
    }
    setIsSuggesting(true);
    setComplementaryMaterial(null);
    try {
      const result = await suggestComplementaryMaterial({ context: summaryData.summary });
      setComplementaryMaterial(result);
    } catch (error) {
      console.error(error);
      toast({ title: "Falha ao Sugerir", description: "Ocorreu um erro ao buscar materiais complementares.", variant: "destructive" });
    } finally {
      setIsSuggesting(false);
    }
  };

  const languages = [
    { value: 'Português', label: 'Português' },
    { value: 'Inglês', label: 'Inglês' },
    { value: 'Espanhol', label: 'Espanhol' },
    { value: 'Francês', label: 'Francês' },
    { value: 'Alemão', label: 'Alemão' },
    { value: 'Chinês Mandarim', label: 'Chinês Mandarim' },
  ];

  const allLoading = isSummarizing || isTranslating || isSuggesting;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Assistente de Estudo IA</h1>
        <p className="text-muted-foreground">Obtenha resumos, perguntas de revisão e sugestões de estudo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Material de Entrada</CardTitle>
            <CardDescription>Cole o texto que você deseja processar abaixo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Digite seu material de estudo aqui..."
              className="min-h-[400px] font-code"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              disabled={allLoading}
            />
            <div className="space-y-2">
              <Label htmlFor="summary-lang">Idioma do Resumo</Label>
              <Select value={summaryLanguage} onValueChange={setSummaryLanguage} disabled={allLoading}>
                <SelectTrigger id="summary-lang">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSummarize} disabled={isSummarizing}>
              {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              {isSummarizing ? 'Processando...' : 'Gerar Análise'}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resultados da Análise</CardTitle>
              <CardDescription>Aqui estão o resumo e as perguntas de revisão geradas pela IA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Resumo Gerado</h3>
                <div className="min-h-[100px] bg-muted rounded-md p-4">
                  {isSummarizing ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : summaryData?.summary ? (
                    <p className="text-sm">{summaryData.summary}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">O resumo do seu material aparecerá aqui.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Perguntas de Revisão</h3>
                 <div className="min-h-[100px] bg-muted rounded-md p-4">
                  {isSummarizing ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ) : summaryData?.revisionQuestions ? (
                    <ul className="space-y-2 list-disc pl-5 text-sm">
                      {summaryData.revisionQuestions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">As perguntas de revisão aparecerão aqui.</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button onClick={handleSuggest} disabled={!summaryData || allLoading} variant="secondary">
                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookOpen className="mr-2 h-4 w-4" />}
                {isSuggesting ? 'Sugerindo...' : 'Sugerir Materiais'}
              </Button>
              <Button onClick={handleTranslate} disabled={!summaryData || allLoading} variant="secondary">
                {isTranslating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
                {isTranslating ? 'Traduzindo...' : 'Traduzir'}
              </Button>
            </CardFooter>
          </Card>
          
          {(isSuggesting || complementaryMaterial) && (
             <Card>
              <CardHeader>
                <CardTitle>Materiais Complementares</CardTitle>
                <CardDescription>Sugestões de vídeos e leituras para aprofundar seu conhecimento.</CardDescription>
              </CardHeader>
              <CardContent>
                {isSuggesting ? (
                   <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                   </div>
                ) : (
                  <div className="space-y-4">
                    {complementaryMaterial?.articles?.length ? (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4" />Leituras Recomendadas</h4>
                        <ul className="space-y-2 list-disc pl-5 text-sm">
                           {complementaryMaterial.articles.map((item, i) => <li key={`art-${i}`}>{item}</li>)}
                        </ul>
                      </div>
                    ) : null}
                    {complementaryMaterial?.videos?.length ? (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Video className="h-4 w-4" />Vídeos Recomendados</h4>
                        <ul className="space-y-2 list-disc pl-5 text-sm">
                           {complementaryMaterial.videos.map((item, i) => <li key={`vid-${i}`}>{item}</li>)}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {(isTranslating || translatedSummary) && (
            <Card>
              <CardHeader>
                <CardTitle>Tradução do Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="translate-lang">Traduzir para</Label>
                  <Select value={translationLanguage} onValueChange={setTranslationLanguage} disabled={!summaryData?.summary || allLoading}>
                    <SelectTrigger id="translate-lang">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-h-[100px] bg-muted rounded-md p-4">
                  {isTranslating ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  ) : translatedSummary ? (
                    <p className="text-sm">{translatedSummary}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">A tradução aparecerá aqui.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
