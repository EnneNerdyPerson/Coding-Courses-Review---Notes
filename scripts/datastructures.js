const ErrorMessage = Object.freeze({
    ERROR: 'error',
    SUCESS: 'sucess',
    CHANGE: 'change',
    BOUND: 'index out of bounds'
});


class ArrayList {
    constructor() {
        this.size = 0;
        this.capacity = 2;
        this.arr = new Array();

        this.reallocType = "increase";
        this.n = 5;
    }

    addItem(item) {
        let message = "";
        if (this.size == this.capacity) {
            message = this.resize();

            if (message == ErrorMessage.ERROR) {
                return ErrorMessage.ERROR;
            }
        }

        this.arr[this.size] = item;
        this.size++;

        return message;
    }

    resize() {
        if (this.reallocType == "increase") {
            this.capacity = this.capacity + this.n;
        } else if (this.reallocType == "double") {
            this.capacity = this.capacity * 2;
        }

        if (this.capacity > 33) {
            return ErrorMessage.ERROR;
        } else {
            return ErrorMessage.CHANGE;
        }
    }

    changeN(newN) {
        this.n = parseInt(newN);
    }

    changeReallocType() {
        if (this.reallocType == "increase") {
            this.reallocType = "double";
        } else if (this.reallocType == "double") {
            this.reallocType = "increase";
        }
    }

    clearArray() {
        this.arr = new Array();
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    getCapacity() {
        return this.capacity;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }

    updateNext(next) {
        this.next = next;
    }

    getNext() {
        return this.next;
    }

    updatePrev(prev) {
        this.prev = prev;
    }

    getPrev() {
        return this.prev;
    }

    getValue() {
        return this.value;
    }
}

class LinkedListSingle {
    constructor() {
        this.head = null;
        this.tail = null;

        this.size = 0;

        this.circular = false;
        this.addFront = true;
        this.addEnd = false;

        this.deleteFront = true;
        this.deleteEnd = false;

        this.getFront = true;
        this.getEnd = false;
    }

    getSize() {
        return this.size;
    }

    updateCircular() {
        if (this.circular == true) {
            this.circular == false;
        } else {
            this.circular == true;
        }
    }

    addItemIndex(value, index) {
        if (this.head == null) {
            this.head = new Node(value);
            this.tail = this.head;
            this.size++;

            return ErrorMessage.SUCESS;
        }

        if (index == 0) {
            let temp = this.head;
            let newNode = new Node(value);

            this.head = newNode;
            newNode.updateNext(temp);

            this.size++;
            return ErrorMessage.SUCESS;

        } else if (index == this.size) {
            let temp = this.tail;
            let newNode = new Node(value);

            temp.updateNext(newNode);
            this.tail = newNode;

            this.size++;
            return ErrorMessage.SUCESS;
        }

        let previous = null;
        let current = this.head;
        let i = 0;

        while (current != null && i <= index) {
            if (i != index) {
                previous = current;
                current = current.getNext();
            } else {
                let newNode = new Node(value);
                previous.updateNext(newNode);
                newNode.updateNext(current);

                this.size++;

                return ErrorMessage.SUCESS;
            }

            i++
        }

        return ErrorMessage.BOUND;
    }

    addItem(value, index) {
        if (this.addEnd) {
            return this.addItemIndex(value, this.size);
        } else if (this.addFront) {
            return this.addItemIndex(value, 0);
        } else {
            return this.addItemIndex(value, index);
        }
    }

    updateAddItem(type) {
        if (this.addFront) {
            this.addEnd = true;
            this.addFront = false;
        } else if (this.addEnd) {
            this.addEnd = false;
            this.addFront = false;
        } else {
            this.addEnd = false;
            this.addFront = true;
        }
    }

    getAddMethod() {
        if (this.addEnd) {
            return "end";
        } else if (this.addFront) {
            return "front";
        } else {
            return "index";
        } 
    }

    deleteItemIndex(index) {
        if (this.size == 0) {
            return ErrorMessage.BOUND;
        }

        if (index == 0) {
            let temp = this.head;

            this.head = temp.getNext();

            this.size--;
            return ErrorMessage.SUCESS;

        } 

        let previous = null;
        let current = this.head;
        let i = 0;

        while (current != null && i <= index) {
            if (i != index) {
                previous = current;
                current = current.getNext();
            } else {
                let next = current.getNext();
                previous.updateNext(next);

                if (index == this.size) {
                    this.tail = previous;
                }

                this.size--;

                return ErrorMessage.SUCESS;
            }

            i++
        }

        return ErrorMessage.BOUND;
    }

    deleteItem(index) {
        if (this.deleteEnd) {
            return this.deleteItemIndex(this.size - 1);
        } else if (this.deleteFront) {
            return this.deleteItemIndex(0);
        } else {
            return this.deleteItemIndex(index);
        }
    }

    updateDeleteItem(type) {
        if (this.deleteFront) {
            this.deleteEnd = true;
            this.deleteFront = false;
        } else if (this.true) {
            this.deleteEnd = false;
            this.deleteFront = false;
        } else {
            this.deleteEnd = false;
            this.deleteFront = true;
        }
    }

    getDeleteMethod() {
        if (this.deleteEnd) {
            return "end";
        } else if (this.deleteFront) {
            return "front";
        } else {
            return "index";
        } 
    }

    getItemIndex(index) {
        let current = this.head;
        let i = 0;

        while (current != null && i <= index) {
            if (i != index) {
                current = current.getNext();
            } else {
                return current.getValue();
            }

            i++
        }

        return ErrorMessage.BOUND;
    }

    getItem(index) {
        if (this.getEnd) {
            return this.getItemIndex(this.size - 1);
        } else if (this.getFront) {
            return this.getItemIndex(0);
        } else {
            return this.getItemIndex(index);
        }
    }

    updateGetItem(type) {
        if (this.getFront) {
            this.getEnd = true;
            this.getFront = false;
        } else if (this.getEnd) {
            this.getEnd = false;
            this.getFront = false;
        } else {
            this.getEnd = false;
            this.getFront = true;
        }
    }

    getGetMethod() {
        if (this.getEnd) {
            return "end";
        } else if (this.getFront) {
            return "front";
        } else {
            return "index";
        } 
    }
}

// class LinkedListDouble {
//     constructor() {
//         this.head = null;
//         this.tail = null;

//         this.size = 0;

//         this.circular = false;
//         this.addEnd = true;
//         this.addFront = false;

//         this.deleteFront = true;
//         this.deleteEnd = false;

//         this.getFront = true;
//         this.getEnd = false;
//     }

//     updateCircular() {
//         if (this.circular == true) {
//             this.circular == false;
//         } else {
//             this.circular == true;
//         }
//     }

//     addItemIndex(value, index) {
//         if (this.head == null) {
//             this.head = new Node(value);
//             this.tail = this.head;

//             size++;

//             return ErrorMessage.SUCESS;
//         }

//         if (index == 0) {
//             let temp = this.head;
//             let newNode = new Node(value);

//             this.head = newNode;
//             newNode.updateNext(temp);

//             this.size++;
//             return ErrorMessage.SUCESS;

//         } else if (index == this.size) {
//             let temp = this.tail;
//             let newNode = new Node(value);

//             temp.updateNext(newNode);
//             newNode.upatePrev(temp);
//             this.tail = newNode;

//             this.size++;
//             return ErrorMessage.SUCESS;
//         }

//         let previous = null;
//         let current = this.head;
//         let i = 0;

//         while (current != null && i <= index) {
//             if (i != index) {
//                 previous = current;
//                 current = current.getNext();
//             } else {
//                 let newNode = new Node(value);
//                 previous.updateNext(newNode);
//                 newNode.updatePrev(previous);

//                 newNode.updateNext(current);
//                 current.updatePrev(newNode);

//                 this.size++;

//                 return ErrorMessage.SUCESS;
//             }

//             i++
//         }

//         return ErrorMessage.BOUND;
//     }

//     addItem(value, index) {
//         if (this.addEnd) {
//             return this.addItemIndex(value, this.size);
//         } else if (this.addFront) {
//             return this.addItemIndex(value, 0);
//         } else {
//             return this.addItemIndex(value, index);
//         }
//     }

//     updateAddItem(type) {
//         if (type == "end") {
//             this.addEnd = true;
//             this.addFront = false;
//         } else if (type == "front") {
//             this.addEnd = false;
//             this.addFront = true;
//         } else if (type == "index") {
//             this.addEnd = false;
//             this.addFront = false;
//         } else {
//             return ErrorMessage.ERROR;
//         }

//         return ErrorMessage.SUCESS;
//     }

//     deleteItemIndex(index) {
//         if (this.size == 0) {
//             return ErrorMessage.BOUND;
//         }

//         if (index == 0) {
//             let temp = this.head;

//             this.head = temp.getNext();
//             temp.updatePrev(null);

//             this.size--;
//             return ErrorMessage.SUCESS;
//         } else if (index == this.size) {
//             let temp = this.tail;
//             let prev = temp.getPrev();

//             this.tail = prev;
//             prev.updateNext(null);

//             this.size--;
//             return ErrorMessage.SUCESS;
//         }

//         let previous = null;
//         let current = this.head;
//         let i = 0;

//         while (current != null && i <= index) {
//             if (i != index) {
//                 previous = current;
//                 current = current.getNext();
//             } else {
//                 let next = current.getNext();

//                 previous.updateNext(next);
//                 next.updatePrev(previous);

//                 if (index == this.size) {
//                     this.tail = previous;
//                 }

//                 this.size--;

//                 return ErrorMessage.SUCESS;
//             }

//             i++
//         }

//         return ErrorMessage.BOUND;
//     }

//     deleteItem(index) {
//         if (this.deleteEnd) {
//             return this.deleteItemIndex(this.size - 1);
//         } else if (this.deleteFront) {
//             return this.deleteItemIndex(0);
//         } else {
//             return this.deleteItemIndex(index);
//         }
//     }

//     updateDeleteItem(type) {
//         if (type == "end") {
//             this.deleteEnd = true;
//             this.deleteFront = false;
//         } else if (type == "front") {
//             this.deleteEnd = false;
//             this.deleteFront = true;
//         } else if (type == "index") {
//             this.deleteEnd = false;
//             this.deleteFront = false;
//         } else {
//             return ErrorMessage.ERROR;
//         }

//         return ErrorMessage.SUCESS;
//     }

//     getItemIndex(index) {
//         let current = this.head;
//         let i = 0;

//         while (current != null && i <= index) {
//             if (i != index) {
//                 current = current.getNext();
//             } else {
//                 return current.getValue();
//             }

//             i++
//         }

//         return ErrorMessage.BOUND;
//     }

//     getItem(index) {
//         if (this.getEnd) {
//             return this.tail.getValue();
//         } else if (this.getFront) {
//             return this.head.getValue();
//         } else {
//             return this.getItemIndex(index);
//         }
//     }

//     updateGetItem(type) {
//         if (type == "end") {
//             this.getEnd = true;
//             this.getFront = false;
//         } else if (type == "front") {
//             this.getEnd = false;
//             this.getFront = true;
//         } else if (type == "index") {
//             this.getEnd = false;
//             this.getFront = false;
//         } else {
//             return ErrorMessage.ERROR;
//         }

//         return ErrorMessage.SUCESS;
//     }
// }