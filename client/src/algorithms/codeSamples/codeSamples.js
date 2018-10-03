export function codeSamples() {
    const codeSamples = {
        bubbleSort: `
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
        mergeSort: 'qeqe'
    }

    return codeSamples;
}