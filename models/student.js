'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Student.belongsToMany(models.Course, {
        through: models.StudentCourses,
        as: 'courses',
        foreignKey: 'student_id',  //column that is in student table
        otherKey: 'course_id', //column that is in the course table
        timestamps: false,
      });

      Student.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
      });

    }

    hasCourse(courseId){
      console.log({
        courses: this.courses,
        courseId,
      })
      for(let i = 0; i<this.courses.length; i++){
        if(this.courses[i].id === courseId) return true;
      }

      return false;
    }
  };
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    grade_level: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false,
  });
  return Student;
};