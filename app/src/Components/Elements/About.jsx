import React from 'react'
import ReactDOM from 'react-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'


class AboutCard extends React.Component {
    render() {
        return (
            <div>
                <Paper style = {{margin : '10px auto', padding : '20px'}}>
                         <Typography variant = "h2"> About Sento : </Typography>
                         <Divider />
                         <div style = {{margin : '10px auto', width : "90%", height : '400px', background : 'url(\'./AI.gif\')center/cover'}}></div>
                         <Typography variant = "body1">
                           Sento is a free open source web application , that provides a interface to access the power of 
                           deep learning models for Natural Language Processing. Sento is developed as a part of academic project, and
                           aims to provide access to anyone with a business need, for example a small retail owner who don't have capital to
                           invest in cloud based NLP for sentiment analysis can use our platform. He collects the data, i.e the reviews from all his
                           customers and then uses this tool to get the feedback on the product (i.e the products sold by him), he then uses his common sense
                           to analyze weak points and improves it. This is a step towrads <strong>Democratizing AI</strong>, that means making AI accessable to everyone accross the world.
                         </Typography>
                </Paper>
            </div>
        )
    }
}

class About extends React.Component {
    constructor(props) {
        super()
    }
    

    render() {
        return(
            <div style = {{marginTop: "90px", marginLeft: '350px', padding: '20'}}>
               <AboutCard />
            </div>
        )
    }
}

export default About;