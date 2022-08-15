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
        var propertyName = document.getElementById('propertyName').value;
        if(propertyName == ''){
            showError('Property name is null or empty', true);
            return;
        }
        var propertyDefault = document.getElementById('propertyDefault').value;
        var propertyVisibility = document.getElementById('flexRadioPropertyPrivate').checked ?
                                    'private' : 'public';
        var propertyDataTypeSelector = document.getElementById('propertyDataType');
        var propertyDataType = propertyDataTypeSelector.options[propertyDataTypeSelector.selectedIndex].value;
        classDiagram.addNodeProperty(selectedObject.key, 
            { 
                name: propertyName,
                type: propertyDataType,
                visibility: propertyVisibility,
                default: propertyDefault
            });
        console.log('Added property')
    }else{
        showError('Please select node', false);
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
        showError('Please select node', false);
    }
};


function showError(errorMessage, logError){

    if(logError){
        console.error(errorMessage);
    }
    var message = document.createElement("div");
    message.innerHTML = '<div class="alert alert-danger alert-dismissible fade show " role="alert">' +
                            errorMessage +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">' +
                        '</button></div>';

    var errorContainer = document.getElementById("error-container-div");
    errorContainer.appendChild(message);
}
