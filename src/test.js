class Test{
    constructor(){
        this.obj;
    }

    draw(){

        var geometry = new THREE.BoxGeometry( 2, 2, 2).toNonIndexed();;
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var positionAttribute = geometry.getAttribute( 'position' );
        var colorsTemp = [];
        /*
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
        */
      
        // define the new attribute    
        //geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsTemp, 3 ) );
    
        var obj = new THREE.Mesh( geometry, material );
        this.obj = obj;
    
       // this.cubie.position.set(this.x, this.y, this.z);
        //Adds cubie to the scene
        scene.add(obj);
        
    }
}