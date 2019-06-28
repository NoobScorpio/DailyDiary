const db=require('../dbconfig/db');
const DataTypes = require('sequelize');
const parent = require('../models/parent');
const Batch=require('./batch');
const Student= db.define('student', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			
        },
        name:{
            type:DataTypes.STRING(100),
            allowNull:false
          
        }
	}, {
		tableName: 'student'
    });
    //parent.hasMany(Student);
    //Student.belongsTo(parent);
    //Student.hasMany(Batch);
	Student.sync();
	module.exports=Student;
