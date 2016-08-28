// import modules
require('prototype.spawn')();
require('military.spawn')();

var assignSource = require('assignSource');
var creepSpawner = require('controller.spawner');

//HashMap (Associative Array) of roleName to role Function

var DEFAULT_BEHAVIOUR = 'harvester';
var roleBehaviour = {};
roleBehaviour['harvester'] = require('role.harvester');
roleBehaviour['defender'] =  require('role.defender');
roleBehaviour['upgrader'] =  require('role.upgrader');
roleBehaviour['repairer'] =  require('role.repairer');
roleBehaviour['wallRepairer'] =  require('role.wallRepairer');

module.exports.loop = function () {
    
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];
        var action = roleBehaviour[creep.memory.role]; 
        
        if(typeof action == 'undefined') {
            action = roleBehaviour[DEFAULT_BEHAVIOUR];
        }
        
        action.run(creep);
    }

    creepSpawner.run();
};