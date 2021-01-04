const path = require('path')
const nodemailer = require('nodemailer')

const smtpTransport = require('nodemailer-smtp-transport')
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('./mail.json')

const transport = nodemailer.createTransport(smtpTransport({
  host, 
  port,
  auth: { user, pass },
}));

module.exports = transport