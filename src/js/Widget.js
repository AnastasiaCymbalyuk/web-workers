/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
export default class Widget {
  constructor() {
    this.news = document.querySelector('.news_box');
    this.btn = document.querySelector('.btn_reload');
    this.conteiner = document.querySelector('.content_box');
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
        this.conteiner.style.opacity = 0.2;
      }
    })();
  }

  getNews(data) {
    const post = document.createElement('div');
    post.className = 'news-post';
    post.innerHTML = `
        <div>${data.title}</div>
        <div>
            <img src="${data.img}">
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
    postEmpty.className = 'post_empty';
    postEmpty.innerHTML = `
        <div class="post_empty_title"></div>
        <div>
            <div class="post_empty_img"></div>
            <div class="post_empty_desc"></div>
        </div>
        `;
    return postEmpty;
  }
}
