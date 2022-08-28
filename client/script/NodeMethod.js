
 //  { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
export class NodeMethod{
    constructor(name, type, visibility, parameters){
        this.name = name;
        this.type = type;//type
        this.visibility = visibility;
        this.parameters = parameters;
    }
}