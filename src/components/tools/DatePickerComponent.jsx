import React from 'react'
import dayjs from "dayjs";
import { DatePicker } from 'antd';
const DatePickerComponent = (props) => {
    return (
        <>
            <DatePicker onChange={props.onChange}
                placeholder='Tarix seçin'
                format={'DD.MM.YYYY'}
                value={props.value}
            />
        </>
    )
}
export default DatePickerComponent