const EVENTS_URL = "https://www.pgm.gent/data/gentsefeesten/events.json";

(() => {

    const API = {

        initialize() { 
            this.$container = document.getElementById('container');
            this.fetchEvents();
            
            
        },

        fetchEvents() {
            fetch(EVENTS_URL)
            .then((response) => response.json())
            .then((json) => {
                this.events =json;
                console.log(json);
               //this.filterEventSlug();
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
            return filteredEvents;
        },

        filterEventSlug() {
            const slug = this.getSearch().get('slug');
            const filteredEventsBySlug = this.filterByDay().find(event => event.slug === slug);
            return filteredEventsBySlug;
            
        },

        populateHTML(){
            
            console.log(this.events);
            const event = this.filterEventSlug();
            const eventDetail = `
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
                        <p>${event.description  ? event.description : `Geen beschrijving gevonden.`}</p>
                        </div>
                           
                        <div class="details-more">
                            <p><span>website:</span> ${event.url ? event.url : `Geen website gevonden.` }</p>
                            <p><span>organisator:</span> ${event.organizer ? event.organizer : `Geen organisator gevonden.` }</p>
                            <p><span>categorieën:</span> ${event.category ? event.category : `Geen categorie gevonden.`}</p>  
                        </div>
                        
                        </div>
                    </div>
                                    
                    `;
            
            this.$container.innerHTML = eventDetail;
           

        },
        


    }
    API.initialize();

})();