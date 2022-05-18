const faker = require('faker');

const newID = () => {
  return faker.datatype.uuid();
}

module.exports = { newID };
