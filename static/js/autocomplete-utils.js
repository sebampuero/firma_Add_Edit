(function(){

  $('input#name-autocomplete').easyAutocomplete({
      url: function(name){
        return "firms?query="+name;
      },
      getValue: function(element){
        return element.name;
      }
  })

  $('input.autocomplete').easyAutocomplete({
      url: function(title){
        return "titles?query="+title;
      },
      getValue: function(element){
        return element.titel;
      }
  })
  $(".easy-autocomplete").removeAttr("style");

})();
