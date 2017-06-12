/**
 * Created by jie on 2017/6/8.
 */
var restify=require("restify");
var client = restify.createJsonClient({
    url: 'http://127.0.0.1:8061'
});
/*client.del('/Queue/475350%2figluco_initialization', function(err, req, res) {
    if(err) console.log(err)
    console.log(res);
});*/
/*var queueAttribute={
    queueName: 'test222'
};
client.post('/Queue',queueAttribute, function(err, req, res,data) {
    if(err) console.log(err)
    console.log(res);
});*/
/*var queueAttribute={
 queueName: '475350/usersss3'
 };
client.put('/Queue',queueAttribute, function(err, req, res) {
    if (err) console.log(err)
    console.log(res);
});*/
/*var body={
    queueName: '475350/usersss3',
    messageArray:["111111111","22222222222222222","333333333333333333333","444444444444","5555555555","66666666666666666"]
};
client.post('/Message',body, function(err, req, res) {
    if (err) console.log(err)
    console.log(res);
});*/
/*client.get('/Message/475350%2fusersss3', function(err, req, res) {
    if (err) console.log(err)
    console.log(res);
});*/
var receiptHandleList=[]
client.del('/Message/475350%2fusersss3/["MToxNDk2OTE2MDg5NDAxOjE0OTY5MTYwODczNzAwMDA6Mjc5MzI2MzU4Njc1Mzg3NTA4OA=="]', function(err, req, res) {
    if (err) console.log(err)
    console.log(res);
});

