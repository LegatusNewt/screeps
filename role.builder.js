var roleRepairer = require('role.repairer');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.pos.isNearTo(source))
                {
                    creep.moveTo(constructionSite);    
                }
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                //repair ramparts or become generic repairer
                var upgradeTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                     filter: function(object) {
                       return object.structureType == STRUCTURE_RAMPART && object.hits < 1000;
                }
                });
                if(upgradeTarget != null)
                {
                    if (creep.repair(upgradeTarget) == ERR_NOT_IN_RANGE) 
                    {
                    // move towards the constructionSite
                        creep.moveTo(upgradeTarget);
                    }
                }   
                else
                {
                    roleRepairer.run(creep);
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};