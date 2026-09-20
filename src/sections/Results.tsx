import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { H2, SUB } from "@/lib/site";

const RUNS = [
  ["Find where a design token is defined in a mid-sized monorepo", "23 of 62 cut", "2,791", "18,345", "same correct answer"],
  ["Research a topic across the web and summarise it", "3 of 19 cut", "6,201", "11,803", "same findings, 4 turns not 7"],
  ["Look up how one UI component is styled", "0 of 18 cut", "6,133", "7,387", "all relevant, so nothing cut"],
];

export function Results() {
  return (
    <section id="results" className="scroll-mt-24">
      <h2 className={H2}>Same prompt, two sessions</h2>
      <p className={SUB}>One with jev-sift, one without. Characters of tool output that reached the model, counted from each transcript.</p>
      <Card className="mt-8 mx-auto max-w-[920px] min-w-0 py-0 overflow-hidden rounded-2xl lift border-border/70">
        <Table className="min-w-[680px]">
          <TableHeader>
            <TableRow><TableHead className="pl-5">Prompt</TableHead><TableHead>Judged</TableHead><TableHead className="text-right">With</TableHead><TableHead className="text-right">Without</TableHead><TableHead>Answer</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {RUNS.map(([prompt, judged, a, b, answer]) => (
              <TableRow key={prompt}>
                <TableCell className="pl-5 font-medium whitespace-normal min-w-[200px]">{prompt}</TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">{judged}</TableCell>
                <TableCell className="text-right font-mono text-[13.5px] font-medium text-primary">{a}</TableCell>
                <TableCell className="text-right font-mono text-[13.5px] text-muted-foreground">{b}</TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">{answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <p className="text-center text-[13.5px] text-muted-foreground mt-4 max-w-[620px] mx-auto">Single runs. Part of each gap is the model taking a different path. Savings are largest when a search returns noise, and zero when it returns none.</p>
    </section>
  );
}
