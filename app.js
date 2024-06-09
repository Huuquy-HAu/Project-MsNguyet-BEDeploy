require('dotenv').config();
const express = require('express');
const { startup } = require('./startup');
const path = require('path');
const cors = require('cors');
const app = express();
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/publics', express.static(path.join(__dirname, './publics')));
app.use(express.static('./build'));
app.use(limiter)

startup(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log('port', process.env.PORT);
})