import {remote} from 'electron';

var jQuery = require('jquery');

export default class {
    constructor($titleBar){
        this.$titleBar = $titleBar;
        _atttachListeners($titleBar);
    }
}

/**
 * This function will take a jquery element refrered to as the
 * title bar, and attach the required listeers to them. At this point
 * this should really only be the window control.
 */
function _atttachListeners($titleBar){
    var $windowOperations = $titleBar.find('.window-operations');
    var $closeButton = $windowOperations.find('.close');
    var $maximizeButton = $windowOperations.find('.maximize');
    var $minimizeButton = $windowOperations.find('.minimize');

    //Below attached event listeners.
    $closeButton.click(_close);
    $maximizeButton.click(_maximize);
    $minimizeButton.click(_minimize);


}

/**
 * This function will close the current window when called
 */
function _close(){
    var window = remote.getCurrentWindow();
    window.close();
}

/**
 * This function maximize the current window when called.
 */
function _maximize(){
    var window = remote.getCurrentWindow();
    if(!window.isMaximized()){
        window.maximize();
    } else {
        window.unmaximize();
    }
}

/**
 * This function will minimize the current window when called.
 */
function _minimize(){
    var window = remote.getCurrentWindow();
    window.minimize();
}