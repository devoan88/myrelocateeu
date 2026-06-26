-- Seed Austria relocation information (en, de, ka)
-- Run after migration in Supabase SQL Editor or via: supabase db reset

insert into public.relocation_info (country, category, title, content, source_url, last_updated, language)
values
  -- English
  (
    'Austria',
    'visa',
    'Meldezettel (Residence Registration)',
    'You must register your residence (Meldezettel) within 3 days of moving into accommodation in Austria.

Required documents:
• Valid passport or national ID
• Completed registration form (Meldezettel) signed by your landlord (Wohnungsgeber)
• Rental contract (Mietvertrag) or proof of ownership

Where to go: Municipal registration office (Meldeamt / Gemeindeamt) for your district.

Note: Registration is mandatory for all residents. Late registration can result in administrative fines.',
    'https://www.bmi.gv.at/',
    '2026-02-10',
    'en'
  ),
  (
    'Austria',
    'bank',
    'Opening a Bank Account in Austria',
    'Austrian banks require proof of identity and local registration before opening a standard account.

Typically required documents:
• Valid passport or ID card
• Meldezettel (registration certificate)
• Proof of income: employment contract, recent payslip, or student enrollment letter
• Residence permit or visa (for non-EU nationals)

Tips:
• Compare Erste Bank, Raiffeisen, BAWAG, and online options such as N26
• Ask about a Basiskonto (basic payment account) if you are new to Austria
• Allow 1–2 weeks to receive your debit card (Bankomatkarte)',
    'https://www.oesterreich.gv.at/en/themen/finanzen_und_steuer/Seite.020200.html',
    '2026-01-22',
    'en'
  ),
  (
    'Austria',
    'healthcare',
    'ÖGK Health Insurance Registration',
    'Health insurance is mandatory for all residents in Austria. The Österreichische Gesundheitskasse (ÖGK) covers most employees and self-employed persons.

Registration steps:
1. Employed: your employer registers you automatically with ÖGK
2. Self-employed: register within one month at your regional ÖGK office
3. Submit passport, Meldezettel, and residence permit (if applicable)
4. Receive your e-card by post within 2–3 weeks

Your e-card is required for doctor visits, hospital care, and pharmacy prescriptions. Keep your insurance number (SVNR) accessible for medical appointments.',
    'https://www.oegk.at/',
    '2026-03-01',
    'en'
  ),
  (
    'Austria',
    'school',
    'School Enrollment via BildungsGRUnd',
    'In Vienna, school placement for children is managed through the BildungsGRUnd online platform operated by the city education authority.

Enrollment process:
1. Create an account on BildungsGRUnd (bildungsgrund.at)
2. Submit a school placement application for the upcoming school year
3. Upload required documents: child''s passport or birth certificate, Meldezettel, vaccination records (Impfpass), and previous school reports
4. Non-German documents may need certified translations
5. The municipal school authority (Stadtschulrat) assigns a school based on catchment area and availability

Apply early — popular schools fill up quickly before the September school year.',
    'https://www.bildungsgrund.at/',
    '2026-02-18',
    'en'
  ),

  -- German
  (
    'Austria',
    'visa',
    'Meldezettel (Wohnungsanmeldung)',
    'Sie müssen Ihren Wohnsitz (Meldezettel) innerhalb von 3 Tagen nach Einzug in eine Unterkunft in Österreich anmelden.

Erforderliche Unterlagen:
• Gültiger Reisepass oder Personalausweis
• Ausgefülltes Anmeldeformular (Meldezettel), vom Vermieter (Wohnungsgeber) unterzeichnet
• Mietvertrag oder Eigentumsnachweis

Wo: Meldeamt / Gemeindeamt in Ihrem Bezirk.

Hinweis: Die Anmeldung ist für alle Bewohner verpflichtend. Verspätete Anmeldung kann zu Verwaltungsstrafen führen.',
    'https://www.bmi.gv.at/',
    '2026-02-10',
    'de'
  ),
  (
    'Austria',
    'bank',
    'Bankkonto in Österreich eröffnen',
    'Österreichische Banken verlangen einen Identitätsnachweis und eine Wohnungsanmeldung vor Kontoeröffnung.

Typischerweise erforderlich:
• Gültiger Reisepass oder Personalausweis
• Meldezettel (Anmeldebescheinigung)
• Einkommensnachweis: Arbeitsvertrag, Gehaltsabrechnung oder Studienbestätigung
• Aufenthaltstitel oder Visum (für Nicht-EU-Bürger)

Tipps:
• Erste Bank, Raiffeisen, BAWAG und Online-Anbieter wie N26 vergleichen
• Nach Basiskonto fragen, wenn Sie neu in Österreich sind
• Bankomatkarte wird in 1–2 Wochen zugestellt',
    'https://www.oesterreich.gv.at/themen/finanzen_und_steuer/Seite.020200.html',
    '2026-01-22',
    'de'
  ),
  (
    'Austria',
    'healthcare',
    'ÖGK Krankenversicherungsanmeldung',
    'Eine Krankenversicherung ist in Österreich für alle Bewohner verpflichtend. Die Österreichische Gesundheitskasse (ÖGK) versichert die meisten Arbeitnehmer und Selbstständige.

Anmeldeschritte:
1. Angestellt: Arbeitgeber meldet Sie automatisch bei der ÖGK an
2. Selbstständig: innerhalb eines Monats beim regionalen ÖGK-Büro anmelden
3. Reisepass, Meldezettel und Aufenthaltstitel (falls zutreffend) einreichen
4. E-Card per Post in 2–3 Wochen erhalten

Die E-Card wird für Arztbesuche, Krankenhaus und Apotheke benötigt.',
    'https://www.oegk.at/',
    '2026-03-01',
    'de'
  ),
  (
    'Austria',
    'school',
    'Schulanmeldung über BildungsGRUnd',
    'In Wien wird die Schulplatzvergabe für Kinder über die Online-Plattform BildungsGRUnd der Stadt Wien verwaltet.

Anmeldeprozess:
1. Konto auf BildungsGRUnd (bildungsgrund.at) erstellen
2. Schulplatzbewerbung für das kommende Schuljahr einreichen
3. Dokumente hochladen: Reisepass oder Geburtsurkunde, Meldezettel, Impfpass, letzte Schulzeugnisse
4. Nicht-deutsche Dokumente ggf. beglaubigt übersetzen lassen
5. Stadtschulrat weist Schule nach Sprengel und Verfügbarkeit zu

Frühzeitig bewerben — beliebte Schulen füllen sich vor Schuljahresbeginn im September.',
    'https://www.bildungsgrund.at/',
    '2026-02-18',
    'de'
  ),

  -- Georgian
  (
    'Austria',
    'visa',
    'Meldezettel (ბინის რეგისტრაცია)',
    'ავსტრიაში ბინაში გადასვლიდან 3 დღის განმავლობაში უნდა დარეგისტრიროთ თქვენი მისამართი (Meldezettel).

საჭირო დოკუმენტები:
• მოქმედი პასპორტი ან პირადობის მოწმობა
• შევსებული სარეგისტრაციო ფორმა (Meldezettel), ქირის მფლობელის (Wohnungsgeber) ხელმოწერით
• ქირის ხელშეკრულება (Mietvertrag)

სად: თქვენი რაიონის რეგისტრაციის ოფისი (Meldeamt / Gemeindeamt).

შენიშვნა: რეგისტრაცია ყველა მაცხორველისთვის სავალდებულოა.',
    'https://www.bmi.gv.at/',
    '2026-02-10',
    'ka'
  ),
  (
    'Austria',
    'bank',
    'საბანკო ანგარიშის გახსნა ავსტრიაში',
    'ავსტრიული ბანკები ანგარიშის გახსნამდე მოითხოვენ პირადობის დამადასტურებელ და რეგისტრაციის დოკუმენტებს.

ჩვეულებრივ საჭიროა:
• მოქმედი პასპორტი ან ID
• Meldezettel (რეგისტრაციის ცნობა)
• შემოსავლის დამადასტურებელი: სამუშაო ხელშეკრულება, ხელფასის ქვითარი ან სტუდენტობის დამადასტურებელი
• ბინადრობის ნებართვა (არა-EU მოქალაქეებისთვის)

რჩევა: შეადარეთ Erste Bank, Raiffeisen და ონლაინ ბანკები (მაგ. N26).',
    'https://www.oesterreich.gv.at/',
    '2026-01-22',
    'ka'
  ),
  (
    'Austria',
    'healthcare',
    'ÖGK სადაზღვევოს რეგისტრაცია',
    'ავსტრიაში ჯანმრთელობის დაზღვევა ყველა მაცხორველისთვის სავალდებულოა. Österreichische Gesundheitskasse (ÖGK) უზრუნველყოფს უმეტესობა დასაქმებულისა და მეწარმეს.

რეგისტრაციის ნაბიჯები:
1. დასაქმებული: სამუშაოდაქირებელი ავტომატურად გირეგისტრირებთ ÖGK-ში
2. მეწარმე: ერთ თვეში რეგიონალურ ÖGK ოფისში რეგისტრაცია
3. პასპორტი, Meldezettel და ბინადრობის ნებართვა (საჭიროების შემთხვევაში)
4. e-card 2–3 კვირაში почта-ზე

e-card საჭიროა ექიმთან, საავადმყოფოში და აფთიაქში.',
    'https://www.oegk.at/',
    '2026-03-01',
    'ka'
  ),
  (
    'Austria',
    'school',
    'სკოლაში ჩარიცხვა BildungsGRUnd-ის მეშვეობით',
    'ვენაში სკოლის ადგილის მინიჭება მართავს BildungsGRUnd ონლაინ პლატფორმა.

პროცესი:
1. შექმენით ანგარიში bildungsgrund.at-ზე
2. წარადგინეთ განაცხადი მომავალი სასწავლო წლისთვის
3. ატვირთეთ: ბავშვის პასპორტი/დაბადების მოწმობა, Meldezettel, ვაქცინაციის ჩანაწერი, სკოლის ბოლო ნიშნები
4. არაგერმანული დოკუმენტები შეიძლება საჭიროებდეს თარგმანს
5. Stadtschulrat назначает школу по району

მიმართეთ ადრე — პოპულარული სკოლები სწრაფად ივსება.',
    'https://www.bildungsgrund.at/',
    '2026-02-18',
    'ka'
  )
on conflict (country, category, language) do update set
  title = excluded.title,
  content = excluded.content,
  source_url = excluded.source_url,
  last_updated = excluded.last_updated;
