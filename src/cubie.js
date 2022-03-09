class Cubie {
  constructor(x, y, z, sl, f, b, r, l, u, d) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radian = 0;
    this.sideLength = sl;
    this.colors = [u, d, f, b, r, l];
    this.cubie;       
  }
  

  draw(){
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
}
