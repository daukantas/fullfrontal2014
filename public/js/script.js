// Show a better grid for the vents, by not showing the half cutted holes
// or the ones too close to the edges
(function () {
  var $vents = document.getElementById('vents');
  var $s = document.createElement('style');
  document.body.appendChild($s);

  function offset() {
    var imageWidth = 330;
    var span = 30;
    var patternWidth = 80;
    var start = $vents.offsetWidth;
    var res = parseInt(start / imageWidth, 10);
    if (res >= 6) {
      imageWidth = imageWidth * 2.5;
    } else if (res >= 2) {
      imageWidth = imageWidth * 1.5;
    } else if (res <= 1) {
      imageWidth = imageWidth * 0.5;
    }
    var o = start % imageWidth / 2 % span;
    // console.log(o);
    if (o < 10) {
      o = o + 30;
    }
    o = patternWidth - o;
    $s.innerHTML = '.vents:after { ' +
      'background-position: -' + o + 'px top, right -' + o + 'px top, center center;';
  }

  window.addEventListener('load', offset);
  window.addEventListener('resize', offset);
})();


// Show the black monitor full screen
(function () {
  var $s = document.getElementById('screen');

  function mega() {
    var originalSize = {
      w: $s.offsetWidth,
      h: $s.offsetHeight
    };
    var winSize = {
      w : window.innerWidth,
      h: window.innerHeight
    };
    if (originalSize.h <= winSize.h) {
      // do nothing, just resize the wrapper and vertical center the content
      $s.style.width = winSize.w + 'px';
      $s.style.height = winSize.h + 'px';
      $s.className += " " + 'js-mega';
      $s.style.display = 'table-cell';
      $s.style.verticalAlign = 'middle';
    } else {
      // $s.style.width = winSize.w + 'px';
      // $s.style.height = winSize.h + 'px';
      // $s.className += " " + 'mega';
    }
    console.log(originalSize, winSize);
  }

  window.addEventListener('load', mega);
})();