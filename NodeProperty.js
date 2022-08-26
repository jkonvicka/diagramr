
//name: "balance", type: "Currency", visibility: "private", default: "0"
export class NodeProperty{
    constructor(name, type, visibility, default_value){
        this.name = name;
        this.type = type;
        this.visibility = visibility;
        this.default_value = default_value;
    }
}