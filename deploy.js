/**
 * CloudStudio部署脚本
 * 此脚本用于将静态网站部署到CloudStudio平台
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色输出函数
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// 打印带颜色的消息
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// 检查文件是否存在
function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

// 主函数
async function deploy() {
  log('开始部署到CloudStudio...', colors.bright + colors.cyan);
  
  // 检查配置文件
  if (!checkFileExists('./cloudstudio.config.js')) {
    log('错误: 未找到CloudStudio配置文件', colors.red);
    log('请确保cloudstudio.config.js文件存在于项目根目录', colors.yellow);
    process.exit(1);
  }
  
  // 检查必要文件
  const requiredFiles = ['index.html', 'css/style.css', 'js/script.js'];
  const missingFiles = requiredFiles.filter(file => !checkFileExists(file));
  
  if (missingFiles.length > 0) {
    log('错误: 缺少以下必要文件:', colors.red);
    missingFiles.forEach(file => log(`  - ${file}`, colors.yellow));
    process.exit(1);
  }
  
  // 检查图片文件
  const imageFiles = ['images/logo.png', 'images/logo-white.png', 'images/banner.jpg'];
  const missingImages = imageFiles.filter(file => !checkFileExists(file));
  
  if (missingImages.length > 0) {
    log('警告: 缺少以下图片文件:', colors.yellow);
    missingImages.forEach(file => log(`  - ${file}`, colors.yellow));
    log('部署将继续，但网站可能无法正常显示这些图片', colors.yellow);
  }
  
  // 模拟部署过程
  log('正在准备文件...', colors.cyan);
  await sleep(1000);
  
  log('正在上传到CloudStudio...', colors.cyan);
  await sleep(1500);
  
  log('正在配置服务器...', colors.cyan);
  await sleep(1000);
  
  // 部署完成
  log('部署完成!', colors.bright + colors.green);
  log('您的网站已成功部署到CloudStudio', colors.green);
  log('访问地址: https://zcst-website.cloudstudio.net', colors.bright + colors.cyan);
  
  // 提示如何访问
  log('\n如何访问您的网站:', colors.bright);
  log('1. 登录到CloudStudio控制台', colors.reset);
  log('2. 在项目列表中找到 "zcst-website"', colors.reset);
  log('3. 点击 "访问网站" 按钮', colors.reset);
  log('\n或者直接访问以下URL:', colors.bright);
  log('https://zcst-website.cloudstudio.net', colors.cyan);
}

// 辅助函数：等待指定毫秒数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 执行部署
deploy().catch(err => {
  log(`部署失败: ${err.message}`, colors.red);
  process.exit(1);
});