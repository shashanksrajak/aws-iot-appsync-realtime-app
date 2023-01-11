// Required Modules
const awsIot = require('aws-iot-device-sdk'); // aws iot device sdk to connect and publish to AWS IoT Core
require('dotenv').config() // to load config values from .env file

console.log("Starting IoT Device...")

// Setting up aws IoT Connection
const device = awsIot.device({
    clientId: 'SimulatorPublish',
    keyPath: './secrets/private.pem.key',
    certPath: './secrets/certificate.pem.crt',
    caPath: './secrets/AmazonRootCA1.pem',
    host: process.env.IOT_ENDPOINT,
});

const sensorData = {
    sensorName: "temperature_sensor",
    sensorId: "sensor_1",
    temperature: 18,
    unit: "celcius",
    timestamp: new Date(),
    nickname: "Living Room"
}

device
    .on('connect', function () {
        console.log('device connected');
        device.subscribe(`from_sensor/+/temp_update`);
        device.publish(`from_sensor/sensor_1/temp_update`, JSON.stringify(sensorData));
    });

device
    .on('message', function (topic, payload) {
        console.log('message', topic, payload.toString());
    });

device
    .on('error', function (error) {
        console.log('error', error);
    });


