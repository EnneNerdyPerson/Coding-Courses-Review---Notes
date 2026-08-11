//========================================================================================================
// Get DOM Elements
//========================================================================================================
let speedChangeDial = document.getElementById("speed");             //to change animation speed
let speedLabel = document.getElementById("speed-label");            //to show change in animation speed
let message = document.getElementById("message");                   //for error messages and get info

let visualDiv = document.getElementById("visualDiv");               //linked list visual
let tempVisualDiv = document.getElementById("tempVisualDiv");       //temp visual for animation

let visualLabel = document.getElementById("visual-label");          //regular visual label
let tempLabel = document.getElementById("temp-label");              //label for temp visual

//buttons for changing methods and link type
// let linkTypeButton = document.getElementById("type");           

//add method buttons
let addFrontButton = document.getElementById("addFront");
let addEndButton = document.getElementById("addEnd");
let addIndexButton = document.getElementById("addIndex");

//delete method buttons
let deleteFrontButton = document.getElementById("deleteFront");
let deleteEndButton = document.getElementById("deleteEnd");
let deleteIndexButton = document.getElementById("deleteIndex");

//get method buttons
let getFrontButton = document.getElementById("getFront");
let getEndButton = document.getElementById("getEnd");
let getIndexButton = document.getElementById("getIndex");

//addItem DOM element
let addButton = document.getElementById("addButton");
let addInput = document.getElementById("addInput");

//deleteItem DOM element
let deleteContainer = document.getElementById("deleteContainer");
let deleteButton = document.getElementById("deleteButton");
let deleteInput = document.getElementById("deleteInput");

//getItem DOM element
let getContainer = document.getElementById("getContainer");
let getButton = document.getElementById("getButton");
let getInput = document.getElementById("getInput");

//arrays for node, arrow, and value for editing and the like
let valueArray = new Array();
let nodeArray = new Array();
let divArray = new Array();
let doubleLinkArray = new Array();

let numNodes = 0;

//variables for keeping track of methods and link type
let doubleLinks = false;
let addMethod = "front";
let deleteMethod = "front";
let getMethod = "front";

let speed = 800;                    //current speed
let fullSpeed = 1600;               //'full speed'
speedChangeDial.value = 50;         //reset speed dial

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
    addFrontButton.classList.toggle("unuseable-button");
    addEndButton.classList.toggle("unuseable-button");
    addIndexButton.classList.toggle("unuseable-button");

    deleteFrontButton.classList.toggle("unuseable-button");
    deleteEndButton.classList.toggle("unuseable-button");
    deleteIndexButton.classList.toggle("unuseable-button");

    getFrontButton.classList.toggle("unuseable-button");
    getEndButton.classList.toggle("unuseable-button");
    getIndexButton.classList.toggle("unuseable-button");

    addButton.classList.toggle("unuseable-button");
    deleteButton.classList.toggle("unuseable-button");
    getButton.classList.toggle("unuseable-button");
}

/**
 * Animation of iterating through list. Additionallly, if used for 
 * get function, update message.
 * 
 * @param {number} index - index of last element for animation
 * @param {boolean} get - boolean if function is used for get animation or not
 */
async function iterateThroughList(index, get) {
    //iterate through list until reaching index
    for (let i = 0; i <= index; i++) {
        //get node DOM element at current index
        let curNode = nodeArray[i];

        //add styling to show 'selection' of node
        curNode.classList.add("selected-item");

        //delay for clear animation
        await delay(speed);

        //if used for get and at index, update message to show retrieved value
        if (i == index && get) {
            message.innerText = "Value at index " + index + ": " + valueArray[index];
            await delay(speed);
        }

        //remove styling of 'selection' of node
        curNode.classList.remove("selected-item");
    }
}

/**
 * Create DOM elements for adding new item into the list 
 * and animate the process of adding this element. The 
 * list item has value of the value parameter and is at 
 * index index
 * 
 * @param {*} value - value being added to linked list
 * @param {number} index - index where value is being added
 */
async function makeNewNode(value, index) {
    //add value to value array
    valueArray.splice(index, 0, value);

    //create node and update its text to value
    let node = document.createElement("div");
    node.classList.add("node");
    node.innerText = value;

    //create div to add arrows to
    let div = document.createElement("div");
    div.classList.add("flex-col-container");

    //create right arrow and add to contaainer
    let rightArrowContainer = document.createElement("div");
    rightArrowContainer.classList.add("arrow-container");

    let righArrowBody = document.createElement("div");
    righArrowBody.classList.add("arrow-body");
    let rightArrowHead = document.createElement("div");
    rightArrowHead.classList.add("right-arrow-head");

    rightArrowContainer.append(righArrowBody);
    rightArrowContainer.append(rightArrowHead);

    //create left arrow container
    let leftArrowContainer = document.createElement("div");
    leftArrowContainer.classList.add("arrow-container");

    //hide left arrow if not double node
    if (!doubleLinks || numNodes == index) {
        leftArrowContainer.classList.add("hidden");
    }

    //create left arrow
    let leftArrowBody = document.createElement("div");
    leftArrowBody.classList.add("arrow-body");
    let leftArrowHead = document.createElement("div");
    leftArrowHead.classList.add("left-arrow-head");

    //add left arrow to container
    leftArrowContainer.append(leftArrowHead);
    leftArrowContainer.append(leftArrowBody);

    //add arrows to div
    div.append(rightArrowContainer);
    div.append(leftArrowContainer);

    //un-hide temp visual div
    tempVisualDiv.classList.toggle("hidden");

    //create temp null element
    let tempNull = document.createElement("p");
    tempNull.classList.add("null");
    tempNull.innerText = "NULL";

    //add newly create node, arrows, and temp null to temp div
    tempVisualDiv.append(node);
    tempVisualDiv.append(div);
    tempVisualDiv.append(tempNull);

    //Note: add additional animation or double link list

    //check if added to beginning of list
    if (index == 0) {
        //delay for clear change (animation)
        await delay(speed);

        //show creation of temp variable
        visualLabel.innerText = "head = temp:";

        await delay(speed);

        //move 'head' to point to newNode
        visualLabel.innerText = "temp:";
        tempLabel.innerText = "head = newNode:";

        await delay(speed);

        //set newNode next to temp (list)
        tempNull.classList.remove("null");
        tempNull.innerText = "temp;";

        await delay(speed);

        //move head back to visual display
        visualLabel.innerText = "head:";

        //remove temp null from temp vis-display
        tempNull.remove();

        //add fade-in animation
        node.classList.add("add-fade-in");
        div.classList.add("add-fade-in");

        //add node and div to visual-display (after label)
        visualLabel.after(div);
        visualLabel.after(node);

    //add to anywhere else in list
    } else {
        //show animation of moving through list to node prev to index
        await iterateThroughList(index - 1, false);

        //create temp div, used to indicate where node will be added in list
        let tempDiv = document.createElement("div");
        tempDiv.classList.add("flex-row-container");
        tempDiv.style.alignItems = "center";

        //create before text (label before space in list)
        let beforeText = document.createElement("p");
        beforeText.classList.add("small-margin");
        beforeText.innerText = "";

        //create div which will be used to create space in list
        let tempSpaceElement = document.createElement("div");
        tempSpaceElement.classList.add("temp-space-linked-list");

        //create after text (label agfter space in list)
        let afterText = document.createElement("p");
        afterText.classList.add("small-margin");
        afterText.innerText = "";

        //add elements to tempDiv for ease of adding
        tempDiv.append(beforeText);
        tempDiv.append(tempSpaceElement);
        tempDiv.append(afterText);

        //check if being added to end of list
        if (numNodes == index) {    //added to end of list

            //unhide previously last left arrow if at end of list 
            if (numNodes > 0 && doubleLinks) {
                doubleLinkArray[index - 1].classList.toggle("hidden");
            }
            
            //add temp div before the null at the end of the list
            let nullNode = document.getElementById("null");
            nullNode.before(tempDiv);
        } else {

            //add tempdiv where node will be added later
            let preDiv = divArray[index - 1];
            preDiv.after(tempDiv);
        }

        //delay for clear change (animation)
        await delay(speed);

        //animation for showing increase in space in list
        tempSpaceElement.classList.add("increase-width");

        await delay(speed / 2);

        //show that temp points the the back end of the list
        afterText.innerText = "temp:";

        await delay(speed);

        //show newNode is added in the list
        beforeText.innerText = "newNode;";

        await delay(speed);

        //newNode next now points to temp
        tempNull.classList.remove("null");
        tempNull.innerText = "temp;";

        await delay(speed);

        //remove tempDiv and tempNull
        tempDiv.remove();
        tempNull.remove();

        //add fade in animation
        node.classList.add("add-fade-in");
        div.classList.add("add-fade-in");

        //add node and div to regular display
        let preDiv = divArray[index - 1];
        preDiv.after(div);
        preDiv.after(node);
    }

    //add node, div, and left arrow DOM elements to arrays
    nodeArray.splice(index, 0, node);
    divArray.splice(index, 0, div);
    doubleLinkArray.splice(index, 0, leftArrowContainer);

    //hide temp visual display and reset to regular value
    tempVisualDiv.classList.toggle("hidden");
    tempLabel.innerText = "newNode:";

    //increase number of nodes
    numNodes++;


}

/**
 * Delete an item from the linked list at index index, 
 * animating the process of deleting this node
 * 
 * @param {number} index - index of element to be removed
 */
async function deleteNode(index) {//get elements to be deleted
    let node = nodeArray[index];
    let div = divArray[index];

    //check if added to beginning of list
    if (index == 0) {
        //create temp div to showcase space in list
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
    
        //add spacing div to list
        div.after(tempDiv);

        //delay done to showcase clear change for animation
        await delay(speed / 8);

        //animate increase space in list
        tempSpaceElement.classList.add("increase-width");

        await delay(speed);

        //show temp visual-display and show temp points to 
        //element after head
        tempVisualDiv.classList.toggle("hidden");
        tempLabel.innerText = "temp = head.next";

        await delay(speed);

        //temp points to list after node to be deleted
        afterText.innerText = "temp:";
        tempLabel.innerText = "";

        await delay(speed);

        //to be deleted node points to null
        beforeText.classList.add("null");
        beforeText.innerText = "NULL";

        await delay(speed);

        //head points to temp
        visualLabel.innerText = "head: temp";

        //create another spacing element
        let tempSpaceElementHead = document.createElement("div");
        tempSpaceElementHead.classList.add("temp-space-linked-list");
    
        //add spacing element after head
        visualLabel.after(tempSpaceElementHead);

        await delay(speed / 8);

        //animate increase in space
        tempSpaceElementHead.classList.add("increase-width");
        
        await delay(speed);

        //add node and arrows to be deleted, and null to temp visual-display
        tempVisualDiv.append(node);
        tempVisualDiv.append(div);
        tempVisualDiv.append(beforeText);

        await delay(speed);

        //remove spaces from list
        tempSpaceElementHead.remove();
        tempDiv.remove();

        //show head now pointing to last part of list
        visualLabel.innerText = "head:";

        await delay(speed);

        //add fade out animation for node, arrow, and null to be deleted
        node.classList.add("add-fade-out");
        div.classList.add("add-fade-out");
        beforeText.classList.add("add-fade-out");

        await delay(speed / 2);

        beforeText.remove();
    
    //add NOT at beginning of list
    } else {
        //show animation of moving through list to node prev to index
        await iterateThroughList(index - 1, false);

        //create temp div to show space in list (before index of deletiong)
        let tempPreDiv = document.createElement("div");
        tempPreDiv.classList.add("flex-row-container");
        tempPreDiv.style.alignItems = "center";

        //create text for end of beginning of list
        let beforePreText = document.createElement("p");
        beforePreText.classList.add("small-margin");
        beforePreText.innerText = "";

        //create div for showing space animation
        let tempSpacePreElement = document.createElement("div");
        tempSpacePreElement.classList.add("temp-space-linked-list");

        //add elements to tempPreDiv
        tempPreDiv.append(beforePreText);
        tempPreDiv.append(tempSpacePreElement);

        //create temp div to show space in list (after index of deletiong)
        let tempPostDiv = document.createElement("div");
        tempPostDiv.classList.add("flex-row-container");
        tempPostDiv.style.alignItems = "center";

        //create text for after node to be deleted
        let beforePostText = document.createElement("p");
        beforePostText.classList.add("small-margin");
        beforePostText.innerText = "";

        //create div for showing space animation
        let tempSpacePostElement = document.createElement("div");
        tempSpacePostElement.classList.add("temp-space-linked-list");

        //create text for beginning of end part of the list
        let afterPostText = document.createElement("p");
        afterPostText.classList.add("small-margin");
        afterPostText.innerText = "";

        //add elements to div for ease of adding
        tempPostDiv.append(beforePostText);
        tempPostDiv.append(tempSpacePostElement);
        tempPostDiv.append(afterPostText);

        //add post div after node to be deleted
        div.after(tempPostDiv);

        //add pre div before node to be deleted
        node.before(tempPreDiv);

        //delay for clarity and animation
        await delay(speed / 8);

        //increase-space animation
        tempSpacePreElement.classList.add("increase-width");
        tempSpacePostElement.classList.add("increase-width");

        await delay(speed);

        //show temp visual display
        tempVisualDiv.classList.toggle("hidden");

        //show the temp points to second list
        tempLabel.innerText = "temp = index.next";

        await delay(speed);

        //show temp poitns to second list
        afterPostText.innerText = "temp:";
        tempLabel.innerText = "";

        await delay(speed);

        //show temp is end of first list
        beforePreText.innerText = "temp;";

        await delay(speed);
    
        //have node to be deleted point to null
        beforePostText.classList.add("null");
        beforePostText.innerText = "NULL";

        await delay(speed);

        //add node to be deleted to temp visual display
        tempVisualDiv.append(node);
        tempVisualDiv.append(div);
        tempVisualDiv.append(beforePostText);

        await delay(speed);

        //remove space divs
        tempPostDiv.remove();
        tempPreDiv.remove();

        await delay(speed);

        //add fade out animation to node, arrow, and null to be deleted
        node.classList.add("add-fade-out");
        div.classList.add("add-fade-out");
        beforePostText.classList.add("add-fade-out");

        await delay(speed / 4);

        //remove null element
        beforePostText.remove();
    }

    //remove delted elements from arrays
    valueArray.splice(index, 1);
    nodeArray.splice(index, 1);
    divArray.splice(index, 1);
    doubleLinkArray.splice(index, 1);

    //hide left arrow for end of list if applicable
    if (index == numNodes - 1 && doubleLinks) {
        doubleLinkArray[index - 1].classList.toggle("hidden");
    }

    //deleted node and div
    node.remove();
    div.remove();

    //hide temp visual display
    tempVisualDiv.classList.toggle("hidden");

    //reduce number of nodes
    numNodes--;
}

/**
 * Change the method for either add, delete, or get, and 
 * update the class of buttons to showcase this change
 * 
 * @param {*} type - add, delete, or get
 * @param {*} method - if the new method is front, end, or idnex
 * @param {*} button - button that was pushed
 * @param {*} otherButtonOne - one of two buttons NOT pushed
 * @param {*} otherButtonTwo - one of two buttons NOT pushed
 */
function changeMethod(type, method, button, otherButtonOne, otherButtonTwo) {
    //check if animation is running
    if (animationRunning) {
        //if running, do not run animation
        return;
    } 

    //check what is being changed (add, deleted, or get)
    if (type == "add") {
        //update add method
        addMethod = method;

    } else if (type == "delete") {
        //update delete method
        deleteMethod = method;

        //hide or un-hide delete input based on method
        if (method == "index") {
            deleteContainer.classList.remove("hidden");
        } else {
            deleteContainer.classList.add("hidden");
        }

    } else if (type == "get") {
        //update get method
        getMethod = method;

        //hide or un-hide get input based on method
        if (method == "index") {
            getContainer.classList.remove("hidden");
        } else {
            getContainer.classList.add("hidden");
        }
    }

    //showcase which button has been selected
    button.classList.remove("unselected-button");
    button.classList.add("selected-button");

    otherButtonOne.classList.remove("selected-button");
    otherButtonTwo.classList.remove("selected-button");
    otherButtonOne.classList.add("unselected-button");
    otherButtonTwo.classList.add("unselected-button");
}

//========================================================================================================
// Event listeners
//========================================================================================================

/**
 * After add button is pushed, add input is santized and checked before 
 * calling makeNewNode method to showcase adding an item to linked list
 */
addButton.addEventListener("click", async function() {
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

    //rest message values for clarity
    message.style.color = "black";
    message.innerText = "";

    //get sanitized add item value
    let addValue = DOMPurify.sanitize(addInput.value);

    //split by commas
    let array = addValue.split(",");

    //check which add method is used
    if (addMethod == "index") {
        //ensure that there are pairs of value and indexes
        if (array.length % 2 == 0) {

            //iterate through the elements of the input
            for (let i = 0; i < array.length; i = i + 2) {
                //save and index and value pair
                let index = array[i + 1];
                let value = array[i];

                //check to ensure index is valid number
                if (!Number.isInteger(Number.parseInt(index, 10))) {

                    //if not value, alert user and stop adding information
                    message.style.color = "red";
                    message.innerText = "Your index is NOT a valid integer. Please re-input your values and index";
                    addInput.value = "";
                    return;

                //check if index is within bounds
                } else if (parseInt(index) < 0 || parseInt(index) > numNodes - 1) {
                    //if not value, alert user and stop deletion
                    message.style.color = "red";
                    message.innerText = "Your index is NOT within bounds of the Linked List. Please re-input your values and index";
                    addInput.value = "";
                    return;
                } 

                //update input to showcase what information is being used
                let firstString = addInput.value.substring(addInput.value.indexOf(",") + 1);
                addInput.value = firstString.substring(firstString.indexOf(",") + 1);

                //delay for animation
                await delay(speed);

                //wait for creation and animation is finished
                await makeNewNode(value, index);
            }

        //if invalid input, alert the user
        } else {
            message.style.color = "red";
            message.innerText = "You don't have value, index pairs. Please ensure each value has an associated index";
            return;
        }

    //method is NOT index
    } else {
        let index = -1;
    
        //iterate through input
        for (let i = 0; i < array.length; i++) {
            //check which method is used to update index
            if (addMethod == "end") {
                index = numNodes;
            } else if (addMethod == "front") {
                index = 0;
            }

            //update input to showcase what information is being used
            addInput.value = addInput.value.substring(addInput.value.indexOf(",") + 1);

            //delay for animation
            await delay(speed);

            //wait for creation and animation is finished
            await makeNewNode(array[i], index);
        }
    }

    //clear input
    addInput.value = "";

    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();
});

/**
 * After delete button is pushed, input is santized and checked before 
 * calling deleteNode method to showcase removing an item from a linked list
 */
deleteButton.addEventListener("click", async function() {
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

    //check if there are nodes in the list
    if (numNodes == 0) {

        //alert use of error
        message.innerText = "Error! Deletion cannot happen since the Linked List is empty";
        message.style.color = "red";
        return;
    }

    //re-set message for clarity
    message.innerText = "";
    message.style.color = "black";

    //check which method is being used
    if (deleteMethod == "index") {
        //get and saniztize delete input
        let deleteValue = DOMPurify.sanitize(deleteInput.value);

        //split input by comma
        let array = deleteValue.split(",");

        //iterate through input
        for (let i = 0; i < array.length; i++) {
            //check to ensure index is valid number
            if (!Number.isInteger(Number.parseInt(array[i], 10))) {
                //if not value, alert user and stop deletion
                message.style.color = "red";
                message.innerText = "Your index is NOT a valid integer. Please re-input your values and index";
                deleteInput.value = "";
                return;

            //check if index is within bounds
            } else if (parseInt(array[i]) < 0 || parseInt(array[i]) > numNodes - 1) {
                //if not value, alert user and stop deletion
                message.style.color = "red";
                message.innerText = "Your index is NOT within bounds of the Linked List. Please re-input your values and index";
                deleteInput.value = "";
                return;
            }

            //update input to showcase what information is being used
            deleteInput.value = deleteInput.value.substring(deleteInput.value.indexOf(",") + 1);

            //wait for deletion and animation is finished
            await deleteNode(parseInt(array[i]));
        }

    } else if (deleteMethod == "end") {
        //wait for deletion and animation is finished
        await  deleteNode(numNodes - 1);
    } else if (deleteMethod == "front") {
        //wait for deletion and animation is finished
        await  deleteNode(0);
    }

    //clear delete input
    deleteInput.value = "";

    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();
});

/**
 * After get button is pushed, input is santized and checked before 
 * calling iterateThroughList  to showcase moving through a linked list
 * to get the value at front/end/some index
 */
getButton.addEventListener("click", async function() {
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
    
    //check if there are nodes in the list
    if (numNodes == 0) {
        //alert use of error
        message.innerText = "Error! The list is empty. Please add items before using this method";
        message.style.color = "red";
        return;
    }

    //re-set message color
    message.style.color = "black";

    //begin the message
    let messageValue = "Item(s) Retrieved: ";

    //check which method is being used
    if (getMethod == "index") {
        //get and sanitize input
        let getValue = DOMPurify.sanitize(getInput.value);

        //split input based on commas
        let array = getValue.split(",");

        //iterate through input
        for (let i = 0; i < array.length; i++) {
            //check to ensure index is valid number
            if (!Number.isInteger(Number.parseInt(array[i], 10))) {
                //if not value, alert user and stop deletion
                message.style.color = "red";
                message.innerText = "Your index is NOT a valid integer. Please re-input your values and index";
                getInput.value = "";
                return;

            //check if index is within bounds
            } else if (parseInt(array[i]) < 0 || parseInt(array[i]) > numNodes - 1) {
                //if not value, alert user and stop deletion
                message.style.color = "red";
                message.innerText = "Your index is NOT within bounds of the Linked List. Please re-input your values and index";
                getInput.value = "";
                return;
            }

            //update the message to indicate what is happening
            message.innerText = "Processing... Getting index: " + parseInt(array[i]);

            //update input to showcase what information is being used
            getInput.value = getInput.value.substring(getInput.value.indexOf(",") + 1);

            //run iteration animation
            await iterateThroughList(parseInt(array[i]), true);
            await delay(speed);

            //update message value for later (ensure commas added correctly)
            if (i == array.length - 1) {
                messageValue += valueArray[parseInt(array[i])];
            } else {
                messageValue += valueArray[parseInt(array[i])] + ", ";
            }
        }
    } else if (getMethod == "end") {
        message.innerText = "Processing... Getting index: " + (numNodes - 1);
        messageValue += valueArray[numNodes - 1];

        await iterateThroughList(numNodes - 1, true);
    } else if (getMethod == "front") {
        message.innerText = "Processing... Getting index: 0";
        messageValue += valueArray[0];

        await iterateThroughList(0, true);
    } 

    await delay(speed / 4);

    //clear input value
    getInput.value = "";

    //update message to show all values retrieved
    message.innerText = messageValue;

    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();
});

/**
 * When link button is pressed, update button to show change, 
 * update corresponding variable, and hide or un-hide all left 
 * arrows (double links)
 */
// linkTypeButton.addEventListener("click", function() {
//     //switch doubleLinks value
//     if (!doubleLinks) {
//         linkTypeButton.innerText = "Double";
//         doubleLinks = true;
//     } else {
//         linkTypeButton.innerText = "Single";
//         doubleLinks = false;
//     }

//     //hide or un-hide the left arrows in visual display
//     for (let i = 0; i < doubleLinkArray.length - 1; i++) {
//         doubleLinkArray[i].classList.toggle("hidden");
//     }
// });


//add change method function to each button based on which button was presed
//add method buttons
addFrontButton.addEventListener("click", function () {
 changeMethod("add", "front", addFrontButton, addEndButton, addIndexButton);
});
addEndButton.addEventListener("click", function () {
 changeMethod("add", "end", addEndButton, addFrontButton, addIndexButton);
});
addIndexButton.addEventListener("click", function () {
 changeMethod("add", "index", addIndexButton, addEndButton, addFrontButton);
});

//delete method buttons
deleteFrontButton.addEventListener("click", function () {
 changeMethod("delete", "front", deleteFrontButton, deleteEndButton, deleteIndexButton);
});
deleteEndButton.addEventListener("click", function () {
 changeMethod("delete", "end", deleteEndButton, deleteFrontButton, deleteIndexButton);
});
deleteIndexButton.addEventListener("click", function () {
 changeMethod("delete", "index", deleteIndexButton, deleteEndButton, deleteFrontButton);
});

//get method buttons
getFrontButton.addEventListener("click", function () {
 changeMethod("get", "front", getFrontButton, getEndButton, getIndexButton);
});
getEndButton.addEventListener("click", function () {
 changeMethod("get", "end", getEndButton, getFrontButton, getIndexButton);
});
getIndexButton.addEventListener("click", function () {
 changeMethod("get", "index", getIndexButton, getEndButton, getFrontButton);
});

/**
 * When the speed dial is changed, the speed value 
 * will update and the speed of the animation will be
 * updated
 */
speedChangeDial.addEventListener("change", function() {
    let speedPrecent = speedChangeDial.value;
    
    if (speedPrecent == 100) {
        speed = 0;
    } else if (speedPrecent < 15) {
        speed = ((100 - speedPrecent) * (fullSpeed * 3)) / 100;
    
    } else if (speedPrecent < 30) {
        speed = ((100 - speedPrecent) * (fullSpeed * 2)) / 100;
    } else {
        speed = ((100 - speedPrecent) * fullSpeed) / 100;
    }

    speedLabel.innerText = speedPrecent + "%";
});