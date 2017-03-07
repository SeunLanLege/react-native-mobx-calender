import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'

import store from './store'

@observer
export default class Calender extends PureComponent {

  renderDays(){
    const array = []
    store.selectedMonth.map((day) => array.push(<Text>{day.date}</Text>) )
  }

  render() {
   return (
      <View>
        {this.renderDays()}
      </View>
   )
  }
}