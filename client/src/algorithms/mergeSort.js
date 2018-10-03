export function mergeSort(data) {

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