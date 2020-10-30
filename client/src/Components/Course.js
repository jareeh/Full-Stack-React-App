import React from 'react';

const Course = (props) => {
    
    let title = props.data.title
    let url = `http://localhost:3000/courses/${props.data.id}`

    return (
        <li>
            <h2>Course</h2>
            <a href={url}>{title}</a>
        </li>
    )

}

export default Course;