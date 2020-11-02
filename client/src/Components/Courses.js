import React, { Component } from 'react';
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
            <div>
                <ul>
                    {courseList}
                </ul>
            </div>
        )
    }
}

export default Courses;