'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso_desarrollar_red_social_angular';

exports.ensureAuth = function(req,res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'La peticion no tiene la cabecera de autentication'})
    }

    var token = req.headers.authorization.replace(/['"]+/, '');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'El token no es valido'
        });

    }

    req.user = payload;

    next();
}