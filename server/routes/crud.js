const router = require('express').Router();
const express = require('express');
const app = express();
var multer = require('multer');
var Post = require("../models/items");
var Categories = require("../models/categories");
var AdminConfig = require("../models/admin-config");
var AdminUser = require("../models/admin-user");
var mongoose = require("mongoose");
var mongo = require("mongojs");
var mercadopago = require('mercadopago');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config');
var SN = require('sync-node');
app.set('superSecret', config.secret);

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.get('/', (req, res, next) => {
    res.send('crud working')
})
router.post('/login', (req, res) => {
    var user = req.body
    if (!user.userName) { return res.json({ 'err': 'No olvides ingesar el tu usuario.' }) }
    if (!user.password) { return res.json({ 'err': 'No olvides ingesar el tu contraseña.' }) }
    AdminUser.find({ userName: user.userName }, (err, result) => {
        if (err) return res.json({ 'err': error })

        if (result.length < 1 && req.body.userName == 'admin' && req.body.password == 'admin') {
            var userAdmin = new AdminUser()
            userAdmin.save(userAdmin, (error, newUser) => {
                const payload = {
                    a: 'a',
                    role: newUser.role,
                    userName: newUser.userName,
                    password: newUser.password
                };
                var token = jwt.sign(payload, app.get('superSecret'), {});
                console.log('no existia lo creamos')
                res.json({ success: true, message: 'Logueado', token: token });
            })

        } else if (result.length < 1 && req.body.userName != 'admin') {
            res.json({ success: false, message: 'Usuario no encontrado..' });
        } else if (result.length < 1 && req.body.password != 'admin') {
            res.json({ success: false, message: 'Contraseña incorrecta..' });
        } else if (result.length > 0 && req.body.userName != result[0].userName) {
            res.json({ success: false, message: 'Usuario no encontrado.' });
        } else if (result.length > 0 && req.body.password != result[0].password) {
            res.json({ success: false, message: 'Contraseña incorrecta.' });
        } else if (result.length > 0 && req.body.userName == result[0].userName && req.body.password == result[0].password) {
            var payload = {
                'role': result[0].role,
                'userName': result[0].userName,
                'password': result[0].password
            };
            var token = jwt.sign({ payload }, app.get('superSecret'), {

            });
            console.log('si existia lo buscamos')
            res.json({ success: true, message: 'Logueado', token: token });
        }
    })

})
router.get('/categories', (req, res) => {
    Categories.find({}, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.send('No se ha encontrado ninguna categoria')
        }
    })
})

router.post('/categories', (req, res) => {
    if (!req.body.name || req.body.name.trim() == '') return res.json({ 'error': 'Name require' });

    console.log(req.body)
    var categories = new Categories({
        name: req.body.name,
    })
    categories.save(categories, (err, categorie) => {

        // if (err) return res.status(500).send(err);
        if (err) console.log(err)
        console.log('guardamos')
        return res.status(200).json(categorie);
    })

});
router.delete('/categories/:id', (req, res) => {
    console.log('entramos a borrar')
    Post.findOne({ id_category: req.params.id }, (err, result) => {
        console.log(req.params.id)
        console.log(result)
        if (err) res.status(500).send(err);
        if (!result) {
            Categories.remove({ _id: req.params.id }, (err, results) => {
                if (err) return res.status(500).send(err);
                Categories.find({}, (err, cat) => {
                    if (err) return res.status(500).send(err)
                    return res.status(200).json(cat)
                })

            })
        } else {
            return res.json({ 'err': 'No se puede eliminar una categoría asociada a un artículo' })
        }
    })

})
router.post('/findListOfItems', (req, res, next) => {

    function a() {
        let items = []

        for (let i = 0; i < req.body.length; i++) {
            Post.findOne({ id_item: req.body[i].id }, (err, result) => {
                if (err) return res.send(err);
                if (result.cant < req.body.cant) {

                    return res.send('No disponible');
                } else {
                    data = {
                        'id': result.id_item,
                        'title': result.title,
                        'price': result.price,
                        'images': result.images,
                        'cant': req.body[i].cant,
                    }

                    items.push(data)
                    localStorage.setItem('items', JSON.stringify(items));

                }
            })
        }
        next()
    }
    function b() {
        items = JSON.parse(localStorage.getItem('items'));
        res.status(200).json(items)
        next()
    }
    a()
    b()

})
router.post('/showoneitem', (req, res) => {
    console.log('entramos')
    Post.findOne({ id_item: req.body.id }, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result) {
            res.status(200).json(result)
        } else {
            console.log('no se consg')
            res.json({'err':'Artículo no encontrado'})
        }
    })
});
router.get('/showallitems', (req, res) => {
    Post.find({}, (err, result) => {
        if (err) return res.status(500).send(err);
        if (result) {

            return res.status(200).json(result);
        } else {
            return res.send('No se ha encontrado ningun item aún')
        }


    }).sort('-date')
});

router.post('/newitem', upload.array('images', '8'), (req, res) => {
    console.log(req.body)
    var item = req.body;
    if (!item.title || item.title.trim() == '' || !item.price || !item.cant || !item.id_category) return res.json({ 'error': 'Debes rellenar los campos obligatorios' })
    var items = new Post({
        id_item: item.id_item,
        title: item.title,
        price: item.price,
        cant: item.cant,
        code: item.code,
        description: item.description,
        id_category: item.id_category,
        sells: 0
    })
    console.log(item.id_item)
    Post.findOne({ id_item: items.id_item }, (err, result) => {
        if (err) return res.status(500).send(err);
        var ext = req.files[0].originalname.split(".").pop();
        var img_name = item.id_item + '_' + Date.now() + '.' + ext;
        fs.createReadStream(req.files[0].path).pipe(fs.createWriteStream('./public/uploads/' + img_name));
        fs.unlink(req.files[0].path);
        if (result) {
            console.log(result.code)
            result.images.push(img_name);
            result.save();
            // Post.find({id_item:items.id_item}, (err, result)=>{
            //     console.log(result.code)
            //     console.log('solo añadimos')
            //     return res.status(200).send('solo añadimos')
            // })
            return res.status(200).send('ok')
        } else if (!result) {
            console.log('coreamos nuevo')
            items.images.push(img_name)
            items.save(items, (err, results) => {
                if (err) return res.send(err);
                console.log('nuevo post guardado');


            })

            return res.status(200).send('ok')
        }

    })


})
router.put('/items/:id', (req, res) => {
    console.log('entro a editar')
})
router.delete('/items/:id', (req, res) => {
    // var pn = SN.createQueue();
    // pn.pushJob(function () {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(function () {
    //             Post.findOne({ id_item: req.params.id }, (err, post) => {
    //                 if (err) res.status(500).send(err);
    //             })
    //             resolve();
    //         }, 1000);

    //     })
    // });
    Post.findOne({ id_item: req.params.id }, (err, post) => {
        if (err) res.status(500).send(err);
        if (!post) return res.send('no se encontro post')
        console.log(post.images.length)
        for (var i = 0; i < post.images.length; i++) {
            fs.unlink('./public/uploads/' + post.images[i], (err) => {
                if (err) return res.send(err);
                console.log('eliminado')
            })
        }
        Post.remove({ id_item: req.params.id }, (err, results) => {
            if (err) return res.status(500).send(err);

            Post.find({}, (err, post) => {
                if (err) return res.status(500).send(err)
                return res.status(200).json(post)
            })

        })

    })

})
//ConfigAdmin///////////////////
router.get('/config', (req, res) => {
    AdminConfig.find({}, (err, configs) => {
        if (err) return res.send(err)
        if (configs.length == 0) {
            var config = new AdminConfig
            config.save(config, (err, result) => {
                res.json(result)
            })
        } else {
            AdminConfig.find({}, (err, configs) => {
                if (err) res.send(err)
                res.json(configs)
            })
        }
    })
})
router.post('/config', (req, res) => {
    AdminConfig.findOne({}, (err, config) => {

        config.webCharges = req.body.webCharges
        config.save((err, configUpdated) => {
            if (err) res.json({ err, 'status': 'error' })
            console.log(configUpdated);
            res.json({ configUpdated, 'status': 'ok' })
        })
    })

    // console.log(req.body)
    // var config = req.body
    // var data=new AdminConfig({
    //     webCharges:config.webCharges
    // })
    // AdminConfig.find({},(err,config)=>{
    //     if (err) res.send(err)
    //     config[0].webCharges=config.webCharges
    //     config.set((err,result)=>{
    //         if(err) res.send(err)
    //         console.log(result)
    //         console.log('guardamos')
    //         res.json(result)
    //     })
    // })


})

module.exports = router;