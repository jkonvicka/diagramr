import { NodeProperty } from "./NodeProperty.js";
import { NodeMethod } from "./NodeMethod.js";

export class Node{
    constructor(key, name){
        this.key = key;
        this.name = name;
        this.properties = [];
        this.methods = [];
    }

    addProperty(property){
        this.properties.push(property);
    }

    addProperty(name, type, visibility, default_value){
        this.properties.push(new NodeProperty(name, type, visibility, default_value));
    }

    addMethod(name, type, visibility, parameters){
        this.methods.push(new NodeMethod(name, type, visibility, parameters));
    }
}