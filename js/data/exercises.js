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
    id: 'retail-ransomware', name: 'Ransomware w sieci handlowej (sklepy, centra dystrybucyjne, program lojalnościowy)', plans: ['plan-irp', 'plan-bcp', 'plan-drp'],
    injects: [
      [0, 'Piątek 17:20 przed długim weekendem. Kierownicy kilkudziesięciu sklepów zgłaszają, że kasy nie rozpoczynają sprzedaży. Na komputerach na zapleczu widać notatkę z żądaniem okupu.', 'Kto przyjmuje zgłoszenia ze sklepów? Jaki priorytet? Kogo i jakim kanałem powiadamiacie?'],
      [15, 'SOC widzi szyfrowanie serwerów w centrali i w centrum dystrybucyjnym. WMS jest niedostępny, automatyka magazynu stoi. Agent EDR został wyłączony na części serwerów z konta administratora domeny.', 'Co izolujecie: sklepy, centra dystrybucyjne, centralę, internet? W jakiej kolejności? Kto zatwierdza?'],
      [30, 'Poczta i komunikator działają, ale jest podejrzenie, że atakujący czytają korespondencję zespołu IT.', 'Jakiego kanału pozapasmowego używacie? Gdzie są aktualne numery telefonów?'],
      [60, 'Na stronie z wyciekami grupy przestępczej pojawia się wpis z próbką danych członków programu lojalnościowego (imię, e-mail, telefon, historia zakupów).', 'Czy to naruszenie RODO? Jak ustalicie skalę? Kiedy zgłoszenie do UODO i czy zawiadamiacie klientów?'],
      [120, 'Klienci w mediach społecznościowych zgłaszają, że w części sklepów nie działa płatność kartą. Dzwonią dziennikarze.', 'Czy sklepy pracują dalej, czy są zamykane? Kto zatwierdza komunikat? Czy informujecie agenta rozliczeniowego (PCI DSS)?'],
      [240, 'Kopie niezmienne sprzed 3 dni są dostępne. Analiza pokazuje jednak pierwsze ślady atakujących w sieci sprzed 12 dni.', 'Który punkt odtworzenia wybieracie? Jak sprawdzicie, że kopia jest czysta? Co odtwarzacie najpierw?'],
      [480, 'Przestępcy obniżają żądanie i dają 72 h. Ubezpieczyciel cyber prosi o informację o stanie sprawy.', 'Kto decyduje o okupie? Jak sprawdzacie sankcje? Czy zgłoszono sprawę policji (CBZC)?'],
      [1440, 'Mija doba. Część sklepów sprzedaje w trybie offline, zapasy na półkach wystarczą na 3–4 dni, dostawy stoją.', 'Jakie są priorytety odtworzenia? Jak uruchamiacie dostawy awaryjne? Czy terminy zgłoszeń zostały dotrzymane?'],
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
