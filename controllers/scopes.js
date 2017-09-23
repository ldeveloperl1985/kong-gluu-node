const express = require('express');
const random = require('randomstring');
const router = express.Router();

const ldap = require('../ldap/ldap-helper');

router.get('/scopes', (req, res) => {
  ldap.scopeService.getAllScope(function (result) {
    return res.send(result);
  });
});

router.post('/scopes', (req, res) => {
  ldap.scopeService.updateScope(req.body, function (result) {
    return res.send(result);
  });
});

module.exports = router;