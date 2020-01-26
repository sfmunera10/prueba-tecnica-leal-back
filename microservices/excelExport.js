const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('../database/models/index');
const Excel = require('exceljs');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const heroesService = 'http://localhost:8081';

const threats = [
  {
      id: 1,
      displayName: 'Pisa tower is about to collapse.',
      necessaryPowers: ['flying'],
      img: 'tower.jpg',
      assignedHero: 0
  },
  {
      id: 2,
      displayName: 'Engineer is going to clean up server-room.',
      necessaryPowers: ['teleporting'],
      img: 'mess.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'John will not understand the joke',
      necessaryPowers: ['clairvoyance'],
      img: 'joke.jpg',
      assignedHero: 0
  }
];

app.get('/transactions/excel-export/:user_id',(req, res) => {
  console.log('Exporting excel sheet with the relevant transaction info from the user...');
  const abcuserid = req.params.user_id;
  models.ABCUser.findOne({
      where: {
        user_id: abcuserid
      },
      attributes: ['name','lastname','birth_date','email'],
      include: [{
        model: models.ABCTransaction,
        attributes: ['transaction_id','created_date','value','points','status']
      }]
    })
    .then(abcUsers => {
      let info = abcUsers.toJSON().ABCTransactions;
      console.log(info);
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
          { header: 'Id', key: 'id', width: 10 },
          { header: 'Name', key: 'name', width: 32 },
          { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date(2016, 0, 1)] }
      ];
      worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
      worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
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

app.get('/threats', (req, res) => {
  console.log('Returning threats list');
  res.send(threats);
});

console.log(`Threats service listening on port ${port}`);
app.listen(port);