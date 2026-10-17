// Rodzaje testów (rosnąca złożoność) i scenariusze ćwiczeń z wstrzyknięciami.

export const TEST_TYPES = {
  review:    { name: 'Przegląd dokumentacji', level: 1, note: 'Weryfikacja aktualności kontaktów, ról, odwołań.' },
  walk:      { name: 'Przejście krok po kroku', level: 2, note: 'Uczestnicy omawiają kroki planu bez wykonywania ich.' },
  tabletop:  { name: 'Ćwiczenie sztabowe', level: 3, note: 'Dyskusja nad scenariuszem z wstrzyknięciami.' },
  technical: { name: 'Test techniczny odtworzenia', level: 4, note: 'Rzeczywiste odtworzenie systemu w środowisku testowym.' },
  failover:  { name: 'Test przełączenia', level: 5, note: 'Przełączenie usług do ośrodka zapasowego.' },
  full:      { name: 'Pełna symulacja', level: 6, note: 'Pełne przerwanie z udziałem biznesu i IT.' },
};

// inject: [minuta od startu, treść, pytania dla zespołu]
export const EXERCISES = [
  {
    id: 'ransomware', name: 'Ransomware w sieci korporacyjnej', plans: ['plan-irp', 'plan-drp', 'plan-bcp'],
    injects: [
      [0, 'Pon. 06:40. Dział obsługi klienta zgłasza, że pliki na udziale sieciowym mają rozszerzenie .lock, a w katalogach jest notatka z żądaniem okupu.', 'Kto przyjmuje zgłoszenie? Jaki priorytet? Kogo powiadamiacie w pierwszej kolejności?'],
      [15, 'EDR pokazuje szyfrowanie na 40 stacjach i 3 serwerach plików. Konto administratora domeny logowało się o 03:12 z nieznanego hosta.', 'Co izolujecie i w jakiej kolejności? Czy wyłączacie sieć? Jakie dowody zabezpieczacie?'],
      [40, 'Serwer kopii zapasowych ma usunięte zadania. Kopia niezmienna z niedzieli jest dostępna.', 'Jak potwierdzicie, że kopia jest czysta? Od czego zaczynacie odtwarzanie?'],
      [60, 'Dziennikarz pyta o „atak hakerski”. Przestępcy grożą publikacją danych klientów.', 'Czy to naruszenie RODO? Czy to poważny incydent NIS2/KSC lub DORA? Kto zatwierdza komunikat?'],
      [90, 'Mija 20 godzin od wykrycia. Część systemów działa, system sprzedażowy nadal niedostępny.', 'Czy wczesne ostrzeżenie zostało wysłane? Jak długo proces sprzedaży może działać ręcznie?'],
    ],
  },
  {
    id: 'dc-outage', name: 'Utrata podstawowego centrum danych', plans: ['plan-drp', 'plan-bcp'],
    injects: [
      [0, 'Wt. 14:05. Pożar w budynku serwerowni. Straż pożarna odcina zasilanie. Wszystkie systemy w ośrodku podstawowym niedostępne.', 'Kto decyduje o przełączeniu? Jakie kryteria?'],
      [20, 'Ośrodek zapasowy jest dostępny, ale replikacja bazy ERP miała 3-godzinne opóźnienie.', 'Czy utrata 3 h danych mieści się w RPO? Jak odtworzycie brakujące transakcje?'],
      [45, 'Konsola przełączenia wymaga logowania przez AD, który był tylko w ośrodku podstawowym.', 'Jakie macie konta awaryjne? Gdzie są hasła?'],
      [90, 'Usługi działają w ośrodku zapasowym. Budynek będzie niedostępny przez 3 tygodnie.', 'Jak planujecie powrót? Kto zatwierdza zakończenie trybu awaryjnego?'],
    ],
  },
  {
    id: 'cloud-vendor', name: 'Długotrwała niedostępność dostawcy chmurowego', plans: ['plan-bcp', 'plan-drp'],
    injects: [
      [0, 'Dostawca SaaS obsługujący CRM ogłasza awarię regionu bez szacowanego czasu naprawy.', 'Które procesy dotyka awaria? Jakie jest ich RTO?'],
      [30, 'Po 6 godzinach dostawca informuje o możliwej utracie danych z ostatnich 24 h.', 'Czy macie własną kopię danych? Co mówi umowa (SLA, strategia wyjścia)?'],
      [60, 'Nadzorca pyta o wpływ na klientów.', 'Czy to poważny incydent ICT (DORA) lub poważny incydent (NIS2/KSC)? Jakie dane podajecie?'],
    ],
  },
  {
    id: 'account-takeover', name: 'Przejęcie konta uprzywilejowanego w chmurze', plans: ['plan-irp'],
    injects: [
      [0, 'Alert: logowanie globalnego administratora z nietypowego kraju, MFA zatwierdzone przez powiadomienie push.', 'Jakie pierwsze 3 działania wykonujecie?'],
      [15, 'W tenancie utworzono nową aplikację z uprawnieniami Mail.Read do wszystkich skrzynek.', 'Jak ograniczycie dostęp? Jak sprawdzicie, co zostało odczytane?'],
      [40, 'Ustalono, że odczytano skrzynki działu kadr.', 'Czy i kiedy zgłaszacie naruszenie do UODO? Kogo zawiadamiacie?'],
    ],
  },
  {
    id: 'staff', name: 'Niedostępność kluczowego personelu', plans: ['plan-bcp'],
    injects: [
      [0, 'Zatrucie pokarmowe po wydarzeniu firmowym – 60% zespołu operacyjnego niezdolne do pracy przez tydzień.', 'Które procesy są zagrożone? Kto ma kompetencje zastępcze?'],
      [30, 'Jedyny administrator systemu płatności jest w szpitalu. Hasła zna tylko on.', 'Gdzie są hasła awaryjne? Jak zapobiec temu w przyszłości?'],
    ],
  },
];

export const EXERCISE_BY_ID = Object.fromEntries(EXERCISES.map(e => [e.id, e]));
