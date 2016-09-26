// Remember to use strict
'use strict';


var express = require('express');

var router = express.Router(); //We create a router object to create GET,POST,PUT,DELETE

var Paciente = require('./models/paciente');
var Terapia = require('./models/terapia');

router.use(function(req, res, next){

  console.log('something is happening.');
  next();
});

router.route('/pacientes')

  .post(function(req, res){
      var paciente = new Paciente();
      paciente.nombre = req.body.nombre;
      paciente.nickname = req.body.nickname;
      paciente.edad = req.body.edad;

      paciente.sexo = req.body.sexo;
      paciente.ingreso = req.body.ingreso;
      paciente.estatus = req.body.estatus;
      paciente.padecimiento = req.body.padecimiento;
      paciente.tiempoDeTerEnDias = req.body.tiempoDeTerEnDias;

      //Guardamos al paciente
      paciente.save(function(err){
        //Si existe un error, mandamos el error en la respuesta
        if(err) res.send(err);

        res.json({ message: 'Paciente creado!', paciente });
      });
  })

  .get(function(req, res){
      Paciente.find(function(err, pacientes){
        if(err) res.send(err);

        res.json(pacientes);
      });
  });

router.route('/pacientes/:paciente_id')
  
    .get(function(req, res){
        Paciente.findById(req.params.paciente_id, function(err, paciente){
            if(err) res.send(err);
            res.json(paciente);
        });
    })
  
    .put(function(req, res){
        Paciente.findById(req.params.paciente_id, function(err, paciente){
          if(err) res.send(err);

          paciente.edad = req.body.edad;

          paciente.save(function(err){
            if(err) res.send(err);

            res.json({message: "Paciente modificado exitosamente." , paciente });
          });
        });
    })
    .delete(function(req, res){
        Paciente.remove({
          _id: req.params.paciente_id
        }, function(err, paciente){
          if (err) res.send(err);

          res.json({ message: 'Borrado'});
        });
    });

  router.route('/terapias')
    .post(function(req, res){
        var terapia = new Terapia();
        terapia.practica = req.body.practica;
        terapia.tiempo = req.body.tiempo;
        terapia.ejeY = req.body.ejeY;
        terapia.ejeZ = req.body.ejeZ;
        terapia.musculo = req.body.musculo;
        terapia.fecha = req.body.fecha;
        terapia.paciente = req.body.paciente_id;
        terapia.save(function(err, terapia){
          if(err) res.send(err);

          res.json({message: 'terapia creada'})
        });
    })
    .get(function(req, res){
      Terapia.find(function(err, terapia){
        Paciente.populate(terapia, {path: "paciente"}, function(err, terapia){
          if(err) res.send(err);

          res.json({ terapia });
          });
      });
    });


// We export our module to use in the main app "app.js"
module.exports = router;
