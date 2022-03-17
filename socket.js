const webSocket = require('ws')

let sockets=[]
module.exports = (server)=>{
    const wss = new webSocket.Server({server})

    wss.on('connection',(ws,req)=>{
        ws.id = req.headers['sec-websocket-key']
        sockets.push(ws)
        console.log(req.connection.remoteAddress)

       
        ws.on('close',(code,reason)=>{
            console.log('Off')
            sockets = sockets.filter(v=>{
                return ws.id !== v.id
            })
            console.log(sockets.length)
        })

        ws.on('message',(response)=>{
            let obj = JSON.parse(response.toString('utf-8'))
            let {type,data}=obj
    
            switch(type){
                case 'send_msg':
                    sockets.forEach(v=>{
                        v.send(JSON.stringify(data))
                    })
                break;
            }
        })
    })

    
}