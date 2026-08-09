let visualDiv = document.getElementById("visualDiv");
let tempVisualDiv = document.getElementById("tempVisualDiv");

let visualLabel = document.getElementById("visual-label");
let tempLabel = document.getElementById("temp-label");

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

/**
 * Delay function that allows for some millsecond delay before
 * moving onto the next instruction
 * 
 * Source: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
 * @param {number} ms - number of milliseconds to wait before continuing
 */
const delay = ms => new Promise(res => setTimeout(res, ms));


async function makeNewNode(value, index) {
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

    tempVisualDiv.classList.toggle("hidden");
    let tempNull = document.createElement("p");
    tempNull.classList.add("null");
    tempNull.innerText = "NULL";

    tempVisualDiv.append(node);
    tempVisualDiv.append(div);
    tempVisualDiv.append(tempNull);

    //Note: add additional animation or double link list

    if (index == 0) {
        await delay(800);

        visualLabel.innerText = "head = temp:";

        await delay(800);

        visualLabel.innerText = "temp:";
        tempLabel.innerText = "head = newNode:";

        await delay(800);

        tempNull.classList.remove("null");
        tempNull.innerText = "temp;";

        await delay(800);

        visualLabel.innerText = "head:";
        tempNull.remove();

        node.classList.add("add-fade-in");
        div.classList.add("add-fade-in");

        if (nodeArray.length == 0) {
            let nullNode = document.getElementById("null");
            visualLabel.after(div);
            visualLabel.after(node);
        } else {
            let beginning = nodeArray[0];
            beginning.before(node);
            beginning.before(div);
        }

    } else {
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("flex-row-container");
        tempDiv.style.alignItems = "center";

        let beforeText = document.createElement("p");
        beforeText.classList.add("small-margin");
        beforeText.innerText = "";

        let tempSpaceElement = document.createElement("div");
        tempSpaceElement.classList.add("temp-space-linked-list");

        let afterText = document.createElement("p");
        afterText.classList.add("small-margin");
        afterText.innerText = "";

        tempDiv.append(beforeText);
        tempDiv.append(tempSpaceElement);
        tempDiv.append(afterText);

        if (numNodes == index) {
            if (numNodes > 0 && doubleLinks) {
                doubleLinkArray[index - 1].classList.toggle("hidden");
            }
            
            let nullNode = document.getElementById("null");
            nullNode.before(tempDiv);
        } else {
            let preDiv = divArray[index - 1];
            preDiv.after(tempDiv);
        }

        await delay(800);
        tempSpaceElement.classList.add("increase-width");

        await delay(400);
        beforeText.innerText = "newNode;";
        afterText.innerText = "temp:";

        await delay(800);

        tempNull.classList.remove("null");
        tempNull.innerText = "temp;";

        await delay(800);

        tempDiv.remove();
        tempNull.remove();

        node.classList.add("add-fade-in");
        div.classList.add("add-fade-in");

        if (numNodes == index) {
            let nullNode = document.getElementById("null");

            nullNode.before(node);
            nullNode.before(div);
            
        } else {
            let preDiv = divArray[index - 1];
            
            preDiv.after(div);
            preDiv.after(node);
        }
    }

    nodeArray.splice(index, 0, node);
    divArray.splice(index, 0, div);
    doubleLinkArray.splice(index, 0, leftArrowContainer);

    tempVisualDiv.classList.toggle("hidden");
    tempLabel.innerText = "newNode:";

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

    // if (numNodes == 0) {
    //     let nullElement = document.getElementById("null");
    //     nullElement.remove();
    // }
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

addButton.addEventListener("click", async function() {
    let addValue = addInput.value;
    addInput.value = "";

    if (addValue.indexOf(",") >= 0) {
        let array = addValue.split(",");

        if (addMethod == "index") {
            if (array.length % 2 == 0) {
                for (let i = 0; i < array.length; i = i + 2) {
                    await delay(800);
                    let index = array[i + 1];
                    await makeNewNode(array[i], index);
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

                await delay(800);
                await makeNewNode(array[i], index);
            }
        }
    } else {
        await delay(800);
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

