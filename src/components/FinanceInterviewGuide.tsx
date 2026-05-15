// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight, BookOpen, TrendingUp, Calculator, Briefcase, Target, Filter, X, Brain, Star, ListChecks, Library, BarChart3, Award, RotateCcw, CheckCircle2, Bookmark, BookmarkCheck, BookMarked, Globe, User, Triangle, Clock } from 'lucide-react';
import { GuideCard } from './GuideCard';
import { guides } from '@/data/guides';
import { acronymSections } from '@/data/acronyms';


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
    },

    // ===== NOUVELLES QUESTIONS — VALORISATION (Q90-Q95) =====
    {
      id: 90,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce qu'un football field de valorisation ?",
      explanation: "En une phrase — Un graphique en barres horizontales qui affiche côte à côte les fourchettes de valeur données par chaque méthode (DCF, comparables, transactions, LBO). On y lit en un coup d'œil la zone où se situe la \"vraie\" valeur. Pourquoi : outil de synthèse incontournable en M&A, le candidat doit montrer qu'il sait défendre une fourchette, pas un point unique.",
      steps: [
        "Principe : chaque méthode = une barre horizontale (min/max). D'où le nom \"football field\" (terrain de foot vu de haut).",
        "Méthodes typiquement affichées : DCF (sensibilités WACC × g), Trading Comps, Precedent Transactions, LBO (TRI 20-25%), 52-week high/low, broker targets.",
        "Largeur de la barre = incertitude de la méthode. Un DCF large reflète la sensibilité aux hypothèses.",
        "Zone de chevauchement central = fourchette consensuelle, souvent le \"fair value\".",
        "À présenter au client : \"La majorité des méthodes converge entre X et Y, ce qui constitue notre fourchette cible.\"",
        "Astuce : exclure les méthodes peu pertinentes (LBO pour une cotée stable) plutôt que les inclure et minorer.",
        "Erreur fréquente : afficher 8 méthodes pour faire \"sérieux\" — préférer 4-5 méthodes bien construites."
      ],
      tip: "Toujours préciser la date de la valorisation : les multiples bougent de 1-2 turns en quelques mois."
    },
    {
      id: 91,
      category: 'valuation',
      difficulty: 'basique',
      question: "Quels sont les principaux multiples de valorisation et quand les utiliser ?",
      explanation: "En une phrase — Chaque multiple a son terrain de jeu : EV/EBITDA pour l'industrie standard, EV/Sales pour les non-rentables, P/E pour les cotées matures, EV/EBIT pour les industries lourdes, P/B pour les banques. Pourquoi : question d'ouverture classique, le candidat doit montrer qu'il sait choisir le bon multiple selon le secteur et la situation.",
      steps: [
        "EV/EBITDA : multiple universel. Neutre vis-à-vis de la structure financière et des politiques d'amortissement. Référence en M&A mid-cap (6-12x typique).",
        "EV/EBIT : préféré dans les industries capitalistiques (industrie lourde, télécoms). Prend en compte l'usure des actifs via l'amortissement.",
        "EV/Sales : utilisé pour entreprises non rentables (early-stage, retournement) ou très cycliques. Limite : ignore la marge.",
        "P/E (Price/Earnings) : multiple grand public et cotées. Sensible au levier et à la fiscalité — peu comparable cross-border.",
        "P/B (Price/Book) : banques, assurances, foncières — actifs comptables = bonne proxy de valeur économique.",
        "EV/(EBITDA−CAPEX) : industries où le CAPEX de maintenance est énorme (ciment, sidérurgie). Mesure mieux le cash réel généré.",
        "Multiples sectoriels : EV/Reserves (pétrole), EV/Room (hôtellerie), EV/MWh (utilities), EV/ARR (SaaS), EV/Patient (santé).",
        "Forward vs trailing : en M&A on utilise les multiples forward (NTM EBITDA) car ils anticipent la création de valeur."
      ],
      tip: "Toujours préciser si le multiple est trailing (passé) ou forward (futur) — un écart de 12 mois peut faire 20% de différence."
    },
    {
      id: 92,
      category: 'valuation',
      difficulty: 'avancé',
      question: "Pourquoi un même multiple EV/EBITDA peut-il être très différent entre deux sociétés du même secteur ?",
      explanation: "En une phrase — Parce que le multiple capture la qualité du business : croissance, marge, capital intensity, risque. Une entreprise qui croît à 15% avec 25% de marge se paie deux fois plus cher qu'une qui croît à 3% avec 10%. Pourquoi : question avancée qui teste la compréhension intuitive du lien entre fondamentaux et multiples.",
      steps: [
        "Croissance : à WACC égal, une croissance de 8% au lieu de 3% peut doubler le multiple (formule de Gordon).",
        "Marge EBITDA : 30% vs 10% reflète soit du pricing power, soit une structure de coûts moins lourde — premium justifié.",
        "Conversion cash : EBITDA → FCF dépend du CAPEX et du BFR. Deux entreprises avec même EBITDA mais conversion cash différente ne valent pas la même chose.",
        "Récurrence / visibilité : un business subscription/SaaS se paie plus cher qu'un business projet ou one-off.",
        "Taille et liquidité : une mid-cap se paie 20-30% moins cher qu'une large-cap équivalente (size discount).",
        "Risque opérationnel : concentration clients, dépendance fournisseurs, exposition cyclique → décote.",
        "Qualité du management et gouvernance : succession claire, équipe en place, track record → premium.",
        "Synergies attendues : un même actif peut valoir 8x pour un financier et 11x pour un industriel."
      ],
      tip: "Devant un écart de multiple, demande-toi toujours \"qu'est-ce qui justifie cette différence ?\" — pas de prime sans raison."
    },
    {
      id: 93,
      category: 'valuation',
      difficulty: 'avancé',
      question: "Comment valoriser une startup non rentable ?",
      explanation: "En une phrase — Pas de DCF classique possible. On utilise EV/Sales, EV/ARR (SaaS), la méthode VC (rétro-projection depuis la valeur de sortie), ou un DCF long horizon avec courbe en J. Pourquoi : sujet brûlant en PE et VC, teste la capacité à adapter la boîte à outils standard.",
      steps: [
        "Pourquoi le DCF classique ne marche pas : pas de FCF positifs avant 5-10 ans → la valeur dépend entièrement de la valeur terminale.",
        "Méthode 1 — Multiples de revenus : EV/Sales (5-15x pour SaaS premium), EV/ARR pour subscription. Comparer à des transactions récentes.",
        "Méthode 2 — Méthode du Venture Capitalist : projeter la valeur à la sortie à 5-7 ans via un multiple, actualiser à 40-60% (taux qui reflète le risque d'échec).",
        "Méthode 3 — DCF en deux phases : phase d'investissement avec pertes, puis phase de maturité avec marges stabilisées.",
        "Méthode 4 — Métriques opérationnelles : valeur par utilisateur actif (DAU/MAU), LTV/CAC, churn — utilisées en cross-référence.",
        "Méthode 5 — First Chicago Method : pondérer 3 scénarios (succès, base, échec) par leur probabilité.",
        "Tours de table récents : le post-money de la dernière ronde est un point de référence.",
        "Toujours croiser plusieurs méthodes et présenter une fourchette large."
      ],
      tip: "Pour le SaaS, cite la \"règle des 40\" (croissance % + marge EBITDA % ≥ 40) — benchmark standard que les investisseurs adorent entendre."
    },
    {
      id: 94,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce qu'une prime d'acquisition et combien vaut-elle typiquement ?",
      explanation: "En une phrase — C'est l'écart entre le prix payé et le cours de bourse avant rumeur. Typiquement 25-40% pour une cible cotée. Elle paie le contrôle, les synergies attendues, et \"convainc\" les actionnaires de vendre. Pourquoi : question structurante en M&A.",
      steps: [
        "Définition : Prime = (Offre par action / Cours non perturbé) − 1, où \"non perturbé\" = cours 1 mois avant la rumeur.",
        "Niveaux typiques : 25-40% pour une cible cotée standard, jusqu'à 60-100% en bidding war.",
        "Composantes : prime de contrôle pure (~15-20%), valeur des synergies revenant au vendeur, prime stratégique (rareté de l'actif), prime de scarcity.",
        "Pourquoi cette prime : convaincre les actionnaires de vendre, payer valeur stand-alone + part des synergies, couvrir risque d'exécution.",
        "Acheteur stratégique vs financier : un industriel paiera typiquement 15-25% de plus qu'un PE car il extrait des synergies opérationnelles.",
        "Mode de paiement : prime plus élevée en cash qu'en actions (incertitude assumée par l'acheteur).",
        "Sur le non coté : prime difficile à calculer — on regarde les multiples vs comparables.",
        "Erreur d'analyste : utiliser un cours \"spoilé\" (post-rumeur) comme référence — toujours prendre un cours non perturbé."
      ],
      tip: "Dis : \"La prime moyenne en Europe sur 10 ans est ~30%, mais peut atteindre 100% en bidding war (cf. Veolia/Suez)\"."
    },
    {
      id: 95,
      category: 'valuation',
      difficulty: 'intermédiaire',
      question: "Quelle est la différence entre un trading comp et un precedent transaction ?",
      explanation: "En une phrase — Le trading comp regarde les multiples des concurrents cotés en bourse aujourd'hui. Le precedent transaction regarde les multiples auxquels des concurrents ont été VENDUS. Le 2e est plus élevé car il inclut la prime de contrôle. Pourquoi : distinction cruciale en M&A.",
      steps: [
        "Trading comps : multiples des sociétés cotées comparables aujourd'hui (snapshot). Source : Bloomberg, CapIQ, FactSet.",
        "Precedent transactions : multiples payés lors de transactions M&A passées sur des comparables. Source : MergerMarket, Dealogic.",
        "Premier écart — prime de contrôle : les precedents incluent la prime payée pour acquérir le contrôle (~25-40% vs cours).",
        "Deuxième écart — synergies : les multiples de transactions reflètent la valeur attendue des synergies pour l'acheteur stratégique.",
        "Conséquence : les multiples de precedents sont typiquement 1-3 turns d'EBITDA au-dessus des trading comps.",
        "Limites des precedents : données souvent incomplètes (deals privés), conditions de marché passées, hétérogénéité (asset deal vs share deal).",
        "Limites des trading comps : pas de prime de contrôle, sensibles aux fluctuations court-terme, public vs private discount souvent oublié.",
        "Best practice : présenter les deux dans le football field — bornes basses (trading) et bornes hautes (transactions)."
      ],
      tip: "Filtre les transactions pré-COVID si tu cherches un benchmark 2025-2026 — les multiples ont structurellement bougé."
    },

    // ===== NOUVELLES QUESTIONS — DCF (Q96-Q99) =====
    {
      id: 96,
      category: 'dcf',
      difficulty: 'intermédiaire',
      question: "Comment calcule-t-on la valeur terminale ? Quelles méthodes existent ?",
      explanation: "En une phrase — Deux méthodes : Gordon-Shapiro (perpétuité à croissance g) ou Multiple de sortie (EV/EBITDA × EBITDA terminal). On présente toujours les deux. Pourquoi : la valeur terminale fait 60-80% de la valeur DCF — mal la calculer = mal valoriser.",
      steps: [
        "Méthode 1 — Gordon-Shapiro : TV = FCF_n+1 / (WACC − g), où g est la croissance perpétuelle.",
        "Choix de g : doit être ≤ croissance économique long terme (1-3% en zone euro, max ~4% en émergents).",
        "Méthode 2 — Exit Multiple : TV = EBITDA_n × Multiple cible. Multiple basé sur les comparables actuels (médiane).",
        "Sanity check : calculer le g \"implicite\" du multiple de sortie. Si > 4-5%, c'est suspect.",
        "Actualisation : la valeur terminale est en \"année n\" — il faut la ramener à aujourd'hui en divisant par (1+WACC)^n.",
        "Importance dans l'EV : typiquement 60-80% de l'EV → toujours faire des sensibilités sur WACC × g et WACC × multiple.",
        "Mid-year convention : si les FCF tombent au milieu de l'année, ajuster en divisant par (1+WACC)^(n−0,5).",
        "Best practice : présenter les deux méthodes en parallèle, expliquer l'écart, prendre la moyenne ou la médiane."
      ],
      tip: "Si l'écart entre Gordon et Exit Multiple est > 20%, c'est qu'un des deux est mal calibré — refais les hypothèses."
    },
    {
      id: 97,
      category: 'dcf',
      difficulty: 'avancé',
      question: "Qu'est-ce que la mid-year convention et pourquoi l'utiliser ?",
      explanation: "En une phrase — Par défaut on actualise comme si tous les flux tombaient le 31 décembre. La mid-year convention dit : \"En vrai, le cash tombe en continu pendant l'année\". On divise par (1+WACC)^(n−0.5). Résultat : valeur ~5% plus élevée. Pourquoi : détail technique qui distingue les bons candidats.",
      steps: [
        "Convention par défaut : on actualise FCF_n avec (1+WACC)^n, supposant que tout le cash arrive le 31 décembre — irréaliste.",
        "Mid-year convention : on suppose que le cash arrive en moyenne au milieu de l'année (30 juin) → on divise par (1+WACC)^(n−0,5).",
        "Impact : la valeur augmente d'environ √(1+WACC) − 1, soit ~3-5% selon le WACC.",
        "Application à la valeur terminale : si on utilise Gordon, la TV est aussi capitalisée à mid-year → on actualise par (1+WACC)^(n−0,5).",
        "Quand l'utiliser : standard dans les DCF d'investissement bancaire et de PE. Pas systématique en corporate finance.",
        "Pour saisonnalité forte (retail, agroalimentaire) : on peut faire des FCF trimestriels et actualiser au milieu de chaque trimestre.",
        "Stub period : si l'année 1 est partielle (ex: deal en juin), on actualise au milieu de la stub period."
      ],
      tip: "Démarque-toi en mentionnant la mid-year convention spontanément quand tu expliques un DCF — c'est un détail de connaisseur."
    },
    {
      id: 98,
      category: 'dcf',
      difficulty: 'intermédiaire',
      question: "Que se passe-t-il pour la valeur DCF si le WACC augmente de 1% ?",
      explanation: "En une phrase — La valeur baisse fortement : typiquement 10-20% pour 100 bps de WACC en plus. Les flux lointains sont actualisés davantage et surtout la valeur terminale (60-80% de l'EV) chute mécaniquement. Pourquoi : question de sensibilité fréquente.",
      steps: [
        "Effet direct : chaque FCF est divisé par (1+WACC)^t → plus WACC ↑, plus la valeur ↓.",
        "Effet amplifié sur la valeur terminale : Gordon → TV = FCF / (WACC − g). Si WACC passe de 8% à 9% (g = 2%), TV passe de FCF/0,06 à FCF/0,07 → −14%.",
        "Effet de durée : plus l'horizon est long, plus la sensibilité au WACC est forte (intérêts composés).",
        "Ordre de grandeur : +1% WACC ≈ −10 à −20% de valeur (dépendant du business et du g).",
        "Idée intuitive : un WACC plus élevé = investisseurs plus exigeants = business plus risqué ou plus levered = on paie moins cher.",
        "Lien conjoncture : quand les taux montent (2022-2023), le WACC monte → valorisations baissent → moins de deals.",
        "Toujours faire un tableau de sensibilité WACC × g (5×5 ou 7×7) — attendu dans tout pitchbook M&A."
      ],
      tip: "\"Le DCF est un thermomètre des taux d'intérêt\" — quand les taux montent, les valorisations baissent mécaniquement."
    },
    {
      id: 99,
      category: 'dcf',
      difficulty: 'avancé',
      question: "Faut-il utiliser un WACC constant ou variable dans le temps ?",
      explanation: "En une phrase — En théorie variable (la structure de capital évolue), en pratique constant pour simplifier. Sauf en LBO où la dette se rembourse vite : on utilise alors l'APV (Adjusted Present Value). Pourquoi : question avancée, distingue ceux qui ont lu Damodaran.",
      steps: [
        "Argument théorique : la structure financière change → D/V et E/V changent → WACC change. Un WACC constant est une approximation.",
        "Argument pratique : en business \"normal\", la structure cible (D/E) reste stable → WACC ≈ constant. Marche en 90% des cas.",
        "Cas où il faut un WACC variable : LBO, restructuration, entreprise en croissance forte.",
        "Méthode 1 — WACC année par année : recalculer le WACC chaque année avec la structure financière projetée. Lourd et auto-référent.",
        "Méthode 2 — APV (Adjusted Present Value) : actualiser les FCFF au coût UNLEVERED des fonds propres (Ku), puis ajouter séparément la valeur actualisée du tax shield.",
        "Formule APV : EV = Σ FCFF / (1+Ku)^t + Σ Tax_Shield / (1+Kd)^t.",
        "Avantage APV : isole la valeur de la dette (bouclier fiscal) — pédagogique en LBO.",
        "Limite APV : suppose un coût de la dette indépendant du levier — irréaliste à très haut levier."
      ],
      tip: "Mentionner l'APV en LBO impressionne — c'est la méthode \"académique\" enseignée à HEC, ESCP et dans les masters spécialisés."
    },

    // ===== NOUVELLES QUESTIONS — COMPTABILITÉ (Q100-Q106) =====
    {
      id: 100,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Si l'EBITDA augmente de 100€, qu'est-ce qui se passe sur les 3 états financiers ?",
      explanation: "En une phrase — P&L : EBITDA +100, Résultat net +75 (après IS à 25%). Bilan : Cash +75, Equity +75. Cash flow : CFO +75. Pourquoi : variante classique du \"walk me through the financial statements\", teste la maîtrise complète des liens entre états.",
      steps: [
        "P&L : EBITDA +100. Hypothèse : pas d'impact sur D&A ni intérêts. EBIT +100. Résultat avant impôt +100. IS (25%) = −25. Résultat net = +75.",
        "Bilan, actif : la trésorerie augmente de 75 (cash réellement encaissé, après impôt).",
        "Bilan, passif : les réserves (capitaux propres) augmentent de 75.",
        "Le bilan reste équilibré : actif +75 = passif +75. ✓",
        "Tableau de flux : démarrer du résultat net = +75. Pas de retraitement non-cash → CFO +75. CFI et CFF inchangés.",
        "Variation de cash totale : +75, qui correspond bien à la hausse de trésorerie au bilan. ✓",
        "Variante piège : si l'EBITDA augmente via une provision reprise → c'est non-cash → CFO ne bouge pas du même montant.",
        "Variante piège 2 : si l'augmentation vient d'une vente à crédit → cash 0, créances clients +100 → CFO retraité (−100 de ΔBFR)."
      ],
      tip: "Toujours partir du résultat net pour le tableau de flux (méthode indirecte) — c'est la convention IFRS la plus utilisée."
    },
    {
      id: 101,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Qu'est-ce que l'impôt différé et comment se crée-t-il ?",
      explanation: "En une phrase — C'est de l'impôt \"décalé\" dans le temps. Il apparaît quand les règles comptables et fiscales divergent (ex : amortissement 10 ans en compta vs 5 ans en fiscal → moins d'impôt aujourd'hui = DTL). Pourquoi : sujet incontournable en TS et audit.",
      steps: [
        "Définition : différence temporaire entre résultat comptable et résultat fiscal qui se résorbe dans le futur.",
        "DTL (Deferred Tax Liability) — impôt à payer plus tard : on a payé MOINS d'impôt aujourd'hui que ce que les comptes laissent voir. Cas typique : amortissement fiscal plus rapide.",
        "DTA (Deferred Tax Asset) — impôt \"avance\" à récupérer : on a payé PLUS d'impôt aujourd'hui. Cas typique : déficits fiscaux reportables, provisions non déductibles immédiatement.",
        "Sources principales : amortissements (rythme fiscal vs comptable), provisions, pertes reportables, plus-values en sursis, instruments dérivés.",
        "Calcul : différence temporaire × taux d'IS futur attendu (~25% en France 2026).",
        "Présentation au bilan : DTA en actif non courant, DTL en passif non courant. Compensation possible si même juridiction.",
        "Reconnaissance d'un DTA : seulement si l'entreprise prévoit assez de bénéfices futurs pour les utiliser (IAS 12).",
        "Impact M&A : un gros DTA d'une cible déficitaire peut être un actif caché (mais souvent limité par les règles \"change of control\")."
      ],
      tip: "En due diligence, toujours challenger les DTA non reconnus : ils peuvent valoir plusieurs millions et booster le prix."
    },
    {
      id: 102,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Comment traite-t-on les stock-options dans les états financiers ?",
      explanation: "En une phrase — C'est une charge comptable (étalée sur la période d'acquisition) qui dilue les actionnaires. P&L : charge non-cash. Bilan : augmentation des réserves. Valorisation : retraitement via méthode du Treasury Stock pour le diluted EPS. Pourquoi : sujet en pleine actualité (tech, SaaS).",
      steps: [
        "Comptabilisation IFRS 2 : juste valeur des options à la date d'attribution, étalée sur la période d'acquisition (vesting).",
        "Impact P&L : charge de personnel (intégrée dans \"salary\" ou \"SBC\" — Stock-Based Compensation). Non-cash → retraitée dans le CFO.",
        "Impact bilan : la charge crédite un compte de capitaux propres (\"paid-in capital\"). Pas d'impact cash.",
        "Effet dilutif : à l'exercice, de nouvelles actions sont créées → dilution. Méthode Treasury Stock pour calculer le diluted share count.",
        "Méthode Treasury Stock : options ITM, cash récupéré à l'exercice, actions rachetables avec ce cash au cours actuel, Net new shares = options ITM − actions rachetées.",
        "Polémique en tech : Meta, Google affichent un EBITDA élevé en excluant la SBC. Les analystes pro retraitent généralement la SBC en charge cash-équivalente.",
        "En LBO : la SBC du management (MEP) est typiquement structurée en sweet equity ou ratchet, hors comptes IFRS classiques.",
        "Impact valorisation : utiliser le diluted share count (et non le basic) pour calculer le prix par action."
      ],
      tip: "En tech, regarde le ratio SBC / Sales : > 10% = entreprise qui se rémunère \"en papier\" — souvent vu comme un red flag."
    },
    {
      id: 103,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Comment traite-t-on les frais de R&D : charge ou immobilisation ?",
      explanation: "En une phrase — En IFRS, la recherche est en charge, le développement peut être immobilisé si 6 critères sont remplis. En US GAAP, tout est en charge sauf logiciels. Pourquoi : question avancée typique audit/TS, demande une connaissance technique précise des normes.",
      steps: [
        "IFRS — IAS 38 : recherche en charge (P&L immédiat), développement immobilisable si 6 critères (PIRATE).",
        "US GAAP : R&D entièrement en charge (sauf logiciels en développement interne — ASC 350-40).",
        "Impact P&L si capitalisé : la charge devient une immobilisation au bilan, amortie sur 3-10 ans → EBITDA plus élevé, mais D&A plus élevée plus tard.",
        "Manipulation possible : capitaliser agressivement pour gonfler l'EBITDA court terme — red flag majeur en QoE.",
        "Cas spécifique : pharma et biotech capitalisent massivement, tech moins. Analyser le ratio R&D capitalisé / R&D total.",
        "En valorisation : Damodaran propose de re-capitaliser TOUTE la R&D (même en charge) pour mieux refléter la valeur des actifs intangibles.",
        "Sur la conversion cash : que la R&D soit en charge ou capitalisée, le cash sort identiquement.",
        "Goodwill vs intangibles : la R&D capitalisée crée des actifs incorporels qui se déprécient ; le goodwill ne s'amortit pas mais peut être déprécié."
      ],
      tip: "Sur un dossier R&D-intensif, toujours demander la décomposition R&D capitalisée vs en charge — un changement de politique peut tout fausser."
    },
    {
      id: 104,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Quelle est la différence entre CAPEX de maintenance et CAPEX de croissance ?",
      explanation: "En une phrase — Maintenance = remplacer une machine cassée pour rester à isopérimètre. Croissance = augmenter capacité ou entrer sur un nouveau marché. Distinction cruciale en LBO et DCF. Pourquoi : distinction clé en PE et TS.",
      steps: [
        "CAPEX de maintenance : remplacement des actifs existants à hauteur de leur usure. Ordre de grandeur : ≈ D&A annuelle dans un business stable.",
        "CAPEX de croissance : investissements pour augmenter la capacité, ouvrir des sites, développer de nouveaux produits.",
        "Pourquoi la distinction est critique : en valorisation \"stand-alone\", on doit couvrir au minimum le CAPEX de maintenance. Le CAPEX de croissance est optionnel.",
        "FCF maintenance = EBITDA − maintenance CAPEX − ΔBFR − impôts ; FCF total = idem − growth CAPEX.",
        "En LBO : on regarde si la cible peut financer le CAPEX maintenance ET le service de la dette à partir de l'EBITDA.",
        "Comment le mesurer : (a) demander au management, (b) comparer historique CAPEX vs D&A, (c) regarder les projets identifiés.",
        "Cas piège : entreprise en surinvestissement (CAPEX >> D&A pendant 5 ans) → analyser la nature.",
        "Reporting réglementaire : certaines normes demandent de séparer maintenance vs growth dans le business plan."
      ],
      tip: "En due diligence financière, demande une analyse de CAPEX par catégorie (maintenance / IT / expansion / réglementaire)."
    },
    {
      id: 105,
      category: 'accounting',
      difficulty: 'avancé',
      question: "Comment fonctionne le test d'impairment du goodwill ?",
      explanation: "En une phrase — Le goodwill ne s'amortit pas, mais on teste chaque année s'il vaut toujours sa valeur comptable. On compare valeur recouvrable (max entre fair value et value in use) à la valeur comptable de la CGU. Si inférieure → on déprécie. Irréversible. Pourquoi : question avancée audit/TS.",
      steps: [
        "Principe IAS 36 : le goodwill n'est jamais amorti. Test annuel obligatoire, plus dès qu'un indice de perte existe.",
        "Niveau du test : Cash Generating Unit (CGU) — unité la plus petite générant des flux indépendants.",
        "Étape 1 — Allocation du goodwill aux CGU lors de l'acquisition.",
        "Étape 2 — Calcul de la valeur recouvrable = max (Juste valeur − coûts de cession ; Valeur d'utilité via DCF).",
        "Étape 3 — Comparaison : si Valeur recouvrable < Valeur comptable de la CGU → perte d'impairment.",
        "Étape 4 — Comptabilisation : la perte vient d'abord déprécier le goodwill, puis les autres actifs de la CGU au prorata.",
        "Irréversibilité : une dépréciation de goodwill NE SE REPRISE JAMAIS (contrairement aux autres actifs).",
        "Impact P&L et bilan : charge non-cash, mais signal négatif fort (\"on a payé trop cher\").",
        "Cas célèbres : Vivendi/USA Networks, Bayer/Monsanto, AOL/Time Warner.",
        "En M&A : un impairment historique sur la cible est un red flag."
      ],
      tip: "Toujours challenger les hypothèses de l'impairment test : un management \"optimiste\" va surestimer la valeur d'utilité pour éviter de déprécier."
    },
    {
      id: 106,
      category: 'accounting',
      difficulty: 'intermédiaire',
      question: "Comment reconnaît-on un revenu en IFRS 15 ?",
      explanation: "En une phrase — 5 étapes : (1) identifier le contrat, (2) identifier les obligations de performance, (3) déterminer le prix, (4) allouer le prix, (5) reconnaître le revenu quand chaque obligation est satisfaite. Pourquoi : norme majeure depuis 2018, question typique audit/TS.",
      steps: [
        "Étape 1 — Contrat : identifier le contrat avec un client (oral, écrit, implicite si récurrent).",
        "Étape 2 — Obligations de performance : décomposer le contrat en obligations distinctes (matériel + maintenance = 2 obligations).",
        "Étape 3 — Prix total : déterminer la contrepartie attendue (fixe + variable, ajustée pour rabais probables).",
        "Étape 4 — Allocation : répartir le prix entre les obligations selon leur prix de vente standalone.",
        "Étape 5 — Reconnaissance : point-in-time si l'obligation est terminée d'un coup, over time si elle se déroule dans le temps.",
        "Cas SaaS : revenu reconnu linéairement sur la durée du contrat. Cash encaissé d'avance → Deferred Revenue au passif.",
        "Cas construction : reconnaissance over time selon l'avancement (méthode du pourcentage d'avancement).",
        "Cas télécoms : abonnement + téléphone = allocation entre obligations → revenu téléphone reconnu day 1, abonnement sur 24 mois.",
        "Indicateurs clés : Deferred Revenue (cash reçu non reconnu) au bilan ; Bookings vs Revenue dans le P&L."
      ],
      tip: "En SaaS, ne jamais confondre ARR (Annual Recurring Revenue, métrique business) et Revenue IFRS (métrique comptable) — ils diffèrent."
    },

    // ===== NOUVELLES QUESTIONS — M&A (Q107-Q111) =====
    {
      id: 107,
      category: 'ma',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'un purchase price allocation (PPA) ?",
      explanation: "En une phrase — Quand on achète une entreprise, on doit réallouer le prix payé entre les actifs identifiables (machines, marques, contrats clients) à leur juste valeur, et le reste devient du goodwill. Pourquoi : sujet technique très posé en TS et audit.",
      steps: [
        "Définition : exercice obligatoire (IFRS 3) consistant à allouer le prix d'acquisition entre les actifs et passifs identifiables et le goodwill.",
        "Étape 1 — Évaluer à la juste valeur tous les actifs et passifs identifiables (corporels, incorporels, dettes). Souvent au-dessus de la valeur comptable.",
        "Étape 2 — Identifier des actifs incorporels non comptabilisés chez la cible : marques, listes clients, brevets, technologie, contrats long terme.",
        "Étape 3 — Calculer le goodwill = Prix payé − Juste valeur nette des actifs identifiables.",
        "Étape 4 — Définir les durées d'amortissement des incorporels (marques 10-20 ans, clients 5-15 ans, technologie 3-7 ans).",
        "Étape 5 — Comptabiliser un éventuel deferred tax liability lié aux step-ups d'actifs.",
        "Impact P&L post-acquisition : D&A supplémentaire sur les actifs identifiés → résultat net consolidé plus bas.",
        "PPA préliminaire vs final : 12 mois pour finaliser (IFRS 3)."
      ],
      tip: "Sois attentif au ratio Goodwill/Prix : > 70% suggère un PPA superficiel ou une cible aux actifs très incorporels."
    },
    {
      id: 108,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Quels sont les types de synergies en M&A et comment les estimer ?",
      explanation: "En une phrase — Deux familles : synergies de revenus (cross-selling, pricing power) et synergies de coûts (suppression de doublons, économies d'échelle). Les synergies de coûts sont 2x plus fiables. Toujours présenter en valeur actualisée. Pourquoi : question fondamentale en M&A.",
      steps: [
        "Synergies de coûts (les plus fiables) : suppression de doublons (siège, fonctions support), économies d'échelle achats, consolidation de sites, IT.",
        "Synergies de revenus (plus incertaines) : cross-selling de produits, accès à de nouveaux marchés géographiques, pricing power accru, R&D combinée.",
        "Synergies financières : bouclier fiscal (utilisation de déficits), optimisation BFR, accès à des financements moins chers.",
        "Synergies négatives (dissynergies) : perte de clients, dépréciation de marques, départ de talents clés.",
        "Estimation : benchmarker des transactions similaires (synergies = 5-15% du CA de la cible), bottom-up site par site, top-down par fonction.",
        "Coûts d'intégration : règle empirique = 1-2x les synergies annuelles en one-off (réorganisation, IT, communication).",
        "Calendrier : 60% des synergies à 1 an, 80% à 2 ans, 100% à 3 ans (rare avant).",
        "Valorisation : Σ Synergies nettes actualisées au WACC du combined → ajoute typiquement 10-20% à la valeur stand-alone."
      ],
      tip: "Cite la règle empirique : \"synergies réalisées = 60-80% des synergies annoncées\" — montre ta lucidité d'analyste."
    },
    {
      id: 109,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Quelles sont les conditions suspensives typiques d'un SPA ?",
      explanation: "En une phrase — Conditions à remplir entre signing et closing : autorisations antitrust, financement, autorisations sectorielles, MAC clause, conditions opérationnelles. Pourquoi : question juridico-financière fréquente, teste la phase entre signing et closing.",
      steps: [
        "Antitrust / concurrence : approbation des autorités (DG COMP en Europe, FTC/DOJ aux US, AMF en France). Délais : 25 jours minimum, jusqu'à 6+ mois pour phase II.",
        "Réglementaire sectoriel : banque (BCE, ACPR), assurance (ACPR), télécoms (ARCEP), énergie (CRE), défense (procédure FDI).",
        "Foreign Direct Investment (FDI) : contrôle des investissements étrangers, en hausse depuis 2019 (loi PACTE en France).",
        "Financement (rare) : \"financing condition\" parfois pour les LBO si le financement n'est pas committé.",
        "MAC clause (Material Adverse Change) : permet de sortir du deal si un événement adverse majeur survient sur la cible entre signing et closing.",
        "Conditions opérationnelles : renouvellement de contrats clés, transfert de licences, autorisations spécifiques.",
        "No-leakage (pour locked box) : engagement du vendeur à ne pas extraire de cash entre la locked box date et le closing.",
        "Risques : un deal qui rate au closing pour cause antitrust (ex: Siemens/Alstom 2019, Illumina/Grail 2024) = perte sèche."
      ],
      tip: "Pour un deal cross-border, toujours mentionner FDI et antitrust dans plusieurs juridictions — délais de 6-12 mois possibles."
    },
    {
      id: 110,
      category: 'ma',
      difficulty: 'avancé',
      question: "Comment se structure un deal en cash + actions vs all-cash vs all-stock ?",
      explanation: "En une phrase — All-cash : prix certain, levier financier. All-stock : préserve le cash mais dilue. Mixte : combine. Le choix dépend de la valorisation relative, du levier, et du désir de partager le risque post-deal. Pourquoi : question stratégique avancée.",
      steps: [
        "All-cash : prix certain pour le vendeur, levier financier pour l'acheteur (si financé par dette), pas de dilution. Préféré par les vendeurs.",
        "All-stock : l'acheteur préserve son cash, les actionnaires de la cible deviennent actionnaires du combined → exposés à l'execution risk, ratio d'échange basé sur les cours pré-deal.",
        "Mixte (cash + actions) : compromis. Permet d'optimiser fiscalité (régime de roll-over) et de partager le risque post-deal.",
        "Choix selon valorisation relative : si A cher (P/E élevé), payer en actions est avantageux ; si A sous-valorisé, payer en cash préserve la valeur.",
        "Choix selon levier : si A déjà très levered, payer en actions évite de surcharger le bilan.",
        "Signaling theory : payer en cash signale confiance ; payer en actions peut signaler que A pense ses propres actions surévaluées.",
        "Impact accretion/dilution : all-cash est plus relutif si le yield après-impôt du cash < yield d'EBITDA de la cible.",
        "Fiscalité : en France, paiement en actions peut bénéficier d'un régime de différé d'imposition (article 150-0 B ter CGI)."
      ],
      tip: "Cite l'exemple : \"LVMH/Tiffany 2021 = all-cash car LVMH avait la trésorerie et voulait pas diluer la famille Arnault\"."
    },
    {
      id: 111,
      category: 'ma',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce qu'un break-up fee et un reverse break-up fee ?",
      explanation: "En une phrase — Break-up fee : indemnité que la CIBLE paie à l'acheteur si elle se retire. Reverse break-up fee : indemnité que l'ACHETEUR paie si LUI se retire (souvent en cas de problème antitrust). Niveau typique : 2-5% de l'EV. Pourquoi : concept juridique fréquemment demandé en M&A.",
      steps: [
        "Break-up fee : payée par la cible à l'acheteur en cas de retrait. Protège l'acheteur contre les coûts engagés (DD, advisors).",
        "Cas d'application : cible accepte une meilleure offre (bidding war), board change de recommandation, actionnaires votent contre le deal.",
        "Reverse break-up fee : payée par l'acheteur à la cible si l'acheteur se retire pour des raisons sous son contrôle.",
        "Cas typiques de reverse fee : financement non bouclé, refus antitrust, acheteur change d'avis.",
        "Niveaux typiques : 2-4% de l'EV pour break-up fee classique, jusqu'à 5-7% pour reverse fee en cas de risque antitrust élevé.",
        "Cas emblématiques : AT&T/T-Mobile 2011 = $4Mds de reverse break-up fee payés par AT&T après échec antitrust.",
        "Encadrement juridique : aux US le break-up fee doit être \"reasonable\" (Revlon doctrine), en Europe pas de limite formelle.",
        "Lien avec exclusivité : break-up fee = compensation pour avoir donné l'exclusivité pendant la phase de DD."
      ],
      tip: "Différencie break-up fee et expense reimbursement : la 2e couvre juste les frais (advisors, banques) sans pénalité."
    },

    // ===== NOUVELLES QUESTIONS — LBO (Q112-Q117) =====
    {
      id: 112,
      category: 'lbo',
      difficulty: 'basique',
      question: "Comment calcule-t-on le TRI (IRR) et le MOIC en LBO ?",
      explanation: "En une phrase — MOIC = combien de fois on a multiplié son investissement (cash out / cash in). TRI = rendement annualisé en %. Cibles standards en PE : MOIC 2,5-3x sur 5 ans, TRI 20-25%. Pourquoi : métriques fondamentales du PE, question quasi systématique.",
      steps: [
        "MOIC = Total cash retourné aux investisseurs / Investissement initial. Métrique de \"absolute return\".",
        "TRI (Internal Rate of Return) = taux d'actualisation qui annule la VAN des flux. Métrique de \"time-adjusted return\".",
        "Relation simple si un seul cash-in et un seul cash-out : MOIC = (1 + TRI)^n, où n = horizon en années.",
        "Exemple : MOIC 3x sur 5 ans → TRI = 3^(1/5) − 1 = 24,6%.",
        "Cibles standards PE : MOIC 2,5-3x sur 5 ans, TRI 20-25% (TRI net après carried interest = ~15-20%).",
        "Mid-market : TRI cible plus élevé (25-30%) car risque opérationnel supérieur.",
        "Sources de TRI en LBO : (a) croissance EBITDA, (b) multiple expansion, (c) debt paydown (deleveraging).",
        "Limites : TRI peut être gonflé par des sorties rapides (dividend recap), MOIC peut être faible mais TRI élevé sur short hold.",
        "DPI (Distributions to Paid-In) : argent réellement rendu aux LPs. TVPI (Total Value to Paid-In) : DPI + valeur résiduelle."
      ],
      tip: "En entretien PE, sache calculer mentalement : MOIC 2x sur 5 ans = TRI ~15% ; 3x sur 5 ans = ~25% ; 2x sur 3 ans = ~26%."
    },
    {
      id: 113,
      category: 'lbo',
      difficulty: 'intermédiaire',
      question: "Quelle est la décomposition de la création de valeur en LBO ?",
      explanation: "En une phrase — 3 leviers : (1) Croissance d'EBITDA, (2) Multiple expansion, (3) Debt paydown. Sur un deal réussi, la croissance d'EBITDA fait typiquement 50% de la création de valeur. Pourquoi : question structurante en PE.",
      steps: [
        "Levier 1 — Croissance EBITDA : augmentation organique (CA, marges) ou via acquisitions (build-up). Source de valeur la plus \"noble\".",
        "Levier 2 — Multiple expansion : acheter à 8x EBITDA et revendre à 10x. Difficile à prédire — dépend du cycle.",
        "Levier 3 — Debt paydown : à EV stable, si la dette baisse de 50, l'equity augmente de 50. Mécanique pure.",
        "Décomposition standard d'un LBO réussi : EBITDA growth ~50%, multiple expansion ~20%, deleveraging ~30%.",
        "Décomposition standard d'un LBO raté : EBITDA flat 0%, multiple compression −30%, deleveraging 30% → MOIC ≤ 1x.",
        "Effet de levier financier : plus le levier initial est élevé, plus la sensibilité du TRI à l'EBITDA est forte.",
        "Exemple : EV 100, debt 60, equity 40. Si EBITDA × 1,5 à multiple constant, EV = 150. Si dette remboursée à 30, equity = 120 = 3x MOIC.",
        "Risque de l'effet de levier : ça marche dans les deux sens. EBITDA × 0,8 peut détruire toute l'equity."
      ],
      tip: "En entretien, dessine la \"value creation bridge\" : pile d'EBITDA × multiple = EV → enlever la dette = equity, avec les 3 leviers identifiés."
    },
    {
      id: 114,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'un covenant et quels sont les principaux en LBO ?",
      explanation: "En une phrase — Engagements financiers que la cible doit respecter pour garder son financement (Dette/EBITDA < 5x, EBITDA/Intérêts > 2x). Si breach, les banques peuvent exiger remboursement anticipé. Pourquoi : question avancée en LBO et structured finance.",
      steps: [
        "Définition : engagements contractuels (positifs ou négatifs) que l'emprunteur doit respecter sur la durée du financement.",
        "Covenants financiers : ratios à respecter trimestriellement, testés par les banques.",
        "Maintenance covenants : doivent être respectés en permanence, testés chaque trimestre. Ex : Net Debt/EBITDA < 5x, EBITDA/Interest > 2x.",
        "Incurrence covenants : déclenchés seulement lors d'évènements spécifiques (nouvelle dette, dividende, acquisition).",
        "Covenants opérationnels : pas de cession d'actifs > X€, pas de nouvelle dette, pas de dividendes au-dessus d'un cap.",
        "\"Cov-lite\" : financements à covenants allégés (uniquement incurrence). Très répandus aux US, en hausse en Europe.",
        "Conséquences du breach : (a) waiver du prêteur (avec fee), (b) renégociation, (c) accélération de la dette = défaut.",
        "Headroom : marge avant breach. Un fonds PE négocie typiquement 30-40% de headroom à l'origine.",
        "Equity cure : possibilité pour le sponsor d'injecter de l'equity pour remédier au breach (max 1-2 fois par 5 ans typiquement)."
      ],
      tip: "En analyse de deal, regarde toujours le \"headroom\" sur Dette/EBITDA au pire moment du business plan — si < 10%, le financement est trop serré."
    },
    {
      id: 115,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'une dette PIK et de la mezzanine ?",
      explanation: "En une phrase — Mezzanine : dette subordonnée (entre senior et equity), plus chère (10-15%), souvent avec warrants. PIK (Payment In Kind) : intérêts payés non en cash mais en nouvelle dette → préserve le cash. Pourquoi : question avancée sur la structuration LBO.",
      steps: [
        "Hiérarchie en LBO : (1) Senior debt (TLA, TLB, RCF), (2) Senior secured bonds, (3) Mezzanine, (4) Unitranche, (5) Equity.",
        "Mezzanine : dette subordonnée, taux 10-15%, souvent assortie d'un warrant donnant accès à l'equity (1-5%). Subordonnée à la senior en cas de défaut.",
        "PIK (Payment In Kind) : les intérêts ne sont pas payés en cash mais accumulés en dette additionnelle. Capital + intérêts à payer in fine.",
        "Avantage PIK : préserve le cash pour rembourser la senior, utile en début de LBO quand l'EBITDA n'est pas encore optimisé.",
        "Inconvénient PIK : la dette gonfle exponentiellement (intérêts sur intérêts), peut atteindre 2-3x le capital initial à 5 ans.",
        "Mezzanine vs PIK : la mezzanine peut être PIK, partial PIK (mix cash + PIK), ou full cash.",
        "Unitranche : combine senior + mezzanine en un seul tranche, structuré par les fonds de dette (Tikehau, Hayfin, ICG). Taux intermédiaire (6-9%).",
        "Usage typique : LBO mid-cap = 60% senior + 10-15% mezz/PIK + 25% equity. Large-cap = senior + bonds."
      ],
      tip: "La PIK est en plein retour en 2024-2025 avec la hausse des taux — elle permet de continuer à structurer des LBO sans tuer le cash flow."
    },
    {
      id: 116,
      category: 'lbo',
      difficulty: 'avancé',
      question: "Qu'est-ce qu'un dividend recap et pourquoi en faire un ?",
      explanation: "En une phrase — Le fonds PE re-leverage la cible (nouvelle dette) pour se reverser un dividende exceptionnel. Permet de cristalliser une partie du TRI sans vendre. Pourquoi : stratégie de PE très d'actualité, montre une vision approfondie du modèle.",
      steps: [
        "Mécanique : la cible émet de la nouvelle dette, le produit sert à verser un dividende exceptionnel au fonds.",
        "Effet sur le sponsor : récupère du cash (réduit son capital immobilisé), améliore le TRI sur le hold.",
        "Effet sur la cible : levier ré-augmente, future flexibilité réduite, intérêts en hausse.",
        "Conditions favorables : EBITDA solide, marchés de dette ouverts, covenants respectés avec marge.",
        "Typique : à mi-hold (2-3 ans après l'entry), quand la dette initiale a été remboursée et que l'EBITDA a grandi.",
        "Impact TRI : recap à 3 ans qui rend 50% de l'investissement initial → TRI augmente de plusieurs points (effet \"raccourcissement\").",
        "Limites : peut fragiliser la cible si le marché tourne (vu en 2008 et 2022), tension avec les prêteurs initiaux, signal \"vente difficile\" si répété.",
        "Cas emblématiques : Pizza Hut, Toys \"R\" Us (recap excessifs → faillite), Burger King (TPG/3G)."
      ],
      tip: "Évoquer \"Toys R Us\" comme exemple de recap excessif qui a tué la cible — montre une lucidité critique sur les pratiques PE."
    },
    {
      id: 117,
      category: 'lbo',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce qu'un secondary buy-out (SBO) et pourquoi ça se développe ?",
      explanation: "En une phrase — Un fonds PE vend à un autre fonds PE. C'est désormais 40-50% des sorties en Europe. Beaucoup de dry powder, peu de cibles, et les fonds spécialisés peuvent encore créer de la valeur. Pourquoi : tendance majeure du PE.",
      steps: [
        "Définition : sortie d'un fonds PE vers un autre fonds PE (financial-to-financial). Par opposition à une vente stratégique ou une IPO.",
        "Part de marché : 40-50% des exits PE en Europe en 2023-2024, contre 20% il y a 15 ans.",
        "Drivers : (a) dry powder massif (~$2,5T globalement), (b) peu de cibles de qualité, (c) cibles déjà \"PE-ready\".",
        "Pourquoi le SBO marche : (a) le nouveau fonds peut avoir une spécialisation différente, (b) thèses différentes (build-up, internationalisation, transformation digitale), (c) injection de fresh equity.",
        "Limites : (a) \"double-dipping\" perçu négativement, (b) multiple expansion plus dure à second round, (c) tensions sur les management packages.",
        "Tertiary, quaternary buyouts : phénomène en hausse — un même actif change de mains 3-4 fois entre fonds PE.",
        "Cas emblématique : Picard Surgelés (LBO 6 fois consécutives entre 2001 et 2024).",
        "Risques pour le marché : \"musical chairs\" effect — quand les taux montent, plus personne ne veut acheter."
      ],
      tip: "Cite Picard ou Verallia comme exemples de \"PE serial\" — actifs passés de fonds en fonds, illustrant la maturité du marché."
    },

    // ===== NOUVELLES QUESTIONS — TS (Q118-Q122) =====
    {
      id: 118,
      category: 'ts',
      difficulty: 'basique',
      question: "Qu'est-ce qu'un EBITDA bridge ?",
      explanation: "En une phrase — Tableau qui détaille comment on passe de l'EBITDA \"reporté\" à l'EBITDA \"ajusté\" (normalisé) qui servira au calcul du prix. Chaque ligne = un ajustement (non-récurrent, pro-forma, mark-up). Pourquoi : LE livrable phare de la DD financière.",
      steps: [
        "Point de départ : EBITDA reporté dans les comptes audités.",
        "Ajustements \"one-off\" : éléments non-récurrents à retirer (charges de restructuration, litiges, pertes exceptionnelles, coûts de cession).",
        "Ajustements \"pro-forma\" : impact des acquisitions/cessions réalisées en cours d'année (mise sur 12 mois pleins).",
        "Ajustements \"management\" : add-backs proposés par le management (consultants, frais salon, surperformance one-off) — à challenger sévèrement.",
        "Ajustements \"normalisation\" : éléments anormaux à standardiser (rémunération dirigeants, loyers intra-groupe non market).",
        "Ajustements IFRS 16 : retraitement des loyers en amortissements + intérêts.",
        "Output : EBITDA ajusté + run-rate (annualisé) = base de calcul du prix.",
        "Best practice : tagger chaque ajustement (Quality A/B/C) selon la robustesse — les acheteurs n'acceptent pas tous les ajustements."
      ],
      tip: "En TS, garde toujours en tête : \"le vendeur veut maximiser l'EBITDA ajusté, l'acheteur veut le minimiser\" — ton rôle est de défendre la vérité économique."
    },
    {
      id: 119,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce que la Quality of Revenue (QoR) ?",
      explanation: "En une phrase — Analyse de la \"qualité\" du chiffre d'affaires : récurrent vs one-shot, par client, par produit, par géographie, churn, LTV, pricing power. Voir si le CA est solide et prévisible. Pourquoi : devenue centrale en 2020-2025 avec l'explosion du SaaS.",
      steps: [
        "Définition : analyse approfondie du CA pour évaluer sa \"robustesse\" — récurrence, prévisibilité, sensibilité aux risques.",
        "Récurrence : décomposer CA récurrent (subscription, contrat long terme) vs one-shot (projet, vente). Premium pour le récurrent.",
        "Concentration client : top 10 clients = % du CA. Si > 50% = red flag.",
        "Churn et rétention : Net Revenue Retention (NRR), Gross Retention, churn brut/net. Standards SaaS : NRR > 110% = excellent.",
        "Pricing power : capacité de la cible à augmenter ses prix (passage à des hausses tarifaires).",
        "Cohorte clients : comportement par génération de clients (acquisition année N, suivi sur 5 ans).",
        "Backlog / pipeline : visibilité sur le CA futur via les contrats signés ou les prospects.",
        "KPIs SaaS spécifiques : ARR, MRR, ACV, LTV/CAC, Magic Number, Rule of 40."
      ],
      tip: "En SaaS, demande toujours la NRR (Net Revenue Retention) — si < 100% = la base clients fond, signal très négatif."
    },
    {
      id: 120,
      category: 'ts',
      difficulty: 'avancé',
      question: "Comment fonctionne le processus de completion accounts ?",
      explanation: "En une phrase — À l'opposé du locked box, on calcule le prix EFFECTIF au jour du closing : prix négocié ajusté à la hausse/baisse selon dette nette et BFR REELS au closing. Process plus long mais plus juste. Pourquoi : question technique typique en TS et M&A.",
      steps: [
        "Principe : le prix final n'est connu qu'APRÈS le closing, une fois les comptes de closing préparés et validés.",
        "Étape 1 — Signing : SPA signé avec un prix \"estimé\" + formule d'ajustement (cash-free debt-free + working capital target).",
        "Étape 2 — Closing : transfer de propriété. L'acheteur paye un prix \"préliminaire\" basé sur la dette nette estimée.",
        "Étape 3 — Completion accounts : production des comptes au jour du closing (typiquement 30-90 jours après), par l'acheteur.",
        "Étape 4 — Calcul du prix final : Prix final = Prix base + (BFR réel − BFR target) − (Dette nette réelle − Dette nette estimée).",
        "Étape 5 — Settlement : versement complémentaire à la hausse (par acheteur) ou à la baisse (par vendeur) typiquement dans 60 jours.",
        "Litiges fréquents : sur la définition exacte de cash, debt-like items, et BFR — résolus par un expert indépendant (typiquement un Big 4).",
        "Avantage : prix juste, basé sur la réalité économique au closing. Inconvénient : long, complexe, source de litiges."
      ],
      tip: "Dans 80% des deals en France, c'est plutôt du locked box (plus simple et plus rapide). Le completion accounts reste standard aux US et en cross-border complexe."
    },
    {
      id: 121,
      category: 'ts',
      difficulty: 'intermédiaire',
      question: "Qu'est-ce que le mécanisme cash-free debt-free et comment l'appliquer ?",
      explanation: "En une phrase — Le vendeur récupère tout le cash de la cible avant la vente, et rembourse toute la dette. L'acheteur n'achète \"que\" l'opérationnel. Base de tout calcul de prix en M&A privé. Pourquoi : convention de marché incontournable.",
      steps: [
        "Principe : on définit un prix sur la base d'une Enterprise Value (hors structure financière), puis on ajuste pour la dette nette réelle au closing.",
        "Prix réellement payé = EV − Dette nette + Cash − Ajustement BFR.",
        "\"Cash-free\" : le vendeur a récupéré tout le cash excédentaire avant la vente (sinon l'acheteur paierait pour son propre cash).",
        "\"Debt-free\" : la dette financière est censée être remboursée au closing par le vendeur — sinon le prix est réduit du montant de la dette.",
        "En pratique : on ne rembourse pas la dette (trop coûteux en pénalités), on ajuste juste le prix.",
        "Cash minimum : il faut laisser dans la cible le \"cash de fonctionnement\" pour les opérations courantes (1-2 semaines de décaissement).",
        "Debt-like items : éléments à traiter comme de la dette même s'ils ne sont pas dans la dette financière (provisions retraites, leasings, earn-out passés, fiscalité différée).",
        "Working capital target : pour éviter que le vendeur \"vide\" le BFR avant la vente, on fixe un BFR cible (moyenne 12 mois)."
      ],
      tip: "La négociation porte typiquement plus sur la définition de \"debt like items\" que sur le multiple lui-même — où sont les vraies batailles."
    },
    {
      id: 122,
      category: 'ts',
      difficulty: 'avancé',
      question: "Comment normalise-t-on le BFR pour une transaction ?",
      explanation: "En une phrase — On calcule la moyenne du BFR sur 12-24 mois pour neutraliser la saisonnalité. On vérifie qu'il n'y a pas de window dressing. On retraite les éléments non récurrents pour obtenir un BFR \"normatif\" qui servira de target. Pourquoi : sujet pratique central en TS.",
      steps: [
        "Définition BFR normatif : niveau \"moyen normal\" du BFR nécessaire pour faire tourner l'activité de manière standard.",
        "Méthode 1 — Moyenne 12 mois : moyenne mensuelle sur les 12 derniers mois. Neutralise la saisonnalité.",
        "Méthode 2 — Moyenne 24 mois : si saisonnalité ou volatilité forte. Plus robuste.",
        "Méthode 3 — Ratios : DSO (Days Sales Outstanding), DPO (Days Payable Outstanding), DIO (Days Inventory Outstanding) appliqués au CA prévisionnel.",
        "Retraitements typiques : (a) clients exceptionnels, (b) factoring/affacturage (à reverser pour voir le vrai BFR), (c) avances clients (deferred revenue), (d) variations exceptionnelles de stock.",
        "Window dressing : le vendeur peut artificiellement réduire le BFR en fin d'année → analyser la tendance mois par mois.",
        "Saisonnalité : retail, agroalimentaire, jouets — pic de stock avant les périodes hautes. Analyser sur cycle complet.",
        "Use case : le BFR normatif sert de \"target\" dans le SPA. Toute déviation au closing impacte le prix (1:1)."
      ],
      tip: "Toujours grapher le BFR sur 24 mois mensuel — la saisonnalité saute aux yeux et indique le bon niveau de target."
    },

    // ===== NOUVELLES QUESTIONS — FIT & BRAINTEASERS (Q123-Q130) =====
    {
      id: 123,
      category: 'brainteaser',
      difficulty: 'basique',
      question: "Où vous voyez-vous dans 5 ans ?",
      explanation: "En une phrase — Réponse en 3 temps : (1) ambition concrète à 5 ans, (2) compétences à acquérir, (3) ouverture sans donner l'impression de \"passer\" par le poste. Pourquoi : question fit ultra classique, teste projection, ambition, cohérence avec le poste.",
      steps: [
        "Erreur 1 : \"Je serai associé(e)\" — trop ambitieux, déconnecté du parcours (associé = 10-15 ans en M&A).",
        "Erreur 2 : \"Je ne sais pas, j'avance\" — manque d'ambition, peu rassurant.",
        "Erreur 3 : \"Dans une autre industrie\" — montre que tu vois le poste comme un tremplin = red flag.",
        "Bonne approche : \"Dans 5 ans, je me vois en VP/Senior chez vous, avec une expertise solide sur [secteur/type de deal], capable de driver des deals de A à Z.\"",
        "Pour M&A boutique : \"Senior Associate avec une responsabilité directe sur des deals mid-cap, idéalement en cross-border.\"",
        "Pour PE : \"Senior Associate dans votre fonds, ayant participé à 3-4 deals d'investissement et 1-2 sorties.\"",
        "Pour TS : \"Senior Manager Big 4, expert sur [secteur], avec une double compétence financière et industrielle.\"",
        "Bonus : mentionner une compétence à développer (\"structuration\", \"modélisation avancée\", \"leadership d'équipe\").",
        "Ne JAMAIS dire : entrepreneur, autre cabinet, autre industrie, reconversion."
      ],
      tip: "Connecte ta vision 5 ans avec le poste précis : \"ce poste est la meilleure plateforme pour atteindre cet objectif\" — boucle parfaite."
    },
    {
      id: 124,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Racontez-moi un échec.",
      explanation: "En une phrase — Choisir un VRAI échec (pas un faux modeste), analyser lucidement, expliquer les leçons apprises, montrer comment on a corrigé. Pourquoi : question fit révélatrice, teste honnêteté, capacité d'apprentissage, solidité psychologique.",
      steps: [
        "Erreur 1 — Le faux échec : \"j'ai eu 17 au lieu de 18 à un examen\" — détecté en 1 seconde.",
        "Erreur 2 — L'échec déguisé en victoire : \"j'ai raté X mais c'est devenu un succès\" — esquive.",
        "Erreur 3 — L'échec catastrophique : \"j'ai fait perdre 1M€ à mon stage\" — trop risqué.",
        "Bonne approche : un échec modéré, lucidement analysé.",
        "Structure STAR-L : Situation, Tâche, Action, Résultat (l'échec), Learning.",
        "Catégorie 1 — Échec de gestion d'équipe : \"J'ai sous-estimé la communication avec mon équipe en assoc' étudiante → projet en retard. J'ai appris à over-communiquer.\"",
        "Catégorie 2 — Échec de prise de décision : \"J'ai pris une décision trop vite sur [X], sans collecter tous les éléments. Depuis, j'utilise une grille de critères.\"",
        "Catégorie 3 — Échec académique : \"J'ai raté [examen] à cause de [cause]. J'ai changé ma méthode et réussi [équivalent] ensuite.\"",
        "Ne JAMAIS prendre : échec relationnel grave, problème de santé mentale, échec professionnel grave (licenciement)."
      ],
      tip: "Finis sur le learning, pas sur l'échec. \"Aujourd'hui je [comportement changé].\" = mature."
    },
    {
      id: 125,
      category: 'brainteaser',
      difficulty: 'basique',
      question: "Comment gérez-vous le stress et la pression ?",
      explanation: "En une phrase — (1) reconnaître que la pression est inhérente au métier, (2) donner des stratégies concrètes (priorisation, sport, sommeil), (3) illustrer avec un exemple vécu. Pourquoi : M&A et audit sont des métiers extrêmes, le recruteur veut s'assurer que tu tiens.",
      steps: [
        "Erreur : \"Je ne stresse jamais\" — détecté comme mensonge ou inconscience.",
        "Bonne approche : reconnaître que la pression existe + montrer des mécanismes de gestion.",
        "Stratégie 1 — Priorisation : \"Je liste les tâches en début de journée par criticité (urgent × important). Je traite les top 3 en priorité.\"",
        "Stratégie 2 — Hygiène de vie : \"Sport régulier, sommeil non négociable même en deal mode, alimentation correcte = ma base.\"",
        "Stratégie 3 — Communication : \"Si la charge dépasse le possible, j'alerte tôt mon manager pour réajuster.\"",
        "Stratégie 4 — Décomposition : \"Face à un livrable énorme, je le découpe en blocs de 2-3h. Ça rend l'inatteignable atteignable.\"",
        "Stratégie 5 — Récupération : \"Le week-end, je coupe vraiment : pas de mails sauf urgences, activité différente du travail.\"",
        "Exemple concret : \"En stage M&A, j'ai eu 3 deadlines simultanées sur 2 deals. J'ai priorisé avec mes managers, demandé l'aide d'un autre stagiaire, et tout livré à temps.\"",
        "Citer les Stoïciens : \"ce qui dépend de moi : ma réaction. Ce qui ne dépend pas : la situation.\""
      ],
      tip: "Glisse une vraie pratique : \"je médite 10 min le matin\" ou \"je fais du HIIT 3x/semaine\". Concret > abstrait."
    },
    {
      id: 126,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Que feriez-vous avec 10 000€ à investir aujourd'hui ?",
      explanation: "En une phrase — Allocation rationnelle : 50-60% en actions (ETF monde), 20-30% en obligations/monétaire, 10-20% en thématique pour montrer une opinion. Évite d'être trop conservateur ou trop spéculatif. Pourquoi : test de bon sens financier, culture marchés, raisonnement sous contrainte.",
      steps: [
        "Étape 1 — Horizon : \"10 ans, donc tolérance au risque élevée.\"",
        "Étape 2 — Objectif : capitalisation (pas de besoin de revenus immédiat).",
        "Allocation cœur (60-70%) : ETF actions monde (MSCI World ou S&P 500). Diversification automatique, frais bas.",
        "Allocation diversification (15-25%) : obligations (ETF obligataire investment grade) ou monétaire si taux > 3%.",
        "Allocation conviction (10-15%) : un secteur ou thématique sur lequel tu as une vue forte (IA, défense, énergie).",
        "Couche optionnelle (5-10%) : crypto via Bitcoin/ETH ou or physique pour la diversification d'actifs.",
        "Discipline : \"Je ne touche pas pendant 5 ans, je rééquilibre 1x/an.\" Évite le market timing.",
        "Argument fiscal France : \"PEA pour les actions UE (exonération après 5 ans), assurance-vie pour le reste.\"",
        "Erreur à éviter : \"tout en actions tech\" (concentré), \"tout en livret A\" (rendement < inflation), \"tout en crypto\" (spéculatif)."
      ],
      tip: "Mentionne le ratio Sharpe ou la diversification systémique — montre que tu raisonnes en finance moderne, pas en intuitions."
    },
    {
      id: 127,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Combien d'ascenseurs y a-t-il à Paris ?",
      explanation: "En une phrase — Brain teaser d'estimation. Structurer en partant de la population ou du parc immobilier, faire des hypothèses chiffrées, conclure avec une fourchette. Réponse plausible : 50 000-80 000 intra-muros. Pourquoi : test de structuration mentale, le recruteur veut une démarche logique.",
      steps: [
        "Méthode 1 — Par les bâtiments : Paris intra-muros = 2,2M habitants, ~1,4M logements. Hypothèse : 60% en immeubles d'habitat collectif.",
        "Calcul logements : 1,4M × 60% = 840k logements en collectif. Moyenne 20-30 logements / immeuble → 30k immeubles. 70% avec ascenseur → 21k ascenseurs résidentiels.",
        "Méthode 2 — Tertiaire : Paris = 17M m² de bureaux. 1 ascenseur pour 1000 m² → 17 000 ascenseurs tertiaires.",
        "Autres bâtiments : hôtels (~3k), commerces (5k), transports (1k), institutions (2k).",
        "Total estimé : 21k résidentiels + 17k tertiaires + 11k autres ≈ 50 000 ascenseurs.",
        "Sanity check : France entière ≈ 600 000 ascenseurs. Paris = ~10% de la pop urbaine dense → 50-80k plausible.",
        "Réponse finale avec fourchette : \"Mon estimation est entre 50 000 et 80 000 ascenseurs à Paris intra-muros.\"",
        "Si on parle Grand Paris (12M hab) : multiplier par 3 environ → 150-200k."
      ],
      tip: "Le brainteaser n'a pas de \"bonne\" réponse — c'est la structure qui compte. Pose tes hypothèses explicitement, fais des arrondis volontaires, propose une fourchette."
    },
    {
      id: 128,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Un train Paris-Lyon dure 2h. Si je marche 5 km/h vers le wagon arrière pendant le trajet, quelle distance ai-je parcourue par rapport au sol ?",
      explanation: "En une phrase — Brain teaser de référentiel. Distance par rapport au sol = distance du train − distance marchée. TGV 200 km/h × 2h = 400 km. Moi : 5 km/h × 2h = 10 km en sens inverse → 390 km. Pourquoi : test de raisonnement physique, composition des vitesses.",
      steps: [
        "Identifier le référentiel : on demande la distance par rapport au SOL (référentiel fixe).",
        "Vitesse du train par rapport au sol : ~200 km/h en TGV (à préciser comme hypothèse).",
        "Vitesse du marcheur par rapport au train : 5 km/h vers l'arrière, donc vitesse négative.",
        "Composition des vitesses : V_marcheur/sol = V_train/sol + V_marcheur/train = 200 − 5 = 195 km/h.",
        "Sur 2h : distance = 195 × 2 = 390 km.",
        "Sanity check : si je marche dans le sens du train, V = 205, distance = 410. Si je reste assis, V = 200, distance = 400. Cohérent.",
        "Cas limite : si je cours à la même vitesse que le train mais à l'arrière, vitesse au sol = 0. Je reste statique au sol pendant que le train avance."
      ],
      tip: "Pour les brain teasers physiques, dessine toujours un schéma rapide + référentiel. 80% des erreurs viennent d'une confusion de référentiel."
    },
    {
      id: 129,
      category: 'brainteaser',
      difficulty: 'intermédiaire',
      question: "Pourquoi nous et pas le concurrent direct ?",
      explanation: "En une phrase — Citer 2-3 différences spécifiques (positionnement, deals, culture) sans dénigrer le concurrent. Le test : montrer que tu as vraiment analysé le marché. Pourquoi : variante méchante du \"pourquoi nous\", le recruteur veut voir si tu as fait ton travail de différenciation.",
      steps: [
        "Erreur 1 : critiquer le concurrent (\"Lazard est en perte de vitesse\"). Ils se connaissent, c'est éliminatoire.",
        "Erreur 2 : dire \"j'aime les deux\" → manque de conviction.",
        "Erreur 3 : citer des éléments génériques (\"vous avez une bonne formation\") → pas différenciant.",
        "Bonne approche : 3 différences SPÉCIFIQUES et FACTUELLES.",
        "Différence 1 — Positionnement : \"Rothschild est plus mid-cap industriel quand Lazard est plus consumer. Mon intérêt étant sur l'industrie, Rothschild correspond mieux.\"",
        "Différence 2 — Géographie : \"Vous avez 50 bureaux dans le monde quand X en a 25. Pour les deals cross-border que je veux faire, c'est différenciant.\"",
        "Différence 3 — Culture : \"J'ai rencontré [alumni] qui m'a parlé de votre culture [valeur].\"",
        "Différence 4 — Deal mix : \"Vous avez fait 40% de deals transformatifs en healthcare, ce qui correspond à mon focus sectoriel.\"",
        "Conclure : \"Les deux sont d'excellentes maisons, mais pour moi et mes ambitions [spécifiques], c'est ici que je veux être.\""
      ],
      tip: "Toujours valider par un alumni rencontré : \"J'ai parlé à [nom], qui m'a confirmé [élément]\" — passe le test du factuel."
    },
    {
      id: 130,
      category: 'brainteaser',
      difficulty: 'avancé',
      question: "Si vous étiez CEO d'une entreprise pendant 1 an, que feriez-vous ?",
      explanation: "En une phrase — Choisir une entreprise spécifique, poser un diagnostic clair, proposer 2-3 actions concrètes avec un horizon de temps. Démontre la prise de hauteur et l'esprit stratégique. Pourquoi : question avancée fit/strat, teste vision business, hiérarchisation, lucidité.",
      steps: [
        "Étape 1 — Choix de l'entreprise : prendre une que tu connais bien (alternance, étude de cas, secteur d'intérêt).",
        "Étape 2 — Diagnostic : 2-3 enjeux clés (\"Carrefour souffre de marges en baisse, concurrence Amazon et hard discount, manque de différenciation\").",
        "Étape 3 — Vision : où serait l'entreprise dans 3-5 ans si on réussit (\"Carrefour leader européen de l'omnicanal, marque forte sur le bio et la livraison rapide\").",
        "Étape 4 — Actions concrètes (3 max) : (1) lever quick wins opérationnels, (2) lancer une transformation digitale ciblée, (3) repositionnement de marque.",
        "Étape 5 — Mesure du succès : KPIs clairs (croissance LFL, marge EBITDA, NPS clients, market share).",
        "Étape 6 — Risques et trade-offs : ce que tu choisis de NE PAS faire (cohérence stratégique).",
        "Étape 7 — Confiance modeste : \"Bien sûr, en 1 an on ne transforme pas une telle entreprise, mais on peut poser les fondations.\"",
        "Bonus : citer un benchmark (\"comme Best Buy aux US qui s'est transformé en partenariat avec Amazon\")."
      ],
      tip: "Choisis une entreprise qui parle au recruteur (cotée et connue) — exemples solides : Carrefour, Renault, Atos, Engie, Stellantis."
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
const ConceptCard = ({ concept, isExpanded, onToggle, getCategoryLabel, index, total, onPrev, onNext }) => {
  const cardRef = React.useRef(null);
  const wasExpanded = React.useRef(isExpanded);

  React.useEffect(() => {
    if (isExpanded && !wasExpanded.current && cardRef.current) {
      // Scroll the card to the top of the viewport, just under the sticky filter bar
      const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    wasExpanded.current = isExpanded;
  }, [isExpanded]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl shadow-sm border transition-colors duration-200 overflow-hidden scroll-mt-24 ${
        isExpanded ? 'border-blue-500 shadow-md' : 'border-blue-100 hover:border-blue-300'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-2xl"
      >
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${
            isExpanded ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'
          }`}>
            <Library className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-blue-500 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {getCategoryLabel(concept.category)}
            </span>
          </div>
          <h3 className="text-blue-950 font-serif text-lg sm:text-xl leading-snug">{concept.title}</h3>
          {!isExpanded && (
            <p className="text-blue-700 mt-1.5 text-sm leading-relaxed line-clamp-2 font-light">
              {concept.simple}
            </p>
          )}
        </div>
        <div className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        </div>
      </button>


      {isExpanded && (
        <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-blue-100 bg-blue-50/20">
          <div className="ml-0 sm:ml-16 mt-5 space-y-5">
            {/* Simple */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-blue-700" />
                <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">En une phrase</h4>
              </div>
              <p className="text-blue-900 leading-relaxed font-light">{concept.simple}</p>
            </div>


            {/* Formule */}
            {concept.formula && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Formule clé</h4>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <code className="block text-blue-900 font-mono text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{concept.formula}</code>
                </div>
              </div>
            )}


            {/* Deep dive */}
            {concept.deepDive && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Pour aller plus loin</h4>
                </div>
                <p className="text-blue-900 leading-relaxed font-light">{concept.deepDive}</p>
              </div>
            )}


            {/* Table */}
            {concept.table && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Tableau de référence</h4>
                </div>
                <div className="bg-white border border-blue-200 rounded-lg overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-sm min-w-[480px]">
                    <thead className="bg-blue-900 text-white">
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6 bg-blue-700" />
                  <h4 className="text-blue-950 font-semibold text-xs uppercase tracking-wider">Schéma</h4>
                </div>
                <Visual type={concept.visual} />
              </div>
            )}


            {/* Pitfalls */}
            {concept.pitfalls && concept.pitfalls.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-900 text-xs uppercase tracking-[0.2em] font-bold">Pièges à éviter</span>
                </div>
                <ul className="space-y-1.5">
                  {concept.pitfalls.map((p, i) => (
                    <li key={i} className="flex gap-2 text-blue-900 text-sm leading-relaxed font-light">
                      <span className="text-blue-500 flex-shrink-0">•</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer navigation : précédent · compteur/replier · suivant */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={onPrev}
                disabled={index === 0}
                aria-label="Concept précédent"
                className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 disabled:text-blue-300 disabled:cursor-not-allowed text-sm font-light px-3 py-2 rounded-lg border border-blue-200 hover:border-blue-400 disabled:border-blue-100 bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span className="hidden sm:inline">Précédent</span>
              </button>
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-light px-4 py-2 rounded-lg border border-blue-200 hover:border-blue-400 bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="tabular-nums text-blue-500 text-xs">{index + 1}/{total}</span>
                <span>Replier</span>
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={index === total - 1}
                aria-label="Concept suivant"
                className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 disabled:text-blue-300 disabled:cursor-not-allowed text-sm font-light px-3 py-2 rounded-lg border border-blue-200 hover:border-blue-400 disabled:border-blue-100 bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="hidden sm:inline">Suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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
  const weakCount = Object.values(ratings).filter((v) => v > 0 && v <= 2).length;
  const unratedCount = totalQuestions - ratedCount;
  const avgRating = ratedCount > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / ratedCount).toFixed(1)
    : '—';
  const masteredPct = totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0;

  const ratingDist = [1, 2, 3, 4, 5].map((r) => ({
    rating: r,
    count: Object.values(ratings).filter((v) => v === r).length,
  }));
  const distMax = Math.max(...ratingDist.map((x) => x.count), 1);

  const byCategory = categories
    .filter((c) => c.id !== 'all')
    .map((cat) => {
      const catQuestions = questions.filter((q) => q.category === cat.id);
      const catRatings = catQuestions.map((q) => ratings[q.id] || 0);
      const rated = catRatings.filter((r) => r > 0).length;
      const mastered = catRatings.filter((r) => r >= 4).length;
      const avg = rated > 0 ? (catRatings.reduce((a, b) => a + b, 0) / rated) : 0;
      return { ...cat, total: catQuestions.length, rated, mastered, avg };
    })
    .sort((a, b) => {
      const pa = a.total > 0 ? a.mastered / a.total : 0;
      const pb = b.total > 0 ? b.mastered / b.total : 0;
      return pb - pa;
    });

  const goToFilter = (filter) => {
    setActiveCategory('all');
    setRatingFilter(filter);
    setActivePage('questions');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header + barre globale */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
          Progression
        </h2>

        <div className="mt-6 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-sm">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <span className="text-blue-700 text-sm font-light">Questions maîtrisées (≥ 4★)</span>
            <span className="text-blue-950 font-serif text-lg">
              <span className="text-2xl">{masteredCount}</span>
              <span className="text-blue-400">/{totalQuestions}</span>
              <span className="ml-2 text-blue-700 text-sm">· {masteredPct}%</span>
            </span>
          </div>
          <div
            className="h-2.5 bg-blue-50 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={masteredPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${masteredPct} pour cent maîtrisé`}
          >
            <div className="h-full bg-blue-800 transition-all" style={{ width: `${masteredPct}%` }} />
          </div>
        </div>
      </div>

      {/* Bloc Reprendre */}
      <section aria-label="Reprendre votre travail" className="mb-10">
        <h3 className="text-blue-950 font-serif text-xl mb-4">Reprendre où vous en êtes</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => goToFilter('weak')}
            disabled={weakCount === 0}
            aria-label={`Reprendre les ${weakCount} questions à retravailler`}
            className="group text-left bg-blue-900 hover:bg-blue-950 disabled:bg-blue-200 disabled:cursor-not-allowed text-white rounded-2xl p-5 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-blue-200 font-light mb-2">À retravailler</div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-serif text-2xl">{weakCount} <span className="text-base font-light text-blue-200">question{weakCount > 1 ? 's' : ''}</span></div>
                <div className="text-sm text-blue-100 font-light mt-1">Notées 1 ou 2 étoiles</div>
              </div>
              <ChevronRight className="w-6 h-6 text-blue-200 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => goToFilter('unrated')}
            disabled={unratedCount === 0}
            aria-label={`Découvrir les ${unratedCount} questions non notées`}
            className="group text-left bg-white hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed text-blue-950 rounded-2xl p-5 border border-blue-200 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-blue-600 font-light mb-2">À découvrir</div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-serif text-2xl">{unratedCount} <span className="text-base font-light text-blue-500">question{unratedCount > 1 ? 's' : ''}</span></div>
                <div className="text-sm text-blue-600 font-light mt-1">Pas encore notées</div>
              </div>
              <ChevronRight className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          </button>
        </div>
      </section>

      {/* Vue d'ensemble compacte */}
      <section aria-label="Vue d'ensemble" className="mb-10 bg-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-sm">
        <h3 className="text-blue-950 font-serif text-xl mb-5">Vue d'ensemble</h3>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-blue-950">{ratedCount}</div>
            <div className="text-xs uppercase tracking-wider text-blue-600 font-light mt-1">Notées</div>
          </div>
          <div className="border-l border-blue-100 pl-4 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-serif text-blue-950">{masteredCount}</div>
            <div className="text-xs uppercase tracking-wider text-blue-600 font-light mt-1">Maîtrisées</div>
          </div>
          <div className="border-l border-blue-100 pl-4 sm:pl-6">
            <div className="text-2xl sm:text-3xl font-serif text-blue-950 flex items-baseline gap-1">
              {avgRating}
              {avgRating !== '—' && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
            </div>
            <div className="text-xs uppercase tracking-wider text-blue-600 font-light mt-1">Moyenne</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-blue-600 font-light mb-2">Répartition des notes</div>
          {[5, 4, 3, 2, 1].map((r) => {
            const d = ratingDist.find((x) => x.rating === r);
            const pct = (d.count / distMax) * 100;
            const intensity = r >= 4 ? 'bg-blue-800' : r === 3 ? 'bg-blue-500' : 'bg-blue-300';
            return (
              <div key={r} className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 w-20 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3 h-3 ${s <= r ? 'fill-amber-400 text-amber-400' : 'text-blue-100'}`} strokeWidth={1.5} />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-blue-50 rounded-full overflow-hidden">
                  <div className={`h-full ${intensity} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <div className="w-8 text-right text-blue-700 font-medium text-xs tabular-nums">{d.count}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Par catégorie */}
      <section aria-label="Progression par catégorie" className="mb-10 bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
        <h3 className="text-blue-950 font-serif text-xl px-5 sm:px-6 pt-5 sm:pt-6 mb-3">Par catégorie</h3>
        <ul className="divide-y divide-blue-100">
          {byCategory.map((c) => {
            const Icon = c.icon;
            const pct = c.total > 0 ? (c.mastered / c.total) * 100 : 0;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => { setActiveCategory(c.id); setRatingFilter('all'); setActivePage('questions'); }}
                  aria-label={`Voir les questions de ${c.label}, ${c.mastered} sur ${c.total} maîtrisées`}
                  className="w-full text-left px-5 sm:px-6 py-4 hover:bg-blue-50/60 transition-colors flex items-center gap-4 focus:outline-none focus-visible:bg-blue-50"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-blue-800" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="font-medium text-blue-950 truncate">{c.label}</span>
                      <span className="text-sm text-blue-700 font-light tabular-nums flex-shrink-0">
                        <span className="text-blue-950 font-medium">{c.mastered}</span>
                        <span className="text-blue-400">/{c.total}</span>
                      </span>
                    </div>
                    <div
                      className="h-1.5 bg-blue-50 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={Math.round(pct)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div className="h-full bg-blue-700 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-900 text-sm font-light underline underline-offset-4"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Réinitialiser toutes mes notes
        </button>
      </div>
    </div>
  );
};
// =====================================================
//  FILTER RADIO GROUP (accessible)
// =====================================================
const FilterRadioGroup = ({ label, value, onChange, options, activeClass, inactiveClass, labelIcon: LabelIcon }) => {
  const refs = React.useRef([]);
  const groupId = React.useId();
  const labelId = `${groupId}-label`;

  const handleKeyDown = (e, idx) => {
    const last = options.length - 1;
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = idx === last ? 0 : idx + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = idx === 0 ? last : idx - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    onChange(options[next].id);
    refs.current[next]?.focus();
  };

  const focusedIndex = Math.max(0, options.findIndex((o) => o.id === value));

  return (
    <div className="mb-5">
      <div id={labelId} className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3 flex items-center gap-1.5">
        {LabelIcon && <LabelIcon className="w-3 h-3" aria-hidden="true" />}
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {options.map((opt, idx) => {
          const Icon = opt.icon;
          const isActive = value === opt.id;
          return (
            <button
              key={opt.id}
              ref={(el) => (refs.current[idx] = el)}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={idx === focusedIndex ? 0 : -1}
              onClick={() => onChange(opt.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActive ? activeClass : inactiveClass}`}
            >
              {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================
//  COMPOSANTS BLOCS — Guide
// =====================================================
const BlocWrapper = ({ id, tag, titre, icon: Icon, openBloc, setOpenBloc, children }) => {
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

export const BlocCV = ({ openBloc, setOpenBloc }) => {
  const [checked, setChecked] = useState({});
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const intervalRef = React.useRef(null);

  const checklist = [
    { id: 'c1', text: "Je connais le nom de mon interlocuteur et sa banque" },
    { id: 'c2', text: "Je sais pourquoi cette banque / ce bureau spécifiquement" },
    { id: 'c3', text: "J'ai un fil directeur (1 phrase qui relie tout mon parcours)" },
    { id: 'c4', text: "J'ai au moins 1 chiffre concret par expérience clé" },
    { id: 'c5', text: "Ma réponse tient en moins de 2 minutes" },
    { id: 'c6', text: "Je termine par 'c'est pourquoi ce poste m'intéresse'" },
  ];
  const score = Object.values(checked).filter(Boolean).length;

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerActive, timeLeft]);

  const resetTimer = () => { setTimerActive(false); setTimeLeft(120); };
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const progress = (timeLeft / 120) * 100;

  const pieges = [
    "Réciter son CV chronologiquement sans fil directeur",
    "Parler plus de 2 minutes sans y être invité",
    "Mentionner des expériences non pertinentes pour le poste",
    "Ne pas personnaliser pour la banque cible",
    "Terminer sans transition vers 'pourquoi ce poste'",
  ];

  const dealSteps = [
    { num: '01', label: 'Contexte', desc: "Quelle entreprise, quel secteur, quelle taille de deal (EV / equity value)" },
    { num: '02', label: 'Logique stratégique', desc: "Pourquoi ce deal ? Synergies, consolidation, expansion géographique ?" },
    { num: '03', label: 'Structure financière', desc: "Mix financement : cash / actions / dette. Multiple payé (EV/EBITDA)" },
    { num: '04', label: 'Votre rôle', desc: "Votre équipe, vos livrables concrets (modèle, due dil, mémo, data room)" },
    { num: '05', label: 'Outcome', desc: "Résultat du deal. Leçon apprise. Pourquoi ce deal est représentatif de vos compétences." },
  ];

  return (
    <BlocWrapper id="cv" tag="La question d'ouverture" titre="Walk me through your CV / a deal" icon={User} openBloc={openBloc} setOpenBloc={setOpenBloc}>
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Checklist avant de répondre
          {score === 6 && <span className="ml-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">✓ Prêt à répondre</span>}
        </div>
        <div className="space-y-2 mb-3">
          {checklist.map(item => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={e => setChecked(c => ({ ...c, [item.id]: e.target.checked }))}
                className="w-4 h-4 accent-blue-700"
              />
              <span className={`text-sm transition-all ${checked[item.id] ? 'line-through text-blue-300' : 'text-blue-900'}`}>
                {item.text}
              </span>
            </label>
          ))}
        </div>
        <div className="text-xs text-blue-500">{score}/6 critères cochés</div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Structure recommandée — Walk me through your CV
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { num: '01', titre: "L'origine", duree: '20 sec', desc: "D'où venez-vous ? Un fil conducteur, pas une liste chronologique. 1 phrase d'ancrage : 'J'ai toujours été attiré par la compréhension des entreprises à travers leurs chiffres.'", dark: false },
            { num: '02', titre: "Le pivot", duree: '60 sec', desc: "Vos 2-3 expériences les plus pertinentes. Pour chacune : contexte (1 phrase) + action + résultat chiffré. Ne détaillez que ce qui compte pour le poste.", dark: false },
            { num: '03', titre: "La cible", duree: '20 sec', desc: "Pourquoi cette banque, ce bureau, ce moment. Montrez que vous avez fait vos recherches. Terminez sur une conviction, pas une question.", dark: true },
          ].map(acte => (
            <div key={acte.num} className={`rounded-xl p-5 ${acte.dark ? 'bg-blue-900 text-white' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-serif font-light text-blue-300">{acte.num}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${acte.dark ? 'bg-blue-800 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>{acte.duree}</span>
              </div>
              <div className={`font-serif text-lg mb-2 ${acte.dark ? 'text-white' : 'text-blue-950'}`}>{acte.titre}</div>
              <div className={`text-sm font-light leading-relaxed ${acte.dark ? 'text-blue-200' : 'text-blue-700'}`}>{acte.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Variante — Walk me through a deal
        </div>
        <div className="bg-slate-50 rounded-xl p-6 border border-blue-100 space-y-3">
          {dealSteps.map(step => (
            <div key={step.num} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-sm font-serif flex items-center justify-center">{step.num}</div>
              <div className="pt-1">
                <span className="text-blue-950 font-medium text-sm">{step.label} — </span>
                <span className="text-blue-700 text-sm font-light">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Timer d'entraînement
        </div>
        <div className="bg-white border-2 border-blue-100 rounded-xl p-6 text-center">
          <div className={`text-5xl font-mono font-light mb-4 ${timeLeft === 0 ? 'text-red-500' : 'text-blue-950'}`}>
            {mm}:{ss}
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2 mb-6">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${timeLeft === 0 ? 'bg-red-400' : 'bg-blue-700'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {timeLeft === 0 && <div className="text-red-500 font-medium mb-4">Temps écoulé !</div>}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setTimerActive(a => !a)}
              disabled={timeLeft === 0}
              className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-40 transition-all"
            >
              {timerActive ? 'Pause' : timeLeft === 120 ? 'Démarrer (2 min)' : 'Reprendre'}
            </button>
            <button onClick={resetTimer} className="px-6 py-2.5 border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-all">
              Reset
            </button>
          </div>
          <p className="text-blue-400 text-xs mt-4 italic">Répondez à voix haute. Enregistrez-vous si possible.</p>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Pièges classiques
        </div>
        <div className="space-y-2">
          {pieges.map((p, i) => (
            <div key={i} className="flex gap-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg px-4 py-3">
              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-red-800 text-sm">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </BlocWrapper>
  );
};

export const BlocPyramid = ({ openBloc, setOpenBloc }) => {
  const starCards = [
    { letter: 'S', label: 'Situation', quoi: 'Le contexte en 1-2 phrases maximum', erreur: 'Trop long — 30 sec max', exemple: "J'étais en stage M&A chez X, durant la phase de due diligence d'une acquisition dans le retail" },
    { letter: 'T', label: 'Tâche', quoi: 'Votre rôle et objectif spécifique', erreur: "Confondre Tâche et Action — la tâche c'est CE QUE vous deviez faire, pas comment", exemple: "J'étais responsable de la revue du BFR historique et de la normalisation des EBITDA" },
    { letter: 'A', label: 'Action', quoi: "CE QUE VOUS avez fait — toujours 'je', pas 'nous'", erreur: "Utiliser 'nous' — l'interviewer veut savoir VOTRE contribution personnelle", exemple: "J'ai construit un modèle de BFR mensuel sur 3 ans, identifié 2 ajustements non récurrents représentant 800k€ d'EBITDA normalisé" },
    { letter: 'R', label: 'Résultat', quoi: 'Impact mesurable. Toujours chiffrer si possible.', erreur: "Terminer sans résultat — 'j'ai fait X' sans dire ce que ça a produit", exemple: "L'analyse a été intégrée au mémo d'acquisition. Le client a réduit son offre de 5% en conséquence." },
  ];

  const matrix = [
    { q: "Pourquoi la finance ?",         pyramid: true,  star: false },
    { q: "Parlez d'une difficulté",        pyramid: false, star: true  },
    { q: "Quelle est votre valeur ajoutée ?", pyramid: true, star: false },
    { q: "Travail en équipe — exemple ?",  pyramid: false, star: true  },
    { q: "Expliquez-moi un concept",       pyramid: true,  star: false },
    { q: "Une décision difficile ?",        pyramid: false, star: true  },
    { q: "Pourquoi notre banque ?",        pyramid: true,  star: false },
  ];

  return (
    <BlocWrapper id="pyramid" tag="Méta-framework" titre="Pyramid Principle + STAR" icon={Triangle} openBloc={openBloc} setOpenBloc={setOpenBloc}>
      <p className="text-blue-700 font-light leading-relaxed mb-8">
        Ces deux frameworks structurent toutes vos réponses — techniques ET comportementales. Les maîtriser, c'est paraître deux fois plus clair que les autres candidats, à niveau de connaissance égal.
      </p>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Pyramid Principle
        </div>
        <svg viewBox="0 0 500 280" className="w-full h-auto max-w-lg mx-auto mb-6">
          <polygon points="250,20 180,90 320,90" fill="#1e3a8a" />
          <text x="250" y="58" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">CONCLUSION</text>
          <text x="250" y="76" fontSize="10" fill="#bfdbfe" textAnchor="middle">D'abord</text>
          <polygon points="180,100 80,180 420,180" fill="#3b82f6" />
          <text x="250" y="148" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">ARGUMENTS CLÉS</text>
          <text x="250" y="165" fontSize="10" fill="#dbeafe" textAnchor="middle">2-3 raisons principales</text>
          <polygon points="80,190 20,260 480,260" fill="#93c5fd" />
          <text x="250" y="232" fontSize="13" fill="#1e3a8a" textAnchor="middle" fontWeight="bold">PREUVES & EXEMPLES</text>
          <text x="250" y="250" fontSize="10" fill="#1e40af" textAnchor="middle">Chiffres, cas concrets, anecdotes</text>
        </svg>
        <div className="bg-blue-900 text-white rounded-xl p-5 mb-6">
          <div className="text-blue-300 text-xs uppercase tracking-[0.2em] mb-2">Règle d'or</div>
          <p className="font-light">Ne jamais commencer par le contexte. Commencer par la réponse. Le contexte vient ensuite pour justifier.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">❌ Sans Pyramid</div>
            <p className="text-red-800 text-sm font-light italic">"J'ai toujours été intéressé par les chiffres... Au lycée j'aimais les maths... En L3 j'ai fait un cours de compta..."</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">✅ Avec Pyramid</div>
            <p className="text-emerald-800 text-sm font-light italic">"La finance me permet de comprendre comment les entreprises créent de la valeur — c'est ce qui me passionne. [Conclusion] Premièrement... [Arguments] C'est notamment ce que j'ai fait chez X où... [Preuve]"</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Framework STAR
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {starCards.map(card => (
            <div key={card.letter} className="bg-white border-2 border-blue-100 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 text-white font-serif text-xl flex items-center justify-center">{card.letter}</div>
                <span className="font-serif text-blue-950 text-lg">{card.label}</span>
              </div>
              <div className="text-blue-900 text-sm mb-2">{card.quoi}</div>
              <div className="bg-red-50 rounded-lg px-3 py-2 mb-2 text-red-700 text-xs">⚠ {card.erreur}</div>
              <div className="bg-blue-50 rounded-lg px-3 py-2 text-blue-700 text-xs italic">"{card.exemple}"</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-blue-700" />
          Quand utiliser quoi ?
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="text-left px-4 py-3 rounded-tl-lg font-medium">Question</th>
                <th className="px-4 py-3 font-medium text-center">Pyramid</th>
                <th className="px-4 py-3 rounded-tr-lg font-medium text-center">STAR</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="px-4 py-3 text-blue-900">{row.q}</td>
                  <td className="px-4 py-3 text-center">{row.pyramid ? <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">✓ Oui</span> : <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">—</span>}</td>
                  <td className="px-4 py-3 text-center">{row.star ? <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">✓ Oui</span> : <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-xs">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BlocWrapper>
  );
};

// =====================================================
//  COMPOSANT PRINCIPAL
// =====================================================
const FinanceInterviewGuide = () => {
  const FILTERS_KEY = 'finance-filters-v1';
  const ALLOWED_CATEGORIES = ['all', 'valuation', 'accounting', 'ma', 'ts', 'lbo', 'dcf', 'brainteaser'];
  const ALLOWED_DIFFICULTIES = ['all', 'basique', 'intermédiaire', 'avancé'];
  const ALLOWED_RATING_FILTERS = ['all', 'unrated', 'weak', 'mastered'];

  const sanitizeFilters = (raw: any) => {
    const o = raw && typeof raw === 'object' ? raw : {};
    return {
      activeCategory: ALLOWED_CATEGORIES.includes(o.activeCategory) ? o.activeCategory : 'all',
      activeDifficulty: ALLOWED_DIFFICULTIES.includes(o.activeDifficulty) ? o.activeDifficulty : 'all',
      searchQuery: typeof o.searchQuery === 'string' ? o.searchQuery : '',
      ratingFilter: ALLOWED_RATING_FILTERS.includes(o.ratingFilter) ? o.ratingFilter : 'all',
      conceptCategory: ALLOWED_CATEGORIES.includes(o.conceptCategory) ? o.conceptCategory : 'all',
    };
  };

  // Démarrer avec les valeurs par défaut (évite les mismatches SSR/hydratation)
  // puis hydrater depuis localStorage côté client.
  const [activePage, setActivePage] = useState('questions'); // questions | concepts | progress | guides
  const [openGuideId, setOpenGuideId] = useState<number | null>(null);
  const [acronymQuery, setAcronymQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [ratings, setRatings] = useState({});
  const [ratingFilter, setRatingFilter] = useState('all'); // all | unrated | weak | mastered
  const [conceptCategory, setConceptCategory] = useState('all');
  const [openBloc, setOpenBloc] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const REVIEW_KEY = 'finance-review-v1';
  const [reviewList, setReviewList] = useState<string[]>([]);
  // Volontairement NON persisté : le mode "à réviser" doit toujours être désactivé au chargement.
  const [showReviewOnly, setShowReviewOnly] = useState<boolean>(false);
  const [filtersHydrated, setFiltersHydrated] = useState(false);

  // Hydratation depuis localStorage après le montage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(FILTERS_KEY);
      if (raw) {
        const f = sanitizeFilters(JSON.parse(raw));
        setActiveCategory(f.activeCategory);
        setActiveDifficulty(f.activeDifficulty);
        setSearchQuery(f.searchQuery);
        setRatingFilter(f.ratingFilter);
        setConceptCategory(f.conceptCategory);
      }
      const rawReview = window.localStorage.getItem(REVIEW_KEY);
      if (rawReview) {
        const list = JSON.parse(rawReview);
        if (Array.isArray(list)) setReviewList(list.filter((x) => typeof x === 'string'));
      }
    } catch { /* ignore */ }
    setFiltersHydrated(true);
  }, []);

  const toggleReview = (qid) => {
    setReviewList((prev) => {
      const next = prev.includes(qid) ? prev.filter((x) => x !== qid) : [...prev, qid];
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(REVIEW_KEY, JSON.stringify(next));
        }
      } catch { /* ignore */ }
      return next;
    });
  };

  // Persister les filtres et la recherche (showReviewOnly volontairement exclu)
  useEffect(() => {
    if (typeof window === 'undefined' || !filtersHydrated) return;
    try {
      window.localStorage.setItem(
        FILTERS_KEY,
        JSON.stringify({ activeCategory, activeDifficulty, searchQuery, ratingFilter, conceptCategory }),
      );
    } catch { /* ignore */ }
  }, [filtersHydrated, activeCategory, activeDifficulty, searchQuery, ratingFilter, conceptCategory]);




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
      const matchReview = !showReviewOnly || reviewList.length === 0 || reviewList.includes(q.id);
      return matchCategory && matchDifficulty && matchSearch && matchRating && matchReview;
    });
  }, [activeCategory, activeDifficulty, searchQuery, ratings, ratingFilter, showReviewOnly, reviewList]);


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
    { id: 'guide', label: 'Guide', icon: BookMarked },
    { id: 'secteurs', label: 'Secteurs', icon: Globe },
    { id: 'progress', label: 'Progression', icon: BarChart3 },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-100 pb-24 sm:pb-0">
      {/* HEADER */}
      <div className="relative bg-blue-900" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-12 lg:py-16">
          {/* Mobile title */}
          <button
            type="button"
            onClick={() => setActivePage('questions')}
            aria-label="Finance Interview. Retour à l'accueil."
            className="sm:hidden flex items-center min-w-0 w-full text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            <h1 className="font-medium text-white text-xl tracking-tight whitespace-nowrap m-0">Finance Interview</h1>
          </button>

          <h1 className="hidden sm:block text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight">
            Finance Interview
          </h1>


          {/* NAVIGATION (desktop / tablet) */}
          <div className="hidden sm:block mt-8">
            <div className="flex flex-wrap gap-2">
              {pages.map((p) => {
                const Icon = p.icon;
                const isActive = activePage === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePage(p.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all border-2 whitespace-nowrap ${
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

      {/* BOTTOM TAB BAR (mobile only) */}
      <nav
        className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-t border-blue-200 shadow-[0_-4px_20px_-4px_rgba(30,58,138,0.15)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch justify-around">
          {pages.map((p) => {
            const Icon = p.icon;
            const isActive = activePage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePage(p.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1 transition-colors min-h-[60px] ${
                  isActive ? 'text-blue-900' : 'text-blue-400'
                }`}
              >
                <div className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-all ${isActive ? 'bg-blue-100' : ''}`}>
                  <Icon className="w-5 h-5" />
                  {p.count && (
                    <span className={`absolute -top-1 -right-0 text-[9px] font-semibold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-900 text-white' : 'bg-blue-200 text-blue-800'}`}>
                      {p.count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>{p.label}</span>
              </button>
            );
          })}
        </div>
      </nav>


      {/* PAGE: QUESTIONS */}
      {activePage === 'questions' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight mb-6 sm:mb-8">Questions</h2>
          {/* Filtres */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="hidden sm:flex items-center gap-2 mb-5">
              <Filter className="w-4 h-4 text-blue-700" />
              <h2 className="text-blue-950 font-serif text-lg">Filtres & recherche</h2>
            </div>


            <div className="flex items-center gap-2 mb-5 sm:mb-5">
              <div className="relative flex-1">
                <label htmlFor="finance-search" className="sr-only">Rechercher une question ou un concept</label>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" aria-hidden="true" />
                <input
                  id="finance-search"
                  type="search"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape' && searchQuery) { e.preventDefault(); setSearchQuery(''); } }}
                  className="w-full pl-12 pr-12 py-3 bg-blue-50/50 border border-blue-200 rounded-lg text-base text-blue-950 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} aria-label="Effacer la recherche" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowMobileFilters((v) => !v)}
                onKeyDown={(e) => { if (e.key === 'Escape' && showMobileFilters) { e.preventDefault(); setShowMobileFilters(false); } }}
                aria-label={showMobileFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
                aria-expanded={showMobileFilters}
                aria-controls="mobile-filters-panel"
                className={`sm:hidden relative flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${showMobileFilters ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-700 border-blue-200'}`}
              >
                <Filter className="w-5 h-5" aria-hidden="true" />
                {(activeCategory !== 'all' || activeDifficulty !== 'all' || ratingFilter !== 'all') && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
                )}
              </button>
            </div>


            <div
              id="mobile-filters-panel"
              role="region"
              aria-label="Filtres"
              onKeyDown={(e) => { if (e.key === 'Escape' && showMobileFilters) { setShowMobileFilters(false); } }}
              className={`${showMobileFilters ? 'block' : 'hidden'} sm:block`}
            >
              <FilterRadioGroup
                label="Catégorie"
                value={activeCategory}
                onChange={setActiveCategory}
                options={categories.map((c) => ({ id: c.id, label: c.label, icon: c.icon }))}
                activeClass="bg-blue-900 text-white border-blue-900 shadow-md"
                inactiveClass="bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              />

              <div className="grid md:grid-cols-2 gap-5">
                <FilterRadioGroup
                  label="Difficulté"
                  value={activeDifficulty}
                  onChange={setActiveDifficulty}
                  options={difficulties.map((d) => ({ id: d.id, label: d.label }))}
                  activeClass="bg-indigo-900 text-white border-indigo-900 shadow-md"
                  inactiveClass="bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                />
                <FilterRadioGroup
                  label="Filtre par notation"
                  value={ratingFilter}
                  onChange={setRatingFilter}
                  options={ratingFilters.map((r) => ({ id: r.id, label: r.label }))}
                  activeClass="bg-amber-600 text-white border-amber-600 shadow-md"
                  inactiveClass="bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                  labelIcon={Star}
                />
              </div>

              <div className="mt-5 pt-5 border-t border-blue-100">
                <div className="text-blue-950 text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" /> À réviser
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewOnly((v) => !v)}
                  disabled={reviewList.length === 0 && !showReviewOnly}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                    showReviewOnly
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                      : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {showReviewOnly ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {showReviewOnly ? 'Afficher tout' : 'Voir uniquement à réviser'}
                  <span className={`ml-1 px-1.5 py-0.5 rounded text-xs font-bold ${showReviewOnly ? 'bg-white/20' : 'bg-rose-100 text-rose-800'}`}>{reviewList.length}</span>
                </button>
              </div>
            </div>


            <div className="mt-5 pt-5 border-t border-blue-100 flex items-center justify-between text-sm flex-wrap gap-2">
              <span className="text-blue-700"><span className="font-semibold text-blue-950">{stats.filtered}</span> question{stats.filtered > 1 ? 's' : ''} affichée{stats.filtered > 1 ? 's' : ''}</span>
              {(activeCategory !== 'all' || activeDifficulty !== 'all' || searchQuery || ratingFilter !== 'all' || showReviewOnly) && (
                <button onClick={() => { setActiveCategory('all'); setActiveDifficulty('all'); setSearchQuery(''); setRatingFilter('all'); setShowReviewOnly(false); }} className="text-blue-700 hover:text-blue-900 underline underline-offset-2">Réinitialiser</button>
              )}
            </div>
          </div>


          {/* Questions */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-blue-100 p-12 text-center">
                <Search className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <p className="text-blue-700 text-lg mb-4">
                  {showReviewOnly && reviewList.length === 0
                    ? "Vous n'avez encore marqué aucune question à réviser."
                    : 'Aucune question ne correspond à vos critères.'}
                </p>
                <button
                  onClick={() => { setActiveCategory('all'); setActiveDifficulty('all'); setSearchQuery(''); setRatingFilter('all'); setShowReviewOnly(false); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              filteredQuestions.map((q, index) => {
                const isExpanded = expandedQuestion === q.id;
                const userRating = ratings[q.id] || 0;
                return (
                  <div key={q.id} className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${isExpanded ? 'border-blue-500 shadow-xl shadow-blue-100' : reviewList.includes(q.id) ? 'border-rose-300 hover:border-rose-400' : userRating >= 4 ? 'border-emerald-300 hover:border-emerald-400' : userRating > 0 && userRating <= 2 ? 'border-red-200 hover:border-red-300' : 'border-blue-100 hover:border-blue-300 hover:shadow-md'}`}>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleReview(q.id); }}
                      aria-label={reviewList.includes(q.id) ? 'Retirer de la liste à réviser' : 'Marquer comme à réviser'}
                      aria-pressed={reviewList.includes(q.id)}
                      className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${reviewList.includes(q.id) ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-400'}`}
                    >
                      {reviewList.includes(q.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setExpandedQuestion(isExpanded ? null : q.id)} className="w-full text-left p-4 sm:p-6 pr-14 sm:pr-16 flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-base sm:text-lg transition-all ${isExpanded ? 'bg-blue-700 text-white' : userRating >= 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                          {userRating >= 4 ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          {(() => {
                            const cat = categories.find((c) => c.id === q.category);
                            const CatIcon = cat?.icon ?? BookOpen;
                            const isBrain = q.category === 'brainteaser';
                            const catLabel = cat?.label ?? q.category;
                            return (
                              <>
                                {/* Mobile: icône seule */}
                                <span
                                  title={catLabel}
                                  aria-label={`Catégorie : ${catLabel}`}
                                  className={`sm:hidden inline-flex items-center justify-center w-6 h-6 rounded-full ${isBrain ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}
                                >
                                  <CatIcon className="w-3.5 h-3.5" />
                                </span>
                                {/* Desktop: pastille uniformisée */}
                                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded border bg-blue-50 text-blue-800 border-blue-100">
                                  <CatIcon className="w-3.5 h-3.5" />
                                  {catLabel}
                                </span>
                              </>
                            );
                          })()}

                          {/* Difficulté */}
                          {(() => {
                            const filled = q.difficulty === 'basique' ? 1 : q.difficulty === 'intermédiaire' ? 2 : 3;
                            const label = `Difficulté : ${q.difficulty}`;
                            return (
                              <>
                                {/* Mobile: 3 dots */}
                                <span className="sm:hidden inline-flex items-center gap-0.5" aria-label={label} title={label}>
                                  {[0, 1, 2].map((i) => (
                                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < filled ? 'bg-blue-700' : 'bg-blue-200'}`} />
                                  ))}
                                </span>
                                {/* Desktop: label */}
                                <span className="hidden sm:inline-flex items-center text-xs font-medium px-2.5 py-1 rounded border bg-blue-50 text-blue-800 border-blue-100 capitalize">
                                  {q.difficulty}
                                </span>
                              </>
                            );
                          })()}

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
                                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-700 text-white font-serif text-sm flex items-center justify-center">{i + 1}</div>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-medium text-blue-950 tracking-tight">
              Concepts essentiels
            </h2>
            <p className="text-blue-700 mt-2 font-light text-sm sm:text-base hidden sm:block">
              {concepts.length} fiches pédagogiques.
            </p>
          </div>


          {/* Filtre concepts — barre horizontale sticky */}
          <div className="sticky top-16 z-20 -mx-4 sm:mx-0 mb-6 sm:mb-8 bg-blue-50/95 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-0 border-b border-blue-100 sm:border-0">
            <div className="sm:bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-blue-100 sm:p-4">
              <div className="hidden sm:block text-xs uppercase tracking-wider text-blue-700 font-medium mb-3">Filtrer par thématique</div>
              <div
                role="tablist"
                aria-label="Filtrer les concepts par thématique"
                className="flex gap-2 overflow-x-auto px-4 sm:px-0 py-3 sm:py-0 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none' }}
              >
                {categories.filter((c) => c.id !== 'brainteaser').map((cat) => {
                  const Icon = cat.icon;
                  const isActive = conceptCategory === cat.id;
                  const count = cat.id === 'all' ? concepts.length : concepts.filter((c) => c.category === cat.id).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setConceptCategory(cat.id)}
                      className={`flex-shrink-0 snap-start flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:bg-blue-50'}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="whitespace-nowrap">{cat.label}</span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-blue-50'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mini-bar de navigation : visible quand un concept est ouvert */}
          {(() => {
            const activeIdx = filteredConcepts.findIndex((c) => c.id === expandedConcept);
            if (activeIdx === -1) return null;
            const active = filteredConcepts[activeIdx];
            const goTo = (idx) => {
              if (idx < 0 || idx >= filteredConcepts.length) return;
              setExpandedConcept(filteredConcepts[idx].id);
            };
            return (
              <div className="sticky top-32 z-10 mb-4 bg-blue-900 text-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(activeIdx - 1)}
                  disabled={activeIdx === 0}
                  aria-label="Concept précédent"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedConcept(null)}
                  className="flex-1 min-w-0 text-left flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  aria-label="Replier le concept ouvert"
                  title="Replier"
                >
                  <span className="tabular-nums text-blue-300 text-xs flex-shrink-0">{activeIdx + 1}/{filteredConcepts.length}</span>
                  <span className="font-serif text-sm truncate">{active.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(activeIdx + 1)}
                  disabled={activeIdx === filteredConcepts.length - 1}
                  aria-label="Concept suivant"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })()}

          <div className="space-y-3 sm:space-y-4">
            {filteredConcepts.map((c, i) => (
              <ConceptCard
                key={c.id}
                concept={c}
                index={i}
                total={filteredConcepts.length}
                isExpanded={expandedConcept === c.id}
                onToggle={() => setExpandedConcept(expandedConcept === c.id ? null : c.id)}
                onPrev={() => i > 0 && setExpandedConcept(filteredConcepts[i - 1].id)}
                onNext={() => i < filteredConcepts.length - 1 && setExpandedConcept(filteredConcepts[i + 1].id)}
                getCategoryLabel={getCategoryLabel}
              />
            ))}
          </div>
        </div>
      )}


      {/* PAGE: GUIDE */}
      {activePage === 'guide' && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-blue-700" />
              <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">Méthodologie</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
              Le <span className="italic font-light text-blue-700">guide complet</span>
            </h2>
            <p className="text-blue-700 mt-3 font-light max-w-3xl">
              6 modules indépendants. Maîtrisez chacun pour vous démarquer en entretien.
            </p>
          </div>
          <div className="space-y-4">
            {guides.map((guide) => (
              <div key={guide.id}>
                {guide.id === 2 ? (
                  <a href="/glossaire" className="block w-full text-left">
                    <GuideCard guide={guide} />
                  </a>
                ) : (
                  <button
                    onClick={() => setOpenGuideId(openGuideId === guide.id ? null : guide.id)}
                    className="block w-full text-left"
                  >
                    <GuideCard guide={guide} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-8 mt-8">
            <BlocCV openBloc={openBloc} setOpenBloc={setOpenBloc} />
            <BlocPyramid openBloc={openBloc} setOpenBloc={setOpenBloc} />
          </div>
        </div>
      )}

      {/* PAGE: SECTEURS */}
      {activePage === 'secteurs' && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-blue-700" />
              <span className="text-blue-700 text-sm tracking-[0.3em] uppercase font-light">Couverture sectorielle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-950 leading-tight">
              Fiches <span className="italic font-light text-blue-700">sectorielles</span>
            </h2>
            <p className="text-blue-700 mt-3 font-light">
              7 secteurs couvrant ~80% des deals. Cliquez sur un secteur pour ouvrir sa fiche.
            </p>
          </div>
          <p className="text-blue-400 italic text-center py-12">La map et les fiches arrivent dans les prochains prompts.</p>
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
