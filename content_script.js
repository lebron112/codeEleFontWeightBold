
const window_onload_event = () => {
  window.onload = function () {
    const codes = document.getElementsByTagName('code');
    for (let i = 0; i < codes.length; i++) {
      let code = codes[i];
      code.style.fontWeight = 'bold';
    }
  };
};

const getStorage = key => new Promise(resolve => {
  chrome.storage.local.get(key, function (result) {
    resolve(result[key]);
  });
});

const init = async () => {
  let loopTimes = 0;
  const flag = await getStorage('CEFWB_SWITCH');
  const head = document.getElementsByTagName('head')[0];
  const appendChild = () => {
    const ele = document.createElement('style');
    ele.innerHTML = value;
    ele.setAttribute('type', 'text/css');
    ele.setAttribute('id', 'CEFWB_STYLE');
    head.appendChild(ele);
  }
  const value = await getStorage('CEFWB_STYLE');
  flag && appendChild();
  const loop = () => {
    loopTimes++;
    setTimeout(() => {
      const CEFWB_STYLE = document.getElementById('CEFWB_STYLE');
      if (!CEFWB_STYLE) {
        appendChild();
        loop();
      } else {
        if (loopTimes < 10) {
          loop();
        } else {
          console.log('-------------样式注入完成---------------');
        }
      }
    }, 500);
  }
  flag && loop();
};
init();


