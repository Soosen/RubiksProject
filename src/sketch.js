const width = 800;
const height = 800;

//scene
var scene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera(75, width / height, 2, 1000 );
camera.position.z = 10;
camera.position.x = 3;
camera.position.y = 3;  

//rednerer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0x000000, 0 )
renderer.setSize(width, height);
const div = document.getElementsByClassName('cubeContainer');
//div[0].appendChild(renderer.domElement);
//document.body.appendChild( renderer.domElement );
document.querySelector('#cube').appendChild( renderer.domElement );

//camera controls
const controls = new THREE.OrbitControls (camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 8;
controls.enablePan = false;


//setup
var texturePackID = 0;
var texturesChanged = true;
var clockwise = true;
var correctCrossMap = Utilities.importCorrectwhiteCrossMap();

//cube
var cube = new Cube(0, 0, 0, 1);
camera.lookAt (new THREE.Vector3(cube.midX, cube.midY, cube.midZ));



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
          if(clockwise){
            fMoveUI();
            break;
          }
          fPrimMoveUI();
          break;
  
        case 85:
          //u
          if(clockwise){
            uMoveUI();
            break;
          }
          uPrimMoveUI();
          break;
    
  
        case 82:
          //r
          if(clockwise){
            rMoveUI();
            break;
          }
          rPrimMoveUI();
          break;
        case 66:
          //b
          if(clockwise){
            bMoveUI();
            break;
          }
          bPrimMoveUI();
          break;
  
        case 68:
          //d
          if(clockwise){
            dMoveUI();
            break;
          }
          dPrimMoveUI();
    
  
        case 76:
          //l
          if(clockwise){
            lMoveUI();
            break;
          }
          lPrimMoveUI();
          break;

        case 83:
          //s
         scrambleUI();
         solveUI();
          break;

        case 77:
          //m         
          cube.multiSolve(100);
          break;

        case 88:
          //x
          resetUI();
          break;
      }
    }

    //Functions ignoring cube.blocked
    switch(keyCode){
      case 67:
        //c      
        clockwise = !clockwise;
        if(clockwise){
          console.log("clockwise");
          break
        }          
        console.log("counter-clockwise")
        break;

      case 84:
        retextureUI();
        break;
      }
  }

render();