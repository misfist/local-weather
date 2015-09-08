(function() {
  (function($) {
    return $.fn.localtime = function() {
      var fmtDate, fmtZero;
      fmtZero = function(str) {
        return ('0' + str).slice(-2);
      };
      fmtDate = function(d) {
        var hour, meridiem;
        hour = d.getHours();
        if (hour < 12) {
          meridiem = "AM";
        } else {
          meridiem = "PM";
        }
        if (hour === 0) { hour = 12; }
        if (hour > 12) { hour = hour - 12; }
        //return hour + ":" + fmtZero(d.getMinutes()) + " " + meridiem + " " + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        return hour + ":" + fmtZero(d.getMinutes()) + " " + meridiem;
      };
      return this.each(function() {
        var tagText;
        tagText = $(this).html();
        $(this).html(fmtDate(new Date(tagText)));
        return $(this).attr("title", tagText);
      });
    };
  })(jQuery);
}).call(this);