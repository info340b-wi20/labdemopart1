let state = {
    chosen: [],
    profileIndex: 0,
    profiles: []
 }
  
 /**
       {
            "name": "Jane",
            "age": 26,
            "profession": "Cosplayer",
            "bio": "I love the Mandalorian and Baby Yoda is so cute!",
            "pic": "img/mando.jpg"
        }
 */
  
 function setProfile(profile) {
    let img = document.querySelector(".card-img-top");
    img.src = profile.pic;
    img.alt = profile.name;
    let bio = document.querySelector("#bio");
    bio.textContent = profile.bio;
    let name = document.querySelector("#title");
    name.textContent = profile.name + ", " + profile.age;
    let profession = document.querySelector("#profession");
    profession.textContent = profile.profession;
 }
  
 // gets the profiles...
 function fetchProfiles() {
    console.log("Fetching...")
    fetch("js/data.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            state.profiles = data.profiles;
            setProfile(state.profiles[state.profileIndex]);
        });
 }
  
 // sets up the listeners for the choose / pass
 function setUpListeners() {
    let red = document.querySelector(".circle.red");
    let green = document.querySelector(".circle.green");
    red.addEventListener("click", function() {
        chooseOrPass(false);
    });
    green.addEventListener("click", function() {
        chooseOrPass(true);
    });
 }
  
 // choose or pass...
 function chooseOrPass(which) {
    if (which) {
        state.chosen.push(state.profiles[state.profileIndex]);
    }
    state.profileIndex++;
    if (state.profileIndex < state.profiles.length) {
        setProfile(state.profiles[state.profileIndex]);
    } else {
        document.querySelector(".card").style.display = "none";
        console.log(state.chosen);
    }
 }
  
 fetchProfiles();
 setUpListeners(); 