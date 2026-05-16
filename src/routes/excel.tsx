import { createFileRoute } from '@tanstack/react-router';
import { BlocExcel } from '@/components/guide/BlocExcel';
import { GuidePageShell } from '@/components/GuidePageShell';

export const Route = createFileRoute('/excel')({
  head: () => ({
    meta: [
      { title: 'Astuces Excel — FinancePrep' },
      {
        name: 'description',
        content:
          'Raccourcis, formules et bonnes pratiques Excel pour Transaction Services et Private Equity.',
      },
    ],
  }),
  component: ExcelPage,
});

function ExcelPage () {
  return (
    <GuidePageShell
      tag="Différenciant TS / PE"
      title="Astuces Excel essentielles"
    >
      <BlocExcel />
    </GuidePageShell>
  );
}
