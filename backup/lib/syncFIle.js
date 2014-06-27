'use strict';

var nativeObj = process.binding('natives');
var natives = Object.keys(nativeObj);

module.exports = function syncFile(filePath, cwd, extensions){
  // if filepath begins with /, ./, ~, or ../ it's a path so we load it from the path
  var found = false;

  var firstChar = filePath[0];

  // is this a local require (~)
  if(firstChar === '~'){
    filePath = filePath.replace('~', '.');
    console.log('change local require to absolute path');
    found = true;
  }

  // is this a relative require (.)
  if(firstChar === '.'){
    console.log('change relative require to absolute path');
    found = true;
  }

  // now we have an absolute path to the file
  if(firstChar === '/'){
    console.log('we already have an absolute path so we\'re good');
    found = true;
  }

  if(found) {
    console.log('closer');
    // does the file exist? if so tah dah we're done

    // does the file point directly to a directory?

    // if it does then we first check to see if there's a package.json

    // if there's a package.json we use the main field from that to complete the path

    // if not we or there's no package.json we see if there's an index.ext

    // if there's still nothing here go boom
  }

  // it didn't match the above so now it's either a native module or a userland module

  // if it's a native module we just return the native module
  if(nativeObj[filePath]){
    return require(filePath);
  }

  // it's not a native module so have to use the resolve algorithm to find the appropriate npm module

  // if there's still nothing here go boom

  console.log(filePath);
  console.log(extensions);
};