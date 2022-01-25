const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Solicitud = require('../model/solicitud');

router.get('/solicitudservicio', async (req, res) => {
  const solicitud = await Solicitud.find();
  res.render('solicitudServicio', {
    solicitud
  });
});

router.get('/avanceservicio', async (req, res) => {
  const solicitud = await Solicitud.find();
  res.render('avanceServicio', {
    solicitud
  });
});

router.get('/', async (req, res) => {
  const solicitud = await Solicitud.find();
  res.render('index', {
    solicitud
  });
});

router.post('/add', async (req, res, next) => {
  const solicitud = new Solicitud(req.body);
  await solicitud.save();
  res.redirect('/solicitudservicio');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const solicitud = await Solicitud.findById(id);
  solicitud.status = !solicitud.status;
  await solicitud.save();
  res.redirect('/avanceservicio');
});


router.get('/edit/:id', async (req, res, next) => {
  const solicitud = await Solicitud.findById(req.params.id);
  console.log(solicitud)
  res.render('edit', { solicitud });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Solicitud.updateOne({_id: id}, req.body);
  res.redirect('/avanceservicio');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Solicitud.remove({_id: id});
  res.redirect('/avanceservicio');
});

module.exports = router;
