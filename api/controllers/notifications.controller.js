const express = require("express");
const config = require('config.json');
const routes = express.Router();
const authorize = require('_middleware/authorize');

const notificationsPrint = require('../models/notification.model');

var currentConfig;
switch (process.env.NODE_ENV) {
    case "PROD": currentConfig = config['PROD']; break;
    case "QA": currentConfig = config['QA']; break;
    case "DEV": currentConfig = config['DEV']; break;
    default: currentConfig = config['PROD']; break;
}

routes.get("/", authorize(), (req, res, next) => {
    notificationsPrint.find({ usuario: req.user.id, visto: false }).then(notificaciones => {
        res.status(200).send(notificaciones);
    }).catch(err => {
        res.status(400).send(err);
    })
});

routes.post("", authorize(), (req, res, next) => {
    const body = req.body;
    insertNotification(body.usuario, body.color, body.icon, body.title, body.routerLink).then(notificacion => {
        res.status(200).send();
    }).catch(err => {
        res.status(400).send(err);
    })
});

routes.put("/:id", authorize(), (req, res, next) => {
    notificationsPrint.findById(req.params.id).then(notificacion => {
        notificacion.visto = true;
        notificacion.updated = new Date();
        notificacion.save().then(result => {
            res.status(200).send();
        }).catch(err => {
            res.status(400).send(err);
        })
    }).catch(err => {
        res.status(400).send(err);
    })
});

const insertNotification = (user, color, icon, title, routerLink) => new Promise((resolve, reject) => {
    const now = new Date();
    const nuevaNotif = new notificationsPrint({
        usuario: user,
        color: color,
        icon: icon,
        title: title,
        routerLink: routerLink,
        visto: false,
        created: now,
        updated: now
    });
    nuevaNotif.save().then(result => {
        resolve(true);
    }).catch(err => {
        reject(err);
    })
})

module.exports = { routes, insertNotification };