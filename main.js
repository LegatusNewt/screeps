// import modules
require('prototype.spawn')();
require('military.spawn')();
var roleHarvester = require('role.harvester');
var roleDefender = require('role.defender');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var assignSource = require('assignSource');

var creepSpawner = require('controller.spawner');
//nochange

module.exports.loop = function () {
    
    
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    
    //var ramparts =_.filter(Game.structures, {structureType: STRUCTURE_RAMPART});
    //var ramp;
    
    //for(var roomName in Game.rooms)
    //{
    //    var room = Game.rooms[roomName];
    //    room.memory.ramparts = ramparts;
    //    for(var i in ramparts)
    //    {
    //        var ramp = ramparts[i];
    //        if(!ramp.memory)
    //        {   
    //            ramp.memory = {};
    //            ramp.memory.full = {};
    //            ramp.memory.full = false;
    //        }
    //    }   
    //}
    
    

    //var harvesters = _.filter(Game.creeps, {memory: 'harvester'});
    //assignSource.run(harvesters);
    
    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if creep is repairer, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        // if creep is wallRepairer, call wallRepairer script
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role =='defender'){
            roleDefender.run(creep);
        }
    }

    
    //var towers = Game.rooms.find(FIND_STRUCTURES, {
    //    filter: (s) => s.structureType == STRUCTURE_TOWER
    //});
    /*for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }*/

    creepSpawner.run();
};