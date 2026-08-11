//============================================================================================================
// Get DOM Elements and set up global variables
//============================================================================================================
let message = document.getElementById("message");               //for error messages and communication

//Stack DOM Element
let stackSwitchButton = document.getElementById("stack-switch");                //button for switching to queue
let visualDivStack = document.getElementById("visualDiv-stack");                //div for stack display items
let stackOpContainer = document.getElementById("stack-operation-container");    //div for stack operations

let stackVisualContainer = document.getElementById("stack-visual");             //div for stack visual
let stackVisualBottom = document.getElementById("stack-visual-bottom");         //bottom of stack

let stackSize = document.getElementById("stack-size");                          //tells user size of stack

let pushInput = document.getElementById("push-input");                          //input for push(item)
let pushButton = document.getElementById("push-button");                        //button for push
let popButton = document.getElementById("pop-button");                          //button for pop()

//Queue DOM Element
let queueSwitchButton = document.getElementById("queue-switch");                //button for switching to stack
let visualDivQueue = document.getElementById("visualDiv-queue");                //div for queue display items
let queueOpContainer = document.getElementById("queue-operation-container");    //div for queue operations

let linkContainer = document.getElementById("link-container");                  //div for linked list queue
let queueContainer = document.getElementById("queue-container");                //div for queue visual

let enqueueInput = document.getElementById("enqueue-input");                    //input for enqueue(item)
let enqueueButton = document.getElementById("enqueue-button");                  //button for enqueue
let dequeueButton = document.getElementById("dequeue-button");                  //button for dequeue()

//Global Variables
let stackNumElements = 0;           //number of items in stack
let queueNumElements = 0;           //number of items in queue

//save DOM elements in array for easy deletion and editing
let nodeArray = new Array();        //array for node elements
let divArray = new Array();         //array for arrow elements
let topLabelArray = new Array();    //array for top-label elements
let queueArray = new Array();       //array for queue elements

let lastTailLabel = null;           //saves last top-label to label tail

let animationRunning = false;       //variable for if animation is running or not

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

/**
 * Greys or un-greys buttons that affect the visual display to 
 * showcase when user can and cannot press them.
 */
function toggleButtonFunction() {
    stackSwitchButton.classList.toggle("unuseable-button");
    pushButton.classList.toggle("unuseable-button");
    popButton.classList.toggle("unuseable-button");

    queueSwitchButton.classList.toggle("unuseable-button");
    enqueueButton.classList.toggle("unuseable-button");
    dequeueButton.classList.toggle("unuseable-button");
}

/**
 * Add the value parameter to the stack-array visual and 
 * the stack visual. Includes animation of the process.
 * 
 * @param {*} value - value of item being added to stack
 */
async function addPushItem(value) {
    //ensure stackNumElements is never less than 0
    if (stackNumElements < 0) {
        stackNumElements++;
    }

    //reset message color
    message.style.color = "black";

    //check if there is space in stack
    if (stackNumElements <= 15) {
        //save the id of the array and stack item
        let arrayId = "array-" + stackNumElements;
        let stackId = "stack-" + stackNumElements;

        //get the stack-array DOM element
        let index = document.getElementById(arrayId);

        //let user know where item is being added
        message.innerText = "add item at arr[size] = arr[" + stackNumElements + "]";

        //delay for animation and clarity
        await delay(800);
        
        //add style to show which array item is being altered
        index.classList.add("selected-item");
        
        //create new stack item
        let newStackItem = document.createElement("div");
        newStackItem.classList.add("stack-item");
        newStackItem.id = stackId;
        newStackItem.innerText = value;

        await delay(800);

        //check if stack is empty or not
        if (stackNumElements == 0) {
            //add item ontop of bottom of stack
            stackVisualBottom.before(newStackItem);
        } else {
            //get last item added to stack
            let oldTopStack = document.getElementById("stack-" + (stackNumElements - 1));

            //add item ontop of last element
            oldTopStack.before(newStackItem);
        }

        //update array item's value
        index.innerText = value;
        
        await delay(800);

        //increase number of stack elements
        stackNumElements++;

        //de-select array item
        index.classList.remove("selected-item");

        //showcase change in size
        stackSize.innerText = "size: " + stackNumElements;

        //re-set message
        message.innerText = "";
        
    //array doesn't have space
    } else {
        //alert user of error
        message.style.color = "red";
        message.innerText = "There is no more space in the stack!";
    }
}

/**
 * Remove last element added to stack from both stack-array
 * visual and the stack visual. Includes animation of the 
 * process.
 */
async function popItem() {
    //make sure stackNumElements is never greater than 16
    if (stackNumElements > 16) {
        stackNumElements--;
    }
    
    //reset message color
    message.style.color = "black";

    //check to make sure there are elements to remove
    if (stackNumElements > 0) {
        //check if animation is running
        if (animationRunning) {
            //if running, do not run animation
            return;
        } else {
            //grey out buttons
            toggleButtonFunction();

            //update animation running varibale
            animationRunning = true;
        }

        //get array item that will be changed
        let id = "array-" + (stackNumElements - 1);
        let index = document.getElementById(id);

        //let user know where item is being removed
        message.innerText = "remove item at arr[size - 1] = arr[" + (stackNumElements - 1) + "]";
    
        //add delay for animation and clarity
        await delay(800);
        
        //show which item is being edited
        index.classList.add("selected-item");

        await delay(800);

        //save value being removed
        let poppedValue = index.innerText;

        //show user which value was removed
        message.innerText = "Value Retrieved: " + poppedValue;

        //clear/remove array item
        index.innerText = "";

        //get top of stack item and remove it
        let oldTopStack = document.getElementById("stack-" + (stackNumElements - 1));
        oldTopStack.remove();

        await delay(800);

        //decrease num of stack element
        stackNumElements--;

        //update user of size
        stackSize.innerText = "size: " + stackNumElements;

        //de-select array item
        index.classList.remove("selected-item");

        //update animation running variable
        animationRunning = false;

        //un-grey buttons
        toggleButtonFunction();

    //no items in stack, error
    } else {
        //update user of error
        message.style.color = "red";
        message.innerText = "The stack is empty! You cannot pop() anything";
    }
}

/**
 * Add item with parameter value to linked list representation 
 * of queue. Includes animations for the process.
 * 
 * @param {*} value - value of item added to queue
 */
async function addLinkedListItem(value) {
    //reset message color
    message.style.color = "black"; 

    //create node div to contain node and top-label
    let nodeDiv = document.createElement("div");
    nodeDiv.classList.add("relative");

    //create top-label for node
    let topLabel = document.createElement("p");
    topLabel.classList.add("above-label");
    topLabel.classList.add("hidden");
    topLabel.innerText = "newNode";

    //add topLabel to array
    topLabelArray.push(topLabel);

    //create node element with value
    let node = document.createElement("div");
    node.classList.add("node");
    node.innerText = value;

    //add topLabel and node to nodeDiv
    nodeDiv.append(topLabel);
    nodeDiv.append(node);

    //create div for arrow
    let div = document.createElement("div");
    div.classList.add("arrow-container");

    //create right arrow
    let righArrowBody = document.createElement("div");
    righArrowBody.classList.add("arrow-body");
    let rightArrowHead = document.createElement("div");
    rightArrowHead.classList.add("right-arrow-head");

    //add right arrow to it's container
    div.append(righArrowBody);
    div.append(rightArrowHead);

    //add divs to arrays
    nodeArray.push(nodeDiv);
    divArray.push(div);

    //create temp null element to be removed later
    let tempNull = document.createElement("p");
    tempNull.classList.add("null");
    tempNull.innerText = "NULL";

    //create temp div for animation
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

    //get null element for easy adding to visual
    let nullElement = document.getElementById("null");

    //delays for animations
    await delay(800);

    //check if adding to empty list or not
    //communicate relevent operations
    if (queueNumElements != 0) {
        message.innerText = "tail.next = newNode";
    } else {
        message.innerText = "tail = newNode";
    }
    
    await delay(800);

    //add tempDiv bfore null and un-hide
    nullElement.before(tempDiv);
    nullElement.classList.add("hidden");

    //add temp NUll for end of list
    tempDiv.before(tempNull);

    await delay(50);

    //show increase in space animation
    tempSpaceElement.classList.add("increase-width");

    await delay(800);

    //label new node with fade-in
    afterText.innerText = "newNode: ";
    afterText.classList.add("add-fade-in");

    //un-hide null element for new node to point to
    nullElement.classList.remove("hidden");

    //add new node elements before null
    nullElement.before(nodeDiv);
    nullElement.before(div);

    //add fade-in animation for node and arrow
    nodeDiv.classList.add("add-fade-in");
    div.classList.add("add-fade-in");

    await delay(800);

    //remove temp null
    tempNull.remove();
    
    //show list now points to new node
    beforeText.innerText = "newNode;";

    await delay(800);

    //remove temp elements
    tempDiv.remove();

    //if not first element, un-hide top label
    if (queueNumElements >= 1) {
        topLabel.classList.remove("hidden");
    }

    await delay(800);

    //if adding new element, show process to user
    if (queueNumElements != 0) {
        message.innerText = "tail = newNode";
        await delay(800);
    }
    
    //if second element to be added, remove tail for head label
    if (queueNumElements == 1) {
        let headLabel = document.getElementById("head-label");
        headLabel.innerHTML = "head:";
    }

    //hide old tail label
    if (lastTailLabel != null) {
        lastTailLabel.classList.add("hidden");
    }

    //update lastTailLabel variable
    lastTailLabel = topLabel;

    //update top label to tail if applicable
    if (queueNumElements >= 1) {
        topLabel.innerText = "tail";
    } else {
        topLabel.innerText = "";
    }

    await delay(800);

    //clear message
    message.innerText = "";

    //increase numbr of queue elements
    queueNumElements++;
}

/**
 * Add item with parameter value to queue display which includes
 * an animation of 'person' walking into the queue.
 * 
 * @param {*} value - value of item added to queue
 */
async function addQueueItem(value) {    
    //create div for person
    let div = document.createElement("div");
    div.classList.add("flex-col-container");
    div.classList.add("relative");

    //create head item for person
    let head = document.createElement("div");
    head.classList.add("node");
    head.classList.add("rotate-90");            //rotate head-item 90deg
    head.classList.add("faces");                //point item left to make 'face'
    head.innerText = value;

    //create body for person
    let body = document.createElement("div");
    body.classList.add("person-body");

    //add head and body to div
    div.append(head);
    div.append(body);

    //add person to queue container
    queueContainer.append(div);

    //add animation to person
    div.classList.add("add-walk-in");

    //add queue item to array
    queueArray.push(div);
}

/**
 * Remove item from beginning of queue with animation
 * for both queue display and linked-list queue.
 */
async function dequeue() {
    //check if there are elements to remove
    if (queueNumElements == 0) {
        //alert user of error
        message.style.color = "red";
        message.innerText = "There are no items to dequeue! The queue is empty";
        return;
    }

    if (animationRunning) {
        //if running, do not run animation
        return;
    } else {
        //grey out buttons
        toggleButtonFunction();

        //update animation running varibale
        animationRunning = true;
    }

    //reset message style
    message.style.color = "black";

    //get DOM elements to be deleted
    let node = nodeArray[0];
    let div = divArray[0];
    let queueItem = queueArray[0];

    //remove DOM elements from arrays
    nodeArray.splice(0, 1);
    divArray.splice(0, 1);
    queueArray.splice(0, 1);

    //create variable for top label (may or may not be used)
    let topLabel = null;
    //get head label for updates/animation
    let headLabel = document.getElementById("head-label");

    //create temp div for animation
    let tempDiv = document.createElement("div");
    tempDiv.classList.add("flex-row-container");
    tempDiv.style.alignItems = "center";

    //create temp node for before space div
    let tempNull = document.createElement("p");
    tempNull.classList.add("small-margin");
    tempNull.classList.add("null");
    tempNull.classList.add("hidden");
    tempNull.innerText = "NULL";

    //create spacing div - used for animations
    let tempSpaceElement = document.createElement("div");
    tempSpaceElement.classList.add("temp-space-linked-list");

    //create text after spacing div
    let afterText = document.createElement("p");
    afterText.classList.add("small-margin");
    afterText.innerText = "";

    //add elements to temp div
    tempDiv.append(tempNull);
    tempDiv.append(tempSpaceElement);
    tempDiv.append(afterText);

    //check if removing last element in queue
    if (queueNumElements > 1) { 
        //NOT removing last element in queue

        //get top label over second item in list
        topLabel = topLabelArray[1];

        //update user of next step
        message.innerText = "temp = head.next";

        //add delay for animation 
        await delay(800);

        //set top label to temp and unhide top label
        topLabel.innerText = "temp";
        topLabel.classList.remove("hidden");

        await delay(800);

        //add temp div after first item in list
        div.after(tempDiv);

        //update user of next step
        message.innerText = "head.next = NULL";

        await delay(100);

        //add space increase animation
        tempSpaceElement.classList.add("increase-width");

        await delay(800);

        //unhide temp null
        tempNull.classList.remove("hidden");
        tempNull.classList.add("add-fade-in");

        await delay(800);

        //update user of next step
        message.innerText = "head = temp";

        await delay(800);

        //hide head label and move it above second item in list
        headLabel.classList.add("hidden");
        topLabel.innerText = "head";

        await delay(800);

    //last item in list is about to be removed
    } else {
        //user user of next step
        message.innerText = "temp = head.next";

        await delay(800);

        //add temporary elements after first node
        div.after(tempDiv);

        await delay(100);

        //run spacing animation
        tempSpaceElement.classList.add("increase-width");

        await delay(800);

        //show temp pointing to null
        afterText.innerText = "temp:";

        await delay(800);
    
        //update user of next step
        message.innerText = "head.next = NULL";

        await delay(800);

        //unhide null value with fade in animation
        tempNull.classList.remove("hidden");
        tempNull.classList.add("add-fade-in");

        await delay(800);

        //alert user of next step
        message.innerText = "head = temp";

        await delay(800);

        //move head to point to null
        afterText.innerText = "head:";
        headLabel.classList.add("hidden");

    }
    
    //add queue item walk off animation
    queueItem.classList.add("add-walk-off");

    await delay(800);

    //show user value of item that was removed
    message.innerText = "Retrieved Item: " + queueItem.innerText;

    //add fade out animation for node and arrow
    node.classList.add("add-fade-out");
    div.classList.add("add-fade-out");

    await delay(800);

    //remove temporary elements
    tempDiv.remove();

    //un-hide head label
    headLabel.classList.remove("hidden");

    //check if need to remove top label
    if (queueNumElements > 1) {
        topLabel.remove();
    }

    //remove all relevent DOM elements
    node.remove();
    div.remove();
    queueItem.remove();

    await delay(800);

    //decrement number of queue elements
    queueNumElements--;

    //check if need to update variables
    if (queueNumElements == 1) {
        //update head label to show head and tail point to same thing
        let headLabel = document.getElementById("head-label");
        headLabel.innerHTML = "head: <br> tail:";

        //delete last top label and set to null
        lastTailLabel.remove();
        lastTailLabel = null;

        //clear top label array
        topLabelArray = new Array();

    //more then 1 element less or 0 elements
    } else {
        topLabelArray.splice(0, 1);
    }

    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();
}

/**
 * Switch which display is visable
 */
function switchDisplay() {
    //check if animation is running
    if (animationRunning) {
        //do not continue if animation is running
        return;
    }

    //clear message
    message.innerText = "";

    //switch which display is visable
    visualDivStack.classList.toggle("hidden");
    visualDivQueue.classList.toggle("hidden");

    //switch which operations are visable
    stackOpContainer.classList.toggle("hidden");
    queueOpContainer.classList.toggle("hidden");
}

//========================================================================================================
// Event listeners for buttons
//========================================================================================================

/**
 * When push() button is pushed, sanitize input, split 
 * by commas, and add elements with animation
 */
pushButton.addEventListener("click", async function() {
    if (animationRunning) {
        //if running, do not run animation
        return;
    } else {
        //grey out buttons
        toggleButtonFunction();

        //update animation running varibale
        animationRunning = true;
    }

    //get and sanitize input
    let input = DOMPurify.sanitize(pushInput.value);
    
    //split input based on commas
    let inputArray = input.split(",");

    //iterate through input
    for (let i of inputArray) {
        //check if last element in input array
        if (i == inputArray[inputArray.length - 1]) {
            //have push input to empty
            pushInput.value = "";
        } else {
            //update input to show what is being proccessed
            pushInput.value = pushInput.value.substring(pushInput.value.indexOf(",") + 1);
        }
        
        //add item and run animation
        await addPushItem(i);
    }

    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();
    
    //have push input to empty
    pushInput.value = "";
});

/**
 * When pop() butotn is pushed, the popItem function 
 * is run
 */
popButton.addEventListener("click", popItem);

/**
 * When enqueue() button is pushed, sanitize input, split 
 * by commas, and add elements with animation
 */
enqueueButton.addEventListener("click", async function() {
    if (animationRunning) {
        //if running, do not run animation
        return;
    } else {
        //grey out buttons
        toggleButtonFunction();

        //update animation running varibale
        animationRunning = true;
    }

    //sanitize input
    let input = DOMPurify.sanitize(enqueueInput.value);
    
    //split by commas
    let inputArray = input.split(",");

    //iterate through input 
    for (let i of inputArray) {
        //clear input if last element in input array
        if (i == inputArray[inputArray.length - 1]) {
            enqueueInput.value = "";
        } else {
            //update input to show what is being processed
            enqueueInput.value = enqueueInput.value.substring(enqueueInput.value.indexOf(",") + 1);
        }

        //add item to linked list and run animation
        await addLinkedListItem(i);

        //add item to queue display with animation
        addQueueItem(i);

        //delay for clarity
        await delay(800);        
    }
    
    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();

    //clear input
    enqueueInput.value = "";
});

/**
 * When dequeue() butotn is pushed, the dequeue function 
 * is run
 */
dequeueButton.addEventListener("click", dequeue);

/**
 * When stack switch button is pressed, show queue 
 * display and stack display
 */
stackSwitchButton.addEventListener("click", switchDisplay);

/**
 * When stack switch button is pressed, show queue 
 * display and stack display
 */
queueSwitchButton.addEventListener("click", switchDisplay);