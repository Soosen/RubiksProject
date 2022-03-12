//buttons
var buttonScramble = document.getElementById("buttonScramble");
var buttonSolve = document.getElementById("buttonSolve");
var buttonReset = document.getElementById("buttonReset");
var buttonMultiSolve = document.getElementById("buttonMultiSolve");
var buttonRetexture = document.getElementById("buttonRetexture");

var buttonU = document.getElementById("u");
var buttonUPrim = document.getElementById("uPrim");

var buttonR = document.getElementById("r");
var buttonRPrim = document.getElementById("rPrim");

var buttonL = document.getElementById("l");
var buttonLPrim = document.getElementById("lPrim");

var buttonF = document.getElementById("f");
var buttonFPrim = document.getElementById("fPrim");

var buttonB = document.getElementById("b");
var buttonBPrim = document.getElementById("bPrim");

var buttonD = document.getElementById("d");
var buttonDPrim = document.getElementById("dPrim");

//Texts
var logHeader = document.getElementById("logHeader");
var scrambleOrSolution = document.getElementById("scrambleOrSolution");
var movesLabel = document.getElementById("moves");
var timeLabel = document.getElementById("time");

var movesCouner = 0;
var resetMoves = false;

//top buttons
buttonScramble.onclick = function(){
    scrambleUI();
}

buttonSolve.onclick = function(){
    solveUI();
}

buttonReset.onclick = function(){
   resetUI();
}

buttonMultiSolve.onclick = function(){
    cube.multiSolve(100);
    resetMoves = true;
}


//moves buttons
buttonU.onclick = async function(){
    uMoveUI();
}

buttonUPrim.onclick = async function(){
    uPrimMoveUI();
}

buttonR.onclick = async function(){
    rMoveUI();
}

buttonRPrim.onclick = async function(){
    rPrimMoveUI();
}

buttonL.onclick = async function(){
    lMoveUI();
}

buttonLPrim.onclick = async function(){
    lPrimMoveUI();
}

buttonF.onclick = async function(){
    fMoveUI();
}

buttonFPrim.onclick = async function(){
    fPrimMoveUI();
}

buttonB.onclick = async function(){
    bMoveUI();
}

buttonBPrim.onclick = async function(){
    bPrimMoveUI();
}

buttonD.onclick = async function(){
    dMoveUI();
}

buttonDPrim.onclick = async function(){
    dPrimMoveUI();
}
buttonRetexture.onclick = async function(){
    retextureUI();
}

async function uMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnY(true, true);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "U ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function uPrimMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnY(true, false);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "U' ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function dMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnY(false, true);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "D ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function dPrimMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnY(false, false);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "D' ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function rMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnX(true, true);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "R ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function rPrimMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnX(true, false);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "R' ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function lMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnX(false, true);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "L ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function lPrimMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnX(false, false);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "L' ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function fMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnZ(true, true);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "F ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function fPrimMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnZ(true, false);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "F' ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function bMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }
    
    await cube.turnZ(false, true);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "B ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function bPrimMoveUI(){
    if(resetMoves){
        scrambleOrSolution.textContent = "";
        resetMoves = false;
    }

    await cube.turnZ(false, false);
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent += "B' ";
    movesCouner++;
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function scrambleUI(){
    var scramb = cube.scramble(20);
    logHeader.textContent = "Scramble";
    movesCouner = 0;
    movesLabel.textContent = "Moves: " + movesCouner;
    scrambleOrSolution.textContent = Utilities.scrambleToString(scramb);
    resetMoves = true;
}

async function solveUI(){
    cube.solve(true);
    logHeader.textContent = "Solution";
    resetMoves = true;
}

async function resetUI(){
    cube.resetCube();
    movesCouner = 0;
    logHeader.textContent = "Moves";
    scrambleOrSolution.textContent = "";
    movesLabel.textContent = "Moves: " + movesCouner;
    timeLabel.textContent = "";
}

async function retextureUI(){
    if(cube.blocked)
    return;

    texturePackID = (texturePackID + 1) % 5;
    texturesChanged = true;
    Utilities.laodTextures(texturePackID);
    cube.updateCube();
}

