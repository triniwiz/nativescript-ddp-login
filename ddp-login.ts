
var DDP = require('nativescript-ddp-client');
var jsSHA = require("jssha");
var slice = [].slice;
export class DDPLogin {

  private plaintextToDigest(pass) {
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(pass);
    return shaObj.getHash("HEX");
  };

  private isEmail(addr) {
    var m, matchEmail;
    if (typeof addr !== 'string') {
      return false;
    }
    matchEmail = /^[^@]+@[^@]+\.[^@]+$/i;
    m = addr.match(matchEmail);
    return m !== null;
  };

  private attemptLogin(ddp, user, pass, options, cb) {
    var digest;
    digest = this.plaintextToDigest(pass);
    return ddp.call('login', [
      {
        user: user,
        password: {
          digest: digest,
          algorithm: 'sha-256'
        }
      }
    ], (err, res) => {
      var details, e, srpDigest;
      if (!(err && err.error === 400)) {
        if (err) {
          console.error('Login failed:', err.message);
        }
        return cb(err, res);
      }
      if (err.reason === 'old password format') {
        console.error('Old Meteor SRP (pre-v0.8.2) account detected. Attempting to migrate...');
        try {
          details = JSON.parse(err.details);
        } catch (_error) {
          e = _error;
          return cb(err);
        }
        srpDigest = this.plaintextToDigest(details.identity + ":" + pass);
        return ddp.call('login', [
          {
            user: user,
            srp: srpDigest,
            password: {
              digest: digest,
              algorithm: 'sha-256'
            }
          }
        ], cb);
      } else if (options.plaintext) {
        return ddp.call('login', [
          {
            user: user,
            password: pass
          }
        ], (err, res) => {
          if (err) {
            console.error('Login failed: ', err.message);
          }
          return cb(err, res);
        });
      } else {
        return cb(err, res);
      }
    });
  };


  loginWithUsername(...args: any[]) {
    let ddp = args[0];
    let username = args[1];
    let password = args[2];
    let options;
    let cb;
    if (typeof args[3] === 'function') {
      options = {};
      options['plaintext'] = false;
      cb = args[3];
    } else if (typeof args[3] === 'object') {
      options = args[3];
      cb = args[4];
    }


    if (typeof cb !== 'function') {
      throw new Error('Valid callback must be provided to ddp-login');
    }
    if (!(((ddp != null ? ddp.call : void 0) != null) && ((ddp != null ? ddp.connect : void 0) != null) && ((ddp != null ? ddp.close : void 0) != null))) {
      return cb(new Error('Invalid DDP parameter'));
    }

    return this.attemptLogin(ddp, { username: username }, password, options, cb);
  };

  loginWithEmail(...args: any[]) {
    let ddp = args[0];
    let email = args[1];
    let password = args[2];
    let options;
    let cb;
    if (typeof args[3] === 'function') {
      options = {};
      options['plaintext'] = false;
      cb = args[3];
    } else if (typeof args[3] === 'object') {
      options = args[3];
      cb = args[4];
    }

    return this.attemptLogin(ddp, { email: email }, password, options, cb);
  };

  loginWithAccount(...args: any[]) {

    let ddp = args[0];
    let account = args[1];
    let password = args[2];
    let options;
    let cb;
    if (typeof args[3] === 'function') {
      options = {};
      options['plaintext'] = false;
      cb = args[3];
    } else if (typeof args[3] === 'object') {
      options = args[3];
      cb = args[4];
    }

    if (this.isEmail(account)) {
      return this.loginWithEmail(ddp, account, password, options, (err, tok) => {
        if (!(err && err.error === 400)) {
          return cb(err, tok);
        }
        return this.loginWithUsername(ddp, account, password, options, cb);
      });
    } else {
      return this.loginWithUsername(ddp, account, password, options, cb);
    }
  };

  loginWithToken(ddp, token, cb) {
    return ddp.call('login', [
      {
        resume: token
      }
    ], cb);
  };

}
