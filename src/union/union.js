import TitleBar from './titleBar/titleBar.js';
var jQuery = require('jquery');

export default class {
    constructor($el){
        var $titleBar = this.getTitleBar($el);
        _attachTitleBar($titleBar);
    }

    getTitleBar($el){
        return $el.find('.header .title-bar');
    }
}


/**
 * This function will create the titleBar
 * class so that certin listeners can be placed
 * on it.
 */
function _attachTitleBar($titleBar){
    var titleBar = new TitleBar($titleBar);
    return titleBar;
}