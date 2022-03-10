var totalDuration = 0;
var curDuration = 0;
var totalMoves = 0;

class Solver{
    constructor(cube){
        this.cube = cube;
    }

    solveCube(state){

        var startingTime = Date.now();
        var solution = [];

        var currentState = Utilities.copyState(state);

        //white cross
        console.log("1. Building the white cross");
        var onlyWhiteEdgesState = States.onlyWhiteEdgesState(currentState); 

        currentState, solution = this.solveWhiteCross(onlyWhiteEdgesState, currentState);
        
        if(!States.isCorrectWhiteCross(currentState)){
            console.log("Failed while solving the white cross");
            solution = this.translateSoltution(solution);
            console.log("%cSolution = " + solution, "color: red");
            return solution;
        }
        
        //second layer
        console.log("2. Solving first two layers");
        currentState, solution = this.secondLayer(currentState, solution);

        if(!States.isSecondLayer(currentState)){
            console.log("Failed while solving the second layer");
            solution = this.translateSoltution(solution);
            console.log("%cSolution = " + solution, "color: red");
            return solution;
        }
        
        
        //OLL        
        console.log("3. Orienting last layer");
        currentState, solution = this.solveOLL(currentState, solution);      

        if(!States.isYellowSideOriented(currentState)){
            console.log("Failed while orienting last layer");
            solution = this.translateSoltution(solution);
            console.log("%cSolution = " + solution, "color: red");
            return solution;
        }
        
        
        //PLL
        console.log("4.Permuting last layer");
        currentState, solution = this.solvePll(currentState, solution);

        if(States.isSolved(currentState)){
            solution = this.translateSoltution(solution);
            var duration = new Date() - startingTime;
            console.log("Solved!")
            console.log("Solution's length = " + solution.length);
            console.log("Total time = " + duration +" Miliseconds")
            console.log("%cSolution = " + solution, "color: green");
            totalDuration += duration;
            totalMoves += solution.length;
            return solution;
        }
        
        solution = this.translateSoltution(solution);
        return solution;
        
    }

    solveWhiteCross(onlyWhiteEdgesState, state){
    
        var validMoves = Moves.allMovesWithDoubles();

        var solution = Utilities.decodeScramble([this.findCorrectWhiteCross(onlyWhiteEdgesState, correctCrossMap, validMoves, 4)]);

        for(var i = 0; i < solution.length; i++){
            state = Utilities.stringToMove(solution[i], state);
        }
        
        return state, solution;
    }

    findCorrectWhiteCross(startingState, map, validMoves, maxAllowedDepth){

        var allNodes = new Array();

        var visitedNodes =  new Set();

        var root = new Node(startingState, [], 0, validMoves);

        var q = new Queue();

        q.enqueue(root);

        allNodes.push(root);

        var maxDepth = 0;      

        while(q.size() != 0 && maxDepth <= maxAllowedDepth){
            var currentNode = q.dequeue();

            if(currentNode.depth > maxDepth){
                maxDepth = currentNode.depth;
            }

            visitedNodes.add(Utilities.stateToString(currentNode.state));

            if(map.has(Utilities.stateToString(currentNode.state))){

                var solution = "";
                for(var i = 0; i < currentNode.path.length; i++){
                    solution += currentNode.path[i] + "-"
                }

                solution += map.get(Utilities.stateToString(currentNode.state));
                return solution;
            }
            var neighbours = currentNode.expand();
            for(var i = 0; i < neighbours.length; i++){
                if(!visitedNodes.has(Utilities.stateToString(neighbours[i].state))){
                    var tempPath = Utilities.copyArray(currentNode.path);
                    tempPath.push(neighbours[i].lastMove);
                    allNodes.push(new Node(neighbours[i].state, Utilities.copyArray(tempPath), currentNode.depth + 1, validMoves));
                    q.enqueue(allNodes[allNodes.length - 1]);
                }                   
            }
        }

        return "";
    }

    findSolutions(startingState, endStates, validMoves, onlyOne, maxAllowedDepth){

        var allNodes = new Array();

        var visitedNodes =  new Set();

        var root = new Node(startingState, [], 0, validMoves);

        var q = new Queue();

        q.enqueue(root);

        allNodes.push(root);

        var maxDepth = 0;

        var validResults = [];        

        while(q.size() != 0 && maxDepth <= maxAllowedDepth){
            var currentNode = q.dequeue();

            if(currentNode.depth > maxDepth){
                maxDepth = currentNode.depth;
            }

            visitedNodes.add(Utilities.stateToString(currentNode.state));

            if(Utilities.matchesCriteria(currentNode.state, endStates)){
                validResults.push(currentNode);
                if(onlyOne){
                    return validResults;
                }
            }
            if(currentNode.depth < maxAllowedDepth){
                var neighbours = currentNode.expand();
                for(var i = 0; i < neighbours.length; i++){
                    if(!visitedNodes.has(Utilities.stateToString(neighbours[i].state))){
                        var tempPath = Utilities.copyArray(currentNode.path);
                        tempPath.push(neighbours[i].lastMove);
                        allNodes.push(new Node(neighbours[i].state, Utilities.copyArray(tempPath), currentNode.depth + 1, validMoves));
                        q.enqueue(allNodes[allNodes.length - 1]);
                    }                   
                }
            }
            
        }

        return validResults;
    }

    secondLayer(state, solution){

        while(!States.isSecondLayer(state)){
            state, solution = this.secondLayerPair(state, solution, States.secondLayerGreenOrange(), Moves.f2lMoves());
            state, solution = this.secondLayerPair(state, solution, States.secondLayerBlueOrange(), Moves.f2lMoves90());
            state, solution = this.secondLayerPair(state, solution, States.secondLayerBlueRed(), Moves.f2lMoves180());
            state, solution = this.secondLayerPair(state, solution, States.secondLayerGreenRed(), Moves.f2lMoves270());

            if(!Utilities.copmareStates(state, States.secondLayerGreenOrange()[0])){
                solution.push("l-d-lPrim");
                state = Utilities.stringToMove("l-d-lPrim", state);
            }
            if(!Utilities.copmareStates(state, States.secondLayerBlueOrange()[0])){
                solution.push("b-d-bPrim");
                state = Utilities.stringToMove("b-d-bPrim", state);
            }
            if(!Utilities.copmareStates(state, States.secondLayerBlueRed()[0])){
                solution.push("r-d-rPrim");
                state = Utilities.stringToMove("r-d-rPrim", state);
            }
            if(!Utilities.copmareStates(state, States.secondLayerGreenRed()[0])){
                solution.push("f-d-fPrim");
                state = Utilities.stringToMove("f-d-fPrim", state);
            }
        }
        

        return state, solution;
    }

    secondLayerPair(state, solution, validStates, validMoves){

        var results = [];
        var counter = 0;
        while(results.length == 0 && counter < 4){
            results = this.findSolutions(state, validStates, validMoves, true, 1);

            if(results.length != 0)
                break;

            solution.push("d");
            state = Utilities.stringToMove("d", state);
            counter++;
        }
        if(counter == 4){
            for(var i = 0; i < 4; i++){
                solution.pop();
                state = Utilities.stringToMove("dPrim", state);
            }

        }
       
        if(results.length != 0){
            var path = Utilities.decodeScramble(results[0].path);
            
            
            for(var i = 0; i < path.length; i++){
                solution.push(path[i]);
                state = Utilities.stringToMove(path[i], state);
            }
        }       
        return state, solution;
    }

    solveOLL(state, solution){

        var validMoves = Moves.ollMoves();
        var validStates = States.validStatesOll();

        var results = [];
        var counter = 0;
        while(results.length == 0 && counter < 4){
            results = this.findSolutions(state, validStates, validMoves, true, 1);
            if(results.length == 0){
                solution.push("d");
                state = Utilities.stringToMove("d", state);
            }
            counter++;
        }

        if(results[0] == undefined)
            return state, solution;
        
        
        for(var i = 0; i < results[0].path.length; i++){
            solution.push(results[0].path[i]);
            state = Utilities.stringToMove(results[0].path[i], state);
        }

        return state, solution;

    }
    
    solvePll(state, solution){

        var validMoves = Moves.pllMoves();
        var validStates = States.validStatesPlls();

        var results = [];
        while(results.length == 0){
            results = this.findSolutions(state, validStates, validMoves, true, 1);
            if(results.length == 0){
                solution.push("d");
                state = Utilities.stringToMove("d", state);
            }
        }

        var final = this.findSolutions(results[0].state, [States.resetState()], ["d","dPrim","d-d"], true, 1);


        if(results[0] == undefined){
            console.log("failed while permuting corners")
            return state, solution;
        }
        
        if(final[0].path.length != 0){
            results[0].state = final.state;
            results[0].path = results[0].path.concat(final[0].path);
        }      

        for(var i = 0; i < results[0].path.length; i++){
            solution.push(results[0].path[i]);
            state = Utilities.stringToMove(results[0].path[i], state);
        }

        return state, solution;
    }

    translateSoltution(solution){
        //decode algorithms in the solution to single moves
        solution = Utilities.decodeScramble(solution);

        //optimize the solution 
        solution = Utilities.optimizeSolution(solution);

        return solution;
    }
}