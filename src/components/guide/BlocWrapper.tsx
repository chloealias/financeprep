import { ChevronRight } from 'lucide-react';

export function BlocWrapper ({ id, tag, titre, icon: Icon, openBloc, setOpenBloc, children }) {
  const isOpen = openBloc === id;
  return (
    <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpenBloc(isOpen ? null : id)}
        className="w-full text-left px-8 py-6 flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium mb-0.5">{tag}</div>
            <h3 className="text-xl font-serif text-blue-950">{titre}</h3>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-8 pb-8 pt-2 border-t border-blue-100">
          {children}
        </div>
      )}
    </div>
  );
};
