import moment from "moment"
import { useState } from "react";
import Clock from "./Clock";
import { v4 } from "uuid"

export default function WorldClock({}) {

    let initialClocks = [];

    const [clocks, setClocks] = useState(initialClocks); 
    const [values, setValues] = useState({})

    const submitHandler = e => {
        values.id = uid();
        setClocks([...clocks, values]);
    }

    const handleChange = ({target}) => {
        const {name, value} = target;
        setValues(values => ({...values, [name]: value}));
    }

    const removeClock = id => {
        setClocks(clocks.filter(clock => clock.id !== id));
    }

    return <div className="world-clock-block">
        <div className="form-group">
            <div className="input-group">
                <label htmlFor='city'>Город</label>
                <input 
                    name='city'
                    id='city'
                    onChange={handleChange} 
                />
            </div>
            <div className="input-group">
                <label htmlFor='timeZone'>Временная зона</label>
                <input 
                    name='timeZone'
                    id='timeZone'
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <button onClick={submitHandler}> Добавить </button>
            </div>
        </div>
        <div className="clocks">
            {clocks.map(({timeZone, city, id}, index) => {
                return <Clock
                    timeZone={timeZone}
                    city={city}
                    id={id}
                    key={index}
                    removeClock={removeClock}
                />
            })}
        </div>
    </div>
}

function uid(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

