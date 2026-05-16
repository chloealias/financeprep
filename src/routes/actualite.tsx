import { createFileRoute } from '@tanstack/react-router';
import { BlocActualite } from '@/components/guide/BlocActualite';
import { GuidePageShell } from '@/components/GuidePageShell';
import { isValidDealId } from '@/data/ma-deals';

export const Route = createFileRoute('/actualite')({
  validateSearch: (search: Record<string, unknown>) => {
    const dealRaw = typeof search.deal === 'string' ? search.deal : undefined;
    const deal = dealRaw && isValidDealId(dealRaw) ? dealRaw : undefined;
    return { deal };
  },
  head: () => ({
    meta: [
      { title: 'Actualité M&A 2025-2026 — FinancePrep' },
      {
        name: 'description',
        content:
          '12 deals M&A détaillés (2025-2026) pour montrer votre intérêt réel en entretien finance.',
      },
    ],
  }),
  component: ActualitePage,
});

function ActualitePage () {
  return (
    <GuidePageShell
      tag="Preuve d'intérêt réel"
      title="Actualité M&A 2025-2026"
    >
      <BlocActualite />
    </GuidePageShell>
  );
}
