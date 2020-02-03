#!/usr/bin/env node

const fs = require('fs'); //gets access to the file system
const util = require('util');
const chalk = require('chalk');
const path = require('path');

//Method #2 
// const lstat = util.promisify(fs.lstat);

//Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, fileNames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = fileNames.map(fileName => {
    return lstat(path.join(targetDir, fileName));
  });

  const allStats = await Promise.all(statPromises);

  for(let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.cyanBright(fileNames[index]));
    } else {
      console.log(chalk.greenBright(fileNames[index]));
    }
  }
  
});

//Method #1
// const lstat = (fileName) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(fileName, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     })
//   });
// };