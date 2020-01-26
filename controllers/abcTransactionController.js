var model = require('../database/models/index');
var abcTransactionController = {};

abcTransactionController.findAll = function(req, res){
	model.ABCTransaction.findAll({})
        .then(abcTransactions => res.json({
            error: false,
            data: abcTransactions
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};
abcTransactionController.findAllByUserID = function(req, res){
    console.log('Returning transaction history made by the user...');
    const abcuser_id = req.params.id;
    model.ABCTransaction.findAll({
            where: {
                user_id: abcuser_id 
            }
        })
        .then(abcTransactions => res.json({
            error: false,
            data: abcTransactions
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};
abcTransactionController.findOne = function(req, res){
    const abcTransaction_id = req.params.id;
    model.ABCTransaction.findOne({
            where: {
                id: abcTransaction_id
            }
        })
        .then(abcTransaction => res.json({
            error: false,
            data: abcTransaction
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};
abcTransactionController.findOneByName = function(req, res){
    const abcTransaction_name = req.params.name;
    model.ABCTransaction.findOne({
            where: {
                name: abcTransaction_name
            }
        })
        .then(abcTransaction => res.json({
            error: false,
            data: abcTransaction
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};
abcTransactionController.create = function(req, res){
	const {bikewayContent,name,link,userId} = req.body;
    model.ABCTransaction.create({
            bikewayContent: bikewayContent,
            name: name,
            link: link,
            userId:userId
        })
        .then(abcTransaction => res.status(201).json({
            error: false,
            data: abcTransaction,
            message: 'New abcTransaction has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
};
abcTransactionController.update = function(req, res){
	const abcTransaction_id = req.params.id;
    const {bikewayContent,name,link,userId} = req.body;
    model.ABCTransaction.update({
            bikewayContent: bikewayContent,
            name: name,
            link: link,
            userId:userId
        }, {
            where: {
                id: abcTransaction_id
            }
        })
        .then(abcTransaction => res.json({
            error: false,
            message: 'abcTransaction has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};
abcTransactionController.destroy = function(req, res){
	const abcTransaction_id = req.params.id;
    model.ABCTransaction.destroy({ where: {
        id: abcTransaction_id
    }})
        .then(status => res.json({
            error: false,
            message: 'abcTransaction has been deleted.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
};

module.exports = abcTransactionController;