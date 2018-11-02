(() => {
  
  const getStorage = key => new Promise(resolve =>{
    chrome.storage.local.get(key,function(result){
      resolve(result[key]);
    });
  });



  window.onload = async function () {   
    let time;
    const value = await getStorage('CEFWB_STYLE'); 
    const p = document.createElement('p');
    p.innerHTML = '设置全局页面样式';
    p.style.textAlign = 'center';

    const textarea = document.createElement('textarea');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '5');
    value && (textarea.value = value);

    const div = document.createElement('div');
    const div1 = document.createElement('div');

    const btn = document.createElement('button');
    btn.innerHTML = '确定';

    const span = document.createElement('span');
    span.innerHTML = "修改成功~";
    span.style.display = "none";

    document.body.appendChild(p);
    document.body.appendChild(textarea);

    document.body.appendChild(div1);
    document.body.appendChild(div);

    div.appendChild(btn);
    div.appendChild(span);

    btn.onclick = function () {
      chrome.storage.local.set({
        'CEFWB_STYLE': textarea.value
      }, function (result) {
        clearTimeout(time);
        span.style.display = " inline-block";
        time = setTimeout(()=>{
          span.style.display = 'none';
        },3000);
      });
    }
  };

})();




