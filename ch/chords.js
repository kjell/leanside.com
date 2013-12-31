$(function() {
  $("#chords section").hide();

  $('#find #chord').blur(function() {
    $(".chord pre").hide();
    var wanted_chord = findChordSelector(normalizeChordName($(this).val()));
    console.log(wanted_chord);
    $(wanted_chord).show();
    $(wanted_chord + ' pre').show();
    $(wanted_chord).parent().show();
    $(wanted_chord).parent().parent().show();
  });       
  
  $("#find #chord").focus(function() {this.value.match(/^what/) ? this.value = '' : '';})
  
  $('#find').submit(function() {
    $('#find #chord').blur(); return false;
  });
  
  function normalizeChordName(name) {
    form = /([A-H][#|b]?)(maj|M|min|m|\-)?(aug|\+|dim|º|\([b|♭]5\))?(\d)?(sus4|sus2|add9|add11)?/
    parts = name.match(form);
    parts.shift();
    return parts;
  } // http://en.wikipedia.org/wiki/Chord_notation
  
  function findChordSelector(chord_array) {
    // [root, (major, minor), (aug, dim), (seventh, sixth, five), (sus,add)]
    transforms = [
      function(rt) { return rt.replace('#', 's'); },
      function(mm) { return mm.match(/^(min|m|-)$/) ? 'minor' : 'major' },
      function(ad) { return (ad == 'aug' || ad == '+') ? 'aug' : 'dim'},
      function(sf) { if (sf == '7') return 'seventh';if (sf == '6') return 'sixth'; if (sf == '5') return 'five'; },
      function(sa) { return sa }
    ]
    
    if(chord_array[1] == undefined && chord_array[2] == undefined && chord_array[4] == undefined && chord_array[3] != '5')
      chord_array[1] = 'maj';
    
    sel = $.map(chord_array, function(part, i) {
      return (part != undefined) ? "." + transforms[i](part) : '';
    });
    
    return sel.join(' ');
  }
});