/*Como en todos los codigos de kiwi, lo primero es crear la variable state del juego 'Play'.*/

var state = new Kiwi.State('Play');

/*Se crea el estado preload donde se cargan todas las imagenes. los atributos son el tamaño de la imagen.*/
state.preload = function () {

	this.addImage('space', 'img/bg2.png', 800, 1000);
	this.addSpriteSheet( 'sun', 'img/sun.png', 500, 500 );
	this.addSpriteSheet( 'mercury', 'img/mercury.png', 200, 250 );
	this.addSpriteSheet( 'venus', 'img/venus.png', 150, 300 );
    this.addSpriteSheet( 'earth', 'img/earth.png', 110, 110 );
    this.addSpriteSheet( 'mars', 'img/mars.png', 150, 300 );
    this.addSpriteSheet( 'jupiter', 'img/jupiter.png', 150, 300 );
    this.addSpriteSheet( 'saturn', 'img/saturn.png', 300, 300 );
    this.addSpriteSheet( 'uranus', 'img/uranus.png', 150, 300 );
    this.addSpriteSheet( 'neptune', 'img/neptune.png', 150, 300 );
};

/*El estado create genera los sprites a partir de las imagenes cargadas en el preload. En este caso los atributos son las posicion en el canvas.*/
state.create = function () {

	this.space = new Kiwi.GameObjects.Sprite(this, this.textures.space);
	this.addChild(this.space);

	this.sprite0 = new Kiwi.GameObjects.Sprite(this, this.textures.sun, 315, 300);
	this.addChild(this.sprite0);

	this.sprite1 = new Kiwi.GameObjects.Sprite(this, this.textures.mercury, 300, 290);
	this.addChild(this.sprite1);

	this.sprite2 = new Kiwi.GameObjects.Sprite(this, this.textures.venus, 280, 270);
	this.addChild(this.sprite2);

	this.sprite3 = new Kiwi.GameObjects.Sprite(this, this.textures.earth, 255, 240);
	this.addChild(this.sprite3);

	this.sprite5 = new Kiwi.GameObjects.Sprite(this, this.textures.mars, 220, 220);
	this.addChild(this.sprite5);

	this.sprite6 = new Kiwi.GameObjects.Sprite(this, this.textures.jupiter, 180, 180);
	this.addChild(this.sprite6);
	
	this.sprite7 = new Kiwi.GameObjects.Sprite(this, this.textures.saturn, 160, 150);
	this.addChild(this.sprite7);

	this.sprite8 = new Kiwi.GameObjects.Sprite(this, this.textures.uranus, 130, 130);
	this.addChild(this.sprite8);

	this.sprite9 = new Kiwi.GameObjects.Sprite(this, this.textures.neptune, 120, 100);
	this.addChild(this.sprite9);
	
	//Cambia el punto de anclaje del sprite, en este caso anchorPoint modifica el diametro de la cincurferencia del objeto transformado. 
	
	this.sprite1.anchorPointX = 40;
	this.sprite1.anchorPointY = 40;
	this.sprite2.anchorPointX = 60;
	this.sprite2.anchorPointY = 60;
	this.sprite3.anchorPointX = 80;
	this.sprite3.anchorPointY = 80;
	this.sprite5.anchorPointX = 120;
	this.sprite5.anchorPointY = 120;
	this.sprite6.anchorPointX = 170;
	this.sprite6.anchorPointY = 170;
	this.sprite7.anchorPointX = 200;
	this.sprite7.anchorPointY = 200;
	this.sprite8.anchorPointX = 220;
	this.sprite8.anchorPointY = 220;
	this.sprite9.anchorPointX = 250;
	this.sprite9.anchorPointY = 250;
	
	//Con el atributo .rotation se puede puede modificar la trayectoria.



};

// Se crea el estado update que actualiza el estado de los sprites. En este caso el atributo rotation general las distintas velocidades.
state.update = function () {

	this.sprite1.rotation += Math.PI * 0.005;
	this.sprite2.rotation += Math.PI * 0.004;
	this.sprite3.rotation += Math.PI * 0.002;
	this.sprite5.rotation += Math.PI * 0.001;
	this.sprite6.rotation += Math.PI * 0.00040;
	this.sprite7.rotation += Math.PI * 0.00030;
	this.sprite8.rotation += Math.PI * 0.00020;
	this.sprite9.rotation += Math.PI * 0.00010;
	
}

// La variable gameOptions establece el tamaño del canvas (juego).
var gameOptions = {
	width: 800,
	height: 650
};

var game = new Kiwi.Game('game-container', 'Anchor Point', state, gameOptions);

// Esta funcion NO usa kiwiJS, es codigo javascript que sirve para generar las imagenes que muestran las caracteristicas de los planetas. Utiliza otra libreria para generar (pop-up)

function muestra_imagen(archivo,ancho,alto){
	xWidth ('ampliacion',ancho + 10)
	xHeight ('ampliacion',alto + 10 + 26)
	xWidth ('c1',ancho)
	xHeight ('c1',alto)
	xWidth ('cerrarampliacion',ancho +5)
	xHeight ('cerrarampliacion',alto + 5 + 5)

   xInnerHtml('c1','<img src="' + archivo + '" width="' + ancho + '" height="' + alto + '" border="0">')
   xShow('ampliacion');
}

function cerrar_ampliacion(){
   xHide('ampliacion');
}
