#Installation


```js
tns plugin add https://github.com/triniwiz/nativescript-ddp-client
tns plugin add nativescript-ddp-login
```

```js
var DDPClient = require('nativescript-ddp-client');
var DDPLogin = require('nativescript-ddp-login');

var login = new DDPLogin();
    

var token = null;

// Resume login with valid token from previous login
login.loginWithToken(ddpClient, token,(err, userInfo)=>{
  if (err) throw err;
  token = userInfo.token;
});

// Login using a username
login.loginWithUsername(ddpClient, user, pass,(err, userInfo) =>{
  if (err) throw err;
  token = userInfo.token;
});

// Login using an email address
login.loginWithEmail(ddpClient, email, pass, (err, userInfo)=>{
  if (err) throw err;
  token = userInfo.token;
});

// Login using either a username or email address
login.loginWithAccount(ddpClient, userOrEmail, pass, (err, userInfo)=>{
  if (err) throw err;
  token = userInfo.token;
});
```