let visualDivStack = document.getElementById("visualDiv-stack");
let visualDivQueue = document.getElementById("visualDiv-queue");

let stackOperationContainer = document.getElementById("stack-operation-container");
let queueOperationContainer = document.getElementById("queue-operation-container");

let switchButton = document.getElementById("switch");

let message = document.getElementById("message");

let stackVisualContainer = document.getElementById("stack-visual");
let stackVisualBottom = document.getElementById("stack-visual-bottom");

let stackSize = document.getElementById("stack-size");

let pushInput = document.getElementById("push-input");
let pushButton = document.getElementById("push-button");
let popButton = document.getElementById("pop-button");

let linkContainer = document.getElementById("link-container");
let queueContainer = document.getElementById("queue-container");

let enqueueInput = document.getElementById("enqueue-input");
let enqueueButton = document.getElementById("enqueue-button");
let dequeueButton = document.getElementById("dequeue-button");

let stackNumElements = 0;
let queueNumElements = 0;

let nodeArray = new Array();
let divArray = new Array();
let topLabelArray = new Array();

let lastTailLabel = null;

let queueArray = new Array();

//========================================================================================================
// Functions for interactive array list visual
//========================================================================================================

/**
 * Delay function that allows for some millsecond delay before
 * moving onto the next instruction
 * 
 * Source: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
 * @param {number} ms - number of milliseconds to wait before continuing
 */
const delay = ms => new Promise(res => setTimeout(res, ms));


async function addPushItem(value) {

    if (stackNumElements < 0) {
        stackNumElements++;
    }

    message.style.color = "black";

    if (stackNumElements <= 15) {
        message.innerText = "add item at arr[size] = arr[" + stackNumElements + "]";

        let arrayId = "array-" + stackNumElements;
        let stackId = "stack-" + stackNumElements;

        let index = document.getElementById(arrayId);

        await delay(800);
        
        index.classList.add("selected-item");
        

        let newStackItem = document.createElement("div");
        newStackItem.classList.add("stack-item");
        newStackItem.id = stackId;
        newStackItem.innerText = value;

        await delay(800);

        if (stackNumElements == 0) {
            stackVisualBottom.before(newStackItem);
        } else {
            let oldTopStack = document.getElementById("stack-" + (stackNumElements - 1));
            oldTopStack.before(newStackItem);
        }

        index.innerText = value;
        
        await delay(800);

        stackNumElements++;

        index.classList.remove("selected-item");

        stackSize.innerText = "size: " + stackNumElements;
        message.innerText = "";
        
    } else {
        message.style.color = "red";
        message.innerText = "There is no more space in the stack!";
    }
}

async function popItem() {
    if (stackNumElements > 16) {
        stackNumElements--;
    }
    
    message.style.color = "black";

    if (stackNumElements > 0) {
        message.innerText = "remove item at arr[size - 1] = arr[" + (stackNumElements - 1) + "]";
        let id = "array-" + (stackNumElements - 1);

        let index = document.getElementById(id);

        await delay(800);
        
        index.classList.add("selected-item");

        await delay(800);

        let poppedValue = index.innerText;
        message.innerText = "Value Retrieved: " + poppedValue;
        index.innerText = "";

        let oldTopStack = document.getElementById("stack-" + (stackNumElements - 1));
        oldTopStack.remove();

        await delay(800);

        stackNumElements--;
        stackSize.innerText = "size: " + stackNumElements;
        index.classList.remove("selected-item");

    } else {
        message.style.color = "red";
        message.innerText = "The stack is empty! You cannot pop() anything";
    }
}

async function addLinkedListItem(value) {
    message.style.color = "black"; 

    let nodeDiv = document.createElement("div");
    nodeDiv.classList.add("relative");

    let topLabel = document.createElement("p");
    topLabel.classList.add("above-label");
    topLabel.classList.add("hidden");
    topLabel.innerText = "newNode";

    let node = document.createElement("div");
    node.classList.add("node");
    node.innerText = value;

    nodeDiv.append(topLabel);

    topLabelArray.push(topLabel);

    nodeDiv.append(node);

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

    div.append(rightArrowContainer);

    let tempNull = document.createElement("p");
    tempNull.classList.add("null");
    tempNull.innerText = "NULL";

    let tempDiv = document.createElement("div");
    tempDiv.classList.add("flex-row-container");
    tempDiv.style.alignItems = "center";

    //create text before spacing div
    let beforeText = document.createElement("p");
    beforeText.classList.add("small-margin");
    beforeText.innerText = "";

    //create spacing div - used for animations
    let tempSpaceElement = document.createElement("div");
    tempSpaceElement.classList.add("temp-space-linked-list");

    //create text after spacing div
    let afterText = document.createElement("p");
    afterText.classList.add("small-margin");
    afterText.innerText = "";

    //add elements to temp div
    tempDiv.append(beforeText);
    tempDiv.append(tempSpaceElement);
    tempDiv.append(afterText);

    let nullNode = document.getElementById("null");

    await delay(800);

    if (queueNumElements != 0) {
        message.innerText = "tail.next = newNode";
    } else {
        message.innerText = "tail = newNode";
    }
    
    await delay(800);

    nullNode.before(tempDiv);
    nullNode.classList.add("hidden");
    tempDiv.before(tempNull);

    await delay(50);

    tempSpaceElement.classList.add("increase-width");

    await delay(800);

    afterText.innerText = "newNode: ";
    afterText.classList.add("add-fade-in");

    nullNode.classList.remove("hidden");

    nullNode.before(nodeDiv);
    nullNode.before(div);

    nodeArray.push(nodeDiv);
    divArray.push(div);

    nodeDiv.classList.add("add-fade-in");
    div.classList.add("add-fade-in");

    await delay(800);

    tempNull.remove();
    
    beforeText.innerText = "newNode;";

    await delay(800);

    tempDiv.remove();

    if (queueNumElements >= 1) {
        topLabel.classList.remove("hidden");
    }

    await delay(800);

    if (queueNumElements != 0) {
        message.innerText = "tail = newNode";
        await delay(800);
    }
    
    if (queueNumElements == 1) {
        let headLabel = document.getElementById("head-label");
        headLabel.innerHTML = "head:";
    }

    if (lastTailLabel != null) {
        lastTailLabel.classList.add("hidden");
    }
    lastTailLabel = topLabel;

    if (queueNumElements >= 1) {
        topLabel.innerText = "tail";
    } else {
        topLabel.innerText = "";
    }

    await delay(800);

    message.innerText = "";
    queueNumElements++;
}

function addQueueItem(value) {    
    let div = document.createElement("div");
    div.classList.add("flex-col-container");
    div.classList.add("relative");

    let head = document.createElement("div");
    head.classList.add("node");
    head.classList.add("rotate-90");
    head.classList.add("faces");
    head.innerText = value;

    let body = document.createElement("div");
    body.classList.add("person-body");

    div.append(head);
    div.append(body);

    queueContainer.append(div);

    div.classList.add("add-walk-in");

    queueArray.push(div);
}

async function dequeue() {
    if (queueNumElements == 0) {
        message.style.color = "red";
        message.innerText = "There are no items to dequeue! The queue is empty";
        return;
    }

    message.style.color = "black";

    let node = nodeArray[0];
    let div = divArray[0];
    let queueItem = queueArray[0];

    nodeArray.splice(0, 1);
    divArray.splice(0, 1);
    queueArray.splice(0, 1);

    let topLabel = null;

    let tempDiv = document.createElement("div");
    tempDiv.classList.add("flex-row-container");
    tempDiv.style.alignItems = "center";

    //create text before spacing div
    let beforeText = document.createElement("p");
    beforeText.classList.add("small-margin");
    beforeText.classList.add("null");
    beforeText.classList.add("hidden");
    beforeText.innerText = "NULL";

    //create spacing div - used for animations
    let tempSpaceElement = document.createElement("div");
    tempSpaceElement.classList.add("temp-space-linked-list");

    //create text after spacing div
    let afterText = document.createElement("p");
    afterText.classList.add("small-margin");
    afterText.innerText = "";

    //add elements to temp div
    tempDiv.append(beforeText);
    tempDiv.append(tempSpaceElement);
    tempDiv.append(afterText);

    let headLabel = document.getElementById("head-label");

    if (queueNumElements > 1) {
        topLabel = topLabelArray[1];

        message.innerText = "temp = head.next";

        await delay(800);

        topLabel.classList.remove("hidden");

        topLabel.innerText = "temp";

        await delay(800);

        div.after(tempDiv);
        message.innerText = "head.next = NULL";

        await delay(100);

        tempSpaceElement.classList.add("increase-width");

        await delay(800);

        beforeText.classList.remove("hidden");
        beforeText.classList.add("add-fade-in");

        await delay(800);

        message.innerText = "head = temp";

        await delay(800);

        headLabel.classList.add("hidden");
        topLabel.innerText = "head";

        await delay(800);
    } else {
        message.innerText = "temp = head.next";

        await delay(800);

        div.after(tempDiv);

        await delay(100);

        tempSpaceElement.classList.add("increase-width");

        await delay(800);

        afterText.innerText = "temp:";

        await delay(800);
        
        message.innerText = "head.next = NULL";

        await delay(800);

        beforeText.classList.remove("hidden");
        beforeText.classList.add("add-fade-in");

        await delay(800);

        message.innerText = "head = temp";

        await delay(800);

        afterText.innerText = "head:";
        headLabel.classList.add("hidden");

    }
    
    queueItem.classList.add("add-walk-off");

    await delay(800);

    message.innerText = "Retrieved Item: " + queueItem.innerText;

    node.classList.remove("add-fade-in");
    div.classList.remove("add-fade-in");

    node.classList.add("add-fade-out");
    div.classList.add("add-fade-out");

    await delay(800);

    tempDiv.remove();

    headLabel.classList.remove("hidden");

    if (queueNumElements > 1) {
        topLabel.remove();
    }

    node.remove();
    div.remove();
    queueItem.remove();

    await delay(800);

    queueNumElements--;

    if (queueNumElements == 1) {
        let headLabel = document.getElementById("head-label");
        headLabel.innerHTML = "head: <br> tail:";

        lastTailLabel.remove();
        lastTailLabel = null;

        topLabelArray = new Array();
    } else {
        topLabelArray.splice(0, 1);
    }
}

//========================================================================================================
// Event listeners for buttons
//========================================================================================================

pushButton.addEventListener("click", async function() {
    let input = DOMPurify.sanitize(pushInput.value);
    
    let inputArray = input.split(",");

    for (let i of inputArray) {
        if (i == inputArray[inputArray.length - 1]) {
            pushInput.value = "";
        } else {
            pushInput.value = pushInput.value.substring(pushInput.value.indexOf(",") + 1);
        }
        
        await addPushItem(i);
    }
    
    pushInput.value = "";
});

popButton.addEventListener("click", popItem);

enqueueButton.addEventListener("click", async function() {
    let input = DOMPurify.sanitize(enqueueInput.value);
    
    let inputArray = input.split(",");

    for (let i of inputArray) {
        if (i == inputArray[inputArray.length - 1]) {
            enqueueInput.value = "";
        } else {
            enqueueInput.value = enqueueInput.value.substring(enqueueInput.value.indexOf(",") + 1);
        }

        await addLinkedListItem(i);
        addQueueItem(i);

        await delay(800);        
    }
    
    enqueueInput.value = "";
});

dequeueButton.addEventListener("click", dequeue);

switchButton.addEventListener("click", function() {
    message.innerText = "";

    visualDivStack.classList.toggle("hidden");
    visualDivQueue.classList.toggle("hidden");

    stackOperationContainer.classList.toggle("hidden");
    queueOperationContainer.classList.toggle("hidden");

    if (switchButton.innerText == "STACKS") {
        switchButton.innerText = "QUEUES";
    } else {
        switchButton.innerText = "STACKS";
    }
});