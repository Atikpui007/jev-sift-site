import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SESSION, TOTAL } from "@/session";
import { fmtTok } from "@/lib/site";

function useReveal() {
  const [done, setDone] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    // Reduced motion: show the finished state on first load, but still honour an explicit replay.
    if (run === 0 && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDone(SESSION.length); return; }
    setDone(0);
    const timers: number[] = [];
    SESSION.forEach((_, i) => timers.push(window.setTimeout(() => setDone(i + 1), 700 + i * 320)));
    return () => timers.forEach(clearTimeout);
  }, [run]);
  return { done, playing: done < SESSION.length, replay: () => setRun((r) => r + 1) };
}

function Terminal({ label, accent, rows, foot, meter, meterLabel }: { label: string; accent?: boolean; rows: React.ReactNode; foot: React.ReactNode; meter: number; meterLabel: string }) {
  return (
    <div className="min-w-0">
      <Badge variant={accent ? "default" : "secondary"} className="mb-2.5 rounded-full">{label}</Badge>
      <Card className="term gap-0 py-0 rounded-2xl lift overflow-hidden ring-0">
        <CardHeader className="flex flex-row items-center gap-1.5 px-4 pt-3.5 pb-2">
          <span className="size-2.5 rounded-full bg-white/12" /><span className="size-2.5 rounded-full bg-white/12" /><span className="size-2.5 rounded-full bg-white/12" />
          <span className="ml-2 font-mono text-[12px] term-muted">one session · tool output entering context</span>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-1">
          <ol className="list-none m-0 p-0 font-mono text-[12.5px] leading-[1.95]">{rows}</ol>
          <Progress value={meter} className="mt-3 [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-white/8">
            <span className="w-full flex justify-between font-mono text-[11.5px] term-muted"><span>context used by tool output</span><span>{meterLabel}</span></span>
          </Progress>
        </CardContent>
        <CardFooter className="border-t border-white/10 bg-transparent px-4 py-2.5 font-mono text-[12.5px]">{foot}</CardFooter>
      </Card>
    </div>
  );
}

export function SessionCompare() {
  const { done, playing, replay } = useReveal();
  const judged = SESSION.slice(0, done);
  const kept = judged.reduce((n, c) => n + c.kept, 0) + SESSION.slice(done).reduce((n, c) => n + c.tokens, 0);
  const saved = judged.reduce((n, c) => n + (c.tokens - c.kept), 0);
  const cut = judged.reduce((n, c) => n + c.cut, 0);
  const row = "flex items-baseline gap-2 whitespace-nowrap";
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 mx-auto max-w-[1000px] text-left" aria-label="The same session without and with jev-sift (illustrative)">
        <Terminal label="Without jev-sift" meter={100} meterLabel={`${fmtTok(TOTAL)} tks`}
          foot={<span className="term-muted">{fmtTok(TOTAL)} tokens entered context, and stay there every turn</span>}
          rows={SESSION.map((c) => (
            <li key={c.tool + c.what} className={row}>
              <span className="text-[#8FB4FF] w-[78px] shrink-0">{c.tool}</span>
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis">{c.what} <span className="term-muted">· {c.returned}</span></span>
              <span className="shrink-0 tabular-nums">{fmtTok(c.tokens)}</span>
            </li>
          ))} />
        <Terminal label="With jev-sift" accent meter={(kept / TOTAL) * 100} meterLabel={`${fmtTok(kept)} tks`}
          foot={<span className="text-primary">jev-sift on · {cut} cut · {fmtTok(saved)} tks saved</span>}
          rows={SESSION.map((c, i) => {
            const on = i < done;
            return (
              <li key={c.tool + c.what} className={row}>
                <span className="text-[#8FB4FF] w-[78px] shrink-0">{c.tool}</span>
                <span className="min-w-0 flex-1 overflow-hidden text-ellipsis">{c.what} <span className={`transition-colors duration-300 ${on ? (c.kept < c.tokens ? "text-primary" : "term-muted") : "term-muted"}`}>· {on ? c.note : c.returned}</span></span>
                <span className="shrink-0 tabular-nums">
                  {on && c.kept < c.tokens && <span className="term-muted line-through decoration-[#FF6B6B] mr-2">{fmtTok(c.tokens)}</span>}
                  <span className={on && c.kept < c.tokens ? "text-primary" : ""}>{fmtTok(on ? c.kept : c.tokens)}</span>
                </span>
              </li>
            );
          })} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <p className="m-0 text-[13px] text-muted-foreground">Illustrative session on a sample project. Sizes are typical for each kind of result.</p>
        <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-[12.5px]" onClick={replay} disabled={playing} aria-label="Replay the animation">
          <RotateCcw className={`size-3.5 ${playing ? "animate-spin [animation-direction:reverse]" : ""}`} /> Replay
        </Button>
      </div>
    </div>
  );
}
