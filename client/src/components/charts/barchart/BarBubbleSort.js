import React, { Component } from 'react';
import { Bar, Line, Radar, Pie, HorizontalBar } from 'react-chartjs-2';
import { Button, Icon, Row, Col, Tabs, Tab, Input } from 'react-materialize';
import CountUp from 'react-countup';
import Highlight from 'react-highlight';


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: 'Bar',
            performance: 0,
            entries: 0,
            animationDuration: 5000,
            dataAmount: 100,
            data: {
                labels: this.createLabels(100),
                datasets: [
                    {
                        label: '',
                        data: this.createData(100),
                        backgroundColor: this.createBg(100)
                    }
                ]
            }
        }

        // play
        this.play = this.play.bind(this);

        // charts
        this.setBarChart = this.setBarChart.bind(this);
        this.setRadarChart = this.setRadarChart.bind(this);
        this.setLineChart = this.setLineChart.bind(this);
        this.setPieChart = this.setPieChart.bind(this);
        this.setHrBarChart = this.setHrBarChart.bind(this);

        // input
        this.updateAmount = this.updateAmount.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
    }

    play() {
        document.querySelector('#chart').className = 'col s8 animated fadeIn';
        this.setState({
            performance: 0,
            entries: 0,
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

        this.chart();
        setTimeout(() => {
            document.querySelector('#chart').className = 'col s8 animated';
            this.bubbleSort();
        }, 1000);
    }

    createData(amount) {
        if (amount == undefined) {
            amount = this.state.dataAmount;
        }

        const data = [];
        for (let i = 0; i < amount; i++) {
            data[i] = Math.floor(Math.random() * 1000) + 1;
        }

        return data;
    }

    createLabels(amount) {
        if (amount == undefined) {
            amount = this.state.dataAmount;
        }

        const labels = [];
        for (let i = 0; i < amount; i++) {
            labels[i] = `Data ${i}`;
        }

        return labels;
    }

    createBg(amount) {
        if (amount == undefined) {
            amount = this.state.dataAmount;
        }

        const colors = [];
        for (let i = 0; i < amount; i++) {
            // generate colors
            const red = Math.floor(Math.random() * 255) + 1;
            const green = Math.floor(Math.random() * 255) + 1;
            const blue = Math.floor(Math.random() * 255) + 1;
            colors[i] = `rgba(${red}, ${green}, ${blue}, 0.5)`;
        }

        return colors;
    }

    componentDidMount() {
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
                xAxes: [{ display: false, }], yAxes: [{ display: false, }], 
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
                options={this.chartOptions()}
            />

            case 'Line':
            return <Line
                data={this.state.data}
                options={this.chartOptions()}
            />

            case 'Radar':
            return <Radar
                data={this.state.data}
                options={this.chartOptions()}
            />

            case 'Pie':
            return <Pie
                data={this.state.data}
                options={this.chartOptions()}
            />

            case 'HorizontalBar':
            return <HorizontalBar className='animated fadeIn'
                data={this.state.data}
                options={this.chartOptions()}
            />

        }
    }

    setBarChart() {
        this.setState({
            chart: 'Bar'
        });

        this.play();
    }

    setRadarChart() {
        this.setState({
            chart: 'Radar'
        });

        this.play();
    }

    setLineChart() {
        this.setState({
            chart: 'Line'
        });

        this.play();
    }

    setPieChart() {
        this.setState({
            chart: 'Pie'
        });

        this.play();
    }

    setHrBarChart() {
        this.setState({
            chart: 'HorizontalBar'
        });

        this.play();
    }

    // update amount of chart
    updateAmount(e) {
        if (e.target.value <= 300) {
            this.setState({
                dataAmount: e.target.value
            });
        }

        else {
            window.Materialize.toast('Max data amount is 300!', 200);
        }
        console.log(e.target.value);
    }

    updateDuration(e) {
        this.setState({
            animationDuration: e.target.value * 1000
        });
    }

    render() {

        return (
            <Row>
                <Col s={4}>
                    <h3>Bubblesort</h3>
                    <Row>
                        <Input s={6} label="Amount of data" validate defaultValue='100' onChange={(e) => {this.updateAmount(e)}} />
                        <Input s={6} label="Visual Duration (sec)" validate defaultValue='5' onChange={(e) => {this.updateDuration(e)}}/>
                        <Input s={6} label="Datatype" disabled={true} validate defaultValue='Integer' />
                    </Row>
                    <h5>Chart</h5>
                    <Button waves='light' onClick={this.setBarChart}>Bar</Button>
                    <Button waves='light' onClick={this.setHrBarChart}>Horizontal Bar</Button>
                    <Button waves='light' onClick={this.setLineChart}>Line</Button>
                    <Button waves='light' onClick={this.setPieChart}>Pie</Button>
                    <Button waves='light' onClick={this.setRadarChart}>Radar</Button>
                </Col>
                <Col id='chart' s={8}>
                    <h5>Array Entries: {this.state.entries} </h5>
                    <h5>Performance (ms): {this.state.performance}</h5>
                    {this.chart()}
                </Col>
                <Col s={12}>
                    <Highlight className='javascript'> {`
                        function bubbleSort(dataCopy) {
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
                        }`}
                    </Highlight>
                </Col>
            </Row>
        )
    }
}
