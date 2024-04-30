import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
// var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class HorizontalCharts extends Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "#6c1348",
			title:{
				// text: "Most Popular Social Networking Sites"
			},
			axisX: {
				// title: "Social Network",
				reversed: true,
			},
			axisY: {
				// title: "Monthly Active Users",
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  2200000000, label: "Administration" },
					{ y:  1800000000, label: "Marketing" },
					{ y:  800000000, label: "Finance" },
					{ y:  563000000, label: "Customer Support" },
					{ y:  376000000, label: "IT" },
					{ y:  336000000, label: "Human Resource" },
					{ y:  330000000, label: "Sale" },
					{ y:  330000000, label: "Accounting" }
				]
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
export default HorizontalCharts;  