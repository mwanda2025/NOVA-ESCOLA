import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BookOpen className="h-6 w-6 text-sidebar-primary" />
      <h1 className="text-xl font-bold font-headline text-sidebar-foreground truncate">
        NOVA ESCOLA
      </h1>
    </div>
  );
}
