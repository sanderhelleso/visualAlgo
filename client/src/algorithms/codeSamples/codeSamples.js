export function codeSamples() {
    const codeSamples = {
        bubbel_sort: `
        function bubbleSort(data) {
            let temp1 = 0;
            let temp2 = 0;
            for (let i = 0; i < data.length - 1; i++) {
                for (let j = 0; j < data.length - i - 1; j++) {
                    if (data[j] > data[j + 1]) {
    
                        temp1 = data[j];
                        temp2 = data[j + 1];
                
                        // swap
                        data[j] = temp2;
                        data[j + 1] = temp1;
                    }
                }
            }
        }`,
        merge_sort: `
        function mergeSort(data) {

            if (data.length === 1) {
                // return once we hit an array with a single item
                return data;
            }
        
            const middle = Math.floor(data.length / 2); // middle index
            const left = data.slice(0, middle); // left
            const right = data.slice(middle); // right
        
            return merge(mergeSort(left), mergeSort(right), data);
        }
        
        function merge(left, right, data) {
        
            let result = [];
            let indexLeft = 0;
            let indexRight = 0;
        
            while(indexLeft < left.length && indexRight < right.length) {
                if (left[indexLeft] < right[indexRight]) {
                    result.push(left[indexLeft]);
                    indexLeft++;
                }
                
                else {
                    result.push(right[indexRight]);
                    indexRight++;
                }
            }
        
            // set copied updated dataset
            const datasetsCopy = data;
            datasetsCopy[0].data = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
        
            return datasetsCopy[0].data;
        }
        `
    }

    return codeSamples;
}