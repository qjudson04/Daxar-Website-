const MIN_FILL_TIME_MS = 2500;

/**
 * Rejects submissions that fill an invisible honeypot field, or that are
 * submitted implausibly fast for a human to have completed the form.
 */
export function isLikelySpam(honeypotValue: string | undefined, formRenderedAt: number): boolean {
  if (honeypotValue && honeypotValue.trim().length > 0) return true;
  if (!Number.isFinite(formRenderedAt)) return true;
  const elapsed = Date.now() - formRenderedAt;
  if (elapsed < MIN_FILL_TIME_MS) return true;
  return false;
}
