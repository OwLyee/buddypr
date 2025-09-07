# 珠海科技学院学校简介静态网站

这是珠海科技学院学校简介页面的静态网站版本，基于原网站 https://www.zcst.edu.cn/xxjj/list.htm 进行开发。

## 项目结构

```
/
├── index.html          # 主页面
├── css/                # 样式文件
│   └── style.css       # 主样式表
├── js/                 # JavaScript文件
│   └── script.js       # 主脚本文件
└── images/             # 图片资源
```

## 部署说明

### 本地预览

1. 克隆或下载此仓库到本地
2. 使用浏览器直接打开 `index.html` 文件即可预览

### 在线部署

#### 方法一：使用GitHub Pages

1. 在GitHub上创建一个新仓库
2. 将所有文件上传到该仓库
3. 在仓库设置中启用GitHub Pages功能
4. 选择主分支作为源
5. 保存设置后，网站将在几分钟内上线

#### 方法二：使用Netlify

1. 注册并登录[Netlify](https://www.netlify.com/)
2. 点击"New site from Git"
3. 选择您的Git提供商并授权Netlify访问
4. 选择包含网站文件的仓库
5. 保持默认设置并点击"Deploy site"
6. 几分钟后，您的网站将上线

#### 方法三：使用Vercel

1. 注册并登录[Vercel](https://vercel.com/)
2. 点击"New Project"
3. 导入您的Git仓库
4. 保持默认设置并点击"Deploy"
5. 几分钟后，您的网站将上线

## 自定义说明

### 图片资源

当前网站使用了占位图片。要使用真实的学校图片，请替换以下文件：

- `images/logo.png` - 学校校徽
- `images/logo-white.png` - 页脚使用的白色校徽
- `images/banner.jpg` - 顶部横幅图片

### 内容更新

要更新网站内容，请编辑 `index.html` 文件中的相应部分。主要内容位于 `<div class="article-content">` 标签内。

## 浏览器兼容性

本网站兼容以下浏览器的最新版本：

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## 许可证

本项目仅用于学习和演示目的。所有内容版权归珠海科技学院所有。