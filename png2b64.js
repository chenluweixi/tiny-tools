// ┏┛┻━━━┛┻┓
// ┃｜｜｜｜｜｜｜┃
// ┃　　　━　　　┃
// ┃　┳┛ 　┗┳ 　┃
// ┃　　　　　　　┃
// ┃　　　┻　　　┃
// ┃　　　　　　　┃
// ┗━┓　　　┏━┛
// 　　┃　史　┃　　
// 　　┃　诗　┃　　
// 　　┃　之　┃　　
// 　　┃　宠　┃
// 　　┃　　　┗━━━┓
// 　　┃经验与我同在　┣┓
// 　　┃攻楼专用宠物　┃
// 　　┗┓┓┏━┳┓┏┛
// 　　　┃┫┫　┃┫┫
// 　　　┗┻┛　┗┻┛



var fs = require('fs');
var readline = require('readline');


var pngDir = './pngDir';
var b64Json = [];
var fileLength = -1;


function hello(tips) {

    var response;
    tips = tips || '>';
    new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        })
    }).then((res) => {
        pngDir = res.trim();
        readPng();
    })

    // process.stdout.write(tips);
    // process.stdin.pause();
    // var buffer = Buffer.allocUnsafe(10000);
    // response = fs.readSync(0, buffer, 0, 10000, 0);
    // process.stdin.end();
    // response = buffer.toString('utf8', 0, response);

}

function readPng() {


    console.log('read Path:' + pngDir);
    fs.readdir(pngDir, function(err, files) {
        if (err) {
            throw err;
        }
        console.log('total files:' + files.length);
        fileLength = files.length;
        if (files.length > 0) {

            var i = 0;
            for (const key in files) {
                if (files.hasOwnProperty(key)) {
                    const file = files[key];
                    readFile2B64(file, i);


                    i++;
                }
            }
        }

    })
};

function readFile2B64(file, i) {

    console.log('ready to transform __' + file + '__ file to base64.');
    fs.readFile(pngDir + '/' + file, function(err, data) {
        if (err) {
            throw err;
        }
        let b64 = data.toString("base64");
        b64Json.push({
            n: file,
            f: 'data:image/png;base64,' + b64
        });
        console.log('transform  __' + file + '__ success.');
        if (i == fileLength - 1) {
            //开始写入 B64文件
            writeCfig2txt(b64Json);
        }
    })
}

function writeCfig2txt(data) {
    var wd = obj2Str(data);
    fs.writeFile(pngDir + '/config.json', wd, function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件写入成功！路径:" + pngDir + "/config.json");
    });

}

function obj2Str(data) {
    var m = '[{';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const e = data[key];
            m += '\"' + e.n + '\":\"' + e.f + '\",';
        }
    }
    m = m.substring(0, m.length - 1);
    return m += '}]';
}

hello("输入文件夹路径：");