import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {Button, Icon, Row, Col} from 'react-materialize';


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: 'Bar',
            performance: 0,
            entries: 0,
            animationDuration: 3000,
            dataAmount: this.dataAmount(),
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

        this.play = this.play.bind(this);
    }

    play() {
        this.setState({
            performance: 0,
            entries: 0,
            animationDuration: 3000,
            dataAmount: 10,
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
        })

        setTimeout(() => {
            this.bubbleSort();
        }, 2000);
    }

    dataAmount() {
        let data = 50;
        return data;
    }

    createData() {
        const data = [];
        for (let i = 0; i < this.dataAmount(); i++) {
            data[i] = Math.floor(Math.random() * 1000) + 1;
        }

        return data;
    }

    createLabels() {
        const labels = [];
        for (let i = 0; i < this.dataAmount(); i++) {
            labels[i] = `Data ${i}`;
        }

        return labels;
    }

    createBg() {
        const colors = [];
        for (let i = 0; i < this.dataAmount(); i++) {
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

        // start performance timer
        const performanceStart = performance.now();

        // create copy of dataset
        const datasetsCopy = this.state.data.datasets.slice(0);
        let dataCopy = datasetsCopy[0].data.slice(0);

        // update chartdata with random values
        let temp1 = 0;
        let temp2 = 0;
        let entries = 0;
        for (let i = 0; i < dataCopy.length - 1; i++) {

            for (let j = 0; j < dataCopy.length - i - 1; j++) {

                if (dataCopy[j] > dataCopy[j + 1]) {
                    entries++;

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
            performance: (performance.now() - performanceStart),
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

    chart() {

        switch(this.state.chart) {
            case 'Bar':
            return <Bar
                data={this.state.data}
                width={100}
                height={250}
                options={this.chartOptions()}
            />

            case 'Line':
            return <Line
                data={this.state.data}
                width={100}
                height={250}
                options={this.chartOptions()}
            />

        }
    }

    render() {

        return (
            <div>
                <h3>Bubblesort</h3>
                <Button waves='light' onClick={this.play}>Play</Button>
                <h5>Array Entries: {this.state.entries}</h5>
                <h5>Performance (ms): {this.state.performance}</h5>
                {this.chart()}
                
            </div>
        )
    }
}
