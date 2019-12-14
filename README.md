# pacman algoscript
An [algoscript](http://www.algoscript.info/) implementation of pacman

## Features
* Original pacman maze with working shortcut for pacman
* Working game logic (collisions, death, win, life counter)
* fully web based
* Original intro and death sound

## Requirements
An [algoscript](http://www.algoscript.info/) compatible browser, any modern browser should work.

According to the algoscript documentation you can check [here](http://html5test.com/) how well your browser support algoscript.

## Quick start
### Runing the game
Open [algoscript](http://www.algoscript.info/) in a new tab

Open [Main.js](https://github.com/happy44300/pac-man-algoscript-clone/blob/master/Main.js) in this repository

Copy paste the code in algoscript and run it

Enjoy
### Playing the game

Use arrow to move, eat all the gomes (white dot), and avoid the ghost

* There is a shortcut as in the original pacman that only the player can use
* You die when youre health counter reach 0
* You win if you eat all gomes. In that case the game instantly restart without animation.

*NB: if you press A you instantly win and Z you die but don't tell anyone i told you that.*

## Know bug
* Due to CORS (Cross-Origin Resource Sharing) error within algoscript, we can't load image from an exterior url
* There is no sound mixer in algoscript, therefore we can't play multiple sound at once like the *waka waka* or ghost sound
* On low performance computer, frame rate may very, witch may alter the speed of the game (tested on a pc with a Ryzen 2600X CPU)
* The super gomes that make the ghost weak ain't implemented
