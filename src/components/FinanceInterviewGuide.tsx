// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight, BookOpen, TrendingUp, Calculator, Briefcase, Target, Filter, X, Brain, Star, ListChecks, Library, BarChart3, Award, RotateCcw, CheckCircle2 } from 'lucide-react';


// =====================================================
//  COMPOSANT VISUAL — graphiques et schémas SVG
// =====================================================
const Visual = ({ type }) => {
  const wrapper = "bg-white rounded-xl border-2 border-blue-200 p-5 my-4";
  const title = "text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold mb-4 flex items-center gap-2";
  const titleBar = <div className="h-px w-6 bg-blue-700" />;


  if (type === 'dcf-bridge') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Schéma — Du DCF au prix par action</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <defs>
            <linearGradient id="dcfg1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#1e40af" /><stop offset="100%" stopColor="#312e81" /></linearGradient>
            <linearGradient id="dcfg2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e40af" /></linearGradient>
          </defs>
          {[0,1,2,3,4].map(i => (<g key={i}><rect x={20+i*50} y={140-(5-i)*8} width="35" height={100+(5-i)*8} fill="url(#dcfg2)" opacity={0.6+i*0.08} rx="3" /><text x={37+i*50} y={260} fontSize="10" fill="#1e3a8a" textAnchor="middle">FCF{i+1}</text></g>))}
          <text x="135" y="125" fontSize="10" fill="#475569" textAnchor="middle">FCF actualisés (5 ans)</text>
          <text x="135" y="275" fontSize="9" fill="#64748b" textAnchor="middle" fontStyle="italic">~30-40% de l'EV</text>
          <text x="290" y="200" fontSize="24" fill="#1e3a8a" textAnchor="middle">+</text>
          <rect x="320" y="50" width="100" height="190" fill="url(#dcfg1)" rx="5" />
          <text x="370" y="155" fontSize="13" fill="white" fontWeight="bold" textAnchor="middle">Terminal</text>
          <text x="370" y="172" fontSize="13" fill="white" fontWeight="bold" textAnchor="middle">Value</text>
          <text x="370" y="265" fontSize="9" fill="#64748b" textAnchor="middle" fontStyle="italic">~60-80% de l'EV</text>
          <text x="450" y="200" fontSize="20" fill="#1e3a8a" textAnchor="middle">=</text>
          <rect x="480" y="55" width="80" height="180" fill="#1e3a8a" rx="5" />
          <text x="520" y="150" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle">EV</text>
          <text x="590" y="155" fontSize="11" fill="#1e3a8a" textAnchor="middle">− Net Debt</text>
          <text x="590" y="170" fontSize="11" fill="#1e3a8a" textAnchor="middle">− Minoritaires</text>
          <text x="590" y="185" fontSize="11" fill="#1e3a8a" textAnchor="middle">+ Associates</text>
          <text x="590" y="220" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">= Equity Value</text>
        </svg>
      </div>
    );
  }


  if (type === 'ev-bridge') {
    const items = [
      { label: 'Equity Value', value: 100, color: '#1e3a8a' },
      { label: '+ Dette nette', value: 30, color: '#3b82f6' },
      { label: '+ Minoritaires', value: 8, color: '#60a5fa' },
      { label: '+ Provisions retraites', value: 5, color: '#93c5fd' },
      { label: '− Associates', value: -7, color: '#f87171' },
      { label: 'Enterprise Value', value: 136, color: '#312e81' },
    ];
    let cumul = 0;
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Pont Equity Value → Enterprise Value</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          {items.map((item, i) => {
            const x = 50 + i * 100; const yBase = 230;
            let height, y; const isStartOrEnd = i === 0 || i === items.length - 1;
            if (isStartOrEnd) { height = item.value * 1.5; y = yBase - height; cumul = item.value; }
            else { height = Math.abs(item.value) * 1.5; if (item.value > 0) { y = yBase - cumul*1.5 - height; cumul += item.value; } else { y = yBase - cumul*1.5; cumul += item.value; } }
            return (<g key={i}><rect x={x} y={y} width="80" height={height} fill={item.color} rx="3" /><text x={x+40} y={y-8} fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">{item.value > 0 && !isStartOrEnd ? '+' : ''}{item.value}</text><text x={x+40} y={250} fontSize="9" fill="#475569" textAnchor="middle">{item.label.split(' ')[0]}</text><text x={x+40} y={262} fontSize="9" fill="#475569" textAnchor="middle">{item.label.split(' ').slice(1).join(' ')}</text></g>);
          })}
        </svg>
      </div>
    );
  }


  if (type === 'wacc-curve') {
    const points = [];
    for (let i = 0; i <= 100; i += 5) { const x = i / 100; const wacc = 12 - 6*x + 10*x*x; points.push([60 + i*5.5, 250 - (wacc-6)*25]); }
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>WACC en fonction du levier</span></div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          <line x1="60" y1="280" x2="640" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="60" x2="60" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
          {[0,1,2,3,4,5].map(i => <line key={i} x1="60" y1={60+i*44} x2="640" y2={60+i*44} stroke="#e2e8f0" strokeDasharray="2,2" />)}
          <path d={pathD} fill="none" stroke="#1e3a8a" strokeWidth="3" />
          <circle cx="225" cy="220" r="6" fill="#dc2626" />
          <text x="240" y="218" fontSize="11" fill="#dc2626" fontWeight="bold">Optimum</text>
          <text x="240" y="232" fontSize="10" fill="#64748b">D/E ≈ 30-40%</text>
          <text x="350" y="305" fontSize="11" fill="#475569" textAnchor="middle">Levier (D/E)</text>
          <text x="25" y="170" fontSize="11" fill="#475569" textAnchor="middle" transform="rotate(-90, 25, 170)">WACC</text>
          <text x="120" y="100" fontSize="10" fill="#475569" fontStyle="italic">Bouclier fiscal → WACC baisse</text>
          <text x="500" y="100" fontSize="10" fill="#475569" fontStyle="italic">Risque de défaut → WACC remonte</text>
        </svg>
      </div>
    );
  }


  if (type === 'lbo-structure') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Structure type d'un LBO mid-cap</span></div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          <text x="120" y="40" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">SOURCES (Financement)</text>
          <rect x="50" y="60" width="140" height="80" fill="#1e3a8a" rx="4" />
          <text x="120" y="95" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">Equity</text>
          <text x="120" y="113" fontSize="11" fill="#dbeafe" textAnchor="middle">40 M€ (40%)</text>
          <text x="120" y="128" fontSize="9" fill="#bfdbfe" textAnchor="middle">PE Fund + MEP</text>
          <rect x="50" y="150" width="140" height="60" fill="#3b82f6" rx="4" />
          <text x="120" y="178" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">Senior Debt</text>
          <text x="120" y="195" fontSize="11" fill="#dbeafe" textAnchor="middle">45 M€ (45%)</text>
          <rect x="50" y="220" width="140" height="40" fill="#60a5fa" rx="4" />
          <text x="120" y="240" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Mezzanine</text>
          <text x="120" y="254" fontSize="10" fill="#dbeafe" textAnchor="middle">15 M€ (15%)</text>
          <text x="120" y="285" fontSize="12" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">Total = 100 M€</text>
          <path d="M 220 160 L 280 160" stroke="#1e3a8a" strokeWidth="3" markerEnd="url(#lboarr)" />
          <defs><marker id="lboarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a" /></marker></defs>
          <text x="450" y="40" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">USES (Acquisition)</text>
          <rect x="320" y="60" width="260" height="200" fill="none" stroke="#1e3a8a" strokeWidth="2" rx="6" strokeDasharray="4,2" />
          <text x="450" y="120" fontSize="14" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">Acquisition de la cible</text>
          <text x="450" y="145" fontSize="11" fill="#475569" textAnchor="middle">EV = 8x EBITDA × 12,5 M€ = 100 M€</text>
          <text x="450" y="170" fontSize="11" fill="#475569" textAnchor="middle">+ Frais de transaction</text>
          <text x="450" y="195" fontSize="11" fill="#475569" textAnchor="middle">+ Refinancement dette existante</text>
          <text x="450" y="225" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">Levier = 60% (Dette / EV)</text>
        </svg>
      </div>
    );
  }


  if (type === 'lbo-value-bridge') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Décomposition du TRI en LBO (Value Bridge)</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <rect x="50" y="180" width="80" height="60" fill="#94a3b8" rx="3" />
          <text x="90" y="215" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Equity</text>
          <text x="90" y="230" fontSize="10" fill="white" textAnchor="middle">entrée</text>
          <text x="90" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">100</text>
          <rect x="170" y="120" width="80" height="60" fill="#1e3a8a" rx="3" />
          <text x="210" y="148" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">EBITDA</text>
          <text x="210" y="163" fontSize="10" fill="white" textAnchor="middle">growth</text>
          <text x="210" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">+50%</text>
          <rect x="290" y="80" width="80" height="40" fill="#3b82f6" rx="3" />
          <text x="330" y="100" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Multiple</text>
          <text x="330" y="113" fontSize="10" fill="white" textAnchor="middle">expansion</text>
          <text x="330" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">+15%</text>
          <rect x="410" y="40" width="80" height="40" fill="#60a5fa" rx="3" />
          <text x="450" y="60" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Deleve-</text>
          <text x="450" y="73" fontSize="11" fill="white" textAnchor="middle">raging</text>
          <text x="450" y="260" fontSize="10" fill="#475569" textAnchor="middle" fontWeight="bold">+35%</text>
          <rect x="540" y="40" width="100" height="200" fill="#1e3a8a" rx="3" />
          <text x="590" y="135" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">Equity</text>
          <text x="590" y="153" fontSize="13" fill="white" textAnchor="middle">exit</text>
          <text x="590" y="260" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">200 (2x MOIC)</text>
        </svg>
      </div>
    );
  }


  if (type === 'football-field') {
    const methods = [
      { name: 'DCF', low: 80, high: 130, color: '#1e3a8a' },
      { name: 'Comparables boursiers', low: 95, high: 125, color: '#3b82f6' },
      { name: 'Comparables transactions', low: 110, high: 145, color: '#60a5fa' },
      { name: 'LBO', low: 75, high: 100, color: '#93c5fd' },
      { name: 'ANR', low: 60, high: 85, color: '#bfdbfe' },
    ];
    const scale = (v) => 80 + ((v - 50) / 110) * 480;
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Football Field — fourchettes de valorisation (M€)</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          {[60,80,100,120,140,160].map(v => (<g key={v}><line x1={scale(v)} y1="40" x2={scale(v)} y2="240" stroke="#e2e8f0" strokeDasharray="2,3" /><text x={scale(v)} y="260" fontSize="10" fill="#64748b" textAnchor="middle">{v}</text></g>))}
          {methods.map((m, i) => { const y = 50 + i * 38; return (<g key={i}><text x="70" y={y+18} fontSize="11" fill="#1e3a8a" textAnchor="end" fontWeight="500">{m.name}</text><rect x={scale(m.low)} y={y} width={scale(m.high) - scale(m.low)} height="26" fill={m.color} rx="3" /><text x={scale(m.low)+5} y={y+17} fontSize="10" fill="white">{m.low}</text><text x={scale(m.high)-5} y={y+17} fontSize="10" fill="white" textAnchor="end">{m.high}</text></g>); })}
          <line x1={scale(110)} y1="40" x2={scale(110)} y2="240" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
          <text x={scale(110)} y="35" fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="bold">Médiane suggérée: 110</text>
        </svg>
      </div>
    );
  }


  if (type === '3-statements') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Liaison des 3 états financiers</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <rect x="40" y="40" width="160" height="120" fill="#1e3a8a" rx="6" />
          <text x="120" y="70" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">Compte de résultat</text>
          <text x="120" y="92" fontSize="11" fill="#dbeafe" textAnchor="middle">Revenue</text>
          <text x="120" y="108" fontSize="11" fill="#dbeafe" textAnchor="middle">− Charges</text>
          <text x="120" y="124" fontSize="11" fill="#dbeafe" textAnchor="middle">− D&A, Impôts</text>
          <text x="120" y="145" fontSize="12" fill="#fef3c7" textAnchor="middle" fontWeight="bold">= Net Income</text>
          <rect x="270" y="40" width="160" height="120" fill="#3b82f6" rx="6" />
          <text x="350" y="70" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">Bilan</text>
          <text x="350" y="95" fontSize="11" fill="#dbeafe" textAnchor="middle">ACTIF = PASSIF</text>
          <text x="350" y="115" fontSize="10" fill="#dbeafe" textAnchor="middle">Cash, BFR, Immo</text>
          <text x="350" y="130" fontSize="10" fill="#dbeafe" textAnchor="middle">Equity, Dette</text>
          <text x="350" y="150" fontSize="11" fill="#fef3c7" textAnchor="middle" fontStyle="italic">Photo à T</text>
          <rect x="500" y="40" width="160" height="120" fill="#60a5fa" rx="6" />
          <text x="580" y="70" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">Tableau de flux</text>
          <text x="580" y="95" fontSize="11" fill="#dbeafe" textAnchor="middle">CFO (opérationnel)</text>
          <text x="580" y="111" fontSize="11" fill="#dbeafe" textAnchor="middle">+ CFI (invest.)</text>
          <text x="580" y="127" fontSize="11" fill="#dbeafe" textAnchor="middle">+ CFF (financ.)</text>
          <text x="580" y="148" fontSize="12" fill="#fef3c7" textAnchor="middle" fontWeight="bold">= Δ Cash</text>
          <path d="M 200 100 L 270 100" stroke="#1e3a8a" strokeWidth="2.5" markerEnd="url(#arr3st)" fill="none" />
          <text x="235" y="92" fontSize="9" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">Net Income → Equity</text>
          <path d="M 430 100 L 500 100" stroke="#1e3a8a" strokeWidth="2.5" markerEnd="url(#arr3st)" fill="none" />
          <text x="465" y="92" fontSize="9" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">ΔBilan → Flux</text>
          <path d="M 580 160 Q 580 220 350 220 Q 120 220 120 160" stroke="#1e3a8a" strokeWidth="2.5" markerEnd="url(#arr3st)" fill="none" strokeDasharray="5,3" />
          <text x="350" y="240" fontSize="10" fill="#1e3a8a" textAnchor="middle" fontWeight="bold" fontStyle="italic">Cash final → Bilan (boucle fermée)</text>
          <defs><marker id="arr3st" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#1e3a8a" /></marker></defs>
        </svg>
      </div>
    );
  }


  if (type === 'synergies-jcurve') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Courbe en J des synergies M&A</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <line x1="60" y1="220" x2="640" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="160" x2="640" y2="160" stroke="#cbd5e1" strokeDasharray="3,2" />
          <text x="55" y="163" fontSize="9" fill="#64748b" textAnchor="end">0</text>
          {[1,2,3,4,5].map(y => <text key={y} x={60+y*110} y="240" fontSize="10" fill="#64748b" textAnchor="middle">An {y}</text>)}
          <path d="M 60 160 Q 130 215 200 200 Q 280 165 380 110 Q 480 65 580 50 L 640 50" fill="none" stroke="#1e3a8a" strokeWidth="3" />
          <path d="M 60 160 Q 130 215 200 200 Q 280 165 380 110 Q 480 65 580 50 L 640 50 L 640 160 L 60 160 Z" fill="url(#jgrad)" opacity="0.3" />
          <defs><linearGradient id="jgrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#1e3a8a" /><stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" /></linearGradient></defs>
          <text x="160" y="200" fontSize="10" fill="#dc2626" fontWeight="bold">Coûts d'intégration</text>
          <text x="450" y="80" fontSize="10" fill="#1e3a8a" fontWeight="bold">Synergies pleines</text>
          <text x="350" y="270" fontSize="10" fill="#475569" textAnchor="middle">Temps post-deal</text>
          <text x="25" y="130" fontSize="10" fill="#475569" textAnchor="middle" transform="rotate(-90, 25, 130)">NPV cumulée</text>
        </svg>
      </div>
    );
  }


  if (type === 'ma-process') {
    const phases = [{ name: 'Préparation', d: 'M0-M2' },{ name: 'Marketing', d: 'M2-M3' },{ name: '1er tour', d: 'M3-M4' },{ name: 'DD', d: 'M4-M6' },{ name: '2nd tour', d: 'M6-M7' },{ name: 'Signing', d: 'M7' },{ name: 'Closing', d: 'M9-M12' }];
    const colors = ['#1e3a8a','#1e40af','#3b82f6','#60a5fa','#3b82f6','#1e40af','#1e3a8a'];
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Timeline d'un process M&A sell-side</span></div>
        <svg viewBox="0 0 700 200" className="w-full h-auto">
          <line x1="40" y1="100" x2="660" y2="100" stroke="#cbd5e1" strokeWidth="2" />
          {phases.map((p, i) => { const x = 50 + i * 92; return (<g key={i}><circle cx={x} cy="100" r="14" fill={colors[i]} /><text x={x} y="105" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">{i+1}</text><text x={x} y="70" fontSize="10" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">{p.name}</text><text x={x} y="135" fontSize="9" fill="#64748b" textAnchor="middle">{p.d}</text></g>); })}
          <text x="350" y="170" fontSize="10" fill="#475569" textAnchor="middle" fontStyle="italic">Durée typique : 6 à 12 mois</text>
        </svg>
      </div>
    );
  }


  if (type === 'ccc-cycle') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Cycle de conversion du cash (CCC)</span></div>
        <svg viewBox="0 0 700 240" className="w-full h-auto">
          <line x1="40" y1="120" x2="660" y2="120" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="60" y="105" width="180" height="30" fill="#10b981" rx="3" opacity="0.85" />
          <text x="150" y="125" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">DPO (60 j)</text>
          <text x="150" y="80" fontSize="10" fill="#065f46" textAnchor="middle" fontWeight="bold">Délais fournisseurs</text>
          <rect x="240" y="105" width="200" height="30" fill="#3b82f6" rx="3" opacity="0.85" />
          <text x="340" y="125" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">DIO (90 j)</text>
          <text x="340" y="80" fontSize="10" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">Stocks</text>
          <rect x="440" y="105" width="180" height="30" fill="#f97316" rx="3" opacity="0.85" />
          <text x="530" y="125" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">DSO (45 j)</text>
          <text x="530" y="80" fontSize="10" fill="#9a3412" textAnchor="middle" fontWeight="bold">Délais clients</text>
          <text x="350" y="210" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">CCC = DIO + DSO − DPO = 90 + 45 − 60 = 75 jours</text>
          <text x="350" y="228" fontSize="10" fill="#475569" textAnchor="middle" fontStyle="italic">Plus c'est faible (voire négatif), mieux c'est</text>
        </svg>
      </div>
    );
  }


  if (type === 'exponential-growth') {
    const points = [];
    for (let i = 50; i <= 60; i += 0.5) { const value = Math.pow(2, i-50); points.push([60+(i-50)*58, 250-Math.log(value+1)*35]); }
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Croissance exponentielle — bocal aux bactéries</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <line x1="60" y1="250" x2="640" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="40" x2="60" y2="250" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="155" x2="640" y2="155" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="640" y="150" fontSize="10" fill="#dc2626" textAnchor="end">50% du bocal</text>
          <path d={pathD} fill="none" stroke="#1e3a8a" strokeWidth="3" />
          <circle cx="582" cy="155" r="6" fill="#dc2626" />
          <text x="582" y="140" fontSize="11" fill="#dc2626" fontWeight="bold" textAnchor="middle">Minute 59</text>
          <circle cx="640" cy="58" r="6" fill="#1e3a8a" />
          <text x="615" y="55" fontSize="11" fill="#1e3a8a" fontWeight="bold" textAnchor="end">Minute 60: plein</text>
          {[50,52,54,56,58,60].map(m => <text key={m} x={60+(m-50)*58} y="270" fontSize="10" fill="#64748b" textAnchor="middle">Min {m}</text>)}
        </svg>
      </div>
    );
  }


  if (type === 'clock-angle') {
    const cx = 350, cy = 130, r = 90;
    const hourEnd = [cx + r*0.55*Math.sin(7.5*Math.PI/180), cy - r*0.55*Math.cos(7.5*Math.PI/180)];
    const minEnd = [cx, cy - r*0.85];
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Angle des aiguilles à 15h15</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <circle cx={cx} cy={cy} r={r} fill="white" stroke="#1e3a8a" strokeWidth="3" />
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(h => { const angle = h*30*Math.PI/180; const x1 = cx + (r-8)*Math.sin(angle); const y1 = cy - (r-8)*Math.cos(angle); const x2 = cx + r*Math.sin(angle); const y2 = cy - r*Math.cos(angle); const xt = cx + (r-18)*Math.sin(angle); const yt = cy - (r-18)*Math.cos(angle); return (<g key={h}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e3a8a" strokeWidth="2" /><text x={xt} y={yt+4} fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">{h === 0 ? 12 : h}</text></g>); })}
          <line x1={cx} y1={cy} x2={hourEnd[0]} y2={hourEnd[1]} stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={minEnd[0]} y2={minEnd[1]} stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="5" fill="#1e3a8a" />
          <text x={cx+60} y={cy+5} fontSize="14" fill="#dc2626" fontWeight="bold">7,5°</text>
          <text x="500" y="80" fontSize="10" fill="#475569">À 15h15, aiguille heures à 97,5°</text>
          <text x="500" y="95" fontSize="10" fill="#475569">Aiguille minutes à 90°</text>
          <text x="500" y="125" fontSize="11" fill="#dc2626" fontWeight="bold">Différence = 7,5°</text>
          <text x="500" y="150" fontSize="10" fill="#475569" fontStyle="italic">Formule : |30H − 5,5M|</text>
        </svg>
      </div>
    );
  }


  if (type === 'monty-hall') {
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Le paradoxe de Monty Hall</span></div>
        <svg viewBox="0 0 700 280" className="w-full h-auto">
          <text x="350" y="25" fontSize="12" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">3 enveloppes : 1 OFFRE, 2 REFUS</text>
          <text x="115" y="55" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">Vous choisissez A</text>
          <rect x="60" y="65" width="50" height="65" fill="#3b82f6" rx="4" stroke="#1e3a8a" strokeWidth="2" />
          <text x="85" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">A</text>
          <text x="85" y="145" fontSize="10" fill="#1e3a8a" textAnchor="middle">1/3</text>
          <rect x="120" y="65" width="50" height="65" fill="#cbd5e1" rx="4" />
          <text x="145" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">B</text>
          <rect x="180" y="65" width="50" height="65" fill="#cbd5e1" rx="4" />
          <text x="205" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">C</text>
          <text x="175" y="155" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">P(B ou C) = 2/3</text>
          <text x="290" y="100" fontSize="20" fill="#1e3a8a">→</text>
          <text x="475" y="55" fontSize="11" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">L'intervieweur élimine B</text>
          <rect x="420" y="65" width="50" height="65" fill="#3b82f6" rx="4" stroke="#1e3a8a" strokeWidth="2" />
          <text x="445" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">A</text>
          <text x="445" y="145" fontSize="10" fill="#1e3a8a" textAnchor="middle">1/3</text>
          <rect x="480" y="65" width="50" height="65" fill="#fee2e2" rx="4" stroke="#dc2626" />
          <line x1="490" y1="75" x2="520" y2="125" stroke="#dc2626" strokeWidth="3" />
          <line x1="520" y1="75" x2="490" y2="125" stroke="#dc2626" strokeWidth="3" />
          <rect x="540" y="65" width="50" height="65" fill="#10b981" rx="4" stroke="#065f46" strokeWidth="2" />
          <text x="565" y="105" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">C</text>
          <text x="565" y="145" fontSize="10" fill="#065f46" textAnchor="middle" fontWeight="bold">2/3</text>
          <text x="350" y="200" fontSize="13" fill="#dc2626" textAnchor="middle" fontWeight="bold">→ CHANGER pour C double vos chances (1/3 → 2/3)</text>
        </svg>
      </div>
    );
  }


  if (type === 'debt-stack') {
    const tranches = [
      { name: 'RCF (Senior)', cost: '~3-4%', p: 1, color: '#1e3a8a' },
      { name: 'Senior Term Loan A/B', cost: '~4-6%', p: 2, color: '#1e40af' },
      { name: 'Unitranche', cost: '~6-8%', p: 3, color: '#3b82f6' },
      { name: 'Mezzanine', cost: '~10-15%', p: 4, color: '#60a5fa' },
      { name: 'PIK Notes', cost: '~12-16%', p: 5, color: '#93c5fd' },
      { name: 'Equity', cost: '~20-25% (TRI)', p: 6, color: '#dc2626' },
    ];
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Pile de financement (Debt Stack) en LBO</span></div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          {tranches.map((t, i) => { const y = 40 + i * 42; const width = 380 - i * 30; const x = 350 - width / 2; return (<g key={i}><rect x={x} y={y} width={width} height="38" fill={t.color} rx="3" /><text x="350" y={y+18} fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">{t.name}</text><text x="350" y={y+32} fontSize="10" fill="#dbeafe" textAnchor="middle">Coût {t.cost}</text><text x="80" y={y+24} fontSize="10" fill="#1e3a8a" textAnchor="start" fontWeight="bold">Rang #{t.p}</text></g>); })}
        </svg>
      </div>
    );
  }


  if (type === 'beta-sectors') {
    const sectors = [
      { name: 'Utilities (EDF)', beta: 0.6, color: '#10b981' },
      { name: 'Consumer Staples', beta: 0.75, color: '#22c55e' },
      { name: 'Pharma', beta: 0.85, color: '#3b82f6' },
      { name: 'Énergie (Total)', beta: 1.0, color: '#1e40af' },
      { name: 'Industrie', beta: 1.1, color: '#1e3a8a' },
      { name: 'Tech (Samsung)', beta: 1.25, color: '#7c3aed' },
      { name: 'Auto (Peugeot)', beta: 1.45, color: '#dc2626' },
      { name: 'Banques', beta: 1.6, color: '#991b1b' },
    ];
    return (
      <div className={wrapper}>
        <div className={title}>{titleBar}<span>Beta typique par secteur</span></div>
        <svg viewBox="0 0 700 320" className="w-full h-auto">
          <line x1={410} y1="30" x2={410} y2="290" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x={410} y="20" fontSize="10" fill="#dc2626" textAnchor="middle" fontWeight="bold">β = 1 (marché)</text>
          {sectors.map((s, i) => { const y = 35 + i*32; return (<g key={i}><text x="240" y={y+14} fontSize="11" fill="#1e3a8a" textAnchor="end">{s.name}</text><rect x="250" y={y} width={s.beta*160} height="20" fill={s.color} rx="2" /><text x={250+s.beta*160+10} y={y+14} fontSize="11" fill="#1e3a8a" fontWeight="bold">{s.beta}</text></g>); })}
        </svg>
      </div>
    );
  }


  return null;
};
// =====================================================
//  CONCEPTS — Fiches pédagogiques
// =====================================================
const concepts = [
  {
    id: 'c1',
    category: 'valuation',
    title: 'Enterprise Value vs Equity Value',
    simple: "L'Enterprise Value (EV) représente la valeur totale de l'entreprise vue par tous les financeurs (actionnaires + créanciers). L'Equity Value (EqV) ne concerne que les actionnaires. La différence : la dette nette.",
    formula: "EV = Equity Value + Dette nette + Minoritaires + Provisions retraites − Associates",
    deepDive: "L'EV mesure la valeur OPÉRATIONNELLE de l'entreprise, indépendante de sa structure financière. C'est pourquoi on l'utilise pour comparer des entreprises avec des niveaux d'endettement différents (multiples EV/EBITDA). L'Equity Value en revanche dépend du levier : plus l'entreprise est endettée, plus l'Equity Value est petit (à EV constant). Le pont EV/EqV est central en M&A : oublier les minoritaires ou les provisions retraites est éliminatoire.",
    table: {
      headers: ["Élément", "Logique", "Impact"],
      rows: [
        ["Dette financière", "Sera repayée par l'acheteur", "+ EV"],
        ["Cash", "Récupéré par l'acheteur", "− EV"],
        ["Intérêts minoritaires", "Quote-part non détenue", "+ EV"],
        ["Provisions retraites", "Engagement futur", "+ EV"],
        ["Associates (20-50%)", "Participation non consolidée", "− EV"],
        ["Leasing IFRS 16", "Dette opérationnelle", "+ EV (débattu)"],
      ]
    },
    visual: 'ev-bridge',
    pitfalls: [
      "Oublier les minoritaires dans le pont (erreur classique)",
      "Ne pas distinguer cash 'excess' du cash opérationnel minimum",
      "Confondre dette brute et dette nette",
      "Ignorer les engagements hors bilan (retraites, garanties)"
    ]
  },
  {
    id: 'c2',
    category: 'dcf',
    title: 'Le DCF (Discounted Cash Flow)',
    simple: "Le DCF estime la valeur d'une entreprise en actualisant ses flux de trésorerie futurs. La logique : un euro demain vaut moins qu'un euro aujourd'hui à cause du risque et du coût du capital.",
    formula: "EV = Σ (FCFFₜ / (1+WACC)ᵗ) + Valeur Terminale / (1+WACC)ⁿ",
    deepDive: "Le DCF se construit en 6 étapes : (1) projeter les Free Cash Flows to Firm sur 5-10 ans, (2) calculer le WACC, (3) actualiser chaque FCF, (4) calculer la valeur terminale (Gordon-Shapiro ou multiple de sortie), (5) sommer le tout pour obtenir l'EV, (6) faire le pont vers l'Equity Value. Attention : la valeur terminale représente souvent 60-80% de la valeur totale, ce qui rend le DCF très sensible aux hypothèses (taux de croissance perpétuelle g, WACC).",
    table: {
      headers: ["Composant", "Formule", "Ordre de grandeur"],
      rows: [
        ["FCFF", "EBIT × (1−t) + D&A − CAPEX − ΔBFR", "Selon business"],
        ["WACC", "(E/V)×Ke + (D/V)×Kd×(1−t)", "6-12% en mid-cap"],
        ["Valeur terminale (Gordon)", "FCF × (1+g) / (WACC−g)", "60-80% de l'EV"],
        ["g (croissance perpétuelle)", "Croissance long terme", "1,5-3% (≤ inflation+1pt)"],
        ["Horizon explicite", "Période de projection", "5-10 ans"],
      ]
    },
    visual: 'dcf-bridge',
    pitfalls: [
      "g supérieur à la croissance économique long terme (irréaliste)",
      "Oublier la croissance du BFR avec le CA",
      "Sous-estimer le CAPEX de maintenance",
      "Mélanger FCFF avec Ke (devrait être WACC)",
      "Ne pas faire de sensibilités sur WACC/g"
    ]
  },
  {
    id: 'c3',
    category: 'dcf',
    title: 'Le WACC (Coût Moyen Pondéré du Capital)',
    simple: "Le WACC est le taux de rendement minimal exigé par l'ensemble des financeurs (actionnaires + créanciers). C'est le taux d'actualisation utilisé dans le DCF pour les Free Cash Flows to Firm.",
    formula: "WACC = (E/V) × Ke + (D/V) × Kd × (1−t)",
    deepDive: "Le coût des fonds propres (Ke) se calcule via le CAPM : Ke = Rf + β × (Rm − Rf). Le beta des comparables est délévéré pour neutraliser leur structure financière, puis relévéré avec la structure cible. Le coût de la dette (Kd) est le rendement actuel des obligations ou le spread de crédit. Le facteur (1−t) traduit le bouclier fiscal : les intérêts sont déductibles. Important : on utilise des pondérations en valeur de MARCHÉ, pas comptables.",
    table: {
      headers: ["Composant", "Source", "Niveau typique (2026)"],
      rows: [
        ["Rf (taux sans risque)", "OAT 10 ans", "~3,0%"],
        ["ERP (prime de risque)", "Damodaran, Fernandez", "5-7%"],
        ["β unlevered", "Comparables délévérés", "0,6 à 1,5"],
        ["Ke (CAPM)", "Rf + β × ERP", "8-14%"],
        ["Kd avant impôt", "Spread + Rf", "4-7% (IG), 7-12% (HY)"],
        ["WACC final", "Pondération E/V, D/V", "6-12% en mid-cap"],
      ]
    },
    visual: 'wacc-curve',
    pitfalls: [
      "Utiliser des pondérations comptables (devrait être marché)",
      "Prendre le beta levered sans délévérer",
      "Oublier le tax shield sur la dette",
      "Utiliser un WACC trop bas pour des cibles risquées (startups)",
      "Ne pas adapter aux pays émergents (country risk premium)"
    ]
  },
  {
    id: 'c4',
    category: 'accounting',
    title: 'Les 3 états financiers et leur liaison',
    simple: "Toute analyse financière repose sur 3 documents : le compte de résultat (performance sur une période), le bilan (photo à un instant), et le tableau des flux (mouvement de cash sur une période). Les 3 sont liés et se bouclent.",
    formula: "Net Income (P&L) → Equity (Bilan) | Δ Bilan → Flux | Cash final (CFS) → Cash (Bilan)",
    deepDive: "Liaison 1 : le résultat net du P&L augmente les réserves au passif du bilan. Liaison 2 : le résultat net est le point de départ du tableau de flux (méthode indirecte). Liaison 3 : les variations des postes du bilan (BFR, immo, dette, equity) alimentent les sections CFO, CFI et CFF du tableau de flux. Liaison 4 : la variation de cash totale (CFO + CFI + CFF) explique la variation du poste 'Trésorerie' au bilan. Si tout boucle, le modèle est cohérent.",
    table: {
      headers: ["Action", "Impact P&L", "Impact Bilan", "Impact Flux"],
      rows: [
        ["CAPEX 100€", "−20€ D&A (an1)", "Immo +100, Cash −100", "CFI −100"],
        ["Augmentation BFR 50€", "Aucun direct", "BFR +50, Cash −50", "CFO −50"],
        ["Emprunt 200€", "−10€ intérêts (an1)", "Cash +200, Dette +200", "CFF +200"],
        ["Dividendes 30€", "Aucun (sortie equity)", "Cash −30, Equity −30", "CFF −30"],
        ["Provision 40€", "Charge −40€", "Provision +40, Equity −30", "CFO non-cash (+40)"],
      ]
    },
    visual: '3-statements',
    pitfalls: [
      "Oublier que les amortissements sont non-cash (retraités en CFO)",
      "Mélanger BFR et investissements (deux flux distincts)",
      "Ne pas balancer le bilan (somme actif ≠ passif)",
      "Confondre Net Income et CFO"
    ]
  },
  {
    id: 'c5',
    category: 'accounting',
    title: 'Le BFR et le Cycle de Conversion du Cash',
    simple: "Le Besoin en Fonds de Roulement (BFR) mesure le cash immobilisé dans l'exploitation courante : stocks + créances clients − dettes fournisseurs. Plus le BFR est élevé, plus il faut financer.",
    formula: "BFR = Stocks + Créances clients − Dettes fournisseurs (± autres opérationnels)",
    deepDive: "On analyse le BFR en jours via 3 indicateurs : DSO (délais clients = Créances/CA × 365), DIO (délais stocks = Stocks/COGS × 365), DPO (délais fournisseurs = Fournisseurs/COGS × 365). Le Cycle de Conversion du Cash (CCC) = DIO + DSO − DPO. Un CCC négatif (rare et précieux) signifie que les fournisseurs financent les clients : le BFR est une source de cash. Les retailers (Carrefour, Amazon) atteignent souvent un BFR négatif.",
    table: {
      headers: ["Secteur", "DSO", "DIO", "DPO", "CCC"],
      rows: [
        ["SaaS (cash upfront)", "30j", "0j", "30j", "0j ou négatif"],
        ["Retail (Amazon)", "5j", "30j", "80j", "−45j ✓"],
        ["Distribution (Carrefour)", "5j", "25j", "60j", "−30j ✓"],
        ["Industrie classique", "60j", "60j", "60j", "60j"],
        ["BTP", "90j", "30j", "45j", "75j"],
        ["Pharma branded", "100j", "120j", "60j", "160j"],
      ]
    },
    visual: 'ccc-cycle',
    pitfalls: [
      "Confondre BFR opérationnel et financier",
      "Ne pas neutraliser la saisonnalité (moyenne 12 mois)",
      "Inclure le cash dans le calcul (à exclure)",
      "Sous-estimer l'impact de la croissance sur le BFR"
    ]
  },
  {
    id: 'c6',
    category: 'lbo',
    title: 'Le LBO (Leveraged Buy-Out)',
    simple: "Un LBO est l'acquisition d'une entreprise majoritairement financée par dette, portée par une société holding. La dette est ensuite remboursée par les cash flows de la cible elle-même.",
    formula: "TRI = (Equity Exit / Equity Entry)^(1/n) − 1     |    MOIC = Equity Exit / Equity Entry",
    deepDive: "Structure type d'un LBO mid-cap : 30-50% equity + 50-70% dette (Senior, Mezzanine). Le fonds PE détient la holding (NewCo) qui détient la cible. La dette est portée par la NewCo, remboursée par les dividendes remontant de la cible. Horizon : 4-7 ans. Trois leviers de création de valeur : (1) croissance opérationnelle de l'EBITDA, (2) expansion du multiple à la sortie, (3) désendettement (deleveraging). Aujourd'hui ~50% du TRI vient de l'opérationnel.",
    table: {
      headers: ["Composant", "% typique", "Coût", "Rang"],
      rows: [
        ["Equity (Sponsor + MEP)", "30-50%", "TRI cible 20-25%", "Junior"],
        ["Senior Term Loan", "40-50%", "Euribor + 250-450 bps", "Senior 1"],
        ["Unitranche", "0-60%", "Euribor + 500-700 bps", "Senior 1 (hybride)"],
        ["Mezzanine", "10-20%", "10-15% (cash + PIK)", "Junior secured"],
        ["RCF (revolving)", "Pour BFR", "Euribor + 200-300 bps", "Senior 1"],
      ]
    },
    visual: 'lbo-structure',
    pitfalls: [
      "Structurer un LBO sur une cible cyclique (cash flows volatiles)",
      "Sous-estimer le BFR ou le CAPEX dans le BP",
      "Calculer le TRI sans les frais de transaction",
      "Oublier le tax shield du leverage dans le WACC",
      "Hypothèses de sortie trop optimistes (multiple expansion)"
    ]
  },
  {
    id: 'c7',
    category: 'lbo',
    title: 'Les trois leviers de création de valeur en LBO',
    simple: "Le TRI d'un LBO se décompose en 3 leviers : croissance de l'EBITDA, expansion du multiple à la sortie, et désendettement. Comprendre lequel domine est essentiel.",
    formula: "Δ Equity Value = Δ EBITDA × Multiple_entrée + EBITDA_sortie × Δ Multiple + Δ Dette nette",
    deepDive: "Levier 1 (EBITDA growth) : faire croître l'EBITDA via croissance organique, build-ups (acquisitions add-on), expansion géographique, optimisation des marges. Levier 2 (Multiple expansion) : revendre à un multiple supérieur grâce à un profil amélioré (taille, professionnalisation, diversification). Levier 3 (Deleveraging) : utiliser les FCF pour rembourser la dette, ce qui mécaniquement augmente l'Equity Value à EV constant. Évolution : avant 2008, le deleveraging dominait (60%). Aujourd'hui, l'EBITDA growth est devenu le levier principal (~50%).",
    table: {
      headers: ["Levier", "% TRI typique (2026)", "% TRI années 2000", "Difficulté"],
      rows: [
        ["EBITDA growth", "~50%", "~25%", "Élevée (exécution)"],
        ["Multiple expansion", "~15-20%", "~15%", "Hasard (marché)"],
        ["Deleveraging", "~30-35%", "~60%", "Mécanique"],
      ]
    },
    visual: 'lbo-value-bridge',
    pitfalls: [
      "Compter sur le multiple expansion (incertain, dépend du marché)",
      "Sous-estimer la difficulté d'exécution de l'EBITDA growth",
      "Ne pas prévoir d'add-ons (build-up) dans le BP",
      "Hypothèses opérationnelles non corrélées au CAPEX"
    ]
  },
  {
    id: 'c8',
    category: 'valuation',
    title: 'Multiples de valorisation (EV/EBITDA, P/E, EV/Sales)',
    simple: "Les multiples permettent de valoriser une entreprise par comparaison avec ses pairs cotés ou des transactions récentes. Chaque multiple a son cas d'usage selon le secteur et la maturité.",
    formula: "Multiple = Valeur (EV ou Eq.V) / Métrique (EBITDA, Sales, EPS, BV)",
    deepDive: "EV/EBITDA est le plus utilisé en M&A : indépendant de la structure financière, neutralise les politiques d'amortissement. EV/Sales est utile pour les startups non profitables. P/E inclut le levier et la fiscalité, moins comparable mais utile en equity research. P/B est le standard pour les banques (où la dette est opérationnelle). Toujours utiliser plusieurs multiples pour trianguler.",
    table: {
      headers: ["Multiple", "Cas d'usage", "Mid-cap industrie", "Tech/SaaS", "Banques"],
      rows: [
        ["EV/EBITDA", "M&A standard", "6-9x", "15-25x", "N/A"],
        ["EV/Sales", "Non profitables", "0,8-1,5x", "5-15x", "N/A"],
        ["EV/EBIT", "Capitalistique", "8-12x", "20-30x", "N/A"],
        ["P/E", "Actionnaire", "12-18x", "25-50x", "8-12x"],
        ["P/B", "Banques, foncières", "1,5-2,5x", "5-10x", "0,8-1,5x"],
        ["EV/FCF", "Free cash yield", "12-20x", "20-35x", "N/A"],
      ]
    },
    visual: 'football-field',
    pitfalls: [
      "Comparer des entreprises à des stades de maturité différents",
      "Utiliser des multiples LTM vs NTM sans cohérence",
      "Ignorer les retraitements (add-backs, IFRS 16)",
      "Échantillon trop petit (<5 comps) ou hétérogène",
      "Pas de hiérarchie médiane / moyenne dans les résultats"
    ]
  },
  {
    id: 'c9',
    category: 'ts',
    title: 'Quality of Earnings (QoE)',
    simple: "La QoE est l'analyse qui détermine l'EBITDA RÉCURRENT et soutenable d'une cible, en retraitant tout ce qui n'est pas représentatif du business normal. C'est LE livrable d'une DD financière.",
    formula: "EBITDA ajusté = EBITDA reporté ± Add-backs (non récurrents, non opérationnels, non cash)",
    deepDive: "Un add-back est l'ajout d'éléments retraités pour normaliser l'EBITDA. Add-backs positifs (augmentent l'EBITDA) : coûts non récurrents (restructuration, M&A fees, litiges), one-time costs (lancement produit), pertes sur business cédés. Add-backs négatifs : revenus exceptionnels, gains de change, sous-investissement à normaliser. L'EBITDA ajusté sert de base au multiple de valorisation : chaque million d'add-back à 8x multiple = 8M€ d'EV.",
    table: {
      headers: ["Type d'add-back", "Exemple", "Impact EBITDA", "Acceptation marché"],
      rows: [
        ["Restructuration", "Plan de départ 2M€", "+2M€", "Élevée (90%)"],
        ["Litige réglé", "Indemnité unique", "+ montant", "Élevée"],
        ["M&A fees", "Honoraires juridiques", "+1M€", "Élevée"],
        ["Lancement produit", "Marketing one-shot", "+ partiel", "Moyenne (50%)"],
        ["Management fees holding", "1% du CA", "+ retiré", "Élevée si tiers normalisé"],
        ["COVID impact", "Sur/sous-performance", "Débattu", "Faible (variable)"],
        ["IFRS 16 (leasing)", "Rents → Amort+Int", "Souvent retraité", "Pratique courante"],
      ]
    },
    pitfalls: [
      "Add-backs récurrents masquerés en 'one-time' (red flag)",
      "Pas de documentation par add-back (factures, contrats)",
      "Mélanger add-backs et retraitements proforma",
      "EBITDA ajusté supérieur au CFO de manière inexpliquée",
      "Trop d'add-backs (>15-20% de l'EBITDA = suspect)"
    ]
  },
  {
    id: 'c10',
    category: 'ts',
    title: 'Net Debt et Debt-like items',
    simple: "Le Net Debt impacte directement le prix payé par l'acquéreur (Equity Value = EV − Net Debt). Sa définition précise est négociée dans le SPA et chaque ligne représente des millions.",
    formula: "Net Debt = Dette financière − Cash + Debt-like items − Cash-like items",
    deepDive: "La logique : tout ce qui devra être payé par l'acheteur post-closing et qui n'est pas du BFR opérationnel courant est considéré comme dette. Le cash trapped (compte bloqué, cash étranger non rapatriable, cash minimum opérationnel) ne réduit pas le Net Debt. Inversement, certains éléments traditionnellement non-dette (provisions retraites, earn-outs sur acquisitions passées, dettes fournisseurs en retard) sont considérés comme debt-like.",
    table: {
      headers: ["Élément", "Catégorie", "Logique"],
      rows: [
        ["Emprunts bancaires", "Dette pure", "Évident"],
        ["Obligations émises", "Dette pure", "Évident"],
        ["RCF tirée", "Dette pure", "Si > 0"],
        ["Cash et équivalents", "Cash", "Évident"],
        ["Cash trapped (étranger)", "Restricted", "Coûts de rapatriement"],
        ["Cash minimum opérationnel", "Restricted", "Non disponible"],
        ["Provisions retraites non financées", "Debt-like", "Engagement futur"],
        ["Earn-outs sur passé", "Debt-like", "Paiement futur certain"],
        ["Dividendes à payer", "Debt-like", "Engagement"],
        ["Leasing IFRS 16", "Débattu", "Pratique de marché : oui"],
        ["Over-aged payables", "Debt-like", "Tension trésorerie"],
        ["Comptes courants positifs actionnaires", "Cash-like", "Récupéré"],
      ]
    },
    pitfalls: [
      "Oublier les engagements hors bilan (garanties, lettres de confort)",
      "Ne pas distinguer cash 'available' vs 'restricted'",
      "Sous-estimer les provisions retraites (passif réel)",
      "Inclure le BFR opérationnel dans le Net Debt (double comptage)"
    ]
  },
  {
    id: 'c11',
    category: 'ma',
    title: 'Process M&A — du teaser au closing',
    simple: "Un process M&A se déroule en 7-8 phases sur 6 à 12 mois. Comprendre chaque étape permet de se positionner correctement et d'éviter les pièges.",
    formula: "Préparation → Marketing → 1er tour → DD → 2nd tour → Signing → Closing → Post-closing",
    deepDive: "Côté sell-side : la banque conseil prépare l'Information Memorandum (IM) et un vendor due diligence (VDD). Les acquéreurs reçoivent d'abord un teaser anonyme, puis l'IM sous NDA. Au 1er tour, ils remettent des offres indicatives (non-binding). Les short-listés (4-6) accèdent à la dataroom pour faire leur due diligence. Le 2nd tour produit des offres fermes (binding) avec mark-up du SPA. Signing = engagement contractuel. Closing = réalisation effective (après autorisations antitrust, financement, etc.).",
    table: {
      headers: ["Phase", "Durée", "Livrable clé", "Acteur principal"],
      rows: [
        ["Préparation", "M0-M2", "IM, teaser, VDD", "Banque sell-side"],
        ["Marketing", "M2-M3", "NDA signées", "Banque sell-side"],
        ["1er tour", "M3-M4", "Offres indicatives", "Acheteurs"],
        ["Due diligence", "M4-M6", "Rapports DD", "Conseils acheteurs"],
        ["2nd tour", "M6-M7", "Offres fermes + SPA mark-up", "Acheteurs"],
        ["Signing", "M7", "SPA signé", "Conseils juridiques"],
        ["Closing", "M9-M12", "Levée conditions, paiement", "Banques + juridique"],
        ["Post-closing", "M12+", "Ajustement prix, intégration", "Management"],
      ]
    },
    visual: 'ma-process',
    pitfalls: [
      "Confondre signing et closing (3-6 mois entre les deux)",
      "Sous-estimer les autorisations antitrust pour les gros deals",
      "Mauvaise gestion du MAC clause (Material Adverse Change)",
      "Pas de réflexion sur l'ajustement de prix (locked box vs completion)"
    ]
  },
  {
    id: 'c12',
    category: 'ma',
    title: 'Locked Box vs Completion Accounts',
    simple: "Deux mécanismes pour fixer le prix final d'une transaction. Le Locked Box fige le prix à une date passée (pas d'ajustement post-closing). Les Completion Accounts ajustent au closing.",
    formula: "Locked Box: Prix fixé à T-passé + intérêts | Completion: Prix ajusté avec Net Debt/BFR au closing",
    deepDive: "Locked Box (privilégié en Europe / PE) : prix calculé sur un bilan de référence passé. Interdiction de leakage (sorties de valeur entre locked box date et closing : dividendes, management fees, transactions intra-groupe). Permitted leakages explicitement listés. Compensation par un ticking fee versé par l'acheteur. Completion Accounts (privilégié aux US) : prix ajusté au closing sur la base de comptes audités. Ajustements sur Net Debt cible et BFR normatif.",
    table: {
      headers: ["Critère", "Locked Box", "Completion Accounts"],
      rows: [
        ["Date de référence", "Passée (3-6 mois avant)", "Date du closing"],
        ["Certitude du prix", "Élevée (dès signing)", "Faible (ajusté post-closing)"],
        ["Risque entre signing et closing", "Vendeur", "Acheteur"],
        ["Compensation", "Ticking fee (intérêts)", "Aucun (réel)"],
        ["Complexité", "Plus simple, rapide", "Plus complexe, audit"],
        ["Litiges", "Limités", "Fréquents"],
        ["Région privilégiée", "Europe (PE)", "US"],
        ["Cibles", "Stables", "Volatiles ou complexes"],
      ]
    },
    pitfalls: [
      "Définir trop vaguement les 'permitted leakages'",
      "Ticking fee trop bas (sous-compense la value generation)",
      "Oublier des items dans la définition du Net Debt (Completion)",
      "Mauvaise estimation du BFR normatif (impact majeur sur le prix)"
    ]
  },
  {
    id: 'c13',
    category: 'ma',
    title: 'Synergies — types et valorisation',
    simple: "Les synergies sont la création de valeur supplémentaire que l'acquéreur peut générer après l'acquisition. Elles justifient souvent la prime payée. 4 grandes catégories : revenus, coûts, fiscales, financières.",
    formula: "NPV Synergies = Σ (Synergies × (1−t) − Coûts d'intégration) / (1+WACC)ᵗ",
    deepDive: "Synergies de revenus : cross-selling, accès marché, pricing power. Taux de réalisation 50-70% (les plus optimistes). Synergies de coûts : économies d'échelle, suppression de doublons, pouvoir d'achat. Plus tangibles (70-90% de réalisation). Synergies fiscales : utilisation de déficits, step-up de base fiscale. Synergies financières : réduction du WACC via diversification. Coûts à intégrer : restructurations (1-2× synergies annuelles), IT integration, branding. Phasage : coûts capturés en 1-3 ans, revenus en 3-5 ans (courbe en J).",
    table: {
      headers: ["Type", "Exemple", "Taux de réalisation", "Délai"],
      rows: [
        ["Coûts de structure", "Suppression siège", "85-95%", "12-18 mois"],
        ["Coûts opérationnels", "Sourcing groupé", "70-85%", "24-36 mois"],
        ["Coûts IT", "Consolidation systèmes", "60-75%", "24-48 mois"],
        ["Revenus cross-sell", "Nouveaux produits", "50-65%", "36-60 mois"],
        ["Revenus géographiques", "Nouveaux marchés", "40-55%", "36-72 mois"],
        ["Fiscales", "Déficits, structure", "Variable", "12-24 mois"],
        ["Financières (WACC)", "Diversification risque", "Modeste", "Long terme"],
      ]
    },
    visual: 'synergies-jcurve',
    pitfalls: [
      "Surestimer les synergies de revenus (les plus risquées)",
      "Sous-estimer les coûts d'intégration (1-2× synergies)",
      "Annoncer toutes les synergies dès l'an 1 (irréaliste)",
      "Pas de plan de réalisation détaillé (responsables, KPIs)",
      "Confondre synergies brutes et nettes (après dilution)"
    ]
  },
  {
    id: 'c14',
    category: 'valuation',
    title: 'CAPM et calcul du Beta',
    simple: "Le CAPM (Capital Asset Pricing Model) donne le coût des fonds propres : Ke = Rf + β × (Rm − Rf). Le beta mesure la sensibilité d'une action aux variations du marché.",
    formula: "Ke = Rf + β × (Rm − Rf) + primes spécifiques (size, country, illiquidity)",
    deepDive: "Beta = 1 : action évolue comme le marché. Beta > 1 : plus volatile, cyclique. Beta < 1 : moins volatile, défensif. Calcul : régression linéaire des rendements de l'action sur ceux d'un indice (CAC 40, S&P 500), généralement sur 2-5 ans en données hebdomadaires. En pratique : (1) prendre les betas des comparables levered, (2) les délévérer pour neutraliser leur structure financière, (3) prendre la médiane, (4) relever avec la structure cible. Formule de délévérage : β_u = β_L / (1 + (1−t) × D/E).",
    table: {
      headers: ["Secteur", "β unlevered typique", "β levered (typique)", "Caractère"],
      rows: [
        ["Utilities", "0,4-0,6", "0,5-0,7", "Défensif"],
        ["Consumer staples", "0,5-0,7", "0,7-0,9", "Défensif"],
        ["Pharma", "0,6-0,9", "0,7-1,0", "Défensif"],
        ["Industrie", "0,8-1,1", "1,0-1,3", "Cyclique modéré"],
        ["Tech", "1,0-1,4", "1,1-1,5", "Cyclique"],
        ["Luxe", "1,0-1,3", "1,1-1,4", "Cyclique"],
        ["Auto", "1,1-1,5", "1,3-1,7", "Très cyclique"],
        ["Banques", "0,8-1,2", "1,2-1,8", "Très levered"],
        ["Mines / Commodities", "1,2-1,8", "1,3-2,0", "Très cyclique"],
      ]
    },
    visual: 'beta-sectors',
    pitfalls: [
      "Utiliser le beta levered sans délévérer",
      "Régression sur période trop courte (instable) ou trop longue (obsolète)",
      "Pas de prime de small cap pour mid-cap (5-10% ajout typique)",
      "Oublier la country risk premium pour pays émergents",
      "Beta négatif (rare, suspect — vérifier données)"
    ]
  },
  {
    id: 'c15',
    category: 'accounting',
    title: 'EBITDA — utilité et limites',
    simple: "L'EBITDA (Earnings Before Interest, Taxes, Depreciation & Amortization) est la mesure de rentabilité opérationnelle la plus utilisée. Il neutralise la structure financière et les politiques d'amortissement.",
    formula: "EBITDA = Résultat d'exploitation + Amortissements + Dépréciations",
    deepDive: "Pourquoi l'EBITDA est-il roi en M&A ? (1) Indépendant de la structure financière (avant intérêts), (2) Indépendant de la fiscalité (avant IS), (3) Indépendant des politiques d'amortissement (variables entre pays/normes), (4) Proxy du cash généré par l'opérationnel. Mais limites majeures : (a) ignore le CAPEX (critique pour industries lourdes), (b) ignore le BFR (croissance forte = BFR qui gonfle), (c) ignore les charges d'intérêts (qui peuvent être énormes en LBO), (d) inclut les éléments non-cash (mark-to-market, stock-options).",
    table: {
      headers: ["Métrique", "Inclut", "Exclut", "Usage"],
      rows: [
        ["EBITDA", "Opérations courantes", "Intérêts, IS, D&A, BFR, CAPEX", "Multiples de valorisation"],
        ["EBITDA − CAPEX", "Idem + CAPEX maintenance", "Intérêts, IS, BFR, CAPEX growth", "Industries lourdes"],
        ["EBIT", "Opérations + D&A", "Intérêts, IS, BFR, CAPEX", "ROCE, valorisation alternative"],
        ["CFO (Cash Flow Opérationnel)", "Cash réel généré", "CAPEX, financement", "Réalité cash"],
        ["FCFF", "CFO + intérêts × (1−t) − CAPEX", "Aucun (cash to firm)", "DCF"],
        ["FCFE", "FCFF − intérêts × (1−t) + emprunts nets", "Cash to equity only", "DDM, valuation equity"],
      ]
    },
    pitfalls: [
      "Confondre EBITDA et cash (peut diverger fortement)",
      "Comparer EBITDA reporté vs EBITDA ajusté (add-backs)",
      "Oublier l'impact IFRS 16 sur l'EBITDA (rents → amort + intérêts)",
      "EBITDA positif mais CFO négatif = croissance financée par BFR",
      "EBITDA margin élevée mais ROCE faible = capital-intensive"
    ]
  },
];


const questions = [
    // ===== VALORISATION =====
    {
      id: 1,
      category: 'valuation',
      difficulty: 'basique',
      question: "Quelles sont les principales méthodes de valorisation d'une entreprise ?",
      explanation: "Question fondamentale qui teste la connaissance des méthodes intrinsèques et extrinsèques. L'enjeu est de montrer la maîtrise des trois grandes familles et leurs cas d'usage.",
      steps: [
        "Méthodes intrinsèques (basées sur les flux futurs) : DCF (Discounted Cash Flow) qui actualise les flux de trésorerie futurs, et DDM (Dividend Discount Model) pour les sociétés matures à dividendes stables.",
        "Méthodes par comparaison (market approach) : Comparables boursiers (trading comps) avec multiples EV/EBITDA, EV/Sales, P/E ; et Comparables transactionnels (deal comps) avec primes d'acquisition incluses.",
        "Méthodes patrimoniales : ANR (Actif Net Réévalué) utile pour holdings, foncières ou sociétés en liquidation. Goodwill comptable.",
        "Méthodes spécifiques : LBO (valorisation par capacité d'endettement et TRI cible), méthode du capital risqueur pour startups.",
        "Conclusion : on utilise toujours plusieurs méthodes pour construire une fourchette de valorisation (football field) — jamais une seule méthode isolée."
      ],
      tip: "Mentionnez toujours qu'aucune méthode n'est parfaite et qu'on croise les approches pour triangler la valeur.",
      visual: 'football-field'
    },
    {
      id: 2,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Pourquoi utilise-t-on l'EV/EBITDA plutôt que le P/E ?",
      explanation: "Question classique qui teste la compréhension de la différence entre Enterprise Value et Equity Value, et de l'impact de la structure financière.",
      steps: [
        "L'EV/EBITDA est indépendant de la structure financière : il compare des entreprises avec des niveaux d'endettement différents de manière équitable.",
        "L'EBITDA neutralise les politiques d'amortissement (différentes selon les pays/normes) et la fiscalité, permettant une comparaison internationale.",
        "Le P/E inclut les charges financières et l'impôt, donc il dépend du levier et de la juridiction fiscale — moins comparable.",
        "L'EV/EBITDA est privilégié dans les industries capitalistiques (industrie, télécoms) où les amortissements sont significatifs.",
        "Limites de l'EBITDA : il ignore le CAPEX (critique pour les industries lourdes) et les variations de BFR. D'où l'usage complémentaire d'EV/EBIT ou EV/(EBITDA-CAPEX)."
      ],
      tip: "Citez Warren Buffett : « EBITDA is bullshit earnings » — montre que vous connaissez les limites."
    },
    {
      id: 3,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Comment passe-t-on de l'Enterprise Value à l'Equity Value ?",
      explanation: "Question incontournable qui teste la maîtrise du pont EV-Equity, central dans toute valorisation.",
      steps: [
        "Formule de base : Equity Value = Enterprise Value − Dette nette (Net Debt).",
        "Dette nette = Dette financière brute − Trésorerie et équivalents − Actifs financiers liquides.",
        "Ajustements à soustraire de l'EV : intérêts minoritaires, provisions pour retraites non financées, dettes de leasing (IFRS 16), engagements hors bilan, dividendes à payer.",
        "Ajustements à ajouter à l'EV : participations mises en équivalence (associates), actifs non opérationnels (immobilier excédentaire, cash excess).",
        "Formule complète : Equity Value = EV − Dette nette − Minoritaires − Provisions retraites + Associates + Actifs non opérationnels.",
        "Pour le prix par action : Equity Value / Nombre d'actions diluées (méthode du Treasury Stock pour les options/warrants)."
      ],
      tip: "C'est LA question piège classique : oublier les minoritaires ou les retraites est éliminatoire.",
      visual: 'ev-bridge'
    },


    // ===== DCF =====
    {
      id: 4,
      category: 'dcf',
      difficulty: 'basique',
      question: "Expliquez-moi un DCF de A à Z",
      explanation: "Question reine en M&A. Il faut être structuré, méthodique, et maîtriser chaque composant. Un DCF mal expliqué = entretien terminé.",
      steps: [
        "Étape 1 — Projections : modéliser les Free Cash Flows to Firm (FCFF) sur 5-10 ans : EBIT × (1−t) + D&A − CAPEX − ΔBFR.",
        "Étape 2 — Calcul du WACC : coût moyen pondéré du capital = (E/V × Ke) + (D/V × Kd × (1−t)). Ke via CAPM : Rf + β × (Rm−Rf).",
        "Étape 3 — Actualisation des FCF : chaque flux est divisé par (1+WACC)^t, où t est l'année.",
        "Étape 4 — Valeur terminale : méthode Gordon-Shapiro (FCF × (1+g) / (WACC−g)) ou multiple de sortie (EV/EBITDA × EBITDA terminal). À actualiser également.",
        "Étape 5 — Somme : Enterprise Value = Σ FCF actualisés + Valeur terminale actualisée.",
        "Étape 6 — Pont EV → Equity : EV − Dette nette − ajustements = Equity Value, puis ÷ nombre d'actions = prix par action.",
        "Étape 7 — Sensibilités : tableaux de sensibilité (WACC vs g, WACC vs multiple de sortie) car le DCF est très sensible aux hypothèses."
      ],
      tip: "La valeur terminale représente souvent 60-80% de la valeur totale — toujours le souligner.",
      visual: 'dcf-bridge'
    },
    {
      id: 5,
      category: 'dcf',
      difficulty: 'intermédiaire',
      question: "Comment calcule-t-on le WACC ?",
      explanation: "Question technique très fréquente. Il faut connaître la formule, comprendre chaque composant et savoir où trouver les données.",
      steps: [
        "Formule : WACC = (E/(D+E)) × Ke + (D/(D+E)) × Kd × (1−t), où E = Equity, D = Dette, t = taux d'IS.",
        "Coût des fonds propres (Ke) via CAPM : Ke = Rf + β × (Rm − Rf) + primes spécifiques (size, country, illiquidity).",
        "Rf = taux sans risque, généralement obligation d'État 10 ans (OAT, Bund, Treasury) du pays concerné.",
        "Beta (β) : on utilise les bétas des comparables, on les délèvre (β unlevered = β levered / (1 + (1−t) × D/E)), on prend la médiane, puis on relève avec la structure cible de la cible.",
        "Prime de risque marché (ERP) : 5-7% en zones développées, plus élevée pour pays émergents (sources : Damodaran, Fernandez).",
        "Coût de la dette (Kd) : rendement actuel des obligations de l'entreprise, ou spread de crédit selon le rating + Rf. Multiplié par (1−t) pour le bouclier fiscal.",
        "Pondération E/V et D/V : utiliser des valeurs de marché (pas comptables) et idéalement la structure cible long terme."
      ],
      tip: "Précisez toujours qu'on utilise des valeurs de MARCHÉ pour les pondérations, pas comptables."
    },
    {
      id: 6,
      category: 'dcf',
      difficulty: 'avancé',
      question: "Quelle est la différence entre FCFF et FCFE ?",
      explanation: "Question discriminante qui teste la rigueur conceptuelle. Confondre les deux mène à des erreurs majeures de valorisation.",
      steps: [
        "FCFF (Free Cash Flow to Firm) : flux disponibles pour TOUS les pourvoyeurs de capitaux (actionnaires + créanciers). Calcul : EBIT × (1−t) + D&A − CAPEX − ΔBFR.",
        "FCFE (Free Cash Flow to Equity) : flux disponibles uniquement pour les actionnaires, après service de la dette. Calcul : Net Income + D&A − CAPEX − ΔBFR + Net Borrowing.",
        "FCFF s'actualise au WACC (taux pour l'ensemble des bailleurs) et donne directement l'Enterprise Value.",
        "FCFE s'actualise au coût des fonds propres (Ke) et donne directement l'Equity Value.",
        "Cohérence indispensable : FCFF avec WACC, FCFE avec Ke. Mélanger les deux = erreur grave.",
        "FCFF est privilégié en M&A car indépendant de la structure financière. FCFE utile pour banques/assurances où la dette est opérationnelle."
      ],
      tip: "Astuce : FCFE = FCFF − Intérêts × (1−t) + Net Borrowing."
    },
    {
      id: 7,
      category: 'dcf',
      difficulty: 'avancé',
      question: "Quels sont les principaux risques et limites d'un DCF ?",
      explanation: "Question de jugement qui montre votre recul critique. Les meilleurs candidats ne défendent pas aveuglément leurs modèles.",
      steps: [
        "Sensibilité extrême aux hypothèses : une variation de 1% sur le WACC ou g peut changer la valeur de 20-30%.",
        "Poids excessif de la valeur terminale (souvent 60-80% de l'EV totale) : la valeur dépend surtout d'hypothèses post-période explicite.",
        "Difficulté de prévision : projeter sur 5-10 ans est hasardeux, surtout en environnement volatil ou pour des entreprises cycliques.",
        "Hypothèse de continuité : le DCF suppose la pérennité — peu adapté aux startups, entreprises en retournement, ou sociétés à actifs uniques (mines).",
        "WACC supposé constant : irréaliste, car la structure financière évolue dans le temps (notamment en LBO, d'où l'usage de l'APV).",
        "Risques opérationnels difficiles à quantifier : disruption technologique, changements réglementaires, cycles économiques.",
        "Mitigation : analyses de sensibilité, scénarios (base/upside/downside), Monte Carlo, croisement avec multiples."
      ],
      tip: "Mentionnez l'APV (Adjusted Present Value) comme alternative en LBO — montre une connaissance avancée."
    },


    // ===== M&A =====
    {
      id: 8,
      category: 'ma',
      difficulty: 'basique',
      question: "Quelles sont les étapes d'une opération M&A ?",
      explanation: "Question de structuration qui teste votre vision globale du process. À répondre côté sell-side (vendeur), souvent plus complet.",
      steps: [
        "Phase 1 — Préparation : mandat avec la banque conseil, préparation de l'Information Memorandum (IM), identification de la liste d'acquéreurs cibles, vendor due diligence (VDD).",
        "Phase 2 — Marketing : envoi du teaser anonyme, signature des NDA, distribution de l'IM, organisation du management presentation.",
        "Phase 3 — Premier tour : réception des offres indicatives (non-binding offers), sélection des candidats short-listés (généralement 4-6).",
        "Phase 4 — Due diligence : ouverture de la dataroom, Q&A, expert sessions, site visits, due diligence financière/juridique/fiscale/commerciale par les acquéreurs.",
        "Phase 5 — Second tour : offres fermes (binding offers) avec mark-up du SPA, négociation des termes (prix, garanties, conditions suspensives).",
        "Phase 6 — Signing : signature du SPA (Share Purchase Agreement), annonce publique éventuelle.",
        "Phase 7 — Closing : levée des conditions suspensives (autorisations antitrust, financement, MAC clause), transfert de propriété et paiement.",
        "Phase 8 — Post-closing : ajustement de prix (locked box ou completion accounts), intégration, earn-out éventuel."
      ],
      tip: "Précisez la différence entre signing (engagement) et closing (réalisation effective).",
      visual: 'ma-process'
    },
    {
      id: 9,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Quelle est la différence entre une fusion et une acquisition ?",
      explanation: "Question apparemment simple mais qui teste les nuances juridiques et financières.",
      steps: [
        "Acquisition : une entreprise (acquéreur) prend le contrôle d'une autre (cible) en achetant ses actions ou ses actifs. Les deux entités peuvent rester juridiquement distinctes.",
        "Fusion : deux entités juridiques se combinent en une seule. Fusion-absorption (A absorbe B, B disparaît) ou fusion par création (A et B disparaissent, C est créée).",
        "Conséquences fiscales : la fusion peut bénéficier d'un régime de neutralité fiscale (régime de faveur) sous conditions ; l'acquisition génère souvent un goodwill amortissable fiscalement (selon juridiction).",
        "Conséquences comptables : la fusion entraîne consolidation totale ; l'acquisition crée un goodwill au bilan du groupe consolidé.",
        "Aspects sociaux : la fusion transfère automatiquement les contrats de travail (article L1224-1 en France) ; l'acquisition d'actions n'affecte pas directement les salariés.",
        "Le terme 'M&A' englobe les deux dans le langage courant, mais techniquement la majorité des opérations sont des acquisitions, pas des fusions."
      ],
      tip: "Vraie fusion entre égaux est rare — souvent c'est une acquisition déguisée (ex : DaimlerChrysler)."
    },
    {
      id: 10,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce qu'une opération relutive ou dilutive ?",
      explanation: "Question d'accrétion-dilution (A/D analysis), classique en M&A pour évaluer l'impact d'une acquisition sur le BPA de l'acquéreur.",
      steps: [
        "Définition : une opération est relutive (accretive) si elle augmente le BPA (bénéfice par action) de l'acquéreur post-deal, dilutive (dilutive) si elle le diminue.",
        "Calcul : BPA pro forma = (Net Income acquéreur + Net Income cible + synergies après impôt − coût du financement après impôt) / Nombre d'actions pro forma.",
        "Règle simple (paiement cash) : relutive si rendement après impôt de la cible (Net Income / Prix) > coût de la dette après impôt utilisée pour financer.",
        "Règle simple (paiement actions) : relutive si P/E de l'acquéreur > P/E de la cible (l'acquéreur 'achète' plus cher ce qui lui rapporte moins cher).",
        "Mix de financement : la plupart des deals combinent cash + dette + actions, il faut faire le calcul complet.",
        "Limites : la relution comptable ne signifie pas création de valeur (un deal peut être relutif mais destructeur de valeur s'il y a surpaiement)."
      ],
      tip: "Distinguez bien relution comptable (BPA) et création de valeur (NPV positive). Ce n'est pas la même chose !"
    },
    {
      id: 11,
      category: 'ma',
      difficulty: 'avancé',
      question: "Comment calcule-t-on les synergies dans un deal M&A ?",
      explanation: "Question stratégique qui teste votre compréhension de la création de valeur en M&A. Les synergies justifient souvent le prix payé.",
      steps: [
        "Synergies de revenus : ventes croisées (cross-selling), accès à de nouveaux marchés, pricing power renforcé. Plus difficiles à réaliser et à quantifier (taux de réalisation 50-70%).",
        "Synergies de coûts : économies d'échelle, suppression des doublons (siège, IT, R&D), pouvoir d'achat renforcé, optimisation logistique. Plus tangibles et fiables (taux de réalisation 70-90%).",
        "Synergies fiscales : utilisation de déficits reportables, optimisation de structure groupe, step-up de base fiscale.",
        "Synergies financières : réduction du WACC via diversification, accès à des financements moins chers, optimisation BFR.",
        "Valorisation : NPV des synergies = Σ (Synergies annuelles × (1−t) − Coûts d'intégration) / (1+WACC)^t. À comparer à la prime payée.",
        "Coûts à intégrer : restructurations (1-2× synergies annuelles), IT integration, branding, juridique. Souvent sous-estimés.",
        "Phasage : synergies de coûts captées en 1-3 ans, synergies de revenus sur 3-5 ans. Toujours montrer un courbe en J."
      ],
      tip: "Statistique à connaître : 50-70% des deals M&A détruisent de la valeur, principalement à cause de synergies surestimées.",
      visual: 'synergies-jcurve'
    },
    {
      id: 12,
      category: 'ma',
      difficulty: 'avancé',
      question: "Quelle est la différence entre Locked Box et Completion Accounts ?",
      explanation: "Question très technique sur les mécanismes de prix en M&A. Discriminante en entretien M&A senior.",
      steps: [
        "Completion Accounts : le prix est ajusté au closing sur la base de comptes audités à la date de transfert. Mécanisme classique anglo-saxon.",
        "Ajustements typiques en Completion Accounts : Net Debt réelle vs target, BFR normatif vs réel, parfois EBITDA. Risque pour acheteur et vendeur (incertitude jusqu'à 3-6 mois post-closing).",
        "Locked Box : le prix est fixé sur la base d'un bilan de référence à une date passée (locked box date). Pas d'ajustement post-closing.",
        "Mécanismes du Locked Box : interdiction de leakage (sorties de valeur entre locked box date et closing : dividendes, management fees, transactions intra-groupe). Permitted leakages explicitement listés.",
        "Compensation économique : intérêts (ticking fee ou equity ticker) versés par l'acheteur entre locked box date et closing, pour compenser la valeur générée.",
        "Avantages Locked Box : certitude du prix dès signing, closing plus rapide, moins de litiges. Privilégié par les fonds (sell-side PE).",
        "Avantages Completion Accounts : reflet précis de la situation au closing. Privilégié pour cibles volatiles ou complexes."
      ],
      tip: "Le Locked Box est devenu standard en Europe pour les deals PE — Completion Accounts plus fréquent aux US."
    },


    // ===== LBO =====
    {
      id: 13,
      category: 'lbo',
      difficulty: 'basique',
      question: "Qu'est-ce qu'un LBO ?",
      explanation: "Question fondamentale en private equity. Il faut maîtriser le concept, les acteurs, et les leviers de création de valeur.",
      steps: [
        "Définition : Leveraged Buy-Out, acquisition d'une entreprise (cible) majoritairement financée par dette, portée par une société holding (NewCo) créée pour l'occasion.",
        "Structure type : 30-50% equity (apporté par le fonds PE et le management) + 50-70% dette (Senior, Mezzanine, parfois Unitranche).",
        "Source de remboursement : la dette est remboursée par les cash flows futurs de la cible (et potentiellement la revente d'actifs).",
        "Acteurs : fonds PE (sponsor), management (souvent via package equity = MEP), banques (dette senior), fonds de dette (mezzanine/unitranche), conseils (M&A, audit, juridique).",
        "Horizon : généralement 4-7 ans entre l'entrée et la sortie (exit via IPO, secondary buy-out, ou trade sale).",
        "Objectif de TRI : 20-25% pour le fonds, multiple sur capital investi (MOIC) de 2-3x minimum.",
        "Trois leviers de création de valeur : croissance opérationnelle (EBITDA growth), arbitrage de multiples (acheter bas / vendre haut), désendettement (deleveraging)."
      ],
      tip: "Le LBO transforme du risque opérationnel en TRI grâce au levier — mais amplifie aussi les pertes en cas d'échec.",
      visual: 'lbo-structure'
    },
    {
      id: 14,
      category: 'lbo',
      difficulty: 'intermédiaire',
      question: "Quelles sont les caractéristiques d'une bonne cible LBO ?",
      explanation: "Question de jugement business très posée en private equity. Il faut montrer qu'on comprend ce qui rend une entreprise 'leverageable'.",
      steps: [
        "Cash flows stables et prévisibles : indispensable pour rembourser la dette. Récurrence du business model (abonnements, contrats LT, services essentiels).",
        "Faible cyclicité : industries défensives (santé, alimentaire, services B2B critiques) plutôt que cycliques (construction, automobile).",
        "Position de marché solide : leader ou challenger sur niche, barrières à l'entrée, pricing power, marque forte.",
        "Faible intensité capitalistique : CAPEX limité libère du cash pour la dette. Asset-light > industries lourdes.",
        "Marges élevées et stables : EBITDA > 15-20%, idéalement en croissance. Permet d'absorber les chocs.",
        "Bilan sain à l'entrée : peu de dette existante, BFR maîtrisé, pas de passifs cachés (retraites, litiges).",
        "Management de qualité : équipe expérimentée, alignée via MEP, capable d'exécuter le plan de création de valeur.",
        "Plan de création de valeur clair : leviers identifiés (build-up, expansion géographique, optimisation opérationnelle, digital transformation)."
      ],
      tip: "L'acronyme à retenir : business simple, prévisible, peu capitalistique, avec un plan de croissance crédible."
    },
    {
      id: 15,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Comment construire un modèle LBO ?",
      explanation: "Question technique avancée. À structurer en bloc, montrer la logique et les outputs clés (TRI, MOIC).",
      steps: [
        "Étape 1 — Sources & Uses : déterminer le prix d'entrée (EV = multiple × EBITDA), les frais de transaction, et la structure de financement (Equity / Senior / Mezz).",
        "Étape 2 — Bilan d'ouverture pro forma : intégrer le goodwill, refinancer la dette existante, ajuster le BFR.",
        "Étape 3 — Projections opérationnelles : modéliser le P&L (revenu, EBITDA, EBIT) sur 5-7 ans selon le business plan.",
        "Étape 4 — Free Cash Flow : EBITDA − Impôt sur EBIT − ΔBFR − CAPEX = FCF disponible pour le service de la dette.",
        "Étape 5 — Schedule de dette : intérêts (cash + PIK), remboursement obligatoire (mandatory amortization), cash sweep (remboursement anticipé avec excess cash).",
        "Étape 6 — Covenants : tester les ratios (Net Debt / EBITDA, Interest Coverage, Fixed Charge Coverage) pour vérifier la robustesse de la structure.",
        "Étape 7 — Exit : valoriser à la sortie (multiple de sortie × EBITDA exit), soustraire la dette résiduelle = Equity Value à la sortie.",
        "Étape 8 — Returns : calculer TRI (IRR fonction des flux equity) et MOIC (Equity Exit / Equity Entry). Faire des sensibilités sur multiple d'entrée/sortie et croissance EBITDA."
      ],
      tip: "Toujours faire une analyse de sensibilité TRI vs (multiple de sortie × croissance EBITDA) — c'est ce que regardent les Investment Committees."
    },
    {
      id: 16,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Quels sont les trois leviers de création de valeur en LBO ?",
      explanation: "Question stratégique fondamentale en PE. Permet d'analyser les sources de TRI et leurs proportions.",
      steps: [
        "Levier 1 — Croissance opérationnelle (EBITDA growth) : augmenter l'EBITDA via croissance organique (volumes, prix), expansion géographique, build-ups (acquisitions add-on), optimisation des marges.",
        "Levier 2 — Arbitrage de multiples (multiple expansion) : revendre l'entreprise à un multiple supérieur à celui d'entrée, grâce à l'amélioration du profil (taille, diversification, professionnalisation, croissance).",
        "Levier 3 — Désendettement (deleveraging / debt paydown) : utiliser les cash flows pour rembourser la dette, ce qui mécaniquement augmente la valeur de l'equity à EV constant.",
        "Décomposition du TRI : on peut attribuer chaque point de TRI à l'un des trois leviers (analyse de value bridge).",
        "Évolution historique : avant 2008, le deleveraging dominait (60% du TRI). Depuis, avec des taux bas et des multiples élevés, la croissance opérationnelle est devenue le levier principal (~50%).",
        "Stratégies modernes : les fonds 'value creation' insistent sur l'opérationnel (operating partners, 100-day plans, digital, ESG) plutôt que sur la pure ingénierie financière."
      ],
      tip: "À mentionner : aujourd'hui les LPs (investisseurs) exigent que la majorité du TRI vienne de l'opérationnel, pas du levier.",
      visual: 'lbo-value-bridge'
    },


    // ===== TRANSACTION SERVICES =====
    {
      id: 17,
      category: 'ts',
      difficulty: 'basique',
      question: "Qu'est-ce que la due diligence financière ?",
      explanation: "Question de base en TS. Il faut montrer qu'on comprend l'objectif (sécuriser l'acquéreur) et les principaux livrables.",
      steps: [
        "Définition : analyse approfondie des comptes et de la performance financière d'une cible, réalisée par un cabinet d'audit/conseil pour le compte d'un acquéreur (buy-side) ou vendeur (sell-side / VDD).",
        "Objectif principal : valider la qualité des chiffres communiqués, identifier les risques cachés, et fournir des informations clés pour la négociation (prix, garanties, conditions).",
        "Périmètre : analyse historique (généralement 3 ans), trading update récent, business plan (parfois challengé par une commercial DD séparée).",
        "Livrables clés : Quality of Earnings (QoE), Net Debt et Net Debt-like items, Working Capital normalisé, analyse des CAPEX, points d'attention et red flags.",
        "Différence avec audit : la DD ne certifie pas les comptes, elle analyse la substance économique. Plus subjective, plus orientée business.",
        "Output final : rapport de DD (parfois 100-300 pages) + Executive Summary + management presentation pour l'acquéreur et ses banquiers."
      ],
      tip: "La DD financière n'est qu'une partie du puzzle : il y a aussi DD juridique, fiscale, commerciale, IT, ESG, RH..."
    },
    {
      id: 18,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce que la Quality of Earnings (QoE) ?",
      explanation: "Concept central en TS, c'est LE livrable phare d'une DD financière. À maîtriser absolument.",
      steps: [
        "Définition : analyse visant à déterminer l'EBITDA récurrent et soutenable de la cible, en retraitant les éléments non récurrents, non opérationnels, ou non cash.",
        "Pourquoi c'est crucial : l'EBITDA ajusté sert de base au calcul de la valorisation (multiple × EBITDA) et aux covenants de la dette d'acquisition.",
        "Retraitements positifs (add-backs qui augmentent l'EBITDA) : coûts non récurrents (restructuration, litiges réglés, M&A fees), coûts pré-opérationnels (lancement de produits), pertes sur business cédés.",
        "Retraitements négatifs (qui diminuent l'EBITDA) : revenus non récurrents (one-shots, indemnités), gains de change exceptionnels, sous-investissement en CAPEX/marketing à normaliser.",
        "Retraitements normatifs : management fees vers la holding (à supprimer post-deal), rémunération sous-marché du dirigeant-actionnaire (à normaliser).",
        "Documentation : chaque ajustement doit être justifié, quantifié et documenté (factures, contrats, calculs). Les acquéreurs négocient âprement chaque add-back.",
        "Cas pratiques d'add-backs contestés : COVID-19 (perte vs opportunité ?), lancements de produits ratés, dépenses marketing one-shot."
      ],
      tip: "Phrase à retenir : 'EBITDA is an opinion, cash is a fact' — montre votre esprit critique."
    },
    {
      id: 19,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce que le Net Debt et les Debt-like items ?",
      explanation: "Question pratique très posée en TS. Le Net Debt impacte directement le prix payé par l'acquéreur (Equity Value = EV − Net Debt).",
      steps: [
        "Net Debt 'classique' : Dette financière brute (emprunts bancaires, obligations, lignes RCF tirées) − Trésorerie disponible − Placements liquides.",
        "Cash non disponible : trésorerie restricted (cautions, comptes bloqués), cash trapped à l'étranger (impôts à payer pour rapatrier), cash minimum opérationnel.",
        "Debt-like items (à ajouter à la dette) : provisions pour retraites non financées, dettes fournisseurs en retard (over-aged payables), dividendes à payer, earn-outs sur acquisitions passées, dettes fiscales/sociales en retard.",
        "Leasing (IFRS 16) : la dette de leasing est généralement considérée comme dette (à 100% pour les financiers, parfois retraitée selon nature opérationnelle).",
        "Cash-like items (à ajouter au cash) : créances envers actionnaires, comptes courants positifs, sur-financement de retraites.",
        "Logique : tout ce qui devra être payé par l'acquéreur post-closing et qui n'est pas du BFR opérationnel courant est considéré comme dette.",
        "Négociation : la définition exacte du Net Debt est négociée dans le SPA — chaque ligne peut représenter des millions."
      ],
      tip: "Astuce : 'Si je ne l'avais pas acheté, ce paiement aurait quand même eu lieu ?' → si oui, c'est de la dette."
    },
    {
      id: 20,
      category: 'ts',
      difficulty: 'avancé',
      question: "Qu'est-ce que le Working Capital normatif ?",
      explanation: "Sujet technique avancé en TS. Le BFR normatif impacte directement le prix dans un mécanisme de Completion Accounts.",
      steps: [
        "Définition : niveau 'normal' de BFR nécessaire pour faire tourner l'activité, hors variations exceptionnelles ou saisonnières.",
        "Pourquoi c'est important : à la cession, l'acquéreur doit recevoir un BFR suffisant pour faire fonctionner l'entreprise. Si le BFR au closing < BFR normatif → l'acheteur paie moins.",
        "Méthodologie : calcul d'une moyenne sur 12-24 mois (souvent moyenne glissante mensuelle) pour neutraliser la saisonnalité.",
        "Composantes : créances clients (DSO), stocks (DIO), dettes fournisseurs (DPO), TVA, autres créances/dettes opérationnelles.",
        "Retraitements : sortir les éléments non récurrents (gros contrat ponctuel), les éléments financiers (intérêts courus), le cash.",
        "Saisonnalité : pour les business saisonniers (retail, agriculture), le timing du closing est crucial. Préférer un BFR moyen 12 mois.",
        "Mécanisme dans le SPA : ajustement euro pour euro. Si BFR closing > target → vendor reçoit le surplus. Si BFR closing < target → buyer reçoit l'écart."
      ],
      tip: "Le BFR normatif est l'un des sujets les plus discutés au closing — il peut bouger le prix de plusieurs millions."
    },
    {
      id: 21,
      category: 'ts',
      difficulty: 'avancé',
      question: "Différence entre Vendor Due Diligence (VDD) et Due Diligence acquéreur ?",
      explanation: "Question stratégique sur le process M&A. Montre que vous comprenez les enjeux côté vendeur et acheteur.",
      steps: [
        "Vendor Due Diligence (VDD) : commandée par le vendeur AVANT la mise sur le marché de la cible. Réalisée par un cabinet indépendant (souvent Big 4).",
        "Objectifs VDD : identifier en amont les risques pour les anticiper, accélérer le process, donner confiance aux acquéreurs, maximiser le prix, raccourcir la phase de DD acheteur.",
        "Confidentialité VDD : le rapport est partagé avec les acquéreurs short-listés sous NDA. L'acquéreur final peut souvent obtenir une 'reliance letter' qui l'autorise à se baser sur la VDD.",
        "DD acquéreur (buy-side) : commandée par l'acquéreur APRÈS short-listing. Plus ciblée sur les zones de risque identifiées et les hypothèses de business plan.",
        "Périmètre acquéreur : typiquement plus restreint que la VDD car la VDD a déjà couvert les fondamentaux. Focus sur synergies, post-merger integration, validation des add-backs.",
        "Coûts : VDD payée par le vendeur (200K-2M€ selon taille), DD acheteur payée par l'acquéreur (souvent moins chère car s'appuie sur la VDD).",
        "Avantage compétitif : un process VDD bien préparé peut faire monter les prix de 5-15% grâce à la confiance et la rapidité."
      ],
      tip: "En process compétitif (auction), la VDD est devenue standard — sans elle, le vendeur perd en crédibilité."
    },


    // ===== COMPTABILITE =====
    {
      id: 22,
      category: 'accounting',
      difficulty: 'basique',
      question: "Reliez-moi les trois états financiers entre eux",
      explanation: "Question reine en finance. Si vous ratez ça, vous échouez. À pratiquer jusqu'à automatisme total.",
      steps: [
        "Compte de résultat → Bilan : le résultat net (Net Income) augmente les capitaux propres (réserves) au passif du bilan.",
        "Compte de résultat → Cash Flow : le résultat net est le point de départ du tableau de flux de trésorerie (méthode indirecte).",
        "Bilan → Cash Flow : les variations des postes du bilan alimentent le tableau de flux : ΔBFR (CFO), ΔImmobilisations (CFI), ΔDette et ΔCapitaux propres (CFF).",
        "Cash Flow → Bilan : la variation de trésorerie de la période (somme CFO + CFI + CFF) explique l'évolution du poste 'Trésorerie' au bilan.",
        "Cycle complet : un actif acheté apparaît au bilan (CAPEX → CFI), génère des amortissements (P&L), qui sont retraités au CFO, et finit par sortir du bilan en fin de vie.",
        "Test rapide : si on augmente la D&A de 10 (avant impôt 25%) → P&L : Net Income −7,5. Bilan : Cash +2,5 (économie d'impôt), Immo −10, Equity −7,5. CFS : CFO +2,5. Tout se boucle."
      ],
      tip: "L'exercice classique : 'Si je dépense 100 en CAPEX, qu'est-ce qui se passe sur les 3 états ?' — entraînez-vous à le faire en 30 secondes.",
      visual: '3-statements'
    },
    {
      id: 23,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Quelle est la différence entre EBITDA et Cash Flow Opérationnel ?",
      explanation: "Question conceptuelle qui teste votre compréhension de la différence entre profit comptable et cash réel.",
      steps: [
        "EBITDA = résultat avant intérêts, impôts, amortissements et dépréciations. Mesure de profit opérationnel comptable.",
        "Cash Flow Opérationnel (CFO) = cash réellement généré par l'exploitation. Calcul indirect : Net Income + D&A + autres non-cash − ΔBFR (méthode indirecte).",
        "Différence 1 — Le BFR : l'EBITDA ignore les variations de BFR (créances clients, stocks, dettes fournisseurs), le CFO les prend en compte. Une croissance forte = BFR qui gonfle = CFO < EBITDA.",
        "Différence 2 — Les impôts : l'EBITDA est avant IS, le CFO inclut les impôts payés (cash taxes), qui peuvent différer de l'impôt comptable (impôts différés).",
        "Différence 3 — Les éléments non cash autres que D&A : provisions, stock-options, mark-to-market. Inclus implicitement dans l'EBITDA, retraités dans le CFO.",
        "Différence 4 — Charges financières : exclues de l'EBITDA, mais... attention, les intérêts payés sont généralement inclus dans le CFO en IFRS (option) et US GAAP.",
        "Conclusion : EBITDA est utile pour comparer la profitabilité opérationnelle ; CFO est plus proche de la réalité cash et des capacités de remboursement."
      ],
      tip: "Phrase à retenir : 'Un business peut afficher un EBITDA en croissance et brûler du cash s'il finance son BFR par la dette'."
    },
    {
      id: 24,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce que le goodwill et comment se crée-t-il ?",
      explanation: "Question fréquente en M&A. Le goodwill est central dans la comptabilisation des acquisitions.",
      steps: [
        "Définition : écart d'acquisition = Prix payé pour la cible − Juste valeur de l'actif net identifiable de la cible (après réévaluation).",
        "Création : lors d'une acquisition, l'acquéreur réévalue les actifs et passifs de la cible à leur juste valeur (purchase price allocation, PPA). L'écart entre prix payé et net asset value retraité = goodwill.",
        "Composantes économiques du goodwill : synergies attendues, capital humain, marque non comptabilisée, base clients, position concurrentielle, savoir-faire.",
        "Comptabilisation : actif incorporel inscrit au bilan consolidé de l'acquéreur. Pas amorti en IFRS, mais soumis à un test de dépréciation annuel (impairment test).",
        "Test d'impairment (IAS 36) : si la valeur recouvrable d'une unité génératrice de trésorerie (UGT) < valeur comptable (incl. goodwill) → impairment loss au compte de résultat.",
        "Différence IFRS vs US GAAP : IFRS pas d'amortissement, test annuel. US GAAP idem post-2001 (avant : amorti sur 40 ans).",
        "Goodwill négatif (badwill) : si prix payé < juste valeur des actifs → bonne affaire, comptabilisée immédiatement en produit au P&L."
      ],
      tip: "L'impairment du goodwill est un signal très négatif (ex : Vivendi/SFR, Bayer/Monsanto) — montre l'échec d'une acquisition."
    },
    {
      id: 25,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Différence entre IFRS 16 et l'ancienne norme sur les leasings ?",
      explanation: "Question d'actualité (norme appliquée depuis 2019). Très posée car impacte les multiples de valorisation et les ratios de dette.",
      steps: [
        "Avant IFRS 16 (IAS 17) : distinction location simple (operating lease) vs location-financement (finance lease). Operating lease en hors-bilan (charge de loyer au P&L uniquement).",
        "Depuis IFRS 16 (2019) : tous les contrats de leasing > 12 mois et > seuil sont capitalisés. Disparition de la notion d'operating lease au bilan du preneur.",
        "Impact bilan : actif (droit d'utilisation, ROU) et passif (dette de leasing) apparaissent. Augmentation mécanique du total bilan.",
        "Impact P&L : la charge de loyer (charges externes) est remplacée par : amortissement du ROU (au-dessus de l'EBITDA) + charge d'intérêts (financier). → EBITDA mécaniquement augmenté !",
        "Impact ratios : Net Debt / EBITDA augmente (numérateur +leasing, dénominateur +EBITDA mais proportion < ). Multiples EV/EBITDA à retraiter pour comparer.",
        "Impact valorisation : les comparables avant 2019 ne sont plus comparables. Les analystes retraitent souvent en sortant la dette de leasing du Net Debt OU en utilisant l'EBITDAR (avant Rent).",
        "Cas particuliers en M&A : la dette de leasing IFRS 16 est-elle 'debt-like' ? Pratique de marché : oui pour les non-essentiels, débat pour les essentiels (immobilier d'exploitation)."
      ],
      tip: "C'est un sujet brûlant en TS : le retraitement IFRS 16 dans le Net Debt est très négocié (peut représenter 10-30% de l'EV !)."
    },
    {
      id: 26,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Qu'est-ce que le BFR et comment l'analyser ?",
      explanation: "Question opérationnelle clé en TS et M&A. Le BFR est souvent un piège dans les deals.",
      steps: [
        "Définition : Besoin en Fonds de Roulement = Stocks + Créances clients − Dettes fournisseurs ± autres éléments d'exploitation. Mesure le cash immobilisé dans l'exploitation.",
        "Analyse en jours : DSO (Days Sales Outstanding = créances/CA × 365), DIO (Days Inventory Outstanding = stocks/COGS × 365), DPO (Days Payables Outstanding = fournisseurs/COGS × 365).",
        "Cycle de conversion du cash (CCC) : DSO + DIO − DPO. Plus c'est faible, mieux c'est. Idéal : négatif (BFR négatif = financé par les fournisseurs).",
        "Exemples : retail/grande distribution = BFR négatif (paiement fournisseurs LT, encaissement clients comptant). Industrie lourde = BFR positif important (stocks + crédit clients).",
        "Saisonnalité : un commerce de jouets a un pic BFR en septembre-octobre, creux en janvier. Les moyennes mensuelles sont indispensables.",
        "Leviers d'optimisation : factoring (mobilisation créances), allongement délais fournisseurs, gestion JIT des stocks, dématérialisation/automatisation facturation.",
        "Red flags en DD : DSO qui s'allonge (qualité du client, factoring caché, stuffing channel), stocks qui montent (obsolescence), DPO qui s'étend (tension trésorerie)."
      ],
      tip: "Une croissance forte sans BFR négatif = besoin de cash important. C'est pourquoi les startups SaaS sont si valorisées (cash upfront).",
      visual: 'ccc-cycle'
    },


    // ===== AUTRES =====
    {
      id: 27,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Comment choisir un échantillon de comparables ?",
      explanation: "Question méthodologique pour les analyses par multiples. Un mauvais échantillon biaise toute la valorisation.",
      steps: [
        "Critère 1 — Secteur d'activité : même industrie, idéalement même sous-segment. Pas Carrefour vs Hermès même si tous deux 'consumer'.",
        "Critère 2 — Taille : ordre de grandeur similaire (CA, EBITDA, capi). Une mid-cap n'est pas comparable à une large-cap (prime de liquidité, accès au marché différent).",
        "Critère 3 — Géographie : zones géographiques similaires (croissance, fiscalité, taux). Un comparable européen pour valoriser une entreprise européenne.",
        "Critère 4 — Profil de croissance : taux de croissance comparables. Une entreprise mature ne se valorise pas comme une high-growth.",
        "Critère 5 — Profil de marges : niveaux d'EBITDA margin similaires (sinon, écart de qualité business).",
        "Critère 6 — Modèle économique : asset-light vs asset-heavy, B2B vs B2C, abonnement vs one-shot. Différences fondamentales.",
        "Taille d'échantillon : idéalement 5-10 comparables. Trop peu = peu robuste, trop = dilution. Toujours présenter médiane ET moyenne (médiane plus robuste aux outliers).",
        "Documentation : justifier le choix de chaque comparable et les exclusions (ex : 'Société X exclue car en restructuration'). Crédibilité = transparence."
      ],
      tip: "La pratique du 'football field' croise plusieurs méthodes (DCF, comps boursiers, comps transactions, LBO) pour avoir une fourchette robuste."
    },
    {
      id: 28,
      category: 'ma',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'une MAC clause et à quoi sert-elle ?",
      explanation: "Question juridico-financière sur la sécurisation des deals. Devenue cruciale post-COVID.",
      steps: [
        "Définition : Material Adverse Change (ou Material Adverse Effect, MAE). Clause permettant à l'acquéreur de se retirer d'un deal entre signing et closing si un événement matériellement défavorable affecte la cible.",
        "Objectif : protéger l'acquéreur contre une dégradation significative de la cible avant le closing (typiquement 3-9 mois entre signing et closing pour autorisations antitrust, financement).",
        "Définition typique : impact négatif significatif (en montant et durabilité) sur l'activité, la situation financière, les opérations, ou les perspectives de la cible.",
        "Exclusions habituelles : événements affectant l'industrie entière ou l'économie en général, changements de normes comptables/réglementaires, force majeure, actions de l'acquéreur.",
        "Cas COVID-19 : nombreux litiges en 2020-2021 (LVMH/Tiffany, Sycamore/Victoria's Secret). La pandémie était-elle un MAC ? Réponses jurisprudentielles variables selon impact et exclusions.",
        "Négociation : l'acquéreur veut une définition large, le vendeur veut une définition étroite avec beaucoup d'exclusions. Souvent objet de longues négociations.",
        "Mise en œuvre : difficile à invoquer en pratique. Les juridictions américaines (Delaware) sont historiquement très restrictives — il faut un impact majeur ET durable."
      ],
      tip: "Cas d'école : LVMH a invoqué le MAC pour Tiffany en 2020, finalement accord trouvé avec baisse de prix de 425M$."
    },
    {
      id: 29,
      category: 'ma',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'un earn-out ?",
      explanation: "Question sur les mécanismes de prix conditionnels. Très utilisés dans les deals où le vendeur reste opérationnel.",
      steps: [
        "Définition : complément de prix payé par l'acquéreur au vendeur, conditionné à l'atteinte d'objectifs futurs (financiers ou opérationnels) sur une période post-closing.",
        "Cas d'usage : valorisations divergentes entre vendeur (optimiste) et acheteur (prudent), startups en forte croissance, deals avec management qui reste en place.",
        "Indicateurs typiques : EBITDA, CA, marge brute, atteinte de jalons opérationnels (lancement produit, signature contrat clé, certification).",
        "Période : 1 à 5 ans typiquement. Plus c'est long, plus le risque d'aléa augmente.",
        "Structure : pourcentage du prix total (généralement 10-30%), avec parfois des paliers (catch-up, mécanismes de cliquet).",
        "Risques pour le vendeur : actions de l'acquéreur post-closing peuvent affecter les KPIs (sous-investissement marketing, intégration agressive, allocation de coûts du groupe).",
        "Protections vendeur : clauses de bonne foi, séparation comptable de la cible, droits d'information, restrictions sur les actions de l'acquéreur, mécanismes d'ajustement.",
        "Source de litiges : les earn-outs sont parmi les sources de litige post-deal les plus fréquentes — d'où l'importance de la documentation."
      ],
      tip: "Adage M&A : 'Un earn-out, c'est l'art de transformer un désaccord sur le prix en désaccord futur sur l'exécution'."
    },
    {
      id: 30,
      category: 'valuation',
      difficulty: 'avancé',
      question: "Quelle est la différence entre prime de contrôle et décote de minorité ?",
      explanation: "Question fine sur la valorisation. Concepts liés à la structure actionnariale.",
      steps: [
        "Prime de contrôle : surcoût payé pour acquérir une participation majoritaire (>50%) qui confère le contrôle de l'entreprise. Typiquement 20-40% au-dessus du cours de bourse.",
        "Justification de la prime : capacité à imposer la stratégie, capter les synergies, nommer le management, fixer la politique de dividende, vendre des actifs.",
        "Décote de minorité : à l'inverse, une participation minoritaire (sans contrôle) vaut moins per share qu'une participation majoritaire. Décote ~20-30% par rapport à la valeur intrinsèque pro rata.",
        "Justification de la décote : impossibilité d'influer sur la stratégie, dépendance vis-à-vis de l'actionnaire majoritaire, difficulté de sortie.",
        "Décote d'illiquidité : s'ajoute pour les sociétés non cotées (illiquid discount). 20-35% supplémentaires pour les minorités non cotées.",
        "Application : multiples de transactions (deal comps) intègrent une prime de contrôle ; multiples de trading (boursiers) reflètent des participations minoritaires liquides.",
        "Pratique en M&A : pour valoriser une cible, on part des comps trading + prime de contrôle (15-30%) ≈ comps transactions. Vérifier la cohérence des deux approches."
      ],
      tip: "Empiriquement, primes de contrôle moyennes en Europe : ~25% sur le cours 1 mois avant l'annonce."
    },


    // ===== QUESTIONS TECHNIQUES SUPPLEMENTAIRES =====
    {
      id: 31,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Mon chiffre d'affaires a baissé de 30%, est-ce une mauvaise nouvelle ?",
      explanation: "Question piège classique chez Rothschild et Lazard. Teste votre capacité à raisonner et à ne pas tomber dans les conclusions hâtives.",
      steps: [
        "Réponse de principe : « Cela dépend ». Refuser le piège du jugement immédiat — c'est ce que cherche le recruteur.",
        "Hypothèse 1 — Cession d'activité : l'entreprise a peut-être cédé une activité non stratégique ou déficitaire (carve-out). La baisse du CA s'accompagne alors d'une amélioration des marges et du ROCE.",
        "Hypothèse 2 — Repositionnement stratégique : abandon volontaire d'un segment low-margin pour se concentrer sur un cœur d'activité plus rentable (ex : passage du B2C au B2B premium).",
        "Hypothèse 3 — Effet périmètre : déconsolidation, changement de méthode comptable (ex : passage d'IFRS 15 sur la reconnaissance du revenu), changement de devise.",
        "Hypothèse 4 — Mauvaise nouvelle réelle : perte de parts de marché, crise sectorielle, perte d'un client majeur. À investiguer.",
        "Méthodologie : toujours analyser à périmètre constant (like-for-like / organic), retraiter les effets de change et de M&A, regarder l'évolution des marges en parallèle."
      ],
      tip: "L'attitude attendue : ne JAMAIS conclure sans avoir posé des questions de clarification. C'est ce qu'attend un client en M&A."
    },
    {
      id: 32,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Une entreprise vaut 100M€ et procède à une levée de fonds de 10M€. Quelle est sa nouvelle valeur d'entreprise ?",
      explanation: "Question piège récurrente chez les boutiques. Teste la compréhension fine du lien entre cash et Enterprise Value.",
      steps: [
        "Piège classique : la réponse intuitive serait 110M€. C'est FAUX.",
        "Rappel : Enterprise Value = Equity Value + Dette nette. Or, Dette nette = Dette − Cash.",
        "Une levée de fonds en cash augmente l'Equity Value de 10M€ (les nouveaux actionnaires apportent 10M€) ET augmente le cash de 10M€, donc diminue la Dette nette de 10M€.",
        "Calcul : ΔEV = ΔEquity Value + ΔDette nette = +10 + (−10) = 0.",
        "Conclusion : l'EV reste à 100M€. Économiquement, c'est logique : le business operationnel n'a pas changé, seule la structure de financement a évolué.",
        "Cas particulier : si le cash levé est utilisé immédiatement (CAPEX, acquisition), l'EV peut bouger selon l'usage. Mais à l'instant T de la levée, l'EV est invariante.",
        "Conséquence pratique : c'est pour cela que l'EV est utilisée en M&A — c'est une mesure de valeur opérationnelle indépendante du financement."
      ],
      tip: "C'est LA question piège pour distinguer les candidats qui ont 'compris' la finance de ceux qui récitent."
    },
    {
      id: 33,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Quelle méthode de valorisation donne la valeur la plus élevée ?",
      explanation: "Question apparemment simple mais qui teste votre intuition et votre capacité à hiérarchiser les méthodes.",
      steps: [
        "Pas de réponse universelle, mais une hiérarchie habituelle (du plus haut au plus bas) : Comparables transactionnels > Comparables boursiers ≈ DCF > LBO.",
        "Comparables transactionnels (les plus élevés) : intègrent une prime de contrôle (20-30%) et les synergies anticipées par les acquéreurs. Reflètent ce qu'on est prêt à payer en M&A.",
        "Comparables boursiers : valeur 'standalone' minoritaire, sans prime de contrôle. Reflètent la valeur intrinsèque selon le marché.",
        "DCF : très sensible aux hypothèses (WACC, g, projections). Peut donner des valeurs très variables. En base case, souvent proche des comps boursiers.",
        "LBO : donne un 'floor value' — c'est le prix maximum qu'un fonds PE peut payer pour atteindre son TRI cible (typiquement 20-25%). Souvent la valeur la plus basse.",
        "Cas particuliers : une cible avec des synergies importantes pour un acquéreur stratégique peut donner une valeur supérieure aux transactions (synergies spécifiques)."
      ],
      tip: "À retenir : transactions > boursiers > DCF > LBO. Mais toujours nuancer selon le contexte sectoriel."
    },
    {
      id: 34,
      category: 'valuation',
      difficulty: 'avancé',
      question: "Pourquoi soustrait-on le cash dans le calcul de l'Enterprise Value ?",
      explanation: "Question conceptuelle fréquente. Teste la compréhension profonde de l'EV vs Equity Value.",
      steps: [
        "Définition : Enterprise Value = valeur des actifs OPÉRATIONNELS de l'entreprise, indépendante de la structure financière.",
        "Le cash est considéré comme un actif NON opérationnel : il ne génère pas de flux opérationnels (à part des intérêts financiers, généralement faibles).",
        "Logique de l'acquéreur : si je rachète l'entreprise pour 100M€ et qu'il y a 20M€ de cash dans le bilan, économiquement je 'récupère' ce cash — donc le coût net de l'acquisition est de 80M€.",
        "Formule : EV = Equity Value + Dette − Cash. Le cash vient réduire le 'coût d'acquisition' réel.",
        "Subtilité 1 : on ne soustrait que le cash 'excédentaire' (excess cash), pas le cash opérationnel nécessaire au fonctionnement (cash minimum, cautions, restricted cash).",
        "Subtilité 2 : le cash piégé à l'étranger (trapped cash) doit être retraité en intégrant les coûts de rapatriement (impôts, withholding taxes).",
        "Cas particulier des banques : on n'utilise pas l'EV car la dette est opérationnelle (matière première). On utilise P/E ou P/B."
      ],
      tip: "Pour expliquer simplement : 'Le cash, l'acquéreur le récupère, donc il ne paye pas pour ça'."
    },
    {
      id: 35,
      category: 'dcf',
      difficulty: 'intermédiaire',
      question: "Deux entreprises sont identiques sauf que l'une est endettée et l'autre non. Laquelle a le WACC le plus élevé ?",
      explanation: "Question conceptuelle sur la théorie de Modigliani-Miller. Très posée pour tester votre solidité théorique.",
      steps: [
        "Réponse intuitive (et fausse) : on pourrait penser que l'entreprise endettée a un WACC plus élevé car la dette ajoute du risque.",
        "Bonne réponse : l'entreprise NON endettée a généralement un WACC plus élevé. Pourquoi ?",
        "Raison 1 — La dette est moins chère que les fonds propres (Kd < Ke), car la dette a une priorité de remboursement et le risque est moindre pour le créancier.",
        "Raison 2 — Bouclier fiscal (tax shield) : les intérêts sont déductibles, donc le coût effectif de la dette est Kd × (1−t), encore plus bas.",
        "Raison 3 — Plus on substitue de la dette aux fonds propres, plus le WACC moyen baisse... jusqu'à un certain point.",
        "Limite : au-delà d'un certain niveau de levier, le risque de défaut augmente, le coût de la dette explose (spread), et le coût des fonds propres aussi (β increases). Le WACC remonte → existence d'un optimum (théorie du Trade-off).",
        "Nuance Modigliani-Miller : sans impôt et sans coûts de faillite, la structure financière est neutre. Avec impôts (cas réel), le levier réduit le WACC."
      ],
      tip: "La courbe du WACC en fonction du levier est en U : descend puis remonte. Optimum théorique au minimum de la courbe.",
      visual: 'wacc-curve'
    },
    {
      id: 36,
      category: 'dcf',
      difficulty: 'avancé',
      question: "Comment calcule-t-on le Beta et que signifie-t-il ? Classez Peugeot, EDF, Samsung, Total du beta le plus faible au plus élevé",
      explanation: "Question type AlumnEye / Crack-It. Teste la compréhension du Beta + l'intuition sur les secteurs.",
      steps: [
        "Définition : le Beta mesure la sensibilité du rendement d'une action aux variations du marché. Beta = Cov(Ri, Rm) / Var(Rm).",
        "Beta = 1 : action évolue comme le marché. Beta > 1 : plus volatile (cyclique). Beta < 1 : moins volatile (défensive).",
        "Calcul pratique : régression linéaire des rendements de l'action sur ceux de l'indice de référence (CAC 40, S&P 500), généralement sur 2-5 ans en données hebdomadaires.",
        "Beta levered vs unlevered : on délévère pour neutraliser l'effet du levier (β_u = β_L / (1 + (1−t) × D/E)), puis on relève avec la structure cible.",
        "Classement attendu (du plus faible au plus élevé) : EDF < Total < Samsung < Peugeot.",
        "EDF (β ~0,5-0,7) : utility régulée, demande d'électricité peu cyclique, défensive par excellence.",
        "Total (β ~0,9-1,1) : énergie, lié au cours du pétrole, mais diversification géographique et activités stables (raffinage, distribution).",
        "Samsung (β ~1,1-1,3) : tech/électronique, semi-conducteurs cycliques, sensible au cycle économique global.",
        "Peugeot/Stellantis (β ~1,3-1,6) : automobile, ultra-cyclique, fort levier opérationnel, sensible au pouvoir d'achat."
      ],
      tip: "Règle générale : utilities < consumer staples < pharma < industrie < tech < auto/luxe < banques en stress.",
      visual: 'beta-sectors'
    },
    {
      id: 37,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "P/E de A = 14, P/E de B = 9. A acquiert B 100% en actions. Relutif ou dilutif ?",
      explanation: "Question type AlumnEye qui teste la règle simple sur l'accrétion-dilution en deal 100% actions.",
      steps: [
        "Règle simple à connaître par cœur : en paiement 100% actions, l'opération est RELUTIVE si P/E acquéreur > P/E cible.",
        "Application : P/E de A (14) > P/E de B (9), donc l'opération est RELUTIVE pour A.",
        "Démonstration intuitive : A 'paie' B avec ses propres actions, valorisées à un multiple de 14× les bénéfices. Or B est valorisée à 9× ses bénéfices.",
        "En d'autres termes : pour 1 action A émise, A obtient 14/9 = 1,56× plus de bénéfices que ce qu'elle 'cède' à ses actionnaires existants.",
        "Calcul : E/P (rendement bénéficiaire) de A = 1/14 = 7,1%. E/P de B = 1/9 = 11,1%. A récupère un rendement de 11,1% en émettant des actions à 7,1%. Différentiel positif → relutif.",
        "Règles à retenir : Cash deal → relutif si rendement après impôt cible > Kd × (1−t). Stock deal → relutif si P/E acquéreur > P/E cible. Mix → faire le calcul complet.",
        "Limite : la relution comptable ne garantit pas la création de valeur. A peut surpayer B et être relutif court terme mais destructeur long terme."
      ],
      tip: "Pour un deal mixte (cash + actions), il faut faire la moyenne pondérée des seuils — le test simple ne suffit plus."
    },
    {
      id: 38,
      category: 'lbo',
      difficulty: 'intermédiaire',
      question: "Quels sont les différents types de dettes utilisées dans un LBO ?",
      explanation: "Question structurelle classique en PE. Hiérarchie des dettes à maîtriser absolument.",
      steps: [
        "Senior Secured (Tranche A, B, C) : dette bancaire prioritaire, garantie par les actifs. Coût : Euribor + 200-450 bps. Maturité : 5-7 ans. Souvent amortissable (A) ou bullet (B, C).",
        "Revolving Credit Facility (RCF) : ligne de crédit revolving pour le BFR et les besoins opérationnels. Senior, pas tirée à 100%. Coût : Euribor + 200-300 bps + commission de non-utilisation.",
        "Unitranche : alternative récente combinant Senior et Subordonnée en une seule tranche, levée auprès de fonds de dette (Tikehau, Ares, ICG). Coût : Euribor + 500-700 bps. Souplesse mais plus chère.",
        "Mezzanine : dette subordonnée, junior par rapport au Senior. Coupon mixte (cash + PIK + equity kicker / warrants). Coût total : 10-15%. Maturité : 8-9 ans (post Senior).",
        "PIK Notes (Payment In Kind) : intérêts capitalisés (pas de cash out), augmentent le principal. Pour les structures ultra-leveragées. Coût : 12-16%.",
        "High Yield Bonds : obligations à haut rendement, généralement pour les LBO de grande taille (>500M€). Coupons cash, maturité 7-10 ans, covenants light.",
        "Vendor Loan : crédit vendeur, le cédant accepte de différer une partie du paiement. Coût négocié, subordonné, alignement d'intérêts.",
        "Stretched Senior : forme hybride, levier supérieur au Senior classique, intermédiaire entre Senior et Unitranche."
      ],
      tip: "Hiérarchie de remboursement en cas de défaut : Senior > Mezzanine > Vendor Loan > Equity. Plus on est junior, plus le coût est élevé.",
      visual: 'debt-stack'
    },
    {
      id: 39,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Qu'est-ce qui se passe si on verse des dividendes chaque année dans un LBO au lieu de rembourser la dette ?",
      explanation: "Question avancée Crack-It sur l'arbitrage dividendes vs deleveraging en LBO.",
      steps: [
        "Effet 1 — TRI court terme amélioré : les dividendes versés aux investisseurs réduisent la durée moyenne d'immobilisation du capital, ce qui augmente mécaniquement le TRI (effet de l'actualisation).",
        "Effet 2 — Réduction du multiple (MOIC) : moins de désendettement = moins de création de valeur 'mécanique' à la sortie via le deleveraging.",
        "Effet 3 — Risque accru : niveau de dette élevé maintenu plus longtemps → vulnérabilité aux chocs opérationnels, covenants plus tendus.",
        "Effet 4 — Capacité d'investissement réduite : moins de cash réinvesti dans l'entreprise = moins de croissance organique, build-ups limités.",
        "Effet 5 — Valorisation de sortie : une entreprise plus endettée à la sortie sera valorisée moins favorablement (les acheteurs paient pour l'EBITDA mais récupèrent moins d'equity).",
        "Stratégie 'recap dividend' : pratique courante en PE quand l'entreprise se désendette plus vite que prévu. Émission de nouvelle dette pour verser un dividende exceptionnel.",
        "Arbitrage final : verser des dividendes booste le TRI mais réduit le MOIC. Les LPs préfèrent souvent un équilibre — TRI sans MOIC = peu de cash absolu."
      ],
      tip: "Adage PE : 'TRI nourrit l'ego, MOIC nourrit la famille'. Un fonds avec 30% de TRI mais 1,5× MOIC est moins bon qu'un 22% TRI / 2,5× MOIC."
    },
    {
      id: 40,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Quelles sont les méthodes de consolidation comptable ?",
      explanation: "Question fondamentale en M&A et TS. À maîtriser pour comprendre les comptes consolidés.",
      steps: [
        "Trois méthodes selon le pourcentage de contrôle et l'influence : intégration globale, mise en équivalence, intégration proportionnelle (rare en IFRS).",
        "Intégration globale (>50% de contrôle) : consolidation à 100% des actifs/passifs et P&L de la filiale. Apparition d'intérêts minoritaires si détention < 100%.",
        "Mise en équivalence (20-50%, influence notable) : la participation est valorisée au bilan à la quote-part de capitaux propres. Au P&L : quote-part du résultat net en une ligne ('Quote-part dans les sociétés mises en équivalence').",
        "Intégration proportionnelle (anciennement utilisée pour JV) : consolidation au prorata de la détention. Supprimée en IFRS 11 (2014), remplacée par la mise en équivalence pour les JV.",
        "Goodwill : créé lors de l'acquisition à plus de 50%, calculé comme (Prix payé) − (Quote-part de la juste valeur de l'actif net) à la date d'acquisition.",
        "Intérêts minoritaires (NCI) : inscrits au passif du bilan consolidé, représentent la part des actionnaires minoritaires dans les filiales sous contrôle.",
        "Impact en M&A : pour calculer l'Equity Value, on retire les intérêts minoritaires de l'EV. Et on ajoute la valeur des participations mises en équivalence (associates)."
      ],
      tip: "Piège classique : oublier les intérêts minoritaires dans le pont EV → Equity. C'est éliminatoire en entretien M&A."
    },
    {
      id: 41,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Quelle est la différence entre dépréciation et amortissement ?",
      explanation: "Question apparemment basique mais qui piège les candidats imprécis.",
      steps: [
        "Amortissement (depreciation pour actifs corporels, amortization pour incorporels) : étalement systématique du coût d'un actif sur sa durée d'utilité économique.",
        "Méthodes d'amortissement : linéaire (le plus courant), dégressif, par unités d'œuvre. Choix selon le rythme de consommation des avantages économiques.",
        "Dépréciation (impairment) : constatation comptable d'une perte de valeur EXCEPTIONNELLE et NON RÉCURRENTE d'un actif. Liée à un événement spécifique.",
        "Test de dépréciation (IAS 36) : déclenché par des indices (baisse du marché, changement réglementaire, sous-performance) ou annuel obligatoire pour le goodwill.",
        "Calcul d'impairment : si la valeur recouvrable (max entre valeur d'utilité et juste valeur − coûts de cession) < valeur nette comptable → dépréciation comptabilisée.",
        "Comptabilisation : amortissement = charge récurrente prévisible. Dépréciation = charge exceptionnelle, souvent retraitée (exclue de l'EBITDA ajusté).",
        "Réversibilité : les dépréciations sur actifs incorporels (hors goodwill) et corporels peuvent être reprises si la valeur recouvrable remonte. Le goodwill jamais (irréversible)."
      ],
      tip: "En M&A, les dépréciations sont retraitées en QoE pour calculer un EBITDA récurrent. C'est typiquement un add-back justifié."
    },
    {
      id: 42,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Comment auditer la qualité des revenus d'une cible ?",
      explanation: "Question pratique en TS. Aborde la fiabilité du chiffre d'affaires, élément central de toute valorisation.",
      steps: [
        "Étape 1 — Analyse de la concentration clients : top 10 clients en % du CA. Si >50%, risque de dépendance majeur. Vérifier l'ancienneté des relations et les contrats.",
        "Étape 2 — Récurrence du revenu : part du revenu contractuel récurrent vs one-shot, taux de churn, ARR (Annual Recurring Revenue) pour les SaaS, backlog pour les industries.",
        "Étape 3 — Reconnaissance du revenu (IFRS 15 / ASC 606) : vérifier la conformité de la comptabilisation, identifier les obligations de performance, analyser les contrats long-terme (POC, milestones).",
        "Étape 4 — Channel stuffing detection : analyse des DSO en évolution, des retours marchandises, des promotions de fin de trimestre, ventes en consignation.",
        "Étape 5 — Pricing analysis : évolution du prix moyen, mix produits, like-for-like vs new business, élasticité-prix observée.",
        "Étape 6 — Pipeline et carnet de commandes : pour valider la projection court terme, qualité des leads, taux de conversion historique.",
        "Étape 7 — Cohérence avec les indicateurs externes : croissance vs marché, parts de marché, fluctuations vs comparables.",
        "Red flags : croissance hors normes du CA en année N-1 avant la cession, allongement DSO, cancellation rate en hausse, dépendance à 1-2 clients, contrats non écrits."
      ],
      tip: "En cession, méfiance sur l'année N-1 ('cooked books'). Toujours regarder N-2, N-3 et le trend."
    },
    {
      id: 43,
      category: 'ts',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'un Cash-Free Debt-Free deal et comment ça fonctionne ?",
      explanation: "Mécanisme standard en M&A. Question avancée qui teste la compréhension fine des mécanismes de prix.",
      steps: [
        "Définition : 'Cash-Free Debt-Free' (CFDF) signifie que l'acquéreur achète l'entreprise comme si elle n'avait ni cash ni dette. Le prix négocié est l'Enterprise Value.",
        "Logique : l'acheteur paie la valeur opérationnelle. Si la cible a du cash, le vendeur le récupère ; si elle a de la dette, le vendeur la rembourse au closing.",
        "Calcul du prix payé (Equity Value) : EV (négocié) − Net Debt (réelle au closing) ± ajustement Working Capital normatif.",
        "Mécanisme au closing : le vendeur reçoit l'Equity Value calculée. Les dettes sont remboursées par le produit de cession (refinancement). Le cash de la cible reste dans la cible mais a été 'ajouté' au prix payé via la formule.",
        "Cas pratique : EV négociée = 100M€, Net Debt = 20M€ → Vendeur reçoit 80M€. Si Net Debt = -10M€ (cash net) → Vendeur reçoit 110M€.",
        "Pourquoi cette mécanique : permet de séparer la valeur business (négociée tôt dans le process) de la position bilancielle (qui peut bouger jusqu'au closing).",
        "Variantes : Locked Box (Net Debt fixée à une date passée, pas d'ajustement) vs Completion Accounts (Net Debt mesurée au closing, avec ajustement)."
      ],
      tip: "Astuce mnémotechnique : 'l'acquéreur paie le moteur (l'opérationnel), pas le réservoir (le cash) ni les dettes (le passif)'."
    },
    {
      id: 44,
      category: 'ma',
      difficulty: 'avancé',
      question: "Quelles sont les différentes structures de transaction (share deal vs asset deal) ?",
      explanation: "Question juridico-fiscale. Choix structurant qui impacte le prix, la fiscalité et le risque.",
      steps: [
        "Share Deal : acquisition des actions/parts de la société cible. L'entité juridique change de mains avec tous ses actifs ET passifs (connus et cachés).",
        "Avantages Share Deal : simplicité juridique, neutralité fiscale (pas de TVA), continuité des contrats clients/fournisseurs/salariés sans formalité.",
        "Inconvénients Share Deal : reprise de tout le passif (litiges, retraites, fiscal). Pas de step-up de la base fiscale des actifs (pas de re-amortissement).",
        "Asset Deal : acquisition de certains actifs (ou tous) et passifs ciblés. La société cédante reste la propriété du vendeur (souvent vidée de sa substance).",
        "Avantages Asset Deal : sélection précise du périmètre repris, pas de reprise des passifs cachés (sauf exceptions sociales/fiscales), step-up des actifs (re-amortissement = bouclier fiscal).",
        "Inconvénients Asset Deal : complexité juridique (transfert de chaque contrat individuellement), TVA, formalités sur les salariés (article L1224-1), parfois autorisations administratives.",
        "Préférences : vendeur préfère généralement le share deal (plus simple, fiscalité PV à long terme) ; acheteur préfère asset deal (sélection du périmètre, step-up).",
        "Compromis fréquent : carve-out (filialisation préalable de l'activité à céder), puis share deal sur la nouvelle entité dédiée."
      ],
      tip: "En France, la PV de cession de titres bénéficie souvent d'exonération (régime mère-fille avec quote-part de 12%) — favorise le share deal côté vendeur corporate."
    },


    // ===== QUESTIONS DESTABILISANTES / BRAINTEASERS =====
    {
      id: 45,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Combien de balles de tennis tiennent dans un Boeing 747 ?",
      explanation: "Brainteaser CULTE (Goldman Sachs, McKinsey). Pas de bonne réponse — l'évaluation porte sur la méthodologie, le calme et la structuration.",
      steps: [
        "Étape 1 — Clarifier les hypothèses (CRUCIAL) : « Inclut-on la soute ? Le Boeing est-il vide ou avec sièges ? On parle bien d'un 747 standard ? » Ne JAMAIS se lancer sans clarifier.",
        "Étape 2 — Estimer le volume du 747 : longueur ~70m, largeur cabine ~6m, hauteur ~2,5m. Volume cabine ≈ 70 × 6 × 2,5 = 1 050 m³. Avec soute ≈ 1 500 m³.",
        "Étape 3 — Convertir en cm³ : 1 m³ = 1 000 000 cm³. Donc 1 500 m³ = 1,5 × 10⁹ cm³.",
        "Étape 4 — Estimer le volume d'une balle de tennis : diamètre ≈ 6,5 cm. On simplifie en cube de 6,5 cm de côté = ~275 cm³ (plus simple que 4/3 πr³).",
        "Étape 5 — Calcul brut : 1,5 × 10⁹ / 275 ≈ 5,5 millions de balles.",
        "Étape 6 — Ajuster pour le packing : les balles sphériques ne remplissent pas 100% du volume (efficiency ~64% pour empilement aléatoire, 74% optimal). Application : 5,5M × 0,7 = ~3,8M balles.",
        "Étape 7 — Ajuster pour les sièges/équipements : retirer ~30% du volume si avion avec sièges. Soit ~2,7M balles.",
        "Réponse finale : « Environ 2 à 3 millions de balles, en fonction de la configuration et avec une efficacité d'empilement de ~70%. »"
      ],
      tip: "L'erreur fatale : se lancer sans clarifier les hypothèses. La 2e erreur : ne pas verbaliser son raisonnement à haute voix."
    },
    {
      id: 46,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Combien y a-t-il de stations-service à Paris ?",
      explanation: "Market sizing classique chez Goldman Sachs et BCG. Méthode Fermi en action.",
      steps: [
        "Étape 1 — Estimer la population de Paris : ~2,2 millions d'habitants intra-muros, ~10M en région IDF.",
        "Étape 2 — Estimer le nombre de voitures à Paris : ratio voiture/habitant ~0,4 à Paris (moins qu'en province à cause des transports en commun). Soit ~880 000 voitures.",
        "Étape 3 — Ajouter les non-résidents : voitures entrantes quotidiennes (banlieusards, livraisons, taxis) ≈ 30-40% de plus. Total potentiel : ~1,2M véhicules circulants.",
        "Étape 4 — Estimer la fréquence de plein : un automobiliste fait le plein tous les 10-14 jours, soit ~30 pleins par an. Total : 1,2M × 30 = 36M pleins/an dans Paris.",
        "Étape 5 — Estimer la capacité d'une station : ~150-200 pleins/jour en moyenne, soit ~60 000 pleins/an.",
        "Étape 6 — Calcul : 36M / 60 000 = 600 stations. Mais beaucoup d'automobilistes parisiens font le plein en banlieue (moins cher).",
        "Étape 7 — Ajustement : retenir ~30-40% des pleins faits intra-muros → 600 × 0,35 = ~200 stations.",
        "Réponse finale : « Environ 150 à 250 stations dans Paris intra-muros. » (réalité : ~80-100, donc surévaluation typique)."
      ],
      tip: "Le but n'est pas la précision mais la structuration logique. Annoncer chaque hypothèse + ordre de grandeur."
    },
    {
      id: 47,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "On a 12 boules identiques sauf une plus lourde. En 3 pesées, comment trouver la différente ?",
      explanation: "Énigme logique CULTE (Wall Street Oasis, banques d'affaires). Teste la pensée structurée et la décomposition de problème.",
      steps: [
        "Pesée 1 : diviser en 3 groupes de 4 boules. Peser groupe A vs groupe B.",
        "Cas A — Équilibre : la boule différente est dans le groupe C (les 4 non pesées).",
        "Cas B — Déséquilibre : la boule est dans le groupe le plus lourd (A ou B). On sait aussi qu'elle est plus lourde.",
        "Pesée 2 (cas A) : prendre 3 boules de C + 1 boule de A (référence, normale). Peser contre 4 boules normales (3 du groupe B + 1 de A).",
        "Si équilibre → la boule différente est la 4ème de C, non pesée. Pesée 3 : la peser contre une normale pour vérifier qu'elle est plus lourde.",
        "Si déséquilibre du côté C → la différente est parmi les 3 boules de C. Pesée 3 : peser 1 contre 1 → si équilibre, c'est la 3ème non pesée ; sinon c'est la plus lourde des deux.",
        "Pesée 2 (cas B) : prendre 3 boules du groupe lourd, peser 1 contre 1 (la 3ème de côté). Si équilibre → c'est la 3ème. Si déséquilibre → la plus lourde des deux.",
        "Variante 12 boules avec inconnu (plus lourde OU plus légère) : algorithme plus complexe (recherche YouTube 'Bongard balls problem')."
      ],
      tip: "Astuce : diviser par 3 (et pas 2) à chaque pesée. La balance donne 3 informations (gauche lourd / équilibre / droite lourd), pas 2."
    },
    {
      id: 48,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Bactérie qui double chaque minute, remplit un bocal en 1h. À quelle minute le bocal est-il à moitié plein ?",
      explanation: "Brainteaser sur le raisonnement exponentiel. Très posé en banque pour tester l'intuition mathématique.",
      steps: [
        "Piège : la réponse intuitive serait 30 minutes (la moitié de 60). C'est FAUX.",
        "Bonne réponse : 59 minutes. À la 59ème minute, le bocal est à moitié. Une minute plus tard (la 60ème), la quantité a doublé → bocal plein.",
        "Logique : si la population double chaque minute, alors juste avant le moment où elle remplit le bocal, elle occupe la moitié.",
        "Généralisation : un processus exponentiel double sa taille à chaque période. On peut en déduire qu'il atteint 25% à T-2, 12,5% à T-3, etc.",
        "Application en finance : croissance composée, intérêts cumulés, valorisation de startups. Les ordres de grandeur explosent vite.",
        "Question dérivée : 'Quel jour le bocal était-il à 1% rempli ?' Réponse : 60 − log₂(100) ≈ 60 − 6,6 = ~53ème minute."
      ],
      tip: "Le message profond : sous-estimer l'exponentiel est l'erreur cognitive #1 des humains (cf. effet du COVID, cf. le levier en LBO).",
      visual: 'exponential-growth'
    },
    {
      id: 49,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Combien de coiffeurs y a-t-il à New York ?",
      explanation: "Market sizing type Goldman Sachs. Évalue votre méthode Fermi sur un sujet B2C.",
      steps: [
        "Étape 1 — Population de NYC : ~8,5 millions d'habitants.",
        "Étape 2 — Fréquence de visite : un homme se fait couper les cheveux ~10x/an, une femme ~6x/an. Moyenne ~8 visites/an/personne.",
        "Étape 3 — Demande totale : 8,5M × 8 = 68M coupes/an.",
        "Étape 4 — Capacité d'un coiffeur : ~10 coupes/jour, ~250 jours/an, soit ~2 500 coupes/an/coiffeur.",
        "Étape 5 — Calcul brut : 68M / 2 500 = ~27 200 coiffeurs.",
        "Étape 6 — Ajustement : tous ne se font pas couper en salon (auto-coupe, à la maison). Retirer ~20% → ~22 000 coiffeurs.",
        "Étape 7 — Sanity check : avec 22 000 coiffeurs pour 8,5M habitants, 1 coiffeur pour 386 personnes. Réaliste.",
        "Réponse : « Environ 20 000 à 25 000 coiffeurs à New York. »"
      ],
      tip: "Astuce : toujours faire un sanity check à la fin. 'Est-ce que cet ordre de grandeur me semble plausible ?' "
    },
    {
      id: 50,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Quel angle forment les aiguilles d'une horloge à 15h15 ?",
      explanation: "Énigme géométrique reposée par Goldman Sachs en 2024. Piège classique sur le mouvement de l'aiguille des heures.",
      steps: [
        "Piège : la réponse intuitive est 0° (les deux aiguilles se croisent à 3 et 15). C'est FAUX.",
        "Pourquoi ? L'aiguille des heures n'est pas immobile entre 3h et 4h — elle se déplace progressivement.",
        "Calcul de l'aiguille des heures : à 15h00, elle est exactement sur 3 (90° depuis 12h). En 15 minutes, elle a parcouru 15/60 = 1/4 de l'arc entre 3 et 4.",
        "Or l'arc entre 3 et 4 = 30° (360°/12). Donc l'aiguille des heures à 15h15 est à 90° + (1/4 × 30°) = 97,5°.",
        "Aiguille des minutes : à xx:15, elle pointe sur le 3 → 90° depuis 12h.",
        "Différence : 97,5° − 90° = 7,5°.",
        "Réponse finale : 7,5° entre les deux aiguilles à 15h15.",
        "Formule générale : |30H − 5,5M| où H = heure (en 12h) et M = minutes."
      ],
      tip: "Le piège géométrique préféré des recruteurs. Comprendre que l'aiguille des heures bouge en continu = test du raisonnement fin.",
      visual: 'clock-angle'
    },
    {
      id: 51,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Vous avez 100 boules (50 noires, 50 blanches) et 2 seaux. Comment maximiser la probabilité de tirer une blanche ?",
      explanation: "Brainteaser de probabilité conditionnelle. Très posé en hedge funds et trading.",
      steps: [
        "Règle du jeu : on choisit aléatoirement un seau, puis on tire une boule au hasard dans ce seau. Comment répartir les boules pour maximiser P(blanche) ?",
        "Réponse intuitive (équilibrée) : 25 noires + 25 blanches dans chaque seau. P(blanche) = 50%.",
        "Bonne réponse : mettre 1 seule boule blanche dans le seau A, et toutes les autres (49 blanches + 50 noires) dans le seau B.",
        "Calcul : P(blanche) = P(seau A) × P(blanche | A) + P(seau B) × P(blanche | B).",
        "P(blanche) = 0,5 × (1/1) + 0,5 × (49/99) = 0,5 + 0,247 ≈ 74,7%.",
        "Logique : en isolant 1 boule blanche dans un seau, on garantit 50% de chance de tirer cette blanche (seau A choisi). Et même dans l'autre seau, on a presque 50% de blanches.",
        "Symétrie inverse : pour MINIMISER, on ferait l'inverse (1 boule noire seule). P = ~25%.",
        "Application en finance : illustre le principe de concentration vs diversification — concentrer ses paris peut maximiser le rendement attendu."
      ],
      tip: "Question préférée des hedge funds. Si on vous la pose, c'est qu'on cherche un trader, pas un analyste."
    },
    {
      id: 52,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Quel est le carré de 27 ? (sans calculatrice, en moins de 30 secondes)",
      explanation: "Question de calcul mental Goldman Sachs. Teste votre vivacité et vos techniques de calcul rapide.",
      steps: [
        "Méthode 1 — Identité remarquable : (a+b)² = a² + 2ab + b². 27² = (25+2)² = 625 + 100 + 4 = 729.",
        "Méthode 2 — Décomposition : 27² = 27 × 27 = 27 × (30 − 3) = 810 − 81 = 729.",
        "Méthode 3 — (a−b)(a+b) trick : 27² = (27−3)(27+3) + 3² = 24 × 30 + 9 = 720 + 9 = 729.",
        "Vérification rapide : 27 × 27, dernier chiffre = 7×7 = 49 → finit par 9. Ordre de grandeur : 25² = 625, 30² = 900. Donc 27² entre les deux. → 729 cohérent.",
        "Question piège fréquente : 'Quel est le plus proche : 600, 700 ou 800 ?' → 700 (en fait 729).",
        "Astuces utiles à mémoriser : 25² = 625, 35² = 1225, 45² = 2025, 50² = 2500, 75² = 5625.",
        "Technique 'milieu de 5' : (n5)² = n × (n+1) puis on colle 25. Ex : 25² = 2×3 = 6, donc 625. 35² = 3×4 = 12, donc 1225."
      ],
      tip: "Entraînez-vous au calcul mental tous les jours — ils testent ça pour voir comment vous gérez la pression."
    },
    {
      id: 53,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Vous êtes en finale d'un jeu : 3 enveloppes (1 offre, 2 refus). Vous en choisissez une. L'intervieweur en élimine une qui contenait un refus. Vous changez ou pas ?",
      explanation: "Le célèbre 'Monty Hall problem'. Question de probabilité conditionnelle qui prend toujours au piège.",
      steps: [
        "Réponse intuitive : 50/50, donc peu importe. C'est FAUX.",
        "Bonne réponse : il faut TOUJOURS changer. La probabilité de gagner passe de 1/3 à 2/3.",
        "Démonstration : à l'origine, vous avez choisi 1 enveloppe sur 3. Probabilité d'avoir l'offre = 1/3. Probabilité que l'offre soit dans les 2 autres = 2/3.",
        "Quand l'intervieweur élimine 1 des 2 autres (en sachant laquelle contient l'offre), il concentre la probabilité 2/3 sur la SEULE enveloppe restante.",
        "Donc : votre choix initial = 1/3 de chance. La dernière enveloppe restante = 2/3 de chance. CHANGEZ.",
        "Démonstration empirique : sur 100 essais, vous gagnerez en moyenne 33x si vous restez, 67x si vous changez. Vérifiable par simulation Monte Carlo.",
        "Clé du paradoxe : l'information apportée par l'intervieweur n'est pas neutre — il SAIT où est l'offre, ce qui change la distribution.",
        "Variante 100 enveloppes : choisissez 1 sur 100 (1% de chance). L'intervieweur en élimine 98. Votre choix initial = 1%. L'enveloppe restante = 99%. Changez !"
      ],
      tip: "Si on vous pose le Monty Hall, le piège est la rapidité de réponse. Ne foncez pas — expliquez la logique conditionnelle.",
      visual: 'monty-hall'
    },
    {
      id: 54,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Comment obtenir 4L d'eau avec un seau de 5L et un seau de 3L ?",
      explanation: "Énigme logique très posée en banque (et dans Die Hard 3). Teste votre capacité à résoudre par étapes.",
      steps: [
        "Solution 1 (la plus rapide) :",
        "Étape 1 : remplir le seau de 5L à ras bord.",
        "Étape 2 : verser dans le seau de 3L jusqu'à le remplir. Il reste 2L dans le 5L.",
        "Étape 3 : vider le seau de 3L. Verser les 2L du 5L dans le 3L (qui contient maintenant 2L).",
        "Étape 4 : remplir à nouveau le 5L à ras bord.",
        "Étape 5 : verser du 5L dans le 3L (qui ne peut accueillir qu'1L de plus). Il reste exactement 4L dans le 5L. Bingo.",
        "Solution 2 (alternative) : remplir le 3L, le verser dans le 5L. Re-remplir le 3L, verser dans le 5L jusqu'à le remplir (il reste 1L dans le 3L). Vider le 5L, transférer le 1L du 3L vers le 5L. Remplir le 3L, le verser dans le 5L → 4L.",
        "Application : raisonnement par états successifs, technique utile en programmation et en optimisation."
      ],
      tip: "Énoncez chaque étape à voix haute en entretien. Les recruteurs veulent voir le raisonnement séquentiel, pas juste la solution."
    },
    {
      id: 55,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Quel est le chiffre d'affaires du rayon cyclisme de Decathlon en France ?",
      explanation: "Market sizing type ENPC / Polytechnique. Sizing B2C avec plusieurs étapes de raisonnement.",
      steps: [
        "Étape 1 — Population française : ~67M habitants. Taux de cyclistes (vélo régulier) : ~30%, soit ~20M.",
        "Étape 2 — Fréquence d'achat : on change de vélo tous les ~7-10 ans, donc 10% renouvellent par an = 2M acheteurs/an.",
        "Étape 3 — Panier moyen vélo : ~400-500€ chez Decathlon (entrée/milieu de gamme). Total marché vélo neuf : ~2M × 450€ = 900M€/an.",
        "Étape 4 — Part de marché Decathlon en cyclisme : leader national, ~25-30% des ventes vélos = ~250M€ pour les vélos seuls.",
        "Étape 5 — Accessoires & équipement : casques, vêtements, pièces, entretien. ~50% du CA vélo additionnels → +125M€.",
        "Étape 6 — Ajout des vélos enfants, BMX, draisiennes : marché conséquent (~30% des achats), souvent oublié → +75M€.",
        "Étape 7 — Total estimé pour le rayon cyclisme Decathlon France : ~450-500M€/an.",
        "Sanity check : Decathlon France réalise ~5-6Md€ de CA total. 450M€ = ~8% du CA, plausible pour un rayon majeur."
      ],
      tip: "Quand on vous demande un CA, structurez en : Marché total → Part de marché → CA. Ne sortez jamais un chiffre sans démonstration."
    },
    {
      id: 56,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Combien je suis prêt à payer pour jouer à un jeu où je tire un dé jusqu'à un 6 et gagne 100€ × le nombre de tirs ?",
      explanation: "Question d'arbitrage probabiliste posée en M&A et trading. Calcul d'espérance mathématique.",
      steps: [
        "Définir le gain attendu : E(Gain) = 100€ × E(N), où N = nombre de tirs avant un 6.",
        "Modélisation : N suit une loi géométrique de paramètre p = 1/6 (probabilité de tirer un 6).",
        "Espérance d'une loi géométrique : E(N) = 1/p = 6. Donc E(Gain) = 100 × 6 = 600€.",
        "Premier raisonnement : on serait prêt à payer jusqu'à 600€ (notre 'fair value').",
        "Aversion au risque : un investisseur risk-averse paiera moins que l'espérance, car la variance est élevée. La distribution est très étalée (parfois 1 tir, parfois 30+).",
        "Variance d'une loi géométrique : Var(N) = (1−p)/p² = (5/6)/(1/36) = 30. Écart-type ≈ 5,5. Volatilité importante.",
        "En finance comportementale : un risk-averse paiera plutôt 400-500€. Un risk-neutre paiera 600€. Un risk-loving paiera plus.",
        "Twist : si on doit payer AVANT de jouer une seule fois (jeu unique), on est en gestion du risque pure. Si on peut jouer 1000 fois, la loi des grands nombres assure E(Gain) = 600€/partie."
      ],
      tip: "En entretien, énoncez les 3 niveaux : valeur attendue (600€), prise en compte du risque (400-500€), nuance selon répétition."
    },
    {
      id: 57,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Pile d'1€ = haut de la Tour Eiffel. Combien d'argent dans la pile ?",
      explanation: "Estimation type 'Heard on the Street'. Combine géométrie et calcul mental.",
      steps: [
        "Étape 1 — Hauteur de la Tour Eiffel : 330m = 33 000 cm.",
        "Étape 2 — Épaisseur d'une pièce de 1€ : ~2 mm = 0,2 cm.",
        "Étape 3 — Nombre de pièces : 33 000 / 0,2 = 165 000 pièces de 1€.",
        "Étape 4 — Valeur totale : 165 000 × 1€ = 165 000€.",
        "Étape 5 — Sanity check : ordre de grandeur de la centaine de milliers d'euros. Plausible pour une tour de 330m.",
        "Variante 'pièces de 2€' : épaisseur similaire (~2,2 mm) → ~150 000 × 2 = ~300 000€.",
        "Variante 'billets de 50€' : épaisseur ~0,1 mm → 3 300 000 billets = 165M€. Choquant !",
        "Leçon : les ordres de grandeur peuvent surprendre. Toujours faire le calcul plutôt que d'estimer 'à l'œil'."
      ],
      tip: "Les recruteurs adorent ce type de question car elle révèle votre maîtrise des unités et du calcul mental sous pression."
    },
    {
      id: 58,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Quels sont vos défauts ? (question fit déstabilisante)",
      explanation: "Question piège déstabilisante. La 'mauvaise' réponse est éliminatoire dans 80% des cas. À préparer absolument.",
      steps: [
        "Erreur fatale 1 : la fausse modestie déguisée. « Je suis perfectionniste / trop bosseur / trop exigeant. » → cliché identifié immédiatement, signal de manque de self-awareness.",
        "Erreur fatale 2 : un défaut éliminatoire. « Je suis fainéant, impulsif, désorganisé, mauvais en chiffres. » → vous vous tirez une balle dans le pied.",
        "Bonne approche : choisir un VRAI défaut, mais 'gérable' et idéalement transformable en force dans le contexte.",
        "Exemples acceptables (M&A/PE) : « J'ai du mal à déléguer, je préfère vérifier moi-même les modèles » → montre rigueur. « Je suis très focus sur les détails, parfois au détriment du big picture » → adapté à un junior. « J'accepte difficilement la critique sur le moment, mais j'y reviens à froid pour m'améliorer ».",
        "Structure idéale : (1) Énoncer le défaut clairement, (2) Donner un exemple concret, (3) Expliquer comment vous travaillez à l'améliorer.",
        "Ton : honnête, posé, sans dramatiser. La sincérité prime sur la perfection.",
        "À éviter ABSOLUMENT : « Je n'ai pas vraiment de défauts » (arrogance), « C'est dur de répondre à cette question » (esquive), citer 5 défauts (auto-sabotage)."
      ],
      tip: "Préparer 2-3 défauts solides AVANT l'entretien. Cette question tombe dans 60% des entretiens — l'improvisation est suicidaire."
    },
    {
      id: 59,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Pourquoi devrions-nous vous embaucher plutôt qu'un autre candidat ?",
      explanation: "Question fit déstabilisante posée en final round. Test de confiance, de self-awareness et d'argumentation commerciale.",
      steps: [
        "Erreur 1 : l'arrogance. « Parce que je suis le meilleur » sans démonstration → red flag immédiat.",
        "Erreur 2 : l'auto-déprécation. « Je ne sais pas, vous êtes mieux placé que moi pour juger » → manque de confiance, éliminatoire en M&A.",
        "Erreur 3 : la liste générique. « Je suis motivé, rigoureux, travailleur » → indistinguable de tout autre candidat.",
        "Bonne approche : identifier 2-3 atouts spécifiques + différenciants + alignés avec les besoins du poste.",
        "Structure recommandée : (1) Compétences techniques rares ou pertinentes (modèle Excel, langues, secteur), (2) Expériences concrètes qui démontrent ces compétences, (3) Soft skills illustrés par exemples.",
        "Exemple solide : « Trois choses : ma maîtrise du DCF/LBO démontrée par mon stage chez X, mon expérience sectorielle [tech/santé/industrie] qui correspond à votre dealflow, et ma capacité de travail en équipe sous pression confirmée par [exemple]. »",
        "Toujours conclure par : « Mais je serai aussi le premier à reconnaître que d'autres candidats ont d'autres forces. Ce que je peux promettre, c'est ma motivation et mon engagement. »",
        "Ton : assertif sans arrogance, factuel, orienté valeur ajoutée pour l'équipe."
      ],
      tip: "Préparer 3 atouts différenciants AVANT. Si vous galérez à les identifier, c'est que votre candidature manque de positionnement."
    },
    {
      id: 60,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Pitchez-moi un deal récent qui vous a marqué",
      explanation: "Question incontournable en M&A senior. Test de la veille, de la compréhension stratégique et de la capacité à structurer un récit.",
      steps: [
        "Préparation : avoir 2-3 deals récents en stock (1 large cap, 1 mid cap, 1 sectoriel pour montrer la variété). Avoir lu Les Échos, Mergermarket, FT.",
        "Structure de pitch (2-3 minutes max) : (1) Contexte et acteurs, (2) Rationale stratégique, (3) Termes clés (prix, multiples), (4) Votre opinion personnelle.",
        "Étape 1 — Présentation des parties : 'En [date], [acquéreur] a annoncé l'acquisition de [cible] pour [prix]. L'acquéreur est [description courte]. La cible est [description courte].'",
        "Étape 2 — Rationale : 'L'opération a une logique [stratégique/financière]. Elle permet à l'acquéreur de [synergies, accès marché, intégration verticale, défense concurrentielle].'",
        "Étape 3 — Métriques clés : multiple EV/EBITDA payé, comparable avec les transactions récentes, prime payée sur le cours de bourse, mode de financement (cash/actions/dette).",
        "Étape 4 — Conseils & process : qui conseille (banques M&A) et pourquoi, type de process (auction, gré-à-gré), antitrust et risques.",
        "Étape 5 — Votre opinion : 'À titre personnel, je trouve cette opération intéressante car [argument]. En revanche, le risque principal est [argument].'",
        "Erreurs à éviter : citer un deal sans connaître les chiffres, prendre une opinion non argumentée, choisir un deal trop ancien (>1 an)."
      ],
      tip: "Choisir un deal lié au secteur de la banque interviewée (un deal santé pour Bryan Garnier, un large cap pour Goldman) montre votre research."
    },
    {
      id: 61,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Pourquoi le M&A et pas le Private Equity (ou vice versa) ?",
      explanation: "Question piège déstabilisante. La réponse révèle votre compréhension réelle des métiers et votre cohérence.",
      steps: [
        "Piège 1 : dénigrer l'autre métier. « Le PE c'est trop calme. » → vous insultez les anciens et les futurs interlocuteurs PE.",
        "Piège 2 : la motivation financière. « Le PE paie mieux. » → faux et choquant.",
        "Piège 3 : la réponse vague. « Les deux sont intéressants. » → manque de conviction.",
        "Bonne approche M&A : conseil, diversité des deals (multiples sectors, multiples deals/an), apprentissage rapide en début de carrière, exposure aux décideurs, fast-paced, stimulation intellectuelle.",
        "Bonne approche PE : ownership, perspective long terme (3-5 ans), analyse stratégique approfondie, opérationnel + finance, alignement d'intérêts (carry).",
        "Structure recommandée : (1) Reconnaître les forces de l'autre métier, (2) Expliquer votre alignement personnel avec celui choisi, (3) Donner un exemple concret tiré de votre expérience.",
        "Exemple solide M&A : 'Le PE m'attire par son côté investisseur, mais je veux d'abord développer une expertise large via le M&A : voir 10-15 deals/an dans différents secteurs avant de me spécialiser plus tard.'",
        "Cohérence avec le reste de l'entretien : ne pas dire 'M&A pour la diversité' puis ne postuler qu'à des banques spécialisées en healthcare."
      ],
      tip: "Beaucoup de candidats commencent en M&A puis basculent en PE. Vous pouvez l'évoquer comme trajectoire long-terme — montre la maturité."
    },
    {
      id: 62,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Si vous étiez un actif financier, lequel seriez-vous ?",
      explanation: "Question OVNI. Teste la créativité, la self-awareness, et la capacité à se vendre sous un angle inattendu.",
      steps: [
        "Erreur : prendre la question au premier degré et hésiter 30 secondes. Le silence vous coûte.",
        "Erreur : choisir un actif risqué non assumé. 'Je serais une crypto' → image instable, peu sérieuse pour M&A.",
        "Bonne approche : choisir un actif qui reflète VOS qualités, justifier en 30 secondes, garder le sourire.",
        "Exemple 'obligation investment grade' : 'Stable, fiable, performance constante, faible volatilité, pilier d'un portefeuille. C'est ce que j'aime offrir à une équipe.'",
        "Exemple 'option call' : 'Optionalité forte, capacité d'adaptation, potentiel d'upside. Mais aussi conscience que l'exercice demande du timing et du jugement.'",
        "Exemple 'small cap value' : 'Sous-estimée à première vue, mais avec des fondamentaux solides et un potentiel de revalorisation significatif si on prend le temps de me connaître.'",
        "Exemple 'ETF diversifié' : 'Polyvalent, expositions multiples, capacité à m'adapter aux différentes thématiques sans perdre de vue les fondamentaux.'",
        "Clé : justification en 2-3 phrases, ton décontracté, lier au poste."
      ],
      tip: "Préparer 1-2 réponses AVANT. Sortir un 'Eurodollar future' bien justifié peut faire mouche en trading floor."
    },
    {
      id: 63,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Si je vous dis non à toutes vos questions techniques, vous faites quoi ?",
      explanation: "Question cruelle posée en final round, parfois après 30 minutes de questions. Test de résilience et de self-awareness.",
      steps: [
        "Piège 1 : s'effondrer ou s'excuser. « Je suis désolé, j'ai dû mal réviser. » → vous montrez votre fragilité.",
        "Piège 2 : nier en bloc. « Mais j'ai bon, je vais vous le démontrer. » → arrogance.",
        "Bonne approche : garder son calme, analyser, demander un feedback constructif, montrer votre capacité à rebondir.",
        "Réponse type : « Si c'est le cas, j'aimerais comprendre où mon raisonnement a péché. Pouvez-vous me donner un exemple concret ? Je suis là aussi pour apprendre. »",
        "Variante plus offensive : « Je trouve cela surprenant car j'ai préparé sérieusement, mais je suis ouvert à votre feedback. Si je me suis trompé sur certains points, je voudrais en tirer les leçons pour la suite. »",
        "Pourquoi ça marche : montre maturité émotionnelle, ouverture à la critique, capacité d'apprentissage — qualités essentielles en M&A.",
        "Bonus : terminer par une note positive. « Quel que soit le résultat, j'ai beaucoup appris durant cet entretien. Merci pour vos questions exigeantes. »",
        "Réalité : souvent le recruteur teste votre réaction face à une fausse mise en cause. Beaucoup d'embauches se font après cette question."
      ],
      tip: "Cette question est un test psychologique pur. La réponse parfaite : composure, demande de feedback, sourire."
    },
    {
      id: 64,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Combien de cigarettes sont vendues aux États-Unis chaque année ?",
      explanation: "Market sizing classique en investment banking. Méthode top-down standard.",
      steps: [
        "Étape 1 — Population US : ~330M habitants.",
        "Étape 2 — Population adulte (>18 ans) : ~75% = ~250M.",
        "Étape 3 — Taux de fumeurs : ~12-13% des adultes US fument quotidiennement (en baisse depuis 30 ans). Soit ~30M fumeurs.",
        "Étape 4 — Consommation moyenne par fumeur : ~15 cigarettes/jour (un peu moins d'1 paquet de 20). Soit ~5 500 cigarettes/an/personne.",
        "Étape 5 — Consommation totale : 30M × 5 500 = ~165 milliards de cigarettes/an aux US.",
        "Étape 6 — Vérification : marché US du tabac ≈ 80Md$. Prix moyen paquet ~8$ (avec taxes), soit 0,40$/cigarette. 80Md$ / 0,40$ = 200Md cigarettes. Cohérent avec notre estimation.",
        "Réponse finale : « Environ 150 à 200 milliards de cigarettes vendues par an aux États-Unis. »",
        "Bonus : le marché US a chuté de 50% en 25 ans (vs ~600Md cigarettes/an dans les années 1980). Trend baissier structurel."
      ],
      tip: "Pour les market sizings, toujours faire un sanity check par une seconde méthode (top-down + bottom-up)."
    },
    {
      id: 65,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Combien pèse un Boeing 747 ?",
      explanation: "Estimation type Heard on the Street. Pas de connaissance préalable requise — pure logique.",
      steps: [
        "Étape 1 — Ne pas paniquer. Reconnaître qu'on ne sait pas, mais qu'on peut estimer.",
        "Étape 2 — Décomposer le poids : structure (avion vide) + carburant + passagers + bagages + cargo.",
        "Étape 3 — Capacité passagers : ~400 passagers × ~80 kg (avec bagage cabine) = 32 tonnes.",
        "Étape 4 — Bagages en soute : ~400 × 20 kg = 8 tonnes.",
        "Étape 5 — Carburant : un 747 fait Paris-NY avec ~150 tonnes de kérosène (long-courrier). Énorme, c'est souvent le poste #1.",
        "Étape 6 — Structure (avion vide) : on peut estimer en pensant à la taille (70m × 60m envergure) → ~180-200 tonnes.",
        "Étape 7 — Total au décollage : 32 + 8 + 150 + 200 ≈ 390 tonnes.",
        "Réponse finale : « Environ 350-400 tonnes au décollage. » (réalité : MTOW d'un 747-400 = 397t, on est précis !)"
      ],
      tip: "Décomposer en 'briques' indépendantes : c'est la méthode Fermi. Mieux vaut 4 estimations bonnes qu'une réponse devinée."
    },
    {
      id: 66,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Une corde fait le tour de la Terre. On rajoute 1 mètre. La corde flotte à quelle hauteur du sol ?",
      explanation: "Brainteaser géométrique contre-intuitif posé chez Goldman et JPM. Test du raisonnement vs intuition.",
      steps: [
        "Intuition naïve : 1m sur 40 000 km de circonférence terrestre → la hauteur doit être infinitésimale.",
        "Calcul : circonférence d'un cercle = 2πR. Si on rajoute 1m → nouvelle circonférence = 2πR + 1.",
        "Le nouveau rayon R' satisfait : 2πR' = 2πR + 1, donc R' = R + 1/(2π).",
        "Hauteur de flottement : R' − R = 1/(2π) ≈ 0,159 m = 15,9 cm.",
        "Le résultat est INDÉPENDANT du rayon initial : qu'on entoure la Terre, le Soleil ou une orange, ajouter 1m fait flotter à 16 cm.",
        "Démonstration : l'écart de hauteur dépend uniquement de la longueur ajoutée, pas du rayon initial. Surprenant mais mathématiquement évident.",
        "Application en finance : illustre l'importance des modèles vs intuition. Beaucoup de phénomènes financiers sont contre-intuitifs (volatilité, corrélation, effet Monte Carlo)."
      ],
      tip: "Cette question révèle ceux qui font confiance aux maths vs ceux qui suivent leur intuition. En M&A, les maths gagnent."
    },
    {
      id: 67,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Pourquoi voulez-vous travailler chez nous ?",
      explanation: "Question fit fondamentale. La pire réponse est générique. Les bons candidats font leurs devoirs.",
      steps: [
        "Erreur 1 : la réponse générique. « Vous êtes une banque/cabinet leader, je veux apprendre. » → mort instantanée.",
        "Erreur 2 : le compliment vide. « Vous avez une excellente réputation. » → tout le monde dit ça.",
        "Erreur 3 : la liste exhaustive. Citer 10 raisons sans hiérarchie ni profondeur.",
        "Bonne approche : 3 raisons spécifiques, alignées avec le poste, illustrées par des éléments concrets (deals, équipe, culture).",
        "Raison 1 — Spécialité/positionnement : « Votre positionnement leader sur les mid-caps françaises [ex : Bryan Garnier en healthcare, Messier sur le large cap] correspond à mon intérêt pour ce segment. »",
        "Raison 2 — Deal récent ou expertise : « J'ai été particulièrement marqué par votre advisory sur [deal X]. Ce type d'opération [type] est exactement ce sur quoi je veux travailler. »",
        "Raison 3 — Personnes/culture : « J'ai discuté avec [nom d'un junior ou alumni], qui m'a parlé de [valeur culturelle] : la formation des juniors / la diversité des deals / l'autonomie / la qualité du dealflow. »",
        "Conclure par votre projection : « Et à long terme, je vois [banque] comme la meilleure plateforme pour développer une expertise en [secteur/type de deals]. »"
      ],
      tip: "Toujours mentionner le nom d'un alumni que vous avez contacté. Ça prouve que vous avez fait du networking, valorisé en M&A."
    },
    {
      id: 68,
      category: 'valuation',
      difficulty: 'avancé',
      question: "Pourquoi un acquéreur stratégique paie-t-il généralement plus qu'un acquéreur financier ?",
      explanation: "Question fondamentale qui teste la compréhension des dynamiques d'enchères et de la création de valeur.",
      steps: [
        "Synergies de revenus et de coûts : un industriel peut intégrer la cible (cross-selling, économies d'échelle, suppression de doublons), un fonds PE non.",
        "Horizon de détention : un strategic investit pour le long terme (intégration permanente), un PE doit revendre dans 4-7 ans avec un TRI cible.",
        "Coût du capital : un strategic a souvent un WACC plus faible (corporate, accès à dette cheap), un fonds PE a un coût des fonds propres élevé (TRI cible 20-25%).",
        "Discipline de prix : les fonds PE ont des limites strictes (multiples maximum, TRI minimum) ; les strategics sont parfois prêts à payer pour des considérations stratégiques (défense, accès marché).",
        "Effet de levier : les fonds PE financent à 50-70% par dette, donc le prix payé est limité par la capacité d'endettement. Les strategics peuvent payer en cash ou actions sans contrainte.",
        "Cas exception : sur des cibles très techniques ou en restructuration, un PE spécialisé peut surenchérir un strategic non-expert.",
        "Empiriquement : les transactions strategics se font typiquement à 10-25% au-dessus des transactions PE pour des cibles comparables."
      ],
      tip: "Le PE compense par la rapidité d'exécution et la flexibilité (pas de validation board, pas de risque antitrust complexe)."
    },
    {
      id: 69,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Comment fonctionne un Management Equity Plan (MEP) ?",
      explanation: "Question de structuration en LBO. Maîtriser le MEP est différenciant en entretien PE.",
      steps: [
        "Définition : package d'intéressement pour le management de la cible, leur permettant de co-investir aux côtés du fonds PE et de toucher un upside en cas de succès.",
        "Objectif : aligner les intérêts du management avec ceux du fonds. Le management devient quasi-actionnaire.",
        "Composantes : (1) Sweet equity (actions ordinaires à prix réduit), (2) Ratchet (mécanisme de redistribution selon le TRI atteint), (3) Co-investissement (cash personnel du management).",
        "Sweet Equity : actions à un prix très bas, dilution du sponsor en cas de hausse de la valeur. Permet un effet de levier sur l'investissement perso du management.",
        "Mécanisme du ratchet : si TRI > seuil 1 (souvent 8-12%), le management récupère X% des actions ordinaires. Si TRI > seuil 2 (15-20%), il récupère Y% supplémentaires.",
        "Ticket personnel : le management investit son propre cash (souvent 1-3 ans de salaire). Ce 'skin in the game' est crucial pour les fonds.",
        "Vesting : les actions s'acquièrent dans le temps (typiquement 4 ans) avec leaver clauses (good leaver / bad leaver) pour retenir le management.",
        "Fiscalité : la plus-value sur ces actions est généralement taxée comme plus-value mobilière (régime favorable) plutôt que comme rémunération salariale (à condition de vrais risques)."
      ],
      tip: "Un bon MEP fait gagner au top management 5-15M€ sur un deal réussi — c'est ce qui motive les CEO de cibles LBO."
    },
    {
      id: 70,
      category: 'ts',
      difficulty: 'avancé',
      question: "Comment évalue-t-on la qualité du business plan d'une cible ?",
      explanation: "Question pratique en TS / DD. Le business plan est l'élément le plus contesté en M&A.",
      steps: [
        "Étape 1 — Cohérence interne : les hypothèses (volumes, prix, marges, CAPEX, BFR) doivent être cohérentes entre elles. Une croissance volumique forte sans CAPEX additionnel = drapeau rouge.",
        "Étape 2 — Cohérence avec l'historique : la croissance prévue doit être justifiée par rapport au passé. Un saut soudain (de 5% à 20% de croissance) doit être expliqué par des leviers spécifiques.",
        "Étape 3 — Benchmarks externes : croissance du marché, croissance des comparables. Surperformer durablement le marché de 10pts/an n'est pas crédible sans avantage compétitif structurel.",
        "Étape 4 — Granularité : projeter par produit, géographie, segment client. Un BP top-down (CA × marge) est moins crédible qu'un BP bottom-up (volume × prix par segment).",
        "Étape 5 — Hypothèses de marges : cohérence avec le mix produit, l'inflation des coûts, la pression compétitive. Une expansion de marge de 500 bps en 5 ans nécessite une démonstration solide.",
        "Étape 6 — CAPEX et BFR : oubliés ou sous-estimés dans 80% des BP de vendeurs. Vérifier l'adéquation CAPEX/croissance et BFR/CA.",
        "Étape 7 — Sensibilités : tester des scénarios stressés (downside) en variant 2-3 hypothèses clés. Si le scénario downside reste solide → cible attractive.",
        "Étape 8 — Track record : comparer les BP historiques aux résultats réels. Un management qui sur-promet en BP n-1 et sous-livre = red flag majeur."
      ],
      tip: "Adage en DD : 'Business plans are usually wrong. The question is by how much, and in which direction.' Toujours sceptique, jamais cynique."
    },
    {
      id: 71,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Pourquoi y a-t-il des deals qui échouent au signing ou au closing ?",
      explanation: "Question de process M&A. Permet de tester votre connaissance des risques d'exécution.",
      steps: [
        "Cause 1 — Désaccord sur le prix : déclenchement après DD (découvertes négatives), divergence sur le BFR normatif ou le Net Debt, mauvaise interprétation des EBITDA add-backs.",
        "Cause 2 — Découvertes en DD : passifs cachés (litiges, fiscal, environnemental), surestimation du business plan, dégradation des résultats récents.",
        "Cause 3 — Financement : refus des banques de financer (covenants trop tendus, market conditions), volatilité des marchés actions/dette qui rend le deal inadéquat.",
        "Cause 4 — Antitrust / autorités : refus de la commission européenne (ex : Siemens-Alstom 2019), CFIUS aux US, autorités sectorielles.",
        "Cause 5 — Concurrence d'enchères : un acheteur fait monter les prix, l'acheteur initial se retire pour éviter la malédiction du gagnant.",
        "Cause 6 — MAC clause : invocation suite à un événement défavorable (COVID, recession, perte client majeur).",
        "Cause 7 — Disagreement sur les garanties : étendue des reps & warranties, capping, durée. Sujet sensible en mid-cap.",
        "Cause 8 — Politique interne : changement de management côté acquéreur, refus du board, opposition syndicale ou actionnariale."
      ],
      tip: "Statistique : ~10-15% des deals annoncés au signing n'atteignent pas le closing. Plus le deal est gros et international, plus le risque augmente."
    },
    {
      id: 72,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Si je dépense 100€ en CAPEX, qu'est-ce qui se passe sur les 3 états financiers ?",
      explanation: "Exercice CULTE en M&A. À maîtriser en 30 secondes top chrono. Si vous le ratez, l'entretien est terminé.",
      steps: [
        "Hypothèses : amortissement linéaire sur 5 ans (donc 20€/an), taux d'IS 25%.",
        "Compte de résultat (année 1) : D&A augmente de 20€ → EBIT diminue de 20€ → Net Income diminue de 20 × (1−0,25) = 15€.",
        "Bilan (au moment de l'achat) : Cash diminue de 100€ (paiement), Immobilisations augmentent de 100€. Total bilan inchangé. Equity inchangé à T=0.",
        "Bilan (fin année 1) : Immobilisations nettes = 100 − 20 = 80€. Cash : −100 + 5 (économie d'impôt) = −95€. Equity : −15€ (impact net income). Total bilan diminue de 15€.",
        "Tableau des flux (année 1) : CFO = +5€ (Net Income −15 + D&A 20 = +5). CFI = −100€. CFF = 0€. ΔCash total = −95€.",
        "Vérification : la variation de cash (−95€) correspond bien à la variation du poste cash au bilan. Cohérent !",
        "Logique économique : on a sorti 100€ de cash, mais on récupère progressivement 5€/an d'économie d'impôt grâce à l'amortissement (tax shield)."
      ],
      tip: "Variantes courantes : 100€ de stock, 100€ de provision, 100€ d'augmentation du salaire CEO. Entraînez-vous à toutes."
    },
    {
      id: 73,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Quelle est la différence entre un Buy-side TS et un Sell-side TS ?",
      explanation: "Question de positionnement métier en TS. Permet de comprendre les enjeux et angles d'approche différents.",
      steps: [
        "Buy-side TS : commandé par l'acquéreur (industriel ou fonds PE) pour valider une cible avant l'acquisition.",
        "Sell-side TS (VDD) : commandé par le vendeur en amont pour préparer la cession et faciliter la due diligence des acquéreurs.",
        "Périmètre Buy-side : focus sur la validation des hypothèses du vendeur, la détection de risques cachés, la quantification des synergies, l'anticipation post-merger.",
        "Périmètre Sell-side : focus sur la mise en valeur des forces, l'anticipation des objections d'acquéreurs, la justification des add-backs, le packaging financier.",
        "Posture Buy-side : sceptique, contradictoire, focus sur les risques. 'Que peut-il y avoir de caché ?'",
        "Posture Sell-side : constructive, valorisante, focus sur les opportunités. 'Comment maximiser la perception de valeur ?'",
        "Livrables similaires : QoE, Net Debt, BFR normatif, analyse historique. Mais avec des angles différents.",
        "Indépendance : les Big 4 peuvent faire les deux côtés mais sur des deals différents. Sur un même deal, jamais buy ET sell. Reliance letters permettent au buyer de s'appuyer sur la VDD."
      ],
      tip: "Beaucoup de candidats préfèrent le buy-side (plus stimulant intellectuellement). Mais le sell-side est plus rentable pour les cabinets."
    },
    {
      id: 74,
      category: 'dcf',
      difficulty: 'intermédiaire',
      question: "Quelle est la différence entre WACC et coût des fonds propres (Ke) ?",
      explanation: "Question conceptuelle qui teste la compréhension fine de la structure de financement.",
      steps: [
        "Coût des fonds propres (Ke) : taux de rentabilité exigé par les actionnaires pour investir. Calculé via le CAPM : Ke = Rf + β × (Rm − Rf).",
        "WACC : coût moyen pondéré du capital total (dette + equity). Formule : WACC = (E/V) × Ke + (D/V) × Kd × (1−t).",
        "Différence fondamentale : Ke ne concerne QUE les actionnaires, WACC concerne TOUS les pourvoyeurs de capitaux (actionnaires + créanciers).",
        "Hiérarchie : Kd (dette) < WACC < Ke (equity). La dette est moins risquée donc moins chère ; les fonds propres sont plus risqués donc plus chers.",
        "Quel taux pour quoi : actualiser des flux destinés aux actionnaires (FCFE, dividendes) avec Ke. Actualiser des flux destinés à tous (FCFF) avec WACC.",
        "Erreur fréquente : utiliser le WACC pour actualiser des FCFE → biaise la valorisation à la hausse (double comptage du levier).",
        "Effet du levier : plus la dette augmente, plus le WACC diminue (jusqu'à un seuil). Mais Ke augmente aussi (les actionnaires exigent plus pour le risque accru) : c'est l'effet de levier financier."
      ],
      tip: "Règle d'or : FCFF + WACC = Enterprise Value. FCFE + Ke = Equity Value. Ne jamais mélanger."
    },
    {
      id: 75,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Pourquoi le TRI cible des fonds PE est-il de 20-25% ?",
      explanation: "Question stratégique sur le pricing de l'industrie PE. Très posée pour distinguer les vrais passionnés.",
      steps: [
        "Origine : les LPs (investisseurs institutionnels) attendent un rendement de ~15-18% net après frais pour le PE, supérieur aux marchés cotés (~7-9%) pour rémunérer l'illiquidité.",
        "Marges du fonds : management fees (~2%/an) + carried interest (~20% au-delà du hurdle de 8%). Donc TRI brut nécessaire = TRI net + fees + carried impact.",
        "Calcul approximatif : pour livrer 15% net aux LPs, le fonds doit générer ~20-22% brut (avant carried) sur les deals.",
        "Risque pris : les fonds PE prennent du risque (illiquidité, levier, concentration). Le rendement doit compenser.",
        "Évolution historique : dans les années 2000, les TRI moyens étaient de 25-30%. Aujourd'hui avec plus de capital sur le marché, on est plus proche de 18-22% en moyenne.",
        "Compétition : la prolifération du dry powder (capital non investi) compresse les rendements en faisant monter les multiples d'entrée.",
        "Différenciation : les fonds top quartile livrent encore 25-30%, les fonds bottom quartile sous-performent les marchés cotés."
      ],
      tip: "Citer un TRI cible de 30% est devenu naïf — on parle aujourd'hui de 18-22% sur les large caps européens."
    },
    {
      id: 76,
      category: 'ma',
      difficulty: 'avancé',
      question: "Quelles sont les différences entre un process compétitif (auction) et un process bilatéral ?",
      explanation: "Question de structuration M&A. Permet de comprendre les enjeux côté vendeur.",
      steps: [
        "Auction (process compétitif) : la banque vendeuse organise une mise en concurrence formalisée avec plusieurs acquéreurs potentiels (5 à 50 selon la taille).",
        "Bilatéral : négociation exclusive avec un seul acquéreur. Pas de concurrence formelle.",
        "Avantages auction : maximisation du prix par la concurrence, validation de la valeur de marché, démonstration de transparence pour le vendeur (utile en cession d'entreprise familiale).",
        "Inconvénients auction : process plus long (4-9 mois), risque de fuite, coûts plus élevés (banque + conseils), cible perturbée par les multiples DD.",
        "Avantages bilatéral : rapidité (parfois 2-3 mois signing), confidentialité, exécution plus simple, conditions de prix parfois favorables (acquéreur 'unique' valorisé).",
        "Inconvénients bilatéral : risque de sous-pricing (pas de tension concurrentielle), risque que l'acheteur se retire (pas d'alternative), validation moins forte de la valeur.",
        "Hybride : 'targeted auction' (3-5 acquéreurs sélectionnés) ou 'go-shop period' (post-signing, possibilité d'autres offres pendant 30 jours).",
        "Choix : auction préféré pour les sell-side PE (maximisation), bilatéral pour les cessions stratégiques ciblées (synergies évidentes avec un acquéreur)."
      ],
      tip: "L'auction maximise typiquement le prix de 10-20% par rapport au bilatéral, justifiant largement les coûts additionnels."
    },
    {
      id: 77,
      category: 'valuation',
      difficulty: 'avancé',
      question: "Pourquoi un même actif peut-il valoir des montants différents selon l'acheteur ?",
      explanation: "Question conceptuelle profonde. Test la compréhension de la nature 'situationnelle' de la valeur.",
      steps: [
        "Concept clé : la valeur n'est pas une propriété intrinsèque de l'actif, mais une fonction de l'acheteur, de ses synergies et de son coût du capital.",
        "Raison 1 — Synergies différentes : un concurrent direct (industrial fit) peut capter plus de synergies de coûts. Un fonds PE n'en capte presque aucune.",
        "Raison 2 — Coût du capital différent : un grand groupe avec WACC à 6% valorise les mêmes flux plus haut qu'un PE avec un coût d'equity à 20%.",
        "Raison 3 — Horizon différent : un strategic peut valoriser sur 30 ans, un PE sur 5-7 ans. Les flux long-terme valent plus pour le strategic.",
        "Raison 4 — Levier accessible : la capacité d'endettement varie selon la structure financière de l'acheteur et sa relation banquière.",
        "Raison 5 — Considérations stratégiques : défense contre un concurrent, accès à un marché, blocage d'un rival = surcoût justifié au-delà du cash-flow pur.",
        "Raison 6 — Effets de réputation : un acquéreur souffrant de lacunes en ESG peut valoriser plus une cible 'verte' pour redorer son blason.",
        "Conséquence pratique : le prix réel n'est pas la valeur 'fair' mais la valeur pour le 2ème meilleur enchérisseur (théorie d'enchères)."
      ],
      tip: "Le prix payé en M&A reflète la valeur pour le 2ème meilleur enchérisseur + delta minimal pour gagner. C'est la théorie de Vickrey."
    },
    {
      id: 78,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Vous avez 8 minutes pour faire bouillir un œuf de 4 minutes avec 2 sabliers (4 et 7 minutes). Comment faire ?",
      explanation: "Énigme logique posée chez Goldman et JPM. Test de raisonnement séquentiel.",
      steps: [
        "Constat initial : on a un sablier de 4 min et un sablier de 7 min. On veut mesurer exactement 4 min.",
        "Solution naïve : retourner le sablier de 4 min, attendre, plonger l'œuf. Mais cela donne 4 min, pas en synchronisation avec un autre time-keeper.",
        "Solution élégante (en 8 min total) :",
        "Étape 1 (T=0) : retourner les DEUX sabliers en même temps.",
        "Étape 2 (T=4 min) : le sablier de 4 min se vide. Plonger l'œuf dans l'eau bouillante. Le sablier de 7 min indique encore 3 min.",
        "Étape 3 (T=7 min) : le sablier de 7 min se vide. Le retourner immédiatement.",
        "Étape 4 (T=8 min) : retirer l'œuf après 4 min de cuisson. Total écoulé : 8 minutes.",
        "Variante du problème : mesurer 9 min ou 11 min avec ces deux sabliers, etc."
      ],
      tip: "Type de problème : mesurer un temps précis avec des outils imprécis. Toujours raisonner en états successifs."
    },
    {
      id: 79,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Vous lancez une pièce 100 fois. Vous obtenez 60 piles. La pièce est-elle truquée ?",
      explanation: "Question de stats / probabilités posée en hedge funds et trading. Évalue la maîtrise des intervalles de confiance.",
      steps: [
        "Hypothèse nulle (H0) : la pièce est équilibrée (p = 0,5).",
        "Distribution attendue : nombre de piles ~ Binomiale(100, 0,5). Espérance = 50, écart-type = √(100 × 0,5 × 0,5) = 5.",
        "Z-score : Z = (60 − 50) / 5 = 2,0.",
        "Interprétation : un Z de 2 signifie qu'on est à 2 écarts-types au-dessus de la moyenne. Probabilité d'observer ≥60 piles si la pièce est équilibrée : ~2,3% (test unilatéral).",
        "Conclusion statistique : à un seuil de 5%, on rejette H0. La pièce semble biaisée.",
        "Mais... à un seuil de 1%, on accepte H0 (2,3% > 1%). Le résultat est significatif mais pas extrême.",
        "Décision pratique : si on me propose un pari avec cette pièce, je joue avec prudence. La preuve d'un biais existe mais n'est pas écrasante.",
        "Twist : pour avoir une preuve écrasante (Z > 3), il faudrait observer ≥65 piles sur 100. À ce niveau, p < 0,1%."
      ],
      tip: "Cette question révèle la maîtrise des intervalles de confiance. Réponse 'oui/non' est faux — la bonne réponse est probabiliste."
    },,
    {
      id: 80,
      category: 'lbo',
      difficulty: 'intermédiaire',
      question: "Comment compareriez-vous deux entreprises A et B pour décider laquelle investir en LBO ?",
      explanation: "Question PE très classique posée pour tester votre framework d'analyse. La structure de réponse compte autant que le contenu.",
      steps: [
        "Étape 1 — Business model : comment chaque entreprise génère du cash ? Récurrence des revenus, contrats long terme, dépendance clients.",
        "Étape 2 — Taille de marché et part de marché : taille du TAM, position concurrentielle, barrières à l'entrée, défensabilité.",
        "Étape 3 — Marges et structure de coûts : marge brute, marge EBITDA, fixes vs variables, levier opérationnel, potentiel d'expansion.",
        "Étape 4 — Capital requirements : CAPEX de maintenance vs croissance, intensité capitalistique, retour sur capital employé (ROCE).",
        "Étape 5 — Efficacité opérationnelle : rotation des stocks, BFR / CA, qualité du working capital management.",
        "Étape 6 — Risques : cyclicité, concentration clients/fournisseurs, dépendance réglementaire, risques technologiques.",
        "Étape 7 — Management : qualité de l'équipe dirigeante, track record, capacité à exécuter le BP.",
        "Étape 8 — Conclusion : 'Toutes choses égales par ailleurs, je préférerais l'entreprise X parce que [récurrence des revenus + position défensive + faible CAPEX], ce qui maximise la prédictibilité du cash et donc le ratio de levier supportable.'"
      ],
      tip: "Le PE préfère TOUJOURS la prédictibilité à la croissance pure. Cash récurrent + faible CAPEX = candidat LBO idéal."
    },
    {
      id: 81,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Quels sont les leviers opérationnels d'un fonds PE pour créer de la valeur ?",
      explanation: "Question qui distingue les vrais passionnés du PE des candidats théoriques. Soyez concret et donnez des exemples.",
      steps: [
        "Levier 1 — Croissance organique : repricing intelligent, expansion géographique, lancement de nouveaux produits, acquisition de talents commerciaux.",
        "Levier 2 — Optimisation des coûts : zero-based budgeting, négociation fournisseurs, automatisation, lean management, mutualisation des fonctions support.",
        "Levier 3 — Build-up / Add-ons : acquisitions stratégiques pour consolider un marché fragmenté. Multiple d'achat des cibles plus faible (multiple arbitrage).",
        "Levier 4 — Expansion du multiple : transformer la cible (taille, diversification, professionnalisation) pour sortir à un multiple supérieur.",
        "Levier 5 — Optimisation du BFR : réduction DSO (relances, factoring), augmentation DPO (négociation fournisseurs), optimisation stocks.",
        "Levier 6 — Désendettement (deleveraging) : utiliser les FCF pour rembourser la dette, ce qui mécaniquement augmente l'equity value.",
        "Levier 7 — Optimisation fiscale : structure holding, utilisation de déficits, choix juridiction.",
        "Levier 8 — Gouvernance : refonte du board, alignement management via MEP, KPIs disciplinés, reporting mensuel."
      ],
      tip: "Aujourd'hui ~50-60% du TRI vient de l'opérationnel (vs 30% du levier). Les LPs exigent du value creation, pas du financial engineering."
    },
    {
      id: 82,
      category: 'lbo',
      difficulty: 'intermédiaire',
      question: "Quelles sont les stratégies de sortie typiques d'un LBO ?",
      explanation: "Question de cycle d'investissement PE. Permet de tester votre compréhension des dynamiques de marché.",
      steps: [
        "Sortie 1 — Vente à un strategic (industriel) : meilleur prix typiquement (synergies). Risque : antitrust, due diligence longue, timing dépendant de la fenêtre M&A du secteur.",
        "Sortie 2 — Secondary buyout (LBO secondaire) : vente à un autre fonds PE. Process rapide, exécution sécurisée, mais multiple parfois plafonné.",
        "Sortie 3 — IPO : introduction en bourse. Liquidité progressive (lockup 6-12 mois), valorisation dépendant des conditions de marché, exposition publique.",
        "Sortie 4 — Recapitalisation à effet de levier : refinancement avec nouvelle dette, distribution d'un dividend recap aux actionnaires. Pas une vraie sortie mais retour de cash.",
        "Sortie 5 — Vente partielle / continuation fund : transfert vers un nouveau véhicule du même GP. De plus en plus utilisé pour les LPs liquidity.",
        "Choix dépend de : multiple attendu, profil du business (synergies industrielles possibles ?), conditions de marché, appétit des acheteurs potentiels, maturité de la cible.",
        "Empiriquement (Europe 2020-2024) : 45% strategic, 30% secondary buyout, 15% IPO, 10% autres.",
        "Préparation à la sortie : commence souvent 12-18 mois avant (vendor due diligence, optimisation P&L, présentation managériale)."
      ],
      tip: "Mentionner la 'dual track' (préparer simultanément IPO et trade sale) montre une maturité de marché."
    },
    {
      id: 83,
      category: 'lbo',
      difficulty: 'avancé',
      question: "À quels paramètres un modèle LBO est-il le plus sensible ?",
      explanation: "Question quantitative qui teste votre intuition modélistique. Les bonnes réponses citent des sensibilités chiffrées.",
      steps: [
        "Paramètre 1 — Multiple d'entrée : plus on paie cher, plus le TRI baisse. Réduction de 1x du multiple d'entrée = +300-500 bps de TRI typiquement.",
        "Paramètre 2 — Multiple de sortie : assumption critique mais incertaine. Augmentation de 1x du multiple de sortie = +200-400 bps de TRI.",
        "Paramètre 3 — Croissance de l'EBITDA : impact direct. Passer de 5% à 10% de croissance EBITDA annuelle = ~+500 bps de TRI sur 5 ans.",
        "Paramètre 4 — Levier (debt/EBITDA à l'entrée) : passer de 4x à 5x augmente le TRI de ~200-300 bps mais accroît le risque.",
        "Paramètre 5 — Cost of debt : moins sensible mais important. +200 bps de spread = -100-150 bps de TRI.",
        "Paramètre 6 — Hypothèses opérationnelles : marge EBITDA, CAPEX, BFR. Une dégradation de 100 bps de marge sur 5 ans = -150-200 bps de TRI.",
        "Paramètre 7 — Horizon de détention : sortir en 4 ans vs 6 ans peut booster le TRI de 200-300 bps (effet temps).",
        "Synthèse : les modèles LBO sont LE PLUS sensibles au multiple d'entrée/sortie (≈50% du TRI) et à l'EBITDA growth. Le levier compte mais moins qu'on ne pense. Toujours faire des tableaux de sensibilité 2D."
      ],
      tip: "L'analyse de sensibilité bidimensionnelle (entry multiple × EBITDA growth) est LE livrable clé d'un comité d'investissement PE."
    },
    {
      id: 84,
      category: 'ma',
      difficulty: 'avancé',
      question: "Quels sont les éléments clés d'un modèle de fusion M&A ?",
      explanation: "Question modèle M&A. Permet de tester votre compréhension des mécanismes accretion/dilution.",
      steps: [
        "Élément 1 — Prix d'achat : EV de la cible + prime de contrôle (15-30% typique sur cours coté). Source de discussion clé.",
        "Élément 2 — Form of consideration : cash, actions, mixte. Impact direct sur l'accretion/dilution. Cash = dilution si Pe < 1/Kd_aftertax. Actions = dilution si Pe acquéreur > Pe cible.",
        "Élément 3 — Synergies : revenus + coûts. Phasage sur 3-5 ans, taux de réalisation 50-80%. NPV des synergies souvent supérieure à la prime payée pour justifier le deal.",
        "Élément 4 — Coûts de transaction : honoraires banque (1-3% de l'EV), juridique, comptables. Total typiquement 2-4% de l'EV pour les deals < 1Md€.",
        "Élément 5 — Coûts d'intégration : restructuration, IT, branding. Représentent 1-2× les synergies annuelles cibles.",
        "Élément 6 — Financement : impact sur le coût du capital. Nouvelle dette → bouclier fiscal mais augmente le risque. Equity → dilution mais structure plus saine.",
        "Élément 7 — Goodwill : différence entre prix payé et valeur comptable des actifs nets. Test d'impairment annuel sous IFRS.",
        "Élément 8 — Accretion/Dilution : EPS proforma vs EPS standalone. Year 1 souvent dilutif, accrétif à partir an 2-3 grâce aux synergies."
      ],
      tip: "L'EPS accretion est un indicateur courte vue. Le vrai test = NPV des synergies > prime payée."
    },
    {
      id: 85,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Comment savoir rapidement si un deal M&A est relutif ou dilutif ?",
      explanation: "Question piège classique posée pour tester votre rapidité de raisonnement et votre intuition financière.",
      steps: [
        "Cash deal : si le coût de la dette après impôt (Kd × (1−t)) est inférieur au earnings yield de la cible (1/PE cible), alors le deal est relutif.",
        "Exemple cash : si Kd = 5% pré-tax, t = 25%, alors Kd after-tax = 3,75%. Si la cible a un PE de 15x (yield = 6,67%), le deal est RELUTIF.",
        "Stock deal : si le PE de l'acquéreur est supérieur au PE de la cible, le deal est relutif. Logique : on achète des earnings 'cheap' avec des actions 'chères'.",
        "Exemple stock : si acquéreur PE = 25x et cible PE = 15x, alors le deal est RELUTIF (on émet 1 action à 25x pour acheter 1,67x d'earnings).",
        "Mixte : pondérer cash vs stock selon les proportions. Calculer le PE blended du paiement et comparer au PE cible.",
        "Quick check : 1/PE = earnings yield. Le deal est relutif si 'yield obtenu' (cible) > 'yield payé' (financement).",
        "Attention : ces règles sont SUR L'EPS standalone, sans synergies. Avec synergies, presque tous les deals deviennent relutifs en l'an 2-3.",
        "Limite : EPS accretion ≠ création de valeur. Un deal relutif peut détruire de la valeur (over-paid + intégration ratée)."
      ],
      tip: "La règle '1/PE vs Kd*(1-t)' permet de répondre en 10 secondes. Mémorisez-la."
    },
    {
      id: 86,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce qu'un BFR normatif et comment le calcule-t-on ?",
      explanation: "Question TS / due diligence critique. Le BFR normatif est l'un des deux ajustements de prix les plus importants (avec le Net Debt).",
      steps: [
        "Définition : niveau de BFR considéré comme 'normal' pour l'activité courante, sur la base d'une période de référence (typiquement 12 mois glissants ou moyenne historique).",
        "Pourquoi : si la cible a un BFR à la date de closing supérieur au normatif, le vendeur a 'sur-stocké' ou 'sous-payé ses fournisseurs' pour gonfler artificiellement le cash. Inversement, BFR < normatif = cash retenu par compression du BFR.",
        "Calcul méthode 1 (jours) : ratios moyens DSO, DIO, DPO sur 12-18 mois, appliqués aux ventes/COGS de la période de référence.",
        "Calcul méthode 2 (% CA) : BFR / CA en moyenne sur l'historique, appliqué au CA de la période.",
        "Calcul méthode 3 (pic vs creux) : si saisonnalité forte, prendre la moyenne 12 mois pour neutraliser. Ne JAMAIS prendre un pic ou un creux comme normatif.",
        "Ajustement au prix : si BFR closing > normatif → vendeur garde la différence (acheteur paie moins). Si BFR closing < normatif → vendeur paie la différence à l'acheteur.",
        "Pièges courants : (1) saisonnalité non neutralisée, (2) one-offs inclus dans la base (gros contrat ponctuel), (3) mélange de devises non retraité, (4) inclusion d'éléments non opérationnels (TVA, cash trapped).",
        "Ordre de grandeur : un écart de 5% du CA sur le BFR normatif = potentiellement plusieurs millions d'ajustement de prix."
      ],
      tip: "Le BFR normatif est LE post du SPA le plus disputé. Comprendre sa méthodologie = se distinguer en entretien TS."
    },
    {
      id: 87,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Pourquoi voulez-vous travailler chez nous spécifiquement ?",
      explanation: "Question fit fondamentale. La pire réponse est générique. Les bons candidats font leurs devoirs.",
      steps: [
        "Erreur 1 — La réponse générique : 'Vous êtes une banque/cabinet leader, je veux apprendre.' Mort instantanée.",
        "Erreur 2 — Le compliment vide : 'Vous avez une excellente réputation.' Tout le monde dit ça.",
        "Erreur 3 — La liste exhaustive : citer 10 raisons sans hiérarchie ni profondeur.",
        "Bonne approche : 3 raisons spécifiques, alignées avec le poste, illustrées par des éléments concrets (deals, équipe, culture).",
        "Raison 1 — Spécialité/positionnement : « Votre positionnement leader sur les mid-caps françaises en healthcare (Bryan Garnier) ou en cross-border (Rothschild) correspond à mon intérêt pour ce segment. »",
        "Raison 2 — Deal récent : « J'ai été marqué par votre advisory sur [deal X]. Ce type d'opération est exactement ce sur quoi je veux travailler. »",
        "Raison 3 — Personnes/culture : « J'ai discuté avec [nom d'un junior ou alumni], qui m'a parlé de [valeur culturelle] : formation des juniors / diversité des deals / autonomie. »",
        "Conclure : « À long terme, je vois [banque] comme la meilleure plateforme pour développer une expertise en [secteur/type de deals]. »"
      ],
      tip: "Toujours mentionner le nom d'un alumni que vous avez contacté. Ça prouve que vous avez fait du networking — valorisé en M&A."
    },
    {
      id: 88,
      category: 'ma',
      difficulty: 'avancé',
      question: "Présentez-moi un deal récent qui vous a intéressé.",
      explanation: "Question quasi systématique en entretien M&A. Démontre votre veille, votre capacité d'analyse et votre passion.",
      steps: [
        "Étape 1 — Choisir un deal récent (< 12 mois), pas trop médiatisé (évite EDF/Total), idéalement sectoriel à la banque cible.",
        "Étape 2 — Pitch en 60 secondes : « En [mois], [acquéreur] a annoncé l'acquisition de [cible] pour [EV] à [multiple] EBITDA. »",
        "Étape 3 — Rationale stratégique : pourquoi ce deal ? Synergies attendues, positionnement, défense vs concurrent, accès marché/technologie.",
        "Étape 4 — Valorisation : multiple payé vs benchmarks sectoriels. Prime sur le cours coté pré-rumeur. Mode de paiement (cash/actions/mix).",
        "Étape 5 — Structure : financement de l'opération, conditions suspensives, calendrier, antitrust.",
        "Étape 6 — Risques : exécution intégration, synergies réalisables ?, dépendance management cible, antitrust.",
        "Étape 7 — Votre opinion : 'Je pense que ce deal est cohérent / surcoté parce que [argument chiffré].' Avoir une opinion = +++.",
        "Étape 8 — Bonus : citer la banque conseil (impressionne si c'est celle de l'entretien)."
      ],
      tip: "Préparer 2-3 deals : un dans le secteur de la banque, un cross-border, un PE. Couvre 80% des relances."
    },
    {
      id: 89,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Quelle est votre plus grande faiblesse ?",
      explanation: "Question fit piège. La réponse 'je suis perfectionniste' est ELIMINATOIRE. Les recruteurs attendent de l'honnêteté et de la maturité.",
      steps: [
        "Erreur classique : déguiser une force en faiblesse ('je suis trop perfectionniste', 'je travaille trop'). Détecté en 2 secondes par les recruteurs.",
        "Bonne approche : identifier une vraie faiblesse, montrer la conscience qu'on en a, et expliquer ce qu'on fait pour la corriger.",
        "Catégorie 1 — Compétence technique : « Mon Excel/PowerPoint avancé n'est pas à mon niveau cible. J'ai pris [formation] et je m'entraîne quotidiennement. »",
        "Catégorie 2 — Soft skill : « J'ai tendance à vouloir tout faire moi-même au lieu de déléguer. Sur [expérience], j'ai appris à mieux distribuer les tâches. »",
        "Catégorie 3 — Trait de personnalité : « J'ai du mal à dire non, ce qui m'a parfois conduit à m'éparpiller. J'apprends à prioriser plus rigoureusement. »",
        "Catégorie 4 — Expérience manquante : « Je n'ai pas encore travaillé sur un deal cross-border. C'est précisément pour cette raison que je vise [banque/cabinet]. »",
        "Pièges à éviter : faiblesses rédhibitoires (travail en équipe, rigueur, ponctualité), aveux trop intimes, faiblesses non corrigeables.",
        "Conclure positivement : montrer la trajectoire d'amélioration, pas un déficit figé."
      ],
      tip: "Évitez à tout prix : 'je suis perfectionniste', 'je travaille trop dur', 'je suis trop passionné'. Ces réponses sont des red flags."
    }
  ];
// =====================================================
//  STAR RATING — Notation 1-5 étoiles
// =====================================================
const StarRating = ({ value, onChange, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={(e) => { e.stopPropagation(); onChange(star === value ? 0 : star); }}
          className="transition-transform hover:scale-110"
          aria-label={`Noter ${star} étoiles`}
        >
          <Star
            className={`${sizeClass} ${star <= value ? 'fill-amber-400 text-amber-400' : 'text-blue-200'}`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
};


// =====================================================
//  CONCEPT CARD — Affichage d'un concept
// =====================================================
const ConceptCard = ({ concept, isExpanded, onToggle, getCategoryLabel }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${
      isExpanded ? 'border-blue-500 shadow-xl shadow-blue-100' : 'border-blue-100 hover:border-blue-300 hover:shadow-md'
    }`}>
      <button onClick={onToggle} className="w-full text-left p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            isExpanded ? 'bg-gradient-to-br from-blue-700 to-indigo-800 text-white' : 'bg-blue-50 text-blue-700'
          }`}>
            <Library className="w-6 h-6" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              {getCategoryLabel(concept.category)}
            </span>
          </div>
          <h3 className="text-blue-950 font-serif text-xl leading-snug">{concept.title}</h3>
          {!isExpanded && (
            <p className="text-blue-700 mt-2 text-sm leading-relaxed line-clamp-2 font-light">
              {concept.simple}
            </p>
          )}
        </div>
        <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight className="w-6 h-6 text-blue-500" />
        </div>
      </button>


      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
          <div className="ml-16 mt-6 space-y-6">
            {/* Simple */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-blue-700" />
                <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">En une phrase</h4>
              </div>
              <p className="text-blue-900 leading-relaxed font-light text-base">{concept.simple}</p>
            </div>


            {/* Formule */}
            {concept.formula && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Formule clé</h4>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                  <code className="text-blue-900 font-mono text-sm leading-relaxed">{concept.formula}</code>
                </div>
              </div>
            )}


            {/* Deep dive */}
            {concept.deepDive && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Pour aller plus loin</h4>
                </div>
                <p className="text-blue-900 leading-relaxed font-light">{concept.deepDive}</p>
              </div>
            )}


            {/* Table */}
            {concept.table && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Tableau de référence</h4>
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                      <tr>
                        {concept.table.headers.map((h, i) => (
                          <th key={i} className="px-3 py-2.5 text-left text-xs uppercase tracking-wider font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {concept.table.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-blue-50/40' : 'bg-white'}>
                          {row.map((cell, ci) => (
                            <td key={ci} className={`px-3 py-2.5 ${ci === 0 ? 'font-semibold text-blue-950' : 'text-blue-800'}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {/* Visual */}
            {concept.visual && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Schéma</h4>
                </div>
                <Visual type={concept.visual} />
              </div>
            )}


            {/* Pitfalls */}
            {concept.pitfalls && concept.pitfalls.length > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-700 text-xs uppercase tracking-[0.2em] font-bold">⚠️ Pièges à éviter</span>
                </div>
                <ul className="space-y-2">
                  {concept.pitfalls.map((p, i) => (
                    <li key={i} className="flex gap-2 text-red-900 text-sm leading-relaxed">
                      <span className="text-red-500 flex-shrink-0">•</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


// =====================================================
//  PROGRESS PAGE — Suivi de progression
// =====================================================
const ProgressPage = ({ questions, ratings, categories, getCategoryLabel, onReset, setActivePage, setActiveCategory, setRatingFilter }) => {
  const totalQuestions = questions.length;
  const ratedCount = Object.keys(ratings).filter((k) => ratings[k] > 0).length;
  const masteredCount = Object.keys(ratings).filter((k) => ratings[k] >= 4).length;
  const avgRating = ratedCount > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / ratedCount).toFixed(1)
    : '—';


  const ratingDist = [1, 2, 3, 4, 5].map((r) => ({
    rating: r,
    count: Object.values(ratings).filter((v) => v === r).length,
  }));


  const byCategory = categories.filter((c) => c.id !== 'all').map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat.id);
    const catRatings = catQuestions.map((q) => ratings[q.id] || 0);
    const rated = catRatings.filter((r) => r > 0).length;
    const mastered = catRatings.filter((r) => r >= 4).length;
    const avg = rated > 0 ? (catRatings.reduce((a, b) => a + b, 0) / rated) : 0;
    return { ...cat, total: catQuestions.length, rated, mastered, avg };
  });


  const weakQuestions = questions.filter((q) => ratings[q.id] > 0 && ratings[q.id] <= 2).slice(0, 5);
  const unratedQuestions = questions.filter((q) => !ratings[q.id]).slice(0, 5);


  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-12 bg-blue-700" />
          <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">Suivi de progression</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
          Mon <span className="italic font-light text-blue-700">avancée</span>
        </h2>
        <p className="text-blue-700 mt-3 font-light">Notez chaque question de 1 à 5 étoiles pour suivre votre maîtrise. Visez ≥ 4 pour considérer une question acquise.</p>
      </div>


      {/* KPIs principaux */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">Questions notées</div>
          <div className="text-4xl font-serif text-blue-950">{ratedCount}<span className="text-xl text-blue-400">/{totalQuestions}</span></div>
          <div className="mt-3 h-2 bg-blue-50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-all" style={{ width: `${(ratedCount/totalQuestions)*100}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">✓ Maîtrisées (≥4★)</div>
          <div className="text-4xl font-serif text-emerald-800">{masteredCount}<span className="text-xl text-emerald-400">/{totalQuestions}</span></div>
          <div className="mt-3 h-2 bg-emerald-50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all" style={{ width: `${(masteredCount/totalQuestions)*100}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-sm">
          <div className="text-xs uppercase tracking-wider text-blue-600 font-semibold mb-2">Note moyenne</div>
          <div className="text-4xl font-serif text-blue-950">{avgRating}<span className="text-xl text-blue-400">/5</span></div>
          <div className="mt-3 flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (<Star key={s} className={`w-4 h-4 ${avgRating !== '—' && s <= Math.round(parseFloat(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-blue-200'}`} />))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 shadow-sm text-white">
          <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-2">Reste à voir</div>
          <div className="text-4xl font-serif">{totalQuestions - ratedCount}</div>
          <div className="text-xs text-blue-200 mt-3">questions non notées</div>
        </div>
      </div>


      {/* Distribution */}
      <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 mb-10 shadow-sm">
        <h3 className="text-blue-950 font-serif text-xl mb-5">Répartition des notes</h3>
        <div className="space-y-3">
          {[5,4,3,2,1].map((r) => {
            const d = ratingDist.find((x) => x.rating === r);
            const max = Math.max(...ratingDist.map((x) => x.count), 1);
            const pct = (d.count / max) * 100;
            const color = r >= 4 ? 'from-emerald-500 to-emerald-700' : r === 3 ? 'from-blue-500 to-blue-700' : 'from-orange-400 to-red-500';
            return (
              <div key={r} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-28 flex-shrink-0">
                  {[1,2,3,4,5].map((s) => (<Star key={s} className={`w-3.5 h-3.5 ${s <= r ? 'fill-amber-400 text-amber-400' : 'text-blue-100'}`} strokeWidth={1.5} />))}
                </div>
                <div className="flex-1 h-7 bg-blue-50 rounded-md overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${color} flex items-center justify-end pr-3 transition-all`} style={{ width: `${pct}%` }}>
                    {d.count > 0 && <span className="text-white text-xs font-bold">{d.count}</span>}
                  </div>
                </div>
                <div className="w-12 text-right text-blue-700 font-semibold text-sm">{d.count}</div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Par catégorie */}
      <div className="bg-white rounded-2xl border-2 border-blue-100 p-6 mb-10 shadow-sm">
        <h3 className="text-blue-950 font-serif text-xl mb-5">Progression par catégorie</h3>
        <div className="space-y-4">
          {byCategory.map((c) => {
            const Icon = c.icon;
            const pct = c.total > 0 ? (c.mastered / c.total) * 100 : 0;
            return (
              <button
                key={c.id}
                onClick={() => { setActiveCategory(c.id); setActivePage('questions'); setRatingFilter('all'); }}
                className="w-full text-left bg-blue-50/40 rounded-xl p-4 hover:bg-blue-100/50 transition-colors border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="font-semibold text-blue-950">{c.label}</span>
                      <span className="text-sm text-blue-700">
                        <span className="text-emerald-700 font-semibold">{c.mastered}</span> maîtrisées /{' '}
                        <span className="text-blue-700 font-semibold">{c.rated}</span> notées /{' '}
                        <span className="text-blue-400">{c.total}</span> total
                        {c.avg > 0 && <span className="ml-3 text-amber-600 font-semibold">⭐ {c.avg.toFixed(1)}</span>}
                      </span>
                    </div>
                    <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-blue-100">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>


      {/* À revoir + à découvrir */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-sm">
          <h3 className="text-red-900 font-serif text-lg mb-4 flex items-center gap-2">🔴 Questions à retravailler</h3>
          {weakQuestions.length === 0 ? (
            <p className="text-blue-600 text-sm italic font-light">Aucune question notée ≤ 2 étoiles pour le moment.</p>
          ) : (
            <ul className="space-y-2.5">
              {weakQuestions.map((q) => (
                <li key={q.id} className="text-sm text-blue-900 leading-relaxed flex items-start gap-2">
                  <span className="text-red-600 font-bold flex-shrink-0">{ratings[q.id]}★</span>
                  <span className="line-clamp-2">{q.question}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-sm">
          <h3 className="text-blue-900 font-serif text-lg mb-4 flex items-center gap-2">🔵 À découvrir (non notées)</h3>
          {unratedQuestions.length === 0 ? (
            <p className="text-emerald-700 text-sm italic font-light">🎉 Bravo, toutes les questions sont notées !</p>
          ) : (
            <ul className="space-y-2.5">
              {unratedQuestions.map((q) => (
                <li key={q.id} className="text-sm text-blue-900 leading-relaxed flex items-start gap-2">
                  <span className="text-blue-400 font-bold flex-shrink-0">—</span>
                  <span className="line-clamp-2">{q.question}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {/* Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-red-700 hover:text-red-900 text-sm font-medium underline underline-offset-4"
        >
          <RotateCcw className="w-4 h-4" />
          Réinitialiser toutes mes notes
        </button>
      </div>
    </div>
  );
};
// =====================================================
//  COMPOSANT PRINCIPAL
// =====================================================
const FinanceInterviewGuide = () => {
  const [activePage, setActivePage] = useState('questions'); // questions | concepts | progress
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [ratings, setRatings] = useState({});
  const [ratingFilter, setRatingFilter] = useState('all'); // all | unrated | weak | mastered
  const [conceptCategory, setConceptCategory] = useState('all');


  // Charger les ratings depuis le stockage
  useEffect(() => {
    (async () => {
      try {
        if (typeof window !== 'undefined' && window.storage) {
          const r = await window.storage.get('finance-ratings');
          if (r && r.value) setRatings(JSON.parse(r.value));
        }
      } catch (e) { /* ignore */ }
    })();
  }, []);


  // Sauvegarder les ratings
  const updateRating = async (qid, value) => {
    const next = { ...ratings, [qid]: value };
    if (value === 0) delete next[qid];
    setRatings(next);
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.storage.set('finance-ratings', JSON.stringify(next));
      }
    } catch (e) { /* ignore */ }
  };


  const resetRatings = async () => {
    if (!confirm('Êtes-vous sûr de vouloir réinitialiser toutes vos notes ? Cette action est irréversible.')) return;
    setRatings({});
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.storage.delete('finance-ratings');
      }
    } catch (e) { /* ignore */ }
  };


  const categories = [
    { id: 'all', label: 'Toutes', icon: BookOpen },
    { id: 'valuation', label: 'Valorisation', icon: TrendingUp },
    { id: 'accounting', label: 'Comptabilité', icon: Calculator },
    { id: 'ma', label: 'M&A', icon: Briefcase },
    { id: 'ts', label: 'Transaction Services', icon: Target },
    { id: 'lbo', label: 'LBO', icon: TrendingUp },
    { id: 'dcf', label: 'DCF', icon: Calculator },
    { id: 'brainteaser', label: 'Déstabilisantes', icon: Brain },
  ];


  const difficulties = [
    { id: 'all', label: 'Tous niveaux' },
    { id: 'basique', label: 'Basique' },
    { id: 'intermédiaire', label: 'Intermédiaire' },
    { id: 'avancé', label: 'Avancé' },
  ];


  const ratingFilters = [
    { id: 'all', label: 'Toutes' },
    { id: 'unrated', label: 'Non notées' },
    { id: 'weak', label: '≤ 2 étoiles' },
    { id: 'mastered', label: '≥ 4 étoiles' },
  ];


  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchCategory = activeCategory === 'all' || q.category === activeCategory;
      const matchDifficulty = activeDifficulty === 'all' || q.difficulty === activeDifficulty;
      const matchSearch = searchQuery === '' || q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const rating = ratings[q.id] || 0;
      const matchRating = ratingFilter === 'all' || (ratingFilter === 'unrated' && rating === 0) || (ratingFilter === 'weak' && rating > 0 && rating <= 2) || (ratingFilter === 'mastered' && rating >= 4);
      return matchCategory && matchDifficulty && matchSearch && matchRating;
    });
  }, [activeCategory, activeDifficulty, searchQuery, ratings, ratingFilter]);


  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => conceptCategory === 'all' || c.category === conceptCategory);
  }, [conceptCategory]);


  const stats = useMemo(() => ({
    total: questions.length,
    filtered: filteredQuestions.length,
    basique: questions.filter((q) => q.difficulty === 'basique').length,
    intermédiaire: questions.filter((q) => q.difficulty === 'intermédiaire').length,
    avancé: questions.filter((q) => q.difficulty === 'avancé').length,
    brainteasers: questions.filter((q) => q.category === 'brainteaser').length,
    concepts: concepts.length,
  }), [filteredQuestions]);


  const getDifficultyColor = (diff) => {
    if (diff === 'basique') return 'bg-sky-100 text-sky-800 border-sky-300';
    if (diff === 'intermédiaire') return 'bg-blue-100 text-blue-800 border-blue-400';
    return 'bg-indigo-100 text-indigo-900 border-indigo-500';
  };


  const getCategoryColor = (catId) => catId === 'brainteaser' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-blue-50 text-blue-700 border-blue-200';


  const getCategoryLabel = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.label : catId;
  };


  const pages = [
    { id: 'questions', label: 'Questions', icon: ListChecks, count: questions.length },
    { id: 'concepts', label: 'Concepts', icon: Library, count: concepts.length },
    { id: 'progress', label: 'Ma progression', icon: BarChart3 },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.4) 0%, transparent 50%)' }} />
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 sm:w-12 bg-blue-400" />
            <span className="text-blue-300 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light">Guide professionnel</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.05]">
            Finance Interview
            <br />
            <span className="italic font-light text-blue-200">Questions & Concepts</span>
          </h1>
          <p className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-3xl mt-4 sm:mt-5 font-light leading-relaxed">
            La référence pour préparer vos entretiens en{' '}
            <span className="font-medium text-white">Transaction Services</span> et{' '}
            <span className="font-medium text-white">M&A</span>. Plus de 90 questions, 15 concepts détaillés, et un suivi de votre progression.
          </p>


          {/* NAVIGATION */}
          <div className="mt-6 sm:mt-8 -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto sm:overflow-visible scrollbar-none">
            <div className="flex sm:flex-wrap gap-2 min-w-max sm:min-w-0">
              {pages.map((p) => {
                const Icon = p.icon;
                const isActive = activePage === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePage(p.id)}
                    className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all border-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-blue-950 border-white shadow-lg'
                        : 'bg-white/10 text-blue-100 border-blue-400/30 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{p.label}</span>
                    {p.count && <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-blue-400/20 text-blue-200'}`}>{p.count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>


      {/* PAGE: QUESTIONS */}
      {activePage === 'questions' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Filtres */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Filter className="w-4 h-4 text-blue-700" />
              <h2 className="text-blue-950 font-serif text-lg">Filtres & recherche</h2>
            </div>


            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input type="text" placeholder="Rechercher une question, un concept..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-12 py-3 bg-blue-50/50 border border-blue-200 rounded-lg text-blue-950 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700"><X className="w-5 h-5" /></button>}
            </div>


            <div className="mb-5">
              <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">Catégorie</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isActive ? 'bg-blue-900 text-white border-blue-900 shadow-md' : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50'}`}>
                      <Icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>


            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">Difficulté</div>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => { const isActive = activeDifficulty === diff.id; return (<button key={diff.id} onClick={() => setActiveDifficulty(diff.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isActive ? 'bg-indigo-900 text-white border-indigo-900 shadow-md' : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50'}`}>{diff.label}</button>); })}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3 flex items-center gap-1.5"><Star className="w-3 h-3" /> Filtre par notation</div>
                <div className="flex flex-wrap gap-2">
                  {ratingFilters.map((rf) => { const isActive = ratingFilter === rf.id; return (<button key={rf.id} onClick={() => setRatingFilter(rf.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isActive ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:bg-amber-50'}`}>{rf.label}</button>); })}
                </div>
              </div>
            </div>


            <div className="mt-5 pt-5 border-t border-blue-100 flex items-center justify-between text-sm flex-wrap gap-2">
              <span className="text-blue-700"><span className="font-semibold text-blue-950">{stats.filtered}</span> question{stats.filtered > 1 ? 's' : ''} affichée{stats.filtered > 1 ? 's' : ''}</span>
              {(activeCategory !== 'all' || activeDifficulty !== 'all' || searchQuery || ratingFilter !== 'all') && (
                <button onClick={() => { setActiveCategory('all'); setActiveDifficulty('all'); setSearchQuery(''); setRatingFilter('all'); }} className="text-blue-700 hover:text-blue-900 underline underline-offset-2">Réinitialiser</button>
              )}
            </div>
          </div>


          {/* Questions */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-blue-100 p-12 text-center">
                <Search className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <p className="text-blue-700 text-lg">Aucune question ne correspond à vos critères.</p>
              </div>
            ) : (
              filteredQuestions.map((q, index) => {
                const isExpanded = expandedQuestion === q.id;
                const userRating = ratings[q.id] || 0;
                return (
                  <div key={q.id} className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-500 shadow-xl shadow-blue-100' : userRating >= 4 ? 'border-emerald-300 hover:border-emerald-400' : userRating > 0 && userRating <= 2 ? 'border-red-200 hover:border-red-300' : 'border-blue-100 hover:border-blue-300 hover:shadow-md'}`}>
                    <button onClick={() => setExpandedQuestion(isExpanded ? null : q.id)} className="w-full text-left p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-base sm:text-lg transition-all ${isExpanded ? 'bg-gradient-to-br from-blue-700 to-indigo-800 text-white' : userRating >= 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                          {userRating >= 4 ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-2 sm:px-2.5 py-1 rounded border ${getCategoryColor(q.category)}`}>
                            {q.category === 'brainteaser' && '⚡ '}
                            {getCategoryLabel(q.category)}
                          </span>
                          <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-2 sm:px-2.5 py-1 rounded border ${getDifficultyColor(q.difficulty)}`}>{q.difficulty}</span>
                          <div className="ml-auto"><StarRating value={userRating} onChange={(v) => updateRating(q.id, v)} size="sm" /></div>
                        </div>
                        <h3 className="text-blue-950 font-serif text-base sm:text-xl leading-snug">{q.question}</h3>
                      </div>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                      </div>
                    </button>


                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
                        <div className="ml-0 sm:ml-16 mt-6 space-y-6">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="h-px w-6 bg-blue-700" />
                              <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Explication</h4>
                            </div>
                            <p className="text-blue-900 leading-relaxed font-light">{q.explanation}</p>
                          </div>


                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="h-px w-6 bg-blue-700" />
                              <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Étapes de réponse</h4>
                            </div>
                            <ol className="space-y-3">
                              {q.steps.map((step, i) => (
                                <li key={i} className="flex gap-4 bg-white rounded-lg p-4 border border-blue-100">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 text-white font-serif text-sm flex items-center justify-center">{i + 1}</div>
                                  <p className="text-blue-900 leading-relaxed flex-1 pt-0.5">{step}</p>
                                </li>
                              ))}
                            </ol>
                          </div>


                          {q.visual && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="h-px w-6 bg-blue-700" />
                                <h4 className="text-blue-950 font-semibold text-sm uppercase tracking-wider">Visualisation</h4>
                              </div>
                              <Visual type={q.visual} />
                            </div>
                          )}


                          {q.tip && (
                            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-5 text-white relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
                              <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-blue-200 text-xs uppercase tracking-[0.2em] font-medium">💡 Conseil de pro</span>
                                </div>
                                <p className="text-white font-light leading-relaxed">{q.tip}</p>
                              </div>
                            </div>
                          )}


                          {/* Notation grand format en fin de carte */}
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
                            <div className="flex items-center justify-between flex-wrap gap-3">
                              <div>
                                <div className="text-amber-900 text-xs uppercase tracking-[0.2em] font-bold mb-1">Mon niveau sur cette question</div>
                                <div className="text-amber-700 text-sm">1 = à revoir | 3 = correct | 5 = je maîtrise totalement</div>
                              </div>
                              <StarRating value={userRating} onChange={(v) => updateRating(q.id, v)} size="lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}


      {/* PAGE: CONCEPTS */}
      {activePage === 'concepts' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 sm:w-12 bg-blue-700" />
              <span className="text-blue-700 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase font-light">Bibliothèque conceptuelle</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-blue-950 leading-tight">
              Les <span className="italic font-light text-blue-700">concepts essentiels</span>
            </h2>
            <p className="text-blue-700 mt-3 font-light max-w-3xl">
              {concepts.length} fiches pédagogiques. Chaque concept : explication en une phrase, formule, approfondissement, tableau de référence, schéma et pièges à éviter.
            </p>
          </div>


          {/* Filtre concepts */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5 mb-8">
            <div className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">Filtrer par thématique</div>
            <div className="flex flex-wrap gap-2">
              {categories.filter((c) => c.id !== 'brainteaser').map((cat) => {
                const Icon = cat.icon;
                const isActive = conceptCategory === cat.id;
                const count = cat.id === 'all' ? concepts.length : concepts.filter((c) => c.category === cat.id).length;
                if (count === 0) return null;
                return (
                  <button key={cat.id} onClick={() => setConceptCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isActive ? 'bg-blue-900 text-white border-blue-900 shadow-md' : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50'}`}>
                    <Icon className="w-4 h-4" />
                    {cat.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20' : 'bg-blue-50'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>


          <div className="space-y-4">
            {filteredConcepts.map((c) => (
              <ConceptCard key={c.id} concept={c} isExpanded={expandedConcept === c.id} onToggle={() => setExpandedConcept(expandedConcept === c.id ? null : c.id)} getCategoryLabel={getCategoryLabel} />
            ))}
          </div>
        </div>
      )}


      {/* PAGE: PROGRESS */}
      {activePage === 'progress' && (
        <ProgressPage questions={questions} ratings={ratings} categories={categories} getCategoryLabel={getCategoryLabel} onReset={resetRatings} setActivePage={setActivePage} setActiveCategory={setActiveCategory} setRatingFilter={setRatingFilter} />
      )}


      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 mt-8 border-t border-blue-200">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-blue-700" />
            <span className="text-blue-700 text-xs tracking-[0.3em] uppercase">Bonne préparation</span>
            <div className="h-px w-12 bg-blue-700" />
          </div>
          <p className="text-blue-600 text-sm font-light italic">
            « In finance, the right answer is rarely a single number — it's a structured argument. »
          </p>
        </div>
      </div>
    </div>
  );
};


export default FinanceInterviewGuide;
