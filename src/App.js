import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import AssignMatches from './AssignMatches';
import AllCeremonies from './AllCeremonies';
import SingleCeremony from './SingleCeremony';
import AllTruthBooths from './AllTruthBooths';
import SingleTruthBooth from './SingleTruthBooth';

import { getCastThunk } from './store';

class App extends Component {
  componentDidMount() {
    this.props.getCast();
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location, history }) => (
            <Nav history={history} location={location} />
          )}
        />
        <Route exact path="/matches" component={AssignMatches} />
        <Route exact path="/ceremonies" component={AllCeremonies} />
        <Route exact path="/ceremonies/:number" component={SingleCeremony} />
        <Route exact path="/truthbooths" component={AllTruthBooths} />
        <Route exact path="/truthbooths/:number" component={SingleTruthBooth} />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCast: () => dispatch(getCastThunk()),
  };
};

export default connect(null, mapDispatchToProps)(App);
