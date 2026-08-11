const whatBrowser = navigator.userAgent; 

let firefox = false;

if (whatBrowser.includes("Firefox")) {
    firefox = true;
}

let displayArrows = new Array();
let displaySource = new Array();
let displayDest = new Array();

let arrowArray = new Array();
let sourceArray = new Array();
let destArray = new Array();

function addDisplayArrow(parentId, childId) {
    let arrow = null;
    
    if (firefox) {
        arrow = arrowLine(parentId, childId, 
            { color: 'black' , 
                curvature : 0, 
                thickness: 1,
                sourcePosition: "bottomCenter", 
                destinationPosition: "topCenter"
            }
        );
    } else {
        let parentElement = document.getElementById(parentId.substring(1));
        let childElement = document.getElementById(childId.substring(1));

        arrow = new LeaderLine(parentElement, childElement);
        arrow.path = "straight";
        arrow.startSocket = "bottom";
        arrow.endSocket = "top";
        arrow.color = "black";
        arrow.size = 2;
    }

    displayArrows.push(arrow);
    displaySource.push(parentId);
    displayDest.push(childId);
};

function addArrow(parentId, childId) {
    const arrow = arrowLine(parentId, childId, 
        { color: 'black' , 
            curvature : 0, 
            thickness: 1,
            sourcePosition: "bottomCenter", 
            destinationPosition: "topCenter"
        }
    )

    arrowArray.push(arrow);
    sourceArray.push(parentId);
    destArray.push(childId);
};

// given parent, left child = 2*p + 1, right child = 2*p + 2
// get number by .substring(indexOf("e") + 1)
// parent = Math.floor((child - 1) / 2)

window.addEventListener('load', function() {
    addDisplayArrow('#d1-root', '#d1-node1');
    addDisplayArrow('#d1-root', '#d1-node2');
    addDisplayArrow('#d1-node1', '#d1-node3-1');
    addDisplayArrow('#d1-node2', '#d1-node4-2');
    addDisplayArrow('#d1-node4-2', '#d1-node5-4');
    addDisplayArrow('#d1-node4-2', '#d1-node6-4');
    addDisplayArrow('#d1-node2', '#d1-node7-2');
});

window.addEventListener('resize', function() {
    if (firefox) {
        for (let i = 0; i < arrowArray.length; i++) {
            arrowArray[i].update({source: sourceArray[i], destination: destArray[i]});
        }

        for (let i = 0; i < displayArrows.length; i++) {
            console.log("resize");
            console.log(DOMPurify.sanitize("h1"));
            displayArrows[i].update({source: displaySource[i], destination: displayDest[i]});
        }
    }
});