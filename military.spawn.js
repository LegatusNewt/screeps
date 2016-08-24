module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createMilitaryCreep =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            if(roleName = 'defender')
                {
                    //420 YOLO Swaggins
                    if(energy > 420)
                        {
                            var body = [RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,TOUGH,TOUGH];
                            
                            return this.createCreep(body,undefined,{role:rolename,working:false});
                        }
                }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };
};