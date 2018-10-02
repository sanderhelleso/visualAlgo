import React, { Component } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: 0,
            data: {
                labels: this.createLabels(),
                datasets: [
                    {
                        label: 'Data 1 - 300',
                        data: this.createData(),
                        backgroundColor: this.createBg()
                    }
                ]
            }
        }
    }

    createData() {
        const data = [];
        for (let i = 0; i < 300; i++) {
            data[i] = Math.floor(Math.random() * 1000) + 1;
        }

        return data;
    }

    createLabels() {
        const labels = [];
        for (let i = 0; i < 300; i++) {
            labels[i] = `Data ${i}`;
        }

        return labels;
    }

    createBg() {
        const colors = [];
        for (let i = 0; i < 300; i++) {
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
            this.mergeSort(dataCopy);
        }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    /**************** MERGE SORT ****************/
    mergeSort(data) {

        if (data.length === 1) {
            // return once we hit an array with a single item
            return data;
        }

        const middle = Math.floor(data.length / 2); // middle index
        const left = data.slice(0, middle); // left
        const right = data.slice(middle); // right

        return this.merge(this.mergeSort(left),  this.mergeSort(right), data);
    }

    merge(left, right, data) {

        let result = [];
        let indexLeft = 0;
        let indexRight = 0;
        
        let entries = 0;
        while(indexLeft < left.length && indexRight < right.length) {
            entries++;
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
        const datasetsCopy = this.state.data.datasets.slice(0);
        datasetsCopy[0].data = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
                            
        // update data state of chart
        this.setState({
            entries: entries += entries,
            data: Object.assign({}, this.state.data, {
                datasets: datasetsCopy
            })
        });

        return datasetsCopy[0].data;
    }

    render() {

        return (
            <div>
                <h2>Mergesort</h2>
                <h5>Array Enries: {this.state.entries}</h5>
                <Line
                    data={this.state.data}
                    width={100}
                    height={250}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        scales: { 
                            xAxes: [{ display: false, }], yAxes: [{ display: true, }], 
                        },
                        animation: {
                            duration: 5000
                        }
                    }}
                />
            </div>
        )
    }
}
