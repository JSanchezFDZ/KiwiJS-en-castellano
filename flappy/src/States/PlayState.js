// Creamos el estado "PlayState", esta vez será con el objeto
// Kiwi.State por que será un estado predefinido por nosotros.

var PlayState = new Kiwi.State('PlayState');

/**
* The PlayState in the core state that is used in the game. 
*
* It is the state where majority of the functionality occurs 'in-game' occurs.
* 
*
* @class playState
* @extends State
* @constructor
*/

/**
* This create method is executed when Kiwi Game reaches the boot stage of the game loop.
* @method create
* @public
*/
PlayState.create = function () {


    //Color de fondo
    this.game.stage.color = 'ffffff';

    //Variables de control - jugando - perdido
    this.gameStarted = false;
    this.gameEnded = false;

    //Fisica del juego, velocidad, gravedad..
    this.gravity = 1;
    this.xSpeed = 3;
    this.ySpeed = 0;
    this.maxYSpeed = 16;
	
	// Destacia del "flap" o aleteo al hacer click
    this.flapSpeed = -16;
	// Distancia entre pipetas
    this.pipeDistance = 400;
	// Abertura entre pipetas
    this.pipeGap = 260;

    // Coordenadas donde empieza el pajaro
    this.startX = (this.game.stage.width / 2) - 46
    this.startY = (this.game.stage.height / 2) - 64;

    //Llamamos a la imagen de fondo y agregamos canvas.
    this.bg = new Kiwi.GameObjects.Sprite(this, this.textures.background, 0, 0);
    this.addChild(this.bg);

    //Logica de las pipetas. 
	// j=5 por que solo da lugar a mostrarse 4, entonces cuando las 5 desaparece
	// por la izquierda, se creará una nueva en la derecha y así, anteriormente
	// estaba a 3, y las pipetas se creaban cuando estabas jugando y no las veias.
    this.pipes = [];
    for (var j = 0; j < 5; j++) {
		// Altura de la pipeta superior, distancia..
        var topPipe = new Kiwi.GameObjects.Sprite(this, this.textures.pipe, j * this.pipeDistance + 400 + this.game.stage.width, -Math.random() * 300 - 500);
        this.addChild(topPipe);
        topPipe.transform.rotation += Math.PI;
        this.pipes.push(topPipe);
	// Altura de la pipeta inferior, distancia..
        var bottomPipe = new Kiwi.GameObjects.Sprite(this, this.textures.pipe, j * this.pipeDistance + 400 + this.game.stage.width, topPipe.transform.y + topPipe.height + this.pipeGap);
        this.addChild(bottomPipe);
        bottomPipe.passed = false;
        bottomPipe.myTop = topPipe;
        this.pipes.push(bottomPipe);
    }

    // Movimiento del cesped
    this.tileWidth = 37;
    this.tiles = [];
    var tileCount = Math.ceil(this.game.stage.width / this.tileWidth);
    for (var i = 0; i <= tileCount; i++) {
        var t = new Kiwi.GameObjects.Sprite(this, this.textures.ground, i * this.tileWidth, this.game.stage.height - 88);
        this.addChild(t);
        this.tiles.push(t);
    }

    // Animación de moverse
    this.bird = new Kiwi.GameObjects.Sprite(this, this.textures.bird, this.startX, this.startY);
    this.bird.animation.add('flap', [0, 1, 2], 0.1, true);
    this.bird.animation.play('flap');
    this.addChild(this.bird);

    this.birdWidth = this.bird.width;
    this.birdHeight = this.bird.height;

    //Evento para controlar que hace click y hacer el "flap" o volar
    this.game.input.onDown.add(this.flap, this);

    // Crear los botones, agregar canvas y esconderlos.
	// También agregamos los eventos para cuando le hagan click y sus funciones.
    this.buttonX = this.game.stage.width / 2 - 107
    this.restartBtn = new Kiwi.GameObjects.Sprite(this, this.textures.restart, -217, this.game.stage.height / 2 - 150, true);
    this.addChild(this.restartBtn);
    this.restartBtn.input.onDown.add(this.restartGame, this);

    this.shareBtn = new Kiwi.GameObjects.Sprite(this, this.textures.share, -217, this.game.stage.height / 2 - 50, true);
    this.addChild(this.shareBtn);
    this.shareBtn.input.onDown.add(this.shareGame, this);

    //Score
    this.score = 0;
    this.scoreText = new Kiwi.GameObjects.Textfield(this, '0', 50, 50, '#FFF');
    this.addChild(this.scoreText);
}

/**
* This method is executed when the player resets the game.
* @method restartGame
* @public
*/
// Función para reiniciar el juego, poner a 0 todo.
PlayState.restartGame = function () {
    this.gameStarted = false;
    this.gameEnded = false;
    this.score = 0;
    this.scoreText.text = this.score;

    for (var p in this.pipes) {
        var pipe = this.pipes[p];
        pipe.transform.x += 400 + this.game.stage.width;
        if (pipe.transform.rotation == 0) pipe.passed = false;
    }

    this.bird.transform.x = this.startX;
    this.bird.transform.y = this.startY;
    this.bird.transform.rotation = 0;

    this.restartBtn.transform.x = -217;
    this.shareBtn.transform.x = -217;
}


/**
* This method is executed when the user presses the share game button.
* @method shareGame
* @public
*/
PlayState.shareGame = function () {
    //Modificar el valor del boton "share"
    //Se abrirá una nueva ventana en forma de pop-up
    window.open("http://www.wuwu.es");
}


/**
* This method is executed when the user clicks.
* @method flap
* @public
*/
// Función del "flap" o aleteo que tiene el personaje al hacer click
PlayState.flap = function () {
    this.gameStarted = true;
    this.ySpeed = this.flapSpeed;
}


/**
* This method is the main update loop. Move scrolling items here
* @method update
* @public
*/
// Bucle del juego, siempre estará ejecutandose.
PlayState.update = function () {
    Kiwi.State.prototype.update.call(this);
    if (this.gameStarted) {
        //Actualizar posición del PERSONAJE y si se ha chocado
        if (this.bird.transform.y < this.game.stage.height) {
            this.bird.transform.y += this.ySpeed;
            if (this.ySpeed < this.maxYSpeed) this.ySpeed += this.gravity;
            if (this.bird.transform.y < 0) this.bird.transform.y = 0;
            if (this.bird.transform.y > 520){
                this.killBird();
                return;
            }
        }
        //Actualizar la rotación del PERSONAJE, es decir, cuando estamos jugando
		// podemos observar que el pajaro se inclina hacia arriba o hacia abajo
		// según nuestros click's, si no queremos que caiga en picado, por ejemplo,
		// aquí se modificaría.
        if (this.ySpeed > 14) {
            this.bird.transform.rotation = Math.PI / 2;
        } else if (this.ySpeed > 6) {
            this.bird.transform.rotation = Math.PI / 6;
        } else {
            this.bird.transform.rotation = -Math.PI / 6;
        }
    }

    // Mover los titulos
    if (!this.gameEnded) {
        for (var t in this.tiles) {
            var tile = this.tiles[t];
            tile.transform.x -= this.xSpeed;
            if (tile.transform.x <= -this.tileWidth) tile.transform.x += this.tileWidth * this.tiles.length;
        }
        if (this.gameStarted) {
            //Mover las pipetas
			// this.pipeDistance * 5;
			// DEBE SER IGUAL A "j" arriba en la configuración de las pipetas
			// Si no hará un error y se descuadran todas ellas.
            for (var p in this.pipes) {
                var pipe = this.pipes[p];
                pipe.transform.x -= this.xSpeed;
                if (pipe.transform.rotation == 0) {
                    if (pipe.transform.x < -pipe.width) {
                        pipe.transform.x += this.pipeDistance * 5;
                        pipe.passed = false;
                        pipe.myTop.transform.x = pipe.transform.x;
						// Distancia aleatoria de altura de las pipetas
                        var rand = -Math.random() * 300 - 400;
                        pipe.myTop.transform.y = rand;
                        pipe.transform.y = pipe.myTop.transform.y + pipe.myTop.height + this.pipeGap;
                    }

                    if (pipe.transform.x < this.bird.transform.x && !pipe.passed) {
                        this.score++;
                        this.scoreText.text = this.score;
                        console.log('Puntos:', this.score);
                        pipe.passed = true;
                    }
                }

                if (this.checkCollision(pipe)) {
                    this.killBird();
                    return;
                }
            }
        }
    }
}


/**
* This method checks to see if the bird is colliding with a given pipe.
* @method checkCollision
* @public
* @param pipe{Sprite} The pipe to check colliding with the bird.
*/
// Función prefedifina para comprobar la consión del personaje.
// No modificar.
PlayState.checkCollision = function (pipe) {
    if (this.bird.transform.x + this.birdWidth > pipe.transform.x) {
        if (this.bird.transform.x < pipe.transform.x + pipe.width) {
            if (this.bird.transform.y + this.birdHeight > pipe.transform.y) {
                if (this.bird.transform.y < pipe.transform.y + pipe.height) {
                    return true;
                }
            }
        }
    }
    return false;
}


/**
* This method is executed when the bird collides with a pipe.
* @method killBird
* @public
*/
PlayState.killBird = function () {
    if (this.gameEnded) return;
	// Si muere el pajaro juegoAcabado = true;
    this.gameEnded = true;
    // Lo envio al "VACIO" o a "LA NADA" para que no se muestre el personaje al morir
	this.bird.transform.x = 9650;
	this.bird.transform.y = 9350;
    this.shareBtn.transform.x = this.buttonX;
    this.restartBtn.transform.x = this.buttonX;
}