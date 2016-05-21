import {Observable} from 'data/observable';
import DDPClient = require('nativescript-ddp-client');
var login = require('nativescript-ddp-login').DPPLogin;
export class HelloWorldModel extends Observable {
  ddpclient;
  constructor() {
    super();

    this.ddpclient = new DDPClient({
      // All properties optional, defaults shown 
      host: "192.168.2.5",
      port: 3000,
      ssl: false,
      autoReconnect: false,
      autoReconnectTimer: 15000,
      maintainCollections: true,
      ddpVersion: '1',  // ['1', 'pre2', 'pre1'] available 
      // uses the SockJs protocol to create the connection 
      // this still uses websockets, but allows to get the benefits 
      // from projects like meteorhacks:cluster 
      // (for load balancing and service discovery) 
      // do not use `path` option when you are using useSockJs 
      useSockJs: true,
      // Use a full url instead of a set of `host`, `port` and `ssl` 
      // do not set `useSockJs` option if `url` is used 
      //url: 'wss://example.com/websocket'
    });



    this.ddpclient.connect((error, wasReconnect) => {
      // If autoReconnect is true, this callback will be invoked each time 
      // a server connection is re-established 
      if (error) {
        console.log('DDP connection error!');
        return;
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');
      
      login.loginWithUsername(this.ddpclient, 'triniwiz', '1234', { plaintext: true }, (err, user) => {
        console.dump(user)
      })


    });



  }
}