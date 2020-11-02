import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCourse (props) {
    
    const { id } = props.match.params
    const pathname = `/courses/${id}`
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

    return (
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                <form>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                defaultValue={course.title} />
                            </div>
                            <p>By {owner}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description}/>
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                        placeholder="Hours" defaultValue={course.estimatedTime} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={course.materialsNeeded} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCourse;