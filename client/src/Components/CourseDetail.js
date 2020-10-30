import React, { useState, useEffect } from 'react';
//import Data from '../Data'
import axios from 'axios';
//import { useParams } from 'react-router-dom';

function CourseDetail (props) {

    const pathname = props.location.pathname
    const updateURL = `http://localhost:3000/${pathname}/update`
    const deleteURL = `http://localhost:3000/${pathname}/delete`

    //const { context } = props;
    //const { authUser, actions } = context;

    const [ course, setCourse ] = useState([])
    const [ owner, setOwner ] = useState([])

    useEffect( () => {
        axios.get(`http://localhost:5000/api${pathname}`)
            .then(data => {
                console.log(data.data)
                setCourse(data.data)
                setOwner(data.data.userId)
            })
            .catch(err => {
                console.log('Error fetching data', err)
            })
    }, [pathname])

    const materials = String(course.materialsNeeded).split('\n')
    const materialsList = materials.map((material, index) => <li>{material}</li>)

    return(
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100"><span><a className="button" href={updateURL}>Update Course</a><a className="button" href={deleteURL}>Delete Course</a></span><a
                        className="button button-secondary" href="/">Return to List</a></div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>By {owner}</p>
                    </div>
                    <div className="course--description">
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{course.estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    {materialsList}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail;