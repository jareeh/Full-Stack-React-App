import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const CreateCourse = (props) => {

    //DEPENDENCY VARIABLES
    const { context } = props;
    const { authenticatedUser } = context;
    
    //STATE HOOKS
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ estimatedTime, setEstimatedTime ] = useState('')
    const [ materialsNeeded, setMaterialsNeeded ] = useState('')
    const [ errors, setErrors ] = useState([])

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

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authenticatedUser.id
        };

        let username = context.authenticatedUser.emailAddress
        let password = context.authenticatedUser.password

        context.data.createCourse(newCourse, username, password)
            .then( errors => {
                if(errors.length) {
                    setErrors(errors)
                } else {
                    console.log(`${newCourse.title} is successfully posted`)
                    props.history.push('/')
                }
            })
            .catch( err => {
                console.log(err)
                props.history.push('/error')
            })
    }

    //VALIDATION ERROR COMPONENT
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

    //maybe redundant because of PrivateRoute?
    useEffect(() => {
        if(!authenticatedUser){
            props.history.push('/signin')
        }
    })

    //RETURNED COMPONENT
    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
                <ErrorsDisplay errors={errors}/>
                <form onSubmit={submit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                onChange={updateTitle}/>
                            </div>
                            <p>By you</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea id="description" name="description" className="" placeholder="Course description..." onChange={updateDescription}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={updateEstimatedTime} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={updateMaterialsNeeded}></textarea></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Create Course</button>
                        <Link className="button button-secondary" to="/">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse;