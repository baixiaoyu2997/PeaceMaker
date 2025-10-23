 // ==============================
  // 1. 拦截特定 emoji（仅限 Twitter/X）
  // ==============================
  if (location.hostname === 'twitter.com' || location.hostname === 'x.com') {
    const FLAG_URLS = [
      'https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg',
      'https://abs-0.twimg.com/emoji/v2/svg/1f1f7-1f1fa.svg'
    ];

    const desc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
    if (desc && desc.set) {
      const nativeSet = desc.set;
      Object.defineProperty(Image.prototype, 'src', {
        set: function (url) {
          if (typeof url === 'string') {
            const clean = url.trim();
            if (FLAG_URLS.includes(clean)) {
              console.log('============ intercepted emoji:', clean);
              // 可在此替换为透明图或留空
            }
          }
          nativeSet.call(this, url);
        },
        configurable: true,
        enumerable: true
      });
    }
  }

  // ==============================
  // 2. 隐藏 Support Ukraine 横幅（所有匹配站点）
  // ==============================

  const hideSupport = () => {
    const link = document.querySelector("a[href*='support-ukraine']");
    if (link && link.parentElement) {
      console.log("Peace Maker, What a joke!");
      link.parentElement.style.display = "none";
    }
  };

  // 立即尝试一次
  hideSupport();

  // 使用 MutationObserver 监听后续动态插入
  const observer = new MutationObserver(hideSupport);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // 兜底：极少数情况下 observer 可能漏掉，加轻量轮询（最多 5 次）
  let attempts = 0;
  const fallback = setInterval(() => {
    if (attempts >= 5) {
      clearInterval(fallback);
      return;
    }
   console.log('=========run')
    hideSupport();
    attempts++;
  }, 1000);
