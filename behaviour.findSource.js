require('behaviour3js')
// Creates a new class inheriting from Action
var FindSource = b3.Class(b3.Action);

// Remember to set the name of the node. 
FindSource.prototype.name = 'FindSource';

// Sets the parameters variable to tell editor who they are
FindSource.prototype.parameters = {'milliseconds': 0};

// Override the initialize method, remember to call this method on super
FindSource.prototype.__Action_initialize = FindSource.prototype.initialize;
FindSource.prototype.initialize = function(settings) {
    settings = settings || {};

    this.__Action_initialize();
    this.endTime = settings.milliseconds || 0;
}

// Override the open method, so it can store the time when the node was
// open    
FindSource.prototype.open = function(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
}

// Override the tick method
FindSource.prototype.tick = function(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
    if(Game.creeps.length <= 0){
        console.log("No creeps");
        return b3.FAILURE;
    }
    tick.target.memory.sourceID = tick.target.pos.findClosestByPath(FIND_SOURCES).id;
    console.log("Found source: "+tick.target.memory.sourceID);
    return b3.SUCCESS;
}

module.exports = FindSource;