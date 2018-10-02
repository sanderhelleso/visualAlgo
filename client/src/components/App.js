import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'animate.css';

import {Button, Icon, Row, Col} from 'react-materialize';

import BarBubbleSort from './charts/barchart/BarBubbleSort';
import BarMergeSort from './charts/barchart/BarMergeSort';

export default class App extends Component {
  render() {
    return (
        <main className='container'>
            <h1>Visual Sorting Algorithms</h1>
            <Row>
                <Col s={12} className=''>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/bubblesort" component={BarBubbleSort} />
                            <Route exact path="/mergesort" component={BarMergeSort} />
                        </div>
                    </BrowserRouter>
                </Col>
            </Row>
        </main>
    )
  }
}
