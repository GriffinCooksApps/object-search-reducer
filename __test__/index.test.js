const objectSearchReducer = require('../index.js');

const obj = {
  top:{
    trunk:{
      bigBranch1:{
        medBranch1:{
          small1:{
            key: 'found me'
          }
        }
      }
    },
    bigTrunk:{
      key: 'you should not have found me',
      key2: 'you found me too'
    }
  }
}

const fido = {
  trunk:{
    key: ['key','unlocker']
  },
  bigTrunk:{
    key2: ['key2', 'unlocker']
  }
}


const res = objectSearchReducer(obj, fido);
console.log(res._$items[0]);
console.log(res._$items[1]);
console.log(res);
console.log(res[1]);