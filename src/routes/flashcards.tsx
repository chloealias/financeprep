import { createFileRoute } from '@tanstack/react-router';
import { FlashcardSession } from '@/components/flashcards/FlashcardSession';

export const Route = createFileRoute('/flashcards')({
  head: () => ({
    meta: [
      { title: 'Flashcards — FinancePrep' },
      {
        name: 'description',
        content:
          'Révisez vos questions et notions de finance avec un algorithme de répétition espacée (SM-2). Sessions de 20 cartes.',
      },
    ],
  }),
  component: FlashcardsPage,
});

function FlashcardsPage () {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">
      <FlashcardSession />
    </div>
  );
}
