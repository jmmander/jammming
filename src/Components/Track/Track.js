import React from 'react';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        return <button className="Track-action" onClick={this.isRemoval ? this.removeTrack : this.addTrack}> {this.isRemoval ? "-" : "+"} </button>
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.removeTrack(this.props.track)
    }

    render() {
        return (
        <div className="Track">
        <div className="Track-information">
            <h3>{this.props.track.name}</h3>
          <p>`${this.props.track.artist} | ${this.props.track.album}`</p>
        </div>
        <button className="Track-action" onClick={this.isRemoval ? this.removeTrack : this.addTrack}>plus or minus</button>
      </div>  
        )
    }
}

export default Track