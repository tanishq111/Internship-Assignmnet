var express = require('express');
var app = express();
var fs = require('fs');
const { finished } = require('stream');
var tmp = fs.readFileSync('data.json');
var data = JSON.parse(tmp);
// console.log(data);
console.log(typeof(data));
function create(key,value,timeout = 0){
    if(typeof key != 'string' || key.length > 32){
        console.log("Invalid key type. Please enter a string key"); 
    }
    else if(key in data)
    console.log("The key is already present");

    else{
        var l;
        if(timeout == 0){
            l =[value,timeout];
        }
        else{
            var time = (new Date()).getTime()/1000;
            l = [value,time+timeout];
        }
        if(key.length <= 32){
            data[key]=l;
        }
}
}

function read(key){
    if(key in data){
        var b = data[key];
        if(b[1]!=0){
            var time = (new Date()).getTime()/1000;
            if(time < b[1]){
                console.log(data[key]);
            }
            else{
                console.log("Time-To-Live for "+key+" has expired"); 
            }
        }
        else{
            console.log(data[key]);
        }
    }
    else{
        console.log("The key does not exist. Please create first.") 
    }
}

function deletekey(key){
    if(key in data){
        var b = data[key];
        if(b[1]!=0){
            var time = (new Date()).getTime()/1000;
            if(time < b[1]){
                delete data[key];
                console.log("Successfully deleted the key and value");
            }
            else{
                delete data[key];
                console.log("Time-To-Live for "+key+" has expired"); 
            }
        }
        else{
            delete data[key];
            console.log("Successfully deleted the key and value");
        }
    }
    else{
        console.log("No such key found"); 
    }
}
module.exports.data = data;
module.exports.create = create;
module.exports.read = read;
module.exports.deletekey = deletekey;

var server = app.listen(3000,()=>{
    console.log("Server is Running !!");
});

