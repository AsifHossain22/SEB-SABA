'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navItems, userMenuItems } from '../ui/config/nav-items';
import { cn } from '@/lib/utils';

type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

type TNavbarProps = {
  user: IUser;
};

export function Navbar({ user }: TNavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary" />
            <span className="font-semibold text-lg">NextJS Press</span>
          </Link>
        </div>

        {/* NavLinks */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* UserDropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative size-10 rounded-full p-0 cursor-pointer"
            >
              <Avatar className="size-10">
                <AvatarImage
                  src={user.data.profile.profile.profilePhoto}
                  alt={user.data.profile.name || 'User Name'}
                />
                <AvatarFallback>
                  {user.data.profile.name || 'Name'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user.data.profile.profile.profilePhoto}
                    alt={user.data.profile.name || 'User Name'}
                  />
                  <AvatarFallback>{user.data.profile.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">
                    {user.data.profile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.data.profile.email || 'User Email'}
                  </p>
                </div>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userMenuItems.map(item => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className={
                    item.isDanger
                      ? 'text-destructive focus:text-destructive cursor-pointer'
                      : ''
                  }
                >
                  <Link href={item.href} className="cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
