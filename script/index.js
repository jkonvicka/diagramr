import { ClassDiagram, selectedObject, reloadListIntoHtmlSelect } from './ClassDiagram.js';
import { Node } from './Node.js';

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
        console.warn('Node not selected');
        showMessage('Please select node', false, 'alert-dark');
        return false;
    }
    return true;
}



//HOOKS 
document.getElementById("GenerateCode").onclick = function(){
    console.log("EXPORTING JSON");
    var diagramJson = classDiagram.getJson();
    console.log(diagramJson);
};

document.getElementById("AddProperty").onclick = function(){
    if(nodeSelectedInfo())
    {
        var propertyName = document.getElementById('propertyName').value;
        if(propertyName == ''){
            showMessage('Property name is null or empty', true);
            return;
        }
        var propertyDefault = document.getElementById('propertyDefault').value;
        var propertyVisibility = document.getElementById('flexRadioPropertyPrivate').checked ?
                                    'private' : 'public';
        var propertyDataTypeSelector = document.getElementById('propertyDataType');
        var propertyDataType = propertyDataTypeSelector.options[propertyDataTypeSelector.selectedIndex].value;
        if (selectedObject.properties.some(e => e.name === propertyName)) {
            showMessage('This node already contains property with that name', true, 'alert-warning');
            return;
        }
        classDiagram.addNodeProperty(selectedObject.key, 
            { 
                name: propertyName,
                type: propertyDataType,
                visibility: propertyVisibility,
                default: propertyDefault
            });
        reloadListIntoHtmlSelect('selectedNodePropertyList', selectedObject.properties);
        console.log('Added property')
        showMessage('Property added', false, 'alert-success');
    }else{
        //showMessage('Please select node', false, 'alert-dark');
    }
    
};

document.getElementById("RemoveProperty").onclick = function(){
    if(nodeSelectedInfo())
    {
        var propertyNameListSelector = document.getElementById('selectedNodePropertyList');
        var propertyId = propertyNameListSelector.options[propertyNameListSelector.selectedIndex].value;
        classDiagram.removeNodeProperty(selectedObject.key, parseInt(propertyId));
        reloadListIntoHtmlSelect('selectedNodePropertyList', selectedObject.properties);
        console.log('Removed property');
        showMessage('Property removed', false, 'alert-success');
    }else{
        //showMessage('Please select node', false, 'alert-dark');
    }
    
};

document.getElementById("ShowProperties").onclick = function(){
    if(nodeSelectedInfo())
    {
        var properties = classDiagram.getData(selectedObject.key).properties;
        //alert(JSON.stringify(properties));
        console.log(properties);
    }
    else{
        //showMessage('Please select node', false);
    }
};

document.getElementById("AddNode").onclick = function(){

    var className = document.getElementById('className').value;
    if(className == ''){
        showMessage('Class name is null or empty', true);
        return;
    }

    if (classDiagram.getModel().nodeDataArray.some(e => e.name === className)) {
        showMessage('This diagram already contains node with that name', true, 'alert-warning');
        return;
    }

    classDiagram.addNode(className);
  
};

document.getElementById("AddLink").onclick = function(){
    var classFromListSelector = document.getElementById('classesFrom');
    var classFrom = classFromListSelector.options[classFromListSelector.selectedIndex].value;
    var relationListSelector = document.getElementById('relations');
    var relation = relationListSelector.options[relationListSelector.selectedIndex].value;
    var classToListSelector = document.getElementById('classesTo');
    var classTo = classToListSelector.options[classToListSelector.selectedIndex].value;
    classDiagram.addLink(parseInt(classFrom)+1, parseInt(classTo)+1, relation);
};


function showMessage(errorMessage, logError, type = 'alert-danger'){

    if(logError){
        console.error(errorMessage);
    }
    var message = document.createElement("div");
    message.innerHTML = '<div class="alert ' + type + ' alert-dismissible fade show " role="alert">' +
                            errorMessage +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">' +
                        '</button></div>';

    var errorContainer = document.getElementById("error-container-div");
    errorContainer.appendChild(message);
}


