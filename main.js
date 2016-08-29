// import modules
require('behaviour3js');
var bTree = require('role.harvester');
var spawner = require('controller.spawner');
var blackboards = {};

module.exports.loop = function () {
    
    
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
			delete blackboards[name];
        }
    }
    
    for(let name in Game.creeps){
        var c = Game.creeps[name];
        var board = blackboards[name];
        if(board == null || typeof board == 'undefined'){
            blackboards[name] = new b3.Blackboard();
            board = blackboards[name];
        }
        
        bTree.tick(c,board);
    }
    
    spawner.run();
};