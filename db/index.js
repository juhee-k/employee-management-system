const db = require('./connection.js');
const { title } = require('process');

const orm = {
    getAll(table){
        return db.query(`SELECT * FROM ${table}`)
    },
    createNew(table, data){
        return db.query(`INSERT INTO ${table} SET ?`, data)
    }
}

module.exports = orm;
