/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor() {
    this.news = document.querySelector('.news_box');
    this.btn = document.querySelector('.btn_reload');
    this.server = 'https://web-workers-back.onrender.com/posts';
  }

  init() {
    this.request();
    this.btn.addEventListener('click', () => {
      this.news.innerHTML = '';
      this.request();
    });
  }

  request() {
    (async () => {
      try {
        this.reload();
        const response = await fetch(this.server);
        if (response.ok) {
          const obj = await response.json();
          this.news.innerHTML = '';
          obj.forEach((item) => {
            this.news.prepend(this.getNews(item));
          });
        }
      } catch (err) {
        const errLoad = document.createElement('div');
        errLoad.className = 'err_load';
        errLoad.textContent = 'Не удалось загрузить данные Проверте подключение и обновите страницу';
        document.body.append(errLoad);
        document.querySelector('.content_box').style.opacity = 0.2;
      }
    })();
  }

  getNews(data) {
    const post = document.createElement('div');
    post.className = 'news_post';
    post.innerHTML = `
        <h2>${data.title}</h2>
        <div>
            <img src="${data.image}">
            <div>${data.description}</div>
        </div>
        `;
    return post;
  }

  reload() {
    for (let i = 0; i < 4; i++) {
      this.news.append(this.loadNews());
    }
  }

  loadNews() {
    const postEmpty = document.createElement('div');
    postEmpty.className = 'news_post';
    postEmpty.innerHTML = `
        <div class="post_empty_title"></div>
        <div class="post_empty_body">
            <div class="post_empty_img"></div>
            <div class="post_empty_desc"></div>
        </div>
        `;
    return postEmpty;
  }
}
