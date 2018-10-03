export function bubbleSort(dataset) {

    // start performance timer
    const performanceStart = performance.now();

    // create copy of dataset
    let dataCopy = dataset[0].data.slice(0);
    let dataBg = dataset[0].backgroundColor.slice(0);

    // temp values to swap data
    let temp1 = 0;
    let temp2 = 0;
    let bgTemp1 = 0;
    let bgTemp2 = 0;

    let entries = 0;
    for (let i = 0; i < dataCopy.length - 1; i++) {

        for (let j = 0; j < dataCopy.length - i - 1; j++) {

            if (dataCopy[j] > dataCopy[j + 1]) {
                entries++;

                temp1 = dataCopy[j];
                temp2 = dataCopy[j + 1];
                bgTemp1 = dataBg[j];
                bgTemp2 = dataBg[j + 1];
        
                // swap
                dataCopy[j] = temp2;
                dataCopy[j + 1] = temp1;
                dataBg[j] = bgTemp2;
                dataBg[j + 1] = bgTemp1;
            }
        }
    }
    // set copied updated dataset
    dataset[0].data = dataCopy;
    dataset[0].backgroundColor = dataBg;
    dataset[0].entries = entries;
    dataset[0].performance = performance.now() - performanceStart;

    return dataset;
}