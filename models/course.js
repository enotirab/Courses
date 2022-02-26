'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Course.belongsToMany(models.Student, {
        through: models.StudentCourses,
        as: 'students',
        foreignKey: 'course_id',  //column that is in course table
        otherKey: 'student_id', //column that is in the student table
        timestamps: false,
      });
      // define association here
    }
  };
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    instructor_name: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: false,
  });
  return Course;
};