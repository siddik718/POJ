import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter)

export const timeDiff = (time1,time2) => {
    return dayjs(time1).diff(dayjs(time2), 'second');
}
export const diffData = (time) => {
    const diff = dayjs.duration(time,'second');
    const data = [];
    if(diff.days()) {
        data.push(`${diff.days()} days : `);
    }
    if(diff.hours()) {
        data.push(`${diff.hours()} hours : `);
    }
    if(diff.minutes()) {
        data.push(`${diff.minutes()} minutes : `);
    }
    if(diff.seconds()) {
        data.push(`${diff.seconds()} seconds `);
    }
    return data;
}
// GTE -> Greater Then Equal
export const GTE = (time1,time2) => {
    return dayjs(time1).isSameOrAfter(dayjs(time2));
}
// GT -> Greater Then
export const GT = (time1,time2) => {
    return dayjs(time1).isAfter(dayjs(time2));
}
export const Format = (time) => {
    return dayjs(time).format('hh:mm:ss -- YYYY:MM:DD');
}
export const FORMAT = (time) => {
    return dayjs(time).format('L, LT');
}
export const FORMATDAYMONYEAR = (originalTimestamp) => {
    return dayjs(originalTimestamp).format('DD MMM YYYY');
}
export const Duration = (date1,date2)=> {
    const duration = dayjs.duration(timeDiff(date1,date2),'seconds');
    const data = [];
    if(duration.days()) {
        data.push(`${duration.days()} days`)
        if(duration.hours()) {
            data.push(`:${duration.hours()} hours`)
            if(duration.minutes()) {
                data.push(`:${duration.minutes()} minutes`)
            }
        }else if(duration.minutes()) {
            data.push(`:${duration.minutes()} minutes`)
        }
    }else if(duration.hours()) {
        data.push(`${duration.hours()} hours`)
        if(duration.minutes()) {
            data.push(`:${duration.minutes()} minutes`)
        }
    }else if(duration.minutes()) {
        data.push(`${duration.minutes()} minutes`)
    }
    return data;
}