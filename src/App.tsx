import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GITHUB, H2, SUB, TYPESAFE, WRAP } from "@/lib/site";
import { Header } from "@/sections/Header";
import { SessionCompare } from "@/sections/SessionCompare";
import { Value } from "@/sections/Value";
import { InstallCard } from "@/sections/InstallCard";
import { VideoFrame } from "@/sections/VideoFrame";
import { Stats } from "@/sections/Stats";
import { Pipeline } from "@/sections/Pipeline";
import { Filtered } from "@/sections/Filtered";
import { Results } from "@/sections/Results";
import { Questions } from "@/sections/Questions";
import { Logo } from "@/sections/Logo";

export default function App() {
  return (
    <div id="top" className="ground min-h-screen text-foreground font-sans overflow-x-clip">
      <Header />
      <main>
        <section className={`${WRAP} pt-14 sm:pt-20 text-center`}>
          <Badge variant="outline" className="rounded-full px-3 py-1 text-[12.5px] bg-card border-border text-muted-foreground">A Claude Code plugin · powered by Jev</Badge>
          <h1 className="mt-6 mx-auto max-w-[860px] text-[clamp(40px,7.2vw,84px)] leading-[0.98] tracking-[-0.05em] font-extrabold">Less junk in Claude's context.</h1>
          <p className="mt-6 mx-auto max-w-[620px] text-[clamp(17px,2vw,20px)] leading-normal text-muted-foreground">Every grep, file read and web search is filtered before Claude sees it. You stop paying, turn after turn, for results that were never relevant.</p>
          <div className="mt-12"><SessionCompare /></div>
          <div className="mt-12"><InstallCard id="install" /></div>
        </section>

        <div className={`${WRAP} mt-28 space-y-28`}>
          <Value />
          <VideoFrame />
          <Stats />
          <Pipeline />
          <Filtered />
          <Results />
          <Questions />

          <section className="text-center pb-6">
            <h2 className={H2}>Give Claude less to read</h2>
            <p className={SUB}>Free. Bring your own <a className="text-primary underline underline-offset-4" href={TYPESAFE}>TypeSafe</a> key.</p>
            <div className="mt-8"><InstallCard /></div>
          </section>
        </div>
      </main>

      <footer className="mt-24">
        <Separator className="opacity-60" />
        <div className={`${WRAP} py-8 flex flex-wrap items-center justify-between gap-4 text-[14px] text-muted-foreground`}>
          <span className="flex items-center gap-2"><Logo size={22} /> jev-sift</span>
          <span className="flex gap-6">
            <a className="text-muted-foreground hover:text-foreground no-underline" href={GITHUB}>GitHub</a>
            <a className="text-muted-foreground hover:text-foreground no-underline" href={TYPESAFE}>Jev by TypeSafe</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
