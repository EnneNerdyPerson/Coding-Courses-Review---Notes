let arrayListDiv = document.getElementById("visualDiv");
let arrayListDiv2 = document.getElementById("visualDiv2");

let sizeMethodButton = document.getElementById("resize");
let increaseByN = true;
let increasByNButtonText = "Increase by 5";

let nContainer = document.getElementById("change-n-container");
let nValueInput = document.getElementById("nValueInput");
let nValueIButton = document.getElementById("nValueButton");

let addItemInput = document.getElementById("addItemInput");
let addItemButton = document.getElementById("addItemButton");

let arrayList = new ArrayList();

const delay = ms => new Promise(res => setTimeout(res, ms));

function addDisplayItem(id) {
    let arrayItem = document.createElement("p");
    arrayItem.classList.add("array-item");

    let fullId = "array-" + id;
    arrayItem.id = fullId;

    arrayListDiv.append(arrayItem);
}

function secondDisplayItem(id) {
    let arrayItem = document.createElement("p");
    arrayItem.classList.add("array-item");

    let fullId = "array2-" + id;
    arrayItem.id = fullId;

    arrayListDiv2.append(arrayItem);
}

async function change(size, capacity) {
    arrayListDiv2.classList.toggle("hidden");

    for (let i = size; i < capacity; i++) {
        secondDisplayItem(i);
    }

    for (let i = 0; i < size; i++) {
        await delay(800);
        let smallArrayElement = document.getElementById("array-" + i);
        let bigArrayElement = document.getElementById("array2-" + i);

        bigArrayElement.innerText = smallArrayElement.innerText;
    }

    await delay(800);
    arrayListDiv.classList.toggle("hidden");

    for (let i = size; i < capacity; i++) {
        addDisplayItem(i);
    }

    arrayListDiv2.classList.toggle("hidden");
    arrayListDiv.classList.toggle("hidden");

    for (let i = 0; i < size; i++) {
        let bigArrayElement = document.getElementById("array2-" + i);

        bigArrayElement.innerText = "";
    }

    await delay(800);
}

async function addArrayItem (item) {
    let size = arrayList.getSize();

    let id = "array-" + size;

    let message = arrayList.addItem(item);

    if (message == ErrorMessage.CHANGE) {
        let capacity = arrayList.getCapacity();
        await change(size, capacity);
    }

    let displayArrayItem = document.getElementById(id);
    displayArrayItem.innerText = item;
}

nValueIButton.addEventListener("click", function() {
    let newN = nValueInput.value;
    arrayList.changeN(newN);

    increasByNButtonText = "Increase by " + newN;
    sizeMethodButton.innerText = increasByNButtonText;
    nValueInput.value = "";
});

sizeMethodButton.addEventListener("click", function() {
    if (increaseByN) {
        increaseByN = false;
        sizeMethodButton.innerText = "Double";
    } else {
        increaseByN = true;
        sizeMethodButton.innerText = increasByNButtonText;
    }

    nContainer.classList.toggle("hidden");
    arrayList.changeReallocType();
});

addItemButton.addEventListener("click", async function () {
    let value = addItemInput.value;
    
    let array = value.split(",");
    for (let i of array) {
        await addArrayItem(i);
        addItemInput.value = addItemInput.value.substring(addItemInput.value.indexOf(",") + 1);
        await delay(800);
    }

    // addArrayItem(addItemInput.value);
    addItemInput.value = "";
});