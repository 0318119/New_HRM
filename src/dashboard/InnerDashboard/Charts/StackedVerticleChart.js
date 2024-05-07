import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class StackedVerticleChart extends Component {
	render() {
		const options = {
			
            height: 250,
			title: {
				// text: "Popular Majors Opted by Women & Men"
			},
			toolTip: {
				shared: true
			},
			legend: {
				verticalAlign: "top"
			},
			axisY: {
				suffix: "%"
			},
			data: [{
				type: "stackedBar100",
				color: "#e48900",
				name: "Male",
				showInLegend: true,
				indexLabel: "{y}",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "7+Years",   y: 85 },
					{ label: "5 Years",   y: 79 },
					{ label: "5-7 Years",   y: 18 }
				]
			},{
				type: "stackedBar100",
				color: "#77e4d4",
				name: "Female",
				showInLegend: true,
				indexLabel: "{y}%",
				indexLabelFontColor: "white",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ label: "7+Years",   y: 85 },
					{ label: "5 Years",   y: 79 },
					{ label: "5-7 Years",   y: 18 }
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
}
export default StackedVerticleChart;                