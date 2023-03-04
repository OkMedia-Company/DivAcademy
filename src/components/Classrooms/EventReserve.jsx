import React, { useState } from "react";
import { Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import useDocumentTitle from "../tools/useDocumentTitle";
import Select from "react-select";
function EventReserve() {
    const handleSelectChange = (e) => {
        setFormData({ ...formData, room: e.value });
    };
    const options = [
        { value: "905 Mavi otaq", label: "905 Mavi otaq" },
        { value: "905 Qara otaq", label: "905 Qara otaq" },
    ];
    const formDataValue = {
        room: "",
        event_name: "",
        start_date: "",
        start_time: "",
        end_time: "",
    };
    const [formData, setFormData] = useState(formDataValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleVerication = () => {
    }
    useDocumentTitle("Tədbir üçün rezerv et")
    return (
        <>
            <div className="section-title">
                <h2>Tədbir üçün rezerv et</h2>
            </div>
            <div className="main-add-form">
                <form onSubmit={handleSubmit}>
                    <div className="main-add-form-inner row">
                        <div className="main-add-form_input row">
                            <div className="main-add-form-input-names col me-5">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="name">Otağı seçin:</label>
                                        <Select
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: "none",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                    color: "black",
                                                    width: "100%",
                                                    "&:hover": {
                                                        borderColor: "none",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                    },
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                                width: "100%",
                                                color: "black",
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: "rgb(242, 242, 242)",
                                                    primary: "rgb(242, 242, 242)",
                                                },
                                            })}
                                            classNamePrefix="select"
                                            isClearable={false}
                                            onChange={handleSelectChange}
                                            isSearchable={true}
                                            name="color"

                                            placeholder="Otağı seçin"
                                            options={options}
                                        />
                                        <br />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="event_name">Tədbirin adı:</label>
                                        <input
                                            type="text"
                                            name="event_name"
                                            id="event_name"
                                            value={formData.event_name}
                                            onChange={handleChange}
                                        />
                                        <br />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" col-6">
                                        <label htmlFor="start_date">
                                            Tədbirin başlama günü
                                        </label>
                                        <input
                                            type="date"
                                            name="start_date"
                                            id="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                        />

                                        <br />
                                    </div>
                                    <div className=" col-6">
                                        <label htmlFor="fin">Tədbirin başlama saatı:</label>
                                        <Select
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: "none",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                    color: "black",
                                                    width: "100%",
                                                    "&:hover": {
                                                        borderColor: "none",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                    },
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                                width: "100%",
                                                color: "black",
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: "rgb(242, 242, 242)",
                                                    primary: "rgb(242, 242, 242)",
                                                },
                                            })}
                                            classNamePrefix="select"
                                            isClearable={false}
                                            onChange={handleSelectChange}
                                            isSearchable={true}
                                            name="color"

                                            placeholder="Tədbirin başlama saatı"
                                            options={[
                                                { value: "09:00", label: "09:00" },
                                                { value: "10:00", label: "10:00" },
                                                { value: "11:00", label: "11:00" },
                                                { value: "12:00", label: "12:00" },
                                                { value: "13:00", label: "13:00" },
                                                { value: "14:00", label: "14:00" },
                                                { value: "15:00", label: "15:00" },
                                                { value: "16:00", label: "16:00" },
                                                { value: "17:00", label: "17:00" },
                                                { value: "18:00", label: "18:00" },
                                                { value: "19:00", label: "19:00" },
                                                { value: "20:00", label: "20:00" },
                                            ]}
                                        />


                                    </div>
                                    <div className=" col-12">
                                        <label htmlFor="fin">Tədbirin bitmə saatı:</label>
                                        <Select
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: "none",
                                                    outline: "none",
                                                    boxShadow: "none",
                                                    color: "black",
                                                    width: "100%",
                                                    "&:hover": {
                                                        borderColor: "none",
                                                        outline: "none",
                                                        boxShadow: "none",
                                                    },
                                                }),
                                            }}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                                width: "100%",
                                                color: "black",
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: "rgb(242, 242, 242)",
                                                    primary: "rgb(242, 242, 242)",
                                                },
                                            })}
                                            classNamePrefix="select"
                                            isClearable={false}
                                            onChange={handleSelectChange}
                                            isSearchable={true}
                                            name="color"

                                            placeholder="Tədbirin bitmə saatı"
                                            options={[
                                                { value: "09:00", label: "09:00" },
                                                { value: "10:00", label: "10:00" },
                                                { value: "11:00", label: "11:00" },
                                                { value: "12:00", label: "12:00" },
                                                { value: "13:00", label: "13:00" },
                                                { value: "14:00", label: "14:00" },
                                                { value: "15:00", label: "15:00" },
                                                { value: "16:00", label: "16:00" },
                                                { value: "17:00", label: "17:00" },
                                                { value: "18:00", label: "18:00" },
                                                { value: "19:00", label: "19:00" },
                                                { value: "20:00", label: "20:00" },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br />
                            {/* <div className="form-error">{error}</div> */}
                            <Button type="submit" variant="contained" color="primary">
                                Əlavə et
                            </Button>
                        </div>
                    </div>
                </form >
            </div >
        </>)
}


export default EventReserve; 