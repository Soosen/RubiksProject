//colors
const red =  new THREE.Color( 0xFF0000 );
const orange = new THREE.Color( 0xFFA500 );
const blue = new THREE.Color( 0x0000FF );
const green = new THREE.Color( 0x008000 );
const white = new THREE.Color( 0xFFFFFF );
const yellow = new THREE.Color( 0xFFFF00 );
const black = new THREE.Color( 0x000000 );

const blackTexture = Utilities.stringToTexture("X");

const dimensions = 3;

//0.48 max speed
const speed = 0.2;

const turningSpeed = 10;
const timesToSpin = 3.14/2/speed;
const fullSpinDuration = Math.ceil(turningSpeed*timesToSpin)*2;


class Cube {
    constructor(x, y, z, cs) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.solver = new Solver();
      this.cubieSize = cs;
      this.midX = this.x + 0.1 + 1.5*this.cubieSize;
      this.midY = this.y + 0.1 + 1.5*this.cubieSize;
      this.midZ = this.z + 0.1 + 1.5*this.cubieSize;
      this.radius = this.midX - this.x;
      this.state = States.resetState();
      this.cubies = this.createCube();
      this.paintCube();
      this.blocked = false;  
    }

    //create empty 3x3x3 array
    createCube(){
        var cubies = new Array(3);
        for(var i = 0; i < dimensions; i++){
          cubies[i] = new Array(3);
          for(var j = 0; j < dimensions; j++){
            cubies[i][j] = new Array(3);
          }
        }
        return cubies;
    }

    //create all cubies objects and select accurate colors
    paintCube() {    
        for(var i = 0; i < dimensions; i++){
          for(var j = 0; j < dimensions; j++){
            for(var k = 0; k < dimensions; k++){
                var up = blackTexture;
                var down = blackTexture;
                var front = blackTexture;
                var back = blackTexture;
                var right = blackTexture;
                var left = blackTexture;
                if(j == 0){
                    down = Utilities.stringToTexture(this.state[1][k][i]);
                }
                if(j == dimensions - 1){
                    up = Utilities.stringToTexture(this.state[0][k][i]);
                }

                if(i == 0){
                    left = Utilities.stringToTexture(this.state[5][k][j]);
                }
                if(i == dimensions - 1){
                    right = Utilities.stringToTexture(this.state[4][k][j]);
                }

                if(k == 0){
                    back = Utilities.stringToTexture(this.state[3][i][j]);
                }
                if(k == dimensions - 1){
                    front = Utilities.stringToTexture(this.state[2][i][j]);
                }
                this.cubies[i][j][k] = new Cubie(this.x+i+i*0.1-this.cubieSize, this.y+j+j*0.1-this.cubieSize, this.z+k+k*0.1-this.cubieSize , this.cubieSize, up, down, front, back, right, left);
                this.cubies[i][j][k].draw();
            }
          }
        }
    }

    
    updateCube(){
        this.clearCube();
        this.paintCube();
    }

    clearCube(){
        for(var i = 0; i < dimensions; i++){
            for(var j = 0; j < dimensions; j++){
              for(var k = 0; k < dimensions; k++){
                  scene.remove(this.cubies[i][j][k].cubie);
              }
            }
        }
    }    

    resetCube(){
        this.state = States.resetState();
        this.updateCube();
    }

    scramble(length){
        //generate random sequence, dont make counter moves
        var scramb = [];
        for(var i = 0; i < length; i++){
            var r = Math.floor(Math.random() * 12);
            if(i > 0 && Moves.allMoves()[r] == Moves.reverseMove(scramb[i-1])){
                i--;
            }
            else{
                scramb[i] = Moves.allMoves()[r];
            }            
        }

        for(var i = 0; i < scramb.length; i++){
            this.state = Utilities.stringToMove(scramb[i], this.state);
        }

        this.updateCube();
        return scramb;
    }

    solve(animated){

        var currentState = Utilities.copyState(this.state);
        var solution = this.solver.solveCube(currentState)
        this.applyScramble(solution, animated);
        scrambleOrSolution.textContent = Utilities.scrambleToString(solution);

        return Utilities.copmareStates(this.state, States.resetState());

    }

    async multiSolve(amount){
        totalDuration = 0;
        totalMoves = 0;
        for(var i = 0; i < amount; i++){
            console.log("Solve: " + (i + 1) + "/" + amount)
            logHeader.textContent = "Solve: " + (i + 1) + "/" + amount;
            this.scramble(30);
            await new Promise(r => setTimeout(r, 1))
            if(!this.solve(false))
            break;
          }

          console.log("Average Moves = " + Math.floor(totalMoves/amount) + " Moves");
          movesLabel.textContent = "Average Moves: " + Math.floor(totalMoves/amount) + "\n";

          console.log("Average Time = " + Math.floor(totalDuration/amount) + " Miliseconds");
          timeLabel.textContent = "Average Time: " + Math.floor(totalDuration/amount) + " ms";  
    }

    applyScramble(scramb, animated){

        scramb = this.solver.translateSoltution(scramb);

        if(animated){
            this.animateScramble(scramb);
            return;
        }

        for(var i = 0; i < scramb.length; i++){
            this.state = Utilities.stringToMove(scramb[i],  this.state);
        }

        this.updateCube();
    }

    async animateScramble(scramble){
        var counter = 0;
        var interval = window.setInterval(()=>{
            if(counter >= scramble.length - 1){
                clearInterval(interval) 
            }
            var string = scramble[counter];
            switch(string){
                case "u":
                    this.turnY(true, true);
                    break;
                case "uPrim":
                    this.turnY(true, false);
                    break;
                case "d":
                    this.turnY(false, true);
                    break;
                case "dPrim":
                    this.turnY(false, false);
                    break;
                case "f":
                    this.turnZ(true, true);
                    break;
                case "fPrim":
                    this.turnZ(true, false);
                    break;
                case "b":
                    this.turnZ(false, true);
                    break;
                case "bPrim":
                    this.turnZ(false, false);
                    break;
                case "r":
                    this.turnX(true, true);
                    break;
                case "rPrim":
                    this.turnX(true, false);
                    break;
                case "l":
                    this.turnX(false, true);
                    break;
                case "lPrim":
                    this.turnX(false, false);
                    break;
                    
            }
            counter++;
        }, fullSpinDuration);            
    }          

    //f, b
    turnZSingleCube(i,j,k, clock){
        this.cubies[i][j][k].radian = speed;
        var curX = this.cubies[i][j][k].x;
        var curY = this.cubies[i][j][k].y;
        var curZ = this.cubies[i][j][k].z;

        if(!clock){
            var newX = curX *  Math.cos(this.cubies[i][j][k].radian) - curY*Math.sin(this.cubies[i][j][k].radian) + Math.PI/2/200;
            var newY = curX *  Math.sin(this.cubies[i][j][k].radian) + curY*Math.cos(this.cubies[i][j][k].radian) - Math.PI/2/200;
    
    
            curX = newX;
            curY = newY;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotateAroundWorldAxis(new THREE.Vector3(0,0,1), speed);
        }
        else
        {
            var newX = curX *  Math.cos(-this.cubies[i][j][k].radian) - curY*Math.sin(-this.cubies[i][j][k].radian) - Math.PI/2/200;
            var newY = curX *  Math.sin(-this.cubies[i][j][k].radian) + curY*Math.cos(-this.cubies[i][j][k].radian) + Math.PI/2/200;
    
    
            curX = newX;
            curY = newY;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotateAroundWorldAxis(new THREE.Vector3(0,0,-1), speed);
        }
       
       
    }

    async turnZ(front, clock){
        if(this.blocked)
            return;

        this.blocked = true;
        var timer = 0;

        if(front){
            var layer = 2;
        }
        else
        {
            var layer = 0;
            clock = !clock;
        }

        while(true){
            timer++;
            for(var i = 0; i < dimensions; i++){
                for(var j = 0; j < dimensions; j++){
                    this.turnZSingleCube(i, j, layer, clock);
                }
            }
            if(timer >= timesToSpin){
                this.blocked = false;
    
                if(front && clock){
                    this.state = Moves.fMove(this.state);
                    Moves.fMoveCube(this);
                    this.adjustCubies();
                }else if(front && !clock){
                    this.state = Moves.fPrimMove(this.state);
                    Moves.fPrimMoveCube(this);
                    this.adjustCubies();
                }else if(!front && !clock){
                    this.state = Moves.bMove(this.state);
                    Moves.bMoveCube(this);
                    this.adjustCubies();
                }else if(!front && clock){
                    this.state = Moves.bPrimMove(this.state);
                    Moves.bPrimMoveCube(this);
                    this.adjustCubies();
                } 
                return Promise.resolve(true);
            }
            await new Promise(resolve => setTimeout(resolve, turningSpeed));
        }        
    }

    turnYSingleCube(i,j,k, clock){
        this.cubies[i][j][k].radian = speed;
        var curX = this.cubies[i][j][k].x;
        var curY = this.cubies[i][j][k].y;
        var curZ = this.cubies[i][j][k].z;

        if(clock){
            var newX = curX *  Math.cos(this.cubies[i][j][k].radian) - curZ*Math.sin(this.cubies[i][j][k].radian) + Math.PI/2/200;
            var newZ = curX *  Math.sin(this.cubies[i][j][k].radian) + curZ*Math.cos(this.cubies[i][j][k].radian) - Math.PI/2/200;
    
    
            curX = newX;
            curZ = newZ;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotateAroundWorldAxis(new THREE.Vector3(0,-1,0), speed);
        }
        else
        {
            var newX = curX *  Math.cos(-this.cubies[i][j][k].radian) - curZ*Math.sin(-this.cubies[i][j][k].radian) - Math.PI/2/200;
            var newZ = curX *  Math.sin(-this.cubies[i][j][k].radian) + curZ*Math.cos(-this.cubies[i][j][k].radian) + Math.PI/2/200;
    
    
            curX = newX;
            curZ = newZ;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotateAroundWorldAxis(new THREE.Vector3(0,1,0), speed);
        }       
       
    }

    async turnY(up, clock){
        if(this.blocked)
            return;

        this.blocked = true;
        var timer = 0;

        if(up){
            var layer = 2;

        }
        else
        {
            var layer = 0;
            clock = !clock;
        }
    
        while(true){
            timer++;

            for(var i = 0; i < dimensions; i++){
                for(var j = 0; j < dimensions; j++){
                    this.turnYSingleCube(i, layer, j, clock);
                }
            }

            if(timer >= timesToSpin){
                this.blocked = false;
 
                if(up && clock){
                    this.state = Moves.uMove(this.state);
                    Moves.uMoveCube(this);
                    this.adjustCubies();
                }else if (up && !clock){
                    this.state = Moves.uPrimMove(this.state);
                    Moves.uPrimMoveCube(this);
                    this.adjustCubies();
                }else if(!up && !clock){
                    this.state = Moves.dMove(this.state);
                    Moves.dMoveCube(this);
                    this.adjustCubies();
                }else if(!up && clock){
                    this.state = Moves.dPrimMove(this.state);
                    Moves.dPrimMoveCube(this);
                    this.adjustCubies();
                }
                return Promise.resolve(true);
            }
            await new Promise(resolve => setTimeout(resolve, turningSpeed));
        }       
    }

    turnXSingleCube(i,j,k, clock){
        this.cubies[i][j][k].radian = speed;
        var curX = this.cubies[i][j][k].x;
        var curY = this.cubies[i][j][k].y;
        var curZ = this.cubies[i][j][k].z;

        if(clock){
            var newY = curY *  Math.cos(this.cubies[i][j][k].radian) - curZ*Math.sin(this.cubies[i][j][k].radian) + Math.PI/2/200;
            var newZ = curY *  Math.sin(this.cubies[i][j][k].radian) + curZ*Math.cos(this.cubies[i][j][k].radian) - Math.PI/2/200;
    
    
            curY = newY;
            curZ = newZ;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotateAroundWorldAxis(new THREE.Vector3(1,0,0), speed);
        }
        else
        {
            var newY = curY *  Math.cos(-this.cubies[i][j][k].radian) - curZ*Math.sin(-this.cubies[i][j][k].radian) - Math.PI/2/200;
            var newZ = curY *  Math.sin(-this.cubies[i][j][k].radian) + curZ*Math.cos(-this.cubies[i][j][k].radian) + Math.PI/2/200;
    
    
            curY = newY;
            curZ = newZ;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotateAroundWorldAxis(new THREE.Vector3(-1,0,0), speed);
        }       
       
    }

    async turnX(right, clock){

        if(this.blocked)
            return;

        this.blocked = true;
        var timer = 0;

        if(right){
            var layer = 2;
            clock = !clock; 
        }
        else
        {
            var layer = 0;                               
        }
        
        while(true){
            timer++;
            for(var i = 0; i < dimensions; i++){
                for(var j = 0; j < dimensions; j++){
                    this.turnXSingleCube(layer, i, j, clock);
                }
            }
    
            if(timer >= timesToSpin){
                this.blocked = false;
                
                if(right && !clock){
                    this.state = Moves.rMove(this.state);
                    Moves.rMoveCube(this);
                    this.adjustCubies();
                }else if (right && clock){
                    this.state = Moves.rPrimMove(this.state);;
                    Moves.rPrimMoveCube(this);
                    this.adjustCubies();
                }else if(!right && clock){
                    this.state = Moves.lMove(this.state);
                    Moves.lMoveCube(this);
                    this.adjustCubies();
                }else if(!right && !clock){
                    this.state = Moves.lPrimMove(this.state);
                    Moves.lPrimMoveCube(this);
                    this.adjustCubies(); 
                }
                return Promise.resolve(true);  
            }
            await new Promise(resolve => setTimeout(resolve, turningSpeed));
        }       
    }
    
    adjustCubies(){
        for(var i = 0; i < dimensions; i++){
            for(var j = 0; j < dimensions; j++){
                for(var k = 0; k < dimensions; k++){
                    this.cubies[i][j][k].adjustPosition(i,j,k);
                    this.cubies[i][j][k].adjustAngle();
                }
            }
        }
    }
}