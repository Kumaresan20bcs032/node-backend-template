import express from 'express'
import clc from 'cli-color'

const userRouter = express.Router()

//USER ROUTES

userRouter.get('/', (req, res) => {
    console.log(clc.yellowBright.bold.italic('req host:',req.hostname))
    console.log(clc.greenBright.bold.italic('req ip:',req.ip))
    console.log('req method:',req.method)
    console.log('req url:',req.url)
    console.log('req origin-url:',req.originalUrl)
    console.log('req protocol:',req.protocol)
    console.log('req user-agent:',req.get('User-Agent'))
    console.log('req origin:',req.headers.host)
    console.log('subdomaint:',req.subdomains)
    console.log(req.xhr)
    console.log(req.secure)
    // const connection={
    //     remoteAddress: req.connection.remoteAddress,
    //     remotePort: req.connection.remotePort,
    //     localAddress: req.connection.localAddress,
    //     localPort: req.connection.localPort
    // }
    // const t={
    //     httpVersion: req.httpVersion,
    //     httpVersionMajor: req.httpVersionMajor,
    //     httpVersionMinor: req.httpVersionMinor,
    //     // httpVersionString: req.httpVersionString
    // }
    // console.log(t)
    // console.log(connection)
    res.json({ 'statusCode': 200, 'status': true, 'message': 'User Routes Working'})
})

export default userRouter
