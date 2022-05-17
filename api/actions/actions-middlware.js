// add middlewares here related to actions
const Actions = require('../actions/actions-model');

function validateId(req, res, next) {
    Actions.get(req.params.id)
        .then(act => {
            if(act) {
                req.existingAct = act;
                next();
            } else {
                res.status(400).json({
                    message: 'action not found'
                })
            }
        })
} 

function validateAction(req, res, next) {
    console.log(req.body)
    console .log(`description: ${req.body.notes == 'string'}`)
    if(typeof req.body.description != 'string'
        || req.body.description == ''
        || req.body.notes == ''
        || typeof req.body.completed != 'boolean'
        || typeof req.body.project_id != 'number'
        || req.body.project_id == '' ) {
            res.status(400).json({
                message: 'missing require fields'
            })
        }
        req.actions = { 
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        next();
}

module.exports = {
    validateId,
    validateAction
}