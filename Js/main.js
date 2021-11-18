(function(){
    self.Board=function(withd,heigth){
        this.withd=withd;
        this.heigth=heigth;
        this.playing=false;
        this.game_over= false;
        this.bars=[];
        this.ball=null;

    }
    self.Board.prototype={
        get elements(){
            var elements=this.bars;
            elements.push(ball);
            return elements;
        }
    }
})();

(function(){
    self.BoardView=function(canvas,board){
        this.canvas=canvas;
        this.canvas.withd=board.withd;
        this.canvas.heigth=board.heigth;
        this.board=board;
        this.ctx=canvas.getContext("2d");

    }
})();

window.addEventListener("load",main);
function main(){
    var board= new Board(800,400);
    var canvas=document.getElementById(canvas,board);
    var boardView= new BoardView;
}