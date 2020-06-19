import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  handleLogin() {
    console.log(this)
    this.props.history.push('/work')
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.handleLogin.bind(this)}>login</button>
      </div> 
    )
  }
}

export default Login