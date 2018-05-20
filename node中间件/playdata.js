var express=require('express');
var app=express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Content-Type','application/json;charset=utf-8')
   
    next();
});
app.get('/',function (req,res) {
	res.send("这是播放器的中间件");
	res.end();
})

app.get('/musicList',function (req,res) {
	 var _musicList={
	 	"music":[
	 	{
	 	"id":0,
	 	"name":"aplologize",
	 	"singer":"tim",
	 	"img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526812993032&di=0cff1047673866b7fd9f8d2b6d24e69b&imgtype=0&src=http%3A%2F%2Fwww.ah.xinhuanet.com%2Ftitlepic%2F1117418255_1449717108394_title1n.jpg",
	 	"url":"http://www.egtch.com/t_works/Vuedata/I Am You.mp3",
	 	},
	 	{
        "id":1,
	 	"name":"aplologize",
	 	"singer":"tim",
	 	"img":"http://www.egtch.com/t_works/Vuedata/hero.jpg",
	 	"url":"http://www.egtch.com/t_works/Vuedata/Hero.mp3",
	 	}
	 	]
	 }
	res.send(_musicList);
	res.end();
})

app.listen(3698,function(){
	console.log("3698以及运行")
})