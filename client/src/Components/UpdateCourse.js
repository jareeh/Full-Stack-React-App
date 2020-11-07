import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


function UpdateCourse (props) {

    //DEPENDENCY VARIABLES
    const { context } = props;
    const { authenticatedUser } = context;
    const { id } = props.match.params
    const pathname = `/courses/${id}`

    //STATE HOOKS
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ estimatedTime, setEstimatedTime ] = useState('')
    const [ materialsNeeded, setMaterialsNeeded ] = useState('')
    const [ errors, setErrors ] = useState([])

    //DATE FETCHING
    useEffect( () => {
        axios.get(`http://localhost:5000/api${pathname}`)
            .then(data => {
                if(data.data){
                    console.log(data.data)
                    setTitle(data.data.title)
                    setDescription(data.data.description)
                    setEstimatedTime(data.data.estimatedTime)
                    setMaterialsNeeded(data.data.materialsNeeded)

                    if(data.data.user.id !== authenticatedUser.id){
                        props.history.replace('/forbidden')
                    }
                } else {
                    props.history.push('/notfound')
                }
            })
            .catch(err => {
                console.log('Error fetching data', err)
                props.history.push('/error')
            })
    }, [pathname, props.history, authenticatedUser.id])


    //onChange FUNCTIONS
    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateDescription = (e) => {
        setDescription(e.target.value);
    }

    const updateEstimatedTime = (e) => {
        setEstimatedTime(e.target.value);
    }

    const updateMaterialsNeeded = (e) => {
        setMaterialsNeeded(e.target.value);
    }


    //SUBMIT HANDLER
    const submit = (e) => {
        e.preventDefault();

        const updatedCourse = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authenticatedUser.id
        };
        
        let username = context.authenticatedUser.emailAddress
        let password = context.authenticatedUser.password

        context.data.updateCourse(updatedCourse, username, password)
            .then( errors => {
                if(errors.length) {
                    setErrors(errors)
                } else {
                    console.log(`${updatedCourse.title} is successfully updated`)
                    props.history.push(`/courses/${id}`)
                }
            })
            .catch( err => {
                console.log(err)
                props.history.push('/error')
            })
    }

    //VALIDATION ERRORS COMPONENT
    function ErrorsDisplay({ errors }) {
        let errorsDisplay = null;
    
        if(errors.length){
            errorsDisplay = (
                <div>
                    <h1 className="validation--errors--label">Validation Errors</h1>
                    <div className="validation-errors">
                        <ul>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                    </div>
                </div>
            )
        }
        return errorsDisplay;
    }

    //RETURNED COMPONENT
    return (
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                <ErrorsDisplay errors={errors}/>
                <form onSubmit={submit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                value={title} onChange={updateTitle}/>
                            </div>
                            <p>By {`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={updateDescription} />
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
                                        placeholder="Hours" value={estimatedTime} onChange={updateEstimatedTime} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={updateMaterialsNeeded} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <Link className="button button-secondary" to={pathname}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCourse;