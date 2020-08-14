const parseObjectFactor = require('./ParsedObject');


function goGetItBoy(search, struct, doggy, path, structPath){

  Object.keys(search).forEach((branch) =>{
    var branch; //identifies if this is a guided branch or not.
    var labels; //defines it as a node.
  

    if(branch == '_'){
      return; //dealt with in parent.
    }
    else if(struct[branch] == undefined){
      marked = false;
      labels = false;
    }
    else if(typeof struct[branch] == 'string'){
      marked = false;
      labels = [struct[branch]];
    }
    else if(typeof struct[branch] == 'object'){
      if(Array.isArray(struct[branch])){
        marked = false;
        labels =struct[branch];
      }
      else if(struct[branch]._ ){
        marked = true;
        labels = typeof struct[branch]._;
        if(typeof labels == 'string') labels = [labels];
      }
      else{
        marked = true;
        labels = false;  //instruct it to use a sub object for search but not build a node.
      }
    }
    else{
      throw new Error(`Unexpected configuration, please ensure to use only strings arrays and objects, location: ${parent}.${branch}`);
    }

    if(labels != false){
      if(marked){
        var puppy = parseObjectFactor();
        doggy._$set(labels, puppy);
        goGetItBoy(search[branch], struct[branch], puppy, `${path}.${branch}`, `${structPath}-${branch}`);
      }
      else doggy._$set(labels, search[branch]);
    }
    else if(typeof search[branch] == 'object' && !Array.isArray(search[branch])){
      var nStructPath = marked? `${structPath}-${branch}`:structPath;
      goGetItBoy(search[branch], marked? struct[branch]:struct,doggy,`${path}.${branch}`, nStructPath);
    }
    //else nothing left to search here.
  });

}


module.exports = goGetItBoy;