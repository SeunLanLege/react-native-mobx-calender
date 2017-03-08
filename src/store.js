import { observable, action, computed } from 'mobx'
import { create, persist } from 'mobx-persist'
import { AsyncStorage } from 'react-native'
import moment from 'moment'

class Day {
  @persist @observable date
  @persist @observable isCurrentMonth
  @persist @observable day
  @persist @observable tostring

  constructor(date, isCurrentMonth, day, toString){
    this.date = date
    this.isCurrentMonth = isCurrentMonth
    this.day = day
    this.tostring = toString
  }
}

class Month {
  @persist('object') @observable months = {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: []
    }
  @persist @observable selectedDay
  @persist @observable week = true
  @persist @observable monthPicker = false

  constructor() {
    this.populateMonth()
  }

  @action toggle() {
    this.week = !this.week
  }

  @action toggleMonthPicker() {
    this.monthPicker = !this.monthPicker
  }

  pickNewMonth(month, callback = false) {
    const newMonth = moment(this.selectedDay).month(month).startOf('month').format('YYYY-MM-DD')
    if (callback) requestAnimationFrame(() => callback(newMonth))
    this.pickMonth(newMonth)
  }

  @action pickMonth(month) {
    this.selectedDay = month
    if (!this.week) this.toggle()
    this.toggleMonthPicker()
    if (!this.months[moment(month).format('MMM')].length) this.populateMonth()
  }

  @action populateMonth() {
    const date = this.selectedDay ? moment(this.selectedDay) : moment() // First Time, selected isn't set so default is today
    const month = date.clone().format('MMM')
    const monthStart = date.clone().startOf('month').day('sunday')
    const monthEnd = date.clone().endOf('month').day('saturday')
    let days = monthStart.clone()
    let done = false
    const exists = this.months[month];
    if (!exists.length) {
      const final = []
      while(!done) {
        const temp = {
          date: days.date(),
          isCurrentMonth: moment(this.selectedDay).month() === days.month(),
          day: days.format('ddd'),
          toString: days.format('YYYY-MM-DD'),
        }
        final.push(new Day(temp.date, temp.isCurrentMonth, temp.day, temp.toString))
        days = days.clone().add(1, 'd')
        done = !days.isBetween(monthStart, monthEnd, null, '[]')
      }
      this.months[month].replace(final)
    }
  }

  @action selectDay(dateString, index) {
    this.selectedDay = dateString
    if (!this.week) this.toggle();
    const newMonth = moment(this.selectedDay).format('MMM')
    if (!this.months[newMonth].length) {
        this.populateMonth()
      }
    }

    selectDate(dateString, index, callback = false) {
      this.selectDay(dateString, index)
      if (callback) requestAnimationFrame(() => callback(dateString));
    }

  @computed get getWeekDates() {
    const date = this.selectedDay ? moment(this.selectedDay) : moment()
    const startOfWeek = date.clone().startOf('week')
    const newMonth = date.format('MMM')
    const endOfWeek = date.clone().endOf('week')
    if(!!this.months[newMonth]) {
      return this.months[newMonth].filter(
        (day, index) => moment(day.tostring).isBetween(startOfWeek, endOfWeek, null, '[]')
        )
    }
  }

  @computed get currentMonth() {
    const date = moment(this.selectedDay) || moment()
    const newMonth = date.format('MMM')
    if (this.months[newMonth].length) {
        return this.months[newMonth]
      }
  }
}

const hydrate = create({ storage: AsyncStorage })
const store = new Month()
export default store

hydrate('calender-store', store)