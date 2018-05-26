const express = require('express');
const router = require('express').Router();
const User = require("../models/userClient");
const Items = require("../models/items");
const AdminConfig = require("../models/admin-config");
var SN = require('sync-node');
const mp = require('mercadopago');
const jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
const middleware = require('../middlewares/middle-token')

const instapago = require('instapago');

app.set('superSecret', config.secret);

mp.configure({
    client_id: '2542522900395702',
    client_secret: 'iQDw4ynMCfxo0PcFCjM7pzilRtsd6QCe'

});

router.get('/', middleware.protectedClientRoute, (req, res) => {
    res.send('si middle')
})

router.post('/registerUser', (req, res) => {
    var user = req.body;
    if (!user.name || user.name.trim() == '') { return res.json({ 'err': 'No olvides ingesar el tu nombre.' }) }
    else if (!user.lastName || user.lastName.trim() == '') { return res.status(500).send('No olvides ingesar el tu apellido.') }
    else if (!user.docType || user.docType.trim() == '') { return res.status(500).send('No olvides ingesar el tipo de documento.') }
    else if (!user.docNac || user.docNac.trim() == '') { return res.status(500).send('No olvides ingesar el prefijo del documento.') }
    else if (!user.docNumber) { return res.status(500).send('No olvides ingesar el numero de tu documento.') }
    else if (!user.phone) { return res.status(500).send('No olvides ingesar tu teléfono.') }
    else if (!user.email || user.email.trim() == '') { return res.status(500).sendconsole.log('No olvides ingesar tu correo.') }
    else if (!user.password || user.password.trim() == '') { return res.status(500).sendconsole.log('No olvides ingesar tu clave.') }

    User.findOne({ email: user.email }, (err, result) => {
        if (err) console.log(err)
        if (result) {
            res.json({ 'err': 'El correo ingresado ya existe' })
        } else {
            var users = new User({
                name: user.name,
                lastName: user.lastName,
                docType: user.docType,
                docNac: user.docNac,
                docNumber: user.docNumber,
                phone: user.phone,
                email: user.email,
                password: user.password,
            })
            users.save(users, (err, newUser) => {
                if (err) console.log(err);
                var payload = {
                    email: newUser.email,
                    id: newUser._id,
                    role: 'client',
                    name: newUser.name,
                    lastName: newUser.lastName
                }
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 86400
                })

                return res.status(200).json({
                    success: true,
                    message: 'Usuario Autenticado',
                    token: token
                });

            })
        }
    })



})

router.post('/payments', middleware.protectedClientRoute, (req, res) => {
    var pn = SN.createQueue();
    console.log(req.body)
    var items = req.body.items;
    var totalFront = req.body.amount;
    let itemPrice
    var cant = 0
    var subTotal

    pn.pushJob(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                subTotal = 0
                for (let i = 0; i < items.length; i++) {
                    Items.findOne({ id_item: items[i].id }, (err, item) => {
                        if (err) res.send(err)
                        cant = req.body.items[i].cant
                        let itemPrice = item.price
                        subTotal = (itemPrice * cant) + subTotal
                    })


                }
                resolve(subTotal);
            }, 5000);

        })
    });

    pn.pushJob(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                AdminConfig.findOne({}, (err, configs) => {
                    if (err) res.send(err)
                    console.log(configs.webCharges)
                }).then((configs) => {
                    subTotal = (subTotal * (configs.webCharges / 100)) + subTotal
                    console.log(subTotal)
                })
                resolve();
            }, 1000);
        })
    });
    pn.pushJob(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                subTotal = (subTotal * (0.12)) + subTotal
                console.log('el total es')
                console.log(subTotal)
                resolve();
            }, 1000);

        })
    });

    pn.pushJob(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (subTotal == totalFront) {
                    const i=instapago('CAFC5157-5DBA-4AD0-8864-2D342215220A', 'c00737d4db084a953770e84fce0f1c41')
                    i.pay({
                        amount: 60000,
                        description: 'Probando el módulo Instapago',
                        cardholder: 'Nombre Apellido',
                        cardholderid: 12345678,
                        cardnumber: 4111111111111111,
                        cvc: 123,
                        expirationdate: '10/2018',
                        statusid: 2,
                        ip: '127.0.0.1'
                    }).then(respuesta => {
                        res.send(respuesta.data)
                    }).catch(error => console.error(error));
                    // var body = {
                    //     keyId: 'CAFC5157-5DBA-4AD0-8864-2D342215220A',
                    //     PublicKeyId:'c00737d4db084a953770e84fce0f1c41',
                    //     Description:'totalFront',
                    //     CardHolder:'Rafael Alvarez',
                    //     CardHolderID:22225674,
                    //     CardNumber:4111111111111111,
                    //     cvc: 123,
                    //     ExpirationDate:'10/2021',
                    //     StatusId:123,
                    //     IP:'192.168.0.1',
                    //     Amount:totalFront,

                    // }
                    // var headers = {
                    //     'User-Agent': 'Super Agent/0.0.1',
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    // }
                    // var options = {
                    //     url: 'https://api.instapago.com/payment',
                    //     method: 'POST',
                    //     jar: true,
                    //     headers: headers,

                    // }
                    // request.post('https://api.instapago.com/payment', {json:body},
                    //     function (error, response, body) {
                    //         if (!error && response.statusCode == 200) {
                    //             console.log(body)
                    //         }
                    //     })


                } else {
                    console.log('err')
                    res.json({ 'err': 'Hubo un error inesperado' })

                }
                resolve();
            }, 1000);

        })
    });


})

router.post('/', (req, res) => {
    console.log(req.body)
})


module.exports = router;