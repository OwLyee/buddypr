document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // 点击页面其他区域关闭导航菜单
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-toggle') && !event.target.closest('.main-nav')) {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        }
    });
    
    // 滚动时固定导航栏
    const header = document.querySelector('header');
    const topBar = document.querySelector('.top-bar');
    let lastScrollTop = 0;
    
    if (header && topBar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                // 向下滚动
                topBar.style.position = 'fixed';
                topBar.style.top = '0';
                topBar.style.left = '0';
                topBar.style.right = '0';
                topBar.style.zIndex = '1000';
                topBar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                document.body.style.paddingTop = topBar.offsetHeight + 'px';
            } else if (scrollTop <= 0) {
                // 回到顶部
                topBar.style.position = '';
                topBar.style.top = '';
                topBar.style.left = '';
                topBar.style.right = '';
                topBar.style.zIndex = '';
                topBar.style.boxShadow = '';
                document.body.style.paddingTop = '';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // 添加文章阅读计数
    const articleInfo = document.querySelector('.article-info');
    if (articleInfo) {
        const viewCountSpan = articleInfo.querySelector('span:nth-child(2)');
        if (viewCountSpan) {
            // 模拟阅读计数增加
            let currentCount = parseInt(viewCountSpan.textContent.match(/\d+/)[0]);
            currentCount++;
            viewCountSpan.textContent = `浏览次数: ${currentCount}`;
        }
    }
});