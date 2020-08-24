import express from 'express';

const app = express();

app.use('/', (request, response) => {
    return response.json({ msg: 'Hello World' });
})

app.listen(3333);