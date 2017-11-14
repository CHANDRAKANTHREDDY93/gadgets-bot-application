 
var Phone = require("./../schemas/phone");

//var config = require("./../config");//


module.exports=function(app, express)
{
	var api = express.Router();



	api.post("/phone", function(req, res){
		var phone = new Phone({
			phId : req.body.phId,
			image: req.body.image,
			brand: req.body.brand,
			phone: req.body.phone,
			totalQty: req.body.totalQty,
			price: req.body.price,
			height: req.body.height,
			width: req.body.width,
			depth: req.body.depth,
			weight: req.body.weight,
			memory: req.body.memory,
			os: req.body.os,
			processor: req.body.processor,
			rCamera: req.body.rCamera,
			fCamera: req.body.fCamera,
			resolution: req.body.resolution,
			screenSize: req.body.screenSize
		});


		phone.save(function(err){					//mongoose save function
			if(err)
			{
				res.send(err);
			}
			res.json({"message": "success"});		//response printed in postman
		})
	});



	//phone get api to get all the phones from database

	api.get("/getPhones", function(req, res){
		Phone.find({}, function(err, users){
			if(err)
			{
				res.send(err);
			}
			res.send(users);
		});
	});	

	//phone get api to get particular phone from database

	api.post("/getMyPhone", function(req, res){
		Phone.findOne({_id: req.body._id}, function(err, user){
			if(err)
			{
				res.send(err);
			}
			res.send(user);
		});
	});	

	return api
}

