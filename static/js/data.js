/*

(() => {
    const search = window.location.search;
    console.log(search);
    const params = new URLSearchParams(search);

    const urlType = params.get('day');

    if (urlType !== null) {
        let day;
        for (let i=0; i < days.length; i++) {
            if (days[i].type === urlType) {
                day = days[i]
                console.log(day[i]);
            }
        }

        
    }
}) ();

*/