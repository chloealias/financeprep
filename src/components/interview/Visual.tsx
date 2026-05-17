import React from "react";

export function Visual({ type }: { type: string }) {
  const wrapper = "bg-white rounded-xl border-2 border-blue-200 p-5 my-4";
  const title =
    "text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold mb-4 flex items-center gap-2";
  const titleBar = <div className="h-px w-6 bg-blue-700" />;

  if (type === "dcf-bridge") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Schéma — Du DCF au prix par action</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <defs>
            <linearGradient id="dcfg1" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="dcfg2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                x={20 + i * 50}
                y={140 - (5 - i) * 8}
                width="35"
                height={100 + (5 - i) * 8}
                fill="url(#dcfg2)"
                opacity={0.6 + i * 0.08}
                rx="3"
              />
              <text x={37 + i * 50} y={260} fontSize="10" fill="#1e3a8a" textAnchor="middle">
                FCF{i + 1}
              </text>
            </g>
          ))}
          <text x="135" y="125" fontSize="10" fill="#475569" textAnchor="middle">
            FCF actualisés (5 ans)
          </text>
          <text x="135" y="275" fontSize="9" fill="#64748b" textAnchor="middle" fontStyle="italic">
            ~30-40% de l'EV
          </text>
          <text x="290" y="200" fontSize="24" fill="#1e3a8a" textAnchor="middle">
            +
          </text>
          <rect x="320" y="50" width="100" height="190" fill="url(#dcfg1)" rx="5" />
          <text x="370" y="155" fontSize="13" fill="white" fontWeight="bold" textAnchor="middle">
            Terminal
          </text>
          <text x="370" y="172" fontSize="13" fill="white" fontWeight="bold" textAnchor="middle">
            Value
          </text>
          <text x="370" y="265" fontSize="9" fill="#64748b" textAnchor="middle" fontStyle="italic">
            ~60-80% de l'EV
          </text>
          <text x="450" y="200" fontSize="20" fill="#1e3a8a" textAnchor="middle">
            =
          </text>
          <rect x="480" y="55" width="80" height="180" fill="#1e3a8a" rx="5" />
          <text x="520" y="150" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle">
            EV
          </text>
          <text x="590" y="155" fontSize="11" fill="#1e3a8a" textAnchor="middle">
            − Net Debt
          </text>
          <text x="590" y="170" fontSize="11" fill="#1e3a8a" textAnchor="middle">
            − Minoritaires
          </text>
          <text x="590" y="185" fontSize="11" fill="#1e3a8a" textAnchor="middle">
            + Associates
          </text>
          <text x="590" y="220" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            = Equity Value
          </text>
        </svg>
      </div>
    );
  }

  if (type === "ev-bridge") {
    const items = [
      { label: "Equity Value", value: 100, color: "#1e3a8a" },
      { label: "+ Dette nette", value: 30, color: "#3b82f6" },
      { label: "+ Minoritaires", value: 8, color: "#60a5fa" },
      { label: "+ Provisions retraites", value: 5, color: "#93c5fd" },
      { label: "− Associates", value: -7, color: "#f87171" },
      { label: "Enterprise Value", value: 136, color: "#312e81" },
    ];
    let cumul = 0;
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Pont Equity Value → Enterprise Value</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          {items.map((item, i) => {
            const x = 50 + i * 100;
            const yBase = 230;
            let height, y;
            const isStartOrEnd = i === 0 || i === items.length - 1;
            if (isStartOrEnd) {
              height = item.value * 1.5;
              y = yBase - height;
              cumul = item.value;
            } else {
              height = Math.abs(item.value) * 1.5;
              if (item.value > 0) {
                y = yBase - cumul * 1.5 - height;
                cumul += item.value;
              } else {
                y = yBase - cumul * 1.5;
                cumul += item.value;
              }
            }
            return (
              <g key={i}>
                <rect x={x} y={y} width="80" height={height} fill={item.color} rx="3" />
                <text
                  x={x + 40}
                  y={y - 8}
                  fontSize="11"
                  fill="#1e3a8a"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {item.value > 0 && !isStartOrEnd ? "+" : ""}
                  {item.value}
                </text>
                <text x={x + 40} y={250} fontSize="9" fill="#475569" textAnchor="middle">
                  {item.label.split(" ")[0]}
                </text>
                <text x={x + 40} y={262} fontSize="9" fill="#475569" textAnchor="middle">
                  {item.label.split(" ").slice(1).join(" ")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (type === "wacc-curve") {
    const points = [];
    for (let i = 0; i <= 100; i += 5) {
      const x = i / 100;
      const wacc = 12 - 6 * x + 10 * x * x;
      points.push([60 + i * 5.5, 250 - (wacc - 6) * 25]);
    }
    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>WACC en fonction du levier</span>
        </div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          <line x1="60" y1="280" x2="640" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="60" x2="60" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1="60"
              y1={60 + i * 44}
              x2="640"
              y2={60 + i * 44}
              stroke="#e2e8f0"
              strokeDasharray="2,2"
            />
          ))}
          <path d={pathD} fill="none" stroke="#1e3a8a" strokeWidth="3" />
          <circle cx="225" cy="220" r="6" fill="#dc2626" />
          <text x="240" y="218" fontSize="11" fill="#dc2626" fontWeight="bold">
            Optimum
          </text>
          <text x="240" y="232" fontSize="10" fill="#64748b">
            D/E ≈ 30-40%
          </text>
          <text x="350" y="305" fontSize="11" fill="#475569" textAnchor="middle">
            Levier (D/E)
          </text>
          <text
            x="25"
            y="170"
            fontSize="11"
            fill="#475569"
            textAnchor="middle"
            transform="rotate(-90, 25, 170)"
          >
            WACC
          </text>
          <text x="120" y="100" fontSize="10" fill="#475569" fontStyle="italic">
            Bouclier fiscal → WACC baisse
          </text>
          <text x="500" y="100" fontSize="10" fill="#475569" fontStyle="italic">
            Risque de défaut → WACC remonte
          </text>
        </svg>
      </div>
    );
  }

  if (type === "lbo-structure") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Structure type d'un LBO mid-cap</span>
        </div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          <text x="120" y="40" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            SOURCES (Financement)
          </text>
          <rect x="50" y="60" width="140" height="80" fill="#1e3a8a" rx="4" />
          <text x="120" y="95" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">
            Equity
          </text>
          <text x="120" y="113" fontSize="11" fill="#dbeafe" textAnchor="middle">
            40 M€ (40%)
          </text>
          <text x="120" y="128" fontSize="9" fill="#bfdbfe" textAnchor="middle">
            PE Fund + MEP
          </text>
          <rect x="50" y="150" width="140" height="60" fill="#3b82f6" rx="4" />
          <text x="120" y="178" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
            Senior Debt
          </text>
          <text x="120" y="195" fontSize="11" fill="#dbeafe" textAnchor="middle">
            45 M€ (45%)
          </text>
          <rect x="50" y="220" width="140" height="40" fill="#60a5fa" rx="4" />
          <text x="120" y="240" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            Mezzanine
          </text>
          <text x="120" y="254" fontSize="10" fill="#dbeafe" textAnchor="middle">
            15 M€ (15%)
          </text>
          <text x="120" y="285" fontSize="12" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            Total = 100 M€
          </text>
          <path d="M 220 160 L 280 160" stroke="#1e3a8a" strokeWidth="3" markerEnd="url(#lboarr)" />
          <defs>
            <marker
              id="lboarr"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a" />
            </marker>
          </defs>
          <text x="450" y="40" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            USES (Acquisition)
          </text>
          <rect
            x="320"
            y="60"
            width="260"
            height="200"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="2"
            rx="6"
            strokeDasharray="4,2"
          />
          <text x="450" y="120" fontSize="14" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            Acquisition de la cible
          </text>
          <text x="450" y="145" fontSize="11" fill="#475569" textAnchor="middle">
            EV = 8x EBITDA × 12,5 M€ = 100 M€
          </text>
          <text x="450" y="170" fontSize="11" fill="#475569" textAnchor="middle">
            + Frais de transaction
          </text>
          <text x="450" y="195" fontSize="11" fill="#475569" textAnchor="middle">
            + Refinancement dette existante
          </text>
          <text x="450" y="225" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            Levier = 60% (Dette / EV)
          </text>
        </svg>
      </div>
    );
  }

  if (type === "lbo-value-bridge") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Décomposition du TRI en LBO (Value Bridge)</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <rect x="50" y="180" width="80" height="60" fill="#94a3b8" rx="3" />
          <text x="90" y="215" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            Equity
          </text>
          <text x="90" y="230" fontSize="10" fill="white" textAnchor="middle">
            entrée
          </text>
          <text x="90" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">
            100
          </text>
          <rect x="170" y="120" width="80" height="60" fill="#1e3a8a" rx="3" />
          <text x="210" y="148" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            EBITDA
          </text>
          <text x="210" y="163" fontSize="10" fill="white" textAnchor="middle">
            growth
          </text>
          <text x="210" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">
            +50%
          </text>
          <rect x="290" y="80" width="80" height="40" fill="#3b82f6" rx="3" />
          <text x="330" y="100" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            Multiple
          </text>
          <text x="330" y="113" fontSize="10" fill="white" textAnchor="middle">
            expansion
          </text>
          <text x="330" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">
            +15%
          </text>
          <rect x="410" y="40" width="80" height="40" fill="#60a5fa" rx="3" />
          <text x="450" y="60" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            Deleve-
          </text>
          <text x="450" y="73" fontSize="11" fill="white" textAnchor="middle">
            raging
          </text>
          <text x="450" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">
            +35%
          </text>
          <rect x="540" y="40" width="100" height="200" fill="#1e3a8a" rx="3" />
          <text x="590" y="135" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">
            Equity
          </text>
          <text x="590" y="153" fontSize="13" fill="white" textAnchor="middle">
            exit
          </text>
          <text x="590" y="260" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            200 (2x MOIC)
          </text>
        </svg>
      </div>
    );
  }

  if (type === "football-field") {
    const methods = [
      { name: "DCF", low: 80, high: 130, color: "#1e3a8a" },
      { name: "Comparables boursiers", low: 95, high: 125, color: "#3b82f6" },
      { name: "Comparables transactions", low: 110, high: 145, color: "#60a5fa" },
      { name: "LBO", low: 75, high: 100, color: "#93c5fd" },
      { name: "ANR", low: 60, high: 85, color: "#bfdbfe" },
    ];
    const scale = (v: number) => 80 + ((v - 50) / 110) * 480;
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Football Field — fourchettes de valorisation (M€)</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          {[60, 80, 100, 120, 140, 160].map((v) => (
            <g key={v}>
              <line
                x1={scale(v)}
                y1="40"
                x2={scale(v)}
                y2="240"
                stroke="#e2e8f0"
                strokeDasharray="2,3"
              />
              <text x={scale(v)} y="260" fontSize="10" fill="#64748b" textAnchor="middle">
                {v}
              </text>
            </g>
          ))}
          {methods.map((m, i) => {
            const y = 50 + i * 38;
            return (
              <g key={i}>
                <text
                  x="70"
                  y={y + 18}
                  fontSize="11"
                  fill="#1e3a8a"
                  textAnchor="end"
                  fontWeight="500"
                >
                  {m.name}
                </text>
                <rect
                  x={scale(m.low)}
                  y={y}
                  width={scale(m.high) - scale(m.low)}
                  height="26"
                  fill={m.color}
                  rx="3"
                />
                <text x={scale(m.low) + 5} y={y + 17} fontSize="10" fill="white">
                  {m.low}
                </text>
                <text x={scale(m.high) - 5} y={y + 17} fontSize="10" fill="white" textAnchor="end">
                  {m.high}
                </text>
              </g>
            );
          })}
          <line
            x1={scale(110)}
            y1="40"
            x2={scale(110)}
            y2="240"
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="4,3"
          />
          <text
            x={scale(110)}
            y="35"
            fontSize="10"
            fill="#dc2626"
            textAnchor="middle"
            fontWeight="bold"
          >
            Médiane suggérée: 110
          </text>
        </svg>
      </div>
    );
  }

  if (type === "3-statements") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Liaison des 3 états financiers</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <rect x="40" y="40" width="160" height="120" fill="#1e3a8a" rx="6" />
          <text x="120" y="70" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            Compte de résultat
          </text>
          <text x="120" y="92" fontSize="11" fill="#dbeafe" textAnchor="middle">
            Revenue
          </text>
          <text x="120" y="108" fontSize="11" fill="#dbeafe" textAnchor="middle">
            − Charges
          </text>
          <text x="120" y="124" fontSize="11" fill="#dbeafe" textAnchor="middle">
            − D&A, Impôts
          </text>
          <text x="120" y="145" fontSize="12" fill="#fef3c7" textAnchor="middle" fontWeight="bold">
            = Net Income
          </text>
          <rect x="270" y="40" width="160" height="120" fill="#3b82f6" rx="6" />
          <text x="350" y="70" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            Bilan
          </text>
          <text x="350" y="95" fontSize="11" fill="#dbeafe" textAnchor="middle">
            ACTIF = PASSIF
          </text>
          <text x="350" y="115" fontSize="10" fill="#dbeafe" textAnchor="middle">
            Cash, BFR, Immo
          </text>
          <text x="350" y="130" fontSize="10" fill="#dbeafe" textAnchor="middle">
            Equity, Dette
          </text>
          <text x="350" y="150" fontSize="11" fill="#fef3c7" textAnchor="middle" fontStyle="italic">
            Photo à T
          </text>
          <rect x="500" y="40" width="160" height="120" fill="#60a5fa" rx="6" />
          <text x="580" y="70" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            Tableau de flux
          </text>
          <text x="580" y="95" fontSize="11" fill="#dbeafe" textAnchor="middle">
            CFO (opérationnel)
          </text>
          <text x="580" y="111" fontSize="11" fill="#dbeafe" textAnchor="middle">
            + CFI (invest.)
          </text>
          <text x="580" y="127" fontSize="11" fill="#dbeafe" textAnchor="middle">
            + CFF (financ.)
          </text>
          <text x="580" y="148" fontSize="12" fill="#fef3c7" textAnchor="middle" fontWeight="bold">
            = Δ Cash
          </text>
          <path
            d="M 200 100 L 270 100"
            stroke="#1e3a8a"
            strokeWidth="2.5"
            markerEnd="url(#arr3st)"
            fill="none"
          />
          <text x="235" y="92" fontSize="9" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            Net Income → Equity
          </text>
          <path
            d="M 430 100 L 500 100"
            stroke="#1e3a8a"
            strokeWidth="2.5"
            markerEnd="url(#arr3st)"
            fill="none"
          />
          <text x="465" y="92" fontSize="9" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            ΔBilan → Flux
          </text>
          <path
            d="M 580 160 Q 580 220 350 220 Q 120 220 120 160"
            stroke="#1e3a8a"
            strokeWidth="2.5"
            markerEnd="url(#arr3st)"
            fill="none"
            strokeDasharray="5,3"
          />
          <text
            x="350"
            y="240"
            fontSize="10"
            fill="#1e3a8a"
            textAnchor="middle"
            fontWeight="bold"
            fontStyle="italic"
          >
            Cash final → Bilan (boucle fermée)
          </text>
          <defs>
            <marker
              id="arr3st"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a" />
            </marker>
          </defs>
        </svg>
      </div>
    );
  }

  if (type === "synergies-jcurve") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Courbe en J des synergies M&A</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <line x1="60" y1="220" x2="640" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="640" y2="160" stroke="#cbd5e1" strokeDasharray="3,2" />
          <text x="55" y="163" fontSize="9" fill="#64748b" textAnchor="end">
            0
          </text>
          {[1, 2, 3, 4, 5].map((y) => (
            <text key={y} x={60 + y * 110} y="240" fontSize="10" fill="#64748b" textAnchor="middle">
              An {y}
            </text>
          ))}
          <path
            d="M 60 160 Q 130 215 200 200 Q 280 165 380 110 Q 480 65 580 50 L 640 50"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="3"
          />
          <path
            d="M 60 160 Q 130 215 200 200 Q 280 165 380 110 Q 480 65 580 50 L 640 50 L 640 160 L 60 160 Z"
            fill="url(#jgrad)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="jgrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="160" y="200" fontSize="10" fill="#dc2626" fontWeight="bold">
            Coûts d'intégration
          </text>
          <text x="450" y="80" fontSize="10" fill="#1e3a8a" fontWeight="bold">
            Synergies pleines
          </text>
          <text x="350" y="270" fontSize="10" fill="#475569" textAnchor="middle">
            Temps post-deal
          </text>
          <text
            x="25"
            y="130"
            fontSize="10"
            fill="#475569"
            textAnchor="middle"
            transform="rotate(-90, 25, 130)"
          >
            NPV cumulée
          </text>
        </svg>
      </div>
    );
  }

  if (type === "ma-process") {
    const phases = [
      { name: "Préparation", d: "M0-M2" },
      { name: "Marketing", d: "M2-M3" },
      { name: "1er tour", d: "M3-M4" },
      { name: "DD", d: "M4-M6" },
      { name: "2nd tour", d: "M6-M7" },
      { name: "Signing", d: "M7" },
      { name: "Closing", d: "M9-M12" },
    ];
    const colors = ["#1e3a8a", "#1e40af", "#3b82f6", "#60a5fa", "#3b82f6", "#1e40af", "#1e3a8a"];
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Timeline d'un process M&A sell-side</span>
        </div>
        <svg viewBox="0 0 700 200" className="w-full h-auto">
          <line x1="40" y1="100" x2="660" y2="100" stroke="#cbd5e1" strokeWidth="2" />
          {phases.map((p, i) => {
            const x = 50 + i * 92;
            return (
              <g key={i}>
                <circle cx={x} cy="100" r="14" fill={colors[i]} />
                <text
                  x={x}
                  y="105"
                  fontSize="11"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
                <text
                  x={x}
                  y="70"
                  fontSize="10"
                  fill="#1e3a8a"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {p.name}
                </text>
                <text x={x} y="135" fontSize="9" fill="#64748b" textAnchor="middle">
                  {p.d}
                </text>
              </g>
            );
          })}
          <text x="350" y="170" fontSize="10" fill="#475569" textAnchor="middle" fontStyle="italic">
            Durée typique : 6 à 12 mois
          </text>
        </svg>
      </div>
    );
  }

  if (type === "ccc-cycle") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Cycle de conversion du cash (CCC)</span>
        </div>
        <svg viewBox="0 0 700 240" className="w-full h-auto">
          <line x1="40" y1="120" x2="660" y2="120" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="60" y="105" width="180" height="30" fill="#10b981" rx="3" opacity="0.85" />
          <text x="150" y="125" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            DPO (60 j)
          </text>
          <text x="150" y="80" fontSize="10" fill="#065f46" textAnchor="middle" fontWeight="bold">
            Délais fournisseurs
          </text>
          <rect x="240" y="105" width="200" height="30" fill="#3b82f6" rx="3" opacity="0.85" />
          <text x="340" y="125" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            DIO (90 j)
          </text>
          <text x="340" y="80" fontSize="10" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            Stocks
          </text>
          <rect x="440" y="105" width="180" height="30" fill="#f97316" rx="3" opacity="0.85" />
          <text x="530" y="125" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">
            DSO (45 j)
          </text>
          <text x="530" y="80" fontSize="10" fill="#9a3412" textAnchor="middle" fontWeight="bold">
            Délais clients
          </text>
          <text x="350" y="210" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            CCC = DIO + DSO − DPO = 90 + 45 − 60 = 75 jours
          </text>
          <text x="350" y="228" fontSize="10" fill="#475569" textAnchor="middle" fontStyle="italic">
            Plus c'est faible (voire négatif), mieux c'est
          </text>
        </svg>
      </div>
    );
  }

  if (type === "exponential-growth") {
    const points = [];
    for (let i = 50; i <= 60; i += 0.5) {
      const value = Math.pow(2, i - 50);
      points.push([60 + (i - 50) * 58, 250 - Math.log(value + 1) * 35]);
    }
    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Croissance exponentielle — bocal aux bactéries</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <line x1="60" y1="250" x2="640" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
          <line
            x1="60"
            y1="155"
            x2="640"
            y2="155"
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <text x="640" y="150" fontSize="10" fill="#dc2626" textAnchor="end">
            50% du bocal
          </text>
          <path d={pathD} fill="none" stroke="#1e3a8a" strokeWidth="3" />
          <circle cx="582" cy="155" r="6" fill="#dc2626" />
          <text x="582" y="140" fontSize="11" fill="#dc2626" fontWeight="bold" textAnchor="middle">
            Minute 59
          </text>
          <circle cx="640" cy="58" r="6" fill="#1e3a8a" />
          <text x="615" y="55" fontSize="11" fill="#1e3a8a" fontWeight="bold" textAnchor="end">
            Minute 60: plein
          </text>
          {[50, 52, 54, 56, 58, 60].map((m) => (
            <text
              key={m}
              x={60 + (m - 50) * 58}
              y="270"
              fontSize="10"
              fill="#64748b"
              textAnchor="middle"
            >
              Min {m}
            </text>
          ))}
        </svg>
      </div>
    );
  }

  if (type === "clock-angle") {
    const cx = 350,
      cy = 130,
      r = 90;
    const hourEnd = [
      cx + r * 0.55 * Math.sin((7.5 * Math.PI) / 180),
      cy - r * 0.55 * Math.cos((7.5 * Math.PI) / 180),
    ];
    const minEnd = [cx, cy - r * 0.85];
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Angle des aiguilles à 15h15</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <circle cx={cx} cy={cy} r={r} fill="white" stroke="#1e3a8a" strokeWidth="3" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
            const angle = (h * 30 * Math.PI) / 180;
            const x1 = cx + (r - 8) * Math.sin(angle);
            const y1 = cy - (r - 8) * Math.cos(angle);
            const x2 = cx + r * Math.sin(angle);
            const y2 = cy - r * Math.cos(angle);
            const xt = cx + (r - 18) * Math.sin(angle);
            const yt = cy - (r - 18) * Math.cos(angle);
            return (
              <g key={h}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e3a8a" strokeWidth="2" />
                <text
                  x={xt}
                  y={yt + 4}
                  fontSize="11"
                  fill="#1e3a8a"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {h === 0 ? 12 : h}
                </text>
              </g>
            );
          })}
          <line
            x1={cx}
            y1={cy}
            x2={hourEnd[0]}
            y2={hourEnd[1]}
            stroke="#1e3a8a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1={cx}
            y1={cy}
            x2={minEnd[0]}
            y2={minEnd[1]}
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="5" fill="#1e3a8a" />
          <text x={cx + 60} y={cy + 5} fontSize="14" fill="#dc2626" fontWeight="bold">
            7,5°
          </text>
          <text x="500" y="80" fontSize="10" fill="#475569">
            À 15h15, aiguille heures à 97,5°
          </text>
          <text x="500" y="95" fontSize="10" fill="#475569">
            Aiguille minutes à 90°
          </text>
          <text x="500" y="125" fontSize="11" fill="#dc2626" fontWeight="bold">
            Différence = 7,5°
          </text>
          <text x="500" y="150" fontSize="10" fill="#475569" fontStyle="italic">
            Formule : |30H − 5,5M|
          </text>
        </svg>
      </div>
    );
  }

  if (type === "monty-hall") {
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Le paradoxe de Monty Hall</span>
        </div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <text x="350" y="25" fontSize="12" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            3 enveloppes : 1 OFFRE, 2 REFUS
          </text>
          <text x="115" y="55" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            Vous choisissez A
          </text>
          <rect
            x="60"
            y="65"
            width="50"
            height="65"
            fill="#3b82f6"
            rx="4"
            stroke="#1e3a8a"
            strokeWidth="2"
          />
          <text x="85" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            A
          </text>
          <text x="85" y="145" fontSize="10" fill="#1e3a8a" textAnchor="middle">
            1/3
          </text>
          <rect x="120" y="65" width="50" height="65" fill="#cbd5e1" rx="4" />
          <text x="145" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            B
          </text>
          <rect x="180" y="65" width="50" height="65" fill="#cbd5e1" rx="4" />
          <text x="205" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            C
          </text>
          <text x="175" y="155" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            P(B ou C) = 2/3
          </text>
          <text x="290" y="100" fontSize="20" fill="#1e3a8a">
            →
          </text>
          <text x="475" y="55" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">
            L'intervieweur élimine B
          </text>
          <rect
            x="420"
            y="65"
            width="50"
            height="65"
            fill="#3b82f6"
            rx="4"
            stroke="#1e3a8a"
            strokeWidth="2"
          />
          <text x="445" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            A
          </text>
          <text x="445" y="145" fontSize="10" fill="#1e3a8a" textAnchor="middle">
            1/3
          </text>
          <rect x="480" y="65" width="50" height="65" fill="#fee2e2" rx="4" stroke="#dc2626" />
          <line x1="490" y1="75" x2="520" y2="125" stroke="#dc2626" strokeWidth="3" />
          <line x1="520" y1="75" x2="490" y2="125" stroke="#dc2626" strokeWidth="3" />
          <rect
            x="540"
            y="65"
            width="50"
            height="65"
            fill="#10b981"
            rx="4"
            stroke="#065f46"
            strokeWidth="2"
          />
          <text x="565" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">
            C
          </text>
          <text x="565" y="145" fontSize="10" fill="#065f46" textAnchor="middle" fontWeight="bold">
            2/3
          </text>
          <text x="350" y="200" fontSize="13" fill="#dc2626" textAnchor="middle" fontWeight="bold">
            → CHANGER pour C double vos chances (1/3 → 2/3)
          </text>
        </svg>
      </div>
    );
  }

  if (type === "debt-stack") {
    const tranches = [
      { name: "RCF (Senior)", cost: "~3-4%", p: 1, color: "#1e3a8a" },
      { name: "Senior Term Loan A/B", cost: "~4-6%", p: 2, color: "#1e40af" },
      { name: "Unitranche", cost: "~6-8%", p: 3, color: "#3b82f6" },
      { name: "Mezzanine", cost: "~10-15%", p: 4, color: "#60a5fa" },
      { name: "PIK Notes", cost: "~12-16%", p: 5, color: "#93c5fd" },
      { name: "Equity", cost: "~20-25% (TRI)", p: 6, color: "#dc2626" },
    ];
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Pile de financement (Debt Stack) en LBO</span>
        </div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          {tranches.map((t, i) => {
            const y = 40 + i * 42;
            const width = 380 - i * 30;
            const x = 350 - width / 2;
            return (
              <g key={i}>
                <rect x={x} y={y} width={width} height="38" fill={t.color} rx="3" />
                <text
                  x="350"
                  y={y + 18}
                  fontSize="12"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {t.name}
                </text>
                <text x="350" y={y + 32} fontSize="10" fill="#dbeafe" textAnchor="middle">
                  Coût {t.cost}
                </text>
                <text
                  x="80"
                  y={y + 24}
                  fontSize="10"
                  fill="#1e3a8a"
                  textAnchor="start"
                  fontWeight="bold"
                >
                  Rang #{t.p}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (type === "beta-sectors") {
    const sectors = [
      { name: "Utilities (EDF)", beta: 0.6, color: "#10b981" },
      { name: "Consumer Staples", beta: 0.75, color: "#22c55e" },
      { name: "Pharma", beta: 0.85, color: "#3b82f6" },
      { name: "Énergie (Total)", beta: 1.0, color: "#1e40af" },
      { name: "Industrie", beta: 1.1, color: "#1e3a8a" },
      { name: "Tech (Samsung)", beta: 1.25, color: "#7c3aed" },
      { name: "Auto (Peugeot)", beta: 1.45, color: "#dc2626" },
      { name: "Banques", beta: 1.6, color: "#991b1b" },
    ];
    return (
      <div className={wrapper}>
        <div className={title}>
          {titleBar}
          <span>Beta typique par secteur</span>
        </div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          <line
            x1={410}
            y1="30"
            x2={410}
            y2="290"
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeDasharray="4,3"
          />
          <text x={410} y="20" fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="bold">
            β = 1 (marché)
          </text>
          {sectors.map((s, i) => {
            const y = 35 + i * 32;
            return (
              <g key={i}>
                <text x="240" y={y + 14} fontSize="11" fill="#1e3a8a" textAnchor="end">
                  {s.name}
                </text>
                <rect x="250" y={y} width={s.beta * 160} height="20" fill={s.color} rx="2" />
                <text
                  x={250 + s.beta * 160 + 10}
                  y={y + 14}
                  fontSize="11"
                  fill="#1e3a8a"
                  fontWeight="bold"
                >
                  {s.beta}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  return null;
}
// =====================================================
