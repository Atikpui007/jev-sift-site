import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { GITHUB, WRAP } from "@/lib/site";
import { Logo } from "./Logo";

const LINKS: [string, string][] = [["Savings", "#value"], ["Demo", "#demo"], ["How it works", "#how"], ["Results", "#results"], ["FAQ", "#questions"], ["GitHub", GITHUB]];

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-background/75 backdrop-blur-md border-b border-border/60">
      <div className={`${WRAP} h-16 flex items-center justify-between gap-4`}>
        <a href="#top" className="flex items-center gap-2.5 no-underline text-foreground">
          <Logo /><span className="text-[19px] font-bold tracking-[-0.03em]">jev-sift</span>
        </a>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {LINKS.map(([label, href]) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink href={href} className="px-3 text-[14.5px] text-muted-foreground hover:text-foreground">{label}</NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-1.5">
          <ModeToggle />
          <Button className="rounded-full px-5 font-semibold" onClick={() => document.getElementById("install")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Install</Button>
        </div>
      </div>
    </header>
  );
}
