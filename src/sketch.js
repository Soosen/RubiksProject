const width = 800;
const height = 800;

var texturePackID = 4;
var texturesChanged = true;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width / height, 2, 2000 );
var controls;


//Cube
var cube = new Cube(0, 0, 0, 1);

//map of white cross solutions pulled from a sollutions.json
var correctCrossMap = Utilities.importCorrectwhiteCrossMap();

var clockwise = true;

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
}

document.addEventListener("keydown", onDocumentKeyDown, false);
async function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if(!cube.blocked){
      switch(keyCode){
        case 70:
          //f
          await cube.turnZ(true, clockwise);
          break;
  
        case 85:
          //u
          await cube.turnY(true, clockwise);
          break;
    
  
        case 82:
          //r
          await cube.turnX(true, clockwise);
          break;
  
        case 66:
          //b
          await cube.turnZ(false, clockwise);
          break;
  
        case 68:
          //d
          await cube.turnY(false, clockwise);
          break;
    
  
        case 76:
          //l
          await cube.turnX(false, clockwise);
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
    }

    //Functions ignoring cube.blocked
    switch(keyCode){
      case 67:
        //c      
        clockwise = !clockwise;
        if(cube.clck ){
          console.log("clockwise");
          break
        }          
        console.log("counter-clockwise")
        break;

      case 84:
        texturePackID = (texturePackID + 1) % 5;
        texturesChanged = true;
        Utilities.laodTextures(texturePackID);
        cube.updateCube();
        break;
      }
  }

render();