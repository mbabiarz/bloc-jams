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
      // Add data attribute to access song number 
    + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="song-item-title">' + songName + '</td>'
    + ' <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';
  return template;
};

// Display album info
var setCurrentAlbum = function(album) {
  // Assign values to album
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


var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

// WTF method for targeting song row
var findParentByClassName = function(element, targetClass) {
  // get parent of clicked
  var currentParent = element.parentElement;
  
  if (currentParent) {
    // if hover is not song number b/c it's deeper, recursive
    while (currentParent.className && currentParent.className != targetClass) {
      currentParent = currentParent.parentElement;
    }
    
    if (currentParent.className == targetClass) {
      return currentParent;
    } else {
      alert("No parent with that class name found.");
    }
    
  } else {
    alert("No parent found.");
  }
};

findParentByClassName (child, 'album-view');
console.log(child.parentElement);

var getSongItem = function(element) {
  switch (element.className) {
    // If song button or icons clicked, set currentParent to song-item-number
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    // If song row clicked, set songItem to song number
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    // If other cells clicked, set current Parent to song number
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
    // If song number clicked, set songItem to song number
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

var clickHandler = function(targetElement) {
  // Get clicked song number cell
  var songItem = getSongItem(targetElement);
  console.log(songItem);
  
  // Nothing playing: display pause btn and store song number
  if (currentlyPlayingSong == null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  // Playing clicked: display play btn and store null
  } else if (currentlyPlayingSong == songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  // Other clicked: display clicked pause btn and store new song number
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = pauseButtonTemplate;
    console.log(currentlyPlayingSong);
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

// Select song table and rows elements for handling
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button tamplates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumPicasso);
  
  // Hovers - Listen for mouseover entire table
  songListContainer.addEventListener('mouseover', function(event) {
    // console.log(event.target);
    // Only target individual song rows during event delegation
    if (event.target.parentElement.className === 'album-view-song-item') {
      // Change the content from the number to the play button's HTML
      // Target the parent of hovered element and then select the song number
      // Helpful for debugging events
      // console.log('mouseover row', Date.now(), event.target);
      
      // my try:
      // var targetSong = event.target.parentElement.querySelector('.song-item-number').getAttribute('data-song-number');
      // if (targetSong !== currentlyPlayingSong) {
      //   event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
      // }
      
      // recommended:
      var songItem = getSongItem(event.target);
      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });
  
  // Clicks - Iterate over rows
  for (i = 0; i < songRows.length; i++) {
    // Revert the content back to the number
    songRows[i].addEventListener('mouseleave', function(event) {
      // Select the first child element, the song number field
      // this.querySelector('.song-item-number').innerHTML = this.children[0].getAttribute('data-song-number');
      
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');
      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      }
    });
    
    // Change the currently playing song
    songRows[i].addEventListener('click', function(event) {
      // Event handler call - for any row clicked #L111
      clickHandler(event.target);
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
