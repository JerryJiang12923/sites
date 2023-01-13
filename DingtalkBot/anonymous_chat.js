const crypto = require('crypto');
const url = require('url');

const timestamp = Date.now();
const secret = 'SEC5ad60a15533661cf7ce45975e3526b0aea6c67a0cc6a355b709048ac19f1c148';
const stringToSign = `${timestamp}\n${secret}`;
const hmacCode = crypto.createHmac('sha256', secret).update(stringToSign).digest('base64');
const sign = encodeURIComponent(hmacCode);

const headers = { 'Content-Type': 'application/json' };
const webhook = `https://oapi.dingtalk.com/robot/send?access_token=6d0e74b36ef1be722eef7f3d1b632202eaaf910f05b2599838905756ef9ceeb9&timestamp=${timestamp}&sign=${sign}`;

function help() {
    console.log('----Help----');
    console.log('欢迎使用匿名聊天室。');
    console.log('输入#$help获得帮助。');
    console.log('输入#$quit退出系统。');
    console.log('别的功能（比如@别人和发送图片之类的）我还在写。');
    console.log('以后可能会出。');
}

let cycle = 1;
let msg = '';

console.log('欢迎使用匿名聊天室。');
console.log('输入#$help获得帮助。');

while (cycle === 1) {
    msg = prompt('>>>');
    if (msg === '#$help') {
        help();
    } else if (msg === '#$quit') {
        cycle = 0;
    } else {
        const data = {
            msgtype: 'text',
            text: { content: msg },
            isAtAll: true
        };
        fetch(webhook, { method: 'POST', body: JSON.stringify(data), headers })
            .then(res => res.json())
            .then(console.log)
            .catch(console.error);
    }
}
