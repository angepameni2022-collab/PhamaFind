/**
 * Format currency in FCFA using French locale format (e.g. "1 500 FCFA")
 * Uses a non-breaking space (\u00A0) so "FCFA" is NEVER placed on a line below the number.
 */
export function formatFCFA(amount: number): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return `${formatted}\u00A0FCFA`;
}
