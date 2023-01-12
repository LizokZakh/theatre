const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');

const fs = require('fs');
const e = require('express');

app.use(express.static('../'));
app.use(cors());
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    res.send(data);
  })
})

app.get('/ticketsInfo', (req, res) => {
  fs.readFile('./tickets.json', 'utf8', (err, data) => {
    res.send(data);
  })
})

app.get('/catalog', (req, res) => {
  fs.readFile('./catalog.json', 'utf8', (err, data) => {
    if (req.query?.dataName) {
      res.send(JSON.stringify(JSON.parse(data).find(x => x.dataName === req.query.dataName)))
    } else {
      res.send(data);
    }
  })
})

app.get('/buyTicket', (req, res) => {
  fs.readFile('./tickets.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"type": "reading tickets.json", "result": 1}')
    } else {
      const tickets = JSON.parse(data);
      const spectacleDataName = req.query.spectacleDataName;
      const userEmail = req.query.userEmail;
      const x = req.query.x;
      const y = req.query.y;
      if (tickets.find(ticket => ticket.x === x && ticket.y === y && ticket.spectacleDataName === spectacleDataName)) {
        res.send('{"type": "ticket was find","result": 1}')
      } else {
        tickets.push({ spectacleDataName, userEmail, x, y })
        fs.readFile('./catalog.json', 'utf8', (err, data) => {
          if (err) {
            res.send('{"type": "reading catalog.json","result": 1}')
          } else {
            const spectacles = JSON.parse(data);
            let finded = spectacles.find(spectacle => spectacle.dataName === spectacleDataName)
            finded.count--;
            let count = finded.count;
            fs.writeFile('./catalog.json', JSON.stringify(spectacles), (err) => {
              if (err) {
                res.send('{"type": "write catalog.json", "result": 1}')
                return;
              }
            })
            fs.writeFile('./tickets.json', JSON.stringify(tickets), (err) => {
              if (err) {
                res.send('{"type": "write tickets.json", "result": 1}')
                return;
              }
            })
            res.send(JSON.stringify({count}));
          }
        })
      }
    }
  })
})

app.get('/user', (req, res) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 1}')
    } else {
      const users = JSON.parse(data);
      const email = req.query.email;
      const password = req.query.password;

      // user.push(item);

      const userFind = users.find((user) => user.email === email && user.password === password);

      console.log(userFind, email, password);

      if (userFind == undefined) {
        res.send('{"result": 1}')
      } else {
        res.send(userFind)
      }

    }
  });
})

app.post('/addUser', (req, res) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{"result": 1}')
    } else {
      const user = JSON.parse(data);
      const item = req.body;

      user.push(item);
      fs.writeFile('./users.json', JSON.stringify(user), (err) => {
        if (err) {
          res.send('{"result": 1}')
        } else {
          res.send('{"result": 0}')
        }
      })
    }
  })
})

app.listen(3001, () => {
  console.log('server runnig on local:3001');
})
