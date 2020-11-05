import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function CourseDetail (props) {

    //DEPENDENCY VARIABLES
    const { id } = props.match.params
    const pathname = `/courses/${id}`
    const { context } = props
    const authenticatedUser = context.authenticatedUser

    //STATE HOOKS
    const [ course, setCourse ] = useState([])
    const [ owner, setOwner ] = useState([])

    //GATHER DATA AND SET HOOKS
        //PUSH notfound IF COURSE DOESN'T EXIST
    useEffect( () => {
        axios.get(`http://localhost:5000/api${pathname}`)
            .then(data => {
                if(data.data){
                    setCourse(data.data)
                    setOwner(data.data.user)
                } else {
                    props.history.push('/notfound')
                }
                    
            })
            .catch(err => {
                console.log('Error fetching data', err)
                props.history.push('/error')
            })
    }, [pathname, props.history])

    //DELETE COURSE FUNCTION
    const deleteCourse = () => {
        let username = context.authenticatedUser.emailAddress
        let password = context.authenticatedUser.password

        context.data.deleteCourse(course, username, password)
            .then( () => {
                console.log(`${course.title} is successfully deleted`)
                props.history.push(`/`)
            })
            .catch( err => {
                console.log(err)
                props.history.push('/error')
            })
    }

    //RETURNED COMPONENT
    return(
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {authenticatedUser && authenticatedUser.emailAddress === owner.emailAddress ? 
                            <span>
                                <Link className="button" to={`${pathname}/update`}>Update Course</Link>
                                <button className="button" onClick={deleteCourse}>Delete Course</button>
                            </span>
                            :
                            null
                        }
                    <Link className="button button-secondary" to="/">Return to List</Link></div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        <p>By {`${owner.firstName} ${owner.lastName}`}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown>{course.description}</ReactMarkdown>
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
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
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