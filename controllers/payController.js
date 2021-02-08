const paypal = require('paypal-rest-sdk')
const dotenv = require('dotenv')

dotenv.config({ path: '../config/config.env' })

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

const pay = (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Triple OG Blood Bubba's Semen Kush",
                  "sku": "001",
                  "price": "20.00",
                  "currency": "EUR",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "EUR",
              "total": "20.00"
          },
          "description": "Kush so greasy it drippin like semen"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  });
}
  
const success = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "EUR",
              "total": "20.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(payment);
          res.send('Success');
      }
  });
}
  
const cancel = (req, res) => {
    res.send('Cancelled')
}

module.exports = {
	pay,
	success,
	cancel
}