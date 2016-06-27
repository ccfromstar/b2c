var numberItems = "CreateTime,ArticleCount".split(",");

var Message = function(msg){
    this.msg = msg;
}

Message.prototype.toXML = function(){
    var str = "";
    for(var key in this.msg){
        var value = this.msg[key];
        if(value != null && value != undefined){
            if(key == "CreateTime"){
                str += "<"+key+">"+value+"</"+key+">";
            }else{
                str += "<"+key+"><![CDATA["+value+"]]></"+key+">";
            }
        }
    }
    console.log("<xml>"+str+"</xml>");
    return "<?xml version='1.0' encoding='UTF-8'?>"+str;

}

Message.prototype.send = function(res){
    res.writeHead(200, {'Content-Type': 'application/xml'});
    res.end(this.toXML());
}

module.exports = Message;