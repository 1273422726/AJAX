### AJAX 简介

AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 JS 和 XML。
通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势:无刷新获取数据。
AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

### XML 简介

1.XML 可扩展标记语言。
2.XML 被设计用来传输和存储数据。
3.XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签,全都是自定义标签，用来表示一些数据

比如我有一个学生数据：
{"name":"孙悟空","age":18,"gender":"男"}

用 XML 表示：
<student>
<name>孙悟空</name>
<age>18</age>
<gender>男</gender>
</student>

现在已经被 JSON 取代
{"name":"孙悟空","age":18,"gender":"男"}

### AJAX 优缺点

优点： 1.可以呒需刷新页面而与服务器端进行通信。 2.允许你根据用户事件来更新部分页面内容。
缺点：1.没有浏览历史，不能回退 。2.存在跨域问题(同源)。3.SEO 不友好

### 2. HTTP 协议请求与响应文本结构

HTTP 基础 https://blog.csdn.net/weixin_40603062/article/details/125865642?spm=1001.2014.3001.5502

HTTP (hypertext transport protocol) 协议「超文本传输协议」，协议详细规定了浏览器和万维网服务器之间互相通信的规则。

### 请求报文

1. 请求行
   method url
   GET /product_detail?id=2
   POST /login
2. 多个请求头
   Host: www.baidu.com
   Cookie: BAIDUID=AD3B0FA706E; BIDUPSID=AD3B0FA706;
   Content-Type: application/x-www-form-urlencoded 或者 application/json
3. 空格
4. 请求体
   username=admin&password=admin
   {"username": "admin", "password": "admin"}

### 响应报文

1. 响应状态行: status statusText
2. 多个响应头
   Content-Type: text/html;charset=utf-8
   Content-length: 2048
   Content-encoding: gzip
3. 空格
4. 响应体
   html 文本/json 文本/js/css/图片...

### 常见请求响应状态码

200 OK 请求成功。一般用于 GET 与 POST 请求
201 Created 已创建。成功请求并创建了新的资源
401 Unauthorized 未授权/请求要求用户的身份认证
404 Not Found 服务器无法根据客户端的请求找到资源
500 Internal Server Error 服务器内部错误，无法完成请求

### 不同类型的请求及其作用

GET: 从服务器端读取数据（查）
POST: 向服务器端添加新数据 （增）
PUT: 更新服务器端已经数据 （改）
DELETE: 删除服务器端数据 （删）

### 区别 HTTP 请求 与 AJAX 请求

AJAX 请求 是一种特别的 HTTP 请求
对服务器端来说, 没有任何区别, 区别在浏览器端
浏览器端发请求: 只有 XHR 或 fetch 发出的才是 AJAX 请求, 其它所有的都是非 AJAX 请求
浏览器端接收到响应
(1) 一般请求: 浏览器一般会直接显示响应体数据, 也就是我们常说的刷新/跳转页面
(2) AJAX 请求: 浏览器不会对界面进行任何更新操作, 只是调用监视的回调函数并传入响应相关数据

## 解决 IE 缓存问题

问题：在一些浏览器中(IE),由于缓存机制的存在，ajax 只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。
解决方式：浏览器的缓存是根据 url 地址来记录的，所以我们只需要修改 url 地址即可避免缓存问题

xhr.open('GET', 'http://127.0.0.1:8000/ie?t=' + Date.now()); //Date.now() 获取当前时间挫，这样游览器就会认为你是二次请求，就不会走本地缓存

### AJAX 请求状态

xhr.readyState 可以用来查看请求当前的状态

0: 表示 XMLHttpRequest 实例已经生成，但是 open()方法还没有被调用
1: 表示 send()方法还没有被调用，仍然可以使用 setRequestHeader()，设定 HTTP 请求的头信息
2: 表示 send()方法已经执行，并且头信息和状态码已经收到
3: 表示正在接收服务器传来的 body 部分的数据
4: 表示服务器数据已经完全接收，或者本次接收已经失败了

### API 总结

XMLHttpRequest()：创建 XHR 对象的构造函数
status：响应状态码值，如 200、404
statusText：响应状态文本，如 ’ok‘、‘not found’
readyState：标识请求状态的只读属性 0-1-2-3-4
onreadystatechange：绑定 readyState 改变的监听
responseType：指定响应数据类型，如果是 ‘json’，得到响应后自动解析响应
response：响应体数据，类型取决于 responseType 的指定
timeout：指定请求超时时间，默认为 0 代表没有限制
ontimeout：绑定超时的监听
onerror：绑定请求网络错误的监听
open()：初始化一个请求，参数为：(method, url[, async])
send(data)：发送请求
abort()：中断请求 （发出到返回之间）
getResponseHeader(name)：获取指定名称的响应头值
getAllResponseHeaders()：获取所有响应头组成的字符串
setRequestHeader(name, value)：设置请求头

### jQuery 中的 AJAX

1. get 请求
   $.get(url, [data], [callback], [type]), 如下：
   $('button').eq(0).click(function () {
   $.get('http://127.0.0.1:8000/jquery-sever', { a: 100, b: 200 }, function (data) {
   console.log(data)
   }, 'json')
   })
   url:请求的 URL 地址
   data:请求携带的参数
   callback:载入成功时回调函数
   type:设置返回内容格式，xml, html, script, json, text, \_default

2. post 请求
   $.post(url, [data], [callback], [type]), 如下：
   $('button').eq(1).click(function () {
   $.post('http://127.0.0.1:8000/jquery-sever', { a: 100, b: 200 }, function (data) {
   console.log(data)
   })
   })
   url:请求的 URL 地址
   data:请求携带的参数
   callback:载入成功时回调函数
   type:设置返回内容格式，xml, html, script, json, text, \_default

3. 通用方法
   $('button').eq(2).click(function () {
   $.ajax({
   //url
   url: 'http://127.0.0.1:8000/jquery-sever',
   //参数
   data: { a: 100, b: 200 },
   //请求类型
   type: 'GET',
   //响应体结果
   dataType: 'json',
   //成功的回调
   success: function (data) {
   console.log(data)
   },
   //失败的回调
   error: function (data) {
   console.log("出错了")
   },
   //超时时间
   timeout: 2000,
   //头信息
   headers: {
   c: 300,
   d: 400
   }
   })
   })

### 同源策略

同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略
同源： 协议、域名、端口号必须完全相同
跨域： 违背同源策略就是跨域

## 解决跨域问题

# 1.JSONP

1. JSONP 是什么?
   JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持 get 请求。

2. JSONP 怎么工作的?
   在网页有一些标签天生具有跨域能力，比如：img link iframe script。
   JSONP 就是利用 script 标签的跨域能力来发送请求的。

3) JSONP 的使用

//1.创建 script 标签
const script = document.createElement('script');
//2.设置标签的 src 属性
script.src = "http://127.0.0.1:8000/check-username";
//3.将 script 插入到文档中
document.body.appendChild(script) 4. 服务器中路由的处理
app.all("/check-username", (request, response) => {
// 响应一个数据
const data = {
exist: 1,
msg: "用户名已经存在",
};
// 对 对象 进行 字符串 转换
let str = JSON.stringify(data);
// 设置响应体
// response.send("console.log('JSONp')");
response.end(`handle(${str})`);
});

4.  jQuery 中的 JSONP
    <!DOCTYPE html>
       <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>jQuery 发送JSONp</title>
        <style>
            #result {
                width: 200px;
                height: 100px;
                border: solid 1px #90b;
            }
        </style>
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
    </head>
    <body>
        <!-- <h1>JSONP</h1> -->
        <button>点击发送jsonp请求</button>
        <div id="result">

        </div>
        <script>
            $('button').eq(0).click(function () {
                $.getJSON('http://127.0.0.1:8000/jQuery-JSONp-sever?callback=?', function (data) {
                    $('#result').html(`
                        名称：${data.name}<br/>
                        城市：${data.city}
                    `);
                })
            });
        </script>

    </body>
    </html>

# 2. CORS

1. CORS 是什么？
   CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方
   案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 请求。
   跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源

2. CORS 怎么工作的？
   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应,以后就会对响应放行。

3. CORS 的使用
   主要是服务器端的设置：
   router.get("/testAJAX" , function (req , res) {
   //通过 res 来设置响应头，来允许跨域请求
   //res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");
   res.set("Access-Control-Allow-Origin","\*");
   res.send("testAJAX 返回的响应");
   });
