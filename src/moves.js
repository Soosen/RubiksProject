class Moves {
    static allMoves(){
        return ["u","uPrim","d","dPrim","f","fPrim","b","bPrim","r","rPrim","l","lPrim"];
    }

    static allMovesWithDoubles(){
        return ["u","uPrim","d","dPrim","f","fPrim","b","bPrim","r","rPrim","l","lPrim","d-d", "u-u", "f-f", "b-b","l-l", "r-r"];
    }

    static fMove(givenState){
        givenState[2] = this.rotateFace(givenState[2], false);
        var copy = Utilities.copyState(givenState);

        //L moved to U
        givenState[0][2][2] = copy[5][2][2];
        givenState[0][2][1] = copy[5][2][1];
        givenState[0][2][0] = copy[5][2][0];        
    
        //U moved to R
        givenState[5][2][2] = copy[1][2][0];
        givenState[5][2][1] = copy[1][2][1];
        givenState[5][2][0] = copy[1][2][2];
        

        //R moved to D
        givenState[1][2][2] = copy[4][2][2];
        givenState[1][2][1] = copy[4][2][1];
        givenState[1][2][0] = copy[4][2][0];

        
         //D moved to L
         givenState[4][2][2] = copy[0][2][0];
         givenState[4][2][1] = copy[0][2][1];
         givenState[4][2][0] = copy[0][2][2];
    
         return givenState;       
        
    }

    static fPrimMove(givenState){

        givenState[2] = this.rotateFace(givenState[2], true);
        var copy = Utilities.copyState(givenState);

        //U moved to L
        givenState[5][2][2] = copy[0][2][2];
        givenState[5][2][1] = copy[0][2][1];
        givenState[5][2][0] = copy[0][2][0];        
    
        //R moved to U
        givenState[1][2][2] = copy[5][2][0];
        givenState[1][2][1] = copy[5][2][1];
        givenState[1][2][0] = copy[5][2][2];
        

        //D moved to R
        givenState[4][2][2] = copy[1][2][2];
        givenState[4][2][1] = copy[1][2][1];
        givenState[4][2][0] = copy[1][2][0];

        
         //L moved to D
         givenState[0][2][2] = copy[4][2][0];
         givenState[0][2][1] = copy[4][2][1];
         givenState[0][2][0] = copy[4][2][2];
        
         return givenState;     
      

    }

    static bMove(givenState){

        givenState[3] = this.rotateFace(givenState[3], true);
        var copy = Utilities.copyState(givenState);

        //U moved to L
        givenState[5][0][2] = copy[0][0][2];
        givenState[5][0][1] = copy[0][0][1];
        givenState[5][0][0] = copy[0][0][0];        
    
        //R moved to U
        givenState[1][0][2] = copy[5][0][0];
        givenState[1][0][1] = copy[5][0][1];
        givenState[1][0][0] = copy[5][0][2];
        

        //D moved to R
        givenState[4][0][2] = copy[1][0][2];
        givenState[4][0][1] = copy[1][0][1];
        givenState[4][0][0] = copy[1][0][0];

        
         //L moved to D
         givenState[0][0][2] = copy[4][0][0];
         givenState[0][0][1] = copy[4][0][1];
         givenState[0][0][0] = copy[4][0][2];

         return givenState;     

    }

    static bPrimMove(givenState){
        
        givenState[3] = this.rotateFace(givenState[3], false);
        var copy = Utilities.copyState(givenState);

        //L moved to D
        givenState[0][0][2] = copy[5][0][2];
        givenState[0][0][1] = copy[5][0][1];
        givenState[0][0][0] = copy[5][0][0];        
    
        //U moved to R
        givenState[5][0][0] = copy[1][0][2];
        givenState[5][0][1] = copy[1][0][1];
        givenState[5][0][2] = copy[1][0][0];
        

        //R moved to D
        givenState[1][0][2] = copy[4][0][2];
        givenState[1][0][1] = copy[4][0][1];
        givenState[1][0][0] = copy[4][0][0];

        
         //D moved to L
         givenState[4][0][0] = copy[0][0][2];
         givenState[4][0][1] = copy[0][0][1];
         givenState[4][0][2] = copy[0][0][0];
        
         return givenState;     

    }

    static uMove(givenState){
        givenState[0] = this.rotateFace(givenState[0], false);
        var copy = Utilities.copyState(givenState);

        //R moved to F
        givenState[2][2][2] = copy[4][0][2];
        givenState[2][1][2] = copy[4][1][2];
        givenState[2][0][2] = copy[4][2][2];

        //F moved to L
        givenState[5][2][2] = copy[2][2][2];
        givenState[5][1][2] = copy[2][1][2];
        givenState[5][0][2] = copy[2][0][2];

        //L moved to B
        givenState[3][2][2] = copy[5][0][2];
        givenState[3][1][2] = copy[5][1][2];
        givenState[3][0][2] = copy[5][2][2];

         //B moved to R
         givenState[4][2][2] = copy[3][2][2];
         givenState[4][1][2] = copy[3][1][2];
         givenState[4][0][2] = copy[3][0][2];

        return givenState;
    }

    static uPrimMove(givenState){
        givenState[0] = this.rotateFace(givenState[0], true);

        var copy = Utilities.copyState(givenState);

        //F moved to R
        givenState[4][0][2] = copy[2][2][2];
        givenState[4][1][2] = copy[2][1][2];
        givenState[4][2][2] = copy[2][0][2];

        //L moved to F
        givenState[2][2][2] = copy[5][2][2];
        givenState[2][1][2] = copy[5][1][2];
        givenState[2][0][2] = copy[5][0][2];

        //B moved to L
        givenState[5][0][2] = copy[3][2][2];
        givenState[5][1][2] = copy[3][1][2];
        givenState[5][2][2] = copy[3][0][2];

         //R moved to B
         givenState[3][2][2] = copy[4][2][2];
         givenState[3][1][2] = copy[4][1][2];
         givenState[3][0][2] = copy[4][0][2];

        return givenState;
    }

    static dMove(givenState){
        
        givenState[1] = this.rotateFace(givenState[1], true);
        var copy = Utilities.copyState(givenState);

        //F moved to R
        givenState[4][0][0] = copy[2][2][0];
        givenState[4][1][0] = copy[2][1][0];
        givenState[4][2][0] = copy[2][0][0];

        //L moved to F
        givenState[2][2][0] = copy[5][2][0];
        givenState[2][1][0] = copy[5][1][0];
        givenState[2][0][0] = copy[5][0][0];

        //B moved to L
        givenState[5][0][0] = copy[3][2][0];
        givenState[5][1][0] = copy[3][1][0];
        givenState[5][2][0] = copy[3][0][0];

         //R moved to B
         givenState[3][2][0] = copy[4][2][0];
         givenState[3][1][0] = copy[4][1][0];
         givenState[3][0][0] = copy[4][0][0];

        return givenState;

    }

    static dPrimMove(givenState){
        givenState[1] = this.rotateFace(givenState[1], false);
        var copy = Utilities.copyState(givenState);

        //F moved to R
        givenState[2][2][0] = copy[4][0][0];
        givenState[2][1][0] = copy[4][1][0];
        givenState[2][0][0] = copy[4][2][0];

        //L moved to F
        givenState[5][2][0] = copy[2][2][0];
        givenState[5][1][0] = copy[2][1][0];
        givenState[5][0][0] = copy[2][0][0];

        //B moved to L
        givenState[3][2][0] = copy[5][0][0];
        givenState[3][1][0] = copy[5][1][0];
        givenState[3][0][0] = copy[5][2][0];

         //R moved to B
         givenState[4][2][0] = copy[3][2][0];
         givenState[4][1][0] = copy[3][1][0];
         givenState[4][0][0] = copy[3][0][0];

        return givenState; 

    }

    static rMove(givenState){
        givenState[4] = this.rotateFace(givenState[4], true);
        var copy = Utilities.copyState(givenState);

        //D moved to F
        givenState[2][2][0] = copy[1][0][2];
        givenState[2][2][1] = copy[1][1][2];
        givenState[2][2][2] = copy[1][2][2];

        //B moved to D
        givenState[1][2][2] = copy[3][2][0];
        givenState[1][1][2] = copy[3][2][1];
        givenState[1][0][2] = copy[3][2][2];

        //U moved to B
        givenState[3][2][0] = copy[0][0][2];
        givenState[3][2][1] = copy[0][1][2];
        givenState[3][2][2] = copy[0][2][2];

         //F moved to U
         givenState[0][2][2] = copy[2][2][0];
         givenState[0][1][2] = copy[2][2][1];
         givenState[0][0][2] = copy[2][2][2];

        return givenState; 


    }

    static rPrimMove(givenState){
        givenState[4] = this.rotateFace(givenState[4], false);
        var copy = Utilities.copyState(givenState);

        //F moved to D
        givenState[1][0][2] = copy[2][2][0];
        givenState[1][1][2] = copy[2][2][1];
        givenState[1][2][2] = copy[2][2][2];

        //B moved to D
        givenState[3][2][0] = copy[1][2][2];
        givenState[3][2][1] = copy[1][1][2];
        givenState[3][2][2] = copy[1][0][2];

        //B moved to U
        givenState[0][0][2] = copy[3][2][0];
        givenState[0][1][2] = copy[3][2][1];
        givenState[0][2][2] = copy[3][2][2];

         //U moved to F
         givenState[2][2][0] = copy[0][2][2];
         givenState[2][2][1] = copy[0][1][2];
         givenState[2][2][2] = copy[0][0][2];

        return givenState; 

    }

    static lMove(givenState){

        givenState[5] = this.rotateFace(givenState[5], false);
        var copy = Utilities.copyState(givenState);

        //F moved to D
        givenState[1][0][0] = copy[2][0][0];
        givenState[1][1][0] = copy[2][0][1];
        givenState[1][2][0] = copy[2][0][2];

        //B moved to D
        givenState[3][0][0] = copy[1][2][0];
        givenState[3][0][1] = copy[1][1][0];
        givenState[3][0][2] = copy[1][0][0];

        //B moved to U
        givenState[0][0][0] = copy[3][0][0];
        givenState[0][1][0] = copy[3][0][1];
        givenState[0][2][0] = copy[3][0][2];

         //U moved to F
         givenState[2][0][0] = copy[0][2][0];
         givenState[2][0][1] = copy[0][1][0];
         givenState[2][0][2] = copy[0][0][0];

        return givenState;     

    }

    static lPrimMove(givenState){
        givenState[5] = this.rotateFace(givenState[5], true);
        var copy = Utilities.copyState(givenState);

        //D moved to F
        givenState[2][0][0] = copy[1][0][0];
        givenState[2][0][1] = copy[1][1][0];
        givenState[2][0][2] = copy[1][2][0];

        //D moved to B
        givenState[1][0][0] = copy[3][0][2];
        givenState[1][1][0] = copy[3][0][1];
        givenState[1][2][0] = copy[3][0][0];

        //U moved to B
        givenState[3][0][0] = copy[0][0][0];
        givenState[3][0][1] = copy[0][1][0];
        givenState[3][0][2] = copy[0][2][0];

         //F moved to U
         givenState[0][2][0] = copy[2][0][0];
         givenState[0][1][0] = copy[2][0][1];
         givenState[0][0][0] = copy[2][0][2]
        
        return givenState;    
    }

    static reverseMove(move){
        if(move.length == 1){
            return move +="Prim";
        }
        else
        {
            return move[0];
        }
    }

    static upsideDownAlg(alg){
        var retAlg = "";

        for(var i = 0; i < alg.length; i++){
            switch(alg[i]){
                case "l":
                    retAlg += "r";
                    break;

                case "r":
                    if(alg[i + 1] != "i" || i == alg.length -1)
                        retAlg += "l";
                    else
                        retAlg += alg[i];
                    break;
                
                case "d":
                    retAlg += "u";
                    break;
                
                case "u":
                    retAlg += "d";
                    break;  
                
                default:
                    retAlg += alg[i];
                    break;
            }
        }
        return retAlg;

    }

    static xCubeMove(alg){
        var retAlg = "";

        for(var i = 0; i < alg.length; i++){
            switch(alg[i]){
                case "f":
                    retAlg += "u";
                    break;

                case "d":
                    retAlg += "f";
                    break;
                
                case "b":
                    retAlg += "d";
                    break;
                
                case "u":
                    retAlg += "b";
                    break;  
                
                default:
                    retAlg += alg[i];
                    break;
            }
        }
        return retAlg;

    }

    static yCubeMove(alg){
        var retAlg = "";

        for(var i = 0; i < alg.length; i++){
            switch(alg[i]){
                case "l":
                    retAlg += "b";
                    break;

                case "r":
                    if(alg[i + 1] != "i" || i == alg.length -1)
                        retAlg += "f";
                    else
                        retAlg += alg[i];
                    break;
                
                case "b":
                    retAlg += "r";
                    break;
                
                case "f":
                    retAlg += "l";
                    break;  
                
                default:
                    retAlg += alg[i];
                    break;
            }
        }
        return retAlg;
    }

    static rotateFace(face, clock){
        var copyFace = Utilities.copyFace(face);

        if(clock){
            //corners
            face[0][0] = copyFace[0][2];
            face[0][2] = copyFace[2][2];
            face[2][2] = copyFace[2][0];
            face[2][0] = copyFace[0][0];

             //egdes
            face[0][1] = copyFace[1][2];
            face[1][2] = copyFace[2][1];
            face[2][1] = copyFace[1][0];
            face[1][0] = copyFace[0][1];
 
            
        }
        else
        {
            //corners
            face[0][0] = copyFace[2][0];
            face[2][0] = copyFace[2][2];
            face[2][2] = copyFace[0][2];
            face[0][2] = copyFace[0][0];

              //egdes
              face[0][1] = copyFace[1][0];
              face[1][0] = copyFace[2][1];
              face[2][1] = copyFace[1][2];
              face[1][2] = copyFace[0][1];          
            
        }
        
        return face;
    }

    static correctWhiteCrossMoves(){
        return["u", "uPrim","u-u", "f-f", "b-b", "r-r", "l-l"];
    }

    static doubleYCubeMove(alg){
      return this.yCubeMove(this.yCubeMove(alg));
    }

    static tripleYCubeMove(alg){
        return this.yCubeMove(this.doubleYCubeMove(alg));
      }

    static f2lMoves(){
        var f2lMoves = [];
        
        //Basic
        //1
        f2lMoves.push(this.upsideDownAlg("u-r-uPrim-rPrim"));
        //2
        f2lMoves.push(this.upsideDownAlg("uPrim-fPrim-u-f"));
        //3
        f2lMoves.push(this.upsideDownAlg("fPrim-uPrim-f"));
        //4
        f2lMoves.push(this.upsideDownAlg("r-u-rPrim"));
        //5
        f2lMoves.push(this.upsideDownAlg("f-f-lPrim-uPrim-l-u-f-f"));
        //6
        f2lMoves.push(this.upsideDownAlg("uPrim-l-fPrim-rPrim-f-r-f-lPrim"));
        //7
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-u-rPrim-u-u-r-uPrim-rPrim"));
        //8
        f2lMoves.push(this.upsideDownAlg("fPrim-uPrim-lPrim-u-u-l-uPrim-f"));
        //9
        f2lMoves.push(this.upsideDownAlg("uPrim-r-uPrim-rPrim-u-fPrim-uPrim-f"));
        //10
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-rPrim-u-r-u-rPrim"));        
        //11
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-u-rPrim-u-fPrim-uPrim-f"));
        //12
        f2lMoves.push(this.upsideDownAlg("rPrim-u-u-r-r-u-r-r-u-r"));
        //13
        f2lMoves.push(this.upsideDownAlg("u-u-fPrim-lPrim-u-l-uPrim-lPrim-u-u-l-f"));
        //14
        f2lMoves.push(this.upsideDownAlg("uPrim-r-uPrim-rPrim-u-r-u-rPrim"));
        //15
        f2lMoves.push(this.upsideDownAlg("rPrim-dPrim-r-uPrim-rPrim-d-r-u-r-uPrim-rPrim"));
        //16
        f2lMoves.push(this.upsideDownAlg("r-uPrim-rPrim-u-u-fPrim-uPrim-f"));
        //17
        f2lMoves.push(this.upsideDownAlg("r-u-u-rPrim-uPrim-r-u-rPrim"));
        //18
        f2lMoves.push(this.upsideDownAlg("rPrim-f-r-fPrim-r-uPrim-rPrim-u-r-uPrim-rPrim"));
        //19
        f2lMoves.push(this.upsideDownAlg("u-r-u-u-rPrim-u-r-uPrim-rPrim"));
        //20
        f2lMoves.push(this.upsideDownAlg("uPrim-r-uPrim-r-r-f-r-fPrim-r-uPrim-rPrim"));
        //21
        f2lMoves.push(this.upsideDownAlg("r-uPrim-rPrim-u-u-r-u-rPrim"));
        //22
        f2lMoves.push(this.upsideDownAlg("fPrim-lPrim-u-u-l-f"));
        //23
        f2lMoves.push(this.upsideDownAlg("u-r-uPrim-rPrim-uPrim-r-uPrim-rPrim-u-r-uPrim-rPrim"));
        //24
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-r-r-f-r-fPrim-r-uPrim-rPrim"));
        //25
        f2lMoves.push(this.upsideDownAlg("uPrim-rPrim-f-r-fPrim-r-u-rPrim"));
        //26
        f2lMoves.push(this.upsideDownAlg("u-r-uPrim-rPrim-f-rPrim-fPrim-r"));
        //27
        f2lMoves.push(this.upsideDownAlg("r-uPrim-r-r-f-r-fPrim"));
        //28
        f2lMoves.push(this.upsideDownAlg("u-fPrim-lPrim-u-u-l-uPrim-f"));
        //29
        f2lMoves.push(this.upsideDownAlg("rPrim-f-r-fPrim-u-r-uPrim-rPrim"));
        //30
        f2lMoves.push(this.upsideDownAlg("r-u-rPrim-uPrim-r-u-rPrim"));
        //31
        f2lMoves.push(this.upsideDownAlg("uPrim-rPrim-f-r-fPrim-r-uPrim-rPrim"));
        //32
        f2lMoves.push(this.upsideDownAlg("u-r-uPrim-rPrim-u-r-uPrim-rPrim-u-r-uPrim-rPrim"));
        //33
        f2lMoves.push(this.upsideDownAlg("uPrim-fPrim-uPrim-f-u-u-fPrim-uPrim-f"));
        //34
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-u-rPrim-u-r-u-rPrim"));
        //35
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-rPrim-u-fPrim-uPrim-f"));
        //36
        f2lMoves.push(this.upsideDownAlg("u-fPrim-uPrim-f-uPrim-r-u-rPrim"));
        //37
        f2lMoves.push(this.upsideDownAlg("r-r-u-u-f-r-r-fPrim-u-u-rPrim-u-rPrim"));
        //38
        f2lMoves.push(this.upsideDownAlg("r-uPrim-rPrim-uPrim-r-u-rPrim-u-u-r-uPrim-rPrim"));
        //39
        f2lMoves.push(this.upsideDownAlg("r-uPrim-rPrim-u-r-u-u-rPrim-u-r-uPrim-rPrim"));
        //40
        f2lMoves.push(this.upsideDownAlg("fPrim-lPrim-u-u-l-f-r-u-rPrim"));
        //41
        f2lMoves.push(this.upsideDownAlg("r-uPrim-rPrim-fPrim-lPrim-u-u-l-f"));
        

        
        //Advanced
        //1
        f2lMoves.push(this.upsideDownAlg("lPrim-uPrim-l-u-r-uPrim-rPrim"));
        //2
        f2lMoves.push(this.upsideDownAlg("l-uPrim-lPrim-r-u-u-rPrim"));
        //3
        f2lMoves.push(this.upsideDownAlg("rPrim-uPrim-r-r-u-u-rPrim"));
        //4
        f2lMoves.push(this.upsideDownAlg("u-u-lPrim-u-l-uPrim-r-u-rPrim"));
        //5
        f2lMoves.push(this.upsideDownAlg("l-u-lPrim-u-r-u-rPrim"));
        //6
        f2lMoves.push(this.upsideDownAlg("u-u-rPrim-u-r-u-r-u-rPrim"));
        //7
        f2lMoves.push(this.upsideDownAlg("uPrim-lPrim-u-l-r-uPrim-rPrim"));
        //8
        f2lMoves.push(this.upsideDownAlg("r-dPrim-rPrim-u-r-u-d-rPrim"));
        //9
        f2lMoves.push(this.upsideDownAlg("u-rPrim-u-u-r-uPrim-r-u-rPrim"));
        //10
        f2lMoves.push(this.upsideDownAlg("uPrim-l-f-f-lPrim-f-f"));
        //11
        f2lMoves.push(this.upsideDownAlg("uPrim-l-uPrim-lPrim-r-uPrim-rPrim"));
        //12
        f2lMoves.push(this.upsideDownAlg("uPrim-r-u-r-r-uPrim-r-r-u-rPrim"));
        //13
        f2lMoves.push(this.upsideDownAlg("uPrim-l-fPrim-l-l-u-l-u-u-f"));
        //14
        f2lMoves.push(this.upsideDownAlg("u-u-r-r-d-b-b-dPrim-r-r"));
        //15
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("uPrim-l-fPrim-lPrim-f-l-u-lPrim")));
        //16
        f2lMoves.push(this.upsideDownAlg("uPrim-rPrim-dPrim-fPrim-d-r"));
        //17
        f2lMoves.push(this.upsideDownAlg("u-u-l-fPrim-uPrim-f-lPrim"));
        //18
        f2lMoves.push(this.upsideDownAlg("u-rPrim-u-u-r-fPrim-uPrim-f"));
        //19
        f2lMoves.push(this.upsideDownAlg("uPrim-f-u-u-fPrim-r-u-rPrim"));
        //20
        f2lMoves.push(this.upsideDownAlg("u-l-u-lPrim-r-u-rPrim"));
        //21
        f2lMoves.push(this.upsideDownAlg("u-rPrim-u-r-uPrim-fPrim-u-f"));
        //22
        f2lMoves.push(this.upsideDownAlg("r-lPrim-u-u-l-rPrim"));
        //23
        f2lMoves.push(this.upsideDownAlg("fPrim-l-uPrim-lPrim-f"));
        //24
        f2lMoves.push(this.upsideDownAlg("rPrim-u-r-r-uPrim-rPrim"));
        //25
        f2lMoves.push(this.upsideDownAlg("f-r-uPrim-r-r-fPrim-r"));
        //26
        f2lMoves.push(this.upsideDownAlg("l-r-u-u-rPrim-lPrim"));
        //27
        f2lMoves.push(this.upsideDownAlg("rPrim-uPrim-r-fPrim-u-u-f"));
        //28
        f2lMoves.push(this.upsideDownAlg("lPrim-u-l-u-r-u-rPrim-u-r-uPrim-rPrim"));
        //29
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("fPrim-u-lPrim-u-l-uPrim-l-u-lPrim-f")));
        //30
        f2lMoves.push(this.upsideDownAlg("rPrim-u-r-uPrim-r-u-rPrim-u-r-uPrim-rPrim"));
        //31
        f2lMoves.push(this.upsideDownAlg("lPrim-u-l-u-r-uPrim-rPrim-uPrim-r-u-rPrim"));
        //32
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("r-uPrim-rPrim-u-u-fPrim-uPrim-lPrim-u-l-l-uPrim-lPrim-f")));
        //33
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("lPrim-u-l-l-u-lPrim-u-l-u-lPrim")));
        //34
        f2lMoves.push(this.upsideDownAlg("f-uPrim-r-uPrim-rPrim-fPrim-r-uPrim-rPrim-uPrim-r-u-rPrim"));
        //35
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("r-uPrim-rPrim-uPrim-r-u-rPrim-l-uPrim-lPrim")));
        //36
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("f-u-l-u-u-lPrim-uPrim-l-u-lPrim-fPrim")));
        //37
        f2lMoves.push(this.upsideDownAlg("f-u-u-r-uPrim-rPrim-fPrim-u-r-u-rPrim"));
        //38
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("r-uPrim-rPrim-uPrim-l-u-u-lPrim-u-l-uPrim-lPrim")));
        //39
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("f-l-uPrim-lPrim-u-l-u-lPrim-fPrim")));
        //40
        f2lMoves.push(this.upsideDownAlg("f-f-rPrim-f-f-dPrim-r-uPrim-rPrim-d-r"));
        //41
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("rPrim-f-r-fPrim-r-uPrim-rPrim-u-r-uPrim-rPrim-l-uPrim-lPrim")));
        //42
        f2lMoves.push(this.upsideDownAlg(this.doubleYCubeMove("lPrim-u-l-l-u-u-lPrim-u-u-l-uPrim-lPrim")));
        

        return f2lMoves;
    }

    static f2lMoves90(){
        var f2lMoves = this.f2lMoves();

        for(var i = 0; i < f2lMoves.length; i++){
            f2lMoves[i] = this.yCubeMove(f2lMoves[i]);
        }


        return f2lMoves;
    }

    static f2lMoves180(){
        var f2lMoves = this.f2lMoves();

        for(var i = 0; i < f2lMoves.length; i++){
            f2lMoves[i] = this.doubleYCubeMove(f2lMoves[i]);
        }


        return f2lMoves;
    }

    static f2lMoves270(){
        var f2lMoves = this.f2lMoves();

        for(var i = 0; i < f2lMoves.length; i++){
            f2lMoves[i] = this.tripleYCubeMove(f2lMoves[i]);
        }


        return f2lMoves;
    }

    static ollMoves(){
        var ollsMoves = [];

        //1
        ollsMoves.push(this.upsideDownAlg("r-u-u-r-r-f-r-fPrim-u-u-rPrim-f-r-fPrim"));
        //2
        ollsMoves.push(this.upsideDownAlg("uPrim-r-r-f-r-fPrim-uPrim-r-uPrim-r-r-f-r-fPrim-u-r"));
        //3
        ollsMoves.push(this.upsideDownAlg("f-u-u-f-rPrim-fPrim-r-u-r-u-rPrim-u-fPrim"));
        //4
        ollsMoves.push(this.upsideDownAlg("fPrim-u-u-fPrim-l-f-lPrim-uPrim-lPrim-uPrim-l-uPrim-f"));
        //5
        ollsMoves.push(this.upsideDownAlg("f-r-u-rPrim-uPrim-fPrim-uPrim-f-r-u-rPrim-uPrim-fPrim"));
        //6
        ollsMoves.push(this.upsideDownAlg("l-f-f-rPrim-fPrim-r-fPrim-lPrim"));
        //7
        ollsMoves.push(this.upsideDownAlg("f-rPrim-fPrim-r-u-u-r-u-u-rPrim"));
        //8
        ollsMoves.push(this.upsideDownAlg("r-u-u-rPrim-u-u-rPrim-f-r-fPrim"));
        //9
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-r-uPrim-rPrim-u-rPrim-f-r-fPrim-u-r"));
        //10
        ollsMoves.push(this.upsideDownAlg("r-u-rPrim-u-rPrim-f-r-fPrim-r-u-u-rPrim"));
        //11
        ollsMoves.push(this.upsideDownAlg("r-uPrim-rPrim-uPrim-r-uPrim-rPrim-u-u-fPrim-u-f-uPrim-r-u-rPrim"));
        //12
        ollsMoves.push(this.upsideDownAlg("f-r-u-rPrim-uPrim-fPrim-u-f-r-u-rPrim-uPrim-fPrim"));
        //13
        ollsMoves.push(this.upsideDownAlg("f-u-r-u-u-rPrim-uPrim-r-u-rPrim-fPrim"));
        //14
        ollsMoves.push(this.upsideDownAlg("rPrim-f-r-u-rPrim-fPrim-r-f-uPrim-fPrim"));
        //15
        ollsMoves.push(this.upsideDownAlg("f-u-r-uPrim-r-d-rPrim-uPrim-r-dPrim-r-r-uPrim-r-u-rPrim-fPrim"));
        //16
        ollsMoves.push(this.upsideDownAlg("r-u-rPrim-uPrim-rPrim-f-r-r-u-rPrim-uPrim-rPrim-fPrim-r-u-r-uPrim-rPrim"));
        //17
        ollsMoves.push(this.upsideDownAlg("r-u-rPrim-u-rPrim-f-r-fPrim-u-u-rPrim-f-r-fPrim"));
        //18
        ollsMoves.push(this.upsideDownAlg("f-rPrim-fPrim-r-u-r-uPrim-rPrim-u-f-r-u-rPrim-uPrim-fPrim"));
        //19
        ollsMoves.push(this.upsideDownAlg("rPrim-u-u-f-r-u-rPrim-uPrim-f-f-u-u-f-r"));
        //20
        ollsMoves.push(this.upsideDownAlg("r-uPrim-r-r-f-f-uPrim-r-f-rPrim-u-f-f-r-r-u-rPrim"));
        //21
        ollsMoves.push(this.upsideDownAlg("r-u-rPrim-u-r-uPrim-rPrim-u-r-u-u-rPrim"));
        //22
        ollsMoves.push(this.upsideDownAlg("r-u-u-r-r-uPrim-r-r-uPrim-r-r-u-u-r"));
        //23
        ollsMoves.push(this.upsideDownAlg("r-r-d-rPrim-u-u-r-dPrim-rPrim-u-u-rPrim"));
        //24
        ollsMoves.push(this.upsideDownAlg("l-f-rPrim-fPrim-lPrim-f-r-fPrim"));
        //25
        ollsMoves.push(this.upsideDownAlg("rPrim-fPrim-lPrim-f-r-fPrim-l-f"));
        //26
        ollsMoves.push(this.upsideDownAlg("lPrim-uPrim-l-uPrim-lPrim-u-u-l"));
        //27
        ollsMoves.push(this.upsideDownAlg("r-uPrim-lPrim-u-rPrim-uPrim-l"));
        //28
        ollsMoves.push(this.upsideDownAlg("r-r-f-f-l-f-lPrim-f-f-r-fPrim-r"));
        //29
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-r-uPrim-rPrim-u-u-f-r-u-rPrim-uPrim-fPrim-u-r"));
        //30
        ollsMoves.push(this.upsideDownAlg("r-r-u-rPrim-bPrim-r-uPrim-r-r-u-r-b-rPrim"));
        //31
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-f-u-r-uPrim-rPrim-fPrim-r"));
        //32
        ollsMoves.push(this.upsideDownAlg("l-u-fPrim-uPrim-lPrim-u-l-f-lPrim"));
        //32
        ollsMoves.push(this.upsideDownAlg("r-u-bPrim-uPrim-rPrim-u-r-b-rPrim"));
        //33
        ollsMoves.push(this.upsideDownAlg("r-u-rPrim-fPrim-uPrim-f-r-uPrim-rPrim"));
        //34
        ollsMoves.push(this.upsideDownAlg("r-u-r-r-uPrim-rPrim-f-r-u-r-uPrim-fPrim"));
        //35
        ollsMoves.push(this.upsideDownAlg("r-u-u-r-r-f-r-fPrim-r-u-u-rPrim"));
        //36
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-r-uPrim-rPrim-u-r-u-r-bPrim-rPrim-b"));
        //37
        ollsMoves.push(this.upsideDownAlg("r-bPrim-rPrim-b-u-b-uPrim-bPrim"));
        //38
        ollsMoves.push(this.upsideDownAlg("l-u-lPrim-u-l-uPrim-lPrim-uPrim-lPrim-b-l-bPrim"));
        //39
        ollsMoves.push(this.upsideDownAlg("l-fPrim-lPrim-uPrim-l-u-f-uPrim-lPrim"));
        //40
        ollsMoves.push(this.upsideDownAlg("rPrim-f-r-u-rPrim-uPrim-fPrim-u-r"));
        //41
        ollsMoves.push(this.upsideDownAlg("l-u-lPrim-u-l-u-u-lPrim-fPrim-lPrim-uPrim-l-u-f"));
        //42
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-r-u-f-r-u-rPrim-uPrim-rPrim-u-r-uPrim-fPrim"));
        //43
        ollsMoves.push(this.upsideDownAlg("bPrim-uPrim-rPrim-u-r-b"));
        //44
        ollsMoves.push(this.upsideDownAlg("r-u-u-r-r-f-r-fPrim-uPrim-r-uPrim-rPrim"));
        //45
        ollsMoves.push(this.upsideDownAlg("f-r-u-rPrim-uPrim-fPrim"));
        //46
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-rPrim-f-r-fPrim-u-r"));
        //47
        ollsMoves.push(this.upsideDownAlg("fPrim-lPrim-uPrim-l-u-lPrim-uPrim-l-u-f"));
        //48
        ollsMoves.push(this.upsideDownAlg("f-r-u-rPrim-uPrim-r-u-rPrim-uPrim-fPrim"));
        //49
        ollsMoves.push(this.upsideDownAlg("r-bPrim-r-r-f-r-r-b-r-r-fPrim-r"));
        //50
        ollsMoves.push(this.upsideDownAlg("r-bPrim-r-b-r-r-u-u-f-rPrim-fPrim-r"));
        //51
        ollsMoves.push(this.upsideDownAlg("f-u-r-uPrim-rPrim-u-r-uPrim-rPrim-fPrim"));
        //52
        ollsMoves.push(this.upsideDownAlg("rPrim-uPrim-r-uPrim-rPrim-u-fPrim-u-f-r"));
        //53
        ollsMoves.push(this.upsideDownAlg("f-r-u-rPrim-uPrim-fPrim-r-u-rPrim-uPrim-rPrim-f-r-fPrim"));
        //54
        ollsMoves.push(this.upsideDownAlg("fPrim-lPrim-uPrim-l-u-lPrim-u-l-uPrim-lPrim-uPrim-l-f"));
        //55
        ollsMoves.push(this.upsideDownAlg("r-u-u-r-r-uPrim-r-uPrim-rPrim-u-u-f-r-fPrim"));
        //56
        ollsMoves.push(this.upsideDownAlg("l-f-lPrim-u-r-uPrim-rPrim-u-r-uPrim-rPrim-l-fPrim-lPrim"));
        //57
        ollsMoves.push(this.upsideDownAlg("r-lPrim-u-rPrim-uPrim-l-rPrim-f-r-fPrim"));


        return ollsMoves;

    }


    static pllMoves(){
        var plls = [];

        //H perm
        plls.push("r-r-l-l-u-r-r-l-l-u-u-r-r-l-l-u-r-r-l-l-u-u");
        //U perm a
        plls.push(this.upsideDownAlg("r-u-rPrim-uPrim-lPrim-uPrim-l-u-u-r-uPrim-rPrim-uPrim-lPrim-u-l"));
        //U perm b
        plls.push(this.upsideDownAlg("lPrim-uPrim-l-u-r-u-rPrim-uPrim-uPrim-lPrim-u-l-u-r-uPrim-rPrim"));
        //Z perm
        plls.push(this.upsideDownAlg("rPrim-uPrim-r-r-u-r-u-rPrim-uPrim-r-u-r-uPrim-r-uPrim-rPrim"));
        //A perm a
        plls.push(this.upsideDownAlg("f-u-fPrim-lPrim-b-l-fPrim-lPrim-bPrim-l-f-f-uPrim-fPrim"));
        //A perm b
        plls.push(this.upsideDownAlg("r-bPrim-r-f-f-rPrim-b-r-f-f-r-r"));
        //E perm
        plls.push(this.upsideDownAlg("rPrim-u-lPrim-d-d-l-uPrim-r-lPrim-u-rPrim-d-d-r-uPrim-l"));
        //F perm
        plls.push(this.upsideDownAlg("l-uPrim-lPrim-u-l-l-f-u-fPrim-uPrim-lPrim-fPrim-l-f-l-l-u"));
        //G perm a
        plls.push(this.upsideDownAlg("r-u-u-rPrim-uPrim-fPrim-r-u-r-r-uPrim-rPrim-f-r-u-r-r-u-u-rPrim"));
        //G perm b
        plls.push(this.upsideDownAlg("r-r-d-l-l-d-f-f-l-d-rPrim-d-d-l-dPrim-rPrim-u-u"));
        //G perm c
        plls.push(this.upsideDownAlg("lPrim-uPrim-l-u-l-uPrim-fPrim-lPrim-uPrim-lPrim-u-l-f-uPrim-l-u-u-lPrim"));
        //G perm d
        plls.push(this.upsideDownAlg("r-u-u-rPrim-u-bPrim-rPrim-uPrim-r-u-r-b-u-rPrim-uPrim-rPrim-u-r"));
        //J perm a
        plls.push(this.upsideDownAlg("lPrim-u-u-l-u-lPrim-u-u-r-uPrim-l-u-rPrim"));
        //J perm b
        plls.push(this.upsideDownAlg("r-uPrim-l-u-u-rPrim-u-lPrim-uPrim-r-uPrim-l-u-u-rPrim-u-lPrim"));
        //N perm a
        plls.push(this.upsideDownAlg("r-uPrim-l-u-u-rPrim-u-lPrim-r-uPrim-l-u-u-rPrim-u-lPrim"));
        //N perm b
        plls.push(this.upsideDownAlg("rPrim-u-lPrim-u-u-r-uPrim-l-rPrim-u-lPrim-u-u-r-uPrim-l"));
        //R perm a
        plls.push(this.upsideDownAlg("r-u-u-rPrim-uPrim-rPrim-fPrim-r-u-u-r-u-u-rPrim-f-r-uPrim-rPrim-u"));
        //R perm b
        plls.push(this.upsideDownAlg("rPrim-u-u-rPrim-dPrim-r-uPrim-rPrim-d-r-u-r-uPrim-rPrim-uPrim-r"));
        //T perm
        plls.push(this.upsideDownAlg("f-r-uPrim-rPrim-u-r-u-r-r-fPrim-r-u-r-uPrim-rPrim"));
        //V perm
        plls.push(this.upsideDownAlg("rPrim-u-rPrim-uPrim-r-dPrim-rPrim-d-rPrim-u-dPrim-r-r-uPrim-r-r-d-r-r"));
        //Y perm
        plls.push(this.upsideDownAlg("f-f-d-r-r-u-r-r-dPrim-rPrim-uPrim-r-f-f-rPrim-u-r"));
        

        return plls;
    }
}