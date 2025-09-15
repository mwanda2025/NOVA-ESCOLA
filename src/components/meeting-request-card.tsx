
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarX, Send } from "lucide-react";

export type MeetingRequestProps = {
  requester: string;
  student: string;
  requestDate: string;
  suggestedDate: string;
  suggestedTime: string;
  reason: string;
};

export function MeetingRequestCard(props: MeetingRequestProps) {
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{props.requester}</CardTitle>
            <CardDescription className="text-xs">
              Aluno: {props.student} | Pedido recebido {props.requestDate}
            </CardDescription>
          </div>
          <div className="text-sm font-semibold text-right">
            <p>{props.suggestedDate}</p>
            <p>{props.suggestedTime}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic text-muted-foreground">"{props.reason}"</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm"><CalendarX className="mr-2 h-4 w-4" /> Reagendar</Button>
        <Button variant="destructive" size="sm">Rejeitar</Button>
        <Button size="sm"><Send className="mr-2 h-4 w-4" /> Aceitar Pedido</Button>
      </CardFooter>
    </Card>
  );
}
