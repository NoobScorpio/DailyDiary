// const db=require('../dbconfig/db');
// const DataTypes = require('sequelize');
// const Batch=require('./batch');
// const Teacher= db.define('teacher', {
// 		id: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		name: {
// 			type: DataTypes.STRING(100),
// 			allowNull: false
//         },
//         number:{
//             type: DataTypes.STRING(100),
//             allowNull: false,
//             unique:true
//         },
//         password:{
//             type: DataTypes.STRING(100),
// 			allowNull: false
//         }		
// 	}, {
// 		tableName: 'teacher'
// 	});
	
// 	Teacher.hasMany(Batch);
// 	Teacher.sync();
// 	module.exports=Teacher;
