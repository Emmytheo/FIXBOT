const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const campaignId = "9c05556e4d";

mailchimp.setConfig({
  apiKey: "b601e0ae131a51856b53a351c0fd4d74-us2",
  server: "us2",
});

async function addSubscriber(email){
    const response = await mailchimp.lists.addListMember(campaignId, {
        email_address: email,
        status: "subscribed",
    });

    return Boolean(response.id)
}

// const firebase = 
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

app.post("/preorder", async function(req, res){
    const email = req.body.email
    const status = await addSubscriber(email)
    res.send({status: status})
});

exports.app  = functions.https.onRequest(app);




  
