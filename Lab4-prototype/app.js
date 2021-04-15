class Weather {
    constructor() {
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
    }

    gotLocation(result) {
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    errorLocation(err) {
        console.log(err);
    }

    getWeather(){
        let url = `http://api.weatherapi.com/v1/current.json?key=55c87db86dbd451aa2f144238211404&q=${this.lat},${this.lng}`;
          
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let weather = data.current.condition.text;
                //let temperature = 20;
                let temperature = data.current.temp_c;
                
                document.querySelector("#weather").innerHTML=`${weather}! It's ${temperature} °C outside!`;
                this.getActivity(this.dataSetter(temperature));

                if (temperature < 15){
                    document.querySelector("#comment_weather").innerHTML=`That's a bit chilly!`;
                }
                else {
                    document.querySelector("#comment_weather").innerHTML=`Pack your bags, we are going outside!`;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    dataSetter(temperature){
        if(temperature <= 15){
            let setData = "cold";
            return setData;
        }
        else {
            let setData = "warm";
            return setData;
        }
    }

    getActivity(setData) {
        let type;
        if (setData === "cold"){
            type = "social";
            document.querySelector(".background").style.backgroundImage = `url('https://source.unsplash.com/1600x900/?indoors')`;
        }
        else if (setData === "warm") {
            type = "recreational";
            document.querySelector(".background").style.backgroundImage = `url('https://source.unsplash.com/1600x900/?outdoors')`;
        }

        let url_warm = `http://www.boredapi.com/api/activity?type=${type}`;
        fetch(url_warm)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let activity = data.activity;
                document.querySelector("#activity").innerHTML=`You should try: ${activity} !`;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

let app = new Weather();