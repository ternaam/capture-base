# capture-base
Tool to help keep score on a large scale capture-the-base game

Try the latest version of the tool (WIP) on https://ternaam.github.io/capture-base

## in dutch:

Deze tool wordt gemaakt voor het spel, voor de zondag van de RSW2016 Regio west-brabant.

Het idee is dat er rond de 20 groepjes gaan proberen om rond de 16 posten te beheersen. Als ze bij de centrale post aankomen met een bewijs dat ze de één van de posten hebben overgenomen dan word de post toegewezen aan dit groepje, en gaat de teller lopen.
Een ander groepje kan vervolgens de post weer afpakken door daarna met een bewijs te komen, dan zal de post van eigenaar veranderen en de teller van de oude eigenaar stoppen en die van de nieuwe beginnne.

Je kan meerdere posten tegelijkertijd in bezit hebben.

Een aantal features die erin zitten
* kleurtjes per groepje,
* post heeft de kleur van de eigenaar
* post heeft een teller die op secondebasis telt hoelang de post al in het bezit van een groepje is.
* "tussenstand/eindstand"-knop, geeft som van aantal bij elkaar gesprokkelde secondes per groep aan.

En nog een aantal _nice-to-haves_ (niet noodzakelijk, niet aan toegekomen)
* undo-knop, die met terugwerkende kracht je laatste actie kan ont-doen
* mogelijkheid om groepsnamen en kleuren on-the-fly aan te passen.
* gebruik van html5 local storage om te herstellen van stomme foutjes, of in ieder geval een log te hebben.
* Er schiet me vast nog wel wat te binnen als ik daar nog aan toe kom.

## Zelf spelen:

### Makkelijk en snel

Als je geen ervaring met github hebt, maar wel de namen en aantal posten wil aanpassen, kan je zo makkelijk doen:
* download de website als zip, dat kan op de knop hier rechtsboven, of op [deze link]("https://github.com/ternaam/capture-base/archive/gh-pages.zip").
* pak de zip uit op je computer.
* de dingen die je wilt veranderen zijn waarschijnlijk 3 variabelen bovenin js/game.js:
  * [`teamNames`](https://github.com/ternaam/capture-base/blob/gh-pages/js/game.js#L1), Dit is een lijst met alle patrouillenamen.
  * [`nOfPosts`](https://github.com/ternaam/capture-base/blob/gh-pages/js/game.js#L11), Het totaal aantal posten dat je hebt.
  * [`nOfSpecialPosts`](https://github.com/ternaam/capture-base/blob/gh-pages/js/game.js#L12), Het aantal speciale posten, (je krijgt daar `specialFactor` keer zoveel punten per seconde).
* Laat even weten als je het gebruikt heb en wat je ervan vond, altijd leuk om te horen dat je software vaker dan één keer gebruikt wordt :-) .

### Alles aanpassen en beter maken

Als je wel ervaring hebt met github, en met css, html, en javascript, dan staat niks je in de weg om zelf een fork te maken. Verbeter de opmaak, maak eindelijk een undo-button, of maak een compleet client-server systeem waarmee je meerdere centrale posten kan hebben of vanuit elke post met een qr-code de post kan claimen voor je team! Succes!
