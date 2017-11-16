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
            console.log("Inside quick");
            response = getBrandPhones(title);
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
                    "title":"Apple",
                    "payload":"PHONE_PAYLOAD",
                },
                {
                    "content_type":"text",
                    "title":"Blackberry",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Google",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"HTC",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Motorolla",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Samsung",
                    "payload":"PHONE_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Sony",
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

var getBrandPhones = function(title) {
    console.log("=======Inside Get Brand Phones function======");


    // direct way
    client.get("http://remote.site/rest/xml/method", function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
        console.log("=======GET RESPONSE DIRECT======");
    });

    // registering remote methods
    client.registerMethod("jsonMethod", "https://gadgets-bot.herokuapp.com/api/getPhones", "GET");

    client.methods.jsonMethod(function (data, response) {
        // parsed response body as js object
        console.log("=======GET RESPONSE======");
        console.log(data);
        console.log("=======GET DATA END======");
        // raw response
        console.log(response);
        console.log("=======GET RESPONSE END======");
    });
}

module.exports = {
    handleMessage : handleMessage,
    handlePostback : handlePostback,
    callSendAPI : callSendAPI
}