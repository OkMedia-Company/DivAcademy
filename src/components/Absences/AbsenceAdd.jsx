import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import SelectComponent from '../tools/Select';
import dayjs from 'dayjs';
import { colourOptions } from './data';
import chroma from 'chroma-js';
import DatePickerComponent from '../tools/DatePickerComponent';
const AddLessonDayAbsence = () => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("xeta");
    const [lessons, setLessons] = useState([]);
    const [groupStudents, setGroupStudents] = useState([]);
    const [groupCode, setGroupCode] = useState("");
    const [lessonSelectOption, setLessonSelectOption] = useState([
        {
            value: 1,
            label: "Dərs"
        }
    ]);


    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', border: '1px solid #ccc' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const [formData, setFormData] = useState({
        student_id: '',
        lesson_id: '',
        date: `${dayjs(new Date()).format('YYYY-MM-DD')}`,
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        axios.post(`https://div.globalsoft.az/api/lesson_days`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                console.log(response.data);
            }
            ).catch(error => {
                setError(error.response.data.message);
            }
            );
    };
    useEffect(() => {
        axios
            .get(`https://div.globalsoft.az/api/students`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                setStudents(response.data.students);
            }).catch(error => {
                setError(error.response.data.message);
            });
    }, []);
    useEffect(() => {
        axios.get(`https://div.globalsoft.az/api/group_students`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setGroupStudents(response.data.groupstudents);
            }).catch(error => {
                setError(error.response.data.message);
            });
    }, []);

    const groups = JSON.parse(localStorage.getItem('groups'));
    const handleSelectChange = (name) => (select) => {
        if (name === "student_id") {
            const studentGroupId = groupStudents.find((groupStudent) => groupStudent.student_id == select.value).group_id;
            const studentGroupCode = groups.groups.find((group) => group.id === studentGroupId).group_code;
            setGroupCode(studentGroupCode);
            const groupLessons = groups.groups.find((group) => group.id === studentGroupId).lessons;
            // const groupLessonIds = groupLessons.map((lesson) => lesson.id);
            setLessonSelectOption(
                groupLessons.map((lesson) => {
                    return {
                        value: lesson.id,
                        label: lesson.week_day
                    }
                })
            );
            setFormData({
                ...formData,
                [name]: select.value
            });
        }
        if (name === "lesson_id") {
            setFormData({
                ...formData,
                [name]: select.value
            });
        }
        if (name === "type") {
            setFormData({
                ...formData,
                [name]: select.value
            });
        }
    }

    return (
        <>
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
                                            onChange={handleSelectChange("student_id")}
                                            options={
                                                students.map((student) => {
                                                    return {
                                                        value: student.id,
                                                        label: student.name
                                                    }
                                                })


                                            }
                                        />
                                    </div>
                                    <div className="col-6">
                                        {
                                            <label htmlFor="group_code">{groupCode} Qrupun dərs günləri:</label>
                                        }

                                        <SelectComponent
                                            name="lesson_id"
                                            id="lesson_id"
                                            onChange={handleSelectChange("lesson_id")}
                                            options={
                                                lessonSelectOption
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="father_name">Tarix:</label>
                                        <div className='datepicker'>
                                            {/* Select todays date as default value */}
                                            <DatePickerComponent
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="type">Tələbə iştirak vəziyyəti:</label>
                                        <Select
                                            defaultValue={colourOptions[2]}
                                            options={colourOptions}
                                            styles={colourStyles}
                                            onChange={handleSelectChange("type")}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="note_lesson">Tələbəyə notu:</label>
                                        <input
                                            type="note_lesson"
                                            name="note_lesson"
                                            id="note_lesson"
                                            value={formData.note_lesson}
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
                                    <div className=" col-12">
                                        <label htmlFor="reason">Qayıb səbəbi:</label>
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

                            {
                                error !== "xeta" ? (
                                    <div className="alert alert-danger my-3" role="alert">
                                        {error}
                                    </div>
                                ) : null
                            }
                            <Button type="submit" variant="contained" color="primary">
                                Əlavə et
                            </Button>
                        </div>
                    </div>
                </form>
            </div >
        </ >
    );
};
export default AddLessonDayAbsence;