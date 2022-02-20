var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController.js');
const studentController = require('../controllers/studentsController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/courses', courseController.viewAll);
router.get('/courses/profile/:id', courseController.viewProfile);
router.get('/courses/add', courseController.renderAddForm);
router.post('/courses/add', courseController.addCourse);
router.get('/courses/edit/:id', courseController.renderEditForm);
router.post('/courses/edit/:id', courseController.updateCourse);
router.get('/courses/delete/:id', courseController.deleteCourse);

router.get('/courses/:courseId/drop/:studentId', courseController.dropCourse);


router.get('/students', studentController.viewAll);
router.get('/students/profile/:id', studentController.viewProfile);
router.get('/students/add', studentController.renderAddForm);
router.post('/students/add', studentController.addStudent);
router.get('/students/edit/:id', studentController.renderEditForm);
router.post('/students/edit/:id', studentController.updateStudent);
router.get('/students/delete/:id', studentController.deleteStudent);

router.post('/students/:id/enroll/', studentController.enrollStudent);


router.get('/debug/:student_id/:course_id',async (req, res)=> {

  const { StudentCourses} = require('../models');

  const result = await StudentCourses.create({
    student_id: req.params.student_id,
    course_id: req.params.course_id,
  })

  res.send(result);

});


module.exports = router;
