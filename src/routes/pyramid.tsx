import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { BlocPyramid } from '@/components/guide/BlocPyramid';
import { GuideSubLayout } from '@/components/GuideSubLayout';

export const Route = createFileRoute('/pyramid')({
  component: PyramidPage,
});

function PyramidPage() {
  const [openBloc, setOpenBloc] = useState<string | null>('pyramid');
  return (
    <GuideSubLayout>
      <BlocPyramid openBloc={openBloc} setOpenBloc={setOpenBloc} />
    </GuideSubLayout>
  );
}
