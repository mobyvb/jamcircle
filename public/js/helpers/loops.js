$(document).ready(function() {
  var loopList = $('#looplist').children();
  for (var i=0; i<loopList.length; i++) {
    var nextLoop = loopList[i];
    var checkbox = $(nextLoop).children('input');
    $(checkbox).on('change', function(e) {
      var checked = e.target.checked;
      if (checked) {
        socket.emit('startloop', {loopname: e.target.name});
      } else {
        socket.emit('stoploop', {loopname: e.target.name});
      }
    });
  }
});
