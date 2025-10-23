
  // =============== 1. 拦截特定国旗 emoji ===============
  const FLAG_URLS = new Set([
    'https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg',
    'https://abs-0.twimg.com/emoji/v2/svg/1f1f7-1f1fa.svg'
  ]);

  const desc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
  if (desc?.set) {
    const nativeSet = desc.set;
    Object.defineProperty(Image.prototype, 'src', {
      set: function (url) {
        if (typeof url === 'string') {
          const clean = url.trim();
          if (FLAG_URLS.has(clean)) {
            console.log('🛡️ Blocked flag emoji:', clean);
            // 可选：替换为透明图
            // url = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          }
        }
        nativeSet.call(this, url);
      },
      configurable: true,
      enumerable: true
    });
  }

  // =============== 2. 隐藏 support-ukraine 横幅 ===============
  let bannerHidden = false;

  const tryHideBanner = () => {
    if (bannerHidden) return; // 已隐藏过，避免重复操作（可选）

    const link = document.querySelector('a[href*="support-ukraine"]');
    if (link && link.parentElement) {
      console.log('🕊️ Peace Maker active: hiding "Support Ukraine" banner');
      link.parentElement.style.display = 'none';
      bannerHidden = true;
    }
  };

  // 立即尝试一次
  tryHideBanner();

  // 使用 MutationObserver 监听后续动态内容
  const observer = new MutationObserver(tryHideBanner);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
