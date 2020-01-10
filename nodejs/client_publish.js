// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('ws://my_ip_mqtt_broker_mosca:1884')
var topic = 'leads/processing/2'
var message = 'Hello World!'
let count = 1

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message)
        console.log('Message sent!', count)
        count++;
    }, 5000)
})
