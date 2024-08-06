## Jak nainstalovat vývojové prostředí ##

**Návod pro Mac OS**

1. spustit Terminál
2. zkontrolovat verzi node.js (version 12) `node -v`, pokud chybí tak nainstalovat [https://gulpjs.com/docs/en/getting-started/quick-start]
---
3. přejít do složky s projektem
4. doinstalovat do projektu rozšiřující balíčky uložené v package.json
`npm install` případně `sudo npm install`
5. spustit ve složce s projektem příkaz `gulp`
6. pro náhled projektu otevřít v prohlížeči adresu http://localhost:3000/
7. ukončení náhledu projektu v terminálu kombinací kláves `cmd + c`


## Development ##

**Watch**
Run browsersync server, build and watch files.
```sh
gulp
```
Server run on**localhost:3000**

**Build**

```sh
gulp build
```


## Základní informace ##

**config**
- ve složce demo-sources jsou uloženy vzorové soubory do rootu .htaccess a robots.txt
- ve složce favicons nahraďte obrázek pro favikonku (512x512px, png), odstatní velikosti se vygenerují automaticky
- ve složce manifest upravte v manifest.json první 2 hodnoty na název portálu
- ve složce og nahraďte obrázek pro facebook (1200x630px, jpg)

**fonts**
- složka pro custom fonty (doporučuji však použít google fonty vložené přímo v html header)

**icons**
- do složky icons se vkládají pouze vektorové svg soubory, generuje se z nich svg sprite

**images**
- složka s obrázky

**files**
- do složky files se vkládají další statické soubory (videa, pdf dokumenty apod.)

**scripts**
- jednotlivé části scriptů ukládat do složky modules a následně provést import v soboru index.js 

**styles**
- ve složce base se nachází základní styly
- do složky components ukládáme jednotlivé části stylů a následně provádíme jejich import v soboru style.scss
- pro přehlednost a znovupoužitelnost kódu u všech komponent používáme klasický závorkový sass zápis
- dodržujeme zápis podle BEM doporučení
- každý blok, element i modifikátor má vlastní classu, kterou opět kvůli přehlednosti nezahořujeme, dodržujeme kaskádu
- zápis media queries se provádí přímo v souboru s komponentou

Příklad:
```sh
.block {}
.block__element {}
.block__element--modificator {}
.block__element2 {}
.block__element2--modificator {}

@media (max-width: 1200px) {
	.block {}
	.block__element {}
}
```
**templates**
- ve složce base se nachází základní části webu header a footer
- do složky components ukládáme jednotlivé části webové prezentace pojmenované stejně jako jejich scss soubory případně i js soubory (pokud jsou přímo navázané k této komponentě)
- zápis pro přehlednost a znovupoužitelnost provádíme klasickým html jazykem


## Potřebné podklady před startem projektu ##
- design webu i s náhledy responsivu
- použité fonty s licencí pro web
- favicon (512x512px, png)
- og facebook image (1200x630px, jpg)
- finální url webu
- textace do title a description (alespoň pro hlavní stránku)
- nice to have
	- vyřezané ikonky v svg formátu
	- obrázky v 2x větší velikosti pro retinu
	- přehled všech elementů na jedné stránce (především textů a nadpisů)
	- chybové hlášky u formulářů
	- stavy hover efektů u všech klikacích elementů
	- popis nestandardních funkcionalit a zamýšlených animací


## Testování šablon ##

**Zobrazení**
- Web je správně zobrazen a otestován ve všech prohlížečích (https://www.browserstack.com/)
- I na IE 8 je web průchodný (ale zobrazení nemusí být 100%)
- Kontrola responsivity i v landscape modu (tablet, mobil, desktop)

**Kvalita kódu**
- Chrome lighthouse audit má všude 100%
- Kontrola sematiky (H1 jen jednou, zanoření nadpisu, použití strong, b, i apod.) z hlediska SEO
- Šablony jsou validní (http://validator.w3.org/)
- V žádném zdrojovém kódu není nikde náš podpis
- Všechny CSS jsou správně prefixované
- Ve zdrojových kódech je i manifest.json (add to homescreen button) + favikonky 192x192 a 512x512px
- PWA - aplikace jde ovládat offline

**Server**
- Na webu je nasazen bezpečnostní plugin, web je dostatečně zabezpečený (iThemes Security)
- Na webu je info o GDPR, cookies info a smluvní podmínky (pokud potřeba)
- Web běží na http2 a https
- Na webu jsou nasazeny bezpečnostní hlavičky a test prochází na A (https://securityheaders.com/)
- Jsou nasazeny Google Analytics
- Zkontrolovat správně nastavené cachování
- Je vypnutý přístup ke složkám na ftp
- .htaccess (cache, přesměrování, gzip komprese, security headers)

**Obrázky**
- Všechny obrázky a videa na webu jsou dostatečně komprimovaná
- Web je retina ready (img srcsets)
- Na webu jsou favikonky pro všechna zařízení
- Lazy loading obrázků i obsahů carouselu
- Na webu je umístěna scroll-up šipka

**SEO**
- Web obsahuje SEO plugin pro editaci title, desc
- V hlavičce je vložen odkaz na og:image a facebook meta tagy (og:img rozměr je 1200px x 630px) jpg nebo png
- Povolená indexace v robots.txt (v adminu WP je povolena indexace)
- Web generuje sitemapu (pokud to dává smysl)
- Na webu jsou vloženy google snippets, search, sitemap, kde to dává smysl (https://support.google.com/webmasters/answer/6229325?hl=cs-CZ)
- Minifikace html, css a js (méně důletié js umístit na konec stránky)
- Kontrola přesměrování starých url na nové

**Testing**
- google chrome audit test musí být na 100%
- https://www.awwwards.com/about-evaluation/
- https://www.webpagetest.org/
- https://developers.google.com/speed/pagespeed/insights/
- https://search.google.com/test/mobile-friendly
- https://developers.google.com/web/progressive-web-apps/checklist
- https://support.google.com/webmasters/answer/6229325?hl=cs-CZ
- https://search.google.com/structured-data/testing-tool/u/0/?hl=cs




