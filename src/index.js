import React, { PureComponent, PropTypes } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { observer } from 'mobx-react/native'
import chunk from 'lodash/chunk'
import moment from 'moment'

import s, { setPadding, setMargin } from './styles'
import store from './store'

const width = Dimensions.get('window').width / 7

const height = width

@observer
export default class Calender extends PureComponent {

  static propTypes = {
    setSelected: PropTypes.func,
    events: PropTypes.array,
  }

  static defaultProps = {
    setSelected: false,
  }

  static week = {
    view: store.week,
  } 

  static toggle () {
    store.toggle()
    this.week.view = store.week
  }

  static toggleMonthPicker() {
    store.toggleMonthPicker()
  }


  renderCalender = () => {
    if(store.monthPicker){
      return this.renderMonthPicker()
    }
    if (store.week) {
      return this.renderWeek()
    }
    return this.renderWeeks()
  }

  renderMonthPicker = () => {
    const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const grid = chunk(monthArray, 3)
    const selectedMonth = moment(store.selectedDay).format('MMM');
    const active = (month) => { if (month === selectedMonth) return s.activeMonth; return null; }
    return grid.map((month, i) => (
      <View key={i} style={s.row}>
        {month.map((monthName, i) => (
          <TouchableOpacity onPress={() => store.pickNewMonth(monthName, this.props.setSelected)} key={i} style={[s.flex, active(monthName), setMargin(3,3,3,3)]}>
            <Text style={[s.textCenter, setPadding(10, 0, 10)]}>{monthName}</Text>
          </TouchableOpacity>
          )
        )}
      </View>))
  }

  renderWeek = () => {
    const selectedView = (string) => { if (moment(string).isSame(store.selectedDay)) return s.activeWeek; return null }
    const selectedText = (string) => { if (moment(string).isSame(store.selectedDay)) return s.white; return null }
    return (
      <View style={[s.row]}>
        {store.getWeekDates.map((day, index) =>
          <TouchableOpacity onPress={() => store.selectDate(day.tostring, index, this.props.setSelected)} key={index} style={[s.flex, s.weekView, selectedView(day.tostring)]}>
            <Text style={[s.textCenter, setPadding(10,0,5,0), selectedText(day.tostring)]}>{day.day}</Text>
            <Text style={[s.textCenter, setPadding(5,0,10,0), selectedText(day.tostring)]}>{day.date}</Text>
          </TouchableOpacity>)
        }
      </View>)
  }

  renderWeeks = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const selectedView = (string) => { if(moment(string).isSame(store.selectedDay)) return s.activeCalender; return null }
    const invalidMonth = (bool) => { if(!bool) return s.disabledMonth; return null }
    const array = store.currentMonth.map((day, index) => (
      <TouchableOpacity onPress={() => store.selectDate(day.tostring, index, this.props.setSelected)} style={[s.p, s.calenderView, { width, height }]} key={index}>
            <Text style={[s.textCenter,s.white, setPadding(13,0,13,0), selectedView(day.tostring), invalidMonth(day.isCurrentMonth)]}>{day.date}</Text>
          </TouchableOpacity>))
    return (
        <View>
          <View style={[s.calenderView, s.row, setPadding(10,0,0,0)]}>{days.map((day, i) => (<View key={i} style={[s.flex]}><Text style={[s.white, s.textCenter]}>{day}</Text></View>))}</View>
          <View style={[ s.flexWrap, s.row]}>{array}</View>
        </View>);
  }

  render() {
   return (
      <View>
        {this.renderCalender()}
      </View>
   )
  }
}

