// 1. 引入express
const express = require("express");

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
app.get("/server", (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应体
  response.send("Hello Ajax--GET");
});

//设置响应头允许自定义请求头 post改成all   all 表示可以允许任何请求方式，如get,post等等
app.all("/server", (request, response) => {
  // 设置响应头 设置允许跨域   只允许预定义的请求头访问
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应头 不管自定义还是预定义的请求头都可以访问
  response.setHeader("Access-Control-Allow-Headers", "*");

  // 设置响应体
  response.send("Hello Ajax--POST");
});

app.all("/json-server", (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应头, 设置允许自定义头信息
  response.setHeader("Access-Control-Allow-Headers", "*");
  // 响应一个数据
  const data = {
    name: "atguigu",
  };
  // 对 对象 进行 字符串 转换
  let str = JSON.stringify(data);
  // 设置响应体
  response.send(str);
});

app.get("/ie", (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");

  // 设置响应体
  response.send("Hello,IE - 2");
});

//延迟响应
app.get("/delay", (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应体
  setTimeout(() => {
    response.send("Hello,AJAX 延迟响应");
  }, 2000);
});

//jQuery 服务
app.all("/jquery-sever", (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Headers", "*");

  const data = { name: "啊啊啊" };
  // 设置响应体
  // response.send("Hello,jQuery AJAX");
  response.send(JSON.stringify(data));
});

//axios 服务
app.all("/axios-server", (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");

  // 设置响应体
  response.send("Hello,axios!");
});

//fetch 服务
app.all("/fetch-server", (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  // 响应一个数据
  const data = {
    name: "atguigu",
  };
  // 对 对象 进行 字符串 转换
  let str = JSON.stringify(data);
  // 设置响应体
  response.send(str);
});

//Jsonp 服务
app.all("/jsonp-server", (request, response) => {
  // 设置响应头, 设置允许跨域
  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Headers", "*");
  // 响应一个数据
  const data = {
    name: "hello JSONP",
  };
  // 对 对象 进行 字符串 转换
  let str = JSON.stringify(data);
  // 设置响应体
  // response.send("console.log('JSONp')");
  response.end(`handle(${str})`);
});

//Jsonp 实践
app.all("/check-username", (request, response) => {
  // 设置响应头, 设置允许跨域
  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Headers", "*");
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

//jQuery 发送JSONp
app.all("/jQuery-JSONp-sever", (request, response) => {
  // 设置响应头, 设置允许跨域
  // response.setHeader("Access-Control-Allow-Origin", "*");
  // response.setHeader("Access-Control-Allow-Headers", "*");
  // 响应一个数据
  const data = {
    name: "aaaa",
    city: ["北京", "上海", "广州", "CS"],
  };
  // 对 对象 进行 字符串 转换
  let str = JSON.stringify(data);
  //接收callback 参数
  let cb = request.query.callback;
  // 设置响应体
  response.end(`${cb}(${str})`);
});

//cors 服务
app.all("/cors-sever", (request, response) => {
  //  设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Method", "*");
  // 设置响应体
  response.end("Hello,CORS");
});

// 4. 监听服务
app.listen(8000, () => {
  console.log("服务已经启动, 8000 端口监听中...");
});
