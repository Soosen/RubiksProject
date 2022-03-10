class Cubie {
  constructor(x, y, z, sl, f, b, r, l, u, d) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radian = 0;
    this.sideLength = sl;
    //this.colors = [u, d, f, b, r, l];
    this.textures = [u, d, f, b, r, l];
    this.cubie;       
  }

  draw(){
    var geometry = new THREE.BoxBufferGeometry( this.sideLength, this.sideLength, this.sideLength).toNonIndexed();
    
    if(this.textures[0] instanceof THREE.Texture)
    {
      var materials = [
        new THREE.MeshBasicMaterial( { map: this.textures[0]} ),
        new THREE.MeshBasicMaterial( { map: this.textures[1] } ),
        new THREE.MeshBasicMaterial( { map: this.textures[2] } ),
        new THREE.MeshBasicMaterial( { map: this.textures[3] } ),
        new THREE.MeshBasicMaterial( { map: this.textures[4] } ),
        new THREE.MeshBasicMaterial( { map: this.textures[5] } )
      ];
    }
    else
    {
      var materials = [
        new THREE.MeshBasicMaterial( { color: this.textures[0]} ),
        new THREE.MeshBasicMaterial( { color: this.textures[1] } ),
        new THREE.MeshBasicMaterial( { color: this.textures[2] } ),
        new THREE.MeshBasicMaterial( { color: this.textures[3] } ),
        new THREE.MeshBasicMaterial( { color: this.textures[4] } ),
        new THREE.MeshBasicMaterial( { color: this.textures[5] } )
      ];
    }
   
    /*
    var material = new THREE.MeshFaceMaterial([
      new THREE.MeshBasicMaterial({
          //color: 0x00ff00
          map: this.textures[0]
      }),
      new THREE.MeshBasicMaterial({
          //color: 0xff0000
          map: this.textures[1]
      }),
      new THREE.MeshBasicMaterial({
          //color: 0x0000ff
          map: this.textures[2]
          //map: texture
      }),
      new THREE.MeshBasicMaterial({
          //color: 0xffff00
          map: this.textures[3]
      }),
      new THREE.MeshBasicMaterial({
          //color: 0x00ffff
          map: this.textures[4]
      }),
      new THREE.MeshBasicMaterial({
          //color: 0xff00ff
          map: this.textures[5]
      })
    ]);
    */

    this.cubie = new THREE.Mesh( geometry, materials );

    this.cubie.position.set(this.x, this.y, this.z);
    //Adds cubie to the scene
    scene.add(this.cubie);
    /*
    var geometry = new THREE.BoxGeometry( this.sideLength, this.sideLength, this.sideLength).toNonIndexed();;
    var material = new THREE.MeshBasicMaterial( { vertexColors: true } );
    var positionAttribute = geometry.getAttribute( 'position' );
    var colorsTemp = [];
    for ( let i = 0; i < positionAttribute.count/2; i += 3 ) {
      
      var color = new THREE.Color();
      color.copy(this.colors[i/3]);
      
      // define the same color for each vertex of a triangle
      
      colorsTemp.push( color.r, color.g, color.b );
      colorsTemp.push( color.r, color.g, color.b );
      colorsTemp.push( color.r, color.g, color.b );
      colorsTemp.push( color.r, color.g, color.b );
      colorsTemp.push( color.r, color.g, color.b );
      colorsTemp.push( color.r, color.g, color.b );
  
    }
  
    // define the new attribute    
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsTemp, 3 ) );

    this.cubie = new THREE.Mesh( geometry, material );

    this.cubie.position.set(this.x, this.y, this.z);
    //Adds cubie to the scene
    scene.add(this.cubie);
    */
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
