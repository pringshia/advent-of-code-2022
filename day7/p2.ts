const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter(l => l !== "");

function discoverFS(lines) {
  let rootFS = {"/": {} };
  let currPath = ["/"];

  for (let line of lines) {
    if (line.startsWith("$ ")) {
      // is input
      let input = line.replace("$ ", "").trim();
      let [cmd, ...args] = input.split(" ");
      if (cmd === "cd") {
        if (args[0] === "/") currPath = ["/"];
        else if (args[0] === "..") currPath.pop();
        else currPath.push(args[0]);
      }
      else if (cmd === "ls") {
        continue;
      }
    } else {
      // is output for ls
      let [info, name] = line.split(" ");
      let ref = rootFS;
      for (let subpath of currPath) {
        if (!(subpath in ref)) ref[subpath] = {};
        ref = ref[subpath];
      }
      if (info === "dir") {
        if (!ref[name])
          ref[name] = {};
      } else {
        ref[name] = info;
      }
    }
  }
  return rootFS;
}

function getFolderSize(fname, folder, journal) {
  return Object.entries(folder).map(([name, value]) => {
    if (typeof value === "object") {
      let fullPath = fname+name+"/";
      const size = getFolderSize(fullPath, value, journal);
      // journal
      journal[fullPath] = size;  
      return size;
    } else return parseInt(value, 10);
  }).reduce((partial, v) => partial + v, 0);
}

const fs = discoverFS(lines);
let journal = {};
const dirSizes = getFolderSize("", fs, journal);

const SPACE_ALLOWED = 40000000;
const remaining = journal["//"] - SPACE_ALLOWED;

const result = Object.values(journal).filter(val => val >= remaining).sort((a, b) => a - b)[0];

console.log("RESULT:", result);
