import React from 'react'
import { Stack } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
const DatePicker = () => {
    const [date, setDate] = React.useState(dayjs(new Date()).format("DD-MM-YYYY"));
    const handleDateChange = (newDate) => {
        setDate(dayjs(newDate).format("DD-MM-YYYY"));
    };
    return (
        <>
            <div className="datepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            inputFormat="DD/MM/YYYY"
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
            </div>
        </>
    )
}

export default DatePicker