import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { H2 } from "@/lib/site";

const QA: [string, string][] = [
  ["Does it change what a tool returned?", "No. An item is delivered exactly as the tool returned it, or not delivered. Before anything is judged, the plugin checks that putting every item back reproduces the original result byte for byte, and refuses to filter if it does not."],
  ["What does Jev see?", "The conversation so far, a description of the tool call, and the items the tool returned. It is sent to TypeSafe with your key."],
  ["How does it decide?", "One question per item with three options: show, show as a warning, or hide. Jev returns a probability for each. An item is hidden only when the hide probability clears the threshold. Errors and failures are always shown."],
  ["What does it cost?", "The plugin is free. Jev is billed by TypeSafe per input token with output free; a typical search costs a fraction of a cent to judge."],
  ["What if it hides something I needed?", "Run /jev-sift last to see what the most recent call cut, with each item's probability. Disable the plugin from /plugin to re-run anything unfiltered."],
  ["What if Jev is slow or unreachable?", "A search is judged in roughly a quarter to half a second. If the call errors or times out, the plugin fails open and the original result is delivered untouched."],
];

export function Questions() {
  return (
    <section id="questions" className="scroll-mt-24">
      <h2 className={H2}>Questions</h2>
      <Card className="mt-8 mx-auto max-w-[760px] px-6 py-2 rounded-2xl lift border-border/70">
        <Accordion>
          {QA.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-[16px] font-medium">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[15px] leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </section>
  );
}
