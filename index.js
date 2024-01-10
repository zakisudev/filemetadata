var express = require('express');
var cors = require('cors');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

// Error handler
app.use(function (err, req, res, next) {
  if (err) {
    res.json({ error: err.message });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
