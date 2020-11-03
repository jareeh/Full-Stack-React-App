import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const CreateCourse = (props) => {

    const { context } = props;
    const { authenticatedUser, authenticatedPassword, actions } = context;
    
    
    const { id } = props.match.params
    const pathname = `/courses/${id}`

    const [ course, setCourse ] = useState([])
    const [ owner, setOwner ] = useState([])
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ estimatedTime, setEstimatedTime ] = useState('')
    const [ materialsNeeded, setMaterialsNeeded ] = useState('')
    const [ errors, setErrors ] = useState([])


    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateDescription = (e) => {
        setDescription(e.target.value);
    }

    const updateEstimatedTime = (e) => {
        setEstimatedTime(e.value.target);
    }

    const updateMaterialsNeeded = (e) => {
        setMaterialsNeeded(e.value.target);
    }

    const submit = (e) => {
        e.preventDefault();

        const newCourse = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authenticatedUser.id
        };

        actions.api(pathname, 'POST', newCourse, true, { username: authenticatedUser.emailAddress, password: authenticatedPassword})
            .then(() => {
                props.history.push(pathname)
            })
            .catch((err) => {
                console.log(err)
            })

    }

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


    return (
        <div class="bounds course--detail">
            <h1>Create Course</h1>
            <div>
                <ErrorsDisplay errors={errors}/>
                <form>
                    <div class="grid-66">
                        <div class="course--header">
                            <h4 class="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..."
                                value="" onChange={updateTitle}/>
                            </div>
                            <p>By Joe Smith</p>
                        </div>
                        <div class="course--description">
                            <div>
                                <textarea id="description" name="description" class="" placeholder="Course description..." onChange={updateDescription}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="grid-25 grid-right">
                        <div class="course--stats">
                            <ul class="course--stats--list">
                                <li class="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input" placeholder="Hours" value="" onChange={updateEstimatedTime} />
                                    </div>
                                </li>
                                <li class="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div><textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..." onChange={updateMaterialsNeeded}></textarea></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="grid-100 pad-bottom">
                        <button class="button" type="submit">Create Course</button>
                        <Link class="button button-secondary" to="/">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse;