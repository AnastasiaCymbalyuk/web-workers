(()=>{"use strict";(new class{constructor(){this.news=document.querySelector(".news_box"),this.btn=document.querySelector(".btn_reload"),this.server="https://web-workers-back.onrender.com/posts"}init(){this.request(),this.btn.addEventListener("click",(()=>{this.news.innerHTML="",this.request()}))}request(){(async()=>{try{this.reload();const e=await fetch(this.server);if(e.ok){const t=await e.json();this.news.innerHTML="",t.forEach((e=>{this.news.prepend(this.getNews(e))}))}}catch(e){const t=document.createElement("div");t.className="err_load",t.textContent="Не удалось загрузить данные Проверте подключение и обновите страницу",document.body.append(t),document.querySelector(".content_box").style.opacity=.2}})()}getNews(e){const t=document.createElement("div");return t.className="news_post",t.innerHTML=`\n        <h2>${e.title}</h2>\n        <div>\n            <img src="${e.image}">\n            <div>${e.description}</div>\n        </div>\n        `,t}reload(){for(let e=0;e<4;e++)this.news.append(this.loadNews())}loadNews(){const e=document.createElement("div");return e.className="news_post",e.innerHTML='\n        <div class="post_empty_title"></div>\n        <div class="post_empty_body">\n            <div class="post_empty_img"></div>\n            <div class="post_empty_desc"></div>\n        </div>\n        ',e}}).init(),navigator.serviceWorker&&window.addEventListener("load",(async()=>{try{navigator.serviceWorker&&(await navigator.serviceWorker.register("./service-worker.js"),console.log("registered"))}catch(e){console.log(e)}}))})();