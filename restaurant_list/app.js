const express = require('express')
const exphbs = require('express-handlebars')

//restaurant list
const restaurantList = require('./restaurant.json').results

//PORT
const PORT = 3000

//express app
const app = express()

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//public
app.use(express.static('public'))

//route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const selected_restaurant_id = req.params.id
  const restaurant = restaurantList.find(restaurant => restaurant.id === Number(selected_restaurant_id))
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.filter(restaurant => {
    return restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})

//listening
app.listen(PORT)
