export function createCourse(course) {
    return { type: 'CREATE_COURSE', course: course };
    /*
        in ES6 if LHS=RHS then we can write the above as 
        return { type: 'CREATE_COURSE', course };
    */
}