/**
 * Created by jie on 2017/6/7.
 */
var config={
    emq:{
        secretKeyId:"XXXXXXXXXX",
        secretKey:"XXXXXXXXXXXXXXXXXXXXXXXXX",
        endpoint:"http://cnbj2.emq.api.xiaomi.com",
        defaultTagName:"UserCenter",
        delaySeconds:0,
        invisibilitySeconds:43200,
        receiveMessageWaitSeconds:0,
        receiveMessageMaximumNumber:100,
        messageRetentionSeconds:1209600,
        messageMaximumBytes:262144,
        maxReceiveMessageNumber:50
    },
    server:
    {
        serverPort:3000
    }
}
module.exports = config;