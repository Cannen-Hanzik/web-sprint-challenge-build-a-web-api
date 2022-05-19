// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const {
    validateProjectId,
    projectValidator
} = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(arr => {
            res.status(200).json(arr)
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.existingProject)
})

router.post('/', (req,res) => {
    let { name, description } = req.body;
    let projectAdded= req.body;
    if(name && description) {
        Projects.insert(projectAdded)
            .then(project => {
                res.status(201).json(project)
            })
    } else {
        console.log(projectAdded)
        res.status(400).json({ message: 'Please provide a name and description' })
    }
});

router.put('/:id', validateProjectId, projectValidator, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(400).json({ message: 'missing name, description or completed'})
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.existingProject.id)
        .then(() => {
            res.status(200).json(req.existingProject);
        })
        .catch(error => {
            res.status(404).json({ message: 'missing required id field'})
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(arrayOfActions => {
            res.status(200).json(arrayOfActions)
        })
        .catch(error => {
            res.status(404).json({ message: 'missing required id field' })
        })
})

module.exports = router