// Select elements to populate dynamically
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

// Song table rows template
var createSongRow = function(songNumber, songName, songLength) {
  var template = 
      '<tr class="album-view-song-item">'
    + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + ' <td class="song-item-title">' + songName + '</td>'
    + ' <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>';
  var $row = $(template);
  
  var clickHandler = function() {
    var songNumber = parseInt($(this).attr('data-song-number'));
    
    if (currentlyPlayingSongNumber !== null) {
      // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
    }
    if (currentlyPlayingSongNumber !== songNumber) {
      // Switch from Play -> Pause button to indicate new song is playing.
      $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      currentSoundFile.play();
      updatePlayerBarSong();
      updateSeekBarWhilePlaying();
      
    } else if (currentlyPlayingSongNumber === songNumber) {
      // Switch from Pause -> Play button to pause currently playing song.
      if (currentSoundFile.isPaused()) {
        currentSoundFile.play();
        $(this).html(pauseButtonTemplate);
        $('.play-pause').html(playerBarPauseButton); 
      } else {
        currentSoundFile.pause();
        $(this).html(playButtonTemplate);
        $('.play-pause').html(playerBarPlayButton); 
      }
    }
    // console.log(currentSongFromAlbum);
  };
  
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(playButtonTemplate);
    }
  };
  
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    
    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
  };
  
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

// Display album info
var setCurrentAlbum = function(album) {
  currentAlbum = album;
  // Assign values to album
  $albumTitle.text(album.name);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.label);
  $albumImage.attr('src', album.albumArtUrl);
  
  // Clear content of the album song list container
  $albumSongList.empty();
  
  // Build list of songs from album JS object
  for (i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    $albumSongList.append($newRow);
  }  
};

var trackIndex = function (album, song) {
  return album.songs.indexOf(song);
};

// Sets current song
var setSong = function(songNumber) {
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ "mp3" ],
    preload: true
  });
  
  setVolume(currentVolume);
};

// ******** I DID IT!!! ********
var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var nextSong = function() {
  var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
  };
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  
  // Increment song
  currentSongIndex++;
  
  // Wrap to first song
  if (currentSongIndex >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }
  
  // Set new current song
  setSong(currentSongIndex + 1);
  currentSoundFile.play();
  // Update Player Bar
  updatePlayerBarSong();
  updateSeekBarWhilePlaying();
  
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    // Update the Player Bar information
    updatePlayerBarSong();
    updateSeekBarWhilePlaying();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);  
};

// Player Bar functionality
var updatePlayerBarSong = function() {
  $('.song-name').text(currentSongFromAlbum.name);
  $('.artist-song-mobile').text(currentAlbum.artist + ' - ' + currentSongFromAlbum.name);
  $('.artist-name').text(currentAlbum.artist);
  $('.play-pause').html(playerBarPauseButton);
};

var pausePlayToggle = function() {
  var $currentSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  
  if (currentSoundFile.isPaused()) {
    $pausePlayButton.html(playerBarPlayButton);
    $currentSongNumberCell.html(playButtonTemplate);
  } else {
    $pausePlayButton.html(playerBarPauseButton);
    $currentSongNumberCell.html(pauseButtonTemplate);
  }
//  console.log(getSongNumberCell(currentlyPlayingSongNumber));
  // console.log(currentSongNumberCell);
};

// Seek bars
var seek = function(time) {
  if (currentSoundFile) {
    currentSoundFile.setTime(time);
  }
};

var setVolume = function(volume) {
  if (currentSoundFile) {
   currentSoundFile.setVolume(volume);
  }
};

var updateSeekBarWhilePlaying = function() {
  if (currentSoundFile) {
    currentSoundFile.bind('timeupdate', function(event) {
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');
      
      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
  }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100;
  offsetXPercent = Math.max(0, offsetXPercent);
  offsetXPercent = Math.min(100, offsetXPercent);
  var percentageString = offsetXPercent + "%";
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
  var $seekBars = $('.player-bar .seek-bar');
  var $volumeFill = $('.player-bar .volume .seek-bar .fill');
  var $volumeThumb = $('.player-bar .volume .seek-bar .thumb');
  $volumeFill.css('width', currentVolume);
  $volumeThumb.css('left', currentVolume);

  $seekBars.click(function(event) {      
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();
    var seekBarFillRatio = offsetX / barWidth;
    
    if ($(this).parent().attr('class') == 'seek-control') {
      seek(seekBarFillRatio * currentSoundFile.getDuration());
    } else {
      setVolume(seekBarFillRatio * 100);
    }
    
    updateSeekPercentage($(this), seekBarFillRatio);
  });

  $seekBars.find('.thumb').mousedown(function(event) {
    var $seekBar = $(this).parent();

    $(document).bind('mousemove.thumb', function(event) {
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;
    
      if ($(this).parent().attr('class') == 'seek-control') {
        seek(seekBarFillRatio * currentSoundFile.getDuration());
      } else {
        setVolume(seekBarFillRatio * 100);
      }

      updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
};

// Album button tamplates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing song
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $pausePlayButton = $('.main-controls .play-pause');

$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $pausePlayButton.click(function() {
    currentSoundFile.togglePlay();
    pausePlayToggle();
  });
  setupSeekBars();
});
