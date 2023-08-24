import moment from "moment"
import { useState } from "react";
import Clock from "./Clock";

export default function WorldClock({}) {

    let initialClocks = [];

    const [clocks, setClocks] = useState(initialClocks); 
    const [values, setValues] = useState({})

    const submitHandler = e => {
        setClocks([...clocks, values]);
    }

    const handleChange = ({target}) => {
        const {name, value} = target;
        setValues(values => ({...values, [name]: value}));
    }

    const removeClock = (city) => {
        setClocks(clocks.filter(clock => clock.city !== city));
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
            {clocks.map(({timeZone, city}) => {
                return <Clock
                    timeZone={timeZone}
                    city={city}
                    key={city}
                    removeClock={removeClock}
                />
            })}
        </div>
    </div>
}

