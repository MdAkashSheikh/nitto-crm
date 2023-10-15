import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function TimeDemo() {

    
    
    const [time, setTime] = useState(new Date().toTimeString().slice(0, 8));

    // const date1 = new Date().toTimeString();
    // console.log(date1)
    // let cDate = date1.slice(0, 8);
    // console.log(cDate)
    // setTime(cDate)
    return (
        <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <label htmlFor="calendar-timeonly" className="font-bold block mb-2">
                    Time Only
                </label>
                <Calendar id="calendar-timeonly" value={time} onChange={(e) => setTime(e.value)} timeOnly hourFormat="12" />
            </div>
        </div>
    )
}
       