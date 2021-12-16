const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

const cors = require('cors')
app.use(cors());

app.get('/', (req, res)=>{
    res.send('hello')
})


app.listen(port, () => {
  console.log('listening to port', port)
})
