"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { FileText, Heart, Home, Save } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

/**
 * Navigation Component
 *
 * Renders the navigation menu with links to different pages.
 *
 * @returns {JSX.Element} The rendered Navigation component.
 */
export function Navigation() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/saved-searches", label: "Saved Searches", icon: Save },
    { href: "/favourite-courses", label: "Favourite Courses", icon: Heart },
    { href: "/applications", label: "Applications", icon: FileText },
  ];

  return (
    <div>
      <div className="container mx-auto transition-all p-4">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Button
                  asChild
                  variant={pathname === item.href ? "default" : "ghost"}
                >
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
        </NavigationMenu>
      </div>
    </div>
  );
}
