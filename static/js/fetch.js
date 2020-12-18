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
            const day = '19'; //params.
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
                    <li>
                        ${event.title}
                    </li>
                    `;
                 }).join('');

                 return `
                        <section>
                            <h2>${category}</h2>
                            <ul>

                                ${listItems}

                            </ul>
                        </section>`
             }).join('');

             this.$container.innerHTML = html;
        },

        
    }

    API.initialize();

})();