/**
 * Feature flags for content/CTAs that are staged but not yet ready to publish.
 * Flip to true (and supply the referenced asset/data) when ready to go live.
 */
export const flags = {
  /** Daxar's capability statement PDF is still being finalized. */
  capabilityStatementAvailable: false,
  /** Path to the capability statement PDF once published (in /public). */
  capabilityStatementHref: "/documents/daxar-capability-statement.pdf",
} as const;
