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
    }
    self.Bar.prototype={
        down: function(){},
        up: function(){}
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
        draw: function(){
            for (var i=this.board.elements.length-1;i>=0;i--){
               var el= this.board.elements[i];
               draw(this.ctx,el);
            };
        }
    }
    function draw(ctx,element){
        if(element!==null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.heigth);
                    break;
            }
        }
    }
})();

self.addEventListener("load",main);
function main(){
    console.log("Hola Mundo");
    var board= new Board(800,600);
    var bar=new Bar(20,10,30,70,board);
    var bar=new Bar(700,10,30,70,board);
    var canvas=document.getElementById('canvas');
    var board_View= new BoardView(canvas,board);
    board_View.draw();
}