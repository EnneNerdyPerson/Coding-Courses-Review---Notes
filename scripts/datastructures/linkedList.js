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

let doubleLinks = false;
let doubleLinkArray = new Array();

let singlyLinkedList = new LinkedListSingle();

let nodeArray = new Array();
let divArray = new Array();
let numNodes = 0;

function makeNewNode(value, index) {
    singlyLinkedList.addItem(value, index);

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

    if (!doubleLinks) {
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

    if (numNodes == index) {
        visualDiv.append(node);
        visualDiv.append(div);
        nodeArray.push(node);
        divArray.push(div);
    } else if (index == 0) {
        let beginning = nodeArray[0];
        beginning.before(node);
        beginning.before(div);

        nodeArray.splice(index, 0, node);
        divArray.splice(index, 0, div);
    } else {
        let preDiv = divArray[index - 1];
        preDiv.after(div);
        preDiv.after(node);

        nodeArray.splice(index, 0, node);
        divArray.splice(index, 0, div);
    }

    if (numNodes == 0) {
        let nullNode = document.createElement("p");
        nullNode.classList.add("null");
        nullNode.innerText = "NULL";

        visualDiv.append(nullNode);
    }

    numNodes++;
}

function deleteNode(index) {
    console.log(index);
    console.log(nodeArray);

    singlyLinkedList.deleteItem(index);

    let node = nodeArray[index];
    let div = divArray[index];

    nodeArray.splice(index, 1);
    divArray.splice(index, 1);

    node.remove();
    div.remove();

    numNodes--;
}

function changeMethod(type, button) {
    if (type == "add") {
        singlyLinkedList.updateAddItem();
    } else if (type == "delete") {
        singlyLinkedList.updateDeleteItem();
    } else if (type == "get") {
        singlyLinkedList.updateGetItem();
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
    console.log(addValue);
    addInput.value = "";

    let method = singlyLinkedList.getAddMethod();
    console.log(method);

    if (addValue.indexOf(",") >= 0) {
        let array = addValue.split(",");
        console.log(array);

        if (method == "index") {
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
                if (method == "end") {
                    index = numNodes;
                } else if (method == "front") {
                    index = 0;
                }

                makeNewNode(array[i], index);
            }
        }
    } else {
        if (method == "end") {
            makeNewNode(addValue, numNodes);
        } else if (method == "front") {
            makeNewNode(addValue, 0);
        }
    }
});

deleteButton.addEventListener("click", function() {
    console.log("delete");
    let deleteValue = deleteInput.value;
    deleteValue.value = "";

    let method = singlyLinkedList.getDeleteMethod();
    console.log(method);

    if (deleteValue.indexOf(",") >= 0) {
        let array = deleteValue.split(",");

        for (let i = 0; i < array.length; i++) {
            deleteNode(array[i]);
        }
    } else {
        if (method == "end") {
            deleteNode(numNodes - 1);
        } else if (method == "front") {
            deleteNode(0);
        }
    }
});

getButton.addEventListener("click", function() {
    console.log("get");

    let getValue = getInput.value;
    getValue.value = "";

    let method = singlyLinkedList.getGetMethod();

    let messageValue = "Items Retrieved: "

    if (getValue.indexOf(",") >= 0) {
        let array = getValue.split(",");

        for (let i = 0; i < array.length; i++) {
            if (i == array.length - 1) {
                messageValue += singlyLinkedList.getItem(array[i]);
            } else {
                messageValue += singlyLinkedList.getItem(array[i]) + ", ";
            }
        }
    } else {
        if (method == "end") {
            messageValue += singlyLinkedList.getItem(numNodes - 1);
        } else if (method == "front") {
            messageValue += singlyLinkedList.getItem(0);
        } else if (method == "index") {
            messageValue += singlyLinkedList.getItem(getValue);
        }
    }

    message.innerText = messageValue;
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