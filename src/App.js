import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Login from './Login'
import Editor from './Editor'

export default function () {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/work" component={Editor} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}