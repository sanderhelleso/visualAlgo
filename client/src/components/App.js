import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import BarBubbleSort from './charts/barchart/BarBubbleSort';
import BarMergeSort from './charts/barchart/BarMergeSort';

export default class App extends Component {
  render() {
    return (
      <div>
            <h1>Visual Sorting Algorithms</h1>
            <BrowserRouter>
                <div>
                    <Route exact path="/bubblesort" component={BarBubbleSort} />

                    <Route exact path="/mergesort" component={BarMergeSort} />
                </div>
            </BrowserRouter>
      </div>
    )
  }
}
