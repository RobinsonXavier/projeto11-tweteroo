import express from 'express';
import cors from 'cors';

const app = express();

const users = [];

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar) {
        return res.status(422).send('You must fill in all of the fields');
    }

    users.push({
        username,
        avatar
    });

    res.send('OK')
});

app.listen(5000, () => {
    console.log('Server on');
});