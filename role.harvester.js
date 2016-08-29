require('behaviour3js');
var roleBehaviour = {};
roleBehaviour['FindSource'] = require('behaviour.findSource');
roleBehaviour['Harvest'] = require('behaviour.harvest');
roleBehaviour['StoreResources'] = require('behaviour.storeResources');

var behaviourTree = new b3.BehaviorTree();
behaviourTree.load({
    "title": "A Behavior Tree",
    "description": "",
    "root": "ea489313-13ca-4c00-8190-ddd363222d8b",
    "display": {
        "camera_x": 1178,
        "camera_y": 492.5,
        "camera_z": 1,
        "x": -576,
        "y": -176
    },
    "properties": {},
    "nodes": {
        "ea489313-13ca-4c00-8190-ddd363222d8b": {
            "id": "ea489313-13ca-4c00-8190-ddd363222d8b",
            "name": "MemSequence",
            "title": "Harvest Sequence",
            "description": "",
            "display": {
                "x": -368,
                "y": -176
            },
            "parameters": {},
            "properties": {},
            "children": [
                "0dbc2fbb-07fd-430d-8081-dbf3718e28db",
                "ff6435ae-45fb-432c-8701-188529f23b73",
                "851cb979-c2f7-495f-8020-8a43cd5923c2"
            ]
        },
        "0dbc2fbb-07fd-430d-8081-dbf3718e28db": {
            "id": "0dbc2fbb-07fd-430d-8081-dbf3718e28db",
            "name": "FindSource",
            "title": "Find Source",
            "description": "",
            "display": {
                "x": -160,
                "y": -240
            },
            "parameters": {},
            "properties": {}
        },
        "ff6435ae-45fb-432c-8701-188529f23b73": {
            "id": "ff6435ae-45fb-432c-8701-188529f23b73",
            "name": "Harvest",
            "title": "Harvest",
            "description": "",
            "display": {
                "x": -160,
                "y": -176
            },
            "parameters": {},
            "properties": {}
        },
        "851cb979-c2f7-495f-8020-8a43cd5923c2": {
            "id": "851cb979-c2f7-495f-8020-8a43cd5923c2",
            "name": "StoreResources",
            "title": "Store Resources",
            "description": "",
            "display": {
                "x": -160,
                "y": -112
            },
            "parameters": {},
            "properties": {}
        }
    },
    "custom_nodes": [
        {
            "name": "FindSource",
            "title": "Find Source",
            "category": "action"
        },
        {
            "name": "EnemiesNear",
            "title": "Enemies Nearby",
            "category": "condition"
        },
        {
            "name": "MoveTo",
            "title": "Move To",
            "category": "action"
        },
        {
            "name": "Harvest",
            "title": "Harvest",
            "category": "action"
        },
        {
            "name": "StoreResources",
            "title": "Store Resources",
            "category": "action"
        }
    ]
}, roleBehaviour);
module.exports = behaviourTree;