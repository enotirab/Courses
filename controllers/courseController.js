const { Course, StudentCourses} = require('../models');
const departments = [
    'Art',
    'English',
    'Music',
    'Math',
    'Science',
    'Social Studies',
    'World Languages',
]

//view all
module.exports.viewAll = async function(req, res){
   const courses = await Course.findAll({
       order:[
           ['name', 'asc'],
           ['instructor_name', 'asc'],
       ]
   });

   res.render('course/view_all', {
       courses,
   });
}

//view profile
module.exports.viewProfile =  async function (req, res){
    const course = await Course.findByPk(req.params.id, {
        include: 'students',
    });

    res.render('course/profile', {
        course
    });
};


//render Add form
module.exports.renderAddForm = function(req, res){


    const course = {
        name: '',
        instructor_name: '',
        department: departments[0],
        description: '',
    };

    res.render(`course/add`, {
        course,
        departments,
    });
}



// render Edit form
module.exports.renderEditForm = async function(req, res){

    const course = await Course.findByPk(req.params.id);

    res.render('course/edit', {
        course,
        departments,
    });

};

// add
module.exports.addCourse = async function(req, res){


    const form = {
        name: req.body.name,
        instructor_name: req.body.instructor_name,
        department: req.body.department,
        description: req.body.description,
    }

    const result = await Course.create(form);

    res.redirect(`/courses/profile/${result.id}`);
}


// update
module.exports.updateCourse = async function(req, res){


    const form = {
        name: req.body.name,
        instructor_name: req.body.instructor_name,
        department: req.body.department,
        description: req.body.description,
    }

    let id = req.params.id;
    await Course.update(form,
        {
            where: {
                id
            }
        });

    res.redirect(`/courses/profile/${id}`);
}

//delete
module.exports.deleteCourse = async function(req, res){
   await Course.destroy({
       where: {
           id: req.params.id,
       }
   });

   res.redirect('/courses');
};

module.exports.dropCourse = async function(req, res){

    await StudentCourses.destroy({
        where:{
            student_id: req.params.studentId,
            course_id: req.params.courseId,
        }
    });

    res.redirect(req.header('Referer'));
}
//associate students ... todo