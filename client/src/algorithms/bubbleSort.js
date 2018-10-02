export const bubbleSort = () => {

        // create copy of dataset
        const datasetsCopy = this.state.data.datasets.slice(0);
        const dataCopy = datasetsCopy[0].data.slice(0);

        // update chartdata with random values
        let temp1 = 0;
        let temp2 = 0;
        let timer = 1000;
        for (let i = 0; i < dataCopy.length - 1; i++) {
            for (let j = 0; j < dataCopy.length - i - 1; j++) {
                if (dataCopy[j] > dataCopy[j + 1]) {

                    timer += 1000;
                    this.timer = setTimeout(
                        () => {
                            console.log(123);
                            temp1 = dataCopy[j];
                            temp2 = dataCopy[j + 1];
            
                            // swap
                            dataCopy[j] = temp2;
                            dataCopy[j + 1] = temp1;

                            // set copied updated dataset
                            datasetsCopy[0].data = dataCopy;
                            
                            // update data state of chart
                            this.setState({
                                data: Object.assign({}, this.state.data, {
                                    datasets: datasetsCopy
                                })
                            });
                        }
                        ,
                        timer
                    )
                }
            }
        }
    }