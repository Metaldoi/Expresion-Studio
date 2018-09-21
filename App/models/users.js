

//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
    { 
        host: 'localhost', 
        user: 'root',  
        password: 'root', 
        database: 'restnode',
        port :3306,
        multipleStatements: true
    }

);  


//creamos un objeto para ir almacenando todo lo que necesitemos

var userModel = {};
 
//obtenemos todos los usuarios
userModel.getUsers = function(callback)
{
    if (connection) 
    {
        connection.query('SELECT * FROM users ORDER BY id', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

//obtenemos lista de oportunidades//
userModel.getOports = function(callback)
{
    if (connection) 
    {
        console.log(usuario +"yay");
        connection.query('SELECT *, date_format(fecha, "%d/%m/%y") as actual, date_format(fechalimite, "%d/%m/%y") as limite FROM oportunidades WHERE usuario = "'+usuario+'" ORDER BY id' , function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}
userModel.getValOports = function(callback)
{
    if (connection) 
    {
        console.log(usuario +"yay");
        connection.query('SELECT sum(valor) as total  FROM oportunidades WHERE usuario = "'+usuario+'" ORDER BY id' , function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}


//obtenemos lista de proyectos//
userModel.getProjects = function(callback)
{
    if (connection) 
    {
        connection.query("SELECT *, date_format(actualP,'%d/%m/%y') as actualP, date_format(fechaP,'%d/%m/%y')  as fechaP FROM proyectos Where usuario = '" +usuario+"'", function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

 //obtenemos un usuario por su id
userModel.getUser = function(id,callback)
{
    if (connection) 
    {
        var sql = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
        connection.query(sql, function(error, row) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

 //obtenemos oportunidad por su id
userModel.getOport = function(id,callback)
{
    if (connection) 
    {
        var sql = "SELECT *, date_format(fecha,'%y/%m/%d') as fecha FROM oportunidades WHERE id = " + connection.escape(id);
        connection.query(sql, function(error, row) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

userModel.getProject = function(id,callback)
{
    if (connection) 
    {
        var sql = "SELECT *, date_format(actualP,'%y/%m/%d') as actualP, date_format(fechaP,'%y/%m/%d') as fechaP FROM proyectos WHERE id = " + connection.escape(id);
        connection.query(sql, function(error, row) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}
 //añadir un nuevo usuario
userModel.insertUser = function(userData,callback)
{
    if (connection) 
    {
        var query = connection.query('INSERT INTO users SET ? ', userData, function(error, result) 
        {
            if(error)
            {
                throw error;
            }
            else
            {

                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}
//Insertamos Oportunidad//

userModel.insertOportunidad = function(oportData,callback)
{
    if (connection) 
    {
        var query = connection.query('INSERT INTO oportunidades SET ?' , oportData, function(error, result) 
        {
            if(error)
            {
                throw error;
                console.log(query);
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}
//Insertamos Proyecto//
userModel.insertProject = function(projData,callback)
{
    if (connection) 
    {
        var query = connection.query('INSERT INTO proyectos SET ?, actualP = NOW()' , projData, function(error, result) 
        {
            if(error)
            {
                throw error;
                console.log(query);
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}
 //actualizar un usuario
userModel.updateUser = function(userData, callback)
{
    //console.log(userData); return;
    if(connection)
    {
        var sql = 'UPDATE users SET username = ' + connection.escape(userData.username) + ',' +  
        'email = ' + connection.escape(userData.email) +
        'WHERE id = ' + userData.id;
 
        connection.query(sql, function(error, result) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg":"success"});
            }
        });
    }
}
//actualizar una oportunidad
userModel.updateOportunidad = function(oportData, callback)
{
    //console.log(oportData); return;
    if(connection)
    {
        var sql = 'UPDATE oportunidades SET nombre = ' + connection.escape(oportData.nombre) + ',' +
        'descripcion = ' + connection.escape(oportData.descripcion) + ',' +
        'valor = ' + connection.escape(oportData.valor) + ',' +
        'responsable = ' + connection.escape(oportData.responsable) +',' +
        'origen = ' + connection.escape(oportData.origen) +',' + 
        'estado = ' + connection.escape(oportData.estado) +  

        'WHERE id = ' + oportData.id;

 
        connection.query(sql, function(error, result) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg":"success"});
            }
        });
    }
}//////////////////////////////////////////////////////


//actualizar una oportunidad///////OOOJOOOOO//////////
userModel.updateProyecto = function(projData, callback)
{
    //console.log(oportData); return;
    if(connection)
    {
        var sql = 'UPDATE proyectos SET nombreP = ' + connection.escape(projData.nombreP) + 
        ',' +
        'descripcionP = ' + connection.escape(projData.descripcionP) + ',' +
        'ratingP= ' + connection.escape(projData.ratingP) + ',' +
        'referidoP = ' + connection.escape(projData.referidoP) +',' +
        'responsableP = ' + connection.escape(projData.responsableP) +',' + 
        'statusP = ' + connection.escape(projData.statusP) +',' +
        'fechaP = ' + connection.escape(projData.fechaP) + 

        'WHERE id = ' + projData.id;

 
        connection.query(sql, function(error, result) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg":"success"});
            }
        });
    }
}
  
//eliminar un usuario pasando la id a eliminar
userModel.deleteUser = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM users WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result) 
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
}

//eliminar oportunidad pasando la id a eliminar
userModel.deleteOportunidad = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM oportunidades WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM oportunidades WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result) 
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
 
}
//eliminar proyecto pasando la id 
userModel.deleteProyecto = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM proyectos WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) 
        {
            //si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM proyectos WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result) 
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
 
}
//CUmpleaneros del dia de hou
userModel.getCumpleHoy = function(callback)
{
    if (connection) 
    {
        connection.query('SELECT *, DATE_FORMAT(dob,"%d %b %y") as fecha  FROM `users` WHERE  DAYOFYEAR(curdate()) <= dayofyear(`dob`) AND DAYOFYEAR(curdate()) +0 >= dayofyear(`dob`) LIMIT 30; SELECT *, DATE_FORMAT(dob,"%d %b %y") as fecha  FROM `users` WHERE  DAYOFYEAR(curdate()) <= dayofyear(`dob`) AND DAYOFYEAR(curdate()) +7 >= dayofyear(`dob`) LIMIT 30 ; SELECT *, DATE_FORMAT(dob,"%d %b %y") as fecha  FROM `users` WHERE  DAYOFYEAR(curdate()) <= dayofyear(`dob`) AND DAYOFYEAR(curdate()) +15 >= dayofyear(`dob`) LIMIT 30 ; SELECT *, DATE_FORMAT(dob,"%d %b %y") as fecha  FROM `users` WHERE  DAYOFYEAR(curdate()) <= dayofyear(`dob`) AND DAYOFYEAR(curdate()) +30 >= dayofyear(`dob`) LIMIT 30', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

userModel.getActividad = function(callback)
{
    if (connection) 
    {
        connection.query('SELECT * , DATE_FORMAT(fecha,"%d/%b/%Y") as fecha  FROM `actividad` WHERE user = "'+usuario+'" ORDER BY id  DESC LIMIT 5' , function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

userModel.insertActividad = function(callback)
{
    if (connection) 
    {
        var query = connection.query('INSERT INTO actividad SET ?, fecha = NOW()' , actData, function(error, result) 
        {
            if(error)
            {
                throw error;
                console.log(query);
            }
            else
            {
                //devolvemos la última id insertada
                // callback(null,{"insertId" : result.insertId});
            }
        });
    }
}
userModel.forTodaysProj= function(callback)
{
    if (connection) 
    {
        var query = connection.query('select proyectos.nombreP, DATE_FORMAT(proyectos.fechaP,"%d %b %y") as fecha from proyectos  where proyectos.fechaP = curdate() and proyectos.usuario = "'+usuario+'" '  , function(error, rows) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}
userModel.forTodaysOpt= function(callback)
{
    if (connection) 
    {
        var query = connection.query('select oportunidades.nombre, DATE_FORMAT(oportunidades.fechalimite,"%d %b %y") as fecha from oportunidades  where oportunidades.fechalimite = curdate() and oportunidades.usuario = "'+usuario+'" '  , function(error, rows) 
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = userModel;