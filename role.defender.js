module.exports = {
    // a function to run the logic for this role creep moves to space and becomes
    // stationary
    run: function(creep) {
        // if creep is at a rampart or all ramparts are full and near the spawn
        if (creep.memory.working == true) 
        {
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            
            if(hostiles.length > 0)
                {
                    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS,3)
                    if(targets.length>0)
                        {
                            creep.rangedAttack(targests[0]);
                        }
                }
        }
        //If creep no longer has to move switch state
        else if (creep.memory.working == false) 
        {
            // switch state
            creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_RAMPART)});
            
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.pos.isEqualTo(structure.pos)) 
                {
                    creep.memory.working = true;
                }
                else
                {                                              
                    creep.moveTo(structure);
                }
            }
            else
            {
                creep.memory.working=true;
            }
        }
        else
        {
            creep.memory.working=false;
        }