//var THREE = require(["node_modules/three/build/three.js"])
//colors
const red =  new THREE.Color( 0xFF0000 );
const orange = new THREE.Color( 0xFFA500 );
const blue = new THREE.Color( 0x0000FF );
const green = new THREE.Color( 0x008000 );
const white = new THREE.Color( 0xFFFFFF );
const yellow = new THREE.Color( 0xFFFF00 );
const black = new THREE.Color( 0x000000 );

const dimensions = 3;

//3 max speed
//0.5 quick
//0.2 normal
//<0.1 slow
const speed = 0.2;
const spinDuration = 60/speed;

class Cube {
    constructor(x, y, z, cs) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.solver = new Solver();
      this.cubieSize = cs;
      this.midX = this.x + dimensions/2*0.1 + 1.5*this.cubieSize;
      this.midY = this.y + dimensions/2*0.1 + 1.5*this.cubieSize;
      this.midZ = this.z + dimensions/2*0.1 + 1.5*this.cubieSize;
      this.radius = this.midX - this.x;
      this.state = States.resetState();
      this.cubies = this.createCube();
      this.paintCube();
      this.blocked = false;
      this.timer = 0;
      this.timeToSpin = 3.14/2/speed;
      this.turnXActive = false;
      this.turnYActive = false;
      this.turnZActive = false;
      this.clck = true;
      this.direct = true;    
      
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
                var up = black;
                var down = black;
                var front = black;
                var back = black;
                var right = black;
                var left = black;
                if(j == 0){
                    down = Utilities.stringToColor(this.state[1][k][i]);;
                }
                if(j == dimensions - 1){
                    up = Utilities.stringToColor(this.state[0][k][i]);
                }

                if(i == 0){
                    left = Utilities.stringToColor(this.state[5][k][j]);;
                }
                if(i == dimensions - 1){
                    right = Utilities.stringToColor(this.state[4][k][j]);;
                }

                if(k == 0){
                    back = Utilities.stringToColor(this.state[3][i][j]);;
                }
                if(k == dimensions - 1){
                    front = Utilities.stringToColor(this.state[2][i][j]);
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
    }

    solve(animated){

        var currentState = Utilities.copyState(this.state);
        this.applyScramble(this.solver.solveCube(currentState), animated);

        return Utilities.copmareStates(this.state, States.resetState());

    }

    async multiSolve(amount){
        totalDuration = 0;
        totalMoves = 0;
        for(var i = 0; i < amount; i++){
            console.log("Solve: " + (i + 1) + "/" + amount)
            this.scramble(30);
            await new Promise(r => setTimeout(r, 1))
            if(!this.solve(false))
            break;
          }
          console.log("Average Time = " + Math.floor(totalDuration/amount) + " Miliseconds");
          console.log("Average Moves = " + Math.floor(totalMoves/amount) + " Moves");
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

    animateScramble(scramble){
        this.turnXActive = false;
        this.turnYActive = false;
        this.turnZActive = false;
        var counter = 0;
        var interval = window.setInterval(()=>{
            if(counter >= scramble.length - 1){
                clearInterval(interval) 
            }
            var string = scramble[counter];

            switch(string){
                case "u":
                    this.turnYActive = true;
                    this.clck = true;
                    this.direct = true;
                    break;
                case "uPrim":
                    this.turnYActive = true;
                    this.clck = false;
                    this.direct = true;
                    break;
                case "d":
                    this.turnYActive = true;
                    this.clck = true;
                    this.direct = false;
                    break;
                case "dPrim":
                    this.turnYActive = true;
                    this.clck = false;
                    this.direct = false;
                    break;
                case "f":
                    this.turnZActive = true;
                    this.clck = true;
                    this.direct = true;
                    break;
                case "fPrim":
                    this.turnZActive = true;
                    this.clck = false;
                    this.direct = true;
                    break;
                case "b":
                    this.turnZActive = true;
                    this.clck = true;
                    this.direct = false;
                    break;
                case "bPrim":
                    this.turnZActive = true;
                    this.clck = false;
                    this.direct = false;
                    break;
                case "r":
                    this.turnXActive = true;
                    this.clck = true;
                    this.direct = true;
                    break;
                case "rPrim":
                    this.turnXActive = true;
                    this.clck = false;
                    this.direct = true;
                    break;
                case "l":
                    this.turnXActive = true;
                    this.clck = true;
                    this.direct = false;
                    break;
                case "lPrim":
                    this.turnXActive = true;
                    this.clck = false;
                    this.direct = false;
                    break;
                    
            }
            counter++;
        }, spinDuration);            
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
            this.cubies[i][j][k].rotate(0,0, speed);
        }
        else
        {
            var newX = curX *  Math.cos(-this.cubies[i][j][k].radian) - curY*Math.sin(-this.cubies[i][j][k].radian) - Math.PI/2/200;
            var newY = curX *  Math.sin(-this.cubies[i][j][k].radian) + curY*Math.cos(-this.cubies[i][j][k].radian) + Math.PI/2/200;
    
    
            curX = newX;
            curY = newY;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotate(0, 0, -speed);
        }
       
       
    }

    turnZ(front, clock){
        this.blocked = true;
        this.timer++;
        if(this.turnZActive){
            if(front){
                var layer = 2;
            }
            else
            {
                var layer = 0;
                clock = !clock;
            }
            for(var i = 0; i < dimensions; i++){
                for(var j = 0; j < dimensions; j++){
                    this.turnZSingleCube(i, j, layer, clock);
                }
            }
        }
        if(this.timer >= this.timeToSpin){
            this.turnZActive = false;
            this.blocked = false;
            this.timer = 0;

            if(front && clock){
                this.state = Moves.fMove(this.state);
            }else if(front && !clock){
                this.state = Moves.fPrimMove(this.state);
            }else if(!front && !clock){
                this.state = Moves.bMove(this.state);
            }else if(!front && clock){
                this.state = Moves.bPrimMove(this.state);
            } 
            this.updateCube();
            return true;
        }      
        return false;
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
            this.cubies[i][j][k].rotate(0, -speed, 0);
        }
        else
        {
            var newX = curX *  Math.cos(-this.cubies[i][j][k].radian) - curZ*Math.sin(-this.cubies[i][j][k].radian) - Math.PI/2/200;
            var newZ = curX *  Math.sin(-this.cubies[i][j][k].radian) + curZ*Math.cos(-this.cubies[i][j][k].radian) + Math.PI/2/200;
    
    
            curX = newX;
            curZ = newZ;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotate(0, speed, 0);
        }       
       
    }

    turnY(up, clock){
        this.blocked = true;
        this.timer++;
        if(this.turnYActive){
            if(up){
                var layer = 2;

            }
            else
            {
                var layer = 0;
                clock = !clock;
            }
            for(var i = 0; i < dimensions; i++){
                for(var j = 0; j < dimensions; j++){
                    this.turnYSingleCube(i, layer, j, clock);
                }
            }
        }
        if(this.timer >= this.timeToSpin){
            this.turnYActive = false;
            this.blocked = false;
            this.timer = 0;

            
            if(up && clock){
                this.state = Moves.uMove(this.state);
            }else if (up && !clock){
                this.state = Moves.uPrimMove(this.state);
            }else if(!up && !clock){
                this.state = Moves.dMove(this.state);
            }else if(!up && clock){
                this.state = Moves.dPrimMove(this.state);
            }
            this.updateCube();
            return true;
        }       
        return false;
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
            this.cubies[i][j][k].rotate(speed, 0, 0);
        }
        else
        {
            var newY = curY *  Math.cos(-this.cubies[i][j][k].radian) - curZ*Math.sin(-this.cubies[i][j][k].radian) - Math.PI/2/200;
            var newZ = curY *  Math.sin(-this.cubies[i][j][k].radian) + curZ*Math.cos(-this.cubies[i][j][k].radian) + Math.PI/2/200;
    
    
            curY = newY;
            curZ = newZ;
    
            this.cubies[i][j][k].move(curX, curY, curZ);
            this.cubies[i][j][k].rotate(-speed, 0, 0);
        }       
       
    }

    turnX(right, clock){
        this.blocked = true;
        this.timer++;
        if(this.turnXActive){
            if(right){
                var layer = 2;
                clock = !clock; 
            }
            else
            {
                var layer = 0;                               
            }
            for(var i = 0; i < dimensions; i++){
                for(var j = 0; j < dimensions; j++){
                    this.turnXSingleCube(layer, i, j, clock);
                }
            }
        }
        if(this.timer >= this.timeToSpin){
            this.turnXActive = false;
            this.blocked = false;
            this.timer = 0;

            
            if(right && !clock){
                this.state = Moves.rMove(this.state);
            }else if (right && clock){
                this.state = Moves.rPrimMove(this.state);;
            }else if(!right && clock){
                this.state = Moves.lMove(this.state);
            }else if(!right && !clock){
                this.state = Moves.lPrimMove(this.state);
            }
            this.updateCube();
            return true;
        }       
        return false;
    } 
}