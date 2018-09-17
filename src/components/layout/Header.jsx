import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      //barley by Christoffer Skogsmo from the Noun Project

      <nav className="navbar fixed-top navbar-light bg-inverse" style={{backgroundColor: "#512b1b"}}>
        <a className="navbar-brand" href="#">
          <span data-toggle="tooltip" data-placement="top" title="barley by Christoffer Skogsmo from the Noun Project">
              <img className ="logo-custom d-inline-block align-center" width="75px" height="75px" alt=""/>
          </span>
          <span style={{paddingLeft: "15px"}}>&nbsp;</span>
          <span className="title-custom align-center">Beaus</span>
        </a>
      </nav>
      

    )
  }
}

export default Header;
