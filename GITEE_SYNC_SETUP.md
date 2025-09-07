# Gitee 自动化同步配置指南

本文档说明如何配置GitHub Actions实现GitHub到Gitee的自动化代码同步。

## 前置条件

1. GitHub仓库：https://github.com/OwLyee/buddypr
2. Gitee仓库：https://gitee.com/OwLyee/buddypr

## 配置步骤

### 方法一：使用用户名密码认证（推荐）

#### 1. 在GitHub仓库设置Secrets
1. 进入GitHub仓库 → Settings → Secrets and variables → Actions
2. 点击"New repository secret"
3. 添加以下两个secret：

**Secret 1: GITEE_USERNAME**
- Name: `GITEE_USERNAME`
- Value: 您的Gitee用户名（例如：`OwLyee`）

**Secret 2: GITEE_PASSWORD**
- Name: `GITEE_PASSWORD` 
- Value: 您的Gitee密码

#### 2. 验证配置
1. 推送代码到GitHub master分支
2. GitHub Actions会自动运行并同步到Gitee
3. 在GitHub仓库的"Actions"标签页查看运行状态

### 方法二：使用SSH密钥认证（更安全）

#### 1. 生成SSH密钥对
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@gitee-sync" -f gitee_key
```

#### 2. 配置公钥到Gitee
1. 将生成的`gitee_key.pub`内容添加到Gitee
2. 进入Gitee → 设置 → SSH公钥
3. 粘贴公钥内容，标题为"github-actions"

#### 3. 配置私钥到GitHub
1. 将`gitee_key`私钥内容复制
2. 在GitHub仓库Secrets中添加：
   - Name: `GITEE_SSH_PRIVATE_KEY`
   - Value: 私钥内容

#### 4. 修改GitHub Action配置
将工作流文件中的推送命令改为SSH方式：
```yaml
git push git@gitee.com:OwLyee/buddypr.git master:master
```

## 测试同步

1. 修改本地代码并推送到GitHub
2. 观察GitHub Actions运行状态
3. 检查Gitee仓库是否同步更新

## 故障排除

### 常见问题1：认证失败
- 检查Gitee用户名密码是否正确
- 确保Gitee账户有推送权限

### 常见问题2：权限不足
- 确认Gitee仓库是公开的或者您有写入权限

### 常见问题3：Action运行失败
- 检查GitHub Actions日志
- 确认Secrets名称拼写正确

## 安全注意事项

1. **不要**将密码或密钥提交到代码仓库
2. 定期更新密码和密钥
3. 使用最小权限原则

## 支持

如果遇到问题，请检查：
1. GitHub Actions运行日志
2. Gitee仓库的权限设置
3. 网络连接状态