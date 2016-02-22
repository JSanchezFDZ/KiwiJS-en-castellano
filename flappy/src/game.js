
/**
* The core EndlessRunner blueprint game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

// Inicializamos la variable Kiwi.Game que es la que hace funcionar todo el juego, activa
// contadores, variables, imagenes...
var game = new Kiwi.Game('content', 'DistanceFlyer', null, { renderer: Kiwi.RENDERER_CANVAS });

// Agregamos los estados que existen
game.states.addState(LoadingState);
game.states.addState(PlayState);
// Cambiamos el estado a "LoadingState"
game.states.switchState("LoadingState");