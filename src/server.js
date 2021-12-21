import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

//global middlewares
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
 
//middleware 
const dontLog = (req, res, next) =>{
    console.log ('Not logging')
    next()
}

const log = (req, res, next) =>{
    console.log ('logging')
    next()
}
//controller function including the middleware
app.get('/users', [dontLog, log, dontLog], (req, res) => {
 res.send({message: 'hello', person: "tosin" })
})
//controller function exclduing middleware
app.post('/', (req, res)=>{
  console.log(req.body)
  res.send({message: 'ok'})
})

//function to start server
export const start = () => {
    app.listen(3000, ()=>{
        console.log('server is running on 3000')
    })
}
