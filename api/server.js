// BUILD YOUR SERVER HERE

const express = require('express');
const db = require('./users/model');


const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        });
    } else {
        db.insert(newUser)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database",
                    err: err.message
                });
            });
    }
});

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved", 
                err: err.message
            });
        });
});


server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                });
            }
            else {
                res.json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved",
                err: err.message
            });
        });    
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                });
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
                err: err.message
            });
        });
});    

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if(!changes.name || !changes.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        });
    } else {
        db.update(id, changes)
            .then(user => {
                if(!user) {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist"
                    });
                } else {
                    res.json(user);
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "The user information could not be modified",
                    err: err.message
                });
            });
    }
});

server.use('*', (req, res) => {
    console.log('getting all users');
    res.status(404).json({
        message: 'not found'
    });
});



module.exports = server; // EXPORT YOUR SERVER instead of {}
