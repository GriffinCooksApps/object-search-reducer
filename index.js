const goGetItBoy = require('./src/parser');
const parseObjectFactory = require('./src/ParsedObject');


/**
 * Search a graphql result set for items defined by the structure
 * @param {JavaObject} searchObj  This is the GraphQL object you are searching, it can be at any level of the result set.
 * @param {JavaObject} structure This is an object that defines the return structure.  Each section should be set to 'value', 'array' or an substructure.
 * 
 * For details please refer to the readme: 
 * https://github.com/sacridias/object-search-reducer/blob/master/README.md
 */
const objectSearchReducer = (searchObj, structure) => {

  const doggy = parseObjectFactory();
  goGetItBoy(searchObj, structure, doggy, 'root', 'top');
  return doggy;

}

module.exports = objectSearchReducer;