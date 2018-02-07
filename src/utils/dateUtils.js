// @flow

import moment from 'moment'
import type {ColorType} from '../types'

export type HighlighDateType = {
  highlight: ColorType
}

const dayOfWeekCodes = {
  '1': 'mon',
  '2': 'tue',
  '3': 'wed',
  '4': 'thu',
  '5': 'fri',
  '6': 'sat',
  '7': 'sun'
}

// These functions are not exported so
// that we avoid magic strings like 'days'
function set(date: moment, unit: moment.unitOfTime.All, to: number) {
  return date.set(unit, to)
}

function add(date: moment, amount: number, unit: moment.unitOfTime.All) {
  return date.add(amount, unit)
}

function subtract(date: moment, amount: number, unit: moment.unitOfTime.All) {
  return date.subtract(amount, unit)
}

function get(date: moment, unit: moment.unitOfTime.All) {
  return date.get(unit)
}

function getStartOf(date: moment, unit: moment.unitOfTime.All) {
  return date.startOf(unit)
}

function getEndOf(date: moment, unit: moment.unitOfTime.All) {
  return date.endOf(unit)
}

function getDiff(date1: moment, date2: moment, unit: moment.unitOfTime.All) {
  return date1.diff(date2, unit)
}

function isSame(date1: moment, date2: moment, unit: moment.unitOfTime.All) {
  return date1.isSame(date2, unit)
}

// ** Date Constructors **

export function newDate(point: moment.MomentInput): moment {
  return moment(point)
}

export function newDateWithOffset(utcOffset: string | number) {
  return moment()
    .utc()
    .utcOffset(utcOffset)
}

export function now(maybeFixedUtcOffset?: string | number | null) {
  if (maybeFixedUtcOffset == null) {
    return newDate()
  }
  return newDateWithOffset(maybeFixedUtcOffset)
}

export function cloneDate(date: moment) {
  return date.clone()
}

export function parseDate(
  value: moment.MomentInput,
  {
    dateFormat,
    locale
  }: {
    dateFormat: moment.MomentFormatSpecification,
    locale: string
  }
): moment | null {
  const m = moment(value, dateFormat, locale || moment.locale(), true)
  return m.isValid() ? m : null
}

// ** Date "Reflection" **

export function isMoment(date: any) {
  return moment.isMoment(date)
}

export function isDate(date: any) {
  return moment.isDate(date)
}

// ** Date Formatting **

export function formatDate(date: moment, format: moment.MomentFormatSpecification): string {
  return date.format(format)
}

export function safeDateFormat(
  date: moment,
  {
    dateFormat,
    locale
  }: {
    dateFormat: moment.MomentFormatSpecification,
    locale: string
  }
) {
  return (
    (date &&
      date
        .clone()
        .locale(locale || moment.locale())
        .format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat)) ||
    ''
  )
}

// ** Date Setters **

export function setTime(
  date: moment,
  {
    hour,
    minute,
    second
  }: {
    hour: number,
    minute: number,
    second: number
  }
) {
  date.set({hour, minute, second})
  return date
}

export function setMonth(date: moment, month: number) {
  return set(date, 'month', month)
}

export function setYear(date: moment, year: number) {
  return set(date, 'year', year)
}

export function setUTCOffset(date: moment, offset: number) {
  return date.utcOffset(offset)
}

// ** Date Getters **

export function getSecond(date: moment) {
  return get(date, 'second')
}

export function getMinute(date: moment) {
  return get(date, 'minute')
}

export function getHour(date: moment) {
  return get(date, 'hour')
}

// Returns day of week
export function getDay(date: moment) {
  return get(date, 'day')
}

export function getWeek(date: moment) {
  return get(date, 'week')
}

export function getMonth(date: moment) {
  return get(date, 'month')
}

export function getYear(date: moment) {
  return get(date, 'year')
}

// Returns day of month
export function getDate(date: moment) {
  return get(date, 'date')
}

export function getUTCOffset() {
  return moment().utcOffset()
}

export function getDayOfWeekCode(day: moment) {
  return dayOfWeekCodes[day.isoWeekday()]
}

// *** Start of ***

export function getStartOfDay(date: moment) {
  return getStartOf(date, 'day')
}

export function getStartOfWeek(date: moment) {
  return getStartOf(date, 'week')
}
export function getStartOfMonth(date: moment) {
  return getStartOf(date, 'month')
}

export function getStartOfDate(date: moment) {
  return getStartOf(date, 'date')
}

// *** End of ***

export function getEndOfWeek(date: moment) {
  return getEndOf(date, 'week')
}

export function getEndOfMonth(date: moment) {
  return getEndOf(date, 'month')
}

// ** Date Math **

// *** Addition ***

export function addMinutes(date: moment, amount: number) {
  return add(date, amount, 'minutes')
}

export function addDays(date: moment, amount: number) {
  return add(date, amount, 'days')
}

export function addWeeks(date: moment, amount: number) {
  return add(date, amount, 'weeks')
}

export function addMonths(date: moment, amount: number) {
  return add(date, amount, 'months')
}

export function addYears(date: moment, amount: number) {
  return add(date, amount, 'years')
}

// *** Subtraction ***
export function subtractDays(date: moment, amount: number) {
  return subtract(date, amount, 'days')
}

export function subtractWeeks(date: moment, amount: number) {
  return subtract(date, amount, 'weeks')
}

export function subtractMonths(date: moment, amount: number) {
  return subtract(date, amount, 'months')
}

export function subtractYears(date: moment, amount: number) {
  return subtract(date, amount, 'years')
}

// ** Date Comparison **

export function isBefore(date1: moment, date2: moment) {
  return date1.isBefore(date2)
}

export function isAfter(date1: moment, date2: moment) {
  return date1.isAfter(date2)
}

export function equals(date1: moment, date2: moment) {
  return date1.isSame(date2)
}

export function isSameMonth(date1: moment, date2: moment) {
  return isSame(date1, date2, 'month')
}

export function isSameDay(moment1: moment, moment2: moment) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day')
  }
  return !moment1 && !moment2
}

export function isSameUtcOffset(moment1: moment, moment2: moment) {
  if (moment1 && moment2) {
    return moment1.utcOffset() === moment2.utcOffset()
  }
  return !moment1 && !moment2
}

export function isDayInRange(day: moment, startDate: moment.MomentInput, endDate: moment.MomentInput) {
  const before = startDate
    .clone()
    .startOf('day')
    .subtract(1, 'seconds')
  const after = endDate
    .clone()
    .startOf('day')
    .add(1, 'seconds')
  return day
    .clone()
    .startOf('day')
    .isBetween(before, after)
}

// *** Diffing ***

export function getDaysDiff(date1: moment, date2: moment) {
  return getDiff(date1, date2, 'days')
}

// ** Date Localization **

export function localizeDate(date: moment, locale: string) {
  return date.clone().locale(locale || moment.locale())
}

export function getDefaultLocale() {
  return moment.locale()
}

export function getDefaultLocaleData() {
  return moment.localeData()
}

export function registerLocale(localeName: string, localeData: void | moment.LocaleSpecification) {
  moment.defineLocale(localeName, localeData)
}

export function getLocaleData(date: moment) {
  return date.localeData()
}

export function getLocaleDataForLocale(locale: string) {
  return moment.localeData(locale)
}

export function getWeekdayMinInLocale(locale: moment.Locale, date: moment) {
  return locale.weekdaysMin(date)
}

export function getWeekdayShortInLocale(locale: moment.Locale, date: moment) {
  return locale.weekdaysShort(date)
}

// TODO what is this format exactly?
export function getMonthInLocale(locale: moment.Locale, date: moment, format: string) {
  return locale.months(date, format)
}

// ** Utils for some components **

export function isDayDisabled(
  day: moment,
  {
    minDate,
    maxDate,
    excludeDates,
    includeDates,
    filterDate
  }: {
    minDate?: moment,
    maxDate?: moment,
    excludeDates?: Array<moment>,
    includeDates?: Array<moment>,
    filterDate?: Function
  } = {}
) {
  return (
    (minDate && day.isBefore(minDate, 'day')) ||
    (maxDate && day.isAfter(maxDate, 'day')) ||
    (excludeDates && excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates && !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day.clone())) ||
    false
  )
}

export function isTimeDisabled(time: moment, disabledTimes: Array<moment>) {
  const l = disabledTimes.length
  for (let i = 0; i < l; i++) {
    if (
      disabledTimes[i].get('hours') === time.get('hours') &&
      disabledTimes[i].get('minutes') === time.get('minutes')
    ) {
      return true
    }
  }

  return false
}

export function isTimeInDisabledRange(
  time: moment,
  {
    minTime,
    maxTime
  }: {
    minTime: moment,
    maxTime: moment
  }
) {
  if (!minTime || !maxTime) {
    throw new Error('Both minTime and maxTime props required')
  }

  const base = moment()
    .hours(0)
    .minutes(0)
    .seconds(0)
  const baseTime = base
    .clone()
    .hours(time.get('hours'))
    .minutes(time.get('minutes'))
  const min = base
    .clone()
    .hours(minTime.get('hours'))
    .minutes(minTime.get('minutes'))
  const max = base
    .clone()
    .hours(maxTime.get('hours'))
    .minutes(maxTime.get('minutes'))

  return !(baseTime.isSameOrAfter(min) && baseTime.isSameOrBefore(max))
}

export function allDaysDisabledBefore(
  day: moment.MomentInputObject,
  unit: moment.unitOfTime.All,
  {
    minDate,
    includeDates
  }: {
    minDate: moment.MomentInputObject,
    includeDates: ?Array<moment>
  } = {}
) {
  const dateBefore = day.clone().subtract(1, unit)
  return (
    (minDate && dateBefore.isBefore(minDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateBefore.isBefore(includeDate, unit))) ||
    false
  )
}

export function allDaysDisabledAfter(
  day: moment,
  unit: moment.unitOfTime.All,
  {maxDate, includeDates}: moment = {}
) {
  const dateAfter = day.clone().add(1, unit)
  return (
    (maxDate && dateAfter.isAfter(maxDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateAfter.isAfter(includeDate, unit))) ||
    false
  )
}

export function getEffectiveMinDate({minDate, includeDates}: moment) {
  if (includeDates && minDate) {
    return moment.min(includeDates.filter(includeDate => minDate.isSameOrBefore(includeDate, 'day')))
  } else if (includeDates) {
    return moment.min(includeDates)
  }
  return minDate
}

export function getEffectiveMaxDate({maxDate, includeDates}: moment) {
  if (includeDates && maxDate) {
    return moment.max(includeDates.filter(includeDate => maxDate.isSameOrAfter(includeDate, 'day')))
  } else if (includeDates) {
    return moment.max(includeDates)
  }
  return maxDate
}

export function getHighLightDaysMap(
  highlightDates: Array<moment | Object> = [],
  defaultColor: ColorType = 'default'
): Map<string, HighlighDateType> {
  const dateClasses: Map<string, HighlighDateType> = new Map()
  for (let i = 0, len = highlightDates.length; i < len; i++) {
    const obj = highlightDates[i]
    if (isMoment(obj)) {
      const key = obj.format('MM.DD.YYYY')
      if (!dateClasses.get(key)) {
        dateClasses.set(key, {highlight: defaultColor})
      }
    } else if (typeof obj === 'object' && isMoment(obj.date)) {
      const date: moment = obj.date
      const key = date.format('MM.DD.YYYY')
      dateClasses.set(key, {highlight: obj.color || defaultColor})
    }
  }
  return dateClasses
}
