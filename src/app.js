// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';
import Union from './union/union.js';
import UnionServer from './union/unionServer/unionServer.js';


var jQuery = require('jquery');
//
jQuery(document).ready(function(){
    var $body = jQuery('body');
    var unionPane = new Union($body);
    var server = new UnionServer();

    for(var i = 0; i < 100; i++){
        server.sendMessage(i + "", "topic");
    }

    

});

 
 
