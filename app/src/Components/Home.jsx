import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MenuIcon from '@material-ui/icons/Menu'
import Paper  from '@material-ui/core/Paper';
import Button  from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Icon from '@material-ui/core/Icon'
import  BottomNavigation  from '@material-ui/core/BottomNavigation';
import {Dashboard} from './Dashboard'

class Navigator extends React.Component {
     render() {
        return (
            <AppBar style = {{textAlign : 'left', width  : "100%", position : 'fixed', zIndex  : 100000}}>
              <Toolbar>
                  <IconButton color = "inherit" aria-label = "Menu">
                     <MenuIcon />
                  </IconButton>
                  <Typography variant = "h6" color = "inherit">Sento</Typography>
              </Toolbar>
              </AppBar>
        )
    }
}

class BottomNavigator extends React.Component {
    render() {
        return(
            <BottomNavigation style = {{position : 'fixed', bottom : 0, width : '100%', backgroundColor : "#002984"}}>
                <BottomNavigationAction label="Recents" icon={<Icon style = {{color : '#fff'}}>pages</Icon>} />
                <BottomNavigationAction label="Like" icon={<Icon style = {{color : '#fff'}}>thumb_up_alt</Icon>} />
                <BottomNavigationAction label="Get Code" icon={<Icon style = {{color : '#fff'}}>drafts</Icon>} />
            </BottomNavigation>
        )
    }
}

class LoginCard extends React.Component {
    constructor() {
        super()
        this.state = {
            userName : '', password : ''
        }
    }

    render() {
        return (
           <Paper style = {{backgroundColor : '#fff'}}>
              <Grid container spacing = {8}>
                  <Grid item xs = {7}>
                     <div style = {{background : 'url(\'./back1.png\')center/cover', width : '100%', height : '400px'}}>
                        <Typography style = {{position : 'relative', left : '20px', top : '30px', color : '#fff'}}variant = "h2"> Evolve with ML </Typography>
                     </div>
                  </Grid>

                  <Grid item xs = {5} style = {{padding : '30px', textAlign : 'center'}}>
                     <Typography variant = "h2">Sento</Typography>
                     <Typography variant = "body2">An online Sentiment Analysis tool</Typography>

                     <div style = {{padding : '20px', textAlign : 'justify'}}>
                       <Typography variant = "subtitle1">Sento is an online tool that uses Machine Learning to 
                        perform sentiment analysis on large data. This app helps you to classify sentiment (meaning) behind 
                        a comment, review, survey etc. Thus you can use this tool to understand your customers and build / improve 
                        products.
                       </Typography>

                       <div style = {{textAlign : 'center'}}>
                       <Button variant="extendedFab" style = {{backgroundColor : '#4615b2'}} onClick = {() => {
                           ReactDOM.render(<Dashboard />, document.getElementById('root'))
                       }}>
                          <NavigationIcon style = {{color : '#fff', padding : '10px'}}/>
                          <Typography style = {{color : '#fff', padding : '10px'}} variant = "body1">Explore</Typography>
                       </Button>
                       </div>
                    
                     </div>
                  </Grid>
                
              </Grid>
           </Paper>
        )
    }
}

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {showUi : false}
    }

    render() {
        return(
        <div>
            <Navigator />
        <div style = {{backgroundColor : '#2196F3', width : '100%', height : '100%', paddingTop : '50px', paddingBottom : '50px'}}>
                 
                 <div style = {{width : '90%', margin : '80px auto'}}>
                     <LoginCard />
                 </div>
        </div>
        <BottomNavigator />
        </div>)
    }
}

export  {Navigator, BottomNavigator, HomePage}