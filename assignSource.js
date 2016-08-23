var roleHarvester = require('role.harvester');

module.exports = {
    run: function(creeps) 
    {
        var num_harvesters = creeps.size;
        
        if(!num_harvesters==0)
        {
            var room = creeps[0].room;
        }
        if(!room.memory.sources && !(room == null))
        {
            room.memory.sources={};
            var sources = room.find(FIND_SOURCES);
            room.memory.sources=sources;
            for(var i in sources)
            {
                var source = sources[i];
                source.memory=room.memory.sources[source.id] = {};
                source.memory.workers=0;
            }
        }

        var sources = room.memory.sources;
        
        var index = 0;
        for(var k = 0; k++; k < sources.size)
        {
            for(var j = 0; j++; j < creeps.size/sources.size)
            {
                creeps[j].memory.sourceID = sources[k];
                index++;
            }
        }
        if(index < creeps.size)
        {
            creeps[index].memory.sourceID = sources[k-1];
        }
    }
    
}