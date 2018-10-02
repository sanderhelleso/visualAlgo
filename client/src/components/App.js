import React, { Component } from 'react';
import BarBubbleSort from './charts/barchart/BarBubbleSort';
import BarMergeSort from './charts/barchart/BarMergeSort';

export default class App extends Component {
  render() {
    return (
      <div>
            <h1>Visual Sorting Algorithms</h1>
            <BarBubbleSort />
      </div>
    )
  }
}
