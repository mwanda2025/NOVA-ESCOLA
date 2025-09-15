'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart as BarChartIcon, FileDown, TrendingUp, TrendingDown, Users, Percent, Lightbulb } from "lucide-react";
import { InsightCard, InsightCardContent } from "@/components/insight-card";

import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { gradesData, attendanceData, assignmentData } from '@/lib/data/reports';

const chartConfig = {
  grade: { label: "Nota Média", color: "hsl(var(--primary))" },
  faltas: { label: "Faltas", color: "hsl(var(--destructive))" },
  schoolFaltas: { label: "Média Escola", color: "hsl(var(--muted-foreground))" },
};


export default function ReportsPage() {
  const [reportType, setReportType] = useState('performance');
  const [classFilter, setClassFilter] = useState('9B');
  const [periodFilter, setPeriodFilter] = useState('trimestre');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Relatórios e Insights com IA</h1>
        <p className="text-muted-foreground">Analise tendências e tome decisões informadas com o poder da IA.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros do Relatório</CardTitle>
          <CardDescription>Selecione os critérios para gerar os insights abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Análise</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Desempenho Académico</SelectItem>
                  <SelectItem value="attendance">Assiduidade e Faltas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Turma</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9B">9º B</SelectItem>
                  <SelectItem value="10A">10º A</SelectItem>
                  <SelectItem value="all">Toda a Escola</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-range">Período</Label>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Selecione um intervalo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes">Último Mês</SelectItem>
                  <SelectItem value="trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="semestre">Este Semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
            <Button>
              <BarChartIcon className="h-4 w-4 mr-2" />
              Atualizar Relatórios
            </Button>
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" />
              Exportar como PDF
            </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Trends */}
        <InsightCard>
            <InsightCardContent
                title="Evolução de Notas - Matemática (9ºB)"
                icon={<TrendingDown className="h-6 w-6 text-destructive" />}
                chart={
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <LineChart data={gradesData["9B"]["Matemática"]}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis domain={[10, 20]} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="grade" stroke="var(--color-grade)" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                }
                insight="As notas médias caíram 22% de Janeiro para Março, mostrando uma ligeira recuperação em Abril. Esta queda coincide com o aumento do número de faltas."
            />
        </InsightCard>

        {/* Attendance Trends */}
         <InsightCard>
            <InsightCardContent
                title="Faltas em Matemática vs. Média da Escola"
                icon={<Users className="h-6 w-6 text-destructive" />}
                chart={
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <BarChart data={attendanceData["9B"]["Matemática"].map((item, index) => ({...item, school: attendanceData.schoolAverage[index].faltas}))}>
                             <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="faltas" fill="var(--color-faltas)" radius={4} />
                             <Bar dataKey="school" fill="var(--color-schoolFaltas)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                }
                insight="A turma 9ºB registou um pico de 8 faltas em Março, 60% acima da média da escola para o mesmo mês. Recomenda-se investigar a causa."
            />
        </InsightCard>

        {/* Assignment Trends */}
         <InsightCard>
            <InsightCardContent
                title="Taxa de Entrega de Trabalhos (9ºB)"
                icon={<Percent className="h-6 w-6 text-primary" />}
                 chart={
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <BarChart layout="vertical" data={assignmentData["9B"]} margin={{left: 30}}>
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="value" radius={5} >
                                 {assignmentData["9B"].map((entry, index) => (
                                    <div key={`cell-${index}`} />
                                 ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                }
                insight="A taxa de entrega no prazo é de 85%, o que é positivo. No entanto, 15% dos trabalhos são entregues com atraso, impactando a nota final em algumas disciplinas."
            />
        </InsightCard>
        
         <InsightCard>
            <InsightCardContent
                title="Evolução de Notas - Português (9ºB)"
                icon={<TrendingUp className="h-6 w-6 text-green-500" />}
                chart={
                     <ChartContainer config={chartConfig} className="h-[200px] w-full">
                        <LineChart data={gradesData["9B"]["Português"]}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis domain={[10, 20]} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="grade" stroke="var(--color-grade)" strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                }
                insight="Desempenho excelente e consistente em Português, com uma tendência de melhoria contínua ao longo do trimestre, atingindo uma média de 17.0 em Abril."
            />
        </InsightCard>

      </div>
    </div>
  );
}
