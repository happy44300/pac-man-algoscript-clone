# pacman algoscript
An [algoscript](http://www.algoscript.info/) implementation of pacman
<dl>
  <p align="center">
    <img src="https://happy44300.github.io/Thumbnail.PNG">
  </p>
</dl>

## Features
* Dynamically drawed maze
* Pixel based collisions detections
* Randomly moving ghost
* No files to download

## Requirements
An [algoscript](http://www.algoscript.info/) compatible browser, any modern browser should work.

According to the algoscript documentation you can check [here](http://html5test.com/) how well your browser support algoscript.

## Quick start
### Runing the game
Open [algoscript](http://www.algoscript.info/) in a new tab

Open [Main.js](https://github.com/happy44300/pac-man-algoscript-clone/blob/master/Main.js) in this repository

Copy paste the code from [Main.js](https://github.com/happy44300/pac-man-algoscript-clone/blob/master/Main.js) in algoscript and run it

Enjoy
### Playing the game

Use the keyboard arrow to move, eat all the gomes (white dot), and avoid the ghost.
Pacman move in the selected direction until he hit a wall or another direction is given. You need to
avoid the ghost and eat all the gomes (white dot).
**You die when your health counter hit 0, so be careful if you are at 1 life**

There is also a shorcut between the side of the maze:
<dl>
  <p align="center">
    <img src="https://happy44300.github.io/shortcut.png">
  </p>
</dl>

*NB: If you press A you instantly win and Z you instantly die but don't tell anyone i told you that*

## Know bug
* Due to CORS (Cross-Origin Resource Sharing) error within algoscript, we can't load ghost and pacman sprite
* There is no sound mixer in algoscript, therefore we can't play multiple sound at once like the *waka waka* or ambiant ghost sound
* On low performance computer, frame rate may drop, witch may alter the speed of the game since the speed is tied to the frame rate (tested on a pc with a Ryzen 2600X CPU)
* The super gomes that make the ghost weak are not implemented
