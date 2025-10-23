  // ==========================
  // 1. 隐藏 Support Ukraine 横幅
  // ==========================
  const hideSupport = () => {
    const link = document.querySelector("a[href*='support-ukraine']");
    if (link && link.parentElement) {
      console.log('Peace Maker, What a joke! Hiding banner.');
      link.parentElement.style.display = 'none';
    }
  };

  // ==========================
  // 2. 拦截特定国旗 emoji 图片
  // ==========================
  const targetEmojis = new Set([
    'https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg',
    'https://abs-0.twimg.com/emoji/v2/svg/1f1f7-1f1fa.svg'
  ]);

  const originalSet = Object.getOwnPropertyDescriptor(Image.prototype, 'src')?.set;

  if (originalSet) {
    Object.defineProperty(Image.prototype, 'src', {
      set: function (url) {
        if (typeof url === 'string') {
          const cleanUrl = url.trim();
          if (targetEmojis.has(cleanUrl)) {
            console.log('============ intercepted emoji:', cleanUrl);
            // 可选：替换为透明图 or 留空
            // url = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          }
        }
        originalSet.call(this, url);
      },
      configurable: true,
      enumerable: true
    });
  }

  // ==========================
  // 3. 使用 MutationObserver 监听动态内容
  // ==========================
  const observer = new MutationObserver(() => {
    hideSupport();
    // 注意：图片拦截已通过 prototype 劫持，无需在 observer 中处理
  });

  // 立即尝试一次（应对静态内容）
  hideSupport();

  // 开始监听整个 body 的变化（适用于 SPA）
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
