'use strict';
(function(){
    self.Board=function(width, height){
        this.width=width;
        this.height=height;
        this.playing=false;
        this.game_over= false;
        this.bars=[];
        this.ball=null;
        this.playing=false;
    }
    self.Board.prototype={
        get elements(){
            var elements=this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
    }
 }
})();

// Funcioón para crear la pelota
(function(){
    self.Ball=function(x,y,radius,board){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed_y=0;
        this.speed_x=3;
        this.board=board;
        this.direction=1;
        this.bounce_angle=0;
        this.max_bounce_angle=Math.PI/12;
        this.speed=3;
        board.ball=this;
        this.kind="circle";  
        //hasta aquí van los atributos de la pelota 
    }
    self.Ball.prototype={
        move: function(){
            this.x+=(this.speed_x*this.direction);
            this.y+=(this.speed_y);

            //prueba arreglar golpes paredes
            // Collision con paredes horizontales
			if (this.y <= 10) {
				this.speed_y = -this.speed_y;
				this.bounce_angle = -this.bounce_angle;
                // se tiene en cuenta el radio de la bola
			}
			if (this.y >= 390) {
				this.speed_y = -this.speed_y;
				this.bounce_angle = -this.bounce_angle;
                // se tienen en cuenta los limites del canvas
			}

            //prueba arreglar golpes paredes
            // Collision con paredes verticales
			if (this.x <= 10) {
				this.speed_x = -this.speed_x;
				this.bounce_angle = -this.bounce_angle;
                 // se tiene en cuenta el radio de la bola
			}
			if (this.x >= 790) {
				this.speed_x = -this.speed_x;
				this.bounce_angle = -this.bounce_angle;
                // se tienen en cuenta los limites del canvas
			}

             //funcion de colision 
        },

       
        get width() {
			return this.radius * 2;
		},
		get height() {
			return this.radius * 2;
		},
        collision: function(bar){
            //reacciona a una colision con una barra que recibe como parametro
            // calcula el angulo en el que va a moverse la pelota
            //y cambiar la dirección dependiendo de la dirección de la barra
			var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;

			var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

			this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
			this.speed_y = this.speed * -Math.sin(this.bounce_angle);
			this.speed_x = this.speed * Math.cos(this.bounce_angle);

			if (this.x > (this.board.width / 2)) this.direction = -1;
			else this.direction = 1;

        }
    }
})();

// funcion para las caracteristicas del canvas

(function(){
    self.Bar=function(x,y,width,height,board){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.board=board;
        this.board.bars.push(this); //accedo al bar, al board y 
        //le agrego nuevo elemento con push.
        // Se agrega la barra al tablero
        //dibujar cosas
        this.kind="rectangle";
        this.speed=20;
    }
    self.Bar.prototype={
        down: function(){
            this.y +=this.speed;
        },

        up: function(){
            this.y -=this.speed; 
        },
        toString: function(){
            return "x: "+this.x+" y: "+this.y;
        }
    }
})();


// Aquí se dibuja el tablero de juego
(function(){
    self.BoardView=function(canvas,board){
        this.canvas=canvas;
        this.canvas.width=board.width;
        this.canvas.height=board.height;
        this.board=board;
        this.ctx=canvas.getContext("2d");
    }
    //helper method
    self.BoardView.prototype={
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.height);
        },


        draw: function(){
            for (var i=this.board.elements.length-1;i>=0;i--){
               var el= this.board.elements[i];
               draw(this.ctx,el);
            };
        },
        //Nueva función para revisar colisiones
        check_collisions: function(){
            for (var i=this.board.bars.length-1;i>=0; i--){
                var bar= this.board.bars[i];
                if(hit(bar,this.board.ball)){
                    this.board.ball.collision(bar);

                };
            }
        },

        play: function(){
            if(this.board.playing){
                // Se hace el clean del canvas
                this.clean();
                this.draw();// dibuja tablero
                this.check_collisions(); // verificador de colisiones
                this.board.ball.move();// movimiento de pelota
            }
         
        }

    }
    // Creacion helper para colisiones de la bola

    function hit(a, b) {
		//Revisa si a colisiona con b
		var hit = false;
		//Colsiones horizontales
		if (b.x + b.width >= a.x && b.x < a.x + a.width) {
			//Colisiones verticales
			if (b.y + b.height >= a.y && b.y < a.y + a.height)
				hit = true;
		}
		//Colisión de a con b
		if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
			if (b.y <= a.y && b.y + b.height >= a.y + a.height)
				hit = true;
		}
		//Colisión b con a
		if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
			if (a.y <= b.y && a.y + a.height >= b.y + b.height)
				hit = true;
		}
		return hit;
	}


    function draw(ctx,element){
        //if(element!==null && element.hasOwnProperty("kind")){
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                 break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x,element.y,element.radius,0,7);
                ctx.fill();
                ctx.closePath();
                break;
            }
       // }
    }
})();
var board= new Board(800,400); //Se crea el tablero 
// x, y, width, height
    var bar=new Bar(20,10,30,70,board);// barra 1
    var bar_2=new Bar(700,10,30,70,board);// barra 2
    var canvas=document.getElementById("canvas"); // DOM
    var board_View= new BoardView(canvas,board);// se crea el tablero
    var ball=new Ball(350,100,10,board); // se crea pelota


// aqui capturamos las teclas up, down, w,s y espacio
document.addEventListener("keydown",function(ev){
    
    //console.log(ev.keyCode);
    if(event.keyCode==38){
        ev.preventDefault();
        bar.up();
    }
    else if(ev.keyCode==40){
        ev.preventDefault();
        bar.down();
    }
    //w
    else if(ev.keyCode==87){
        ev.preventDefault();
        bar_2.up();
    }
    //s
    else if(ev.keyCode==83){
        ev.preventDefault();
        bar_2.down();
    }
    else if(ev.keyCode===32) {
        ev.preventDefault();
        board.playing=!board.playing;// espaciadora que inicia el juego o pausa el juego
    }
    console.log(""+bar_2);
});

board_View.draw();
window.requestAnimationFrame(controller);// refresco de pantalla en main
// funcion inicio juego
function controller(){
    console.log("Hola Mundo");
    window.requestAnimationFrame(controller);
    board_View.play();
}