const brevo = require('@getbrevo/brevo');
var instance = require('sib-api-v3-sdk');
let defaultClient = instance.ApiClient.instance;
exports.forget = async (req, res, next) => {
     
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = '';
  
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { "name": "John", "email": "munisekharudavalapati@gmail.com" };
  sendSmtpEmail.to = [
    { "email": "munisekharudavalapati2@gmail.com", "name": "sample-name" }
  ];
  sendSmtpEmail.replyTo = { "email": "munisekharudavalapati2@gmail.com", "name": "sample-name" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-234" };
  sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
};
 

// const bcrypt=require('bcrypt')
// exports.updateRequst=(req,res,next)=>{

// }


// exports.update=(req,res,next)=>{

// }
