const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// 提供静态文件服务
app.use(express.static(path.join(__dirname)));

// 处理所有路由，返回index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 处理404错误
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('按 Ctrl+C 停止服务器');
  console.log('网站已准备好部署到CloudStudio');
});