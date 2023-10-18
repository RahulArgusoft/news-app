const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
app.use(cors())

// require('./src/cron-job/news-categories')
// require('./src/cron-job/news')

const userRouter = require('./src/routes/user')
const globalNewsRouter = require('./src/routes/global-news')
const categoryRouter = require('./src/routes/category')

const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
    res.send('working...')
})

app.use('/users', userRouter)
app.use('/global-news', globalNewsRouter)
app.use('/category', categoryRouter)

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})