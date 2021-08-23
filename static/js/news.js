const NEWS_URL = "https://www.pgm.gent/data/gentsefeesten/news.json";

(() => {
    const API = {
        initialize() { 
            this.$container = document.getElementById('news');
            this.fetchNews();
        },
        async fetchNews() {
            const res = await fetch(NEWS_URL);
            const data = await res.json();
            this.populateHTML(data.slice(0, 3));
        },
        populateHTML(data) {
            console.log(data);

            const html = data.map(news => {
            return `          
            <li class="news-card">
                <a href="#">
                    <div class="news-img-wrapper">
                        <img src="${news.picture.medium}" alt="${news.title}">
                    </div>
                    <div class="news-card--right">
                        <h2>${news.title}</h2>
                        <p>${news.synopsis}</p>
                    </div>
                </a>
            </li>`
            }).join('');
            console.log(html)
            this.$container.innerHTML = html;

        }

        
    }
    API.initialize();
})();