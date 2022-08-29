import express from 'express';
import cors from 'cors';

const app = express();

const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());

app.get('/tweets', (req, res) => {
    const lastTweets = [];

    if (tweets.length >= 10) {

        for ( let i = tweets.length - 10; i < tweets.length; i++) {

            const avatar = users.find( user => user.username === tweets[i].username);
    
            lastTweets.push({
                username: tweets[i].username,
                avatar: avatar.avatar,
                tweet: tweets[i].tweet,
            })
        }
    } else {

        for ( let i = 0; i < tweets.length; i++) {

            const avatar = users.find( user => user.username === tweets[i].username);
    
            lastTweets.push({
                username: tweets[i].username,
                avatar: avatar.avatar,
                tweet: tweets[i].tweet,
            })
        }
    }

    

    res.send(lastTweets);
});

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar) {
        return res.status(422).send('You must fill in all of the fields');
    }

    users.push({
        username: username,
        avatar: avatar
    });

    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;

    if(!tweet) {
        return res.status(422).send('You must fill this field');
    }

    tweets.push({
        username,
        tweet
    });
    res.send('OK');
});

app.listen(5000, () => {
    console.log('Server on');
});