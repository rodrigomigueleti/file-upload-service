var express = require('express');
var cors = require('cors');
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, 'sample.env') });
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/myEnv", function (req, res) {
	res.json({port: process.env.PORT});
});

app.post("/api/fileanalyse", upload.single('upfile'), function (req, res, next) {
	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
