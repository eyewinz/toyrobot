const fs = require('fs');
const _ = require('lodash');
const robot = require('./robot');

const NEWLINE = '\r\n';
const CMD = { PLACE : 'PLACE', MOVE : 'MOVE', LEFT : 'LEFT', RIGHT : 'RIGHT', REPORT : 'REPORT' };

module.exports = { readInputCommands : readInputCommands,
                   play : play };

//Reads Commands from Input File and returns in reverse order
function readInputCommands(filename){
  try{
    var inputData = fs.readFileSync(filename, 'utf8');
    return _.reverse(_.split(inputData, NEWLINE));
  }catch(err){
    console.log('Invalid/Non-Existing Input File');
    return [];
  }
}

//Gets list of commands and executes them on the robot one by one
function play(commandArr){
  robot.disable();
  while((cmd = commandArr.pop()) != null){
    switch(cmd){
      case CMD.MOVE:
        robot.move();
        break;
      case CMD.LEFT:
        robot.left();
        break;
      case CMD.RIGHT:
        robot.right();
        break;
      case CMD.REPORT:
        robot.report();
        break;
      default:
        if(cmd.indexOf(CMD.PLACE) > -1){
          let placeCmd = _.map(_.split(cmd,/[ ,]+/),_.trim);
          if(placeCmd.length == 4)
            robot.place(placeCmd[1],placeCmd[2],placeCmd[3]);
        }
    }
  }
  return robot.currentState();
}

var commandArr = readInputCommands('input.txt');
play(commandArr);
