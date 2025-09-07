module.exports = {
  // 项目名称
  name: 'zcst-website',
  
  // 项目描述
  description: '珠海科技学院学校简介静态网站',
  
  // 部署配置
  deploy: {
    // 部署类型：静态网站
    type: 'static',
    
    // 静态文件目录
    dir: './',
    
    // 入口文件
    entry: 'index.html',
    
    // 忽略文件
    ignore: [
      'node_modules',
      'package-lock.json',
      'cloudstudio.config.js',
      'README.md',
      '.vscode'
    ]
  },
  
  // 构建命令
  build: 'echo "No build step required"',
  
  // 启动命令
  start: 'node server.js'
};