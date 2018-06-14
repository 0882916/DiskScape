# Typescript project 'maak een game' - programmeren 4
Dit is een project voor de oefeningen in CMTTHE01-4. Voor dit project heb ik een game gemaakt met: classes, inherritance, composition en encapsulation.

https://0882916.github.io/DiskScape/

## Het project - DiskScape
De game bestaat uit:

Meeuwen - deze volgels vliegen horizontaal door het scherm. Wanneer op een meeuw geklikt wordt wordt deze verwijderd, en verliest de speler -250 punten. Hierna komen er twee volgens voor in de plaats. De snelheid en vliegrichting van de volgens is random.

Schotels - deze vliegen horizontaal door het scherm. Wanneer op een schotel geklikt wordt wordt deze verwijderd, en verkrijgt de speler punten op basis van de y-coordinaat en de snelheid van de schotel. Als de schotel op 10% van de hoogte komt veranderd deze van richting, en wanneer op dit moment op de schotel geklikt wordt verliest de speler -50 punten. Wanneer de schotel niet geklikt wordt, en het scherm onder verlaat, verliest de speler -100 punten en 1/25 leven en zal die zelfde schotel opnieuw naar boven bewegen zodat de speler het opnieuw kan proberen.

Schapen - deze gedragen zich precies het zelfde als de schotels, maar komen veel minder voor. Wanneer op een schaap geklikt wordt krijgt de speler 500 punten bij de eerste keer en voor ieder schaap dat in het zelfde spel geklikt wordt krijgt de speler (500 + 500*aantal geklikte schapen) aan punten, dit is een mooie bonus, maar hoe meer schapen geklikt worden hoe meer schotels komen, waardoor het moeilijker wordt geen enkele schijf door te laten. Voor ieder schaap komen 2 schotels/schapen in de plaats.

UFO's - deze bewegen zich zichzagend horizontaal door het scherm. Wanneer de UFO een van de kanten van het scherm raakt zal hij de tegenovergestelde richting op gaan. De schotel zal een maximaal aantal van 2x het de uiteinden van het scherm raken voordat deze verwijderd wordt. Wanneer op de UFO geklikt wordt krijgt de speler 2500 punten. UFO's zijn heel erg schaars, en bewegen zich snel voort.
