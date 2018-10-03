import React, { Component } from 'react';
import { Bar, Line, Radar, Pie, HorizontalBar } from 'react-chartjs-2';
import { Button, Icon, Row, Col, Tabs, Tab, Input } from 'react-materialize';
import CountUp from 'react-countup';
import Highlight from 'react-highlight';

// import algos
import { bubbleSort } from '../../../algorithms/bubbleSort';


export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: 'Bar',
            performance: 0,
            entries: 0,
            animationDuration: 3000,
            shuffleTime: 1000,
            dataAmount: 50,
            data: {
                labels: this.createLabels(50),
                datasets: [
                    {
                        label: '',
                        data: this.createData(50),
                        backgroundColor: this.createBg(50)
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

    // initialete app state
    componentDidMount() {
        const newData = bubbleSort(this.state.data.datasets.slice(0))[0];
        this.setState({
            entries: newData.entries,
            performance: newData.performance,
            data: Object.assign({}, this.state.data, {
                datasets: [{
                    data: newData.data,
                    backgroundColor: newData.backgroundColor
                }]
            })
        });
    }

    play() {
        document.querySelector('#chart').className = 'col s8 animated fadeIn';
        this.setState({
            performance: 0,
            entries: 0,
            shuffleTime: this.state.animationDuration,
            animationDuration: 1000,
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
            this.setState({
                animationDuration: this.state.shuffleTime,
                shuffleTime: 1000
            });
            document.querySelector('#chart').className = 'col s8 animated';

            this.bubbleSort();
        }, 1000);
    }

    bubbleSort() {
        const newData = bubbleSort(this.state.data.datasets.slice(0))[0];
        this.setState({
            entries: newData.entries,
            performance: newData.performance,
            data: Object.assign({}, this.state.data, {
                datasets: [{
                    data: newData.data,
                    backgroundColor: newData.backgroundColor
                }]
            })
        });
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
            labels[i] = `Data ${i + 1}`;
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
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

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
                duration: this.state.animationDuration,
                animationEasing: 'linear'
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
            window.Materialize.toast('Max data amount is 300!', 2000);
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
                        <Input s={6} label="Amount of data" validate defaultValue='50' onChange={(e) => {this.updateAmount(e)}} />
                        <Input s={6} label="Visual Duration (sec)" validate defaultValue='3' onChange={(e) => {this.updateDuration(e)}}/>
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
                    <div id='stats'>
                        <h5>Array Entries: {this.state.entries} </h5>
                        <h5>Performance (ms): {this.state.performance}</h5>
                    </div>
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
