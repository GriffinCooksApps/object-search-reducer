

class ParsedObject {

  constructor() {
    this._$items = [];
    this._$map = new Map();
    this._$mapIndex = new Map();
    this._$index = 0;
  }

  _$items;
  _$map;
  _$mapIndex;
  _$index;

  _$set(labels, value) {
    if (!Array.isArray(labels)) {
      labels = [labels];
    }
    var index = this._$items.length;

    const obj = {
      index,
      labels,
      value
    }

    this._$items.push(obj);

    labels.forEach((label) => {
      if (!this._$map.has(label)) {
        this._$map.set(label, []);
        this._$mapIndex.set(label, 0);
      }
      this._$map.get(label).push(obj);
    });
  }

  _$setIndex(num, label) {
    if (label) {
      if (this._$mapIndex.has(label)) {
        this._$mapIndex.set(label, this._$mapIndex.get(label) + 1);
      }
      else {
        throw new Error(`1Label ${label} does not appear to exist`);
      }
    }
    else {
      this._$index = num;
    }
  }
  _$getIndex(label) {
    if (label) {
      if (this._$mapIndex.has(label)){
        return this._$mapIndex.get(label)
      }
    }
    else return this._$index;
  }
  _$getLength(label) {
    if (label == undefined) {
      return this._$items.length;
    }
    else if (this._$map.has(label)) return this._$map.get(label).length;
    else return undefined;
  }

  _$getNumericIndex(label) {
    var key = Number.parseInt(label);
    this._$index = key + 1;
    if (this._$items.length > key) {
      return this._$items[key].value;
    }
    else return undefined;
  }

  _$getNextIndex(ref) {
    if (this._$index >= this._$items.length) return undefined;
    const obj = this._$items[this._$index++];
    if (ref) return obj;
    else return obj.value;
  }

  _$get(label) {

    if (label == '_') return this._$getNextIndex(false);
    if (label == 'REF_') return this._$getNextIndex(true);

    if (!isNaN(label)) return this._$getNumericIndex(label);

    if (Array.isArray(label)) return this._$getMultiLabel(label);

    if (label.substring(0, 4) == 'REF_') {
      return this._$getReference(label.substring(4));
    }

    const obj = this._$getReference(label);
    if (typeof obj?.value !== 'undefined') return obj.value;
    else return undefined;
  }

  _$getLabelRef(label) {
    var index = this._$mapIndex.get(label);
    if (index >= this._$map.get(label).length) {
      return undefined;
    }
    const obj = this._$map.get(label)[index];
    this._$mapIndex.set(label, index + 1);
    return obj;
  }

  _$getMultiLabel(label) {
    for (; this._$index < this._$items.length; this._$index++) {
      var obj = this._$items[this._$index];
      for (var i = 0; i < label.length; i++) {
        if (obj.labels.includes(label[i])) {
          if (label[i].substring(0, 4) == 'REF_') {
            return obj;
          }
          else {
            return obj.value;
          }
        }
      }
    }
  }

  _$getReference(label) {

    if (label == '_') {
      return this._$getIndexRef();
    }

    if (!this._$map.has(label)) {
      return undefined;
    }

    return this._$getLabelRef(label);

  }

  _$getIndex() {
    const obj = this._$getIndexRef();
    if (typeof obj?.value === 'undefined') {
      return undefined;
    }
  }

  _$getIndexRef() {
    if (this._$index >= this._$items.length - 1) {
      return undefined;
    }
    const obj = this._$items[$this_$index++];
    return obj;
  }

}

const handler = {
  set: (target, key, value) => {
    if (key.substring(0, 2) === '_$') return true;
    target._$set(key, value);
  },

  get: (target, key) => {
    if (key == 'get') return target._$get;
    if (key == 'setIndex') return target._$setIndex;
    if (key == 'getIndex') return target._$getIndex;
    if (key == 'getLength') return target._$getLength;
    if (key.substring(0, 2) == '_$') return target[key];
    else return target._$get(key);
  }

}

const parseObjectFactor = () => {
  const parsed = new ParsedObject();

  return new Proxy(parsed, handler);
}

module.exports = parseObjectFactor;