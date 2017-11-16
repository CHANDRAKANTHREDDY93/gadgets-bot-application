var request = require('request');
const PAGE_ACCESS_TOKEN = 'EAAc307m3bcsBAHJMJVTzqo63OeQTJoN2hE7s3TDucmDVUqvRZCzjK3FbYrmZBqqHZAA1DDWMB2XxL1PW724JLOb9tIBGCJZBUwlW1VmUFz3ZAWfLjp4aF4mdXTveJjFs8W74IdPZCFFJ4WFoeYVik3Jq50FIGUITsk2LZC61N8NKcZCVDqnNwEBL';

var handleMessage = function (sender_psid, received_message) {

    var response;

    // Check if the message contains text
    if (received_message.text) {

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

    response = getResponse(title);
    // Set the response based on the postback payload
    // if (payload === 'yes') {
    //     response = { "text": "Thanks!" }
    // } else if (payload === 'no') {
    //     response = { "text": "Oops, try sending another image." }
    // }
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
            "text": "Thats Awesome! Here are the different brands of phones we offer :",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Apple",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD",
                },
                {
                    "content_type":"text",
                    "title":"Blackberry",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Google",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"HTC",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Motorolla",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Samsung",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Sony",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
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

module.exports = {
    handleMessage : handleMessage,
    handlePostback : handlePostback,
    callSendAPI : callSendAPI
}