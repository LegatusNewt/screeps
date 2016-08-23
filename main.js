// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var assignSource = require('assignSource');


module.exports.loop = function () {
    
    
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, {memory: 'harvester'});
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

    // setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 4;
    var minimumNumberOfUpgraders = 3;
    var minimumNumberOfBuilders = 6;
    var minimumNumberOfRepairers = 2;
    var minimumNumberOfWallRepairers = 2;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');

    var energy = Game.spawns.Alpha.room.energyCapacityAvailable;
    var name = undefined;

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Alpha.createCustomCreep(energy, 'harvester');

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = Game.spawns.Alpha.createCustomCreep(
                Game.spawns.Alpha.room.energyAvailable, 'harvester');
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.Alpha.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = Game.spawns.Alpha.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.Alpha.createCustomCreep(energy, 'builder');
    }
    // if not enough wallRepairers
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        name = Game.spawns.Alpha.createCustomCreep(energy, 'wallRepairer');
    }
    else {
        // else try to spawn a builder
        name = Game.spawns.Alpha.createCustomCreep(energy, 'builder');
    }
    
    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }
};