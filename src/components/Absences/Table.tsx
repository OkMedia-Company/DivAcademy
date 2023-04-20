
import React from 'react';
const Table = ({ data }) => {
    return (
        <table>
            <thead>
                <tr> 
                    <th>Date</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Mark Lesson</th>
                    <th>Note Lesson</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {data.map(({ date, lessons }) => (
                    lessons.map(({ id, student_id, lesson_id, mark_lesson, note_lesson, type, reason }) => (
                        <tr key={id}>
                            <td>{date}</td>
                            <td>{`Name ${student_id}`}</td>
                            <td style={{ color: type === '1' ? 'green' : type === '2' ? 'yellow' : 'red' }}>
                                {type}
                            </td>
                            <td>{mark_lesson}</td>
                            <td>{note_lesson}</td>
                            <td>{reason}</td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    );
};

export default Table;
