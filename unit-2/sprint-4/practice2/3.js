function CustomArray(initialData) {
    this.data = initialData || [];

    
    this.map = function(callback) {
        let result = [];
        for (let i = 0; i < this.data.length; i++) {
            result.push(callback(this.data[i], i, this.data));
        }
        return result;
    };

    
    this.filter = function(callback) {
        let result = [];
        for (let i = 0; i < this.data.length; i++) {
            if (callback(this.data[i], i, this.data)) {
                result.push(this.data[i]);
            }
        }
        return result;
    };

    
    this.reduce = function(callback, initialValue) {
        let accumulator = initialValue !== undefined ? initialValue : this.data[0];
        let startIndex = initialValue !== undefined ? 0 : 1;

        for (let i = startIndex; i < this.data.length; i++) {
            accumulator = callback(accumulator, this.data[i], i, this.data);
        }
        return accumulator;
    };

   
    this.forEach = function(callback) {
        for (let i = 0; i < this.data.length; i++) {
            callback(this.data[i], i, this.data);
        }
    };

    
    this.sort = function(compareFunction) {
        let sortedData = [...this.data];
        sortedData.sort(compareFunction);
        return sortedData;
    };
}

