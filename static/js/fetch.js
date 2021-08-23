const CATEGORY_URL = "https://www.pgm.gent/data/gentsefeesten/categories.json";
const EVENTS_URL = "https://www.pgm.gent/data/gentsefeesten/events.json";

(() => {

    const API = {
        initialize() {
            this.$container = document.getElementById("container");
            this.$eventContainer = document.querySelector(".event-container");
            this.fetchCategories();

        },
        
        fetchCategories() {
            fetch(CATEGORY_URL)
            .then((response) => response.json())
            .then((json) => {
                
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
                
                this.filterEventsPerDay();
                
                this.threeRandomEvents = this.getThreeRandomEvents(this.events);
                this.populateHTML();
                
                
                
            })
            .catch((e) => console.log(e));
        },

        getThreeRandomEvents(events) { 
            const maxArrayId = events.length - 1;
            const randomEvents = [];
            for (let i = 0; i < 3; i++) {
                const randomNrToAdd = Math.floor(Math.random() * maxArrayId);
                randomEvents.push(events[randomNrToAdd]);
            }
            return randomEvents;
        },


        


        filterEventsPerDay () {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const day = params.get('day'); //params.
            if(day){
                this.events = this.events.filter((event) => {
                    return event.day === day;
                });
            }
            
        },

        

        getEventHTML(event) {
            return `
                    <li class="program events-container"> 
                                    <a href="/app/detail.html?day=${event.day}&slug=${event.slug}">
                                    <div class="program-container">
                                        <div class="img-wrapper events-img-wrapper">
                                            <img src="${event.image !== null ? event.image.thumb : 'static/media/sloganGent.jpg'}" alt="Foto ${event.title}" loading="lazy" >
                                        </div>
                                        <span class="program-date">${(event.day_of_week).substring(0, 2)} ${event.start} u.</span>
                                    </div>
                                    <h3>${event.title}</h3>
                                    <p>${event.location}</p>
                                    </a>
                                </li>
                    `;
        },

        getCategoryAndEventsHTML() {
            const html = this.categories.map((category) => {
                const filteredEvents = this.events.filter((event) => {
                    return event.category.indexOf(category) > -1;
                });

                const listItems = filteredEvents.map((event) => {

                   return this.getEventHTML(event);

                }).join('');

                return `
                       <section>
                       <div class="category-event-top">
                           <h2 id="anchor__${category}" class="category-title">${category}</h2>
                           <button class="category-top__button">
                       
                               <a href="#anchor__category-top">
                               <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                               <title>arrow-up</title>
                               <path d="M13.682 11.791l-6.617 6.296-3.065-2.916 11.74-11.171 12.26 11.665-2.935 2.793-7.113-6.768v16.311h-4.269z"></path>
                               </svg>
                               
                               </a>
                       </div>   
                           <ul class="events">
                               ${listItems}
                           </ul>
                       </section>`
            }).join('');

            return html;
            
        },


        populateHTML() {
            
            if(this.$container) {
                this.$container.innerHTML = this.getCategoryAndEventsHTML();
            }
            
             

             const randomEvents = document.querySelector(".events__2");
             randomEvents.innerHTML = this.threeRandomEvents.map((event) => {
                 return this.getEventHTML(event);
             });

             
        },

        
    }

    API.initialize();

})();