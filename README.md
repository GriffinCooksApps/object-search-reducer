# Object Search Reducer

The quick and dirty is that this module is to search big data structures to find relevant information easily.

## Map

The map should somewhat match the structure of the object you are parsing. However it can skip down levels. It will go through each level looking for keys, if it finds a key it will handle that. So one caveat is that you must be mindful of other keys when skipping.  If it finds a key it will no longer search for other keys at the same level or above.

```javascript
   example:
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

res will have 2 objects, key from the trunk branch, and key2 from the bigTrunk branch.

```

### Match Options

* string: Indicates a leaf with a single label.
* Array<string>: indicates a leaf that should be categorized under several labels.
* object: indicates that you are marking a path in the object.  This can be used to get to the right data, incase the structure has several items with the same name, as key in the example.
* object with __ child:  If the object has a child it will create a sub object.  This is useful if you want to do something like loop through nodes but still have the data better filtered below.

### Process order

The parser will go depth first looking for keys.  So if the first top level object has keys in it those will be the first ones to appear.  If you do not want it this way, it is suggested you use the sub elements, as described in ___.  This gives you more control over how things are structure.

## Accessing set values and children

in these examples obj is the result object. and x,y,z are the labels used. # indicates a numeric input. The number next to underscores is to be clear how many exist.  It is for reference only.

* obj.__  [2] : returns the next element in the collection and advances the index.

* obj.REF_ [1] : returns an object that contains the value and labels of the object.

* obj[#] or obj.get(#) : returns the item marked at #, also resets the index to the position after that value.

* obj.x or obj.get('x'): returns the next element in the label collection and advances it's index.  Note the main index is not affected.

* obj.get(['x','y','z']): from the current location it will find the next of any of the supplied labels.

* obj.REf_x or obj.get('REF_x'): returns a reference object to the next item in the label x.

### additional functions

* getLength(label?): if a label is provided it returns the number of elements with that label.  If it is not it returns the total number of elements.

* setIndex(#, label?): sets the index to the identified collection or returns index specific to the

* getIndex(#, label?): gets the index specified.
