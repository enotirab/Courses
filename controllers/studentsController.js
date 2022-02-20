const {Student, Course, StudentCourses} = require('../models');
const sequelize = require("sequelize");


//view all
module.exports.viewAll = async function (req, res) {

    const students = await Student.findAll({
        order: [
            ['last_name', 'asc'],
            ['first_name', 'asc'],
        ]
    })

    res.render('student/view_all', {
        students,
    });

}



function courseHasStudent(course, student){
    for(let i = 0; i<course.students.length; i++){
       if(student.id === course.students[i].id){
           return true;
       }
    }

    return false;
}

//view profile
module.exports.viewProfile = async function (req, res) {

    const student = await Student.findByPk(req.params.id, {
        include: 'courses'
    });

    const allCourses = await Course.findAll({
        include: 'students',
        order: [
            ['name']
        ]
    });

    let availableCourses = [];
    for(let i = 0; i<allCourses.length; i++){
        let course = allCourses[i];
        if(!courseHasStudent(course, student)){
            availableCourses.push(course);
        }
    }


    res.render('student/profile', {
        student,
        availableCourses,
    })
}

//render Add form
module.exports.renderAddForm = async function (req, res) {

    const student = {
        first_name: '',
        last_name: '',
        grade_level: 9
    };

    res.render('student/add', {
        student,
    })
}

// add
module.exports.addStudent = async function (req, res) {

    const result = await Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        grade_level: req.body.grade_level,
    });

    res.redirect(`/students/profile/${result.id}`);

}

// render Edit form
module.exports.renderEditForm = async function (req, res) {

    const student = await Student.findByPk(req.params.id);

    res.render('student/edit', {
        student,
    })
}


// update
module.exports.updateStudent = async function (req, res) {

    await Student.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            grade_level: req.body.grade_level,
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

    res.redirect(`/students/profile/${req.params.id}`);
}

//delete
module.exports.deleteStudent = async function (req, res) {

    await Student.destroy({
        where: {
            id: req.params.id
        }
    });

    res.redirect('/students');
}



module.exports.enrollStudent = async function(req, res){

    try {
        console.log({
            student_id: req.params.id,
            course_id: req.body.course,
        })
        await StudentCourses.create({
            student_id: req.params.id,
            course_id: req.body.course,
        })

        res.redirect(`/students/profile/${req.params.id}`);
    } catch (error){
        res.send(error);
    }

}
//associate classes todo