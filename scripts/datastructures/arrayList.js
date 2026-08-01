let arrayListDiv = document.getElementById("visualDiv");

let addItemInput = document.getElementById("addItemInput");
let addItemButton = document.getElementById("addItemButton");

// let addItemInput = document.getElementById("addItemInput");
// let addItemButton = document.getElementById("addItemButton");

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
    console.log(size);

    let id = "array-" + size;

    let message = arrayList.addItem(item);
    console.log(message);

    if (message == ErrorMessage.CHANGE) {
        let capacity = arrayList.getCapacity();

        for (let i = size; i < capacity; i++) {
            addDisplayItem(i);
        }
    }

    let displayArrayItem = document.getElementById(id);
    displayArrayItem.innerText = item;
}

addItemButton.addEventListener("click", function () {
    addArrayItem(addItemInput.value);
    addItemInput.value = "";
});