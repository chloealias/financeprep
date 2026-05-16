import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { BlocCV } from '@/components/guide/BlocCV';
import { GuideSubLayout } from '@/components/GuideSubLayout';

export const Route = createFileRoute('/cv')({
  component: CVPage,
});

function CVPage() {
  const [openBloc, setOpenBloc] = useState<string | null>('cv');
  return (
    <GuideSubLayout>
      <BlocCV openBloc={openBloc} setOpenBloc={setOpenBloc} />
    </GuideSubLayout>
  );
}
