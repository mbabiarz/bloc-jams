var loc = document.location,
    isRemote = loc.hostname != '127.0.0.1' && loc.hostname != 'localhost',
    path = (isRemote) ? '/' + loc.pathname.split('/')[1] : '';
console.log('path', path);

var buildCollectionItemTemplate = function() {
  var template = 
  '<div class="collection-album-container column fourth">'
  + '  <img src="assets/images/album_covers/01.png"/>'
  + '  <div class="collection-album-info caption">'
  + '    <p>'
  + '      <a class="album-name" href="'+ path +'/album.html"> The Colors </a>'
  + '      <br/>'
  + '      <a href="' + path + '/album.html"> Pablo Picasso </a>'
  + '      <br/>'
  + '      X songs'
  + '      <br/>'
  + '    </p>'
  + '  </div>'
  + '</div>'
  
  return $(template);
};

$(document).ready(function() {
  var $collectionContainer = $('.album-covers');
  $collectionContainer.empty();
  for (var i = 0; i < 12; i++) {
    var $newThumbnail = buildCollectionItemTemplate();
    $collectionContainer.append($newThumbnail);
  }
});