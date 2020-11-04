import React from 'react';
import { Link } from 'react-router-dom'

const Course = (props) => {
    
    let title = props.data.title
    let url = `courses/${props.data.id}`

    return (
        <div className="grid-33">
            <Link className="course--module course--link" to={url}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
            </Link>
        </div>
    )

}

export default Course;