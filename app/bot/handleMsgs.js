var request = require('request');
var Client = require('node-rest-client').Client;
var client = new Client();

const PAGE_ACCESS_TOKEN = 'EAAc307m3bcsBAHJMJVTzqo63OeQTJoN2hE7s3TDucmDVUqvRZCzjK3FbYrmZBqqHZAA1DDWMB2XxL1PW724JLOb9tIBGCJZBUwlW1VmUFz3ZAWfLjp4aF4mdXTveJjFs8W74IdPZCFFJ4WFoeYVik3Jq50FIGUITsk2LZC61N8NKcZCVDqnNwEBL';

var handleMessage = function (sender_psid, received_message) {

    var response;
    console.log("=======received_message=======");
    console.log(received_message);


    // Check if the message contains text
    if (received_message.quick_reply) {
        if(received_message.quick_reply.payload === 'PHONE_PAYLOAD') {
            getBrandPhones(received_message.text, sender_psid);
        }
    } else {
        // Create the payload for a basic text message
        response = getResponse(received_message.text);
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}

var handlePostback = function (sender_psid, received_postback) {
    var response;

    // Get the payload for the postback
    var payload = received_postback.payload;
    var title = received_postback.title;
    console.log("=======received_postback=======");
    console.log(received_postback);
    // Set the response based on the postback payload
    if (payload === 'PHONE_PAYLOAD') {
        response = getBrandPhones(title);
    } else {
        response = getResponse(title);
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

var callSendAPI = function(sender_psid, response) {
    // Construct the message body
    var request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, function(err, res, body) {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

var getResponse = function(text) {
    var response;
    console.log("==========");
    console.log(text);
    if(text === 'Start Shopping'){
        response = {
            "text": "Thats Awesome! Here are the different brands we offer :",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"APPLE",
                    "payload":"PHONE_PAYLOAD",
                },
                {
                    "content_type":"text",
                    "title":"BLACKBERRY",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"GOOGLE",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"HTC",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"MOTOROLLA",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"SAMSUNG",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"SONY",
                    "payload":"PHONE_PAYLOAD"
                }
            ]
        }
    } else {
        response = {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements":[
                        {
                            "title":"Welcome to Gadgets application",
                            "image_url":"https://gadgets-bot.herokuapp.com/public/images/phones3.png",
                            "subtitle":"At this point we support only phones. We\'ve got the right phone for everyone.",
                            "buttons":[
                                {
                                    "type":"web_url",
                                    "url":"https://gadgets-bot.herokuapp.com",
                                    "title":"View Website"
                                },{
                                    "type":"postback",
                                    "title":"Start Shopping",
                                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }

    return response;
}

var getBrandPhones = function(title, sender_psid) {
    var selectedPhones = [];

    // registering remote methods
    client.registerMethod("jsonMethod", "https://gadgets-bot.herokuapp.com/api/getPhones", "GET");

    client.methods.jsonMethod(function (data, response) {
        data.forEach(function(phone){
            if(phone.brand === title){
                console.log("===========Phone========");
                console.log(phone.phone);
                console.log("===================");
                var obj = {
                    "title":phone.brand + ' ' + phone.phone,
                    "image_url":"https://gadgets-bot.herokuapp.com/public/images/" + phone.image,
                    "subtitle":"Price : $" + phone.price,
                    "buttons":[
                        {
                            "type":"postback",
                            "title":"View Details",
                            "payload":"DEVELOPER_DEFINED_PAYLOAD"
                        },{
                            "type":"postback",
                            "title":"Buy",
                            "payload":"DEVELOPER_DEFINED_PAYLOAD"
                        }
                    ]
                }

                selectedPhones.push(obj);
            }
        });

        console.log("=============selectedPhones start================");
        console.log(selectedPhones);
        console.log("=============selectedPhones end================");

        var res = {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements": selectedPhones
                }
            }
        }

        var request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": res
        };

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, function(err, res, body) {
            if (!err) {
                console.log('message sent!')
            } else {
                console.error("Unable to send message:" + err);
            }
        });

    });
}

module.exports = {
    handleMessage : handleMessage,
    handlePostback : handlePostback,
    callSendAPI : callSendAPI
}