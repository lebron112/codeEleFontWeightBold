(() => {
  const host = 'http://47.99.199.95:8888';
  const getStorage = key => new Promise(resolve => {
    chrome.storage.local.get(key, function (result) {
      resolve(result[key]);
    });
  });

  const CreateDiv = (float) => {
    const div = document.createElement('div');
    div.style.float = float;
    div.style.paddingBottom = "10px";
    return div;
  };
  const fetchs = async (url, requestOptions) => {
    const { body } = await fetch(host + url).then(res => res.json());
    return body;
  }

  window.onload = async function () {
    let time,
      num = await getStorage('CEFWB_NUM') || 0,
      value = await getStorage('CEFWB_STYLE');
    const flag = await getStorage('CEFWB_SWITCH');
    const p = document.createElement('p');
    p.innerHTML = '设置全局页面样式';
    p.style.textAlign = 'center';
    // if (num === 0) {
    //   const data = await fetchs('/sync');
    //   value = data.body;
    // }
    // 输入框
    const textarea = document.createElement('textarea');
    textarea.setAttribute('cols', '42');
    textarea.setAttribute('rows', '12');
    value && (textarea.value = value);

    // 按钮容器
    const div = CreateDiv('left')

    const btn = document.createElement('button');
    btn.innerHTML = '确定↑';
    // 同步按钮
    const btnSync = document.createElement('button');
    btnSync.innerHTML = '同步↓';
    btnSync.style.marginLeft = '10px';

    const span = document.createElement('span');
    span.innerHTML = "修改成功~";
    span.style.display = "none";

    div.appendChild(btn);
    div.appendChild(btnSync);
    div.appendChild(span);
    document.body.appendChild(p);
    document.body.appendChild(textarea);
    document.body.appendChild(div);

    // 开关容器
    const switchOnOffContent = CreateDiv('right')
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    const text = document.createElement('span');
    flag && (check.checked = true);
    check.onchange = function () {
      text.innerText = this.checked ? '开启' : '关闭'
      chrome.storage.local.set({
        'CEFWB_SWITCH': this.checked,
      }, () => { });
    };
    text.innerText = check.checked ? '开启' : '关闭';
    label.appendChild(text);
    label.appendChild(check);
    switchOnOffContent.appendChild(label);
    document.body.appendChild(switchOnOffContent);



    // 点击事件
    btn.onclick = function () {
      chrome.storage.local.set({
        'CEFWB_STYLE': textarea.value,
        'CEFWB_NUM': num++,
      }, function (result) {
        clearTimeout(time);
        span.style.display = " inline-block";
        // fetch(host + '/up', {
        //   method: 'post',
        //   body: JSON.stringify({ data: textarea.value, num }),
        //   headers: new Headers({
        //     'Content-Type': 'application/json'
        //   }),
        // });
        time = setTimeout(() => {
          span.style.display = 'none';
        }, 3000);
      });
    }

    // btnSync.onclick = async function () {
    //   const body = await fetchs('/sync');
    //   textarea.value = body;
    // }


  };
})();




