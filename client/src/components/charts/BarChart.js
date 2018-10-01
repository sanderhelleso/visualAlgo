import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: this.createLabels(),
                datasets: [
                    {
                        label: 'Bubble Sort',
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
            labels[i] = `Label ${i}`;
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
        /*this.timer = setInterval(
          () => this.update(),
          1000
        )*/

        setTimeout(() => {
            this.bubbleSort();
        }, 2000);
      }
    
      componentWillUnmount() {
        clearInterval(this.timer)
      }

      bubbleSort() {
            // create copy of dataset
            const datasetsCopy = this.state.data.datasets.slice(0);
            const dataCopy = datasetsCopy[0].data.slice(0);

            // update chartdata with random values
            let temp1 = 0;
            let temp2 = 0;
            for (let i = 0; i < dataCopy.length - 1; i++) {
                for (let j = 0; j < dataCopy.length - i - 1; j++) {
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
                data: Object.assign({}, this.state.data, {
                    datasets: datasetsCopy
                })
            });
      }

    /*componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: {
                    labels: ['Test 1', 'Test 2', 'Test 3'],
                    datasets: [
                        {
                            label: 'Population',
                            data: [
                                123455,
                                323131,
                                131313,
                                123123,
                                193131,
                                173123
                            ],
                            backgroundColor: [
                               'rgba(215, 44, 44, 0.5)',
                               'rgba(200, 10, 44, 0.5)',
                               'rgba(100, 14, 200, 0.5)'
                            ]
                        }
                    ]
                }
            });

            console.log(this.state.data.datasets[0].data)
            setTimeout(() => {
                this.setState(this.state);
            }, 1000);
        }, 2000);
    }*/

    render() {

        return (
            <div>
                <Bar
                    data={this.state.data}
                    width={100}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}
