import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Course from './Course';

class Courses extends Component {
    state = {
        courses: []
    }
    
    getCourses = () => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                this.setState({courses: response.data})
                //console.log(response.data)
            })
            .catch(err => {
                console.log('Error fetching data', err)
            })
    }
    
    componentDidMount(){
        this.getCourses();
    }

    render(){
        const courses = this.state.courses;
        let courseList
        
        if(courses.length) {
            courseList = courses.map((course, index) =>  <Course data={courses[index]} key={index} />)
        }

        return(
            <div className="bounds">
                {courseList}
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Courses;