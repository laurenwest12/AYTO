/* eslint-disable complexity */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTruthBoothThunk, postTruthBoothThunk } from './store';

class SingleTruthBooth extends Component {
  constructor() {
    super();
    this.state = {
      pair1: null,
      pair2: null,
      match: null,
    };
  }

  componentDidMount = () => {
    const { number } = this.props.match.params;
    this.props.getTruthBooth(number);
  };

  componentDidUpdate = (prevProps) => {
    const { truthBooth } = this.props;
    if (prevProps !== this.props) {
      if (truthBooth) {
        this.setState({
          match: truthBooth.match,
          pair1: truthBooth._pair1,
          pair2: truthBooth._pair2,
        });
      }
    }
  };

  handleChange = ({ target }, member) => {
    if (this.state.pair1 === null) {
      this.setState({
        pair1: member,
      });
    } else {
      this.setState({
        pair2: member,
      });
    }
  };

  handleSubmit = (evt) => {
    //RANDOM NUMBER
    // function randomIntFromInterval(min, max) {
    //   return Math.floor(Math.random() * (max - min + 1) + min);
    // }
    // const num = randomIntFromInterval(5, 10) * 1000;

    evt.preventDefault();
    const { pair1, pair2 } = this.state;
    const { postTruthBooth } = this.props;
    const { number } = this.props.match.params;

    const match = this.state.pair1._match === this.state.pair2._id;

    this.props.postTruthBooth(number, pair1, pair2, match);
  };

  render() {
    const { cast, truthBooth } = this.props;

    if (this.state.match === null) {
      return (
        <div className="container">
          <div className="matchUpContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="matchUpPair">
                <div className="singlePair">
                  {this.state.pair1 && (
                    <img className="pairImage" src={this.state.pair1.imgUrl} />
                  )}
                  <hr />
                  <label>{this.state.pair1 && this.state.pair1.name}</label>
                </div>

                <div className="singlePair">
                  {this.state.pair2 && (
                    <img className="pairImage" src={this.state.pair2.imgUrl} />
                  )}
                  <hr />
                  <label>{this.state.pair2 && this.state.pair2.name}</label>
                </div>
              </div>

              {this.state.pair2 && (
                <div className="button-container">
                  <button type="submit" className="lockedInButton">
                    lock in
                  </button>
                </div>
              )}

              <label />
              <label />
              <div className="remainingContainer">
                {cast.length &&
                  cast.map((member) => (
                    <div
                      key={member.key}
                      onClick={(e) => this.handleChange(e, member)}
                      member={member}
                      value={member.id}
                      className="remainingMember"
                    >
                      <img src={member.imgUrl} className="remainingImage" />
                      <hr />
                      {member.name}
                    </div>
                  ))}
              </div>
            </form>
          </div>
        </div>
      );
    }

    if (this.state.match !== null) {
      if (truthBooth.match) {
        const { pair1, pair2 } = this.state;
        const _pair1 =
          cast.length && cast.find((member) => member._id === pair1);
        const _pair2 =
          cast.length && cast.find((member) => member._id === pair2);

        return (
          <div className="matchResultContainer">
            <div className="matchResultImageContainer">
              <img src={_pair1.imgUrl} className="matchResultImage" />
              <img src={_pair2.imgUrl} className="matchResultImage" />
            </div>
            <div className="matchResult">PERFECT MATCH!</div>
          </div>
        );
      }
      if (!truthBooth.match) {
        const { pair1, pair2 } = this.state;
        const _pair1 =
          cast.length && cast.find((member) => member._id === pair1);
        const _pair2 =
          cast.length && cast.find((member) => member._id === pair2);

        return (
          <div className="matchResultContainer">
            <div className="matchResultImageContainer">
              <img src={_pair1.imgUrl} className="matchResultImage" />
              <img src={_pair2.imgUrl} className="matchResultImage" />
            </div>
            <div className="noMatchResult">NO MATCH!</div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = ({ cast, truthBooth }) => {
  return {
    cast,
    truthBooth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTruthBooth: (number, pair1, pair2, match) =>
      dispatch(postTruthBoothThunk(number, pair1, pair2, match)),
    getTruthBooth: (number) => dispatch(getTruthBoothThunk(number)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTruthBooth);
