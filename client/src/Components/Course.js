import React from 'react';
import { Link } from 'react-router-dom'

const Course = (props) => {
    
    let title = props.data.title
    let url = `courses/${props.data.id}`

    return (
        <div class="grid-33">
            <Link class="course--module course--link" to={url}>
                <h4 class="course--label">Course</h4>
                <h3 class="course--title">{title}</h3>
            </Link>
        </div>
    )

}

export default Course;