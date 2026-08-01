const ErrorMessage = Object.freeze({
    ERROR: 'error',
    SUCESS: 'sucess',
    CHANGE: 'change'
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
        this.n = newN;
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