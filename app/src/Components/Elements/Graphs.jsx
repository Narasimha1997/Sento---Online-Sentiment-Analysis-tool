import React from 'react'
import ReactDOM from 'react-dom'

import {PieChart} from 'react-chartkick'
import Chart from 'chart.js'
import { Grid, Typography, Divider, Tabs, Tab } from '@material-ui/core';



class PositiveScore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Typography variant = "body1">Number of Positive Sentences : {this.props.result.totalPositive}</Typography>
                <Typography variant = "body1"> % Positive : <strong>{this.props.result.averagePositive.toFixed(2)}</strong></Typography>
                <Typography variant = "body2">Check detailed report to know more.</Typography>
            </div>
        )
    }
}

class NegativeScore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Typography variant = "body1">Number of Negative Sentences : {this.props.result.totalNegative}</Typography>
                <Typography variant = "body1"> % Negative : <strong>{this.props.result.averageNegative.toFixed(2)}</strong></Typography>
                <Typography variant = "body2">Check detailed report to know more.</Typography>
            </div>
        )
    }
}

class GoodnessRatio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <Typography variant = "body2">Goodness Ratio is the ratio of number of positive outcomes to number of examples.</Typography>
               <div style = {{margin : '20px auto', textAlign : 'center'}}>
               <Typography variant = "h2">{this.props.result.goodnessRatio.toFixed(2)}</Typography>
               </div>
            </div>
        )
    }
}


class AnalyticsGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resultData : this.props.resultData,
            tabIndex : 0
        }
        this.handler = this.handler.bind(this)
    }

    handler(e, v) {
        this.setState({tabIndex : v})
    }

    render() {
        return(
            <div>
                <Grid container spacing = {8}>
                    <Grid item xs = {6}>
                        <Typography variant = "h5">Result : {this.state.resultData.totalTime.toFixed(2) + "ms"}</Typography>
                        <Divider />
                        <div style = {{marginTop : '20px'}}>
                            <Typography variant = "body1">Total Sentences : {this.state.resultData.results.length}</Typography>
                            <Tabs value = {this.state.tabIndex} indicatorColor = "primary" textColor  = "primary" scrollable scrollButtons = "auto" onChange = {this.handler}>
                                <Tab label = "Positive Score"></Tab>
                                <Tab label = "Negative Score"></Tab>
                                <Tab label = "Goodness Ratio"></Tab>
                            </Tabs>
                            <div style = {{padding : '20px'}}>
                               {(this.state.tabIndex === 0) && <PositiveScore result = {this.state.resultData}/>}
                               {(this.state.tabIndex === 1) && <NegativeScore result = {this.state.resultData}/>}
                               {(this.state.tabIndex === 2) && <GoodnessRatio result = {this.state.resultData}/>}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                       <Pie chartData = {[
                           ["Positive ", this.state.resultData.averagePositive.toFixed(2)],
                           ["Negative", this.state.resultData.averageNegative.toFixed(2)]
                        ]}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


class Pie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData : this.props.chartData
        }
    }

    render() {
        return (
            <div style = {{margin : '10px auto'}}>
                <PieChart data = {this.state.chartData} />
            </div>
        )
    }
}

export default AnalyticsGrid;