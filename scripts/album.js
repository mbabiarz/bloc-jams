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
  var albumTitle = document.getElementsByClassName('album-view-title')[0];
  var albumArtist = document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
  
  albumTitle.firstChild.nodeValue = album.name;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.innerHTML = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);
  albumSongList.innerHTML = '';
  for (i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length); 
  }
  // Make sure setCurrentAlbum returns album for toggleAlbum to use
  console.log(album);
  return album;
};

window.onload = function() {
  setCurrentAlbum(albumPicasso);
};

// Get album image into global scope
var albumImage = document.getElementsByClassName('album-cover-art')[0];
console.log(albumImage);

// Create function to toggle through album content
function toggleAlbum(album) {
  if (album == 'albumPicasso') {
    setCurrentAlbum(albumMarconi);
  } else if (album == 'albumMarconi') {
    setCurrentAlbum(albumMarmoset);
  } else {
    setCurrentAlbum(albumPicasso);
  }
}
// Call toggleAlbum on click
albumImage.addEventListener('click', function(event) {
  toggleAlbum(setCurrentAlbum);
});
