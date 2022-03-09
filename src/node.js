class Node{
    constructor(s, m, d, vm){
        this.state = s;
        this.path = m;
        this.depth = d;
        this.validMoves = vm;
    }

    expand(){
        var neighbours = new Array();

        for(var i = 0; i < this.validMoves.length; i++){
            var copyState = Utilities.copyState(this.state);

            var newNeighbour = new Neighbour(Utilities.stringToMove(this.validMoves[i], copyState), this.validMoves[i]);

            neighbours.push(newNeighbour);
        }
        return neighbours;
    }
}

class Neighbour{
    constructor(state, lastMove){
        this.state = state;
        this.lastMove = lastMove;
    }
}