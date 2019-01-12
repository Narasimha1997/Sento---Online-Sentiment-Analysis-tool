import React from 'react'
import ReactDOM from 'react-dom'
import { Paper, Typography, Button, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ReactFileReader from 'react-file-reader'
import StreamInference from '../../Inference/StreamInference'
import {ResultInfo} from './TrailInference'

import AnalyticsGrid from './Graphs'

var config = require('../../Inference/config.json')

class ContainerClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            compoment : FileUpload,
            metadata : null
        }
        this.handler = this.handler.bind(this)
    }

    handler(code, mtd) {
        switch(code) {
            case 1 : this.setState({compoment : FileUpload, metadata : mtd}); break;
            case 2 : this.setState({compoment : Analyzer, metadata : mtd}); break;
            default : break 
        }
    }

    render() {
        return (
            <div>
                <div style = {{marginTop: "90px", marginLeft: '350px', padding: '20'}}>
                   <this.state.compoment metadata = {this.state.metadata} handler = {this.handler} />
                </div>
            </div>
        )
    }
}


class Analyzer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textData : this.props.metadata,
            eventMessages : [],
            result : [],
            showResult : false
        }
        this.uiHandler = this.uiHandler.bind(this)

        this.streamRunner = new StreamInference(config.hosted, this.uiHandler)
    }

    uiHandler(msg) {
        this.setState({eventMessages : [...this.state.eventMessages, <Typography style = {{color : '#fff'}} variant = "body1">{msg}</Typography>]})
        console.log(this.state.eventMessages)
    }


    render() {
        return (
            <div>
                <div style = {{padding : '10px'}}>
                   <Typography variant = "h2">Stream Analysis : </Typography>
                   <Divider />
                   <div style = {{margin : '10px auto', color : '#fff', backgroundColor : '#000', padding : '10px'}}>
                      {
                          this.state.eventMessages.map((k, v) => {
                              return (k)
                          })
                      }
                   </div>
                </div>
                <div>
                    <Paper style = {{margin : '20px auto', width : '95%', padding : '30px'}}>
                        <Typography variant = "body1">Once model is loaded, click on the button below</Typography>
                        <Divider />
                        <div style = {{marginTop : '20px'}}>
                            <Button variant = "contained" color = "primary" onClick = {() => {
                                this.streamRunner.init(this.state.textData)
                                var result = this.streamRunner.run()
                                this.setState({result : result, showResult : true})
                            }}>Run Inference</Button>
                        </div>
                        <div style = {{padding : '10px'}}>
                            {
                                (this.state.showResult) && (
                                    <AnalyticsGrid resultData = {this.state.result} />
                                )
                            }
                        </div>
                        <div style = {{marginTop : '20px'}}>
                           {
                               (this.state.showResult) && 
                               <IndividualResults resultObjects = {this.state.result.results} textData = {this.state.result.textData}/>
                           }
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }

}


class FileUpload extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fileName : ''
        }

        this.fileHandler = this.fileHandler.bind(this)
    }

    fileHandler(fileData) {
        var reader = new FileReader()
        reader.onload = ((file) => {
            return (e) => {
                var paragraphs = e.target.result.split("\n")
                console.log(paragraphs)
                this.props.handler(2, paragraphs)
            }
        })(fileData[0])

        reader.readAsText(fileData[0])
    }

    render() {
        return (
            <div>
                <Paper style = {{margin : '10px auto', width : '90%', padding : "50px", textAlign : 'center'}}>
                   <div>
                       <img src = "./analysis.gif" width = "300px" height = "300px" />
                       <div style = {{margin : '20px auto', width : "50%"}}>
                          <Typography variant = "h4">Upload a File : (Preferable CSV)</Typography>
                          <Typography variant = "body1">
                              Upload a file containing your data, Data should be in following way , Each paragraph is a line 
                              and a new line is considered as a next paragraph.
                          </Typography>
                          <div style = {{margin : '20px auto'}}>
                             <ReactFileReader handleFiles = {this.fileHandler}>
                                <Button variant = "contained" color = "primary">Upload File</Button>
                             </ReactFileReader>
                          </div>
                       </div>
                   </div>
                </Paper>
            </div>
        )
    }
}


class IndividualResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resultObjects : this.props.resultObjects,
            textData : this.props.textData
        }
    }


    render() {
        var i  = -1;

        return(
            <div style = {{marginTop : '20px'}}>
               <Typography variant = "body1">Individual Results :</Typography>
               <Divider />
               <div style = {{marginTop : '20px'}}>
                   {
                       this.state.resultObjects.map((k, v) => {
                           i++;
                           return (
                               <ExpansionPanel>
                                   <ExpansionPanelSummary>
                                       <Typography variant = "body2">Sentence {i + 1}</Typography>
                                   </ExpansionPanelSummary>
                                   <ExpansionPanelDetails>
                                   <Typography variant = "body2">{this.state.textData[i]}</Typography>
                                   <Divider />
                                   <div style = {{marginTop : "10px", textAlign : 'left', padding : '20px'}}>
                                       <ResultInfo result = {k} />
                                   </div>
                                   </ExpansionPanelDetails>
                               </ExpansionPanel>
                           ) 
                       })
                   }
               </div>
            </div>
        )
    }
}

export default ContainerClass
