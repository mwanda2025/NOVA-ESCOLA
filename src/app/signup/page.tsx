import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, UserCog, GraduationCap, User, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">NOVA ESCOLA</span>
            </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Criar Nova Conta</CardTitle>
            <CardDescription>
              Preencha os seus dados para se registar na plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
               <div className="grid gap-2">
                <Label htmlFor="fullname">Nome Completo</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Seu Nome Completo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="role">Qual é a sua função?</Label>
                 <Select required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecione o seu perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluno">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Aluno
                        </div>
                    </SelectItem>
                    <SelectItem value="professor">
                         <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" /> Professor
                        </div>
                    </SelectItem>
                     <SelectItem value="encarregado">
                         <div className="flex items-center gap-2">
                           <Shield className="h-4 w-4" /> Encarregado
                        </div>
                    </SelectItem>
                    <SelectItem value="admin">
                         <div className="flex items-center gap-2">
                           <UserCog className="h-4 w-4" /> Administrador
                        </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Criar Conta</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{' '}
              <Link href="/login" className="underline">
                Acessar plataforma
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
