// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
//     console.log(process.env);
//   }

const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'
sgMail.setApiKey(sendgridAPIKey)

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// sgMail.send({
//     to: 'icbob99@gmail.com',
//     from: 'icbob99@gmail.com',
//     subject: 'This is my first creation!',
//     text: 'I hope this one actually get to you.'
// }).then(()=>{}, error =>{
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
// })


const sendWelcomeEmail = (email, name) => {
  sgMail.send({
      to: email,
      from:'icbob99@gmail.com',
      subject:'Thanks for joining',
      text : `Welcome to this app, ${name}. Let me know how you go alone with this app`
  }).then(() => {
    console.log('Status: SUCCESS')
  }).catch((e) => {
    console.log('Status: ERROR', e)
  })
}

const sendCancelEmail = (email, name) =>{
  sgMail.send({
      to: email,
      from:'icbob99@gmail.com',
      subject:'Sad to see you leave',
      text : `Apologies to any inconvienece caused, ${name}. Let me know how much can you rate this app`
  }).then(() => {
    console.log('Status: SUCCESS')
  }).catch((e) => {
    console.log('Status: ERROR', e)
  })
}

sendWelcomeEmail('icbob99@gmail.com','adarsh')

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
}