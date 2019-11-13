import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.currentUser;
    this.logout = this.props.logout;
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if (this.props.loc.url === "/discover") {
      let background = document.getElementsByClassName("home");
      return ($(background).addClass("here"));
    } else if (this.props.loc.url === "/library") {
      let background = document.getElementsByClassName("library");
      return ($(background).addClass("here"));
    } else if (this.props.loc.url === "/upload") {
      let background = document.getElementsByClassName("upload");
      return ($(background).addClass("here"));
    }
  }

  componentWillUnmount() {
    if (this.props.loc.url === "/discover") {
      let background = document.getElementsByClassName("home");
      return ($(background).removeClass("here"));
    } else if (this.props.loc.url === "/library") {
      let background = document.getElementsByClassName("library");
      return ($(background).removeClass("here"));
    } else if (this.props.loc.url === "/upload") {
      let background = document.getElementsByClassName("upload");
      return ($(background).removeClass("here"));
    }
  }

  // clicked() {
    
  //   return e => {
  //     ele = e.currentTarget;
  //     ($(ele).addClass("clicked"));
  //   };
  // }

  toggle() {
    // return e => {
      if (this.state.open) {
        this.setState({open: false});
      } else {
        this.setState({open: true});
      }
    
      // ele = e.currentTarget;
      // return ($(ele).addClass("clicked"));
    // };
  }

  render() {
    return (
      <div className="navBar">
        <div className="components">
          <Link to="/discover" className="mainLogo">
            <img className="navShoe" src={window.shoe} />
            {/* <Link to="/discover" className="mainLogoText">SLOWCLOUD</Link> */}
          </Link>
          <Link to="/discover" className="link home">Home</Link>
          <Link to="/library" className="link library">Library</Link>
          <form className="search" >
            <input type="text" 
              className="bar" 
              placeholder="Search for artists or songs (e.g.My Bloody Valentine)"
            />
          </form>
          <Link to="/upload" className="link upload">Upload</Link>
          
          <button className="profile" >{this.props.currentUser.username}</button>
          
          <div className="menu">
            <div className="dropDown" onClick={this.toggle}>
              {(this.state.open) ? (
                <div className="dropDown">
                  <div>...</div>
                  <div className="flexingRight">
                    <button 
                      onClick={this.logout} 
                      className="loggingOut"
                      >Logout
                    </button>
                  </div>
                </div>
              ) : <div>...</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar;