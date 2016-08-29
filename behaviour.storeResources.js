require('behaviour3js')
// Creates a new class inheriting from Action
var StoreResources = b3.Class(b3.Action);

// Remember to set the name of the node. 
StoreResources.prototype.name = 'StoreResources';

// Sets the parameters variable to tell editor who they are
StoreResources.prototype.parameters = {'milliseconds': 0};

// Override the initialize method, remember to call this method on super
StoreResources.prototype.__Action_initialize = StoreResources.prototype.initialize;
StoreResources.prototype.initialize = function(settings) {
    settings = settings || {};

    this.__Action_initialize();
    this.endTime = settings.milliseconds || 0;
}

// Override the open method, so it can store the time when the node was
// open    
StoreResources.prototype.open = function(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
}

// Override the tick method
StoreResources.prototype.tick = function(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
    
    var structure = tick.target.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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
        var transferResult = tick.target.transfer(structure, RESOURCE_ENERGY);
        if (transferResult == ERR_NOT_IN_RANGE) {
            // move towards it
            console.log(tick.target.name+": Moving to energy store..");
            tick.target.moveTo(structure);
            return b3.RUNNING;
        }else{
            console.log(tick.target.name+": Transfered energy");
            return b3.SUCCESS;
        }
    }
            
    return b3.FAILURE;
}

module.exports = StoreResources;