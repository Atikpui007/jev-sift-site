import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { H2 } from "@/lib/site";

const FILTERED = [
  ["Grep, file mode", "each file path", "kept or removed whole"],
  ["Grep, content mode", "each match, with its context lines", "kept or removed whole"],
  ["Glob", "each file path", "kept or removed whole"],
  ["Read", "the whole file", "delivered, or withheld with a note"],
  ["Web search", "each result", "kept or removed whole"],
  ["Shell: rg, grep, find, ls, cat, curl", "each line printed", "kept or removed whole"],
  ["Tests, builds, git, edits", "not touched", "always delivered"],
];

export function Filtered() {
  return (
    <section>
      <h2 className={H2}>What gets filtered</h2>
      <Card className="mt-8 mx-auto max-w-[860px] min-w-0 py-0 overflow-hidden rounded-2xl lift border-border/70">
        <Table className="min-w-[560px]">
          <TableHeader><TableRow><TableHead className="pl-5">Tool</TableHead><TableHead>Each item is</TableHead><TableHead>Result</TableHead></TableRow></TableHeader>
          <TableBody>
            {FILTERED.map(([tool, item, result]) => (
              <TableRow key={tool}>
                <TableCell className="pl-5 font-medium whitespace-normal">{tool}</TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">{item}</TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">{result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
