
var passport = require('passport');
var passportLocalMongoose = require('passport-local-mongoose');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var mongoose = require('mongoose');
var Account = require('../models/account');
mongoose.connect('mongodb://localhost/prueba');

    var Schema = new mongoose.Schema({
            name : String,
            start_date: String,
            end_date: String,
            text: String,
            color: String, 
            user: String 

    });
 var oportunidad = mongoose.model('event', Schema);


 var Schema = new mongoose.Schema({
           
            username: String,
            password: String,

    });

var login = mongoose.model('User', Schema);


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}

router.get('/agenda', ensureAuthenticated, function(req, res) {
  
  res.render("index", {title: "agenda"});
  console.log({user: req.user.username})

});
 
/* Mostramos el formualario para crear usuarios nuevos */
router.get('/', function(req, res) 
{
  res.render('login', { title: 'Mi CRM'});
});

router.get('/oportunidad', ensureAuthenticated, function(req,res){
    res.render('oportunidad', {title: 'oportunidad', user: req.user});
    console.log({user: req.user})

});
router.get('/updateOportunidades', ensureAuthenticated, function(req,res){
    res.render('updateOportunidades', {title: 'oportunidad'});
    console.log({user: req.user})

});

router.get('/proyecto', ensureAuthenticated, function(req,res){
    res.render('proyecto', { user: req.user });

});



router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


router.get('/users', function(req,res){
    res.render('show', {title: 'cumpleanos'});

});

router.get('/registrar', function(req, res) {
    res.render('registrar', { });
});

router.post('/registrar', function(req, res, next) {
    Account.register(new Account({ username : req.body.username, nombre:req.body.nombre, correo: req.body.correo}), req.body.password,  function(err, account) {
        if (err) {
          return res.render("registrar", {info: "El nombre de usuario ya existe"});
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', function(req, res){
   res.render('login', {user: req.user})

});

//Pagina del perfil de usuario, requerimos el nombre de usuario
router.get('/perfil', function(req, res){
    res.render('profile', {user: req.user})
});

router.post('/login', passport.authenticate('local'), function(req, res, next){
    req.session.save(function (err){
            if(err){
               return res.render("login", {info: "El nombre de usuario ya existe"});
            }

            
         UserModel.getCumpleHoy(function(error, data)
          {   
        console.log({user: req.user})
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.render("show",{ 
                title : "Servicio rest con nodejs, express 4 y mysql", 
                users : data[0], user: req.user
            });

            cumple = data[0];
        }
        //en otro caso mostramos un error
        
        }); 

            usuario= req.user.username;
            apellido = req.user;
        
    UserModel.getOports(function(error, data)
    {   
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {

            res.render("showOportunidades",{ 
                title : "Mostrando Oportunidades", 
                oportunidades: data,  user: req.user
            });

            oport = data;

            console.log(apellido);
        }
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }
    });

    
                        res.redirect('/home/')
                        //si existe el usuario mostramos la pagina
                       
                    });

    });

router.get('logout', function(req, res, next){

         req.session.destroy(function (err) {
    res.redirect('/'); 
  });

});

router.get('/ping', function(req, res){
    res.status(200).send({user:req.user});
});


 
/* Creamos un nuevo usuario */
router.post("/user",ensureAuthenticated, function(req,res)
{
    //creamos un objeto con los datos a insertar del usuario
    var userData = {
        id : null,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        created_at : null
    };
    UserModel.insertUser(userData,function(error, data)
    {
        //si el usuario se ha insertado correctamente mostramos su info
        if(data && data.insertId)
        {

            res.redirect('/user');

        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});

/*Creamos Oportunidad*/
router.post("/oportunidad", ensureAuthenticated, function(req,res)
{
    //creamos un objeto con los datos a insertar de oportunidad
     //creamos un objeto con los datos a insertar de oportunidad
    var oportData = {
        
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        fecha : req.body.fecha,
        valor: req.body.valor,
        estado: req.body.estado,
        responsable: req.body.responsable,
        origen: req.body.origen,
        usuario: req.user.username   
        
    };

    

    UserModel.insertOportunidad(oportData,function(error, data)
    {
        //si el usuario se ha insertado correctamente mostramos su info
        if(data && data.insertId)
        {

            var r = new Date().toLocaleString();
            // var rightNow = new Date();
            // var r = rightNow.toISOString().slice(0,10).replace(/-/g,"/");
            
            new oportunidad({
            name: req.body.nombre,
            start_date: r,
            end_date: r,
            text: 'Oportunidad Creada: ' +req.body.descripcion,
            color: "#d9edf7", 
            user: 'Creada por: '+ req.user.username

        }).save(function(err, doc){

            if(err) res.json(err);      
       
        });
            
            actData ={
            nombre: req.body.nombre,
            tipo: "Creación de Oportunidad",
            user:req.user.username,
            type:"home",
            typeid:"",

             }

    UserModel.insertActividad(actData, function(error, data){
           
            if(data &&data.insertId){

            }
            else{
                res.json(500,{"msg":"Error"});
            }

    });


            res.redirect('/oportunidad');
            //res.redirect("/oportunidad/" + data.insertId);//
            
        }
        else
        {
            
            res.json(500,{"msg":"Error"});
        }
    });
    
});
/*Creamos nuevo proyecto*/

router.post('/proyecto', ensureAuthenticated, function(req,res){
        //Creando el objeto con los datos a insertar en el proyecto

        var projData = {
                id: null,
                nombreP: req.body.nombreP,
                descripcionP: req.body.descripcionP,
                statusP: req.body.statusP,
                responsableP : req.body.responsableP,
                fechaP: req.body.fechaP,
                referidoP: req.body.referidoP,
                ratingP: req.body.ratingP,
                usuario: req.user.username    

        };

        UserModel.insertProject(projData, function(error,data)
        {
                if(data && data.insertId)
                {      

                         actData ={
                                        nombre: req.body.nombreP,
                                        tipo: "Creación de Proyecto",
                                        user:req.user.username,
                                        

                                        }
                              UserModel.insertActividad(actData, function(error, data){

                                if(data &&data.insertId){

                                }
                                else{
                                    res.json(500,{"msg":"Error"});
                                }
                              }); 
                        var r = new Date().toLocaleString();
                        new oportunidad({
                        name: req.body.nombreP,
                        start_date: r,
                        end_date: r,
                        text: 'Proyecto Creado: ' +req.body.descripcionP,
                        color: "#d9edf7", 
                        user: 'Creada por: '+ req.user.username

                         }).save(function(err, doc){

            if(err) res.json(err);      
       
                });

                   res.redirect('/proyecto');

                }        
                else{
                    res.json(500,{"msg":"error"});
                }

        });        
});

 
/* Actualizamos un usuario existente */
router.put('/user/', ensureAuthenticated,function(req, res)
{
    //almacenamos los datos del formulario en un objeto
    var userData = {id:req.param('id'),username:req.param('username'),email:req.param('email')};
    UserModel.updateUser(userData,function(error, data)
    {
        //si el usuario se ha actualizado correctamente mostramos un mensaje
        if(data && data.msg)
        {   
            res.redirect("/user/" + req.param('id'));
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});


/* Actualizamos oportunidad existente */
router.put('/oportunidad/', ensureAuthenticated, function(req, res)

{
    //almacenamos los datos del formulario en un objeto
    var oportData = {id:req.param('id'),nombre:req.param('nombre'),descripcion:req.param('descripcion'),
                valor:req.param('valor'), responsable:req.param('responsable'),
                origen:req.param('origen'), estado:req.param('estado')};
    UserModel.updateOportunidad(oportData,function(error, data)
    {
        //si el usuario se ha actualizado correctamente mostramos un mensaje
        if(data && data.msg)
        {                         actData ={
                                        nombre: req.param('nombre'),
                                        tipo: "Cambios en Oportunidad",
                                        user:req.user.username,
                                        type:"oportunidad",
                                        typeid: req.param('id')
                                        
                                        }
                              UserModel.insertActividad(actData, function(error, data){

                                if(data &&data.insertId){

                                }
                                else{
                                    res.json(500,{"msg":"Error"});
                                }
                              }); 
            res.redirect("/oportunidad/" + req.param('id'));
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
});

/* Actualizamos proyecto existente */
router.put('/proyecto/', ensureAuthenticated, function(req, res)

{
    //almacenamos los datos del formulario en un objeto
    var projData = {id:req.param('id'),nombreP:req.param('nombreP'),descripcionP:req.param('descripcionP'),
                ratingP:req.param('ratingP'), responsableP:req.param('responsableP'),
                referidoP:req.param('referidoP'), statusP:req.param('statusP'), fechaP:req.param('fechaP')};
    UserModel.updateProyecto(projData,function(error, data)

    {
        
        if(data && data.msg)

        {
             actData ={
                                        nombre: req.param('nombreP'),
                                        tipo: "Cambios en Proyecto",
                                        user:req.user.username,
                                        type:"proyecto",
                                        typeid: req.param('id')

                                        

                                        }
                              UserModel.insertActividad(actData, function(error, data){

                                if(data &&data.insertId){

                                }
                                else{
                                    res.json(500,{"msg":"Error"});
                                }
                              }); 
             console.log(projData);
            res.redirect("/proyecto/" + req.param('id'));
        }
        else
        {
             console.log(projData);
            res.json(500,{"msg":"Error"});
        }
    });
});

 
/* Obtenemos un usuario por su id y lo mostramos en un formulario para editar */
router.get('/user/:id', ensureAuthenticated, function(req, res) 
{
    var id = req.params.id;
    console.log(id);
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        UserModel.getUser(id,function(error, data)
        {
            //si existe el usuario mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.render("updateUser",{ 
                    title : "Servicio rest con nodejs, express 4 y mysql", 
                    info : data, user: req.user
                });
            }
            //en otro caso mostramos un error
            else
            {
                res.json(404,{"msg":"notExist"});
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"The id must be numeric"});
    }
});

/* Obtenemos un usuario por su id y lo mostramos en un formulario para editar */
router.get('/oportunidad/:id', ensureAuthenticated, function(req, res) 
{
    var id = req.params.id;
    console.log(id);
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        UserModel.getOport(id,function(error, data)
        {

            //si existe el usuario mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.render("updateOportunidades",{ 
                    title : "Servicio rest con nodejs, express 4 y mysql", 
                    info : data, user: req.user
                });


            }


            //en otro caso mostramos un error
            else
            {
                res.json(404,{"msg":"notExist"});
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"The id must be numeric"});
    }
});

/* Obtenemos un usuario por su id y lo mostramos en un formulario para editar */
router.get('/proyecto/:id', ensureAuthenticated, function(req, res) 
{
    var id = req.params.id;
    console.log(id);
    //solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        UserModel.getProject(id,function(error, data)
        {
            //si existe el usuario mostramos el formulario
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.render("updateProyectos",{ 
                    title : "Servicio rest con nodejs, express 4 y mysql", 
                    info : data, user: req.user
                });
            }
            //en otro caso mostramos un error
            else
            {
                res.json(404,{"msg":"notExist"});
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"The id must be numeric"});
    }
});
 
/* Obtenemos y mostramos cumples de Hoy*/
router.get('/bdays/', ensureAuthenticated, function(req, res) 
{
    UserModel.getCumpleHoy(function(error, data)
    {   
        console.log({user: req.user})
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.render("show",{ 
                title : "Servicio rest con nodejs, express 4 y mysql", 
                users : data[0], user: req.user
            });
        }
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }
    });
});
router.get('/bdays/siete', ensureAuthenticated, function(req, res) 
{
    UserModel.getCumpleHoy(function(error, data)
    {   
        console.log({user: req.user})
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.render("siete",{ 
                title : "Servicio rest con nodejs, express 4 y mysql", 
                users : data[1], user: req.user
            });
        }
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }
    });
});
router.get('/bdays/quince', ensureAuthenticated, function(req, res) 
{
    UserModel.getCumpleHoy(function(error, data)
    {   
        console.log({user: req.user})
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.render("quince",{ 
                title : "Servicio rest con nodejs, express 4 y mysql", 
                users : data[2], user: req.user
            });
        }
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }
    });
});
router.get('/bdays/treinta', ensureAuthenticated, function(req, res) 
{
    UserModel.getCumpleHoy(function(error, data)
    {   
        console.log({user: req.user})
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.render("treinta",{ 
                title : "Servicio rest con nodejs, express 4 y mysql", 
                users : data[3], user: req.user
            });
        }
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }   
    });
});


/* Obtenemos y mostramos todas oportunidade*/
router.get('/oportunidades/',ensureAuthenticated, function(req, res) 
{

    usuario= req.user.username;
    apellido = req.user;
        
    UserModel.getOports(function(error, data){   
        //si existe el usuario mostramos el formulario
        UserModel.getValOports(function(error, dato){
                if (typeof data !== 'undefined')
                {

                    res.render("showOportunidades",{ 
                        title : "Mostrando Oportunidades", 
                        oportunidades: data, getvalor:dato, user: req.user
                    });

                    console.log(apellido);
                    console.log(dato[0].total);
                }
                //en otro caso mostramos un error
                else
                {
                    res.json(404,{"msg":"notExist"});
                }
            });
        });

});
/* Obtenemos y mostramos todos los proyectos*/
router.get('/proyectos/', ensureAuthenticated, function(req, res) 
{
    UserModel.getProjects(function(error, data)
    {
        //si existe el usuario mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.render("showProyectos",{ 
                title : "Mostrando proyectos", 
                proyectos: data, user: req.user
            });

            proy = data.length;
        }

            // proy = data.length;
            // console.log(proy);
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }
    });
});

 
/* ELiminamos un usuario */
router.delete("/user/", function(req, res)
{
    //id del usuario a eliminar
    var id = req.param('id');
    UserModel.deleteUser(id,function(error, data)
    {
        if(data && data.msg === "deleted" || data.msg === "notExist")
        {
            res.redirect("/users/");
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
})
router.delete("/oportunidad/", function(req, res)
{
    //id del usuario a eliminar
    var id = req.param('id');
    var nombre = req.param('nombre');
    UserModel.deleteOportunidad(id,function(error, data)
        {
            if(data && data.msg === "deleted" || data.msg === "notExist")
            {
                             actData ={
                                        nombre: req.param('nombre'),
                                        tipo: "Eliminación de Oportunidad",
                                        user:req.user.username,
                                        

                                        }
                              UserModel.insertActividad(actData, function(error, data){

                                if(data &&data.insertId){

                                }
                                else{
                                    res.json(500,{"msg":"Error"});
                                }
                              }); 


                res.redirect("/oportunidades");
            }
            else
            {
                res.json(500,{"msg":"Error"});
            }
        });
})
 router.delete("/proyecto/", function(req, res)
{
    //id del usuario a eliminar
    var id = req.param('id');
    proyecto = req.param('nombre');
    UserModel.deleteProyecto(id,function(error, data)
    {
        if(data && data.msg === "deleted" || data.msg === "notExist")
        {
                              actData ={
                                        nombre: req.param('nombre'),
                                        tipo: "Eliminación de Proyecto",
                                        user:req.user.username,

                                        

                                        }
                              UserModel.insertActividad(actData, function(error, data){

                                if(data &&data.insertId){

                                }
                                else{
                                    res.json(500,{"msg":"Error"});
                                }
                              }); 
            res.redirect("/proyectos");
        }
        else
        {
            res.json(500,{"msg":"Error"});
        }
    });
})


///AQUI HOME TRAERNOS TODOS LOS TOTALES OPORTUNIDADES, EVENTOS, CUMPLES, PROYECTOS
router.get('/home/', ensureAuthenticated, function(req, res) 
{
    UserModel.getProjects(function(error, result) {
        UserModel.getActividad(function(error, results){
            UserModel.forTodaysProj(function(error, resultado){
                UserModel.forTodaysOpt(function(error, resultados){
                        res.render('home', {
                        title: "mostrando actividad",  proyectos: result, actividad: results, forTodaysProj: resultado, forTodaysOpt: resultados, user:req.user
                           });

                    proy = result.length;
                });
             });       
                     
        });

        
    });

});
// router.get('/hoy', ensureAuthenticated, function(req,res){
//     UserModel.forTodays(function(error, resultado){
//          res.render('hoy', {title:'mostrando los eventos del dia', oportunidad: resultado,  user: req.user });


//     })

   

// });


module.exports = router;








