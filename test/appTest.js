const assert = require('chai').assert;
const app = require('../app');
const TestInputFile = './test/testInput.txt';

var inputCommands;

describe('App Test', function(){

  before(function() {
    inputCommands = app.readInputCommands(TestInputFile);
  });

  describe('ReadInput TestSuite', function(){
    it('App should return empty array on non-existing input file', function(){
      assert.deepEqual(app.readInputCommands('nonexistingfile.txt') , []);
    });
    it('App should return an array of commands for a valid input file', function(){
      assert.deepEqual(inputCommands , ['REPORT','RIGHT', 'MOVE','LEFT','MOVE','PLACE 1,2,EAST'] );
    });
  });

  describe('Executing Commands on Robot', function(){
    it('Valid set of commands should reach a valid state', function(){
      let curState = app.play(['REPORT','RIGHT', 'MOVE','LEFT','MOVE','PLACE 1,2,EAST']);
      assert.deepEqual(curState.position , [2,3]);
      assert.equal(curState.direction, 1);
      assert.isTrue(curState.active);
    });

    it('Invalid commands should be omitted', function(){
      let curState = app.play(['REPORT','RIGHT','TEST','INVALID', 'PLACE 0, NORTH', 'MOVE','LEFT','MOVE','PLACE 1,2,EAST','0 PLACE EAST']);
      assert.deepEqual(curState.position , [2,3]);
      assert.equal(curState.direction, 1);
      assert.isTrue(curState.active);
    });

  });

});
