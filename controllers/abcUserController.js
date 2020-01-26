var model = require('../database/models/index');
var abcUserController = {};

abcUserController.findAll = function(req, res){
	model.ABCUser.findAll({})
        .then(abcUsers => res.json({
            error: false,
            data: abcUsers
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};
abcUserController.findOne = function(req, res){
    const abcUser_id = req.params.id;
    model.ABCUser.findOne({
            where: {
                id: abcUser_id
            }
        })
        .then(abcUser => res.json({
            error: false,
            data: abcUser
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};
abcUserController.findOneByName = function(req, res){
    const abcUser_name = req.params.name;
    model.ABCUser.findOne({
            where: {
                name: abcUser_name
            }
        })
        .then(abcUser => res.json({
            error: false,
            data: abcUser
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};
abcUserController.create = function(req, res){
	const {name,lastName,citizenId,citizenIdType,age,cellphoneNumber,role,company} = req.body;
    model.ABCUser.create({
            name: name,
            lastName: lastName,
            citizenId: citizenId,
            citizenIdType: citizenIdType,
            age: age,
            cellphoneNumber: cellphoneNumber,
            role: role,
            company: company
        })
        .then(abcUser => res.status(201).json({
            error: false,
            data: abcUser,
            message: 'New abcUser has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};
abcUserController.update = function(req, res){
	const abcUser_id = req.params.id;
    const {name,lastName,citizenId,citizenIdType,age,cellphoneNumber,role,company} = req.body;
    model.ABCUser.update({
            name: name,
            lastName: lastName,
            citizenId: citizenId,
            citizenIdType: citizenIdType,
            age: age,
            cellphoneNumber: cellphoneNumber,
            role: role,
            company: company
        }, {
            where: {
                id: abcUser_id
            }
        })
        .then(abcUser => res.json({
            error: false,
            message: 'abcUser has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};
abcUserController.destroy = function(req, res){
	const abcUser_id = req.params.id;
    model.ABCUser.destroy({ where: {
        id: abcUser_id
    }})
        .then(status => res.json({
            error: false,
            message: 'abcUser has been deleted.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

module.exports = abcUserController;