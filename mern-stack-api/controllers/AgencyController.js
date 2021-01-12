const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { Agency } = require('../models/Agency')


router.get('/', (req, res) => {
    console.log('tesssssssssssssssss')
    Agency.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    console.log('tete');
    var timestamp = new Date().getTime();
    var newRecord = new Agency({
        title: req.body.title,
        message: req.body.message,
        name: req.body.name,
        address: req.body.address,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        phone: req.body.phone,
        created_at: timestamp
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message,
        name: req.body.name,
        address: req.body.address,
        wilaya: req.body.wilaya,
        commune: req.body.commune,
        phone: req.body.phone,
        created_at: req.body.created_at
    }

    Agency.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    Agency.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})


module.exports = router