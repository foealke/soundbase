const searchbar = document.querySelector('#search-bar')
const searchbtn = document.querySelector('#search-btn')
const songlist = document.querySelector('#song-list')
var results = 1 ;
var helperA = false;

changeViewToLatestWork() 

var database = firebase.database().ref('uploadedAudio');

searchbtn.addEventListener('click', () => {
    if ( !searchbar.value ) return
    search(searchbar.value)
    console.log(changeViewToSearch())
    helperA = false;
})
function search(queryText) {
    var a = {}
    database.orderByChild('searchTag')
        .startAt(queryText.toLowerCase())
        .endAt(queryText.toLowerCase().split(' ')[0]+"\uf8ff")
        .once('value', function(snap) {
            snap.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                a[childKey] = childData
            });
            results = a
            return a
    })
}

function changeViewToSearch() {
    document.querySelector('#song-list').hidden = false;
    document.querySelector('#latest-work-box').hidden = true;
    document.querySelector('#latestwork-msg').hidden = true;
}

function changeViewToLatestWork() {
    document.querySelector('#song-list').hidden = true;
    document.querySelector('#latest-work-box').hidden = false;
    document.querySelector('#latestwork-msg').hidden = false;
}

function renderSongs() {
    console.log(results)
    songlist.innerHTML = ''
    $.each(results, function (key, value) {
        console.log(value)
        songlist.innerHTML += `<div class="song-list-obj song-box animated fadeInUp" style="height: 20vh; width: 80vw;">
        <div style="font-size: 4vh; font-weight: bold;text-align: left; margin: 15px; float: left;"> 
             `+ value.title +`
        </div>
        <button class="song-href-btn" style="text-align: center; margin: 15px; font-size: 1.5vw;" class="purple-gradient unselectable">
            Zobacz
        </button>
        <div style="clear: both; font-size: 2vh; text-align: left; margin: 15px; margin-top: -2vh;"> 
             ` + value.authorName + `
        </div>
        <div style="font-style: italic; font-weight: medium;">
             ` + value.description + `
        </div>
    </div>`
    })
}

// ugh
setInterval(function() {
    if ( results != 1 && helperA == false) {
        helperA = true;
        renderSongs()
    } else {
        return
    }
}, 10)

