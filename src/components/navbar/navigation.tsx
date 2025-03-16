"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { FileText, Heart, Home, Save, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

/**
 * MenuItems Component
 *
 * Renders the list of navigation menu items.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click handler for menu items.
 * @returns {JSX.Element} The rendered MenuItems component.
 */
function MenuItems({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/saved-searches", label: "Saved Searches", icon: Save },
    { href: "/favourite-courses", label: "Favourite Courses", icon: Heart },
    { href: "/applications", label: "Applications", icon: FileText },
  ];

  return (
    <NavigationMenuList className="flex flex-col md:flex-row gap-4 items-start">
      {menuItems.map((item) => (
        <NavigationMenuItem
          key={item.href}
          onClick={onClick}
          className={pathname === item.href ? "bg-accent rounded-sm" : ""}
        >
          <Button asChild>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className="flex flex-row items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavigationMenuLink>
            </Link>
          </Button>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
}

/**
 * Navigation Component
 *
 * Renders the navigation menu with links to different pages.
 *
 * @returns {JSX.Element} The rendered Navigation component.
 */
export function Navigation() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div>
      <div className="container mx-auto transition-all p-4">
        <div className="flex justify-between items-center md:hidden">
          <Button variant="ghost" onClick={() => setIsSheetOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent side="left">
              <NavigationMenu>
                <MenuItems onClick={() => setIsSheetOpen(false)} />
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            <MenuItems />
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
