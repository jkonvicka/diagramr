
 //  { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
export class NodeMethod{
    constructor(name, visibility, parameters){
        this.name = name;
        this.visibility = visibility;
        this.parameters = parameters;
    }
}