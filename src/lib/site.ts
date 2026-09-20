// The GitHub owner (an organization) lives here and nowhere else. Override at build time with VITE_GH_USER.
export const GH_USER: string = import.meta.env.VITE_GH_USER ?? "bytelabs-oss";
export const REPO = `${GH_USER}/jev-sift`;
export const INSTALL = `claude plugin marketplace add ${REPO}\nclaude plugin install jev-sift@jev-sift`;
export const GITHUB = `https://github.com/${REPO}`;
export const TYPESAFE = "https://typesafe.ai";
export const WRAP = "mx-auto w-full max-w-[1040px] px-6";
export const H2 = "text-center text-[clamp(26px,3.4vw,36px)] leading-[1.1] tracking-[-0.03em] font-bold";
export const SUB = "text-center text-muted-foreground text-[17px] max-w-[580px] mx-auto mt-3";
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

/** Anthropic list prices, USD per million tokens (docs.claude.com/pricing, Sept 2026): 5-minute cache write, cache read. */
export const MODELS = [
  { id: "fable", name: "Fable 5.1", write: 12.5, read: 0.25 },
  { id: "opus", name: "Opus 5", write: 6.25, read: 0.5 },
  { id: "sonnet", name: "Sonnet 5", write: 2.5, read: 0.2 },
  { id: "haiku", name: "Haiku 4.5", write: 1.25, read: 0.1 },
] as const;
/** Jev list price, USD per million input tokens (output is free). */
export const JEV_PER_M = 0.042;
export const fmtTok = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M` : n >= 1000 ? `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1)}k` : `${Math.round(n)}`;
export const fmtUsd = (n: number) => (n >= 100 ? `$${Math.round(n).toLocaleString()}` : `$${n.toFixed(2)}`);
