import { ClassDiagram, selectedObject } from './ClassDiagram.js';

var classDiagram = null;

export function init(divID){
    classDiagram = new ClassDiagram(divID);
    classDiagram.render();
    

}

init('diagramDiv');


function flash(model) {
    alert(model);
    var data = model.findNodeDataForKey(selectedObject.key);
    if (data) {
        model.startTransaction("modified property");
        model.set(data, "name", 'hello');
        // ... maybe modify other properties and/or other data objects
        model.commitTransaction("modified property");
    }
}

function nodeSelectedInfo()
{
    if(selectedObject == null)
    {
        console.error('Node not selected');
        return false;
    }
    return true;
}



//HOOKS 

document.getElementById("AddProperty").onclick = function(){
    if(nodeSelectedInfo())
    {
        classDiagram.addNodeProperty(selectedObject.key, { name: "AA", type: "String", visibility: "public" });
        console.log('Added property')
    }
    
};

document.getElementById("ShowProperties").onclick = function(){
    if(nodeSelectedInfo())
    {
        var properties = classDiagram.getData(selectedObject.key).properties;
        //alert(JSON.stringify(properties));
        console.log(properties);
    }
};