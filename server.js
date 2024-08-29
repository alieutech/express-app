const express = require('express');
const app = express();
const PORT = process.env.PORT || 3330


// build in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))
// build in middleware for JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello Alieu");
})

// to get the route
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));

// error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(404).send('Sorry something when wrong.')
})

app.listen(PORT, () => console.log(`Server is running on port localhost:${PORT}`))
