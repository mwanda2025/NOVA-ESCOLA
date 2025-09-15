"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const themes = [
  { name: 'light', label: 'Claro', colors: { bg: 'bg-slate-100', primary: 'bg-slate-900', accent: 'bg-slate-500' } },
  { name: 'dark', label: 'Escuro', colors: { bg: 'bg-slate-900', primary: 'bg-slate-50', accent: 'bg-slate-400' } },
  { name: 'ocean', label: 'Oceano', colors: { bg: 'bg-blue-100', primary: 'bg-blue-900', accent: 'bg-sky-500' } },
  { name: 'sunset', label: 'Pôr do Sol', colors: { bg: 'bg-orange-100', primary: 'bg-red-900', accent: 'bg-amber-500' } },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {themes.map((t) => (
        <Button
          key={t.name}
          variant="outline"
          className={cn(
            "h-auto p-4 flex flex-col items-start gap-2 relative",
            theme === t.name && "border-primary ring-2 ring-primary"
          )}
          onClick={() => setTheme(t.name)}
        >
          <div className="flex items-center gap-2">
            <div className={cn("w-6 h-6 rounded-full", t.colors.bg)}>
              <div className="flex items-center justify-center h-full gap-1">
                 <div className={cn("w-2 h-4 rounded-sm", t.colors.primary)}></div>
                 <div className={cn("w-1 h-3 rounded-sm", t.colors.accent)}></div>
              </div>
            </div>
            <span className="font-semibold">{t.label}</span>
          </div>
          <p className="text-xs text-muted-foreground text-left">Clique para aplicar este tema.</p>
          {theme === t.name && (
            <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" />
            </div>
          )}
        </Button>
      ))}
    </div>
  )
}
