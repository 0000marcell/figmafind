#!/usr/bin/env node

const readstdin = require('readstdin');
const program = require('commander');

/**
* finds a object inside the data
* ex: findObject(data, 'CANVAS', 'Desktop')
*     findObject(data, 'FRAME', 'Home')
*/
function findObject(data, type, name) {
  let result = null;

  if(!data.children)
    return result;

  for (var i = 0; i < data['children'].length; i++) {
    if(data['children'][i].type === type && 
      data['children'][i].name === name) {
      result = data['children'][i];
      break;
    }
  }
  if(result) {
    return result;
  } else if(data['children']) {
    for (var i = 0; i < data['children'].length; i++) {
      result = findObject(data['children'][i], type, name);
      if(result)
        break;
    }
    return result;
  } else {
    return null;
  }
}

program
  .description('find figma object')
  .option('-t, --type <type>', 'type of object to search')
  .option('-n, --name <name>', 'name of the object to search')
  .action(async function(cmd) {
    let data = null;
    data = await readstdin(); 
    data = JSON.parse(data);
    if(!data) {
      console.error('no data was piped to the program!');
      return;
    }

    let result = { document: null, headers: null }
    
    result.document = findObject(data.document, cmd['type'], cmd['name']);
    result.headers = data.headers;

    if(!result.document) {
      console.error('Could find the object');
      return;
    } 

    //console.log(result);

    console.log(JSON.stringify(result));
  });

program.parse(process.argv);
