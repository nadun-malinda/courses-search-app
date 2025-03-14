import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Heart, Home, Save } from "lucide-react";

export function Navigation() {
  return (
    <div>
      <div className="container mx-auto transition-all p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="flex flex-row items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/saved-searches" legacyBehavior passHref>
                <NavigationMenuLink className="flex flex-row items-center gap-2">
                  <Save className="w-4 h-4" />
                  Saved Searches
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/favourite-courses" legacyBehavior passHref>
                <NavigationMenuLink className="flex flex-row items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Favourite Courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
