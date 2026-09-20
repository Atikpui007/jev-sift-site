import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { H2, JEV_PER_M, MODELS, SUB, fmtTok, fmtUsd } from "@/lib/site";

const WORKDAYS = 22;
const WINDOW = 200_000;

function Control({ label, value, display, min, max, step, onChange }: { label: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[14.5px] text-muted-foreground">{label}</span>
        <span className="font-mono text-[15px] tabular-nums">{display}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} aria-label={label}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : (v as number))} />
    </div>
  );
}

export function Value() {
  const [model, setModel] = useState<string>("fable");
  const [saved, setSaved] = useState(40_000);
  const [sessions, setSessions] = useState(8);
  const [turns, setTurns] = useState(25);
  const m = MODELS.find((x) => x.id === model) ?? MODELS[0];

  // A token of tool output is written to the prompt cache once, then re-read on every later turn.
  const perSession = (saved * (m.write + m.read * turns)) / 1_000_000;
  const monthly = perSession * sessions * WORKDAYS;
  // Jev reads the tool output it judges (kept + cut) plus the conversation: about 2.5x the tokens it removes.
  const jevMonthly = ((saved * 2.5) * JEV_PER_M / 1_000_000) * sessions * WORKDAYS;
  const net = monthly - jevMonthly;
  const windowPct = Math.min(100, (saved / WINDOW) * 100);

  return (
    <section id="value" className="scroll-mt-24">
      <h2 className={H2}>Junk tokens are billed more than once</h2>
      <p className={SUB}>Anything a search drops into context is written to cache once, then read again on every turn that follows. Keep it out and you stop paying for it, turn after turn.</p>

      <Card className="mt-9 mx-auto max-w-[980px] gap-0 p-0 rounded-2xl lift overflow-hidden">
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <div className="p-6 sm:p-8 space-y-7">
            <div>
              <span className="block text-[14.5px] text-muted-foreground mb-3">Model</span>
              <Tabs value={model} onValueChange={(v) => setModel(String(v))}>
                <TabsList className="w-full grid grid-cols-4">
                  {MODELS.map((x) => <TabsTrigger key={x.id} value={x.id} className="text-[13px]">{x.name}</TabsTrigger>)}
                </TabsList>
              </Tabs>
            </div>
            <Control label="Tokens kept out of context, per session" value={saved} display={fmtTok(saved)} min={5_000} max={150_000} step={5_000} onChange={setSaved} />
            <Control label="Sessions per working day" value={sessions} display={`${sessions}`} min={1} max={30} step={1} onChange={setSessions} />
            <Control label="Turns that follow a typical search" value={turns} display={`${turns}`} min={5} max={60} step={5} onChange={setTurns} />
            <div className="rounded-xl bg-muted/60 border border-border px-4 py-3.5 font-mono text-[12.5px] leading-[1.9] text-muted-foreground">
              <div><span className="text-foreground">{fmtTok(saved)}</span> tokens of junk, per session</div>
              <div>× (<span className="text-foreground">${m.write}</span> to write it to cache once</div>
              <div>&nbsp;&nbsp;+ <span className="text-foreground">{turns}</span> turns × <span className="text-foreground">${m.read}</span> to re-read it) per MTok</div>
              <div>= <span className="text-primary">{fmtUsd(perSession)}</span> per session you no longer pay</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-muted/50 border-t md:border-t-0 md:border-l border-border flex flex-col">
            <span className="text-[14.5px] text-muted-foreground">Saved per month on {m.name}</span>
            <span className="mt-1 text-[clamp(44px,6vw,68px)] leading-none font-extrabold tracking-[-0.04em] text-primary tabular-nums">{fmtUsd(net)}</span>
            <span className="mt-2 text-[13.5px] text-muted-foreground">after Jev's own cost of {fmtUsd(jevMonthly)}</span>
            <Separator className="my-6" />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 m-0">
              <div><dt className="text-[13px] text-muted-foreground">Per session</dt><dd className="m-0 mt-0.5 text-[22px] font-bold tracking-[-0.02em] tabular-nums">{fmtUsd(perSession)}</dd></div>
              <div><dt className="text-[13px] text-muted-foreground">Per year</dt><dd className="m-0 mt-0.5 text-[22px] font-bold tracking-[-0.02em] tabular-nums">{fmtUsd(net * 12)}</dd></div>
              <div><dt className="text-[13px] text-muted-foreground">Context window kept free</dt><dd className="m-0 mt-0.5 text-[22px] font-bold tracking-[-0.02em] tabular-nums">{windowPct.toFixed(0)}%</dd></div>
              <div><dt className="text-[13px] text-muted-foreground">Tokens not re-read, per month</dt><dd className="m-0 mt-0.5 text-[22px] font-bold tracking-[-0.02em] tabular-nums">{fmtTok(saved * turns * sessions * WORKDAYS)}</dd></div>
            </dl>
            <p className="mt-auto pt-6 m-0 text-[12.5px] leading-relaxed text-muted-foreground">
              Estimate at Anthropic list prices: {m.name} cache write ${m.write}/MTok, cache read ${m.read}/MTok, {WORKDAYS} working days. Jev at ${JEV_PER_M}/MTok input, reading about 2.5x what it removes. On a subscription the dollars are not billed to you, but the same tokens count against your usage limits and fill your context window.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
