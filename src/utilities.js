var global;
var textures;
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
            if(scramble[i].length == 0)
                continue;

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

    static async importCorrectwhiteCrossMap(correctCrossMap){

        const response = await fetch('./data/solutionsWhiteCross.json')
        const data = await response.json()
        const map = new Map(Object.entries(data))
        return map
    }


    static laodTextures(tpID){

        var path = "";
        switch(tpID){
            case 0:
                path += "./textures/used";
                break;

            case 1:
                path += "./textures/veryused";
                break;

            case 2:
                path += "./textures/scratched";
                break;

            case 3:
                path += "./textures/dots";
                break;

            case 4:
                path += "./textures/basic";
                break;
        }
           
            


        if(!texturesChanged)
            return;

        textures = [];
        textures.push(new THREE.TextureLoader().load(path + '/white.png'));
        textures.push(new THREE.TextureLoader().load(path + '/yellow.png'));
        textures.push(new THREE.TextureLoader().load(path + '/green.png'));
        textures.push(new THREE.TextureLoader().load(path + '/blue.png'));
        textures.push(new THREE.TextureLoader().load(path + '/red.png'));
        textures.push(new THREE.TextureLoader().load(path + '/orange.png'));
        textures.push(new THREE.TextureLoader().load(path + '/black.png'));
        
        texturesChanged = false;
        //texture.anisotropy = renderer.getMaxAnisotropy();
    }

    static stringToTexture(c){
        if(texturesChanged)
            Utilities.laodTextures(texturePackID);

        switch(c){
            case "W":
                return textures[0];

            case "Y":
                return textures[1];

            case "G":
                return textures[2];

            case "B":
                return textures[3];

            case "R":
                return textures[4];

            case "O":
                return textures[5];
            
            default:
                return textures[6];            
        }
    }
    static scrambleToString(scramb){
        var retString = "";
        for(var i = 0; i < scramb.length; i++){
            if(i != 0)
                retString += " ";

            switch(scramb[i]){
                case "u":
                    retString += "U";
                    break

                case "uPrim":
                    retString += "U'";
                    break
                
                case "d":
                    retString += "D";
                    break

                case "dPrim":
                     retString += "D'";
                    break

                case "f":
                    retString += "F";
                    break

                case "fPrim":
                    retString += "F'";
                    break

                case "b":
                    retString += "B";
                    break

                case "bPrim":
                    retString += "B'";
                    break

                case "r":
                    retString += "R";
                    break
                 
                case "rPrim":
                    retString += "R'";
                    break
                    
                case "l":
                    retString += "L";
                    break

                case "lPrim":
                    retString += "L'";
                    break
            }
        }

        return retString;
    }
}
    