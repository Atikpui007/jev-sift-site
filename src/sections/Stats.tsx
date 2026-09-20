import { Card } from "@/components/ui/card";

const STATS: [string, string][] = [
  ["80%", "of tool output cut in the sample session above, with both whole-file reads that mattered delivered intact"],
  ["~0.3 s", "to judge a whole search result, in a single call"],
  ["< $0.001", "is what Jev charges to judge a typical search"],
];

export function Stats() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 mx-auto max-w-[980px]">
      {STATS.map(([n, label]) => (
        <Card key={n} className="gap-2 px-6 py-6 rounded-2xl lift text-center">
          <p className="m-0 text-[34px] leading-none font-extrabold tracking-[-0.04em] text-primary">{n}</p>
          <p className="m-0 text-[14.5px] text-muted-foreground">{label}</p>
        </Card>
      ))}
    </div>
  );
}
