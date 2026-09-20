import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INSTALL, REPO } from "@/lib/site";

function Line({ text }: { text: string }) {
  const [label, setLabel] = useState("Copy");
  async function copy() {
    try { await navigator.clipboard.writeText(text); setLabel("Copied"); } catch { setLabel("Select it"); }
    setTimeout(() => setLabel("Copy"), 1800);
  }
  return (
    <div className="flex items-stretch gap-2 rounded-xl bg-[#0B0D10] p-1.5 pl-4">
      <pre className="flex-1 min-w-0 m-0 py-2 text-left font-mono text-[13.5px] leading-relaxed text-[#E8EBEF] overflow-x-auto">{text}</pre>
      <Button onClick={copy} variant="secondary" className="self-center rounded-lg bg-[#C6F35B] text-[#0B0D10] hover:bg-[#D6FA78] border-0 font-semibold">{label}</Button>
    </div>
  );
}

export function InstallCard({ id }: { id?: string }) {
  return (
    <Card id={id} className="scroll-mt-24 mx-auto w-full max-w-[600px] gap-3 rounded-2xl install-card p-5 lift text-left border-0 ring-0">
      <CardContent className="p-0">
        <Tabs defaultValue="terminal">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <p className="m-0 text-[15.5px] font-semibold">Two commands. That is the whole install.</p>
            <TabsList className="!bg-black/10">
              <TabsTrigger value="terminal" className="!text-black/70 hover:!text-black data-active:!bg-[#0B0D10] data-active:!text-[#C6F35B] data-active:!border-transparent data-[state=active]:!bg-[#0B0D10] data-[state=active]:!text-[#C6F35B]">Terminal</TabsTrigger>
              <TabsTrigger value="inside" className="!text-black/70 hover:!text-black data-active:!bg-[#0B0D10] data-active:!text-[#C6F35B] data-active:!border-transparent data-[state=active]:!bg-[#0B0D10] data-[state=active]:!text-[#C6F35B]">In Claude Code</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="terminal"><Line text={INSTALL} /></TabsContent>
          <TabsContent value="inside"><Line text={`/plugin   →  add ${REPO}  →  install jev-sift`} /></TabsContent>
        </Tabs>
        <p className="m-0 mt-3 text-[13.5px] text-black/65">It asks for your TypeSafe key once and keeps it in your keychain.</p>
      </CardContent>
    </Card>
  );
}
