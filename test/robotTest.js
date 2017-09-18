const assert = require('chai').assert;
const robot = require('../robot');

describe('Robot Test', function(){

  describe('Robot TestSuite', function(){
    beforeEach(function() {
      robot.disable();
    });

    it('Robot should ignore all commands before place command', function(){
      robot.move();
      assert.isFalse(robot.currentState().active);
      robot.left();
      assert.isFalse(robot.currentState().active);
      robot.right();
      assert.isFalse(robot.currentState().active);
      robot.report();
      assert.isFalse(robot.currentState().active);
      robot.place(0,0,'NORTH');
      assert.isTrue(robot.currentState().active);
      robot.move();
      assert.deepEqual(robot.currentState().position , [0,1]);
      assert.equal(robot.currentState().direction, 0);
    });

    it('Robot should not fall off during place command, a placement that leads to fall should be ignored', function(){
      robot.place(1,2,'NORTH')
      robot.place(5,5,'NORTH'); // Should be ignored
      robot.place(2,5,'NORTH'); // Should be ignored
      robot.place(6,0,'NORTH'); // Should be ignored
      robot.place(-1,4,'NORTH'); // Should be ignored
      assert.deepEqual(robot.currentState().position , [1,2]); //Should remain in its old valid placement
    });

    it('Robot should not get active for an invalid place command (out of range, invalid direction)', function(){
      robot.place(-1,4,'NORTH'); // Should be ignored
      robot.place(0,4,'TEST'); // Should be ignored
      assert.isFalse(robot.currentState().active);
    });

    it('Robot should not fall off during move command, Any move causing robot to fall to be ignored', function(){
      robot.place(0,0,'WEST')
      robot.move(); //Should be ignored as it will make robot fall off
      assert.deepEqual(robot.currentState().position , [0,0]); //robot stands its ground
    });

    it('PLACE command should place the robot on table & set it active', function(){
      robot.place(3,0,'WEST')
      assert.isTrue(robot.currentState().active);
    });

    it('MOVE command should move the robot step(1) time in its current direction', function(){
      robot.place(1,4,'EAST');
      robot.move();
      assert.deepEqual(robot.currentState().position , [2,4]);

      robot.place(3,2,'WEST');
      robot.move();
      assert.deepEqual(robot.currentState().position , [2,2]);

      robot.place(1,1,'SOUTH');
      robot.move();
      assert.deepEqual(robot.currentState().position , [1,0]);

    });

    it('LEFT command should turn robot in its left side to 90 degree', function(){
      robot.place(1,4,'EAST');
      robot.left();
      assert.equal(robot.currentState().direction, 0);
      robot.left();
      assert.equal(robot.currentState().direction, 3);
      robot.left();
      assert.equal(robot.currentState().direction, 2);
      robot.left();
      assert.equal(robot.currentState().direction, 1);
    });

    it('RIGHT command should turn robot in its RIGHT side to 90 degree', function(){
      robot.place(1,4,'EAST');
      robot.right();
      assert.equal(robot.currentState().direction, 2);
      robot.right();
      assert.equal(robot.currentState().direction, 3);
      robot.right();
      assert.equal(robot.currentState().direction, 0);
      robot.right();
      assert.equal(robot.currentState().direction, 1);
    });
  });

});
