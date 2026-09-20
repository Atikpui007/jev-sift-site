// Illustrative session on an invented project ("acme-store"). Token counts are plausible sizes for
// each kind of result, not measurements. The point it shows is real: most of what searches and reads
// return is never used, and whole files are the largest part of it.
export type Call = { tool: string; what: string; returned: string; tokens: number; kept: number; note: string; cut: number };
export const SESSION: Call[] = [
  { tool: "Grep", what: '"refund"', returned: "212 matches", tokens: 8400, kept: 1600, note: "171 of 212 cut", cut: 171 },
  { tool: "Read", what: "CHANGELOG.md", returned: "whole file", tokens: 11200, kept: 0, note: "withheld", cut: 1 },
  { tool: "Glob", what: "**/*.ts", returned: "318 paths", tokens: 6100, kept: 500, note: "290 of 318 cut", cut: 290 },
  { tool: "WebSearch", what: '"stripe refund api"', returned: "10 results", tokens: 1900, kept: 1100, note: "4 of 10 cut", cut: 4 },
  { tool: "Read", what: "billing/refund-policy.ts", returned: "whole file", tokens: 2300, kept: 2300, note: "kept whole", cut: 0 },
  { tool: "Grep", what: '"window" -C3', returned: "96 matches", tokens: 14800, kept: 3900, note: "71 of 96 cut", cut: 71 },
  { tool: "Read", what: "docs/ONBOARDING.md", returned: "whole file", tokens: 7600, kept: 0, note: "withheld", cut: 1 },
  { tool: "Read", what: "config/billing.ts", returned: "whole file", tokens: 1400, kept: 1400, note: "kept whole", cut: 0 },
];
export const TOTAL = SESSION.reduce((n, c) => n + c.tokens, 0);
