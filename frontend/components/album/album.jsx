
import React from 'react';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  constructor(props) {
    super(props);
    // debugger
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.addHover = this.addHover.bind(this);
    this.removeHover = this.removeHover.bind(this);
    this.playSong = this.playSong.bind(this);
    this.state = {
      currentSong: false,
      playing: false
    };
  }
  
  
  componentDidMount() {
    // debugger
    if (Object.values(this.props.state.ui.mediaPlayer).length > 0 &&
    this.props.state.ui.mediaPlayer.songs[0] &&
    this.props.state.ui.mediaPlayer.songs[0].album_id === this.props.album.id) {
      let button = document.getElementById(`play${this.props.album.id}`);
      $(button).addClass("visibleButton");
      button.addEventListener("mouseover", this.addPauseHover);
      button.addEventListener("mouseleave", this.removePauseHover);
      this.setState({
        currentSong: true,
        playing: true
      });
    } else {
      let ele = document.getElementById(`pic${this.props.album.id}`);
      ele.addEventListener("mouseover", this.addClass);
      ele.addEventListener("mouseleave", this.removeClass);
      let button = document.getElementById(`play${this.props.album.id}`);
      button.addEventListener("mouseover", this.addClass);
      button.addEventListener("mouseover", this.addHover);
      button.addEventListener("mouseleave", this.removeClass);
      button.addEventListener("mouseleave", this.removeHover);
    }
  }
  
  addClass() {
    let ele = document.getElementById(`play${this.props.album.id}`);
    $(ele).addClass("visibleButton");
  }
  addHover() {
    let eles = document.getElementById(`playButton${this.props.album.id}`);
    $(eles).addClass("playHovered");
  }
  removeHover() {
    let eles = document.getElementById(`playButton${this.props.album.id}`);
    $(eles).removeClass("playHovered");
  }
  addPauseHover() {
    // debugger
    let eles = document.getElementById(`pauseButton`);
    $(eles).addClass("playHovered");
  }
  removePauseHover() {
    let eles = document.getElementById(`pauseButton`);
    $(eles).removeClass("playHovered");
  }
  removeClass() {
    let ele = document.getElementById(`play${this.props.album.id}`);
    $(ele).removeClass("visibleButton");
  }
  
  playSong() {
    let player = document.getElementById("media");
    let button = document.getElementById(`play${this.props.album.id}`);
    
    // debugger
    if (!this.state.currentSong) {
      let play = this.props.album.songs[0];
      if (this.props.state.ui.mediaPlayer.songs) {
        // debugger
        this.props.deleteSong(this.props.state.ui.mediaPlayer.songs[0]);
        this.props.pauseSong();
        player.pause();
      }
      this.props.addSong(play);
      let visible = document.getElementsByClassName("visibleButton");
      $(visible).removeClass("visibleButton");
      $(button).addClass("visibleButton");
      this.setState({
        currentSong: true,
        playing: true
      });
    }
    this.afterClick(player);
  }
  
  afterClick(player) {
    // debugger
    if (player.paused) {
      this.props.playSong();
      let ele = document.getElementById(`pic${this.props.album.id}`);
      ele.removeEventListener("mouseover", this.addClass);
      ele.removeEventListener("mouseleave", this.removeClass);
      let button = document.getElementById(`play${this.props.album.id}`);
      button.removeEventListener("mouseover", this.addClass);
      button.removeEventListener("mouseleave", this.removeClass);
      button.addEventListener("mouseover", this.addPauseHover);
      button.addEventListener("mouseleave", this.removePauseHover);
      
      $(button).addClass("visibleButton");
      this.setState({ playing: true });
      
    } else {
      this.props.pauseSong();
      let ele = document.getElementById(`pic${this.props.album.id}`);
      ele.addEventListener("mouseover", this.addClass);
      ele.addEventListener("mouseleave", this.removeClass);
      let button = document.getElementById(`play${this.props.album.id}`);
      $(button).removeClass("visibleButton");
      button.addEventListener("mouseover", this.addClass);
      button.addEventListener("mouseleave", this.removeClass);
      button.removeEventListener("mouseover", this.addPauseHover);
      button.removeEventListener("mouseleave", this.removePauseHover);
      this.setState({ playing: false });
      
    }
  }
  
  render() {
    const { album } = this.props;
    
    if (!album) {
      return null;
      
    } else {
      // debugger
      return (
        <div className="songBoundaries">
          <li className="album" >
            <Link to={`/albums/${album.id}`} id={`pic${album.id}`}><img className="albumArt" src={album.photoUrl} /></Link>
            <Link to={`/albums/${album.id}`} className="albumTitle">{album.title}</Link>
            <Link to={`/artists/${album.artist.id}`} className="albumArtist">{album.artist.username}</Link>
            <button className="playSong" id={`play${album.id}`} onClick={this.playSong}>
              {(this.state.playing) ?
                <i className="fas fa-pause-circle" id={`pauseButton`}></i>
                :
                <i className="fas fa-play-circle" id={`playButton${album.id}`}></i>
              }
            </button>
          </li>
        </div>
      )
    }
  }
}

export default Album;







// import React from 'react';
// import { Link } from 'react-router-dom';

// class Album extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentSong: null,
//       playing: false
//     };
//     this.playSong = this.playSong.bind(this);
//     this.afterClick = this.afterClick.bind(this);
//     this.addHover = this.addHover.bind(this);
//     this.addClass = this.addClass.bind(this);
//     this.removeHover = this.removeHover.bind(this);
//     this.removeClass = this.removeClass.bind(this);
//     this.addPauseHover = this.addPauseHover.bind(this);
//     this.removePauseHover = this.removePauseHover.bind(this);
//   }

//   componentDidMount() {
//     // debugger
//     if (Object.values(this.props.state.ui.mediaPlayer).length > 0 &&
//       this.props.state.ui.mediaPlayer.songs[0] &&
//       this.props.state.ui.mediaPlayer.songs[0].album_id === this.props.album.id) {
//       let button = document.getElementById(`playButton${this.props.album.id}`);
//       $(button).addClass("visibleButton");
//       button.addEventListener("mouseover", this.addPauseHover);
//       button.addEventListener("mouseleave", this.removePauseHover);
//       this.setState({
//         currentSong: this.props.state.ui.mediaPlayer.songs[0],
//         playing: true
//       });
//     } else {
//       let ele = document.getElementById(`pic${this.props.album.id}`);
//       ele.addEventListener("mouseover", this.addClass);
//       ele.addEventListener("mouseleave", this.removeClass);
//       let button = document.getElementById(`playButton${this.props.album.id}`);
//       button.addEventListener("mouseover", this.addClass);
//       button.addEventListener("mouseover", (e) => this.addHover(e));
//       button.addEventListener("mouseleave", this.removeClass);
//       button.addEventListener("mouseleave", (e) => this.removeHover(e));
//     }
//   }

//   componentDidUpdate() {
//     debugger
//     if (Object.values(this.props.state.ui.mediaPlayer).length > 0 && 
//       this.props.state.ui.mediaPlayer.songs[0]) {

//         if (this.props.state.ui.mediaPlayer.songs[0].album_id === this.props.album.id) {
//           debugger
//           let pic = document.getElementById(`pic${this.props.album.id}`);
//           pic.removeEventListener("mouseover", this.addClass);
//           pic.removeEventListener("mouseleave", this.removeClass);
//           let button;
//           if (document.getElementById(`playButton${this.props.album.id}`)) {
//             button = document.getElementById(`playButton${this.props.album.id}`);
//           } else {
//             button = document.getElementById(`pauseButton`);
//           }
//           $(button).addClass("visibleButton");
//           button.addEventListener("mouseover", this.addPauseHover);
//           button.addEventListener("mouseleave", this.removePauseHover);

//           if (this.props.state.ui.mediaPlayer.playing && !this.state.playing) {
//             this.setState({
//               playing: true
//             });
//           } else if (!this.props.state.ui.mediaPlayer.playing && this.state.playing) {
//             this.setState({
//               playing: false
//             });
//           } else if (!this.state.currentSong) {
//             this.setState({
//               currentSong: this.props.album
//             });
//           }
//         } else {
//           let pic = document.getElementById(`pic${this.props.album.id}`);
//           pic.addEventListener("mouseover", this.addClass);
//           pic.addEventListener("mouseleave", this.removeClass);
//           let ele = document.getElementById(`playButton${this.props.album.id}`);
//           $(ele).removeClass("visibleButton");
//           ele.addEventListener("mouseover", (e) => this.addHover(e));
//           ele.addEventListener("mouseleave", (e) => this.removeHover(e));

//           if (this.state.currentSong || this.state.playing) {
//             this.setState({ currentSong: null, playing: false });
//           }
//         }
//     } else {
//       debugger
//       if (this.state.currentSong || this.state.playing) {
//         this.setState({currentSong: null, playing: false});
//       }
//       // let pic = document.getElementById(`pic${this.props.album.id}`);
//       // pic.addEventListener("mouseover", this.addClass);
//       // pic.addEventListener("mouseleave", this.removeClass);
//       // let ele = document.getElementById(`play${this.props.album.id}`);
//       // ele.addEventListener("mouseover", (e) => this.addHover(e));
//       // ele.addEventListener("mouseleave", (e) => this.removeHover(e));
//     }
//   }

//   componentWillUnmount() {
//     let ele = document.getElementById(`pic${this.props.album.id}`);
//     ele.removeEventListener("mouseover", this.addClass);
//     ele.removeEventListener("mouseleave", this.removeClass);
//     let button = document.getElementById(`playButton${this.props.album.id}`);
//     button.removeEventListener("mouseover", this.addClass);
//     button.removeEventListener("mouseover", (e) => this.addHover(e));
//     button.removeEventListener("mouseleave", this.removeClass);
//     button.removeEventListener("mouseleave", (e) => this.removeHover(e));
//     button.removeEventListener("mouseover", this.addPauseHover);
//     button.removeEventListener("mouseleave", this.removePauseHover);
//   }


//   addClass() {
//     // debugger
//     let ele = document.getElementById(`play${this.props.album.id}`);
//     $(ele).addClass("visibleButton");
//   }
//   removeClass() {
//     let ele = document.getElementById(`play${this.props.album.id}`);
//     $(ele).removeClass("visibleButton");
//   }
//   addHover(e) {
//     // debugger
//     let eles = document.getElementById(e.currentTarget.id);
//     $(eles).addClass("playHovered");
//   }
//   removeHover(e) {
//     let eles = document.getElementById(e.currentTarget.id);
//     $(eles).removeClass("playHovered");
//   }

//   addPauseHover(e) {
//     // debugger
//     let eles = document.getElementById(e.currentTarget.id);
//     $(eles).addClass("playHovered");
//   }
//   removePauseHover(e) {
//     let eles = document.getElementById(e.currentTarget.id);
//     $(eles).removeClass("playHovered");
//   }

//   playSong() {
//     let player = document.getElementById("media");

//     let play;
//     debugger
//     if (!this.state.currentSong) {
//       play = this.props.album.songs[0];
//       if (this.props.state.ui.mediaPlayer.songs) {
//         debugger
//         this.props.deleteSong(this.props.state.ui.mediaPlayer.songs[0]);
//         this.props.pauseSong();
//         player.pause();
//       }
//       this.props.addSong(play);

//       this.setState({
//         currentSong: play,
//         playing: true
//       });
//     }
//     this.afterClick(player, play);
//   }

//   afterClick(player) {
//     if (player.paused) {
//       this.props.playSong();
//       this.setState({ playing: true });

//     } else {
//       this.props.pauseSong();
//       this.setState({ playing: false });
//     }
//   }

//   render() {
//     const { album } = this.props;

//     if (!album) {
//       return null;

//     } else {
//       // debugger
//       return (
//         <div className="songBoundaries">
//           <li className="album" >
//             <Link to={`/albums/${album.id}`} id={`pic${album.id}`}><img className="albumArt" src={album.photoUrl} /></Link>
//             <Link to={`/albums/${album.id}`} className="albumTitle">{album.title}</Link>
//             <Link to={`/artists/${album.artist.id}`} className="albumArtist">{album.artist.username}</Link>
//             <button className="playSong" id={`play${album.id}`} onClick={this.playSong}>
//               {(this.state.playing) ?
//                 <i className="fas fa-pause-circle" id={`pauseButton`}></i>
//                 :
//                 <i className="fas fa-play-circle" id={`playButton${album.id}`}></i>
//               }
//             </button>
//           </li>
//         </div>
//       )
//     }
//   }
// }

// export default Album;