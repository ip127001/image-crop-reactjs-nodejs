import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';

// import PostSorting from './posts/PostSorting'
import './App.css'

import ImageCrop from './Components/ImageCrop/ImageCrop';
import Pics from './Components/ImageCrop/Pics';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Switch>
          <Route path="/" exact component={ImageCrop} />
          <Route path="/pics" exact component={Pics} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
