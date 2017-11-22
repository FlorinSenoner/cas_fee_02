# About
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

Nicht registrierte User können:
- Einloggen / Registrieren
- Eine Übersicht, über alle public Wetten sehen
- 

# Domain Objects
### Bet
- title
- description
- visibility: private oder public
- state: running oder done
- participationUntil: Datum wenn bis zu einem gewissen Zeitpunkt noch gewettet werden kann oder nichts wenn immer gewettet/teilgenommen werden kann.
- dateCreated
- dateFinished: Kann auch offen sein z.b. 31.12.9999
- gain: ~~Wenn nichts als Gewinn spezifiziert wird, gewinnt man Honorpoints~~ (optional)
- -> winCriteria (WinCriteria)
- -> guesses (Guess)
- -> admin (User)

### WinCriteria
(enum)
- passOrFail: Etwas ist eingetroffen oder nicht
- date: Etwas ist an einem bestimmten Datum eingetreten
- score: Endresultat eines Spiels
- number: Irgendeine Zahl

### Guess
- value: abhängig vom WinCriteria der Bet
- -> participant (User)
- -> bet (Bet)

### User
- name
- avatar
- pw
- email
- dateJoined

# Non functional requirements
- fluides Design (mobile first)
- ~~offline verfügbar~~ (optional)

# Views
Kurzer Beschrieb aller Views der App
### Home
- Fancy Bild mit Logo
- Fetter Participate(Wettemer? Wettemer!) Button
- Aktuellste Public Wetten
- Login/Logout

### Bets
- Alle Wetten mit Filter Möglichkeit
-- Einladungen
-- Offene Wetten (als TN, als Admin)
-- Abgeschlossene Wetten
- Fancy Whitespace wenn keine Wetten vorhanden sind
- Button um eine Wette zu erstellen

### Create Bet
- Formular zum Erfassen einer Wette
- Fetter Wettemer? Button

### Invite People
Der Link führt immer zur Participation View
- Möglichkeit bestehende User einzuladen
- Via E-Mail nicht registrierte Personen einladen
- QR Code der von anderen gescannt werden kann

### Participation
- Grobe Details der Wette (z.b <Name Admin> meint <Title Bet> Wettemer?)
- Möglichkeit einen Guess abzugeben
- Fetter Wettemer! Button
  
### View Bet
- Aktueller Status der Wette
- Alle Updates chronologisch sortiert
- Participants und ihre Guesses
