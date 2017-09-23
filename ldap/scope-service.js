/**
 * Provides LDAP operations with devices.
 *
 * Author: Meghna Joshi Date: 15/09/2017
 */
var util = require('util');
function ScopeService(ldapClient) {
  this.ldapClient = ldapClient;
}

module.exports = ScopeService;

ScopeService.prototype.getAllScope = function containsScopeId(callback) {
  var scopeDn = this.ldapClient.getDn('ou=scopes,ou=uma');
  this.ldapClient.search(scopeDn, '&(objectClass=oxAuthUmaScopeDescription)', [], 'sub', 0,
    function (entries) {
      if (entries == null) {
        return callback && callback(null);
      }
      return callback(entries);
    });
};

ScopeService.prototype.updateScope = function updateScope(scope, callback) {

  var scriptDn = this.ldapClient.getDn('ou=scripts', 'inum=' + scope.scriptInum);

  var attrs = {
    oxPolicyScriptDn: scriptDn,
  };

  var cnt = 0;
  scope.scopeInums.forEach(inum => {
    var scopeDn = this.ldapClient.getDn('ou=scopes,ou=uma', 'inum=' + inum);
    this.ldapClient.modify(scopeDn, 'replace', attrs, function (result) {
      cnt++;
      if (cnt == scope.scopeInums.length) {
        callback && callback(result);
      }
    });
  });
};