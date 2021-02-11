const paypal = require('paypal-rest-sdk')
const dotenv = require('dotenv')

const Order = require('../models/Order')

dotenv.config({ path: '../config/config.env' })

let price;

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

const pay = (req, res) => {
    price = parseFloat(req.body.price)

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
                  "name": req.body.name,
                  "sku": "001",
                  "price": parseFloat(req.body.price),
                  "currency": "EUR",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "EUR",
              "total": parseFloat(req.body.price)
          },
          "description": req.body.desc
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
              "total": price
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            const body = {
                googleId: req.user.googleId,
                recipient_name: payment.payer.payer_info.shipping_address.recipient_name,
                email: payment.payer.payer_info.email,
                address: payment.payer.payer_info.shipping_address.line1,
                city: payment.payer.payer_info.shipping_address.city,
                state: payment.payer.payer_info.shipping_address.state,
                postal_code: payment.payer.payer_info.shipping_address.postal_code,
                country_code: payment.payer.payer_info.shipping_address.country_code,
                item_name: payment.transactions[0].item_list.items[0].name,
                item_price: payment.transactions[0].item_list.items[0].price
            }

            const order = new Order(body)
            order
                .save()
                .then((result) => {
                    res.redirect('/orders')
                })
                .catch((err) => {
                    console.log(err)
            })
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