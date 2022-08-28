export class Converts{
    static convertVisibility(v) {
        switch (v) {
        case "public": return "+";
        case "private": return "-";
        case "protected": return "#";
        case "package": return "~";
        default: return v;
        }
    }

    static convertIsTreeLink(r) {
        return r === "generalization";
    }

    static convertFromArrow(r) {
        switch (r) {
        case "generalization": return "";
        default: return "";
        }
    }

    static convertToArrow(r) {
        switch (r) {
        case "generalization":{
            return "Triangle";
        } 
        case "aggregation": return "StretchedDiamond";
        default: return r;
        }
    }
}