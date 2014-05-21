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


// Show the black monitor full screen - SVG
(function () {
  if (supportsSVG()) {
    var $s = document.getElementById('screen');
    var $t1 = document.getElementById('t1');
    var $t2 = document.getElementById('t2');
    var $monitor = document.getElementById('monitor');
    var monitorStyle = window.getComputedStyle($monitor, null);

    window.mega = function() {
      var winSize = {
        w : window.innerWidth,
        h: window.innerHeight
      };
      $s.style.height = winSize.h + 'px';
      $s.className += " " + 'js-mega';
      // move the binary dates at the top
      var svgSize = {
        w: parseInt(monitorStyle.getPropertyValue('width')) - parseInt(monitorStyle.getPropertyValue('padding-left')) - parseInt(monitorStyle.getPropertyValue('padding-right')),
        h: parseInt(monitorStyle.getPropertyValue('height')) - parseInt(monitorStyle.getPropertyValue('padding-bottom')) - parseInt(monitorStyle.getPropertyValue('padding-top'))
      };
      if (winSize.h > winSize.w) {
        var diff = (svgSize.h - svgSize.w) / -2;
        if (diff < -10) {
          diff = diff + 10;
        }
        diff = diff * 700 / svgSize.w;
        $t1.setAttribute('y', diff + 'px');
        $t2.setAttribute('y', diff + 'px');
        console.log(svgSize.w, svgSize.h);
        console.log(diff);
      }
    };
    mega();
  }
})();


// Scroll to session
(function() {
  var $ = function (s) {
    try {
      return document.querySelectorAll(s);
    } catch (e) {
      return [];
    }
  };

  var $nav = $('.nav-main');
  var today = new Date();
  var confDay = new Date('2014-05-16');
  var best = null;
  var isConfDay = (today.getDate() === confDay.getDate()) &&
                  (today.getMonth() === confDay.getMonth()) &&
                  (today.getFullYear() === confDay.getFullYear());

  if (isConfDay) {
    // find the current session
    var sessions = $('.js-session');
    var length = sessions.length;
    best = sessions[0];

    for (var i = 0; i < length; i++) {
      if ((Date.parse(sessions[i].getAttribute('data-date')) - (5 * 1000 * 60)) < today) {
        best = sessions[i];
      }
    }
  }

  // if today is conference day, then scroll the current session in to view
  if (isConfDay && best && !window.location.hash) {
    setTimeout(function () {
      best.scrollIntoView(true);
    }, 750);
  } else {
    // only scroll the front page
    $nav.length > 0 && location.pathname === '/' && /mobi/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {
      if (!pageYOffset) window.scrollTo(0, $nav[0].offsetHeight);
    }, 750);
  }
})();


// Parallax for circuit/vent
(function() {
  var speed = 0.2;
  var $machine = document.getElementById('machine');
  var $vents = document.getElementById('vents');
  var $vents2 = document.createElement('div');
  $vents2.id = 'vents2';
  $machine.className += ' js-vents';
  $vents.parentNode.insertBefore($vents2, $vents.previousSibling);

  function scrollCircuit() {
    var scrolled = document.body.scrollTop;
    console.log('scrolling ' + scrolled);
    $vents2.style.webkitTransform = 'translate3d(0, ' + (scrolled * speed) + 'px, 0)';
  }

  window.addEventListener('touchmove', scrollCircuit);
  window.addEventListener('scroll', scrollCircuit);
})();