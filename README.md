# Aplikacja do zarządzania pracą w firmie

System stworzony w ramach pracy magisterskiej na kierunku Informatyka Stosowana.

Autor: Dominika Jadach, Uniwersytet Jagielloński, Wydział Fizyki, Astronomii i Informatyki Stosowanej

## Aby uruchomić aplikację z przykładowymi danymi, po pobraniu należy:
### w katalogu `/backend` wykonać:

- `npm install`

- `npm start`

### W katalogu `/frontend` wykonać:

- `npm install`

- `npm start`

Zainstalowane zostaną wszystkie potrzebne narzędzia, a następnie uruchomiona zostanie aplikacja. Serwer będzie działał na `localhost:5000`, natomiast część kliencka na `localhost:3000`.
Przy uruchamianiu frontendu aplikacja domyślnie uruchomi się w przeglądarce, jeżeli tak się nie stanie należy przejść w [link](http://localhost:3000).

## Aby skonfigurować aplikację pod konkretnego klienta należy:

### W `backend/config/default.json` zmienić:
- `dbUrl` - Na koncie MongoDB należy utworzyć bazę danych i jej string skopiować do zmiennej `dbUrl`. Szczegółowe instrukcje znajdują się na stronie MongoDB pod [linkiem](https://www.mongodb.com/docs/guides/atlas/connection-string/). 
- `secret` - Aby zapewnić odpowiednią ochronę danych należy regularnie zmieniać secret. Przykładowy generator online znajduje się [tutaj](https://randomkeygen.com/). 
- `adminEmail`, `adminPassword`, `adminPhone`, `adminName` - Przy pierwszym uruchomieniu aplikacji utworzone zostaje konto administratora. Jego dane takie jak email, hasło, numer telefonu i nazwę należy wpisać do odpowiednich zmiennych.

### W `frontend/public/config.json` zmienić:
- `proxy` - Na adres url, na którym działa backend aplikacji.


Aby zapewnić bezpieczeństwo danych administratora, należy po pierwszym zalogowaniu niezwłocznie zmienić hasło w zakładce 'Account'.

Więcej informacji o utrzymaniu bezpieczeństwa w aplikacji, wraz z szczegółami działania tokenów znajduje się w książce "Bezpieczeństwo aplikacji webowych" - Michał Bentkowski, Gynvael Coldwind i inni - Wydawnictwo SECURITUM - 2019.

