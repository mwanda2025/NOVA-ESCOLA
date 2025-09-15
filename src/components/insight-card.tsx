import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardActions } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type InsightCardProps = React.HTMLAttributes<HTMLDivElement>;

const InsightCard = ({ className, ...props }: InsightCardProps) => (
    <Card className={cn("flex flex-col", className)} {...props} />
);

type InsightCardContentProps = {
    title: string;
    icon: React.ReactNode;
    chart: React.ReactNode;
    insight: string;
};

const InsightCardContent = ({ title, icon, chart, insight }: InsightCardContentProps) => (
    <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent className="flex-grow">
            {chart}
        </CardContent>
        {/* Quick actions slot for dashboards */}
        <CardActions className="pt-0">
            {/* Example actions; parent can override via children if desired */}
        </CardActions>
        <CardContent>
            <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-sm">Insight da IA</h3>
                    <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
            </div>
        </CardContent>
    </>
);

export { InsightCard, InsightCardContent };
