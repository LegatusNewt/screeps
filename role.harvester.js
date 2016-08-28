var roleBuilder = require('role.builder');
var DANGER_RANGE = 5;

var miningLocations = null; 
module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        //Set up room sources once
        if(miningLocations == null){
            miningLocations = Game.spawns.Alpha.room.find(FIND_SOURCES);
        }
        
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER
                             || s.structureType == STRUCTURE_CONTAINER
                             || s.structureType == STRUCTURE_STORAGE)
                             && s.energy < s.energyCapacity
                
            });

            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            else
            {
                roleBuilder.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = null;
            var hostiles = null;
            var tries = 0;
            
            //Check each source, find closest safe one.
            do{
                console.log(creep.name+": attempting to find source. Tries:"+tries);
                //Find the closest source out of those we haven't tried yet.
                source = creep.pos.findClosestByPath(miningLocations.slice(tries));
                tries = tries + 1;
               
                //If we found a source, make sure it isn't dangerous
                if(source !== null){
                    creep.memory.sourceID = source.id.toString;
                    hostiles = source.pos.findInRange(FIND_HOSTILE_CREEPS, DANGER_RANGE);
                
                    if(hostiles.length > 0){
                        console.log("It's too dangerous near: X: " + source.pos.x.toString() + " Y:"+source.pos.y.toString());
                        console.log("Enemy's Owner: "+hostiles[0].owner.username);
                    }
                }
            }while(hostiles.length > 0 && tries < miningLocations.length)
            

            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
            
            
        }
    }
};