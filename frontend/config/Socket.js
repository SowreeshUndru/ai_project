import {io} from 'socket.io-client';
var socket;
function socketInstance(projectid){
   
     socket = io(`${import.meta.env.VITE_API_URL}`,{
        auth:{
            token:localStorage.getItem("token")
        },query:{
            project_id:projectid
        }
    });
    return socket
}

export default socketInstance;

function  Send(event,data){
    return socket.emit(event,data);
}
function  recive(event,cb){
    return socket.on(event,cb);
}
export {Send,recive};