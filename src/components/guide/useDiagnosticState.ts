import { useState } from "react";
import {
  loadDiagnosticState,
  saveDiagnosticState,
  type DiagnosticState,
  type DiagnosticTechnicalStatus,
} from "@/lib/storage";

export function useDiagnosticState() {
  const [state, setState] = useState<DiagnosticState>(() =>
    typeof window !== "undefined" ? loadDiagnosticState() : { technical: {}, fit: {}, networking: {} },
  );

  const persist = (next: DiagnosticState) => {
    setState(next);
    saveDiagnosticState(next);
  };

  const setTechnical = (id: string, status: DiagnosticTechnicalStatus) => {
    persist({
      ...state,
      technical: { ...state.technical, [id]: status },
    });
  };

  const toggleFit = (id: string, value: boolean) => {
    const fit = { ...state.fit };
    if (value) fit[id] = true;
    else delete fit[id];
    persist({ ...state, fit });
  };

  const toggleNetworking = (id: string, value: boolean) => {
    const networking = { ...state.networking };
    if (value) networking[id] = true;
    else delete networking[id];
    persist({ ...state, networking });
  };

  return { state, setTechnical, toggleFit, toggleNetworking };
}
