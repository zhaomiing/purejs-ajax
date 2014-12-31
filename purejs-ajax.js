/*!
 * @desc 原生ajax
 * @author zhaoming.me#gmail.com
 * @date 2015-12-31
 */

(function (win, undefined) {
    var defaults = {
        url : '',
        type : 'GET',
        data : null,
        async : true,
        onsuccess : _donothin,
        onerror : _donothin
    };

   /**
    * 构造函数
    * @param object 配置对象
    * @version 1.0
    * 2015-12-31
    */
    function Ajax (option) {
        if(_type(option) === 'object') {
            var option = _extend(defaults, option);

            this.option = option;
            this._init();
        }
    }

    Ajax.prototype = {
        constructor : Ajax,
        _init : function () {
            var option = this.option;

            this.xhr = this._createXHR();
            this._setCallback();
            this.xhr.open(option.type, option.url ,option.async);

            return this;
        },

        send : function () {
            var xhr = this.xhr,
                option = this.option;

            xhr.send(option.data);
        },

        /**
         * 设置回调
         * @param 
         * @version 1.0
         * 2015-12-31
         */
         _setCallback : function () {
            var that = this,
                xhr = this.xhr,
                option = this.option;

            xhr.onreadystatechange = function () {
                // 请求完成
                if(xhr.readyState === 4) {
                    // 请求成功
                    if(xhr.status >= 200 && xhr.status <=300 || xhr.stauts === 304) {
                        option.onsuccess.call(that, xhr.responseText);
                    }
                    // 请求失败
                    else{
                        option.onerror.call(that);
                    } 
                }
            }
         },

        _createXHR : function () {
            /** 标准的XMLHttpRequest对象 */
            if(typeof XMLHttpRequest !== 'undefined') {
                return new XMLHttpRequest ();
            }
            /** ie6 */
            else if (typeof ActiveXObject !== 'undefined') {
                if(typeofarguments.callee.acitiveXString !== 'string'){
                    var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                    i, l;

                    for (i = 0, l = versions.length; i < l; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.acitiveXString = versions[i];
                            break;
                        }catch(err) {
                            _donothin();
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.acitiveXString);
            }
            /** 没有合适的XHR对象 */
            else{
                throw new Error('没有合适的XHR对象');
            }
        },

    };

    /**
     * 合并两个对象
     * @param object 原始对象
     * @param object 覆盖对象
     * @return object 合并结果
     * @version 1.0
     * 2015-12-31
     */
    function _extend (o1, o2) {
        var ret = {},
            args = [].slice.call(arguments, 0),
            i, j, l;

        for (j = 0, l = args.length; j < l; j++) {
            for (i in args[j]) {
                if(args[j].hasOwnProperty(i)) {
                    ret[i] = args[j][i];
                }
            }
        }

        return ret;
    }

    /**
    * 打酱油 
    * @version 1.0
    * 2015-12-31
    */
    function _donothin () {}

   /**
    * 判断对象类型
    * @param *
    * @return {string} 类型字符串
    * @version 1.0
    * 2015-12-31
    */
    function _type (obj) {
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
    }

    // 向外绑定
    win.Ajax = Ajax;
})(window);