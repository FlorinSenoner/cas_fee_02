# 🌈 About
**Wettemer** bietet eine einfache Möglichkeit auf soziale Ereignisse (kommede Fahrprüfung, Ausgang eines Spieles, Eintreffen eines Ereignisses, ...) mit Anderen zu wetten. Über die Platform kann man sich über laufende Wetten informieren, sieht die neusten Updates und weitere Personen einladen.

*Mögliche Szenarien sind:*
- Ein Bekannter macht zum dritten Mal die Fahrprüfung. Jemand startet eine Wette ob er es dieses mal schaffen wird. (pass or fail)
- An einem Abend wetten wir,  dass es bis im Jahr 2020 noch keine selbstfahrenden Autos auf unseren Strassen gibt. (date)
- Der FCW spielt heute mal wieder gegen den FCZ. Wer das genaue Resultat rät bekommt nach dem Spiel alle Bier vom Rest der Gruppe bezahlt. (score)
- Wieviele Einwohner hat..., Wieviele Tore schiesst..., Wieviel mal erwähnt der Dozent die Firma Facebook in seinem React-Vortrag?, Wie oft..., etc. (number)

# Use cases
Eingeloggte User können:  
- Wette erstellen/bearbeiten/Löschen
- Ein Update in Form einer Nachricht oder einem Bild zu einer Wette erfassen
- Andere User einladen
- Nicht registrierte User einladen (via link, mail, qr-code)
- An einer (inkl. seiner) Wette teilnehmen in dem er seinen Guess abgibt
- Eine Liste sehen mit allen erstellten, abgelaufenen, eingeladenen, teilgeonmmenen Wetten
- ~~Benachrigt werden wenn ein Update einer Wette eingegangen ist~~ (optional)
- Ausloggen

# Optionals
- Comments:
    - User können Bets kommentieren und ebenfalls Bilder dazu hochladen
- Friends:
    - User können wählen, dass sie nur von ihren Freunden eingeladen werden können
    - User sehen bei welchen Wetten ihre Freunde teilnehmen

Nicht registrierte User können:
- Einloggen / Registrieren
- Eine Übersicht, über alle public Wetten sehen

# Domain Objects
### Bet
- title
- description
- visibility: private oder public
- dateCreated
- dateEnd: Bis zu diesem Datum dürfen Guesses abgegeben werden. (Optional mit default 31.12.9999)
- dateDone: Hier hat der Admin die Wette beendet
- gain: ~~Wenn nichts als Gewinn spezifiziert wird, gewinnt man Honorpoints~~ (optional)
- -> state (BetState)
- -> image (BetImage) (Titel/Anzeigebild)
- -> updates (BetUpdate)
- -> winCriteria (WinCriteria)
- -> participants (Participant)
- -> admin (User)

### Participant
- -> user (User)
- -> guess (some value)

### BetState
- running: Wette läuft und Participants können ihren Guess abgeben
- expired: Die Zeit der Wette ist abgelaufen. Es kann keinen Guess mehr abgegeben werden.
- done: Die Wette wurde vom Admin beendet.

### BetImage
- filename
- description
- uploadedDate

### ~~BetUpdate (optional)~~
Eine Bet kann immer wieder updated werden. Dies wird dann an alle Nutzer kommuniziert.
- title
- message
- -> image (BetImage)
- ~~video (highly optional)~~

### WinCriteria
(enum)
- passOrFail: Etwas ist eingetroffen oder nicht
- date: Etwas ist an einem bestimmten Datum eingetreten
- number: Irgendeine Zahl
- ~~score: Endresultat eines Spiels~~ (optional)
- ~~string: Irgend ein Text (z.B. nächster Bundesrat)~~ (optional)
- ~~selection: Admin erstellt Auswahl an Möglichkeiten~~ (optional)

### User
Ein User kann Admin sein, wenn er eine Wette erstellt hat und/oder Participant, wenn er an einer Wette teilnimmt.
- name
- avatar
- pw
- email
- dateJoined
- ~~-> friends (User) (optional)~~

# Non functional requirements
- fluides Design (mobile first)
- life updates without the user having to reload
- ~~offline verfügbar~~ (optional)

# Views
Kurzer Beschrieb aller Views der App
### Home
- Fancy Bild mit Logo
- Fetter Participate(Wettemer? Wettemer!) Button
- Aktuellste Public Wetten
- Singin/Signup
- ~~Sprache~~ (optional)

### Dashboard
Wie schafft man ein nices Dashboard, weleches alle Bet-Types vereinheitlicht und trotzdem sehr einfach zu bedienen ist.
-> Für den Anfang verwenden wir am einfachsten eine einfache Liste

- Alle Wetten mit Filter Möglichkeit
-- Einladungen
-- Offene Wetten (als TN, als Admin)
-- Abgeschlossene Wetten
- Fancy Whitespace wenn keine Wetten vorhanden sind
- Button um eine Wette zu erstellen

### Create
- Formular zum Erfassen einer Wette
    - Title (Input)
    - Description (Multiline)
    - Public (On/Off Switch für Visibility)
    - DateEnd (Datepicker)
    - WinCriteria (Select)
    - Your Guess (depending on WinCriteria) (Optinal mit default none)
- Weiterbutton zu Invite

### Invite
- Autofill Feld mit Add Button
- OK Button
- ~~Via E-Mail nicht registrierte Personen einladen~~ (optional)
- ~~QR Code der von anderen gescannt werden kann~~ (optional)
  
### View
- Titel
- Description
- Status
- Visibility
- -> Für Admin:
    - End Bet Button -> Popup Dialog in dem man das Resultat festhalten kann
    - Inivite more People Button (Admin) -> Invite
    - Participants und ihre Guesses
- -> Für Participant (without Guess)
    - Make a guess Field
    - Decline Bet Button
- -> Für Participant (with Guess)
    - Participants und ihre Guesses

### SignUp/In
- SignUp/In Formular mit OAuth für Google/Facebook
