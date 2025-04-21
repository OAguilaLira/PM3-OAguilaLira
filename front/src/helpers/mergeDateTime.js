import { Next } from "react-bootstrap/esm/PageItem"

export const mergeDateTime = (date, time) => {
    const dateWithTime = new Date(date);
    dateWithTime.setHours(time.getHours());
    dateWithTime.setMinutes(time.getMinutes());
    dateWithTime.setSeconds(time.getSeconds());
    dateWithTime.setMilliseconds(time.getMilliseconds());
    return dateWithTime
}