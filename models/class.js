// const db=require('../dbconfig/db');
// const DataTypes = require('sequelize');
// const Batch=require('./batch');
// const ClassRoom= db.define('class', {
// 		id: {
// 			type: DataTypes.INTEGER(11),
// 			allowNull: false,
// 			primaryKey: true,
// 			autoIncrement: true
// 		},
// 		name: {
// 			type: DataTypes.STRING(100),
// 			allowNull: false
// 		}	
// 	}, {
// 		tableName: 'class'
// 	});
// 	ClassRoom.hasMany(Batch);
// 	ClassRoom.sync();
// 	module.exports=ClassRoom;
