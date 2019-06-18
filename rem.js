var win = window;
var doc = win.document;
var psdWidth = 750;  //设计稿的全屏宽度
var tid;
var throttleTime = 100;
var metaEl = doc.querySelector('meta[name="viewport"]');
if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
}
metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1');

var resizeRem = function () {
    //自己针对chrome浏览器做的调整添加, 同时要配合在chrome浏览器时body的最小宽度设置为1360
    var ww=window.innerWidth;
    if(navigator.userAgent.indexOf("Chrome")>-1){
        if(ww<1360){ww=1360}
    }
    //以下为原来的
    doc.documentElement.style.fontSize = ww / psdWidth * 100 + 'px';  //其中的100表示rem 和px 的换算比

};

win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(resizeRem, throttleTime);
}, false);
win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(resizeRem, throttleTime);
    }
}, false);

resizeRem();
if (doc.readyState === 'complete') {
    resizeRem();
} else {
    doc.addEventListener('DOMContentLoaded', function (e) {
        resizeRem();
    }, false);
}
