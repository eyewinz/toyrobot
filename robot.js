
const _ = require('lodash');
const DIRECTION = { NORTH : 0, EAST : 1, SOUTH : 2, WEST : 3 };
const DIRNAMES = ['NORTH','EAST','SOUTH','WEST'];
const GRIDSIZE = 5;
const STEP = 1;

var robot = { x : 0, y : 0, face : 0, active : false};

module.exports = { place : place,
  move  : move,
  left  : left,
  right : right,
  report : report,
  currentState  : currentState,
  disable : disable };

  //Places the robot on the gird and activates the robot for valid coordinate and direction
  function place(x, y, face){
    if(DIRNAMES.includes(face)){ //Invalid directions ignored
      var oldX = robot.x, oldY = robot.y;
      if(!(setInRange('x',x) && setInRange('y',y))){ //Old values retained if the new coordinates are not in range
        robot.x = oldX;
        robot.y = oldY;
      }else{
        robot.face = DIRECTION[face];
        robot.active = true;
      }
    }
  }

  //Moves the robot to step times on its current direction
  function move(){
    if(!robot.active) return;
    switch(robot.face){
      case DIRECTION.NORTH:
      setInRange('y', parseInt(robot.y) + STEP);
      break;
      case DIRECTION.EAST:
      setInRange('x', parseInt(robot.x) + STEP);
      break;
      case DIRECTION.SOUTH:
      setInRange('y', parseInt(robot.y) - STEP);
      break;
      case DIRECTION.WEST:
      setInRange('x', parseInt(robot.x) - STEP);
      break;
    }
  }

  //Turns the robot to right in 90 degree
  function right() {
    if(!robot.active) return;
    var newVal = robot.face + 1
    robot.face = newVal % DIRNAMES.length;
  }

  //Turns the robot to left in 90 degree
  function left() {
    if(!robot.active) return;
    var newVal = robot.face - 1;
    robot.face = newVal == -1 ? DIRNAMES.length-1 : newVal;
  }

  //Gives the current status of the robot
  function report(){
    if(!robot.active) return;
    console.log(robot.x +','+robot.y+' '+ DIRNAMES[robot.face]);
  }

  //Returns current state of the robot
  function currentState(){
    return { position : [robot.x, robot.y],
      direction : robot.face,
      active : robot.active
    };
  }

  function disable(){
    robot.active = false;
  }

  //Helper, to set the value of next position with in the allowed grid range
  function setInRange(axis,val){
    if(_.toNumber(val) > -1 && _.toNumber(val) < GRIDSIZE){
      robot[axis] = val;
      return true;
    }else{
      return false;
    }
  }
