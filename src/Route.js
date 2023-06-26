;(function(){
	module.exports=function(_g){

		var app = _g.app;
		var http = _g.http;
		const gpt = require('../gpt')();		


		function route(){
			app.get('/',function(req,res){
				res.render('index.html',{});
			});

			app.post('/gpt', async (req,res)=>{
				console.log("/gpt api");
				const p = req.body.p;
				console.log('/gpt p = ' + p);
				const ret = await gpt.send(p);
				res.send(ret);
			});

			//1. enetry point
			app.listen(6627,function(){
			  console.log('gpt test Server listen on *:6627');
			});
		}


		var publicReturn = {
			route:route,
		}
		return publicReturn;
	}

})();



