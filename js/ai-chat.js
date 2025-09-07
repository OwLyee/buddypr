class AIChatSidebar {
    constructor() {
        this.isOpen = false;
        this.apiKey = ''; // 需要用户配置的API密钥
        this.apiUrl = 'https://api.moonshot.cn/v1/chat/completions';
        this.conversationHistory = [];
        
        this.init();
    }

    init() {
        this.createSidebar();
        this.bindEvents();
        this.loadConversationHistory();
    }

    createSidebar() {
        const sidebarHTML = `
            <div class="ai-chat-sidebar">
                <div class="chat-header">
                    <h3><i class="fas fa-robot"></i> Kimi AI助手</h3>
                    <button class="close-chat">&times;</button>
                </div>
                <div class="chat-messages">
                    <div class="welcome-message">
                        <p>您好！我是Kimi AI助手，很高兴为您服务。</p>
                        <p>请先设置您的API密钥以开始对话。</p>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="请输入消息..." disabled>
                    <button type="button" disabled>发送</button>
                </div>
            </div>
            <button class="ai-chat-trigger">
                <i class="fas fa-comment-dots"></i>
            </button>
        `;

        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
        
        this.sidebar = document.querySelector('.ai-chat-sidebar');
        this.triggerBtn = document.querySelector('.ai-chat-trigger');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.inputField = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.chat-input button');
    }

    bindEvents() {
        // 触发按钮点击事件
        this.triggerBtn.addEventListener('click', () => this.toggleSidebar());

        // 关闭按钮点击事件
        document.querySelector('.close-chat').addEventListener('click', () => this.closeSidebar());

        // 发送消息事件
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // 点击外部关闭侧边栏
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.sidebar.contains(e.target) && !this.triggerBtn.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // 初始化API密钥设置
        this.initApiKeySetting();
    }

    initApiKeySetting() {
        // 检查本地存储中是否有API密钥
        const savedApiKey = localStorage.getItem('kimi_api_key');
        if (savedApiKey) {
            this.apiKey = savedApiKey;
            this.enableChat();
        } else {
            this.showApiKeyPrompt();
        }
    }

    showApiKeyPrompt() {
        const apiKeyHTML = `
            <div class="api-key-prompt" style="padding: 20px; text-align: center;">
                <h4>设置API密钥</h4>
                <p>请先输入您的Kimi AI API密钥以启用聊天功能</p>
                <input type="password" id="api-key-input" placeholder="输入API密钥" 
                       style="padding: 10px; width: 80%; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="setApiKey()" 
                        style="padding: 10px 20px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    保存密钥
                </button>
            </div>
        `;

        this.messagesContainer.innerHTML = apiKeyHTML;
    }

    setApiKey() {
        const input = document.getElementById('api-key-input');
        const apiKey = input.value.trim();
        
        if (apiKey) {
            this.apiKey = apiKey;
            localStorage.setItem('kimi_api_key', apiKey);
            this.enableChat();
            this.addMessage('system', 'API密钥已设置，可以开始对话了！');
        }
    }

    enableChat() {
        this.inputField.disabled = false;
        this.sendButton.disabled = false;
        this.messagesContainer.innerHTML = '<div class="welcome-message"><p>您好！我是Kimi AI助手，有什么可以帮您的吗？</p></div>';
    }

    toggleSidebar() {
        this.isOpen = !this.isOpen;
        this.sidebar.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            this.inputField.focus();
        }
    }

    closeSidebar() {
        this.isOpen = false;
        this.sidebar.classList.remove('open');
    }

    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        // 添加用户消息
        this.addMessage('user', message);
        this.inputField.value = '';

        // 显示AI正在输入
        this.showTypingIndicator();

        try {
            const response = await this.callKimiAPI(message);
            this.hideTypingIndicator();
            this.addMessage('ai', response);
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('ai', '抱歉，发生错误：' + error.message);
            console.error('API调用错误:', error);
        }
    }

    async callKimiAPI(message) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'moonshot-v1-8k',
                messages: [
                    {
                        role: 'system',
                        content: '你是一个有帮助的AI助手，为用户提供准确、友好的回答。'
                    },
                    ...this.conversationHistory,
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // 保存对话历史
        this.conversationHistory.push(
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
        );

        // 限制历史记录长度
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }

        return aiResponse;
    }

    addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const time = new Date().toLocaleTimeString();
        messageDiv.innerHTML = `
            <div class="message-content">${this.formatMessage(content)}</div>
            <div class="message-time">${time}</div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    formatMessage(content) {
        // 简单的Markdown格式处理
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <span>AI正在思考...</span>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.messagesContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    loadConversationHistory() {
        const savedHistory = localStorage.getItem('chat_history');
        if (savedHistory) {
            this.conversationHistory = JSON.parse(savedHistory);
        }
    }

    saveConversationHistory() {
        localStorage.setItem('chat_history', JSON.stringify(this.conversationHistory));
    }
}

// 全局函数用于设置API密钥
function setApiKey() {
    if (window.aiChat) {
        window.aiChat.setApiKey();
    }
}

// 初始化聊天侧边栏
document.addEventListener('DOMContentLoaded', function() {
    window.aiChat = new AIChatSidebar();
});