
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreHorizontal, FilePlus2, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { payments } from "@/lib/data/finance";

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Pago":
      return "default";
    case "Pendente":
      return "secondary";
    case "Atrasado":
      return "destructive";
    default:
      return "outline";
  }
};

export default function FinancePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredPayments = useMemo(() => {
        return payments.filter(payment => {
            const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
            const matchesSearch = searchTerm.trim() === '' ||
                payment.student.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Painel Financeiro</h1>
          <p className="text-muted-foreground">Gestão de mensalidades e pagamentos dos alunos.</p>
        </div>
        <Button>
            <FilePlus2 className="h-4 w-4 mr-2" />
            Registar Nova Mensalidade
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registos de Pagamento</CardTitle>
          <CardDescription>Uma lista de todas as mensalidades registadas.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-2 mb-4">
                <Input 
                    placeholder="Pesquisar por aluno..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Atrasado">Atrasado</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Mês</TableHead>
                <TableHead>Valor (€)</TableHead>
                <TableHead>Data de Emissão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.student}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.value}</TableCell>
                  <TableCell>{payment.issueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(payment.status)}>{payment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Alternar menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                         {payment.status !== 'Pago' && <DropdownMenuItem>Marcar como Pago</DropdownMenuItem>}
                        {payment.status !== 'Pago' && <DropdownMenuItem>Enviar Lembrete</DropdownMenuItem>}
                        <DropdownMenuItem>Ver Recibo (PDF)</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver Detalhes do Aluno</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {filteredPayments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>Nenhum registo de pagamento encontrado para os filtros selecionados.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
