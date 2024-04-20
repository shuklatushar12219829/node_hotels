const express = require('express')
const app = express()

const db=require('./db.js')

const bodyParser=require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('Welcome to the Hotel!!!!')
})

const personRoutes=require('./routes/personRoutes.js')
  app.use('/person',personRoutes);

const menuRoutes=require('./routes/menuRoutes.js');
app.use('/menuItem',menuRoutes);
app.listen(3000,()=>{
  console.log('listening on port 3000!')
})