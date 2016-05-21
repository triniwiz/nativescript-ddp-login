import {Observable} from 'data/observable';
import DDPClient = require('nativescript-ddp-client');
import {DDPLogin} from 'nativescript-ddp-login';
export class HelloWorldModel extends Observable {
  ddpclient;
  ddplogin;
  constructor() {
    super();
    this.ddplogin = new DDPLogin();
    this.ddpclient = new DDPClient({
      // All properties optional, defaults shown 
      // host: "localhost",
      //  port: 3000,
      //  ssl: false,
      autoReconnect: false,
      autoReconnectTimer: 15000,
      maintainCollections: true,
      ddpVersion: '1',  // ['1', 'pre2', 'pre1'] available 
      // uses the SockJs protocol to create the connection 
      // this still uses websockets, but allows to get the benefits 
      // from projects like meteorhacks:cluster 
      // (for load balancing and service discovery) 
      // do not use `path` option when you are using useSockJs 
     // useSockJs: true,
      // Use a full url instead of a set of `host`, `port` and `ssl` 
      // do not set `useSockJs` option if `url` is used 
     url: 'ws://localhost:3000/websocket'
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


      this.ddplogin.loginWithUsername(this.ddpclient, 'triniwiz', '1234', { plaintext: true }, (err, user) => {

        this.ddpclient.call('createPost', ['{N} here'], (err, result) => {
          console.dump(err)
          console.log(result)
        })

      })


    });



  }
}