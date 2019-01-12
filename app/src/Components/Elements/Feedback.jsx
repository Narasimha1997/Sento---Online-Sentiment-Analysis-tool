import React from 'react'
import ReactDOM from 'react-dom'
import { Paper, Typography, Divider, Input, Button , TextField} from '@material-ui/core';
//var sendmail = require('sendmail')()

class Feedback extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            feedbackText : '',
            subject : ''
        }
    }

    handlerMail(username, subject, feedbackText) {
        fetch('http://localhost:5000/REST.php', {
            headers : {
                "Content-Type" : "text/plain"
            },
            method : 'post',
            mode : 'no-cors',
            body : JSON.stringify({
                email : this.state.username,
                title : this.state.subject,
                description : this.state.feedbackText,
                classification : 'NONE',
                probability : 0.0
            })}).then((data) =>{
                alert("Submitted your feedback !")
            }).catch((err) => alert("Error in feedback"))
    }

    render() {
        return (
            <div style = {{marginTop: "90px", marginLeft: '350px', padding: '20'}}>
                <Paper style = {{margin : '10px auto', width : '95%', padding : '30px'}}>
                   <Typography variant = "h4">Feedback :</Typography>
                   <Typography variant = "body2">Your feedback can be of types, It can be a review or opinion about the app, or it can be a request to add your own model or contribute to Open Source.</Typography>
                   <Divider/>
                   <div style = {{marginTop : '10px'}}>
                      <Typography variant = "subtitle2">Email : </Typography>
                      <Input placeholder = "yourid@somemail.com" value = {this.state.username} onChange = {(e) => {
                          this.setState({username : e.target.value})
                      }}/>
                   </div>
                   <div style = {{marginTop : '10px'}}>
                      <Typography variant = "subtitle2">Subject : </Typography>
                      <Input  value = {this.state.subject} onChange = {(e) => this.setState({subject : e.target.value})}/>
                   </div>
                   <div style = {{marginTop : '10px'}}>
                      <TextField
                                label="body : "
                                multiline
                                rows="10"
                                value={this.state.feedbackText}
                                onChange={(e) => {this.setState({feedbackText : e.target.value})}}
                                variant="outlined"
                                style={{ width: '95%' }}
                            />
                   </div>
                   <Button variant = "contained" color = "primary" onClick = {() => {
                       this.handlerMail(this.state.username, this.state.subject, this.state.feedbackText)
                   }} style = {{marginTop : '10px'}}>Submit</Button>
                </Paper>
            </div>
        )
    }
}

export default Feedback;