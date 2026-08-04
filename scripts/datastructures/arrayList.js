let arrayListDiv = document.getElementById("visualDiv");

let sizeMethodButton = document.getElementById("resize");
let increaseByN = true;

let nContainer = document.getElementById("change-n-container");
let nValueInput = document.getElementById("nValueInput");
let nValueIButton = document.getElementById("nValueButton");

let addItemInput = document.getElementById("addItemInput");
let addItemButton = document.getElementById("addItemButton");

let arrayList = new ArrayList();

function addDisplayItem(id) {
    let arrayItem = document.createElement("p");
    arrayItem.classList.add("array-item");

    let fullId = "array-" + id;
    arrayItem.id = fullId;

    arrayListDiv.append(arrayItem);
}

function addArrayItem (item) {
    let size = arrayList.getSize();

    let id = "array-" + size;

    let message = arrayList.addItem(item);

    if (message == ErrorMessage.CHANGE) {
        let capacity = arrayList.getCapacity();

        for (let i = size; i < capacity; i++) {
            addDisplayItem(i);
        }
    }

    let displayArrayItem = document.getElementById(id);
    displayArrayItem.innerText = item;
}

nValueIButton.addEventListener("click", function() {
    let newN = nValueInput.value;
    arrayList.changeN(newN);
    nValueInput.value = "";
});

sizeMethodButton.addEventListener("click", function() {
    if (increaseByN) {
        increaseByN = false;
        sizeMethodButton.innerText = "Double";
    } else {
        increaseByN = true;
        sizeMethodButton.innerText = "Increase by n";
    }

    nContainer.classList.toggle("hidden");
    arrayList.changeReallocType();
});

addItemButton.addEventListener("click", function () {
    let value = addItemInput.value;

    if (value.indexOf(",") >= 0) {
        let array = value.split(",");
        for (let i of array) {
            addArrayItem(i);
        }
    } else {
        addArrayItem(value);
    }

    // addArrayItem(addItemInput.value);
    addItemInput.value = "";
});