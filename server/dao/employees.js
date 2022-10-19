const crypto=require('crypto');
const db=require('./dao');
const login=async(username,password)=>new Promise((resolve,reject)=>{
    const sql="SELECT * FROM EMPLOYEES WHERE Username=?";
    db.get(sql,[username],(err,row)=>{
        if(err) reject(err);
        else{
            if(row!==undefined){
                crypto.scrypt(password,Buffer.from(row.Salt,'hex'),32,(err,hashedPassword)=>{
                    if(err) reject(err);
                    else{
                        if(!crypto.timingSafeEqual(Buffer.from(row.Password,'hex'),hashedPassword)) resolve(false);
                        else resolve({username:row.Username,type:row.Type});
                    }
                })
            }
            else resolve(false);
        }
    })
})
const employees={login}
module.exports=employees;