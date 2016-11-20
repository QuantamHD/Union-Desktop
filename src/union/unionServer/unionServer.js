var Paho = require('paho-client/src/mqttws31.js');

var _client = undefined;
var _onConnectionFunctions = undefined;
var _messageArrivedFunctions = undefined;
var _onDisconnectFunctions = undefined;
var _delayedTask = undefined;
var _isConnected = false;

export default class {
    constructor(){
        if(_client === undefined){
            _client = _createClient(); 
            _client.onConnectionLost = _onConnectionLost;
            _client.onMessageArrived = _onMessageArrived;
        
            _client.connect({onSuccess:_onConnect});

            _onConnectionFunctions = [];
            _messageArrivedFunctions = [];
            _onDisconnectFunctions = [];
            _delayedTask = [];
        }
    }

    addEventListenerConnected(eventFunction){
        _onConnectionFunctions.push(eventFunction);
    }

    addEventListenerMessageArrived(eventFunction){
        _messageArrivedFunctions.push(eventFunction);
    }

    addEventListenerDisconnected(eventFunction){
        _onDisconnectFunctions.push(eventFunction);
    }

    subscribe(topic){
        var params = {
            "topic": topic
        };
        _subscribeAPI(params);
    }

    sendMessage(message, destinationName){
        var parameters = {
            "message": message,
            "destinationName": destinationName
        };
        _sendMessageAPI(parameters);
    }
}

function _subscribeAPI(subscribeArguments){
    if(!_isConnected){
        _delayedTask.push({
            "functionParams": subscribeArguments,
            "callBack": _subscribeAPI
        });
    } else {
        _client.subscribe(subscribeArguments.topic);
    }
}

/**
 * This exists so that I can accept parameters as an array.
 */
function _sendMessageAPI(messageArguments){

    if(!_isConnected){
        _delayedTask.push({
            "functionParams": messageArguments,
            "callBack": _sendMessageAPI
        });
    } else {
        var message = new Paho.MQTT.Message(messageArguments.message);
        message.destinationName = messageArguments.destinationName;
        _client.send(message);
    }
}

function _completeDelayedTasks(){
    for(var i = 0; i < _delayedTask.length; i++){
        var delayTask = _delayedTask[i];
        delayTask.callBack(delayTask.functionParams);
    }
}

function _onConnect(){
    _isConnected = true;
    console.log("Connected");
    for(var i = 0; i < _onConnectionFunctions.length; i++){
        _onConnectionFunctions[i]();
    }
    _completeDelayedTasks();
}

function _onConnectionLost(responseObject){
    _isConnected = false;
    console.log("Not Connected" + responseObject.errorMessage);
    for(var i = 0; i < _onDisconnectFunctions.length; i++){
        _onDisconnectFunctions[i](responseObject);
    }
    _reconnect(5);
}

function _onMessageArrived(message){
    for(var i = 0; i < _messageArrivedFunctions.length; i++){
        _messageArrivedFunctions[i](message);
    }
}

function _createClient(){
    var mqttClient = new Paho.MQTT.Client("192.168.134.129", 8083, "ethan");
    return mqttClient;
}

function _reconnect(tries){
    for(var i = tries; i >= 0; i--){
        _client.connect({onSuccess:_onConnect});
    }
}