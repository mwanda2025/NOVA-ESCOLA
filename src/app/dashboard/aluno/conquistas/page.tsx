
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Star, Trophy, Sparkles, Users, BarChart3, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { medals, classRanking, schoolRanking, recentActivities } from "@/lib/data/gamification";

const icons: { [key: string]: React.ElementType } = {
    Star,
    Users,
    TrendingUp,
    BarChart3,
    Award,
};

export default function ConquistasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Aprendizagem Social & Conquistas</h1>
        <p className="text-muted-foreground">Participe em missões, ganhe medalhas e suba no ranking!</p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" />
                        Missão da Semana: Mestres da História
                    </CardTitle>
                    <CardDescription className="mt-2">A turma 10ºB está a trabalhar em conjunto para completar 50 quizzes de História e ganhar um badge exclusivo!</CardDescription>
                </div>
                <Button variant="outline">Ver Detalhes da Missão</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-4">
                <Progress value={70} className="flex-1"/>
                <span className="font-bold text-lg text-primary">70%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Progresso da Turma</p>
        </CardContent>
      </Card>


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meus Pontos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1250</div>
            <p className="text-xs text-muted-foreground">+50 pontos esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minhas Medalhas</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 / 4</div>
            <p className="text-xs text-muted-foreground">Medalhas conquistadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ranking da Turma</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#1</div>
            <p className="text-xs text-muted-foreground">Sua posição na turma 10º B</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
            <CardDescription>Veja a sua posição e a da sua turma.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
             <div>
                <h3 className="font-semibold mb-2">Ranking da Turma 10º B</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Aluno</TableHead>
                      <TableHead className="text-right">Pontos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classRanking.map((player) => (
                      <TableRow key={player.rank} className={player.isCurrentUser ? "bg-muted hover:bg-muted" : ""}>
                        <TableCell className="font-medium">{player.rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                               <AvatarImage src={`https://placehold.co/40x40.png?text=${player.avatar}`} />
                              <AvatarFallback>{player.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{player.name} {player.isCurrentUser && "(Você)"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-bold">{player.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
             <div>
                 <h3 className="font-semibold mb-2">Ranking da Escola (Turmas)</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Turma</TableHead>
                      <TableHead className="text-right">Pontos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schoolRanking.map((team) => (
                      <TableRow key={team.rank} className={team.isCurrentClass ? "bg-muted hover:bg-muted" : ""}>
                        <TableCell className="font-medium">{team.rank}</TableCell>
                        <TableCell>
                            <span className="font-medium text-sm">{team.name} {team.isCurrentClass && "(Sua Turma)"}</span>
                        </TableCell>
                        <TableCell className="text-right font-bold">{team.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Suas últimas conquistas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => {
                    const Icon = icons[activity.icon];
                    return (
                        <div key={index} className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{activity.text}</p>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Medalhas Disponíveis</CardTitle>
            <CardDescription>Complete os desafios individuais e em grupo para ganhar todas!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {medals.map((medal) => {
                const Icon = icons[medal.icon];
                let iconColor = medal.earned ? 'text-yellow-500' : 'text-blue-500';
                if(medal.icon === 'TrendingUp') iconColor = 'text-green-500';
                if(medal.icon === 'BarChart3') iconColor = 'text-purple-500';

                return (
                    <Card key={medal.title} className={`transition-all ${medal.earned ? 'border-primary shadow-md' : 'opacity-60'}`}>
                        <CardContent className="flex flex-col items-center text-center p-6">
                        <div className={`mb-4 rounded-full p-3 ${medal.earned ? 'bg-primary/10' : 'bg-muted'}`}>
                            <Icon className={`h-8 w-8 ${iconColor}`} />
                        </div>
                        <p className="font-bold mb-1">{medal.title}</p>
                        <p className="text-xs text-muted-foreground">{medal.description}</p>
                        {medal.earned && <div className="mt-4 text-xs font-bold text-primary">CONQUISTADA</div>}
                        </CardContent>
                    </Card>
                )
            })}
          </CardContent>
        </Card>

    </div>
  );
}
