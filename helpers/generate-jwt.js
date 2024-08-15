const jwt = require('jsonwebtoken');
const generateJwt = async(uid = '', role='') => {
    return new Promise((resolve, reject) => {
        const payload = {uid,role} 
        jwt.sign(payload, process.env.SECRET_KEY,{expiresIn:'4h'},(err, token)=>{
            if (err) {
                console.log(err)
                reject('No se pudo generar jwt')
            }else{
                resolve(token)
            }
        }) 
    })
}   
module.exports = generateJwt;