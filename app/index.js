import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';

import {Router, Scene, Reducer} from 'react-native-router-flux';

import Home from './components/home';
import NewQuote from './components/new_quote';

import Data from '../quotes.json';

import {connect} from 'react-redux';
import {getQuotes} from './actions/index';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};

const getSceneStyle = (
  /* NavigationSceneRendererProps */ props,
  computedProps,
) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
  }
  return style;
};

class Main extends Component {
  componentDidMount() {
    var _this = this;
    //Check if any data exist
    AsyncStorage.getItem('data', (err, data) => {
      if (data === null) {
        AsyncStorage.setItem('data', JSON.stringify(Data.quotes));

        setTimeout(() => {
          _this.props.getQuotes();
        }, 2000);
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
          <Scene key="root">
            <Scene key="home" component={Home} title="Home" initial />
            <Scene key="new_quote" component={NewQuote} title="New Quote" />
          </Scene>
        </Router>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(
  mapStateToProps,
  {getQuotes},
)(Main);
