const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('../database/models/index');
const authMiddleware = require('../middleware/auth');
const Excel = require('exceljs');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

app.get('/transactions/excel-export',authMiddleware.ensureAuthenticated,(req, res) => {
  console.log('Exporting excel sheet with the relevant transaction info from the user...');
  models.ABCUser.findOne({
      where: {
        user_id: req.user
      },
      attributes: ['name','lastname','birth_date','email'],
      include: [{
        model: models.ABCTransaction,
        attributes: ['transaction_id','created_date','value','points','status']
      }]
    })
    .then(abcUsers => {
      let info = abcUsers.toJSON();
      var workbook = new Excel.Workbook();
      workbook.creator = 'Me';
      workbook.lastModifiedBy = 'Me';
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();
      workbook.properties.date1904 = true;
      workbook.views = [
        {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
      ];  
      var worksheet = workbook.addWorksheet('My Sheet');
      worksheet.columns = [
          { header: 'Name', key: 'name', width: 15 },
          { header: 'Lastname', key: 'lastname', width: 32 },
          { header: 'Birth date', key: 'birthdate', width: 15, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] },
          { header: 'Email', key: 'email', width: 32},
          { header: 'Transaction_id', key: 'transactionid', width: 15},
          { header: 'Created At', key: 'createdat', width: 15, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1,[12,7,3,5])] },
          { header: 'Value', key: 'value', width: 15},
          { header: 'Points', key: 'points', width: 15},
          { header: 'Status', key: 'status', width: 15}
      ];
      worksheet.addRow({name:info.name,lastname:info.lastname,birthdate:info.birth_date,email:info.email,
      transactionid:info.ABCTransactions[0].transaction_id,createdat:info.ABCTransactions[0].created_date,
      value:info.ABCTransactions[0].value,points:info.ABCTransactions[0].points,status:info.ABCTransactions[0].status});
      for(let i = 1; i<info.ABCTransactions.length; i++){
        worksheet.addRow({name:'',lastname:'',birthdate:'',email:'',
        transactionid:info.ABCTransactions[i].transaction_id,createdat:info.ABCTransactions[i].created_date,
        value:info.ABCTransactions[i].value,points:info.ABCTransactions[i].points,status:info.ABCTransactions[i].status});
      }
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report-"+info.name+".xlsx");
      workbook.xlsx.write(res)
          .then(function (data) {
              res.end();
              console.log('File write done........');
          });
      })
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

//Manage CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

console.log(`Excel Export service listening on port ${port}`);
app.listen(port);