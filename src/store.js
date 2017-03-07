import  { observable, action, computed } from 'mobx'
import moment from 'moment'

class Month {
  @observable months = []
  @observable selectedDay = ''
  @observable selectedMonth = {}
  @observable week

  constructor() {
    this.week = true
    this.populateMonth()
  }

  @action populateMonth() {
    const date = this.selected || moment().toISOString() // First Time, selected isn't set so default is today
    const month = date.clone().format('MMM')
    let days = date.clone().startOf('month').day('sunday')
    let done = false;
    const exists = this.months.filter((month) => month.format('MMM') === this.selected.format('MMM'))
    if (!exists.length) {
      const final = []
      while(!done) {
        final.push({
          date: days.date(),
          isCurrentMonth: moment().month() === days.month(),
          day: days.format('ddd'),
          isSelected: days.isSame(date, 'day'),
          ISOString: days.toISOString()
        })
        days = days.clone().add(1, 'd')
      }
      this.months.push({
        month,
        days: final
      })
    }
  }

  @action selectDay(dateString) {
    this.selectedDay = moment(dateString)
    const newMonth = this.selectedDay.format('MMM');
    if (this.selectedMonth.month !== newMonth) {
      const exists = this.months.filter((month) => month === newMonth)
      if (exists){
        this.selectedMonth = exists
      } else {
        this.populateMonth()
      }
    }
  }

  @computed getWeekDates() {
    const startOfWeek = this.selected.clone().startOf('week')
    const endOfWeek = this.selected.clone().endOf('week')
    return this.selectedMonth.filter(
      (day, index) => moment(day.ISOString).isBetween(startOfWeek, endOfWeek, null, '[]')
      )
  }
}

const store = new Month()

export default store