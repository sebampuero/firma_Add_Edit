(function(){
  /*
  * Utils for the autocomplete function of the firm name and ansprechpartner title
  * Date 18.12.2017
  */

  $('input#name-autocomplete').easyAutocomplete({
      url: function(name){
        return "firms?query="+name; // get request to firms
      },
      getValue: function(element){
        return element.name; // return the name of the firm only
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
