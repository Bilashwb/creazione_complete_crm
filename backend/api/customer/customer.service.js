const dbcon = require("../../config/mysql_db_config");


const add = (customer, callBack) => {
    let {name,gender, email, phone,document_id,pass,image}=customer;
    dbcon.query('INSERT INTO customer(name,gender, email, phone,document_id,pass,image) VALUES (?,?,?,?,?,?,?)',
     [name,gender, email, phone,document_id,pass,image], (err, result, fields) => {
        if(err)
        return callBack(err);
        else{
            find(result.insertId,(err,res)=>{
                if(err)
                return callBack(err);
                else
                return callBack(null,res);
            })
        }
    });
}

const update = (customer, callBack) => {
    const {name,gender, email, phone,document_id,pass,image,status,customer_id}=customer;
    dbcon.query('UPDATE customer SET name=?,gender=?,email=?,phone=?,document_id=?,pass=?,image=?,status=? WHERE customer_id=?',
     [name,gender,email, phone,document_id,pass,image,status,customer_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (customer_id, callBack) => {
    dbcon.query('SELECT * from customer WHERE customer_id=?', [customer_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
const findall = (customer_id,callBack) => {
    dbcon.query('SELECT * from customer', (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
const remove = (customer_id, callBack) => {
    dbcon.query('DELETE FROM customer WHERE customer_id=?', [customer_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
module.exports={add,update,find,findall,remove}