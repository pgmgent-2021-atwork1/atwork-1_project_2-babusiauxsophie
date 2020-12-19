const CATEGORY_URL = "https://www.pgm.gent/data/gentsefeesten/categories.json";
const EVENTS_URL = "https://www.pgm.gent/data/gentsefeesten/events.json";

(() => {

    const API = {
        initialize() {
            this.$container = document.getElementById('container');
            this.$eventContainer = document.querySelector('.event-container');
            this.fetchCategories();
        },
        
        fetchCategories() {
            fetch(CATEGORY_URL)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.categories = json;
                this.fetchEvents();
            })
            .catch((e) => console.log(e));
        },
        fetchEvents() {
            fetch(EVENTS_URL)
            .then((response) => response.json())
            .then((json) => {
                this.events =json;
                console.log(json);
                this.filterEventsPerDay();
                this.populateHTML();
            })
            .catch((e) => console.log(e));
        },

        filterEventsPerDay () {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const day = params.get('day'); //params.

            this.events = this.events.filter((event) => {
                return event.day === day;
            })
        },

        populateHTML() {
            console.log(this.categories);
            console.log(this.events);

             const html = this.categories.map((category) => {
                 const filteredEvents = this.events.filter((event) => {
                     return event.category.indexOf(category) > -1;
                 });

                 const listItems = filteredEvents.map((event) => {

                    return `
                    <li class="program"> 
                                    <a href="/detail.html?day=${event.day}&slug=${event.slug}">
                                    <div class="program__container">
                                        <div class="program__image-wrapper">
                                            <img class="program__image"src="${event.image !== null ? event.image.thumb : 'static/media/sloganGent.jpg'}" alt="Foto ${event.title}" loading="lazy" >
                                        </div>
                                        <span class="program__date">${(event.day_of_week).substring(0, 2)} ${event.day} ${event.start} u.</span>
                                    </div>
                                    <h3>${event.title}</h3>
                                    <p>${event.location}</p>
                                    </a>
                                </li>
                    `;
                 }).join('');

                 return `
                        <section>
                        <h2 id="anchor__${category}" class="category-title">${category}</h2>
                        <button class="category-top__button">
                            <a href="#anchor__category-top">
                                <svg width="32" height="32"><path d="M13.682 11.791l-6.617 6.296L4 15.171 15.74 4 28 15.665l-2.935 2.793-7.113-6.768v16.311h-4.269z"/></svg>
                            </a>
                            <ul class="events">
                                ${listItems}
                            </ul>
                        </section>`
             }).join('');

             this.$container.innerHTML = html;
        },

        
    }

    API.initialize();

})();