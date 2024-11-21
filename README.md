# projekt_bawim_jwt

Celem zadań jest zaznajomienie studentów z ExpressJS i technologią Json Web Token. 

<b>Wstęp:</b>
ExpressJS jest to szybki, web, backendowy framework. Używany jest ze względu na swoją prostotę, przez co idealnie nadaje się do nauki podstawowych funkcji.
<ul>
<li><b>Zadanie no 1</b> będzie miało na celu pokazanie podstaw działania tego framework'u, strukturą plików i przygotowaniem do implementacji JWT.</li>
<li><b>Zadanie no 2 & 3</b> pokażą podstawową implementację i testowanie JWT na podstawie struktury plików z zadania no 1.</li>
</ul>
Zachęca się do robienia zadań po kolei, ale w przypadku, gdy ktoś jest zaznajomiony z ExpressJS, można pobrać pliki z folderu <i>fin_Zadanie_1</i> i przejść do kolejnych zadań.<br><br>
<b>Zalecane jest korzystanie z VSC i zainstalowanie na nim rozszerzenia Thunder Client</b>
<br><br>
<h1>Zadanie no 1</h1>
<b>Proszę pobrać pliki z folderu <i>Zadanie_1</i></b>
Express, to proste narzędzie do budowania backendu. W nim można definiować jak zachowa się serwer np. jakie pliki zwróci, co zmieni w bazie danych, na podstawie akcji wykonanych przez użytkownika.
W plikach, które znajdują się w folderze dla tego zadania, i które nas interesują, można znaleźć:
<ul>
  <li><b>server.js</b> - jest to nasz główny plik</li>
  <li><b>package.json</b> - jest to plik, w którym znajdują się informacje dot. projektu, jego zależności (z jakich bibliotek korzystamy), definicje skryptów uruchamiających aplikację itd.</li>
  <li><b>w odpowiednich folderach pliki statyczne index.html i styles.css</b></li>
</ul>
W celu uruchomienia serwera należy wpisać komendy (pierwsza pobierze biblioteki, druga uruchomi serwer): 

```
npm i
npm run dev
```
Żeby serwer zwrócił nam stronę należy dodać do niego kod: 

```javascript
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'))
})
```
Tak wygląda podstawowy route, można sprawdzić jego działanie na stronie 

```
http://localhost:3000/
```
W kolejnych zadaniach struktura nie będzie jednak taka prosta.
Żeby zachować czystość kodu, stworzymy foldery według następującej topologii:
```
|-controllers //do trzymania plików "kontrolerów"
|-middleware  //do trzymania plików "middleware"
|-model //do trzymania plików json imitujących bazy danych
|-node_modules (istnieje)
|-public|
        |-css (istnieje)
|-routes //do trzymania "ścieżek"
|-src (istnieje)
```
W folderze controllers należy stworzyc plik **main_contr.js** i umieścić w nim

```javascript
const path = require('path')

const handle_main = (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'src', 'index.html'))
}

module.exports = { handle_main }
```
działa to jako osobny moduł który zwraca w tym przypadku wymagany plik.
Mamy tutaj funkcję strzałkową, która jako argumenty przyjmuje **req** i **res**.
Tłumacząc prosto
<ul>
  <li>req - to są dane przyjmowane</li>
  <li>res - dane zwracane</li>
</ul>

W folderze routes należy stworzyc plik **main_route.js** i umieścić w nim:

```javascript
const express = require('express')
const router = express.Router()
const handle_contr = require('../controllers/main_contr')

router.get('/', handle_contr.handle_main)

module.exports = router;
```
Tutaj importujemy moduł wcześniej stworzony i tworzymy ścieżkę, działającą jak wcześniej, ale zamiast tutaj pisać kod, korzystamy z modułu kontrolera. 
<br> <br>
Żeby sprawdzić działanie, należy przejść do pliku server.js, zakomentować poprzednią ścieżkę i wkleić:

```javascript
app.use('/', require('./routes/main_route.js'))
```
<br><br>
<h1>Zadanie no 2</h1>
<h2>1.Tworzenie pliku .env i 'bazy danych'</h2>
Rozpoczynając kolejne zadania, należy stworzyć w folderze głównym plik <b>.env</b> zawierający zmienne środowiskowe.
W nim korzystając z terminala node (komenda node) należy wygenerować 2 różne stringi wielkości 64 bajtów.

```
require('crypto').randomBytes(64).toString('hex')
```
i umieścić je w nim:

```
ACCESS_TOKEN_SECRET=string_1
REFRESH_TOKEN_SECRET=string_2
```
Do testów proszę również stworzyć plik **users.json** w folderze model z zawartością:

```
[]
```
<h2>2.Tworzenie kontrolera rejestracji</h2>
W folderze controllers należy stworzyć plik, w którym napiszemy kontroler do rejestracji.
Na samej górze tego pliku musimy zainicjować nasza bazę danych (czyli plik users.json). Wygląd tego kodu może przypominać useState z ReactJS i działa to podobnie:

```javascript
const usersDB = {
    users: require('../model/users.json'), 
    setUsers: function (data) {
        this.users = data
    }
}// usersDB.users -> pobranie zawartości, usersDB.serUsers() -> nadpisanie zawartości 
```
Potem musimy zainicjować biblioteki, których będziemy używać:

```javascript
const fsPromises = require('fs').promises //do edycji pliku 
const path = require('path') //do tworzenia ścieżek
const bcrypt = require('bcrypt') //do hashowania
```
Następnie tworzymy funkcję **handleNewUser** (asynchroniczną, ponieważ fsPromises jest asynchroniczne) i w niej:
<ol>
  <li>Pobieramy dane od użytkownika</li>
  <li>Sprawdzamy, czy użytkownik istnieje i w takim przypadku zwracamy odpowiedni status</li>
  <li>Hashujemy hasło użytkownika i dodajemy go do bazy danych</li>
</ol>
Pomocny kod:

```javascript
const { user, password } = req.body //pobranie wartości {login, hasło}
res.status(409).json({ 'message': 'user exists' }) //wysłanie statusu 409 z custom wiadomością
const hashedPassword = await bcrypt.hash(password, 10) //hashowanie hasła
await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users)) //nadpisywanie pliku users.json nowymi danymi
```
<b>Zachęcamy do samodzielnego podejścia do problemu. W przypadku trudności można spojrzeć do folderu fin_Zadanie_2_2 i zaczerpnąć inspiracji.</b>
Następnym krokiem w tym podpunkcie jest jedynie podpięci tego kontrolera do (wymagającego stworzenia) pliku ścieżki w folderze routes i dodania odpowiedniej ścieżki w głównym serwerze.
Wszystko analogicznie do **Zadania no 1**. 


