var albumPicasso = {
  name: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { name: "Blue", length: '4:26' },
    { name: "Green", length: '3:14' },
    { name: "Red", length: '5:01' },
    { name: "Pink", length: '3:21' },
    { name: "Magenta", length: '2:15' }
  ]
};

var albumMarconi = {
  name: 'The Telephone',
  artist: 'Gulielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/02.png',
  songs: [
    { name: 'Hello, Operator?', length: '1:01' },
    { name: 'Ring, ring, ring', length: '5:01' },
    { name: 'Fits in your pocket', length: '3:21'},
    { name: 'Can you hear me now?', length: '3:14' },
    { name: 'Wrong phone number', length: '2:15' }
  ]
};

var albumMarmoset = {
  name: 'Home',
  artist: 'Marmoset Babyears',
  label: 'Old World',
  year: '1978',
  albumArtUrl: 'assets/images/album_covers/18.png',
  songs: [
    { name: 'Is Chicago', length: '2:22' },
    { name: 'Ding, Ding, Dong', length: '3:01' },
    { name: 'Ol\' King Kong', length: '3:33'}
  ]
};

// Select elements to populate dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

// Song table rows template
var createSongRow = function(songNumber, songName, songLength) {
  var template = 
      '<tr class="album-view-song-item">'
    + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="song-item-title">' + songName + '</td>'
    + ' <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';
  return template;
};

var setCurrentAlbum = function(album) {
  // Assign values to album info
  albumTitle.firstChild.nodeValue = album.name;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.innerHTML = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  // Clear content of the album song list container
  albumSongList.innerHTML = '';
  // Build list of songs from album JS object
  for (i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length); 
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list') [0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button tamplates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  
  songListContainer.addEventListener('mouseover', function(event) {
    console.log(event.target);
    // Only target individual song rows during event delegation
    if (event.target.parentElement.className == 'album-view-song-item') {
      // Change the content from the number to the play button's HTML
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
  });
  
  for (i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      // Revert the content back to the number
      // Select the first child element, the song number field
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
    });
  }
  
  var albums = [albumPicasso, albumMarconi, albumMarmoset];
  var i = 1;
  albumImage.addEventListener('click', function(event) {
    setCurrentAlbum(albums[i]);
    i++;
    if (i == albums.length) {
      i = 0;
    }
  });

};
