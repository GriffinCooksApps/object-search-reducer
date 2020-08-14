
const factory = require("../src/ParsedObject");


describe("_set && set", () => {
   test("It should setup the proper object mapping", () => {
      var a = factory();
      a._$set(
         ['test', 'test2', 'test3'], 'test away' 
      );
      a._$set(
         ['test', 'test4'], 'wonderful'
      );


      expect(a._$items.length).toEqual(2);
      expect(a._$map.size).toEqual(4);
      expect(a._$map.get('test')[0].index).toEqual(0);

      a.bubbles = 'so many';
      expect(a._$items.length).toEqual(3);
      expect(a._$map.size).toEqual(5);
      expect(a._$map.get('bubbles')[0].value).toEqual('so many');
   })
});

describe(`get functionalities`, () =>{

   test("obj.x it should return first,next, from the list", ()=>{
      var a = factory();
      a.apple = 'green';
      a.apple = 'red';

      expect(a.apple).toEqual('green');
      expect(a.apple).toEqual('red');
      expect(a.apple).toEqual(undefined);
   });


});


 