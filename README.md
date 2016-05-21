#Installation


```js
tns plugin add https://github.com/triniwiz/nativescript-ddp-client
tns plugin add nativescript-ddp-login
```

```js
var DDPClient = require('nativescript-ddp-client');
import {DPPLogin} from 'nativescript-ddp-login';

var token = null;

// Resume login with valid token from previous login
DPPLogin.loginWithToken(ddpClient, token,(err, userInfo)=>{
  if (err) throw err;
  token = userInfo.token;
});

// Login using a username
DPPLogin.loginWithUsername(ddpClient, user, pass,(err, userInfo) =>{
  if (err) throw err;
  token = userInfo.token;
});

// Login using an email address
DPPLogin.loginWithEmail(ddpClient, email, pass, (err, userInfo)=>{
  if (err) throw err;
  token = userInfo.token;
});

// Login using either a username or email address
DPPLogin.loginWithAccount(ddpClient, userOrEmail, pass, (err, userInfo)=>{
  if (err) throw err;
  token = userInfo.token;
});
```