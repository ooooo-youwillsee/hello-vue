const Koa = require('koa'), KoaRouter = require('koa-router'), websockify = require('koa-websocket')

const app = websockify(new Koa())
const apiRouter = new KoaRouter(), wsRouter = new KoaRouter()

const jsonMid = () => {
  function render(json) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
  }

  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}

app.use(jsonMid())

let i = 0
apiRouter.all('/user/list', async ctx => {
  console.log('request -- ', i++)
  ctx.send(
    {
      message: 'ok',
      code: 200,
      data: [
        { id: 111, name: 'tom', age: 18 },
        { id: 222, name: 'jerry', age: 20 }
      ]
    }
  )
})

const wsMap = new Map()

wsRouter.all('/ws/message/:id', async ctx => {
  const { id } = ctx.params, ws = ctx.websocket
  wsMap.set(id, ws)

  ws.send(`服务端收到连接，客户端 Id: ${id}`)
  ws.on('message', message => {
    console.log(`服务端收到数据： ${message}`)
    ws.send(`${message} - server`)
  })

  setInterval(() => {wsMap.get('1') && wsMap.get('1').send('11111111111')}, 3 * 1000)
})

app.ws.use(wsRouter.routes())
app.use(apiRouter.routes())

app.listen(3000, () => {
  console.log('server start -> http://localhost:3000')
  console.log('api -> http://localhost:3000/user/list')
  console.log('ws -> ws://localhost:3000/ws/message/:id')
})
