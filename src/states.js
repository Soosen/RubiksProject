class States{

    static isWhiteCross(s){
        return (s[1][0][1] == "W" && s[1][1][0] == "W" && s[1][2][1] == "W" && s[1][1][2] == "W");
    }

    static isCorrectWhiteCross(s){
        return (s[0][0][1] == "W" && s[0][1][0] == "W" && s[0][2][1] == "W" && s[0][1][2] == "W" && s[4][1][2] == "R" && s[3][1][2] == "B" && s[2][1][2] == "G" && s[5][1][2] == "O");
    }

    static isRedGreen(state){
        
        return (state[2][2][1] == "G" && state[4][2][1] == "R");
    }

    static isRedBlue(state){
        
        return (state[3][2][1] == "B" && state[4][0][1] == "R");
    }

    static isOrangeGreen(state){
        
        return (state[2][0][1] == "G" && state[5][2][1] == "O");
    }

    static isOrangeBlue(state){
        
        return (state[3][0][1] == "B" && state[5][0][1] == "O");
    }

    static isSecondLayer(state){
        return Utilities.copmareStates(state, this.secondLayerSolvedState()[0]);
    }

    static isYellowSideOriented(state){
        for(var i = 0; i < dimensions; i++){
            for(var j = 0; j < dimensions; j++){
                if(state[1][i][j] != "Y")
                    return false;
            } 
        }
        return true;
    }

    static isSolved(state){
        var compare = this.resetState();
        for(var i = 0; i < dimensions; i++){
            for(var j = 0; j < dimensions; j++){
                for(var k = 0; k < dimensions; k++){
                    if(compare[i][j][k] != state[i][j][k])
                    return false;
                }
            } 
        }
        return true;
    }

    static resetState(){
        var faces = [];

        faces[0] = [["W", "W", "W"],
                    ["W", "W", "W"],
                    ["W", "W", "W"]];

        faces[1] = [["Y", "Y", "Y"],
                    ["Y", "Y", "Y"],
                    ["Y", "Y", "Y"]];

        faces[2] = [["G", "G", "G"],
                    ["G", "G", "G"],
                    ["G", "G", "G"]];

        faces[3] = [["B", "B", "B"],
                    ["B", "B", "B"],
                    ["B", "B", "B"]];

        faces[4] = [["R", "R", "R"],
                    ["R", "R", "R"],
                    ["R", "R", "R"]];

        faces[5] = [["O", "O", "O"],
                    ["O", "O", "O"],
                    ["O", "O", "O"]];
        
        return faces;

    }

    static emptyState(){
        var faces = [];

        faces[0] = [["X", "X", "X"],
                    ["X", "W", "X"],
                    ["X", "X", "X"]];

        faces[1] = [["X", "X", "X"],
                    ["X", "Y", "X"],
                    ["X", "X", "X"]];

        faces[2] = [["X", "X", "X"],
                    ["X", "G", "X"],
                    ["X", "X", "X"]];

        faces[3] = [["X", "X", "X"],
                    ["X", "B", "X"],
                    ["X", "X", "X"]];

        faces[4] = [["X", "X", "X"],
                    ["X", "R", "X"],
                    ["X", "X", "X"]];

        faces[5] = [["X", "X", "X"],
                    ["X", "O", "X"],
                    ["X", "X", "X"]];
        
        return faces;
    }
    static allWhiteEgdesCords(){
        var allEdges = [];

        for(var i = 0; i < 6; i++){
            allEdges.push([i,0,1]);
            allEdges.push([i,1,0]);
            allEdges.push([i,1,2]);
            allEdges.push([i,2,1]);
        }

        return allEdges;
    }

    static onlyWhiteEdgesState(state){
        var allEdges = this.allWhiteEgdesCords();
        var whitesCords = [];

        for(var i = 0; i < allEdges.length; i++)
        {
            if(state[allEdges[i][0]][allEdges[i][1]][allEdges[i][2]] == "W"){
                whitesCords.push([allEdges[i][0],allEdges[i][1],allEdges[i][2]]);
            }
        }

        var retState = this.emptyState();
        for(var  i = 0; i < whitesCords.length; i++){
            retState[whitesCords[i][0]][whitesCords[i][1]][whitesCords[i][2]] = "W";
            var neighCords = this.getNeighbourSide(whitesCords[i]);
            retState[neighCords[0]][neighCords[1]][neighCords[2]] = state[neighCords[0]][neighCords[1]][neighCords[2]];
        }

        return retState;
    }

    static getNeighbourSide(edge){
        //white
        if(edge[0] == 0 && edge[1] == 0 && edge[2] == 1){
            return [3,1,2];
        }

        if(edge[0] == 0 && edge[1] == 1 && edge[2] == 2){
            return [4,1,2];
        }

        if(edge[0] == 0 && edge[1] == 2 && edge[2] == 1){
            return [2,1,2];
        }

        if(edge[0] == 0 && edge[1] == 1 && edge[2] == 0){
            return [5,1,2];
        }

        //yellow
        if(edge[0] == 1 && edge[1] == 0 && edge[2] == 1){
            return [3,1,0];
        }

        if(edge[0] == 1 && edge[1] == 1 && edge[2] == 2){
            return [4,1,0];
        }

        if(edge[0] == 1 && edge[1] == 2 && edge[2] == 1){
            return [2,1,0];
        }

        if(edge[0] == 1 && edge[1] == 1 && edge[2] == 0){
            return [5,1,0];
        }

        //green
        if(edge[0] == 2 && edge[1] == 0 && edge[2] == 1){
            return [5,2,1];
        }

        if(edge[0] == 2 && edge[1] == 1 && edge[2] == 2){
            return [0,2,1];
        }

        if(edge[0] == 2 && edge[1] == 2 && edge[2] == 1){
            return [4,2,1];
        }

        if(edge[0] == 2 && edge[1] == 1 && edge[2] == 0){
            return [1,2,1];
        }

        //blue
        if(edge[0] == 3 && edge[1] == 0 && edge[2] == 1){
            return [5,0,1];
        }

        if(edge[0] == 3 && edge[1] == 1 && edge[2] == 2){
            return [0,0,1];
        }

        if(edge[0] == 3 && edge[1] == 2 && edge[2] == 1){
            return [4,0,1];
        }

        if(edge[0] == 3 && edge[1] == 1 && edge[2] == 0){
            return [1,0,1];
        }

        //red
        if(edge[0] == 4 && edge[1] == 0 && edge[2] == 1){
            return [3,2,1];
        }

        if(edge[0] == 4 && edge[1] == 1 && edge[2] == 2){
            return [0,1,2];
        }

        if(edge[0] == 4 && edge[1] == 2 && edge[2] == 1){
            return [2,2,1];
        }

        if(edge[0] == 4 && edge[1] == 1 && edge[2] == 0){
            return [1,1,2];
        }

        //orange
        if(edge[0] == 5 && edge[1] == 0 && edge[2] == 1){
            return [3,0,1];
        }

        if(edge[0] == 5 && edge[1] == 1 && edge[2] == 2){
            return [0,1,0];
        }

        if(edge[0] == 5 && edge[1] == 2 && edge[2] == 1){
            return [2,0,1];
        }

        if(edge[0] == 5 && edge[1] == 1 && edge[2] == 0){
            return [1,1,0];
        }
    }

    static preMadeState(){
        var faces = [];

        faces[0] = [["W", "W", "W"],
                    ["W", "W", "W"],
                    ["W", "W", "W"]];

        faces[1] = [["Y", "Y", "Y"],
                    ["Y", "Y", "W"],
                    ["R", "R", "W"]];

        faces[2] = [["B", "G", "Y"],
                    ["B", "G", "O"],
                    ["O", "R", "O"]];

        faces[3] = [["B", "O", "G"],
                    ["G", "B", "O"],
                    ["G", "B", "Y"]];

        faces[4] = [["O", "W", "G"],
                    ["G", "R", "B"],
                    ["B", "G", "G"]];

        faces[5] = [["O", "B", "R"],
                    ["R", "O", "R"],
                    ["W", "O", "R"]];
        
        return faces;
    }

    static correctWhiteCrossStatesFour(){

        var validStates = [];

        var fullCross = this.emptyState();

        fullCross[0][0][1] = "W";
        fullCross[0][2][1] = "W";
        fullCross[0][1][0] = "W";
        fullCross[0][1][2] = "W";

        fullCross[4][1][2] = "R";
        fullCross[3][1][2] = "B";
        fullCross[2][1][2] = "G";
        fullCross[5][1][2] = "O";

        validStates.push(fullCross);

        return validStates;
    }

    static correctWhiteCrossStatesThree(){

        var validStates = [];

        var fullCross = this.correctWhiteCrossStatesFour()[0];

        validStates.push(fullCross);

        var threeOne = this.emptyState();

        threeOne[0][2][1] = "W";
        threeOne[0][1][0] = "W";
        threeOne[0][1][2] = "W";

        threeOne[4][1][2] = "R";
        threeOne[2][1][2] = "G";
        threeOne[5][1][2] = "O";

        validStates.push(threeOne);

        var threeTwo = this.emptyState();

        threeTwo[0][0][1] = "W";
        threeTwo[0][1][0] = "W";
        threeTwo[0][1][2] = "W";

        threeTwo[4][1][2] = "R";
        threeTwo[3][1][2] = "B";
        threeTwo[5][1][2] = "O";

        validStates.push(threeTwo);

        var threeThree = this.emptyState();

        threeThree[0][0][1] = "W";
        threeThree[0][2][1] = "W";
        threeThree[0][1][2] = "W";

        threeThree[4][1][2] = "R";
        threeThree[3][1][2] = "B";
        threeThree[2][1][2] = "G";

        validStates.push(threeThree);

        var threeFour = this.emptyState();

        threeFour[0][0][1] = "W";
        threeFour[0][2][1] = "W";
        threeFour[0][1][0] = "W";

        threeFour[3][1][2] = "B";
        threeFour[2][1][2] = "G";
        threeFour[5][1][2] = "O";

        validStates.push(threeFour);

        return validStates;
    }

    static correctWhiteCrossStatesTwo(){

        var validStates = [];

        var more = this.correctWhiteCrossStatesThree();
        
        for(var i = 0; i < more.length; i++){
            validStates.push(more[i]);
        }

        var halfCrossMinusOne = this.emptyState();

        halfCrossMinusOne[0][0][1] = "W";
        halfCrossMinusOne[0][2][1] = "W";

        halfCrossMinusOne[3][1][2] = "B";
        halfCrossMinusOne[2][1][2] = "G";

        validStates.push(halfCrossMinusOne);

        var halfCrossMinusTwo = this.emptyState();

        halfCrossMinusTwo[0][1][0] = "W";
        halfCrossMinusTwo[0][1][2] = "W";

        halfCrossMinusTwo[4][1][2] = "R";
        halfCrossMinusTwo[5][1][2] = "O";

        validStates.push(halfCrossMinusTwo);

        var halfCrossLOne = this.emptyState();

        halfCrossLOne[0][0][1] = "W";
        halfCrossLOne[0][1][2] = "W";

        halfCrossLOne[4][1][2] = "R";
        halfCrossLOne[3][1][2] = "B";

        validStates.push(halfCrossLOne);

        var halfCrossLTwo = this.emptyState();

        halfCrossLTwo[0][2][1] = "W";
        halfCrossLTwo[0][1][2] = "W";

        halfCrossLTwo[4][1][2] = "R";
        halfCrossLTwo[2][1][2] = "G";

        validStates.push(halfCrossLTwo);

        var halfCrossLThree = this.emptyState();

        halfCrossLThree[0][2][1] = "W";
        halfCrossLThree[0][1][0] = "W";

        halfCrossLThree[5][1][2] = "O";
        halfCrossLThree[2][1][2] = "G";

        validStates.push(halfCrossLThree);

        var halfCrossLFour = this.emptyState();

        halfCrossLFour[0][0][1] = "W";
        halfCrossLFour[0][1][0] = "W";

        halfCrossLFour[5][1][2] = "O";
        halfCrossLFour[3][1][2] = "B";

        validStates.push(halfCrossLFour);

        return validStates;
    }

    static correctWhiteCrossStatesOne(){

        var validStates = [];

        var more = this.correctWhiteCrossStatesTwo();
        
        for(var i = 0; i < more.length; i++){
            validStates.push(more[i]);
        }

        var redWhite = this.emptyState();

        redWhite[0][1][2] = "W";

        redWhite[4][1][2] = "R";

        validStates.push(redWhite);


        var blueWhite = this.emptyState();

        blueWhite[0][0][1] = "W";

        blueWhite[3][1][2] = "B";

        validStates.push(blueWhite);


        var orangeWhite = this.emptyState();

       
        orangeWhite[0][1][0] = "W";

        orangeWhite[5][1][2] = "O";

        validStates.push(orangeWhite);


        var greenWhite = this.emptyState();

        greenWhite[0][2][1] = "W";

        greenWhite[2][1][2] = "G";

        validStates.push(greenWhite);


        return validStates;
    }

    static secondLayerBlueRed(){
        var retStates = [];

        var state = this.correctWhiteCrossStatesFour()[0];

        state[0][0][2] = "W";
        state[4][0][2] = "R";
        state[3][2][2] = "B";

        state[4][0][1] = "R";
        state[3][2][1] = "B";

        retStates.push(state);

        return retStates;
    }

    static secondLayerGreenRed(){
        var retStates = [];

        var state = this.correctWhiteCrossStatesFour()[0];

        state[0][2][2] = "W";
        state[4][2][2] = "R";
        state[2][2][2] = "G";

        state[4][2][1] = "R";
        state[2][2][1] = "G";

        retStates.push(state);

        return retStates;
    }

    static secondLayerGreenOrange(){
        var retStates = [];

        var state = this.correctWhiteCrossStatesFour()[0];

        state[0][2][0] = "W";
        state[5][2][2] = "O";
        state[2][0][2] = "G";

        state[5][2][1] = "O";
        state[2][0][1] = "G";

        retStates.push(state);

        return retStates;
    }

    static secondLayerBlueOrange(){
        var retStates = [];

        var state = this.correctWhiteCrossStatesFour()[0];

        state[0][0][0] = "W";
        state[5][0][2] = "O";
        state[3][0][2] = "B";

        state[5][0][1] = "O";
        state[3][0][1] = "B";

        retStates.push(state);

        return retStates;
    }

    static secondLayerSolvedState(){
        var retStates = [];

        var state = this.resetState();

        for(var i = 0; i < dimensions; i++){
            for(var j = 0; j < dimensions; j++){
                state[1][i][j] = "X";
            }
        }

        state[3][0][0] = "X";
        state[3][1][0] = "X";
        state[3][2][0] = "X";

        state[5][0][0] = "X";
        state[5][1][0] = "X";
        state[5][2][0] = "X";

        state[2][0][0] = "X";
        state[2][1][0] = "X";
        state[2][2][0] = "X";

        state[4][0][0] = "X";
        state[4][1][0] = "X";
        state[4][2][0] = "X";

        retStates.push(state);

        return retStates;
    }

    static validStatesOll(){
        var validStates = [];

        var fullYellowSide = this.emptyState();
        
        fullYellowSide[1][0][0] = "Y";
        fullYellowSide[1][0][1] = "Y";
        fullYellowSide[1][0][2] = "Y";
        fullYellowSide[1][1][0] = "Y";
        fullYellowSide[1][1][1] = "Y";
        fullYellowSide[1][1][2] = "Y";
        fullYellowSide[1][2][0] = "Y";
        fullYellowSide[1][2][1] = "Y";
        fullYellowSide[1][2][2] = "Y";

        validStates.push(fullYellowSide);

        return validStates;
    }

    static validStatesPlls(){
        var validStates = [];

        var pllsState0 = this.resetState();

        validStates.push(pllsState0);

        var pllsState90 = this.resetState();

        //redSide
        pllsState90[4][0][0] = pllsState0[2][1][1]
        pllsState90[4][1][0] = pllsState0[2][1][1]
        pllsState90[4][2][0] = pllsState0[2][1][1]

        //blueSide
        pllsState90[3][0][0] = pllsState0[4][1][1]
        pllsState90[3][1][0] = pllsState0[4][1][1]
        pllsState90[3][2][0] = pllsState0[4][1][1]

        //orangeSide
        pllsState90[5][0][0] = pllsState0[3][1][1]
        pllsState90[5][1][0] = pllsState0[3][1][1]
        pllsState90[5][2][0] = pllsState0[3][1][1]

        //greenSide
        pllsState90[2][0][0] = pllsState0[5][1][1]
        pllsState90[2][1][0] = pllsState0[5][1][1]
        pllsState90[2][2][0] = pllsState0[5][1][1]

        validStates.push(pllsState90);

        var pllsState180 = this.resetState();

        //redSide
        pllsState180[4][0][0] = pllsState0[5][1][1]
        pllsState180[4][1][0] = pllsState0[5][1][1]
        pllsState180[4][2][0] = pllsState0[5][1][1]

        //blueSide
        pllsState180[3][0][0] = pllsState0[2][1][1]
        pllsState180[3][1][0] = pllsState0[2][1][1]
        pllsState180[3][2][0] = pllsState0[2][1][1]

        //orangeSide
        pllsState180[5][0][0] = pllsState0[4][1][1]
        pllsState180[5][1][0] = pllsState0[4][1][1]
        pllsState180[5][2][0] = pllsState0[4][1][1]

        //greenSide
        pllsState180[2][0][0] = pllsState0[3][1][1]
        pllsState180[2][1][0] = pllsState0[3][1][1]
        pllsState180[2][2][0] = pllsState0[3][1][1]

        validStates.push(pllsState180);

        var pllsState270 = this.resetState();

        //redSide
        pllsState270[4][0][0] = pllsState0[3][1][1]
        pllsState270[4][1][0] = pllsState0[3][1][1]
        pllsState270[4][2][0] = pllsState0[3][1][1]

        //blueSide
        pllsState270[3][0][0] = pllsState0[5][1][1]
        pllsState270[3][1][0] = pllsState0[5][1][1]
        pllsState270[3][2][0] = pllsState0[5][1][1]

        //orangeSide
        pllsState270[5][0][0] = pllsState0[2][1][1]
        pllsState270[5][1][0] = pllsState0[2][1][1]
        pllsState270[5][2][0] = pllsState0[2][1][1]

        //greenSide
        pllsState270[2][0][0] = pllsState0[4][1][1]
        pllsState270[2][1][0] = pllsState0[4][1][1]
        pllsState270[2][2][0] = pllsState0[4][1][1]

        validStates.push(pllsState270);
        

        return validStates;
    }

    static countWhites(state){
        var counter = 0;
        if(state[1][0][1] == "W")
            counter++;

        if(state[1][2][1] == "W")
        counter++;

        if(state[1][1][0] == "W")
        counter++;

        if(state[1][1][2] == "W")
        counter++;

        return counter;
    }
}