import React from 'react'
import ReactDOM from 'react-dom'
import TrailRuntime from '../../Inference/TrailRuntime'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip'
import TagFacesIcon from '@material-ui/icons/TagFaces';

import {BarChart, LineChart} from 'react-chartkick'
import Chart from 'chart.js'



var config = require('../../Inference/config.json')

class ResultInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = { calculatedValue: 0, result: this.props.result }
    }

    render() {
        return (
            <div>
                <Typography variant="h5">Result : </Typography>
                <Divider />
                <div style={{ margin: '10px' }}>
                    <span style={{ padding: '10px' }}> <Chip icon={<TagFacesIcon />} label={this.state.result.metadata.percentagePositive.toFixed(2) + "% Positive"} /> </span>
                    <span style={{ padding: '10px' }}> <Chip icon={<TagFacesIcon />} label={this.state.result.metadata.percentageNegative.toFixed(2) + "% Negative"} /> </span>
                    <Divider style={{ marginTop: '10px' }} />
                    <div>
                        <Typography variant="subtitle1">Time Taken : {this.state.result.time.toFixed(2) + "ms"}</Typography>
                        {
                            (this.state.result.metadata.result === "Pos") && (
                                <Typography variant="body1">The above paragraph implies <strong>Positive</strong> outcome.</Typography>
                            ) ||
                            (this.state.result.metadata.result === "Neg") && (
                                <Typography variant="body1">The above paragraph implies <strong>Negative</strong> outcome.</Typography>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class GraphPlotter extends React.Component {

    constructor(props) {
        super(props)
        this.state = { result: this.props.result, data : [
            ["Positive", this.props.result.metadata.percentagePositive ],
            ["Negative", this.props.result.metadata.percentageNegative ]
        ] }
    }

    render() {
        return (
            <div style = {{marginLeft : '10px'}}>
                <Typography variant = "subtitle1">Positive v/s Negative</Typography>
                <BarChart data={this.state.data} />
                <Divider />
                <Typography variant = "subtitle1">Time Variation Graph :</Typography>
                <LineChart data={this.props.time} />
            </div>
        )
    }

}


class TrailPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            text: '',
            showResult: false,
            result: {
                score : 0.0, time : 0.0, metadata : {
                    percentagePositive : 100. * 0.0,
                    percentageNegative : 100 * 0,
                    result : "Pos"
                }
            },
            times : []
        }
        console.log(this.props.model)
        this.handler = this.handler.bind(this)
        if(this.props.model === "CNN") {
            this.modelRuntime = new TrailRuntime(this.handler, config.hosted)
            console.log('Loaded CNN MOdel')
        }
        else {
            this.modelRuntime = new TrailRuntime(this.handler, config.hosted_lstm)
            console.log('Loaded LSTM Model')
        }
    }

    handler(message) {
        this.setState({ message: message })
    }

    render() {
        return (<div style={{ marginTop: "90px", marginLeft: '350px', padding: '20' }}>
            <Typography variant="h2" >Trial Mode</Typography>
            <Typography variant="subtitle2">Trial mode lets you to test the model dynamically on a single paragraph.</Typography>
            <Divider />
            <div style={{ marginTop: '20px', width: '92%', backgroundColor: '#2E7D32', color: '#fff', padding: '10px' }}>
                <Typography variant="body1" style={{ color: '#fff' }}>{this.state.message}</Typography>
            </div>
            <Paper style={{ height: '100%', width: '95%', marginTop: '20px', padding: '20px' }}>
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <Typography variant="h5">Prediction Console : </Typography>
                        <Divider />
                        <Typography variant="body2">Enter the text here, Only english language is supported as of now.</Typography>
                        <div style={{ marginTop: '20px' }}>
                            <TextField
                                label="Text : "
                                multiline
                                rows="10"
                                value={this.state.text}
                                onChange={(e) => { this.setState({ text: e.target.value }); this.setState({ result: null, showResult: false }) }}
                                variant="outlined"
                                style={{ width: '95%' }}
                            />
                            <div style={{ margin: '10px auto' }}>
                                <Button variant="contained" color="primary" onClick={() => {
                                    var result = this.modelRuntime.runPredictions(this.state.text)
                                    this.handler("Status Ok!")
                                    console.log(result)
                                    this.state.times = [... this.state.times, [
                                        this.state.times.length + 1 , result.time
                                    ]]
                                    this.setState({ showResult: true, result: result })
                                }}>
                                    Predict
                        </Button>
                            </div>
                            {
                                (this.state.showResult) && (
                                    <ResultInfo result={this.state.result} />
                                )
                            }
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                       {
                           (this.state.showResult) && (
                               <GraphPlotter result = {this.state.result} time = {this.state.times}/>
                           )
                       }
                    </Grid>
                </Grid>
            </Paper>
        </div>)
    }
}

export {TrailPanel, ResultInfo}