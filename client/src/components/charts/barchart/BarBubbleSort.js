import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            entries: 0,
            animationDuration: 3000,
            data: {
                labels: this.createLabels(),
                datasets: [
                    {
                        label: '',
                        data: this.createData(),
                        backgroundColor: this.createBg()
                    }
                ]
            }
        }
    }

    createData() {
        const data = [];
        for (let i = 0; i < 200; i++) {
            data[i] = Math.floor(Math.random() * 1000) + 1;
        }

        return data;
    }

    createLabels() {
        const labels = [];
        for (let i = 0; i < 200; i++) {
            labels[i] = `Data ${i}`;
        }

        return labels;
    }

    createBg() {
        const colors = [];
        for (let i = 0; i < 200; i++) {
            // generate colors
            const red = Math.floor(Math.random() * 255) + 1;
            const green = Math.floor(Math.random() * 255) + 1;
            const blue = Math.floor(Math.random() * 255) + 1;
            colors[i] = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        }

        return colors;
    }

    update() {
        // create copy of dataset
        const datasetsCopy = this.state.data.datasets.slice(0);
        const dataCopy = datasetsCopy[0].data.slice(0);

        // update chartdata with random values
        for (let i = 0; i < dataCopy.length; i++) {
            dataCopy[i] = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
        }

        // set copied updated dataset
        datasetsCopy[0].data = dataCopy;
        
        // update data state of chart
        this.setState({
            data: Object.assign({}, this.state.data, {
                datasets: datasetsCopy
            })
        });
    }

    componentDidMount() {
        this.timer = setInterval(
          //() => this.update(),
          1000
        )

        setTimeout(() => {
            // state data
            const datasetsCopy = this.state.data.datasets.slice(0);
            let dataCopy = datasetsCopy[0].data;


            //this.mergeSort(dataCopy);
            this.bubbleSort();
        }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**************** BUBBLE SORT ****************/
    bubbleSort() {

        // create copy of dataset
        const datasetsCopy = this.state.data.datasets.slice(0);
        let dataCopy = datasetsCopy[0].data.slice(0);

        // update chartdata with random values
        let temp1 = 0;
        let temp2 = 0;
        let entries = 0;
        for (let i = 0; i < dataCopy.length - 1; i++) {

            for (let j = 0; j < dataCopy.length - i - 1; j++) {

                entries++;

                if (dataCopy[j] > dataCopy[j + 1]) {
                    temp1 = dataCopy[j];
                    temp2 = dataCopy[j + 1];
            
                    // swap
                    dataCopy[j] = temp2;
                    dataCopy[j + 1] = temp1;
                }
            }
        }
        // set copied updated dataset
        datasetsCopy[0].data = dataCopy;
                            
        // update data state of chart
        this.setState({
            entries: entries,
            data: Object.assign({}, this.state.data, {
                datasets: datasetsCopy
            })
        });
    }
    /**************** END BUBBLE SORT ****************/

    // chart options
    chartOptions() {
        return {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: { 
                xAxes: [{ display: false, }], yAxes: [{ display: true, }], 
            },
            animation: {
                duration: this.state.animationDuration
            }
        }
    }

    render() {

        return (
            <div>
                <h2>Bubblesort</h2>
                <h5>Array Enries: {this.state.entries}</h5>
                <Line
                    data={this.state.data}
                    width={100}
                    height={250}
                    options={this.chartOptions()}
                />
            </div>
        )
    }
}
