var request = require('request');
var Client = require('node-rest-client').Client;
var client = new Client();

var phones = [];

var cartList = [];

var senderCartItems = [];


const PAGE_ACCESS_TOKEN = 'EAAc307m3bcsBAHJMJVTzqo63OeQTJoN2hE7s3TDucmDVUqvRZCzjK3FbYrmZBqqHZAA1DDWMB2XxL1PW724JLOb9tIBGCJZBUwlW1VmUFz3ZAWfLjp4aF4mdXTveJjFs8W74IdPZCFFJ4WFoeYVik3Jq50FIGUITsk2LZC61N8NKcZCVDqnNwEBL';

var handleMessage = function (sender_psid, received_message) {

    var response;

    // Check if the message contains text
    if (received_message.quick_reply) {
        if(received_message.quick_reply.payload === 'PHONE_PAYLOAD') {
            getBrandPhones(received_message.text, sender_psid);
        } else if(received_message.quick_reply.payload.includes('QUANTITY')) {
            var resQty = received_message.quick_reply.payload.split("_");
            var typeQty = resQty[0];
            var brandQty = resQty[1];
            var phoneQty = resQty[2];
            var priceQty = resQty[3];
            var imageQty = resQty[4];
            response = getSpecificPhone(typeQty, brandQty, phoneQty, priceQty, imageQty);

            senderCartItems = AddItemsToCartList(brandQty,phoneQty, priceQty, imageQty, parseInt(received_message.text),sender_psid);
        } else if(received_message.quick_reply.payload === 'DEVELOPER_DEFINED_PAYLOAD') {
            response = getResponse('Main Menu');
        } else if (received_message.quick_reply.payload == 'CART'){
            response = goToCart(senderCartItems);
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
    // Set the response based on the postback payload
    if (payload === 'PHONE_PAYLOAD') {
        response = getBrandPhones(title);
    } else if(payload.includes("VIEW-DETAILS") || payload.includes("BUY-PHONE")){
        var res = payload.split("_");
        var type = res[0];
        var brand = res[1];
        var phone = res[2];
        var price = res[3];
        var image = res[4];
        response = getSpecificPhone(type, brand, phone, price, image);
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
    if(text === 'Start Shopping' || text === 'Main Menu'){
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

        phones = data;


        data.forEach(function(phone){
            if(phone.brand === title){
                var obj = {
                    "title":phone.brand + ' ' + phone.phone,
                    "image_url":"https://gadgets-bot.herokuapp.com/public/images/" + phone.image,
                    "subtitle":"Price : $" + phone.price,
                    "buttons":[
                        {
                            "type":"postback",
                            "title":"Add to Cart",
                            "payload":"BUY-PHONE_"+phone.brand + '_' + phone.phone + '_' + phone.price + '_' + phone.image
                        },
                        {
                            "type":"postback",
                            "title":"Main Menu",
                            "payload":"DEVELOPER_DEFINED_PAYLOAD"
                        }
                    ]
                }

                selectedPhones.push(obj);
            }
        });

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

var getSpecificPhone = function(type, brand, phone, price, image){
    console.log(type + " " + brand + " " + phone);
    var msg;

    if(type == 'BUY-PHONE') {
       msg =  {
            "text": "How many " + brand + " " + phone + " phones do you want to buy?",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"1",
                    "payload":"QUANTITY_" + brand + "_" + phone + "_" + price + "_" + image
                },
                {
                    "content_type":"text",
                    "title":"2",
                    "payload":"QUANTITY_" + brand + "_" + phone + "_" + price + "_" + image
                },
                {
                    "content_type":"text",
                    "title":"3",
                    "payload":"QUANTITY_" + brand + "_" + phone + "_" + price + "_" + image
                },
                {
                    "content_type":"text",
                    "title":"4",
                    "payload":"QUANTITY_" + brand + "_" + phone + "_" + price + "_" + image
                },
                {
                    "content_type":"text",
                    "title":"5",
                    "payload":"QUANTITY_" + brand + "_" + phone + "_" + price + "_" + image
                }
            ]
        }
    } else if(type == 'QUANTITY'){
        msg =  {
            "text": "Great! We added your item/s into the cart list.",
            "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Continue Shopping",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                },
                {
                    "content_type":"text",
                    "title":"Go to Cart",
                    "payload":"CART"
                }
            ]
        }
    }

    return msg;
}

var AddItemsToCartList = function(brand, phone, price, image, qty, sender_id) {
    var isExist = false;
    var isPhoneExist = false;
    var senderIndex = -1;
    cartObj = {
        brand : brand,
        phone : phone,
        quantity : qty,
        price : price,
        tPrice : parseInt(price) * parseInt(qty),
        image : image
    }

    cartList.forEach(function(phoneList, index){
        if(phoneList.sender_id === sender_id) {
            isExist = true;
            senderIndex = index;
            cartList[index].list.forEach(function(listObject, index){
                if(listObject.brand === brand && listObject.phone === phone) {
                    isPhoneExist = true;

                }
            });

            if(isPhoneExist){
                cartList[index].list.push(cartObj);
            } else {
                cartList[index].list.push(cartObj);
            }

        }
    });

    if(isExist){

    } else {
        var completeCartList = {
            sender_id : sender_id,
            list : []
        };
        completeCartList.list.push(cartObj);

        cartList.push(completeCartList);

        senderIndex = cartList.length - 1;
    }

    return cartList[senderIndex];
}

var goToCart = function(list){

    var dt = new Date();
    var utcDate = dt.getTime().toString();

    var subTotal = 0;

    console.log("====list====");
    console.log(list);
    var elementArray = [];
    list.list.forEach(function(item){
        var elementsObj = {
            "title":item.brand + ' ' + item.phone,
            "quantity":item.quantity,
            "price":item.tPrice,
            "currency":"USD",
            "image_url":"https://gadgets-bot.herokuapp.com/public/images/" + item.image
        }

        subTotal += item.tPrice;
        elementArray.push(elementsObj);
    });



    var shipping_cost = Number(7);
    var total_tax = Number((subTotal * 5.2) / 100);



    console.log(typeof subTotal + ' ' + typeof shipping_cost + ' ' + typeof total_tax + ' ' + typeof utcDate);

    var cartObj = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"receipt",
                "recipient_name":list.sender_id,
                "order_number":"12345678902",
                "currency":"USD",
                "payment_method":"Visa 2345",
                "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",
                "timestamp":1428444852,
                "address":{
                    "street_1":"1 Hacker Way",
                    "street_2":"",
                    "city":"Menlo Park",
                    "postal_code":"94025",
                    "state":"CA",
                    "country":"US"
                },
                "summary":{
                    "subtotal":34.67,
                    "shipping_cost":shipping_cost,
                    "total_tax":67.44,
                    "total_cost":56.14
                },
                "adjustments":[
                    {
                        "name":"New Customer Discount",
                        "amount":20
                    },
                    {
                        "name":"$10 Off Coupon",
                        "amount":10
                    }
                ],
                "elements": elementArray
            }
        }
    }

    return cartObj;
}

module.exports = {
    handleMessage : handleMessage,
    handlePostback : handlePostback,
    callSendAPI : callSendAPI
}