//========================================================================================================
// Get DOM Elements
//========================================================================================================
let arrayListDiv = document.getElementById("visualDiv");            //regular array list
let secondArrayListDiv = document.getElementById("visualDiv2");     //second array (for resize)

let speedChangeDial = document.getElementById("speed");             //to change animation speed
let speedLabel = document.getElementById("speed-label");            //to show change in animation speed
let message = document.getElementById("message");                   //for error messages

let sizeMethodButton = document.getElementById("resize");           //re-size method
let increaseByN = true;                                             //method boolean

//change n DOM variables
let nContainer = document.getElementById("change-n-container");
let nValueInput = document.getElementById("nValueInput");
let nValueButton = document.getElementById("nValueButton");

let increasByNButtonText = "Increase by 5";                         //text for change n button amount
let n = 5;                                                          //value of n

//add item DOM variables
let addItemInput = document.getElementById("addItemInput");
let addItemButton = document.getElementById("addItemButton");

//size and capacity of array list
let size = 0;
let capacity = 2;

let speed = 800;        //current speed
let fullSpeed = 1600;   //'full speed'
speedChangeDial.value = 50;         //reset speed dial

//variable for if animation is running or not
let animationRunning = false; 

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
    sizeMethodButton.classList.toggle("unuseable-button");
    nValueButton.classList.toggle("unuseable-button");
    addItemButton.classList.toggle("unuseable-button");
}

/**
 * Add another arrayList item to visual display.
 * 
 * @param {number} id - the id of the array item
 */
function addDisplayItem(id) {
    //create new array item and add styling
    let arrayItem = document.createElement("p");
    arrayItem.classList.add("array-item");

    //add id based on parameter
    let fullId = "array-" + id;
    arrayItem.id = fullId;

    //add array item to display
    arrayListDiv.append(arrayItem);
}

/**
 * Add array item to second display (used for resizing visual).
 * 
 * @param {number} id - the id of the array item
 */
function addSecondDisplayItem(id) {
    //create new array item and add styling
    let arrayItem = document.createElement("p");
    arrayItem.classList.add("array-item");

    //add id based on parameter
    let fullId = "array2-" + id;
    arrayItem.id = fullId;

    //add array item to display

    secondArrayListDiv.append(arrayItem);
}

/**
 * When array list needs to resize, this function showcases that
 * change. It makes the second array visible and adds items from
 * the first array to the second array as a visual to showcase 
 * moving elements from one array to another. Then the visibility 
 * will flip to ensure the first array is the one consitently being 
 * added to.
 * 
 * @param {number} size - number of elements in the array list
 * @param {number} capacity - new capcity of the array list
 */
async function displayResize(size, capacity) {
    //add array items to get it to correct size
    for (let i = size; i < capacity; i++) {
        addSecondDisplayItem(i);
    }

    //make second array list visible
    secondArrayListDiv.classList.toggle("hidden");

    //add items from first (small) array to second (larger) array
    for (let i = 0; i < size; i++) {
        await delay(speed);   //wait for clear change

        //get array items from small and large array
        let smallArrayElement = document.getElementById("array-" + i);
        let bigArrayElement = document.getElementById("array2-" + i);

        //copy value from small to big array
        bigArrayElement.innerText = smallArrayElement.innerText;
    }

    await delay(speed);   //wait for clear change

    //hide smaller array
    arrayListDiv.classList.toggle("hidden");

    //update smaller array to same size
    for (let i = size; i < capacity; i++) {
        addDisplayItem(i);
    }

    //flip visibility of both arrays (first visible, second not)
    secondArrayListDiv.classList.toggle("hidden");
    arrayListDiv.classList.toggle("hidden");

    //clear array items in second array
    for (let i = 0; i < size; i++) {
        let bigArrayElement = document.getElementById("array2-" + i);

        bigArrayElement.innerText = "";
    }

    //last delay for clear change of next added item
    await delay(speed);
}

/**
 * Add value from user input into the array list display, resizing 
 * if needed.
 * 
 * @param {*} item - value of item being added to array list
 */
async function addArrayItem (item) {
    //get id of array item to be added to
    let id = "array-" + size;

    //check if resize is needed
    if (size == capacity) {
        //save old capacity in case of reaching limit
        let oldCapacity = capacity;

        //check type of re-sizing and update capacity
        if (increaseByN) {
            capacity = capacity + n;
        } else {
            capacity = capacity * 2;
        }

        //check if capacity  passes over limit
        if (capacity > 32) {
            //reset capacity
            capacity = oldCapacity;           
            
            //convey error to user
            message = "The limit of this display has been reached!";
            message.style.color = "red";
            return;
        }

        //clear message
        message = "";
        
        //showcase resize
        await displayResize(size, capacity);
    }

    //update value in array item
    let displayArrayItem = document.getElementById(id);
    displayArrayItem.innerText = item;
}


//========================================================================================================
// Event listeners 
//========================================================================================================

/**
 * When size method button is pressed, change the 
 * increase method and associated variables.
 */
sizeMethodButton.addEventListener("click", function() {//check if animation is running
    if (animationRunning) {
        //if running, do not run animation
        return;
    } 

    //check what method is current in use
    if (increaseByN) {
        //update to doubling and showcase through button
        increaseByN = false;
        sizeMethodButton.innerText = "Double";
    } else {
        //update to increase by n and showcase through button
        increaseByN = true;
        sizeMethodButton.innerText = increasByNButtonText;
    }

    //hide or make visible change n container as need
    nContainer.classList.toggle("hidden");
});


/**
 * When change n value button is pressed, update n and 
 * update the Increase by n button's display
 */
nValueButton.addEventListener("click", function() {
    //check if animation is running
    if (animationRunning) {
        //if running, do not run animation
        return;
    } 

    //get input and sanitize
    let newN = DOMPurify.sanitize(nValueInput.value);
    nValueInput.value = "";

    //check if input is number
    if (newN == "") {
        //convey error to user
        message.style.color = "red";
        message.innerText = "Please enter a number!";
        return;
    }

    //clear message
    message.innerText = "";

    //save newN value in n variable
    n = parseInt(newN);

    //update increase by n button display
    increasByNButtonText = "Increase by " + newN;
    sizeMethodButton.innerText = increasByNButtonText;
});

/**
 * When add item button is pressed, the values in the 
 * input are added to the array list display. This includes 
 * commas separating items and the input value changing to 
 * showcase items being added.
 */
addItemButton.addEventListener("click", async function () {
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

    //get value of add item input
    let value = DOMPurify.sanitize(addItemInput.value);
    
    //split value by comma
    let array = value.split(",");

    //iterate through items in the array
    for (let i of array) {
        //add item in array
        await addArrayItem(i);

        //update the add item input to showcase item was added
        addItemInput.value = addItemInput.value.substring(addItemInput.value.indexOf(",") + 1);

        //increase size (number of elements in array)
        size++;

        //wait before next update
        await delay(speed);
    }

    //clear input
    addItemInput.value = "";

    //update animation running variable
    animationRunning = false;

    //un-grey buttons
    toggleButtonFunction();
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