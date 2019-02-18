function runQueue(queue, fn, end) {
    const step = function (index) {
        if (index >= queue.length) {
            end()
        } else if (queue[index]) {
            fn(queue[index], () => step(index + 1))
        } else {
            step(index + 1)
        }
    };
    if (queue) {
        step(0)
    } else {
        end()
    }
}

function getUrl(uid) {
    return ['http://www.shandianji.com.cn/index/share/share_download?uid=', uid, '&type=3'].join('')
}


var uids = [430040, 526545]

// var iframe = document.getElementById('iframe')
var message = document.getElementById('message')
var win = null
runQueue(uids, function (uid, next) {
    var url = getUrl(uid)
    message.innerText = '开始分享：' + url
    // iframe.onload = function () {
    //     message.innerText = iframe.getAttribute('src') + '\n执行结束，准备分享：' + uid
    //     setTimeout(next, 3000)
    // };
    // iframe.setAttribute('src', '')
    // iframe.setAttribute(
    //     'src',
    //     ['http://www.shandianji.com.cn/index/share/share_download?uid=', uid, '&type=3'].join('')
    // )
    win = window.open(url);
    setTimeout(function () {
        win && win.close()
        next()
    }, 1000)
}, function () {
    message.innerText = '执行完毕'
})
