module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createMilitaryCreep =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            if(roleName = 'defender')
                {
                    //420 YOLO Swaggins
                    if(energy > 630)
                        {
                            var body = [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,TOUGH,TOUGH,TOUGH];
                            
                            return this.createCreep(body,undefined,{role:roleName,working:false});
                        }
                }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
};