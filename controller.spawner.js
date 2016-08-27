var calculateSpawn = {
    run: function() {
    // setup some minimum numbers for different roles
        var minimumNumberOfHarvesters = 4;
        var minimumNumberOfUpgraders = 3;
        var minimumNumberOfBuilders = 3;
        var minimumNumberOfRepairers = 1;
        var minimumNumberOfWallRepairers = 1;
        var minimumNumberOfDefenders= 4;

        // count the number of creeps alive for each role
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a harvester
        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
        var numberOfDefenders = _.sum(Game.creeps, (c) => c.memory.role =='defender');

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
        else if(numberOfDefenders < minimumNumberOfDefenders){
            name = Game.spawns.Alpha.createMilitaryCreep(energy,'defender');
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
    }
};