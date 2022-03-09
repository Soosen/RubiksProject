var global;
class Utilities{
    static copyArray(array){
        var ret = [];
        
        for(var i = 0; i < array.length; i++){
            ret[i] = array[i];
        }

        return ret;
    }

    static matchesCriteria(currentState, endStates){
        for(var i = 0; i < endStates.length; i++){
            if(this.copmareStates(currentState, endStates[i])){
                return true;
            }
        }
        return false;
    }

    static copmareStates(stateA, stateB){
        for(var i = 0; i < stateA.length; i++){
            for(var j = 0; j < dimensions; j++){
                for(var k = 0; k < dimensions; k++){
                    if(stateA[i][j][k] != stateB[i][j][k] && stateA[i][j][k] != "X" && stateB[i][j][k] != "X")
                    return false;
                }
            } 
        }
        return true;
    }

    //translate a string to a color object
    static stringToColor(c){
        switch(c){
            case "Y":
                return yellow;

            case "W":
                return white;

            case "G":
                return green;

            case "B":
                return blue;

            case "R":
                return red;

            case "O":
                return orange;
            
            default:
                return black;            
        }
    }

    static stringToMove(string, state){
        switch(string){
            case "u":
                return Moves.uMove(state);
            case "uPrim":
                return Moves.uPrimMove(state);
            case "d":
                return Moves.dMove(state);
            case "dPrim":
                return Moves.dPrimMove(state);
            case "f":
                return Moves.fMove(state);
            case "fPrim":
                return Moves.fPrimMove(state);
            case "b":
                return Moves.bMove(state);
            case "bPrim":
                return Moves.bPrimMove(state);
            case "r":
                return Moves.rMove(state);
            case "rPrim":
                return Moves.rPrimMove(state);
            case "l":
                return Moves.lMove(state);
            case "lPrim":
                return Moves.lPrimMove(state);
        }

        var moves = string.split("-");
        for(var i = 0; i < moves.length; i++){
            state = this.stringToMove(moves[i], state);
        }
        return state;
    }
    

    static copyState(givenState){
        var copy = [];
        for(var i = 0; i < givenState.length; i++){
            copy[i] = [[3],[3],[3]]; 
        }
        
       
        for(var i = 0; i < givenState.length; i++){
            for(var j = 0; j < dimensions; j++){
              for(var k = 0; k < dimensions; k++){
                  copy[i][j][k] = givenState[i][j][k];
              }
            }
        }
        return copy;
    }

    static copyFace(face){
        var copy = [[],[],[]];
        for(var i = 0; i < dimensions; i++){
            for(var j = 0; j < dimensions; j++){
                copy[i][j] = face[i][j];
           }
        }
        return copy;
    }

    static decodeScramble(scramble){
        var decoded = [];

        for(var i = 0; i < scramble.length; i++){
            if(scramble[i].includes("-")){
                var temp = scramble[i].split("-");
                for(var j = 0; j < temp.length; j++){
                    decoded.push(temp[j])
                }
            }
            else
            {
                decoded.push(scramble[i]);
            }
        }
        return decoded;
    }

    static optimizeSolution(solution){
        var optSolution = [];

        for(var i = 0; i < solution.length; i++){

            if(i >= solution.length - 3){
                optSolution.push(solution[i]);
                continue;
            }
            if(solution[i] == solution[i + 1] && solution[i] == solution[i + 2]){
                optSolution.push(Moves.reverseMove(solution[i]));
                i = i + 2;
                continue;
            }

            if(solution[i] == Moves.reverseMove(solution[i + 1])){
                i++;
                continue;
            }

            optSolution.push(solution[i]);
        }

        return optSolution;
    }

    static stateToString(state){
        var returnString = "";

        for(var i = 0; i < 6; i++){
            for(var j = 0; j < dimensions; j++){
                for(var k = 0; k < dimensions; k++){
                    returnString += state[i][j][k];
                }
            }
        }
        return returnString;
    }

    //not used
    static getAlgLength(alg){
        var len = 1;

        for(var i = 0; i < alg.length; i++){
            if(alg[i] == "-")
                len++;
        }
        return len;
    }

    //not used
    static findShortestSolution(solutions){
        var minLength = -1;
        var bestSol;

        for(var i = 0; i < solutions.length; i++){
            if(minLength == -1 || this.getAlgLength(solutions[i].path) < minLength){
                minLength = this.getAlgLength(solutions[i].path);
                bestSol = solutions[i];
            }              
        }
        return bestSol;
    }

    static importCorrectwhiteCrossMap(){
        var string = this.readJsonFile("data/solutions.json");

        var obj = JSON.parse(global);

        return new Map(Object.entries(obj));

    }

    static readJsonFile(file)
    {
        var allText
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    allText = rawFile.responseText;
                    global = allText;
                }
            }
        }
        rawFile.send(null);
    }
}
    