const express= require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const https=require("https");
app.get("/",function (req,res) {
res.sendFile(__dirname+"/index.html"); 
})
app.post("/",function(req,res){
    const place=req.body.location;
    const unit=req.body.unit;
    const app_id="c12b93f31b7240f2697f7dd4f17065e5";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+place+"&units="+unit+"&appid="+app_id;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const imgURL="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            const descrip=weatherData.weather[0].description;
            const temp=weatherData.main.temp;
            
            
            if(unit==="metric")
            res.send("<h2>The weather seems like it will be "+descrip+".</h2></br><h3>The tempareture seems like it will be "+temp+" degree Celsuis.</h2></br><img src="+imgURL+">");
            else if(unit==="imperial")
            res.send("<h2>The weather seems like it will be "+descrip+".</h2></br><h3>The tempareture seems like it will be "+temp+" degree Fahrenheit.</h2></br><img src="+imgURL+">");
            else
            res.send("<h2>The weather seems like it will be "+descrip+".</h2></br><h3>The tempareture seems like it will be "+temp+" Kelvin.</h2></br><img src="+imgURL+">");
        })
    })
})





app.listen(3002,function(){
    console.log("Server running on port 3002");
});