/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Calender from './module'

export default class example extends Component {

  state = {
    date: ''
  }

  setSelected = (date) => {
    this.setState({ date })
  }

  render() {
    return (
     <View> 
     <Calender
      setSelected={this.setSelected}
      />
      <TouchableOpacity onPress={() =>  Calender.toggle()}>
        <Text>Toggle {this.state.date}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  Calender.toggleMonthPicker()}>
        <Text>Toggle Month </Text>
      </TouchableOpacity>
     </View>
    );
  }
}


AppRegistry.registerComponent('example', () => example);
