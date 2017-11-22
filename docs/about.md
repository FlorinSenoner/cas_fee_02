# About
**Wettemer** bietet eine einfache Möglichkeit auf soziale Ereignisse (kommede Fahrprüfung, Ausgang eines Spieles, Eintreffen eines Ereignisses, ...) mit Anderen zu wetten. Über die Platform kann man sich über laufende Wetten informieren, sieht die neusten Updates und weitere Personen einladen.

*Mögliche Szenarien sind:*
- 

# Use cases
Eingeloggte User können:  
- Wette erstellen/bearbeiten/Löschen
- Ein Update in Form einer Nachricht oder einem Bild zu einer Wette erfassen
- Andere User einladen
- Nicht registrierte User einladen (via link, mail, qr-code)
- An einer Wette teilnehmen in dem er seinen Guess abgibt
- ~~Benachrigt werden wenn ein Update einer Wette eingegangen ist~~ (optional)
- Ausloggen

Nicht registrierte User können:
- Einloggen / Registrieren
- Eine Übersicht, über alle öffentlichen Wetten sehen
- 

# Domain Objects
### Bet
- title
- description
- visibility: private oder public
- dateCreated
- dateFinished: Kann auch offen sein z.b. 31.12.9999
- -> winCriteria (WinCriteria)
- -> guesses (Guess)
- -> admin (User)

### WinCriteria
enum:
passOrFail: Etwas ist eingetroffen oder nicht
date: Etwas ist an einem bestimmten Datum eingetreten
score: Endresultat eines Spiels
number: Irgendeine Zahl

### Guess
-> participant (User)
-> bet (Bet)
-> value: abhängig vom WinCriteria der Bet
