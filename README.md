# projekt_bawim_jwt

Celem zadań jest zaznajomienie studentów z ExpressJS i technologią Json Web Token. 

<b>Wstęp:</b>
ExpressJS jest to szybki, web, backendowy framework. Używany jest ze względu na swoją prostotę, przez co idealnie nadaje się do nauki podstawowych funkcji.
<ul>
<li><b>Zadanie no 1</b> będzie miało na celu pokazanie podstaw działania tego framework'u, strukturą plików i przygotowaniem do implementacji JWT.</li>
<li><b>Zadanie no 2 & 3</b> pokażą podstawową implementację i testowanie JWT na podstawie struktury plików z zadania no 1.</li>
</ul>
Zachęca się do robienia zadań po kolei, ale w przypadku, gdy ktoś jest zaznajomiony z ExpressJS, można pobrać pliki z folderu <i>fin_zad_1</i> i przejść do kolejnych zadań.
<br><br>
<b>Zadanie no 1</b>
<b>Proszę pobrać pliki z folderu <i>wst_zad_1</i></b>
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
