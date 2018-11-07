import React from 'react'
import ReactDOM from 'react-dom'
import  Drawer  from '@material-ui/core/Drawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon  from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import {Navigator} from './Home'
import Paper from '@material-ui/core/Paper'
import TrailPanel from './Elements/TrailInference'
import  Typography  from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ExpansionPanelActions } from '@material-ui/core';
import About from './Elements/About'
import Feedback from './Elements/Feedback'


class ModelSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {selected : 0}
    }

    render() {
        return (
            <div style={{ marginTop: "90px", marginLeft: '350px', padding: '20' }}>
                <Paper style = {{margin : "30px auto", width : '95%'}}>
                    <div style = {{padding : '100px'}}>
                       <Typography variant = "h5">Select a Neural Network Model : </Typography>
                       <Divider />
                       <ExpansionPanel>
                           <ExpansionPanelSummary>
                               <Typography variant = "body1">CNN Resnet 256</Typography>
                           </ExpansionPanelSummary>
                           <ExpansionPanelDetails>
                               <Typography variant = "body1">CNN Resnet is a Convolution Neural Network that can
                               perform feature based classification, here the context of the document is not taken into account
                               as they don't have memory with feedback loop, they are used for feature extraction.</Typography>
                           </ExpansionPanelDetails>
                           <ExpansionPanelActions>
                                <Button variant = "small" onClick = {() => {
                                    this.props.handler(1, "CNN")
                                }}>Launch CNN Instance</Button>
                            </ExpansionPanelActions>       
                       </ExpansionPanel>
                       <ExpansionPanel>
                           <ExpansionPanelSummary>
                               <Typography variant = "body1">LSTM Sentiment Classifier</Typography>
                           </ExpansionPanelSummary>
                           <ExpansionPanelDetails>
                               <Typography variant = "body1">LSTM (Long-Short Term Memory) is a recurrent Neural Network
                                architecture that is very good at classifying data based on the context, they are very good at Language understanding tasks.</Typography>
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button variant = "small" onClick = {() => {
                                    this.props.handler(1, "LSTM")
                                }}>Launch LSTM Instance</Button>
                            </ExpansionPanelActions>                        
                       </ExpansionPanel>
                    </div>
                    <div style ={{padding : '30px'}}>
                       <Grid container spacing = {8}>
                           <Grid item xs = {6} style = {{textAlign : 'justify'}}>
                              <Typography variant = "h6">Want to contribute your model ?</Typography>
                              <Typography variant = "body1">The Project is OpenSourced under MIT License, You can contribute to it 
                              either by adding new features or by adding new NLP models to be used by others. Steps to add your model : </Typography>
                              <Typography variant = "body1">1. Tell about your model through Feedback panel or raise an issue on github.</Typography>
                              <Typography variant = "body1">2. Create Model.json and Metadata.json files for your Model and serve them through a static web storage.</Typography>
                              <Typography variant = "body1">3. Write preprocessor and inference functions for your model in Common.js file.</Typography>
                              <Typography variant = "body1">4. Create a enrty in config.json, with follwing key structure : model_name : [model (url of model.json), metadata : (url of metadata.json), preprocessor : (preprocessor function object). inference : (inference function object) ] </Typography>

                            <Typography variant = "subtitle1">Then create a UI Entry above, if these conditions are satisfied, sento will create a <strong>ModelAndMetadata</strong> object for your neural network.</Typography>

                           </Grid>
                           <Grid item xs = {5} style = {{paddingTop : "50px", paddingLeft : '30px'}}>
                               <div style = {{background : "url(\'./git.jpg\')center/cover", width : '100%', height : '200px'}}></div>
                           </Grid>
                       </Grid>
                    </div>
                </Paper>
            </div>
        )
    }
}


class SidePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Drawer variant = "permanent">
               <div style = {{width : '300px'}}>
                   <List style = {{paddingTop : '70px'}}>
                       <ListItem button onClick = {() => {
                           this.props.handler(0)
                       }}> 
                           <ListItemIcon><Icon>more</Icon></ListItemIcon>
                           <ListItemText primary = "Trail Mode" secondary = "Use it when you want to experiment with the API" />
                       </ListItem>
                       <Divider />
                       <ListItem button>
                           <ListItemIcon><Icon>insert_chart_outline</Icon></ListItemIcon>
                           <ListItemText primary = "Analyze" secondary = "Upload a CSV file and obtain insights" />
                       </ListItem>
                       <Divider />
                       <ListItem button onClick = {() => {
                           this.props.handler(3)
                       }}>
                           <ListItemIcon><Icon>public</Icon></ListItemIcon>
                           <ListItemText primary = "About" secondary = "Know more about the tool" />
                       </ListItem>
                       <Divider />
                       <ListItem button onClick = {() => {
                           this.props.handler(4)
                       }}>
                           <ListItemIcon><Icon>sentiment_satisfied</Icon></ListItemIcon>
                           <ListItemText primary = "Feedback" secondary = "Share your thoughts about the product" />
                       </ListItem>
                       
                   </List>
               </div>
            </Drawer>
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <main><div><this.props.component handler = {this.props.handler} model = {this.props.model}/></div></main>
        )
    }
}

class Dashboard extends React.Component {

    constructor() {
        super()

        this.state = {
            component : ModelSelector,
            model_code : 'sss'
        }

        this.handler = this.handler.bind(this)
        this.handler_1 = this.handler_1.bind(this)
    }

    handler(code) {

        switch(code) {
            case 0 : this.setState({component : ModelSelector}); break;
            case 1 : this.setState({component : TrailPanel}); break;
            case 3 : this.setState({component : About}); break;
            case 4 : this.setState({component : Feedback}); break;
            default : break;
        }

    }

    handler_1(code, model) {
        switch(code) {
            case 1 : 
               if(model === 'CNN') this.setState({component : TrailPanel, model_code : 'CNN'});
               else this.setState({component : TrailPanel, model_code : 'LSTM'});
               break;
            default : break;
        }
    }

    render() {
        return (
            <div>
                <Navigator />
                <div>
                    <SidePanel handler = {this.handler}/>
                </div>
                <Main component = {this.state.component} handler = {this.handler_1} model = {this.state.model_code}/>
            </div>
        );
    }
}


export {Dashboard}