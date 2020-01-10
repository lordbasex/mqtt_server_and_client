// Constants
const MYSQL_HOST = process.env.MYSQL_HOST || '192.168.1.10'
const MYSQL_PORT = process.env.MYSQL_PORT || '3306'
const MYSQL_USER = process.env.MYSQL_USER || 'test'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'test1234'
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'isurveyx'
const LOG = process.env.LOG || false

// Mosca MQTT broker
var mosca = require('mosca')

var settings = {
  http: {
    port: 1884,
    bundle: true,
    static: './'
  }
}

var broker = new mosca.Server(settings)

// MySQL
var mysql = require('mysql')
var db = mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    pass: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
})
db.connect(()=>{
    console.log('Database connected!')
})

broker.on('ready', setup)

function setup() {
  console.log('Mosca server is up and running')
}

broker.on('clientConnected', function(client) {
  console.log('client connected', client.id)
})

broker.on('published', (packet)=>{
  message = packet.payload.toString()
  console.log(message)
})
