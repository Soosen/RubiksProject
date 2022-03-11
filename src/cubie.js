class Cubie {
  constructor(x, y, z, sl, f, b, r, l, u, d) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radian = 0;
    this.sideLength = sl;
    this.textures = [u, d, f, b, r, l];
    this.cubie;       
  }

  draw(){
    var geometry = new THREE.BoxBufferGeometry( this.sideLength, this.sideLength, this.sideLength).toNonIndexed();
    
    var materials = [
      new THREE.MeshBasicMaterial( { map: this.textures[0]} ),
      new THREE.MeshBasicMaterial( { map: this.textures[1] } ),
      new THREE.MeshBasicMaterial( { map: this.textures[2] } ),
      new THREE.MeshBasicMaterial( { map: this.textures[3] } ),
      new THREE.MeshBasicMaterial( { map: this.textures[4] } ),
      new THREE.MeshBasicMaterial( { map: this.textures[5] } )
    ];

    this.cubie = new THREE.Mesh( geometry, materials );

    this.cubie.position.set(this.x, this.y, this.z);
    scene.add(this.cubie);
  }

  repaint(textures){
    this.cubie.material = [
    	new THREE.MeshBasicMaterial( { map: textures[0] } ),
      new THREE.MeshBasicMaterial( { map: textures[1] } ),
      new THREE.MeshBasicMaterial( { map: textures[2] } ),
      new THREE.MeshBasicMaterial( { map: textures[3] } ),
      new THREE.MeshBasicMaterial( { map: textures[4] } ),
      new THREE.MeshBasicMaterial( { map: textures[5] } )
    ];
  }

  remove(){
    scene.remove(this.cubie);
  }

  move(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.cubie.position.set(this.x, this.y, this.z);
  }

  rotate(x, y, z){
    this.cubie.rotation.x += x;
    this.cubie.rotation.y += y;
    this.cubie.rotation.z += z;
  }

      
  rotateAroundWorldAxis(axis, radians ) {
    var rotWorldMatrix;
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(this.cubie.matrix);        // pre-multiply
    this.cubie.matrix = rotWorldMatrix;
    this.cubie.rotation.setFromRotationMatrix(this.cubie.matrix, this.cubie.order);
  }
  
  adjustPosition(i,j,k){
    this.x = Math.round(this.x) + 0.1 * i;
    this.y = Math.round(this.y) + 0.1 * j;
    this.z = Math.round(this.z) + 0.1 * k;
    this.cubie.position.set(this.x, this.y, this.z);
  }

  adjustAngle(){
    this.cubie.rotation.x = (Math.round((this.cubie.rotation.x / (Math.PI/2))) * (Math.PI/2)) % (Math.PI*2);
    this.cubie.rotation.y = (Math.round((this.cubie.rotation.y / (Math.PI/2))) * (Math.PI/2)) % (Math.PI*2);
    this.cubie.rotation.z = (Math.round((this.cubie.rotation.z / (Math.PI/2))) * (Math.PI/2)) % (Math.PI*2);
  }
}
