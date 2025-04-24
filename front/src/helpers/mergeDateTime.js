import { DateTime } from 'luxon'


export const mergeDateTime = (date, time) => {
    const dateTime = DateTime.fromJSDate(date)
      .set({
        hour: DateTime.fromJSDate(time).hour,
        minute: DateTime.fromJSDate(time).minute
      })
    // console.log('Fecha formateada')
    // console.log(dateTime)
    return dateTime;
}