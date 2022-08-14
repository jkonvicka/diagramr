import { Converts } from './Converts.js';


var $ = go.GraphObject.make;


let diagram = null;


export var selectedObject = null;

var nodedata = [
    {
    key: 1,
    name: "BankAccount",
    properties: [
        { name: "owner", type: "String", visibility: "public" },
        { name: "balance", type: "Currency", visibility: "private", default: "0" }
    ],
    methods: [
        { name: "deposit", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },
        { name: "withdraw", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
    ]
    }
];

var linkdata = [
        
];



export class ClassDiagram {
    constructor(divID) {
        this.diagram = null;
        this.divID = divID;
    }

    addNodeProperty(key, property){
        var data = this.diagram.model.findNodeDataForKey(key);
        if (data) {
            this.diagram.model.startTransaction("modified property");
            this.diagram.model.insertArrayItem(data.properties, -1, property);
            // ... maybe modify other properties and/or other data objects
            this.diagram.model.commitTransaction("modified property");
        }
    }

    getData(key){
        var data = this.diagram.model.findNodeDataForKey(key);
        return data;
    }

    render() {
        this.diagram = $(go.Diagram, this.divID,
            {
                "undoManager.isEnabled": true,
                layout: $(go.TreeLayout,
                  { // this only lays out in trees nodes connected by "generalization" links
                    angle: 90,
                    path: go.TreeLayout.PathSource,  // links go from child to parent
                    setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                    setsChildPortSpot: false,  // keep Spot.AllSides
                    // nodes not connected by "generalization" links are laid out horizontally
                    arrangement: go.TreeLayout.ArrangementHorizontal
                  })
            });

            this.diagram.model = new go.GraphLinksModel(
                {
                  copiesArrays: true,
                  copiesArrayObjects: true,
                  nodeDataArray: nodedata,
                  linkDataArray: linkdata
                });
            
                var methodTemplate =
                    $(go.Panel, "Horizontal",
                    // method visibility/access
                    $(go.TextBlock,
                        { isMultiline: false, editable: false, width: 12 },
                        new go.Binding("text", "visibility", Converts.convertVisibility)),
                    // method name, underlined if scope=="class" to indicate static method
                    $(go.TextBlock,
                        { isMultiline: false, editable: true },
                        new go.Binding("text", "name").makeTwoWay(),
                        new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
                    // method parameters
                    $(go.TextBlock, "()",
                        // this does not permit adding/editing/removing of parameters via inplace edits
                        new go.Binding("text", "parameters", function (parr) {
                        var s = "(";
                        for (var i = 0; i < parr.length; i++) {
                            var param = parr[i];
                            if (i > 0) s += ", ";
                            s += param.name + ": " + param.type;
                        }
                        return s + ")";
                        })),
                    // method return type, if any
                    $(go.TextBlock, "",
                        new go.Binding("text", "type", t => t ? ": " : "")),
                    $(go.TextBlock,
                        { isMultiline: false, editable: true },
                        new go.Binding("text", "type").makeTwoWay())
                    );
            
                var propertyTemplate =
                    $(go.Panel, "Horizontal",
                    // property visibility/access
                    $(go.TextBlock,
                        { isMultiline: false, editable: false, width: 12 },
                        new go.Binding("text", "visibility", Converts.convertVisibility)),
                    // property name, underlined if scope=="class" to indicate static property
                    $(go.TextBlock,
                        { isMultiline: false, editable: true },
                        new go.Binding("text", "name").makeTwoWay(),
                        new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
                    // property type, if known
                    $(go.TextBlock, "",
                        new go.Binding("text", "type", t => t ? ": " : "")),
                    $(go.TextBlock,
                        { isMultiline: false, editable: true },
                        new go.Binding("text", "type").makeTwoWay()),
                    // property default value, if any
                    $(go.TextBlock,
                        { isMultiline: false, editable: false },
                        new go.Binding("text", "default", s => s ? " = " + s : ""))
                    );
            
            
                this.diagram.nodeTemplate =
                    $(go.Node, "Auto",
                    {
                        locationSpot: go.Spot.Center,
                        fromSpot: go.Spot.AllSides,
                        toSpot: go.Spot.AllSides
                    },
                    $(go.Shape, { fill: "lightyellow" }),
                    $(go.Panel, "Table",
                        { defaultRowSeparatorStroke: "black" },
                        // header
                        $(go.TextBlock,
                        {
                            row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                            font: "bold 12pt sans-serif",
                            isMultiline: false, editable: true
                        },
                        new go.Binding("text", "name").makeTwoWay()),
                        // properties
                        $(go.TextBlock, "Properties",
                        { row: 1, font: "italic 10pt sans-serif" },
                        new go.Binding("visible", "visible", v => !v).ofObject("PROPERTIES")),
                        $(go.Panel, "Vertical", { name: "PROPERTIES" },
                        new go.Binding("itemArray", "properties"),
                        {
                            row: 1, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: "lightyellow",
                            itemTemplate: propertyTemplate
                        }
                        ),
                        $("PanelExpanderButton", "PROPERTIES",
                        { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
                        new go.Binding("visible", "properties", arr => arr.length > 0)),
                        // methods
                        $(go.TextBlock, "Methods",
                        { row: 2, font: "italic 10pt sans-serif" },
                        new go.Binding("visible", "visible", v => !v).ofObject("METHODS")),
                        $(go.Panel, "Vertical", { name: "METHODS" },
                        new go.Binding("itemArray", "methods"),
                        {
                            row: 2, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: "lightyellow",
                            itemTemplate: methodTemplate
                        }
                        ),
                        $("PanelExpanderButton", "METHODS",
                        { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
                        new go.Binding("visible", "methods", arr => arr.length > 0))
                    )
                    );
            
                this.diagram.linkTemplate =
                    $(go.Link,
                    { routing: go.Link.Orthogonal },
                    new go.Binding("isLayoutPositioned", "relationship", Converts.convertIsTreeLink),
                    $(go.Shape),
                    $(go.Shape, { scale: 1.3, fill: "white" },
                        new go.Binding("fromArrow", "relationship", Converts.convertFromArrow)),
                    $(go.Shape, { scale: 1.3, fill: "white" },
                        new go.Binding("toArrow", "relationship", Converts.convertToArrow))
                    );
        this.setListener();
    }

    setListener()
    {
        this.diagram.addDiagramListener("ObjectSingleClicked",
        function(e) {
        var part = e.subject.part;
        if (!(part instanceof go.Link))
        {
            selectedObject = part.data;
            console.log('Selected object with key: ' + selectedObject.key);
        }
        });

        this.diagram.addDiagramListener("BackgroundSingleClicked",
            function(e) 
            { 
                selectedObject = null;
                console.log('Deselected object');
            });
        
    }
  }