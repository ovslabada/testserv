const express = require('express')
const fs = require('fs') // библиотека node работает с файловой системой
const bodyParser = require('body-parser') // распарсивает тело запроса

const app = express() // объект сервера
const port = 3001   

app.use(express.static('public')); // всю статику будут брать отсюда. руками создать папку

const jsonParser = bodyParser.json() // создали функцию, которая будет распарсивать json

/* app.get('/', (req, res) => { // методы, которым мы передаем функции, которые будут обрабатывать конкреьные запросы. тут запро на адресс / - в корень. как будет обрабатываться запрос в корень, отправленный методом get
  res.send('Hello World!')
}) 
Мы закомментили, потому что index в статике
*/

/* app.get('/catalog', (req, res) => {
  res.send('Hello Catalog!')
}) */

app.get('/catalog', (req, res) => { // страница, на которой это показывается
  fs.readFile('./data/catalog.json', 'utf8', (err, data) => { // первый парамерт - файл, третий - данные из этого файла
    res.send(data);
  })
})

app.put('/catalog', jsonParser , (req, res) => {
  fs.readFile('./data/catalog.json', 'utf8', (err, data) => {
    catalog = JSON.parse(data);
    const newcatalog = req.body;
    fs.writeFile('./data/catalog.json', JSON.stringify(newcatalog),
    () => {
      res.end();
    })
  });
})

app.post('/cart', jsonParser , (req, res) => {
  fs.readFile('./data/cart.json', 'utf8', (err, data) => { // первый парамерт - файл, третий - данные из этого файла
    const cart = JSON.parse(data); // мы прочитали и преобразовали все, что было в json кархины. и сохранили это в массив карзины
    if (req.body.quantity > 0) {
      cart.push(req.body); // теперь мы добавили в эту же карзину тело запроса. тот самый good
    }

    fs.writeFile('./data/cart.json', JSON.stringify(cart), () => { // преобразовываем обратно cart в json и записываем его в файл
      res.end(); // ответ браузеру, что всё ок
    })
  });
})

app.put('/cart', jsonParser , (req, res) => {
  fs.readFile('./data/cart.json', 'utf8', (err, data) => {
    cart = JSON.parse(data);
    const newcart = req.body;
    fs.writeFile('./data/cart.json', JSON.stringify(newcart),
    () => {
      res.end();
    })
  });
})

app.get('/cart', (req, res) => {
  fs.readFile('./data/cart.json', 'utf8', (err, data) => { // первый парамерт - файл, третий - данные из этого файла
    res.send(data);
  });
}) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
