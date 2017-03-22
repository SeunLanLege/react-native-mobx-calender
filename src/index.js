import React, { PureComponent, PropTypes } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { observer } from 'mobx-react/native'
import indexOf from 'lodash/indexOf';
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

  constructor(props) {
    super(props);
    if(!store.selectedDay) store.selectDate(moment().format('YYYY-MM-DD'), this.props.setSelected)
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
    const { events } = this.props || [];
    return (
      <View style={[s.row]}>
        {store.getWeekDates.map((day, index) => {
          const selectedView = moment(day.tostring).isSame(store.selectedDay) ? s.activeWeek : null
          const selectedText = moment(day.tostring).isSame(store.selectedDay) ? s.white : null
          return (<TouchableOpacity
            key={index}
            onPress={() => store.selectDate(day.tostring, this.props.setSelected)}
            style={[s.flex, s.weekView,s.alignCenter, selectedView]}>
            <Text style={[s.textCenter, setPadding(7,0,3,0), selectedText]}>{day.day}</Text>
            <Text style={[s.textCenter, setPadding(3,0,3,0), selectedText]}>{day.date}</Text>
            { indexOf(events, day.tostring) === -1 ? null : <View style={[{height: 15}, s.alignCenter, s.justifyCenter]}><View style={[s.dot, selectedView ? s.backWhite : s.calenderView]} /></View> }
          </TouchableOpacity>)
        })
        }
      </View>)
  }

  renderWeeks = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const { events } = this.props || [];
    const array = store.currentMonth.map((day, index) => {
      const sameDay =  moment(day.tostring).isSame(store.selectedDay)
      const selectedView  = sameDay ? s.activeCalender : s.calenderView
      const invalidMonth = !day.isCurrentMonth ? s.disabledMonth : null;
      return (
      <TouchableOpacity
        key={index}
        onPress={() => store.selectDate(day.tostring, index, this.props.setSelected)}
        style={[s.p,selectedView, { width, height }]}>
            <Text style={[s.textCenter, !sameDay ? s.white : s.green, setPadding(0,0,7,0), invalidMonth]}>{day.date}</Text>
            { indexOf(events, day.tostring) === -1 ? null : <View style={[{ height: 15 }, s.alignCenter]}><View style={[s.dot, !sameDay ? s.backWhite :s.calenderView ]} /></View> }
          </TouchableOpacity>)
    })
    return (
        <View>
          <View style={[s.calenderView, s.row, setPadding(7,0,0,0)]}>{days.map((day, i) => (<View key={i} style={[s.flex]}><Text style={[s.white, s.textCenter]}>{day}</Text></View>))}</View>
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

