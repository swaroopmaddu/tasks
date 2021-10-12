// copyIdl.js
const fs = require('fs');
const idl = require('./target/idl/tasks.json');

fs.writeFileSync('./app/src/idl.json', JSON.stringify(idl));