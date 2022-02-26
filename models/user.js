'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            User.hasOne(models.Student, {
                as: 'student',
                foreignKey: 'user_id',
            });

            User.hasOne(models.Staff, {
                as: 'staff',
                foreignKey: 'user_id',
            });

        }

        can(actions) {

            let allowedActions = [];
            if(this.role === 'admin'){

                allowedActions =  [
                    'Add Course',
                    'Edit Course',
                    'Delete Course',
                    'View Students',
                    'Add Student',
                    'Edit Student',
                    'Delete Student',
                ];
            }

            if(this.role === 'student'){
                allowedActions = [
                    'Enroll Self',
                    'View Self',
                    'Edit Self',
                ];
            }

            return allowedActions.indexOf(actions) !== -1;

        }

        getMenuItems() {

            let menuItems = [
                {
                    label: 'Courses',
                    link: '/courses'
                }
            ];

            if (this.can('View Students')) {

                menuItems.push({
                    label: 'Students',
                    link: '/students'
                });
            }

            if(this.can('View Self')){
                menuItems.push({
                    label: 'View Profile',
                    link: `/students/profile/${this.student.id}`,
                })
            }

            return menuItems;
        }

    };
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        displayName: {
            type: DataTypes.VIRTUAL,
            get() {
                if (this.student) {
                    return this.student.first_name;
                }

                return this.email;
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'school_users',
        timestamps: false,
    });

    return User;
};