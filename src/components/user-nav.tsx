
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, Bell, ClipboardCheck, AlertTriangle, Star } from "lucide-react";
import { notifications, userRole } from "@/lib/data/users";

const icons: { [key: string]: React.ElementType } = {
    ClipboardCheck,
    Star,
    AlertTriangle,
};

export function UserNav() {

  const userNotifications = notifications.filter(n => n.role.includes(userRole));

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Bell className="h-5 w-5" />
            {userNotifications.length > 0 && (
               <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
          <DropdownMenuLabel>
            <p className="font-semibold">Notificações</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {userNotifications.length > 0 ? (
              userNotifications.map((notification, index) => {
                const Icon = icons[notification.icon];
                let iconColor = 'text-yellow-500';
                if(notification.icon === 'Star') iconColor = 'text-green-500';
                if(notification.icon === 'AlertTriangle') iconColor = 'text-red-500';

                return (
                    <DropdownMenuItem key={index} className="flex items-start gap-3 whitespace-normal">
                    <div className="mt-1"><Icon className={`h-4 w-4 ${iconColor}`} /></div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                    </div>
                    </DropdownMenuItem>
                )
              })
            ) : (
              <DropdownMenuItem disabled>
                <p className="text-sm text-muted-foreground text-center w-full">Nenhuma notificação nova.</p>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/40x40.png" alt="Avatar do utilizador" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Nome de Utilizador</p>
              <p className="text-xs leading-none text-muted-foreground">
                utilizador@exemplo.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
