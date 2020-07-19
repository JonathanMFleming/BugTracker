const router = require('express').Router();
let Projects = require('../models/project.model');

router.route('/').get((req, res) => {
  Projects.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/titles').get((req, res) => {
  Projects.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log(req.body)
  const title = req.body.title;
  const bugs = req.body.bugs;
  

  const newProject = new Projects({title,bugs});

  newProject.save()
    .then(() => res.json('Projects added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;