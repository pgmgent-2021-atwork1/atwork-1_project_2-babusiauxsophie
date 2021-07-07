const EVENTS_URL = "https://www.pgm.gent/data/gentsefeesten/events.json";

(() => {

    const API = {

        initialize() {
            this.$container = document.getElementById('container');
            this.$eventContainer = document.querySelector('.event-container');
            this.fetchEvents();
            
            
        },

        fetchEvents() {
            fetch(EVENTS_URL)
            .then((response) => response.json())
            .then((json) => {
                this.events =json;
                console.log(json);
               /* this.filterEventSlug(); */
                this.populateHTML();
            })
            .catch((e) => console.log(e));
        },

        getSearch() {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            return params;
        },

        filterByDay() {
            const day = this.getSearch().get('day');
            const filteredEvents = this.events.filter(event => event.day === day);
            console.log(filteredEvents);
            return filteredEvents;
        },

        filterEventSlug() {
            const slug = this.getSearch().get('slug');
            const filteredEventsBySlug = this.filterByDay().filter(event => event.slug === slug);
            console.log(filteredEventsBySlug);
            return filteredEventsBySlug;
            
        },

        populateHTML(){
            
            console.log(this.events);

            const eventDetail = this.filterEventSlug().map((event => {

                return `
                    <div class="detail-wrapper">
                        <div class="img-wrapper">
                            <img class="program-image"src="${event.image !== null ? event.image.thumb : 'static/media/sloganGent.jpg'}" alt="Foto ${event.title}" loading="lazy" >
                        </div>

                        <div class="text-wrapper">
                        <div class="text-top">
                            <h1>${event.title}</h1>
                            <h2>${event.day_of_week} ${event.day} - ${event.start} > ${event.end}</h2>
                        </div>
                        <div class="text-middle">
                        <p>${event.description !== undefined ? eventDetail.description : `Geen beschrijving gevonden.`}</p>
                        </div>
                           
                        <div class="details-more">
                            <p><span>website:</span> ${event.url}</p>
                            <p><span>organisator:</span> ${event.organizer}</p>
                            <p><span>categorieën:</span> ${event.categrory}</p>  
                        </div>
                        
                        </div>
                    </div>
                                    
                    `;
            }
            )).join('');

            document.querySelector('.container').innerHTML = eventDetail;
           

        },
        


    }
    API.initialize();

})();