const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
app.use(cors())

// this is mendatory to get the ip of client side
app.set('trust proxy', true)

// require('./src/cron-job/news-categories')
// require('./src/cron-job/news')

const userRouter = require('./src/routes/user')
const globalNewsRouter = require('./src/routes/global-news')
const categoryRouter = require('./src/routes/category')
const localTagsRouter = require('./src/routes/local-tags')
const localNewsRouter = require('./src/routes/local-news')
const commentsRouter = require('./src/routes/comments')

const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
    res.send('working...')
})

app.use('/users', userRouter)
app.use('/global-news', globalNewsRouter)
app.use('/category', categoryRouter)
app.use('/local-news', localNewsRouter)
app.use('/local-tags', localTagsRouter)
app.use('/comments', commentsRouter)

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})