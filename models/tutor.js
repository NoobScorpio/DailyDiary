// const db=require('../dbconfig/db');
// const DataTypes = require('sequelize');
// const Student=require('./student');
// const Tutor= db.define('tutor', {
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
// 		tableName: 'tutor'
// 	});
	
// 	Tutor.hasMany(Student);
// 	Tutor.sync();
// 	module.exports=Tutor;
