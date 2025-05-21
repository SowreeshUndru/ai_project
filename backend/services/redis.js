import Redis from "ioredis";
const redisclient=new Redis({
    host:process.env.HOST,
    port:process.env.PORT,
    password:process.env.PASSWORD

});

redisclient.on("connect",function(){
    console.log("connected with redis");
});


export default redisclient;