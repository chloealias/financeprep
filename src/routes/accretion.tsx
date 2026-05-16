import { createFileRoute } from '@tanstack/react-router';
import { BlocAccretion } from '@/components/guide/BlocAccretion';
import { GuidePageShell } from '@/components/GuidePageShell';

export const Route = createFileRoute('/accretion')({
  head: () => ({
    meta: [
      { title: 'Accretion / Dilution — FinancePrep' },
      {
        name: 'description',
        content:
          'Analyse d’accrétion/dilution EPS, simulateur P/E et règles clés pour les entretiens M&A.',
      },
    ],
  }),
  component: AccretionPage,
});

function AccretionPage () {
  return (
    <GuidePageShell
      tag="Éliminatoire en M&A"
      title="Accretion / Dilution analysis"
    >
      <BlocAccretion />
    </GuidePageShell>
  );
}
