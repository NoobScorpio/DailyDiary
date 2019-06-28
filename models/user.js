const db=require('../dbconfig/db');
const DataTypes = require('sequelize');
const Batch=require('./batch');
const User= db.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
        number:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique:true
        },
        password:{
            type: DataTypes.STRING(100),
			allowNull: false
        },
        userType:{
            type: DataTypes.STRING(100),
            allowNull: false,
        }		
	}, {
		tableName: 'user'
	});
	User.sync();
	module.exports=User;
