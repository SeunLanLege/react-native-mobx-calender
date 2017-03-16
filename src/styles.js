import { StyleSheet } from 'react-native'

const s = StyleSheet.create({
  flexRowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 3.5,
  },
  green: {
    color: '#50d2c2',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  textCenter: {
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  activeMonth:{
    backgroundColor: '#50d2c2',
    borderRadius: 5
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  flexAround: {
    justifyContent: 'space-around',
  },
  flexBetween: {
    justifyContent: 'space-between',
  },
  activeWeek: {
    backgroundColor: '#50d2c2',
  },
  activeCalender: {
    backgroundColor: '#fff',
  },
  pTop: {
    paddingTop: 13,
    paddingBottom: 5,
  },
  pBottom: {
    paddingBottom: 13,
  },
  p: {
    paddingTop: 13,
    paddingBottom: 13,
  },
  weekView: {
    backgroundColor: '#f8f8f8',
  },
  calenderView: {
    backgroundColor: '#50d2c2',
  },
  disabledMonth: {
    color: '#9be5db',
  },
  white: {
    color: '#fff',
  },
  backWhite: {
    backgroundColor: '#fff',
  },
});

export default s

export const setHeight = height => ({ height });
export const setWidth = width => ({ width });
export const setPaddingTop = paddingTop => ({ paddingTop });
export const setPaddingBottom = paddingBottom => ({ paddingBottom });
export const setPaddingLeft = paddingLeft => ({ paddingLeft });
export const setPaddingRight = paddingRight => ({ paddingRight });
export const setFontSize = fontSize => ({ fontSize });
export const setFlex = flex => ({ flex });
export const setColor = color => ({ color });
export const setBackGroundColor = backgroundColor => ({ backgroundColor });
export const setBorderColor = borderColor => ({ borderColor });
export const setPosition = position => ({ position });
export const setBottom = bottom => ({ bottom });
export const setLeft = left => ({ left });
export const setRight = right => ({ right });
export const setTop = top => ({ top });
export const setMarginTop = marginTop => ({ marginTop });
export const setMarginBottom = marginBottom => ({ marginBottom });
export const setMarginLeft = marginLeft => ({ marginLeft });
export const setMarginRight = marginRight => ({ marginRight });

export const setPadding = function() {
  switch (arguments.length) {
    case 1:
      return { paddinTop: arguments[0] }
    case 2:
      return { paddingTop: arguments[0], paddingRight: arguments[1] }
    case 3:
      return { paddingTop: arguments[0], paddingRight: arguments[1], paddingBottom: arguments[2] }
    case 4:
      return { paddingTop: arguments[0], paddingRight: arguments[1], paddingBottom: arguments[2], paddingLeft: arguments[3] }
    default:
      return { padding: arguments[0] }
  }
}

export const setMargin = function() {
  switch (arguments.length) {
    case 1:
      return { paddinTop: arguments[0] }
    case 2:
      return { marginTop: arguments[0], marginRight: arguments[1] }
    case 3:
      return { marginTop: arguments[0], marginRight: arguments[1], marginBottom: arguments[2] }
    case 4:
      return { marginTop: arguments[0], marginRight: arguments[1], marginBottom: arguments[2], marginLeft: arguments[3] }
    default:
      return { margin: arguments[0] }
  }
}
