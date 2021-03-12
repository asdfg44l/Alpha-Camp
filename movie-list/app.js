const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

//movie list
const moiveList = require('./movies.json').results

//port
const PORT = 8080

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//public
app.use(express.static('public'))

//route
app.get('/', (req, res) => {
  res.render('index', { movies: moiveList })
})

app.get('/movies/:movie_id', (req, res) => {
  const movie_id = req.params.movie_id
  const movie = moiveList.find(movie => movie.id === Number(movie_id))
  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = moiveList.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword })
})

//listen
app.listen(PORT)