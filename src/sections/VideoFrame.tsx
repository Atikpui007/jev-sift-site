import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H2, SUB, asset } from "@/lib/site";

/**
 * Demo video frame. The video is a fixed site asset: public/video/demo.mp4 (poster: public/video/poster.jpg).
 * There is deliberately no upload control. Until the file exists, a placeholder is shown in the same frame.
 */
export function VideoFrame() {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);
  return (
    <section id="demo" className="scroll-mt-24">
      <h2 className={H2}>Watch it work in a real session</h2>
      <p className={SUB}>A normal Claude Code task, with the status line counting what never reached the model.</p>
      <Card className="mt-9 mx-auto max-w-[920px] gap-0 rounded-[22px] p-2.5 lift border-border/70">
        <CardHeader className="flex flex-row items-center gap-1.5 px-2.5 pb-2.5 pt-1">
          <span className="size-2.5 rounded-full bg-[#FF6B6B]/80" /><span className="size-2.5 rounded-full bg-[#F5B82E]" /><span className="size-2.5 rounded-full bg-[#C6F35B]" />
          <span className="ml-2 text-[12.5px] text-muted-foreground">jev-sift demo</span>
        </CardHeader>
        <CardContent className="p-0">
        <AspectRatio ratio={16 / 9} className="term rounded-[14px] overflow-hidden relative">
          {!missing && (
            <video
              className={`absolute inset-0 size-full object-cover ${ready ? "opacity-100" : "opacity-0"}`}
              src={asset("video/demo.mp4")}
              poster={asset("video/poster.jpg")}
              controls playsInline preload="metadata"
              onLoadedMetadata={() => setReady(true)}
              onError={() => setMissing(true)}
            />
          )}
          {!ready && (
            <div className="absolute inset-0 grid place-items-center text-center px-6">
              <div>
                <div className="mx-auto mb-4 grid place-items-center size-16 rounded-full bg-white/10 border border-white/15">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#DDE1E7" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
                </div>
                <p className="m-0 text-[15px] text-[#DDE1E7]">Demo video coming soon</p>
                <p className="m-0 mt-1 font-mono text-[12px] term-muted">public/video/demo.mp4</p>
              </div>
            </div>
          )}
        </AspectRatio>
        </CardContent>
      </Card>
    </section>
  );
}
