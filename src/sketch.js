const width = 800;
const height = 800;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width / height, 2, 2000 );
var controls;


//Cube
var cube = new Cube(0, 0, 0, 1);

//map of white cross solutions pulled from a sollutions.json
var correctCrossMap = Utilities.importCorrectwhiteCrossMap();

var clockwise = true;
var dir = true;

//Sets camera's distance away from cube (using this explanation only for simplicity's sake - in reality this actually sets the 'depth' of the camera's position)
camera.position.z = 10;
camera.position.x = 3;
camera.position.y = 3;
camera.lookAt (new THREE.Vector3(cube.midX, cube.midY, cube.midZ));  


//Creates renderer and adds it to the DOM
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
controls = new THREE.OrbitControls (camera, renderer.domElement);
document.body.appendChild( renderer.domElement );




//Rendering
function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera ); 
  controls.update();
  
  if(cube.turnZActive){
    cube.turnZ(cube.direct, cube.clck);
  }
  if(cube.turnYActive){
    cube.turnY(cube.direct, cube.clck);
  }
  if(cube.turnXActive){
    cube.turnX(cube.direct, cube.clck);
  }
  
}

document.addEventListener("keydown", onDocumentKeyDown, false);
async function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if(!cube.blocked){
      switch(keyCode){
        case 70:
          //f
          cube.turnZActive = true;
          cube.direct = true;
          break;
  
        case 85:
          //u
          cube.turnYActive = true;
          cube.direct = true;
          break;
    
  
        case 82:
          //r
          cube.turnXActive = true;
          cube.direct = true;
          break;
  
        case 66:
          //b
          cube.turnZActive = true;
          cube.direct = false;
          break;
  
        case 68:
          //d
          cube.turnYActive = true;
          cube.direct = false;
          break;
    
  
        case 76:
          //l
          cube.turnXActive = true;
          cube.direct = false;
          break;

        case 83:
          //s
          cube.scramble(30, false);
          await new Promise(r => setTimeout(r, 20))
          cube.solve(true);       
          break;

          case 77:
            //m         
            cube.multiSolve(100);
            break;

        case 88:
          //r
          cube.resetCube();
          break;
      }
      if(keyCode == 67){
        cube.clck = !cube.clck;
        if(cube.clck ){
          console.log("clockwise");
        }
        else
        {
          console.log("counter-clockwise")
        }
      }
    }
};

render();