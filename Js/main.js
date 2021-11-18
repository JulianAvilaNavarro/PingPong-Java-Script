(function(){
    self.Board=function(width,heigth){
        this.width=width;
        this.heigth=heigth;
        this.playing=false;
        this.game_over= false;
        this.bars=[];
        this.ball=null;

    }
    self.Board.prototype={
        get elements(){
            var elements=this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Ball=function(x,y,radius,board){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed_y=0;
        this.speed_x=3;
        this.board=board;
        board.ball=this;
        this.kind="circle";
    }
})();


(function(){
    self.Bar=function(x,y,width,heigth,board){
        this.x=x;
        this.y=y;
        this.width=width;
        this.board=board;
        this.heigth=heigth;
        this.board.bars.push(this); //accedo al bar, al board y 
        //le agrego nuevo elemento con push.
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



(function(){
    self.BoardView=function(canvas,board){
        this.canvas=canvas;
        this.canvas.width=board.width;
        this.canvas.heigth=board.heigth;
        this.board=board;
        this.ctx=canvas.getContext("2d");
    }
    //helper method
    self.BoardView.prototype={
        clean: function(){
            this.ctx.clearRect(0,0,this.board.width,this.board.heigth);
        },


        draw: function(){
            for (var i=this.board.elements.length-1;i>=0;i--){
               var el= this.board.elements[i];
               draw(this.ctx,el);
            };
        },
        play: function(){
            this.clean();
            this.draw();
        }
    }
    function draw(ctx,element){
        //if(element!==null && element.hasOwnProperty("kind")){
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.heigth);
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
var board= new Board(800,600);
    var bar=new Bar(20,10,30,70,board);
    var bar_2=new Bar(700,10,30,70,board);
    var canvas=document.getElementById('canvas');
    var board_View= new BoardView(canvas,board);
    var ball=new Ball(350,100,10,board);



document.addEventListener("keydown",function(ev){
    ev.preventDefault();
    //console.log(ev.keyCode);
    if(event.keyCode==38){
        bar.up();
    }
    else if(ev.keyCode==40){
        bar.down();
    }
    //w
    else if(ev.keyCode==87){
        bar_2.up();
    }
    //s
    else if(ev.keyCode==83){
        bar_2.down();
    }
    console.log(""+bar_2);
});
window.requestAnimationFrame(controller);
//self.addEventListener("load",main);
function controller(){
    console.log("Hola Mundo");
    window.requestAnimationFrame(controller);
    board_View.play();
    //board_View.clean();
    //board_View.draw();
}