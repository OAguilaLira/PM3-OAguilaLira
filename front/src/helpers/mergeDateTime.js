import { DateTime } from 'luxon'


export const mergeDateTime = (date, time) => {
    const dateTime = DateTime.fromJSDate(date).set({ hour: time.getHours(), minute: time.getMinutes(), second: time.getSeconds() });
    console.log('### time')
    console.log(time)
    console.log('### date')
    console.log(date)
    date.setHours(time.getHours());
    console.log('### date2')
    console.log(date)
    console.log('### date3')
    console.log(dateTime.toISO())
    // dateWithTime.setMinutes(time.getMinutes());
    // dateWithTime.setSeconds(time.getSeconds());
    // dateWithTime.setMilliseconds(time.getMilliseconds());
    // console.log(dateWithTime)
    return date
}