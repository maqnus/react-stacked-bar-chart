import React from 'react'
import ReactDOM from 'react-dom'


export default class StackedBars extends React.Component {

	/*	Constructor details:
	 *	Example: <StackedBars months={month_array} />
	 */

  constructor(props) {
    super(props)
    this.state = {data: props.months}
  }

  renderXAxePoints(data) {
    let arr = []
    let ypos = 80
    for (let key in data) {
      let tempStr = "translate("+ypos+",0)"
      arr.push(
        <g className="tick" transform={tempStr}>
          <line y2="6" x2="0"></line>
          <text dy=".71em" y="10" x="-7" >{key}</text>
        </g>
      )
      ypos+=60
    }

    return <g transform="translate(0,20)">
          <g className="x axis" transform="translate(0,450)">
            {arr}
            <path className="domain" d="M0,6V0H900V6"></path>
          </g>
        </g>
  }

  renderYAxePoints() {
    let xPos = "10"
    let yPos = "0"
    let dyPos = ".32em"

    let items = []
    let arr = {
      0: {
        text: "0.0",
        pos: "translate(0,450)"
      },
      1: {
        text: "1.0M",
        pos: "translate(0,402)"
      },
      2: {
        text: "2.0M",
        pos: "translate(0,354)"
      },
      3: {
        text: "3.0M",
        pos: "translate(0,306)"
      },
      4: {
        text: "4.0M",
        pos: "translate(0,258)"
      },
      5: {
        text: "5.0M",
        pos: "translate(0,210)"
      },
      6: {
        text: "6.0M",
        pos: "translate(0,162)"
      },
      7: {
        text: "7.0M",
        pos: "translate(0,114)"
      },
      8: {
        text: "8.0M",
        pos: "translate(0,66)"
      },
      9: {
        text: "9.0M",
        pos: "translate(0,18)"
      }
    }

    for (var k in arr) {
      items.push(<g className="tick" transform={arr[k].pos}>
                  <text dy={dyPos} x={xPos} y={yPos}>{arr[k].text}</text>
                </g>) }

    return <g className="y axis">
            {items}
            <path className="domain" d="M-6,0H0V450H-6"></path>
           </g>
  }

  renderBar(pos, bars) {
    let arr = []
    let ypos = 0

    for (let key in bars) {
      let h = bars[key].percent
      arr.push(<rect width="17" y={ypos} height={h} className={key}></rect>)
      ypos+=h
    }

    return <g className="bar" transform={pos}>{arr}</g>
  }

  getBarHeight(maxBarHeight, bar) {
    let ypos = 0
    for (let key in bar) {
      let h = bar[key].percent
      ypos+=h
    }
    return maxBarHeight-ypos
  }

  renderBars(data) {
    let arr = []
    let marginX = 70
    let maxBarHeight = 450

    for (let key in data) {
      let barHeight = this.getBarHeight(maxBarHeight, data[key])
      arr.push(this.renderBar("translate("+marginX+","+barHeight+")", data[key]))
      marginX+=60
    }

    return <g>{arr}</g>
  }

  render() {
    	return (
        <svg width="960" height="500">
          {this.renderXAxePoints(this.state.data)}
          {this.renderYAxePoints()}
          {this.renderBars(this.state.data)}
        </svg>
    )
  }
}


ReactDOM.render(<StackedBars months={month_array} />, document.getElementById('stackedbars'))