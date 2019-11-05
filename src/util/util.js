
export function uuidv4 () {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/**
 *  greets https://stackoverflow.com/a/7228322/1004931
 */
export function randomIntFromInterval (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}



export function basename (name) {
  // greetz https://stackoverflow.com/a/29939805/1004931
  return name.substring(name.lastIndexOf('/')+1, name.lastIndexOf('.'));
}


export function extension (filename) {
  return filename.substr(filename.lastIndexOf('.')+1);
}
