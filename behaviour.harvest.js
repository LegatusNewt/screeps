require('behaviour3js')
// Creates a new class inheriting from Action
var Harvest = b3.Class(b3.Action);

// Remember to set the name of the node. 
Harvest.prototype.name = 'Harvest';

// Sets the parameters variable to tell editor who they are
Harvest.prototype.parameters = {'milliseconds': 0};

// Override the initialize method, remember to call this method on super
Harvest.prototype.__Action_initialize = Harvest.prototype.initialize;
Harvest.prototype.initialize = function(settings) {
    settings = settings || {};

    this.__Action_initialize();
    this.endTime = settings.milliseconds || 0;
}

// Override the open method, so it can store the time when the node was
// open    
Harvest.prototype.open = function(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
}

// Override the tick method
Harvest.prototype.tick = function(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
    
    var source = Game.getObjectById(tick.target.memory.sourceID);
    
    var harvestResult = tick.target.harvest(source);
    if(tick.target.carry.energy >= tick.target.carryCapacity){
            return b3.SUCCESS;
    }
    else if(harvestResult == ERR_NOT_IN_RANGE){
        console.log("Trying to move to source with ID: "+tick.target.memory.sourceID);
        tick.target.moveTo(source);
        return b3.RUNNING;
    }
    else if(harvestResult == OK){
        console.log("Harvesting...");
        return b3.RUNNING;
    }
    console.log(tick.target.name+": Harvest failed..");
    return b3.FAILURE;
}

module.exports = Harvest;