import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Clock({timeZone, city, key, removeClock}) {
    const initialTime = getTime(timeZone);
    const [time, setTime] = useState(initialTime);

    let timer = setTimeout(e => {
        setTime(getTime(timeZone));
    }, 1000);

    useEffect(() => {
        return () => {
            clearInterval(timer);
        }
    }, [timer]);

    return <div className="clock" key={key}>
        <div className="remove-clock" onClick={(e) => removeClock(city)}>x</div>
        <div className="city-clock">{city}</div>
        <div className="time-clock">{time}</div>
    </div>
}

function getTime(zoneOffset) {
    const firstSymbol = Array.from(zoneOffset)[0];
    let zoneOffsetMinutes = 0;

    if (firstSymbol == '-' || firstSymbol == '+') {
        zoneOffsetMinutes = firstSymbol + zoneOffset.substring(1, ) * 60;
    } else {
        zoneOffsetMinutes = zoneOffset * 60;
    }

    return DateTime.now().toUTC(zoneOffsetMinutes).toFormat('HH:mm:ss');
}