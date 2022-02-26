var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController.js');
const studentController = require('../controllers/studentsController.js');
const userController = require('../controllers/userController.js');



function validateUser(req, res, next){

  if(!req.user){
    res.redirect('/login');
    return;
  }

  next();
}


/* GET home page. */
router.get('/', validateUser, (req,res) => {
  res.redirect('/courses');
});

router.get('/courses',validateUser,  courseController.viewAll);
router.get('/courses/profile/:id', validateUser, courseController.viewProfile);
router.get('/courses/add',validateUser,  courseController.renderAddForm);
router.post('/courses/add',validateUser,  courseController.addCourse);
router.get('/courses/edit/:id', validateUser, courseController.renderEditForm);
router.post('/courses/edit/:id',validateUser,  courseController.updateCourse);
router.get('/courses/delete/:id',validateUser,  courseController.deleteCourse);

router.get('/courses/:courseId/drop/:studentId',validateUser,  courseController.dropCourse);

router.get('/students',validateUser,  studentController.viewAll);
router.get('/students/profile/:id', validateUser, studentController.viewProfile);
router.get('/students/add',validateUser,  studentController.renderAddForm);
router.post('/students/add', validateUser, studentController.addStudent);
router.get('/students/edit/:id', validateUser, studentController.renderEditForm);
router.post('/students/edit/:id', validateUser, studentController.updateStudent);
router.get('/students/delete/:id', validateUser, studentController.deleteStudent);

router.post('/students/:id/enroll/', validateUser, studentController.enrollStudent);

router.get('/register-student', userController.showStudentRegistrationForm);
router.post('/register-student',  userController.registerStudent);


router.get('/register-staff',  userController.showStaffRegistrationForm);
router.post('/register-staff',  userController.registerStaff);


router.get('/login', userController.showLoginForm);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);

module.exports = router;
