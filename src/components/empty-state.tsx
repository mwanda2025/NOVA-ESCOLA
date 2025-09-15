'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: { label: string; onClick?: () => void; href?: string };
  secondaryAction?: { label: string; onClick?: () => void; href?: string };
  className?: string;
};

export function EmptyState({ icon, title, description, primaryAction, secondaryAction, className }: EmptyStateProps) {
  const Wrapper: React.FC<{ children: React.ReactNode; href?: string; onClick?: () => void }> = ({ children, href, onClick }) => {
    if (href) return <a href={href}>{children}</a> as any;
    return <span onClick={onClick}>{children}</span>;
  };

  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-4 rounded-lg border bg-card', className)}>
      {icon ? <div className="mb-3 text-muted-foreground">{icon}</div> : null}
      <h3 className="text-lg md:text-xl font-semibold font-headline">{title}</h3>
      {description ? (
        <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-prose">{description}</p>
      ) : null}
      {(primaryAction || secondaryAction) && (
        <div className="mt-4 flex items-center gap-2">
          {primaryAction ? (
            <Wrapper href={primaryAction.href} onClick={primaryAction.onClick}>
              <Button>
                {primaryAction.label}
              </Button>
            </Wrapper>
          ) : null}
          {secondaryAction ? (
            <Wrapper href={secondaryAction.href} onClick={secondaryAction.onClick}>
              <Button variant="outline">
                {secondaryAction.label}
              </Button>
            </Wrapper>
          ) : null}
        </div>
      )}
    </div>
  );
}


