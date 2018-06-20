# DiskScape

## Typescript project 'maak een game' - programmeren 4
Dit is een project voor de oefeningen in CMTTHE01-4. Voor dit project heb ik een game gemaakt met: classes, inherritance, composition en encapsulation.

### Speel DiskScape via de volgende link:
[DiskScape](https://0882916.github.io/DiskScape/)

## De spelregels
Probeer zoveel mogelijk punten te scoren, door de schotels te vernietigen, maar pas op, als de schotel op de grond valt raak je een leven kwijt! 


## Toelichting OOP

### Classes
In de game maak ik gebruik van object geörienteerd programmeren. Door middel van klasses kan ik een object aanmaken met gedrag dat ik maar één keer hoeft aan te maken, maar zo vaak als ik wil met weinig code in mijn game kan tonen. Wanneer ik iets wil veranderen of wanneer er iets mis is met dit object, hoeft ik nergens anders te kijken dan in de class van dit object, en kan ik in dit bestand alle objecten die gebruik maken van deze klas in één keer aanpassen

In de code hieronder maak ik een array aan waar ik de bird class in stop. Vervolgens creëer ik door middel van een loop vogels als in de variable birds is aangegeven. Aan het begin van het spel is dit 3.

```javascript
class PlayScreen 
{
    // class game
    private game:Game

    // arrays for adding birds
    private bird:Bird[] = []

    // number of birds appearing at start of game
    private birds:number = 3


    // constructor with class game
    constructor(g: Game)
    {
        this.game = g

        // loop through number of times stated in disk variable
        for (var i = 0; i < this.birds; i++) 
        {
            //add bird for every loop
            // for half of the time
            if (Math.random() < 0.5)
            {
                // create a bird moving right
                this.bird.push(new BirdRight(this))
            }         

            // other half of the time  
            else
            {
                // create a bird moving left
                this.bird.push(new BirdLeft(this))
            }
        }
```


### Encapsulation
Om ervoor te zorgen dat er geen nare dingen gebeuren als je perongeluk twee de zelfde variablen gebruikt in twee afzonderlijke classes worden alle variablen zoveel mogelijk als 'private' aangegeven. Hierdoor kan alleen de klas waar de varable is gedeclareerd deze variable aanpassen. 
Toch wil je soms dat een class iets te zeggen heeft over de variable in de parent of child class. In dit geval gebruik je 'protected'. Door protected te gebruiken kunnen alle children die in de parent zijn gedeclareerd deze variable aanpassen.
En heel soms wil je gebruik maken van 'public'. Bij public kunnen alle classes bij deze variable. Dit kan handig zijn wanneer de een variable in alle classes beschikbaar moet zijn, wel moet je hiermee oppassen.

private: de 'birds' variable in game geeft aan hoeveel birds er in het spel moeten worden getoont. Deze variable zegt iets over de class Bird, maar de class Bird kan niet bij deze variable.

```javascript
    // number of birds appearing at start of game
    private birds:number = 3
```

protected: de '_speed' variable in class Bird verteld de class PlayScreen hoe snel de vogels door het scherm moeten bewegen. Maar in de class Bird bevinden zich twee verschillende vogels: eentje die naar links gaat en eentje die naar rechts gaat. Ookal maakt class PlayScreen altijd gebruik van alleen de class Bird, zullen er twee vershillende vogels op het scherm komen. Dit komt doordat de children van class Bird de variable '_speed' kunnen aanpassen in de parent class.

```javascript
class Bird 
{
    // speed adjustable by children
    protected _speed:number
}
```

public: voor het bijhouden maak ik gebruik van een 'public' variable 'score' in de class Game. Hierdoor kan ik vanuit het playscreen de waarde aanpassen en de aangepaste waarde in het gameoverscreen tonen. In dit geval zou ik ook 'protected' kunnen gebruiken, maar aangezien er maar één score is, en het zou kunnen dat ik in de toekomst meerdere levels toevoeg, heb ik gekozen voor public.

```javascript
class Game 
{
    public score: number = 25000
}
```


### Inheritance
De classes BirdLeft en BirdRight maken beiden gebruik van de parent class Bird. Het enige verschil is dat zij een andere '_speed' gebruiken om naar links of juist naar rechts te bewegen. Ook wordt voor beiden een individuele tag gegeven. Doordat beiden vogels in principe het zelfde doen als de parent op een paar waarden na, maak ik gebruik van 'inheritance' of 'overerving' om de eigenschappen van de parent te gebruiken zonder dat ik dubbele code hoeft te schijven

```javascript
// child of bird class
class BirdLeft extends Bird 
{
    constructor(g:PlayScreen) 
    {
        super(g, "bird-left")

        // negative speed between -3 and -8
        this._speed = -3.0 - Math.random() * 5.0
    }
}
```

```javascript
class BirdRight extends Bird 
{
    // child of bird class
    constructor(g:PlayScreen) 
    {
        super(g, "bird-right")

        // negative speed between -3 and -8
        this._speed = 3.0 + Math.random() * 5.0
    }
}
```


## Klassen diagram
![diagram](https://preview.ibb.co/jphpFJ/klassendiagram_final.png)

## Extra uitdagingen
- De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork


## Peer review
Abel Beekink - AeroPoint

- De code van het individuele project staat op GitHub. **check**
- De game is online speelbaar. **missing**
- De game bevat minimaal één van de onderstaande extra uitdagingen. **check**
- De game heeft een startscherm en een eindscherm. **check**
- Er zijn geen bugs. **check**
- Het project maakt gebruik van deze OOP principes.
- Classes **check**
- Encapsulation **check**
- Composition **check**
- Inheritance **check**
- De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
- Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
op die plek toegepast. De uitleg is inclusief code voorbeelden. **missing**
- Een klassendiagram van de game. **missing**
- Een link naar de peer review die in week 6 is gedaan. **missing**

Extra uitdagingen
- De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork. **check**
- De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten. **missing**
- De game werkt met Canvas in plaats van DOM elementen **missing**
- De game bevat local of online multiplayer. **missing**
- De game werkt op mobiele schermen en ondersteunt touchscreen controls. **missing**
- De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS. **missing**
- De game gebruikt een externe library uit de lijst in deze modulewijzer. **check**

Feedback:
Het idee is erg leuk, en de code ziet er best advanced uit. Persoonlijk vind ik het mooi uitgewerkt, goede classes en benaming van variablen; erg overzichtelijk. Wat ik in de gameplay zelf wat minder vind is dat het doordat holle bullets alleen puntige bullets kunnen raken en vice versa het best beperkt wordt wat je kunt aanrichten in het spel. Het lijkt vrij snel dat je niet meer dan een of twee blokken kunt aanklikken die echt iets doen - het had iets uitdagender kunnen zijn. Iets dat misschien wat veel moeite had geweest, maar een hele koele uitbreiding zou zijn is dat de combo doorgaat op blokken die gevallen zijn nadat geklikt wordt, zodat de combo nog groter wordt. Maar erg leuk idee en heel goed uitgewerkt