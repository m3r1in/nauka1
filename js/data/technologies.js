// Biblioteka technologii: kroki instrukcji dla scenariuszy.
// Krok: [czynność, polecenie (opcjonalne), oczekiwany rezultat (opcjonalny)].
// Polecenia są wzorcami – przed użyciem dostosuj nazwy i zweryfikuj z dokumentacją Twojej wersji produktu.

export const SCENARIOS = {
  backup:   { name: 'Wykonanie kopii zapasowej', phase: 'Przygotowanie' },
  restore:  { name: 'Odtworzenie z kopii', phase: 'Odtworzenie' },
  failover: { name: 'Przełączenie do ośrodka zapasowego', phase: 'Odtworzenie' },
  failback: { name: 'Powrót do ośrodka podstawowego', phase: 'Powrót' },
  isolate:  { name: 'Izolacja (incydent)', phase: 'Ograniczenie' },
  evidence: { name: 'Zabezpieczenie dowodów', phase: 'Analiza' },
  verify:   { name: 'Weryfikacja po odtworzeniu', phase: 'Weryfikacja' },
};

export const TECHNOLOGIES = [
  {
    id: 'vmware', name: 'VMware vSphere / SRM', cat: 'Wirtualizacja',
    steps: {
      failover: [
        ['Potwierdź decyzję o przełączeniu u kierownika DR i zanotuj czas', '', 'Decyzja zapisana w dzienniku zdarzeń'],
        ['W Site Recovery Manager otwórz plan odtwarzania i uruchom tryb testowy, jeśli pozwala na to czas', '', 'Test planu zakończony bez błędów krytycznych'],
        ['Uruchom plan odtwarzania w trybie „Disaster recovery” (lub „Planned migration”, gdy ośrodek podstawowy działa)', '', 'Status planu: Recovery complete'],
        ['Sprawdź kolejność uruchomienia VM zgodnie z priorytetami (bazy → aplikacje → frontend)', '', 'Wszystkie VM w stanie Powered On'],
        ['Zaktualizuj DNS / balancer, jeśli nie robi tego plan automatycznie', '', 'Nazwy usług wskazują ośrodek zapasowy'],
      ],
      failback: [
        ['Upewnij się, że ośrodek podstawowy jest sprawny i zsynchronizowany', '', 'Replikacja w stanie OK'],
        ['W SRM wykonaj Reprotect dla planu odtwarzania', '', 'Kierunek ochrony odwrócony'],
        ['Uruchom Planned migration z powrotem do ośrodka podstawowego w oknie serwisowym', '', 'Usługi działają w ośrodku podstawowym'],
        ['Ponownie wykonaj Reprotect, aby przywrócić pierwotny kierunek replikacji', '', 'Ochrona aktywna'],
      ],
      isolate: [
        ['Odłącz kartę sieciową VM lub przenieś ją do grupy portów kwarantanny', 'Get-VM "<vm>" | Get-NetworkAdapter | Set-NetworkAdapter -Connected:$false -Confirm:$false', 'VM bez łączności sieciowej'],
        ['Nie wyłączaj VM przed zabezpieczeniem pamięci, chyba że zespół IR zdecyduje inaczej', '', ''],
      ],
      evidence: [
        ['Utwórz snapshot z pamięcią (zachowuje stan RAM w pliku .vmem)', 'New-Snapshot -VM "<vm>" -Name "IR-<nr-incydentu>" -Memory', 'Snapshot utworzony'],
        ['Skopiuj pliki VM (vmx, vmdk, vmem, vmsn) na nośnik dowodowy i policz sumy SHA-256', 'sha256sum *.vmdk *.vmem > hashes.txt', 'Sumy kontrolne zapisane w karcie dowodu'],
      ],
      verify: [
        ['Sprawdź stan VMware Tools i heartbeat VM', 'Get-VM "<vm>" | Select Name, PowerState, @{N="Tools";E={$_.ExtensionData.Guest.ToolsStatus}}', 'toolsOk, PoweredOn'],
      ],
    },
  },
  {
    id: 'hyperv', name: 'Microsoft Hyper-V (Replica)', cat: 'Wirtualizacja',
    steps: {
      failover: [
        ['Na serwerze repliki sprawdź stan replikacji', 'Get-VMReplication -VMName "<vm>"', 'Ostatnia replikacja w akceptowalnym RPO'],
        ['Wykonaj nieplanowane przełączenie na replice', 'Start-VMFailover -VMName "<vm>"', 'VM gotowa do uruchomienia'],
        ['Uruchom maszynę', 'Start-VM -Name "<vm>"', 'VM w stanie Running'],
        ['Zatwierdź przełączenie po weryfikacji', 'Complete-VMFailover -VMName "<vm>"', 'Punkty odtwarzania usunięte, VM produkcyjna'],
      ],
      failback: [
        ['Odwróć replikację w stronę ośrodka podstawowego', 'Set-VMReplication -VMName "<vm>" -Reverse', 'Replikacja odwrócona'],
        ['Po synchronizacji wykonaj planowane przełączenie w oknie serwisowym', 'Start-VMFailover -VMName "<vm>" -Prepare', 'Przygotowanie zakończone'],
      ],
      isolate: [
        ['Odłącz kartę sieciową VM', 'Disconnect-VMNetworkAdapter -VMName "<vm>"', 'VM bez łączności'],
      ],
      evidence: [
        ['Utwórz punkt kontrolny produkcyjny lub standardowy', 'Checkpoint-VM -Name "<vm>" -SnapshotName "IR-<nr>"', 'Punkt kontrolny utworzony'],
        ['Wyeksportuj VM na nośnik dowodowy', 'Export-VM -Name "<vm>" -Path "E:\\Dowody\\<nr>"', 'Eksport zakończony, policz sumy SHA-256'],
      ],
    },
  },
  {
    id: 'veeam', name: 'Veeam Backup & Replication', cat: 'Kopie zapasowe',
    steps: {
      backup: [
        ['Uruchom zadanie kopii poza harmonogramem', 'Get-VBRJob -Name "<zadanie>" | Start-VBRJob', 'Status: Success'],
        ['Sprawdź, czy kopia trafiła do repozytorium niezmiennego (immutable) lub poza siedzibę', '', 'Punkt przywracania w repozytorium wtórnym'],
      ],
      restore: [
        ['Wybierz punkt przywracania sprzed zdarzenia (przy ransomware: sprzed pierwszych oznak kompromitacji)', '$rp = Get-VBRRestorePoint -Name "<vm>" | Sort-Object CreationTime -Descending', 'Punkt wskazany i zapisany w dzienniku'],
        ['Przeskanuj punkt przywracania (Secure Restore) przed przywróceniem do sieci produkcyjnej', '', 'Brak wykryć'],
        ['Wykonaj Instant Recovery, gdy liczy się RTO, lub pełne odtworzenie VM', 'Start-VBRRestoreVM -RestorePoint $rp[0] -Reason "DR <nr>"', 'VM odtworzona'],
        ['Przy Instant Recovery zmigruj VM do produkcyjnego magazynu danych', '', 'Migracja zakończona'],
      ],
      verify: [
        ['Uruchom zadanie SureBackup dla odtworzonych maszyn', '', 'Testy heartbeat, ping i aplikacyjne zaliczone'],
      ],
    },
  },
  {
    id: 'mssql', name: 'Microsoft SQL Server', cat: 'Bazy danych',
    steps: {
      backup: [
        ['Wykonaj pełną kopię z sumą kontrolną', "BACKUP DATABASE [<db>] TO DISK = N'<ścieżka>\\<db>_full.bak' WITH CHECKSUM, COMPRESSION;", 'Komunikat o pomyślnym zakończeniu'],
        ['Wykonaj kopię dziennika transakcji', "BACKUP LOG [<db>] TO DISK = N'<ścieżka>\\<db>_log.trn' WITH CHECKSUM;", ''],
        ['Zweryfikuj plik kopii', "RESTORE VERIFYONLY FROM DISK = N'<ścieżka>\\<db>_full.bak' WITH CHECKSUM;", 'The backup set is valid'],
      ],
      restore: [
        ['Wykonaj kopię ogona dziennika, jeśli baza jest dostępna', "BACKUP LOG [<db>] TO DISK = N'<ścieżka>\\tail.trn' WITH NORECOVERY;", ''],
        ['Odtwórz kopię pełną bez odzyskiwania', "RESTORE DATABASE [<db>] FROM DISK = N'<ścieżka>\\<db>_full.bak' WITH NORECOVERY, REPLACE;", ''],
        ['Odtwórz dzienniki do wskazanego punktu w czasie', "RESTORE LOG [<db>] FROM DISK = N'<ścieżka>\\<db>_log.trn' WITH STOPAT = '<RRRR-MM-DD GG:MM:SS>', NORECOVERY;", ''],
        ['Udostępnij bazę', 'RESTORE DATABASE [<db>] WITH RECOVERY;', 'Baza w stanie ONLINE'],
      ],
      failover: [
        ['Sprawdź stan synchronizacji grupy dostępności', 'SELECT ag.name, ars.role_desc, ars.synchronization_health_desc FROM sys.dm_hadr_availability_replica_states ars JOIN sys.availability_groups ag ON ag.group_id = ars.group_id;', 'HEALTHY na replice docelowej'],
        ['Na replice docelowej wykonaj planowane przełączenie (replika synchroniczna)', 'ALTER AVAILABILITY GROUP [<ag>] FAILOVER;', 'Replika ma rolę PRIMARY'],
        ['Tylko przy utracie repliki podstawowej i za zgodą właściciela danych: przełączenie wymuszone', 'ALTER AVAILABILITY GROUP [<ag>] FORCE_FAILOVER_ALLOW_DATA_LOSS;', 'Ryzyko utraty danych udokumentowane'],
      ],
      verify: [
        ['Sprawdź spójność bazy', 'DBCC CHECKDB ([<db>]) WITH NO_INFOMSGS;', 'Brak błędów spójności'],
      ],
    },
  },
  {
    id: 'postgres', name: 'PostgreSQL', cat: 'Bazy danych',
    steps: {
      backup: [
        ['Wykonaj kopię fizyczną klastra', 'pg_basebackup -h <host> -U <replikator> -D /backup/base_$(date +%F) -Ft -z -X stream -P', 'Kopia zakończona, WAL dołączone'],
        ['Wykonaj kopię logiczną wybranej bazy', 'pg_dump -Fc -d <db> -f /backup/<db>_$(date +%F).dump', ''],
      ],
      restore: [
        ['Zatrzymaj instancję i przenieś uszkodzony katalog danych', 'systemctl stop postgresql && mv $PGDATA $PGDATA.broken', ''],
        ['Rozpakuj kopię bazową do katalogu danych', 'tar -xzf /backup/base_<data>/base.tar.gz -C $PGDATA', ''],
        ['Ustaw cel odtworzenia (PITR) w postgresql.conf', "restore_command = 'cp /archive/%f %p'\nrecovery_target_time = '<RRRR-MM-DD GG:MM:SS+00>'", ''],
        ['Utwórz plik sygnału odtwarzania i uruchom instancję', 'touch $PGDATA/recovery.signal && systemctl start postgresql', 'W logu: recovery stopping before commit…'],
        ['Zakończ odtwarzanie i udostępnij bazę do zapisu', 'psql -c "SELECT pg_wal_replay_resume();"', 'Baza przyjmuje zapisy'],
        ['Alternatywnie odtwórz kopię logiczną', 'pg_restore -d <db> --clean --if-exists -j 4 /backup/<db>.dump', ''],
      ],
      failover: [
        ['Sprawdź opóźnienie repliki', "psql -c \"SELECT now() - pg_last_xact_replay_timestamp() AS opoznienie;\"", 'Opóźnienie w granicach RPO'],
        ['Wypromuj replikę do roli podstawowej', 'psql -c "SELECT pg_promote();"', 'pg_is_in_recovery() = false'],
        ['Przełącz aplikacje na nowy adres (DNS / VIP / pgbouncer)', '', 'Aplikacje łączą się z nowym serwerem'],
      ],
      verify: [
        ['Sprawdź dostępność instancji', 'pg_isready -h <host>', 'accepting connections'],
        ['Sprawdź spójność indeksów (rozszerzenie amcheck)', "psql -d <db> -c \"SELECT bt_index_check(c.oid) FROM pg_index i JOIN pg_class c ON c.oid = i.indexrelid JOIN pg_am a ON a.oid = c.relam WHERE a.amname = 'btree';\"", 'Brak błędów'],
      ],
    },
  },
  {
    id: 'oracle', name: 'Oracle Database (RMAN / Data Guard)', cat: 'Bazy danych',
    steps: {
      backup: [
        ['Wykonaj kopię bazy z dziennikami archiwalnymi', 'RMAN> BACKUP DATABASE PLUS ARCHIVELOG;', ''],
        ['Zweryfikuj kopię', 'RMAN> RESTORE DATABASE VALIDATE;', 'Brak błędów'],
      ],
      restore: [
        ['Uruchom instancję w trybie MOUNT', 'RMAN> STARTUP MOUNT;', ''],
        ['Odtwórz i odzyskaj bazę do punktu w czasie', "RMAN> RUN { SET UNTIL TIME \"TO_DATE('<RRRR-MM-DD GG:MI:SS>','YYYY-MM-DD HH24:MI:SS')\"; RESTORE DATABASE; RECOVER DATABASE; }", ''],
        ['Otwórz bazę z resetem dzienników', 'RMAN> ALTER DATABASE OPEN RESETLOGS;', 'Baza OPEN'],
      ],
      failover: [
        ['Sprawdź konfigurację Data Guard', 'DGMGRL> SHOW CONFIGURATION;', 'SUCCESS'],
        ['Planowane przełączenie (oba ośrodki sprawne)', 'DGMGRL> SWITCHOVER TO <standby>;', ''],
        ['Awaryjne przełączenie przy utracie bazy podstawowej', 'DGMGRL> FAILOVER TO <standby>;', 'Nowa baza podstawowa aktywna'],
      ],
    },
  },
  {
    id: 'ad', name: 'Active Directory (Windows Server)', cat: 'Tożsamość',
    steps: {
      restore: [
        ['Przy usuniętych obiektach użyj Kosza AD (jeśli włączony)', "Get-ADObject -Filter 'Name -like \"<nazwa>*\"' -IncludeDeletedObjects | Restore-ADObject", 'Obiekt przywrócony'],
        ['Przy uszkodzeniu kontrolera: odtwórz stan systemu z kopii w trybie DSRM, a następnie wykonaj przywrócenie autorytatywne wybranych obiektów', 'ntdsutil "activate instance ntds" "authoritative restore" "restore subtree <DN>" quit quit', ''],
        ['Przy utracie całego lasu postępuj zgodnie z procedurą odtwarzania lasu AD (pierwszy DC z każdej domeny z zaufanej kopii)', '', 'Las odtworzony z kopii sprzed kompromitacji'],
      ],
      isolate: [
        ['Zablokuj przejęte konta', 'Disable-ADAccount -Identity <konto>', 'Konto wyłączone'],
        ['Zresetuj hasło konta KRBTGT dwukrotnie, z odstępem co najmniej równym maks. czasowi życia biletu (domyślnie 10 h)', '', 'Bilety Kerberos unieważnione'],
        ['Zresetuj hasła kont uprzywilejowanych i usługowych', '', ''],
      ],
      evidence: [
        ['Wyeksportuj dzienniki zabezpieczeń kontrolerów domeny', 'wevtutil epl Security C:\\Dowody\\<dc>-security.evtx', 'Plik .evtx z sumą SHA-256'],
      ],
      verify: [
        ['Sprawdź replikację AD', 'repadmin /replsummary', 'Brak błędów replikacji'],
        ['Sprawdź stan kontrolerów', 'dcdiag /v /c', 'Testy zaliczone'],
      ],
    },
  },
  {
    id: 'm365', name: 'Microsoft 365 / Entra ID', cat: 'Chmura SaaS',
    steps: {
      isolate: [
        ['Unieważnij sesje użytkownika', 'Revoke-MgUserSignInSession -UserId <upn>', 'Tokeny odświeżania unieważnione'],
        ['Zablokuj logowanie konta', 'Update-MgUser -UserId <upn> -AccountEnabled:$false', 'Konto zablokowane'],
        ['Zresetuj hasło i metody MFA, usuń nieznane reguły skrzynki i aplikacje z uprawnieniami', 'Get-InboxRule -Mailbox <upn>', 'Brak podejrzanych reguł przekierowań'],
      ],
      evidence: [
        ['Wyszukaj zdarzenia w ujednoliconym dzienniku audytu', 'Search-UnifiedAuditLog -StartDate <od> -EndDate <do> -UserIds <upn> -ResultSize 5000 | Export-Csv audit.csv', 'Eksport CSV z sumą SHA-256'],
        ['Wyeksportuj logi logowania Entra ID dla okresu incydentu', '', ''],
      ],
      restore: [
        ['Przywróć usuniętą witrynę SharePoint', 'Restore-SPODeletedSite -Identity https://<tenant>.sharepoint.com/sites/<witryna>', 'Witryna dostępna'],
        ['Przywróć pliki OneDrive/SharePoint do wcześniejszego stanu (funkcja przywracania OneDrive lub Microsoft 365 Backup)', '', 'Pliki w stanie sprzed zdarzenia'],
        ['Odzyskaj elementy usunięte ze skrzynki', 'Restore-RecoverableItems -Identity <upn> -FilterItemType IPM.Note', ''],
      ],
    },
  },
  {
    id: 'aws', name: 'Amazon Web Services', cat: 'Chmura IaaS/PaaS',
    steps: {
      backup: [
        ['Uruchom zadanie AWS Backup na żądanie', 'aws backup start-backup-job --backup-vault-name <vault> --resource-arn <arn> --iam-role-arn <rola>', 'Status COMPLETED'],
      ],
      restore: [
        ['Odtwórz zasób z punktu odtwarzania AWS Backup', 'aws backup start-restore-job --recovery-point-arn <arn> --iam-role-arn <rola> --metadata file://metadata.json', 'Status COMPLETED'],
        ['Odtwórz instancję RDS do punktu w czasie', 'aws rds restore-db-instance-to-point-in-time --source-db-instance-identifier <db> --target-db-instance-identifier <db>-restored --restore-time <RRRR-MM-DDTGG:MM:SSZ>', 'Instancja available'],
      ],
      failover: [
        ['Wypromuj replikę RDS w regionie zapasowym', 'aws rds promote-read-replica --db-instance-identifier <replika> --region <region-dr>', 'Replika jest instancją samodzielną'],
        ['Przełącz ruch (Route 53 failover lub zmiana rekordu)', 'aws route53 change-resource-record-sets --hosted-zone-id <id> --change-batch file://failover.json', 'Rekord wskazuje region DR'],
      ],
      isolate: [
        ['Przypisz instancji grupę zabezpieczeń kwarantanny', 'aws ec2 modify-instance-attribute --instance-id <id> --groups <sg-kwarantanna>', 'Brak ruchu do/z instancji'],
        ['Unieważnij klucze dostępowe przejętego użytkownika IAM', 'aws iam update-access-key --user-name <user> --access-key-id <klucz> --status Inactive', ''],
      ],
      evidence: [
        ['Utwórz migawkę wolumenu EBS', 'aws ec2 create-snapshot --volume-id <vol> --description "IR-<nr>"', 'Migawka completed'],
        ['Zabezpiecz logi CloudTrail za okres incydentu', 'aws cloudtrail lookup-events --start-time <od> --end-time <do> > cloudtrail.json', ''],
      ],
    },
  },
  {
    id: 'azure', name: 'Microsoft Azure', cat: 'Chmura IaaS/PaaS',
    steps: {
      restore: [
        ['Odtwórz dyski VM z magazynu Recovery Services', 'az backup restore restore-disks --resource-group <rg> --vault-name <vault> --container-name <vm> --item-name <vm> --rp-name <punkt> --storage-account <konto>', 'Zadanie Completed'],
      ],
      failover: [
        ['Uruchom nieplanowane przełączenie w Azure Site Recovery (plan odtwarzania)', 'Start-AzRecoveryServicesAsrUnplannedFailoverJob -RecoveryPlan $plan -Direction PrimaryToRecovery', 'Zadanie zakończone'],
        ['Zatwierdź przełączenie po weryfikacji', 'Start-AzRecoveryServicesAsrCommitFailoverJob -RecoveryPlan $plan', ''],
      ],
      isolate: [
        ['Dodaj regułę NSG blokującą ruch', 'az network nsg rule create -g <rg> --nsg-name <nsg> -n IR-deny-all --priority 100 --access Deny --direction Inbound --source-address-prefixes "*" --destination-port-ranges "*"', 'Ruch zablokowany'],
      ],
      evidence: [
        ['Utwórz migawkę dysku systemowego', 'az snapshot create -g <rg> -n IR-<nr>-osdisk --source <id-dysku>', 'Migawka utworzona'],
      ],
    },
  },
  {
    id: 'k8s', name: 'Kubernetes (Velero)', cat: 'Kontenery',
    steps: {
      backup: [
        ['Wykonaj kopię przestrzeni nazw', 'velero backup create <nazwa>-$(date +%F) --include-namespaces <ns> --wait', 'Phase: Completed'],
      ],
      restore: [
        ['Odtwórz zasoby z kopii', 'velero restore create --from-backup <kopia> --wait', 'Phase: Completed'],
        ['Sprawdź stan podów', 'kubectl get pods -n <ns>', 'Wszystkie pody Running/Ready'],
      ],
      isolate: [
        ['Zastosuj politykę sieciową blokującą cały ruch w przestrzeni nazw', 'kubectl apply -n <ns> -f deny-all.yaml', 'Ruch zablokowany'],
        ['Wyłącz węzeł z planowania', 'kubectl cordon <węzeł>', 'SchedulingDisabled'],
      ],
      evidence: [
        ['Zabezpiecz logi i opis podejrzanego poda', 'kubectl logs <pod> -n <ns> --all-containers > pod.log && kubectl describe pod <pod> -n <ns> > pod.txt', ''],
      ],
    },
  },
  {
    id: 'linux', name: 'Serwer Linux (RHEL / Ubuntu)', cat: 'Systemy operacyjne',
    steps: {
      backup: [
        ['Wykonaj kopię katalogów konfiguracyjnych i danych (restic)', 'restic -r <repo> backup /etc /var/lib/<aplikacja>', 'snapshot saved'],
      ],
      restore: [
        ['Przywróć dane z wybranej migawki', 'restic -r <repo> restore <id-migawki> --target /', ''],
        ['Uruchom usługi', 'systemctl start <usługa>', ''],
      ],
      isolate: [
        ['Zablokuj ruch, zostawiając dostęp z jump-hosta zespołu IR', 'nft add table inet ir && nft add chain inet ir in "{ type filter hook input priority -10; policy drop; }" && nft add rule inet ir in ip saddr <ip-ir> accept', 'Host dostępny tylko dla IR'],
      ],
      evidence: [
        ['Zabezpiecz dane ulotne przed wyłączeniem', 'date; uptime; ss -tunap; ps auxf; last -a > /mnt/dowody/volatile.txt', ''],
        ['Wykonaj obraz dysku i policz sumę kontrolną', 'dd if=/dev/<dysk> of=/mnt/dowody/<host>.img bs=4M status=progress && sha256sum /mnt/dowody/<host>.img', 'Suma zapisana w karcie dowodu'],
      ],
      verify: [
        ['Sprawdź stan usług', 'systemctl --failed', '0 loaded units listed'],
      ],
    },
  },
  {
    id: 'mde', name: 'Microsoft Defender for Endpoint', cat: 'Stacje robocze',
    steps: {
      isolate: [
        ['Odizoluj urządzenie (pełna izolacja) z portalu Defender lub przez API', 'POST https://api.security.microsoft.com/api/machines/<id>/isolate  {"Comment":"IR-<nr>","IsolationType":"Full"}', 'Status: Isolated'],
      ],
      evidence: [
        ['Pobierz pakiet dochodzeniowy', 'POST https://api.security.microsoft.com/api/machines/<id>/collectInvestigationPackage', 'Pakiet dostępny do pobrania'],
      ],
      verify: [
        ['Uruchom pełne skanowanie antywirusowe', 'POST https://api.security.microsoft.com/api/machines/<id>/runAntiVirusScan  {"ScanType":"Full"}', 'Brak wykryć'],
      ],
    },
  },
  {
    id: 'fortigate', name: 'Zapora FortiGate', cat: 'Sieć',
    steps: {
      backup: [
        ['Wykonaj kopię konfiguracji', 'execute backup config tftp <plik> <ip-serwera>', 'Plik konfiguracji zapisany'],
      ],
      restore: [
        ['Przywróć konfigurację (urządzenie zrestartuje się)', 'execute restore config tftp <plik> <ip-serwera>', 'Urządzenie działa z przywróconą konfiguracją'],
      ],
      isolate: [
        ['Dodaj adres do grupy blokowanej w polityce kwarantanny lub przenieś port do VLAN kwarantanny', '', 'Ruch hosta zablokowany'],
      ],
    },
  },
  {
    id: 'netapp', name: 'NetApp ONTAP', cat: 'Pamięć masowa',
    steps: {
      restore: [
        ['Przywróć wolumen z migawki', 'volume snapshot restore -vserver <svm> -volume <vol> -snapshot <migawka>', 'Wolumen w stanie z migawki'],
      ],
      failover: [
        ['Wstrzymaj i rozdziel relację SnapMirror w ośrodku zapasowym', 'snapmirror quiesce -destination-path <svm-dr>:<vol> && snapmirror break -destination-path <svm-dr>:<vol>', 'Wolumen docelowy w trybie zapisu'],
        ['Udostępnij wolumen hostom (mapowanie LUN / eksport NFS / udział CIFS)', '', ''],
      ],
      failback: [
        ['Odwróć replikację', 'snapmirror resync -destination-path <svm-prod>:<vol>', 'Relacja zsynchronizowana'],
      ],
    },
  },
];

TECHNOLOGIES.push({
  id: 'pos', name: 'Kasy POS i terminale płatnicze (sklep)', cat: 'Handel',
  steps: {
    isolate: [
      ['Odetnij sklep od sieci centrali (reguła na routerze / SD-WAN), pozostaw łącze terminali płatniczych, jeśli nie jest objęte incydentem', '', 'Kasy bez połączenia z centralą, terminale autoryzują transakcje'],
      ['Przełącz kasy w tryb offline zgodnie z dokumentacją producenta systemu kasowego', '', 'Sprzedaż możliwa bez połączenia z centralą'],
      ['Nie restartuj i nie formatuj kas z objawami szyfrowania – oznacz je i odłóż do analizy', '', ''],
    ],
    evidence: [
      ['Sfotografuj ekran z notatką okupu i zapisz godzinę oraz numer kasy', '', 'Zdjęcie w zgłoszeniu incydentu'],
      ['Zabezpiecz dysk zainfekowanej kasy (wymontowanie lub obraz) przed ponowną instalacją', '', 'Nośnik z kartą dowodu i sumą SHA-256'],
    ],
    restore: [
      ['Zainstaluj kasę ze sprawdzonego złotego obrazu z czystego repozytorium', '', 'Kasa uruchomiona z obrazu o znanej sumie kontrolnej'],
      ['Załaduj bazę towarową i cennik z odtworzonego, zweryfikowanego systemu centralnego', '', 'Ceny zgodne z cennikiem wzorcowym'],
      ['Przyłącz sklep do sieci po potwierdzeniu przez SOC, że segment sklepów jest czysty', '', ''],
    ],
    verify: [
      ['Wykonaj transakcję testową gotówkową i kartową oraz zwrot', '', 'Paragon fiskalny i potwierdzenie autoryzacji'],
      ['Prześlij do centrali dane sprzedaży z trybu offline i uzgodnij raporty dobowe', '', 'Brak rozbieżności w raportach'],
    ],
  },
});

export const TECH_BY_ID = Object.fromEntries(TECHNOLOGIES.map(t => [t.id, t]));
