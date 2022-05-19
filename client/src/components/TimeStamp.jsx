import React from 'react';

const TimeStamp = ({ timestamp }) => {
    const day = 1000 * 60 * 60 * 24;
    const week = day * 7;
    const year = day * 365;

    const date = new Date(timestamp);
    const dateString = date.toDateString().split(' ');
    const weekday = dateString[0];
    const monthAndDay = dateString.slice(1, 3).join(' ');
    const monthDayAndYear = dateString.slice(1).join(' ');

    const timeAgo = Date.now() - timestamp;

    const timeDisplay = date.toTimeString().slice(0, 5);
    const dateDisplay =
        timeAgo > year
            ? monthDayAndYear
            : timeAgo > week
            ? monthAndDay
            : timeAgo > day
            ? weekday
            : '';

    const formattedTimestamp = `${dateDisplay} ${timeDisplay}`;

    return <span className='timestamp'>{formattedTimestamp}</span>;
};

export default TimeStamp;
