/**
 * Created by jie on 2017/6/8.
 */
var restify=require("restify");
var emqServer=require("./emqServer");
var config=require("./config.js");

var server = restify.createServer({
    name : config.server.serverName
});
server.use(restify.queryParser());
server.use(restify.bodyParser());

/*create queue
* json
* queueName：
* delaySeconds
* invisibilitySeconds
* receiveMessageWaitSeconds
* receiveMessageMaximumNumber
* messageRetentionSeconds
* messageMaximumBytes
* */
server.post('/Queue',function(req,res){
    emqServer.createQueue(req.body,function(result){
        res.send(result);
        res.end();
    });
});
/*delete queue
* queueName
* */
server.del('/Queue/:queueName',function(req, res){
    emqServer.deleteQueue(req.params.queueName,function(result){
        res.send(result);
        res.end();
    });
});
/*clear queue
* json
* queueName
* */
server.put('/Queue',function(req,res,next){
    emqServer.purgeQueue(req.params.queueName,function(result){
        res.send(result);
        res.end();
    })
});

/*sendmessage
* json
* queueName
* messageArray:message array
* */
server.post('/Message',function(req,res,next){
    emqServer.sendMessage(req.body.queueName,req.body.messageArray,function(result){
        res.send(result);
        res.end();
    });
});

/*get message
* queueName:queuename
* */
server.get('/Message/:queueName',function (req, res, next){
   emqServer.receiveMessage(req.params.queueName,function(messagelist){
       console.log(messagelist);
       res.send(messagelist);
       res.end();
   });
});

/*delete message batch
* queueName
* receiptHandleList: message receiptHandle array
* */
server.del('/Message/:queueName/:receiptHandleList',function(req,res,next){
    console.log(req.params);
    console.log(req.params.receiptHandleList);
    emqServer.deleteMessageBatch(req.params.queueName,req.params.receiptHandleList,function(messagelist){
        res.send(messagelist);
        res.end();
    });
});

server.listen(process.env.PORT||config.server.serverPort);
server.on("listening", function () {
    console.log('server is running ......');
});

/*
server.listen( config.server.serverPort ,config.server.serverUrl, function(){
    console.log('%s server is running at %s', server.name , server.url);
});*/
