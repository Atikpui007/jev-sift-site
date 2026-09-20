import { Card } from "@/components/ui/card";
import { H2, SUB } from "@/lib/site";

const STEPS: [string, string][] = [
  ["Claude searches", "A grep, a file listing, a web search, or a file it decides to open."],
  ["The tool answers", "Forty paths, sixty matching lines, ten search hits, one whole file."],
  ["jev-sift judges each item", "Against your conversation, in one call to Jev: show, warn, or hide."],
  ["Claude reads what is left", "Every surviving item exactly as the tool returned it."],
];

export function Pipeline() {
  return (
    <section id="how" className="scroll-mt-24">
      <h2 className={H2}>It sits between the tool and the model</h2>
      <p className={SUB}>Nothing is rewritten or summarised. An item is delivered as the tool returned it, or not delivered. Errors are always delivered.</p>
      <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
        {STEPS.map(([title, body], i) => (
          <li key={title}>
            <Card className={`h-full gap-2 px-5 py-5 rounded-2xl lift border-border/70 ${i === 2 ? "install-card border-transparent" : ""}`}>
              <span className={`font-mono text-[12.5px] ${i === 2 ? "text-black/60" : "text-muted-foreground"}`}>Step {i + 1}</span>
              <h3 className="m-0 text-[17px] font-semibold tracking-[-0.01em]">{title}</h3>
              <p className={`m-0 text-[14.5px] ${i === 2 ? "text-black/75" : "text-muted-foreground"}`}>{body}</p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
