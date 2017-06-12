/**
 * Created by jie on 2017/6/7.
 */
var config = require('./config.js');
var emqClient = require('galaxy-sdk-nodejs');
var authenticationTypes = emqClient.authenticationTypes;
var clientFactory = emqClient.emqClientFactory;
var appKey = config.emq.secretKeyId; // your appKey
var appSecret = config.emq.secretKey; // your appSecret
var endpoint = config.emq.endpoint; // emq service endpoint
var userType = authenticationTypes.UserType.APP_SECRET;
var credential = new authenticationTypes.Credential({
    type: userType,
    secretKeyId: appKey,
    secretKey: appSecret
});
var cf = new clientFactory.ClientFactory(credential);
var queueClient = cf.newQueueClient(endpoint);
var messageClient = cf.newMessageClient(endpoint);
var queueTypes = emqClient.queueTypes;
var messageTypes = emqClient.messageTypes;

/*create queue*/
var createQueue=function(queueAttribute,callback){
    var queue= queueAttribute;
    if(queue){
        var createQueueRequest = new queueTypes.CreateQueueRequest({
            queueName: queue.queueName,
            defaultTagName:config.emq.defaultTagName,
            queueAttribute: new QueueAttribute({
                delaySeconds:queue.delaySeconds||config.emq.delaySeconds,
                invisibilitySeconds:queue.invisibilitySeconds||config.emq.invisibilitySeconds,
                receiveMessageWaitSeconds:queue.receiveMessageWaitSeconds||config.emq.receiveMessageWaitSeconds,
                receiveMessageMaximumNumber:queue.receiveMessageMaximumNumber||config.emq.receiveMessageMaximumNumber,
                messageRetentionSeconds:queue.messageRetentionSeconds||config.emq.messageRetentionSeconds,
                messageMaximumBytes:queue.messageMaximumBytes||config.emq.messageMaximumBytes
            }),
            queueQuota:new QueueQuota({
                throughput:new Throughput({
                    readQps:8000,
                    writeQps:8000
                })
            })
        });
        queueClient.createQueue(createQueueRequest, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(result.queueName);
            }
        });
    }
};

/*delete queue*/
var deleteQueue=function(queueName,callback){
    queueClient.deleteQueue(new DeleteQueueRequest({
        queueName:queueName
    }), function (error, result) {
        if (error) {
            throw error;
        } else {
            callback(result);
        }
    });
};

/*clear queue*/
var purgeQueue=function(queueName,callback){
    queueClient.purgeQueue(new PurgeQueueRequest({
        queueName:queueName
    }), function (error, result) {
        if (error) {
            throw error;
        } else {
            callback(result);
            //return result.queueName;
        }
    });
};
/*send message
 queueName:queue name;
 messageBody: array message
 */
var sendMessage=function(queueName,messageArray,callback){
  var len=messageArray.length;
    console.log(len);
  if(len>0)
  {
      for (var i= 0 ; i<len ;i++)
      {
          console.log(messageArray[i]);
          messageClient.sendMessage(new messageTypes.SendMessageRequest({
              queueName: queueName,
              messageBody: messageArray[i]
          }), function (error, res1) {
              if (error) {
              } else {
                  callback(res1);
              }
          })
      }
  }
};

/*get messagelist*
 queueName:queue name
 */
var receiveMessage=function(queueName,callback){
    messageClient.receiveMessage(new messageTypes.ReceiveMessageRequest({
        queueName: queueName,
        maxReceiveMessageNumber:config.emq.maxReceiveMessageNumber
    }), function (error, res2) {
        if (error) {
            throw error;
        } else {
            if(res2.length>0)
            {
                callback(res2) ;
            }
            else
                callback(null);
        }
    });
};

/*delete message
* queueName：queue name
* receiptHandle: message receiptHandle
* */
var deleteMessage=function(queueName,receiptHandle,callback){
    messageClient.deleteMessage(new messageTypes.DeleteMessageRequest({
        queueName: queueName,
        receiptHandle: receiptHandle
    }), function (error, res3) {
        if (error) {
            throw error;
        } else {
            callback(receiptHandle);
        }
    });
};

/*delete message patch
 * queueName：queuename
 * messageList:message receiptHandle Array
* */
var deleteMessageBatch=function(queueName,messageList,callback){
    var messageArray=new Array(messageList);
    var messageCount=messageArray.length;
    var deleteMessageBatchEntryList = [];
    if(messageCount>0){
        for (var i = 0; i < messageCount; i++) {
            deleteMessageBatchEntryList[i] = new messageTypes.DeleteMessageBatchRequestEntry({
                receiptHandle: messageArray[i]
            });
        }
        console.log(deleteMessageBatchEntryList);
        messageClient.deleteMessageBatch(new messageTypes.DeleteMessageBatchRequest({
            queueName: queueName,
            deleteMessageBatchRequestEntryList: deleteMessageBatchEntryList
        }), function (error, res3) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                console.log("deleted message handle: ");
                console.log(deleteMessageBatchEntryList);
                callback(res3);
            }
        });
    }
};

module.exports.createQueue=createQueue;
module.exports.sendMessage=sendMessage;
module.exports.receiveMessage=receiveMessage;
module.exports.deleteMessage=deleteMessage;
module.exports.deleteMessageBatch=deleteMessageBatch;
module.exports.deleteQueue=deleteQueue;
module.exports.purgeQueue=purgeQueue;


