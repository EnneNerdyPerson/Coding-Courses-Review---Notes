let visualDiv = document.getElementById("visualDiv");

let linkTypeButton = document.getElementById("type");
let addMethodButton = document.getElementById("addMethod");
let deleteMethodButton = document.getElementById("deleteMethod");
let getMethodButton = document.getElementById("getMethod");

let deleteContainer = document.getElementById("deleteContainer");
let getContainer = document.getElementById("getContainer");

let addButton = document.getElementById("addButton");
let addInput = document.getElementById("addInput");

let deleteButton = document.getElementById("deleteButton");
let deleteInput = document.getElementById("deleteInput");

let getButton = document.getElementById("getButton");
let getInput = document.getElementById("getInput");

let message = document.getElementById("message");

let valueArray = new Array();
let nodeArray = new Array();
let divArray = new Array();
let doubleLinkArray = new Array();

let numNodes = 0;

let doubleLinks = false;
let addMethod = "front";
let deleteMethod = "front";
let getMethod = "front";

function makeNewNode(value, index) {
    valueArray.splice(index, 0, value);

    let node = document.createElement("div");
    node.classList.add("node");
    node.innerText = value;

    let div = document.createElement("div");
    div.classList.add("flex-col-container");

    let rightArrowContainer = document.createElement("div");
    rightArrowContainer.classList.add("arrow-container");

    let righArrowBody = document.createElement("div");
    righArrowBody.classList.add("arrow-body");
    let rightArrowHead = document.createElement("div");
    rightArrowHead.classList.add("right-arrow-head");

    rightArrowContainer.append(righArrowBody);
    rightArrowContainer.append(rightArrowHead);

    let leftArrowContainer = document.createElement("div");
    leftArrowContainer.classList.add("arrow-container");

    if (!doubleLinks || numNodes == index) {
        leftArrowContainer.classList.add("hidden");
    }

    let leftArrowBody = document.createElement("div");
    leftArrowBody.classList.add("arrow-body");
    let leftArrowHead = document.createElement("div");
    leftArrowHead.classList.add("left-arrow-head");

    leftArrowContainer.append(leftArrowHead);
    leftArrowContainer.append(leftArrowBody);

    div.append(rightArrowContainer);
    div.append(leftArrowContainer);

    if (numNodes == 0) {
        let nullNode = document.createElement("p");
        nullNode.classList.add("null");
        nullNode.innerText = "NULL";
        nullNode.id = "null";

        visualDiv.append(nullNode);
    }

    if (numNodes == index) {
        if (numNodes > 0 && doubleLinks) {
            doubleLinkArray[index - 1].classList.toggle("hidden");
        }
        
        let nullNode = document.getElementById("null");

        nullNode.before(node);
        nullNode.before(div);

        nodeArray.push(node);
        divArray.push(div);
        doubleLinkArray.push(leftArrowContainer);
    } else if (index == 0) {
        let beginning = nodeArray[0];
        beginning.before(node);
        beginning.before(div);

        nodeArray.splice(index, 0, node);
        divArray.splice(index, 0, div);
        doubleLinkArray.splice(index, 0, leftArrowContainer);
    } else {
        console.log(index);
        let preDiv = divArray[index - 1];
        preDiv.after(div);
        preDiv.after(node);

        nodeArray.splice(index, 0, node);
        divArray.splice(index, 0, div);
        doubleLinkArray.splice(index, 0, leftArrowContainer);
    }

    numNodes++;
}

function deleteNode(index) {
    let node = nodeArray[index];
    let div = divArray[index];

    valueArray.splice(index, 1);
    nodeArray.splice(index, 1);
    divArray.splice(index, 1);
    doubleLinkArray.splice(index, 1);

    if (index == numNodes - 1 && doubleLinks) {
        doubleLinkArray[index - 1].classList.toggle("hidden");
    }

    node.remove();
    div.remove();

    numNodes--;

    if (numNodes == 0) {
        let nullElement = document.getElementById("null");
        nullElement.remove();
    }
}

function changeMethod(type, button) {
    if (type == "add") {
        if (addMethod == "front") {
            addMethod = "end";
        } else if (addMethod == "end") {
            addMethod = "index";
        } else {
            addMethod = "front";
        }
    } else if (type == "delete") {
        if (deleteMethod == "front") {
            deleteMethod = "end";
        } else if (deleteMethod == "end") {
            deleteMethod = "index";
        } else {
            deleteMethod = "front";
        }
    } else if (type == "get") {
        if (getMethod == "front") {
            getMethod = "end";
        } else if (getMethod == "end") {
            getMethod = "index";
        } else {
            getMethod = "front";
        }
    }

    if (button.innerHTML == "Front") {
        button.innerHTML = "End";
    } else if (button.innerHTML == "End") {
        button.innerHTML = "Index";
    } else {
        button.innerHTML = "Front";
    }

    if (type == "delete" && button.innerHTML == "Index") {
        deleteContainer.classList.toggle("hidden");
    } else if (type == "get" && button.innerHTML == "Index") {
        getContainer.classList.toggle("hidden");
    }

    if (type == "delete" && button.innerHTML == "Front") {
        deleteContainer.classList.toggle("hidden");
    } else if (type == "get" && button.innerHTML == "Front") {
        getContainer.classList.toggle("hidden");
    }
}

addButton.addEventListener("click", function() {
    let addValue = addInput.value;
    addInput.value = "";

    if (addValue.indexOf(",") >= 0) {
        let array = addValue.split(",");

        if (addMethod == "index") {
            if (array.length % 2 == 0) {
                for (let i = 0; i < array.length; i = i + 2) {
                    let index = array[i + 1];
                    makeNewNode(array[i], index);
                    // makeNewNode(index);
                }
            }
        } else {
            let index = -1;
    
            for (let i = 0; i < array.length; i++) {
                if (addMethod == "end") {
                    index = numNodes;
                } else if (addMethod == "front") {
                    index = 0;
                }

                makeNewNode(array[i], index);
            }
        }
    } else {
        if (addMethod == "end") {
            makeNewNode(addValue, numNodes);
        } else if (addMethod == "front") {
            makeNewNode(addValue, 0);
        }
    }
});

deleteButton.addEventListener("click", function() {
    let deleteValue = deleteInput.value;
    deleteInput.value = "";

    if (deleteMethod == "index") {
        let array = deleteValue.split(",");

        for (let i = 0; i < array.length; i++) {
            deleteNode(parseInt(array[i]));
        }
    } else {
        if (deleteMethod == "end") {
            deleteNode(numNodes - 1);
        } else if (deleteMethod == "front") {
            deleteNode(0);
        }
    }
});

getButton.addEventListener("click", function() {
    let getValue = getInput.value;
    getInput.value = "";

    let messageValue = "Items Retrieved: "

    if (getValue.indexOf(",") >= 0) {
        let array = getValue.split(",");

        for (let i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                messageValue += valueArray[parseInt(array[i])];
            } else {
                messageValue += valueArray[parseInt(array[i])] + ", ";
            }
        }
    } else {
        if (getMethod == "end") {
            messageValue += valueArray[numNodes - 1];
        } else if (getMethod == "front") {
            messageValue += valueArray[0];
        } else if (getMethod == "index") {
            messageValue += valueArray[getValue];
        }
    }

    message.innerText = messageValue;
});

linkTypeButton.addEventListener("click", function() {
    if (linkTypeButton.innerText == "Single") {
        linkTypeButton.innerText = "Double";
        doubleLinks = true;
    } else {
        linkTypeButton.innerText = "Single";
        doubleLinks = false;
    }

    for (let i = 0; i < doubleLinkArray.length - 1; i++) {
        doubleLinkArray[i].classList.toggle("hidden");
    }
});

addMethodButton.addEventListener("click", function() {
    changeMethod("add", addMethodButton);
});
deleteMethodButton.addEventListener("click", function() {
    changeMethod("delete", deleteMethodButton);
});
getMethodButton.addEventListener("click", function() {
    changeMethod("get", getMethodButton);
});

