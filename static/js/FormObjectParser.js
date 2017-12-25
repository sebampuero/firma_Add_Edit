FormObjectParser = {}
FormObjectParser = (function(){

  /*
  * Parse Object from the forms
  * Date 20.12.2017
  */

  /*
  * Create and populate a firm object using the input fields in the forms. This method loops through both the
  * firm form and ansprechpartner forms(depending on if the form is 'visible', if it is not visible then it is not
  * taken into account)
  * @return an object containing the firm object and a validation flag which indicates if all forms passed the validation
  * rules
  */
  function parseFirmObject(){
      var firm_obj = {},
          validation_flag = true,
          ansprechpartner_list = [],
          $firm_form = $("form#firm_form");

      $firm_form.validate( ValidationUtils.firm_form_validation_rules );
      if(!$firm_form.valid()) validation_flag = false;
      $.each($firm_form.serializeArray(),function( index, element ){
          firm_obj[element.name] = element.value.trim();
      });
      firm_obj['erfassungsdatum'] = TimeUtils.getTodayDate();
      $('.ansprechpartner_form').each(function() { //get all ansprechpartner forms
          var ans_obj = {},
              $ans_form = $(this);
              $ans_form.validate( ValidationUtils.ans_form_validation_rules );
              if(!$ans_form.valid()){ //if the form is invalid, exit and return validation_flag = false
                  validation_flag = false;
                  return;
              }
              $.each( $ans_form.serializeArray(), function( index, element ){
                ans_obj[element.name] = element.name === "telefon[]" ?
                    element.value.trim().replace(/ +/g, "").split(',') :
                      ans_obj[element.name] = element.value.trim();
              });
              ansprechpartner_list.push( ans_obj );
      });
      firm_obj['ansprechpartner'] = ansprechpartner_list;
      if( !validation_flag ) return {flag:validation_flag};
      return {flag: validation_flag, firm_obj: firm_obj};
  }
  return {
    parseFirmObject: parseFirmObject
  }
})();
