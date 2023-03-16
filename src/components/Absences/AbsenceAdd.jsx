import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import SelectComponent from '../tools/Select';
import dayjs from 'dayjs';
const AddLessonDayAbsence = () => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("xeta");
    const [lessons, setLessons] = useState([]);
    const [formData, setFormData] = useState({
        student_id: '',
        lesson_id: '',
        date: '',
        mark_lesson: '',
        note_lesson: '',
        type: '',
        reason: ''
    });


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    const handleSelectChange = (select) => {
        setSelectedOption(select);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://div.globalsoft.az/api/lesson_days', formData)
            .then(response => {
                console.log(response);
            }).catch(error => {
            });
    };
    useEffect(() => {
        axios.get(`https://div.globalsoft.az/api/students`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setStudents(response.data.students);
            }).catch(error => {
            });

    }, []);

    return (
        <div>
            <h2>Dəvamiyyət əlavə et</h2>
            <div className="main-add-form">
                <form onSubmit={handleSubmit}>
                    <div className="main-add-form-inner row">
                        <div className="main-add-form_input row">
                            <div className="main-add-form-input-names col me-5">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="name">Tələbə:</label>
                                        <SelectComponent
                                            name="student_id"
                                            id="student_id"
                                            onChange={handleSelectChange}
                                            options={
                                                students.map((student) => {
                                                    return {
                                                        value: student.id,
                                                        label: student.name + " " + student.last_name
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="lesson_id">Dərs:</label>
                                        <SelectComponent
                                            name="lesson_id"
                                            id="lesson_id"
                                            onChange={handleSelectChange}
                                            options={
                                                lessons.map((lesson) => {
                                                    return {
                                                        value: lesson.id,
                                                        label: lesson.name
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="father_name">Tarix:</label>
                                        <input
                                            type="date"
                                            name="father_name"
                                            id="father_name"
                                            value={dayjs(Date.now())}
                                            onChange={handleChange}
                                        />

                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="mark_lesson">Dərs qiyməti:</label>
                                        <input
                                            type="text"
                                            name="mark_lesson"
                                            id="mark_lesson"
                                            value={formData.mark_lesson}
                                            onChange={handleChange}
                                        />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="note_lesson">Tələbə not:</label>
                                        <input
                                            type="note_lesson"
                                            name="note_lesson"
                                            id="note_lesson"
                                            value={formData.note_lesson}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className=" col-6">
                                        <label htmlFor="type">Tipi:</label>
                                        <input
                                            type="text"
                                            name="type"
                                            id="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" col-12">
                                        <label htmlFor="reason">Səbəb:</label>
                                        <input
                                            type="text"
                                            name="reason"
                                            id="reason"
                                            value={formData.reason}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="form-error">{error}</div> */}
                            <Button type="submit" variant="contained" color="primary">
                                Əlavə et
                            </Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddLessonDayAbsence;