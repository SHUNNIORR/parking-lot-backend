const { response } = require("express");

 const isAdmin = (req, res = response, next)=>{
    if(!req.user ){
        return res.status(500).json({message: 'token not valid'});
    }

    const {role} = req.user

    if(role !== 'ADMIN_ROLE'){
        return res.status(403).json({message: 'You do not have permission to this resource'})
    }

    next()
 }

 const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'token not valid'
            });
        }

        if ( !roles.includes( req.user.rol ) ) {
            return res.status(401).json({
                msg: `The service require one of these roles: ${ roles }`
            });
        }


        next();
    }
}



module.exports = {
    isAdmin,
    tieneRole
}

module.exports = {isAdmin};