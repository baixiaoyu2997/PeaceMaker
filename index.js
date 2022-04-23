const hideSupport = () => {
  document.querySelector(
    "a[href*='support-ukraine']"
  ).parentElement.style.display = "none";
};

let isPeaceMaker = false;

isPeaceMaker = !!document.querySelector("a[href*='support-ukraine']");

if (isPeaceMaker) {
  console.log("Peace Maker, What a joke!");
  hideSupport();

  history.pushState = new Proxy(history.pushState, {
    apply: function (target, thisBinding, args) {
      setTimeout(hideSupport, 10);
      return target.apply(thisBinding, args);
    },
  });
}

function repalceImg() {
  const property = Object.getOwnPropertyDescriptor(Image.prototype, "src");
  const nativeSet = property.set;

  function customiseSrcSet(url) {
    if(url==='https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg'){
        console.log('============in')
    }
    // do something
    nativeSet.call(this, url);
  }
  Object.defineProperty(Image.prototype, "src", {
    set: customiseSrcSet,
  });
}
if (location.href.startsWith("https://twitter.com")) {
  repalceImg();
}

// https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg
// https://abs-0.twimg.com/emoji/v2/svg/1f1f7-1f1fa.svg