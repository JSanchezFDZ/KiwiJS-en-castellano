/**
* The Loading State is going to be used to load in all of the in-game assets that we need in game.
*
* Because in this blueprint there is only a single "hidden object" section we are going to load in all of 
* the asset's at this point.
*
* If you have multiple states however, I would recommend have loading the other graphics as they are required by their states, 
* Otherwise the loading times maybe a bit long and it is not the most optimal solution.
*
*/

/**
* Since we want to use the custom Kiwi.JS loader with the bobing kiwi/html5 logo and everything. We need to extend the KiwiLoadingScreen State.  
* The KiwiLoadingScreen State is an extentsion of a normal State but it has some custom code to handle the loading/bobbing/fading of all the items, so if you override a method (like the preload) for example just make sure you call the super method.
* 
* The parameters we are passing into this method are as ordered.
* 1 - name {String} Name of this state.
* 2 - stateToSwitch {String} Name of the state to switch to AFTER all the assets have loaded. Note: The state you want to switch to should already have been added to the game.
* 3 - dimensions {Object} A Object containing the width/height that the game is to be. For example {width: 1024, height: 768}
* 4 - subfolder {String} The folder that the loading graphics are located at. 
*/

// Creamos el estado "LoadinState", que en nuestro caso será un objeto predefinido de KiwiJS que es
// la pantalla de LOAGIND predefinida por ellos.
var LoadingState = new KiwiLoadingScreen('LoadingState', 'PlayState', {width: 1305, height: 684}, 'assets/img/loading/');

/**
* This preload method is responsible for preloading all your in game assets.
* @method preload
* @private
*/
LoadingState.preload = function () {
    
    //Hacemos la precarga de todas las imagenes del juego.
    //----------------------------------------------------
	// También se llama a la función prefefinida para llamar a las imagenes de carga de KiwiJS
    KiwiLoadingScreen.prototype.preload.call(this);

    this.addSpriteSheet('bird', 'assets/img/bird.png', 92, 64);
    this.addSpriteSheet('background', 'assets/img/background.png', 1305, 896);
    this.addImage('ground', 'assets/img/ground.png');
    this.addImage('pipe', 'assets/img/pipe.png');
    this.addSpriteSheet('restart', 'assets/img/restart.png', 214, 75);
    this.addSpriteSheet('share', 'assets/img/share.png', 214, 75);
};
