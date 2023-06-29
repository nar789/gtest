;(function(){
	module.exports=function(_g){

		var app = _g.app;
		var http = _g.http;
		const gpt = require('../gpt')();	
		const mysql = require('mysql');
		const CONFIG = require('../config.js');
		const conn = mysql.createConnection(CONFIG);


		function route(){
			app.get('/',function(req,res){
				res.render('index.html',{});
			});

			app.get('/count', async (req, res)=>{
				await conn.query(`select * from gpt where id=1`, (err, rows) => {
					if(err){
						console.log(err);
					}
					const cnt = rows[0]['count'];
					console.log(`cnt = ${cnt}`);
					res.send(cnt + "");
				});
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



