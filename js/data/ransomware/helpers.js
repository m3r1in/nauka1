// Wspólne elementy pakietu „Ransomware”: role, tabele, szablony struktury dokumentów.

export const COLS = {
  INF: { name: 'Nieznany aktor w infrastrukturze', short: 'Infrastruktura' },
  AD:  { name: 'Zaszyfrowany kontroler domeny', short: 'Active Directory' },
  BKP: { name: 'Ransomware w kopii zapasowej', short: 'Kopie zapasowe' },
  NAS: { name: 'Serwer plików / NAS', short: 'Serwer plików / NAS' },
  APP: { name: 'Serwer aplikacyjny / baza danych', short: 'Aplikacje i bazy' },
  WMS: { name: 'WMS', short: 'WMS' },
  POS: { name: 'Stanowisko sprzedażowe / POS', short: 'POS' },
};

// Role używane w RACI i krokach (definicje w polityce).
export const R = {
  Z: 'Zarząd',
  ZZK: 'Zespół zarządzania kryzysowego',
  KI: 'Kierownik incydentu',
  KO: 'Kierownik odtwarzania',
  SOC: 'SOC',
  IR: 'Zespół reagowania (CSIRT)',
  FOR: 'Analityk informatyki śledczej',
  AAD: 'Administrator AD',
  ABK: 'Administrator kopii zapasowych',
  ASN: 'Administrator sieci / NAC',
  AST: 'Administrator pamięci masowej',
  AAP: 'Administrator aplikacji',
  DBA: 'Administrator baz danych',
  APOS: 'Administrator systemów sklepowych',
  AWMS: 'Administrator systemów logistycznych',
  WPB: 'Właściciel procesu biznesowego',
  IOD: 'Inspektor ochrony danych',
  PR: 'Dział prawny / compliance',
  KOM: 'Komunikacja',
  DOS: 'Dostawca',
  SD: 'Service desk',
};

export const table = (head, rows) =>
  `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n` + rows.map(r => `| ${r.join(' | ')} |`).join('\n');

// RACI: wiersze [czynność, R, A, C, I]
export const raci = rows => table(['Czynność', 'Wykonuje (R)', 'Odpowiada (A)', 'Konsultowany (C)', 'Informowany (I)'], rows);

const STD_GATE = 'Bramka DG5 z polityki (kryteria dopuszczenia do produkcji) musi być spełniona w całości. Brak spełnienia któregokolwiek kryterium blokuje dopuszczenie – odstępstwo zatwierdza wyłącznie Kierownik incydentu wraz z właścicielem procesu i jest wpisywane do rejestru ryzyk.';
export { STD_GATE };

// Dokument: { code, type, layer, title, parent, col, reqs, sections: [[tytuł, treść]], steps: [[kto, czynność, polecenie, rezultat, grupa]] }

export function policy(d) { return { type: 'policy', layer: 'both', ...d }; }

export function plan({ code, col, title, layer = 'both', reqs, purpose, scenario, signals, activation, org, flow, continuity, decisions, comms, closure, pitfalls }) {
  return {
    code, col, title, type: 'plan', layer, parent: 'POL', reqs,
    sections: [
      ['1. Cel i zakres', purpose],
      ['2. Scenariusz', scenario],
      ['3. Sygnały wykrycia i wskaźniki naruszenia', signals],
      ['4. Zasoby objęte planem', '{{table:systems}}'],
      ['5. Wpływ na procesy biznesowe i cele odtworzenia', '{{table:processes}}'],
      ['6. Kryteria aktywacji i klasyfikacja', activation],
      ['7. Organizacja reagowania', org],
      ['8. Przebieg reagowania', flow],
      ['9. Ciągłość działania w trakcie incydentu', continuity],
      ['10. Punkty decyzyjne', decisions],
      ['11. Komunikacja i obowiązki raportowe', comms + '\n\n{{reporting}}'],
      ['12. Kryteria zakończenia', closure],
      ['13. Błędy, których należy unikać', pitfalls],
      ['14. Procedury, instrukcje i checklisty', '{{children}}'],
    ],
    steps: [],
  };
}

export function proc({ code, col, parent, title, layer = 'tech', reqs, goal, scope, trigger, pre, raci: r, steps, exit, records, extra = [] }) {
  return {
    code, col, parent, title, type: 'procedure', layer, reqs,
    sections: [
      ['Cel', goal],
      ['Zakres i wyzwalacz', `${scope}\n\n**Wyzwalacz:** ${trigger}`],
      ['Warunki wstępne', pre],
      ['Role i odpowiedzialności', r],
      ...extra,
      ['Przebieg', '{{steps}}'],
      ['Kryteria wyjścia', exit],
      ['Zapisy (dowody wykonania)', records],
      ['Instrukcje i checklisty', '{{children}}'],
    ],
    steps,
  };
}

export function ins({ code, col, parent, title, layer = 'tech', reqs, goal, use, needs, caution, steps, verify, rollback, records }) {
  return {
    code, col, parent, title, type: 'instruction', layer, reqs,
    sections: [
      ['Cel', goal],
      ['Zastosowanie', use],
      ['Wymagane uprawnienia i narzędzia', needs],
      ['Środki ostrożności', caution],
      ['Kroki', '{{steps}}'],
      ['Weryfikacja wykonania', verify],
      ['Wycofanie', rollback],
      ['Zapisy', records],
    ],
    steps,
  };
}

// Checklista: items [kto, punkt kontrolny, dowód / oczekiwany stan, grupa]
export function cl({ code, col, parent, title, layer = 'both', reqs, use, items, pass, sign }) {
  return {
    code, col, parent, title, type: 'instruction', layer, reqs, checklist: true,
    sections: [
      ['Zastosowanie', use],
      ['Lista kontrolna', '{{steps}}'],
      ['Kryteria zaliczenia', pass],
      ['Zatwierdzenie', sign],
    ],
    steps: items.map(([who, item, evidence = '', group = '']) => [who, item, '', evidence, group]),
  };
}
