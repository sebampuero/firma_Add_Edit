ValidationUtils = {}

ValidationUtils = (function(){

  /*
  * Custom validation method for the PLZ input in the firm form. Depending on the selecting Country (DE, AT, CH) , it
  * evaluates the correct PLZ.
  * @return true if the validation was successful, false otherwise
  */
  function validatePLZ( value, element ) {
      var land = $('select#land_select').val();
      var valid = false;
      switch(land){
          case 'DE':
              if(/(^\d{5}$)/i.test( value )){
                  valid = true;
              }break;
          case 'CH':
              if(/(^\d{4}$)/i.test( value )){
                  valid = true;
              }break;
          case 'AT':
              if(/(^\d{4}$)|(^\d{4}-\d{4}$)/i.test( value )){
                  valid = true;
              }break;
      }
      return this.optional(element) || valid;
  }
  /*
  * Custom validation method for the amount of given cellphone numbers
  * @return true if the amount is less than 4, false otherwise
  */
  function validateTelefonListSize( value, element ){
      //check regex here too
      var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val(),
          telefon_list = telefon_input.split(',');
      return this.optional(element) || telefon_list.length <= 4;
  }
  /*
  * Custom validation method for format of the given cellphone numbers
  * @return true if the validation was successful, false otherwise
  */
  function validateTelefonFormat( value, element ){
      var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val(),
          telefon_list = telefon_input.split(','),
          regex = /^(\+|0)?\d-?\d-?\d-?\d-?\d-?\d-?\d-?\d-?\d-?\d-?\d?-?\d?-?\d?-?\d?$/,
          telefon = "";
      for(var i=0; i<telefon_list.length; i++){
          telefon = telefon_list[i].trim().replace(/ +/g, "");
          if(!regex.test(telefon))
              return false;
      }
      return this.optional(element) || true;
  }


  $.validator.addMethod("PLZ_Validator", validatePLZ);
  $.validator.addMethod("telefon_list_size_validator",validateTelefonListSize);
  $.validator.addMethod("telefon_format_validator",validateTelefonFormat);

  // ------------------------ Validation rules ---------------------------------------

  var ans_form_validation_rules = {
      rules: {
         name: {
           required: true,
           nowhitespace: true
         },
         anrede: 'required',
         email: {
              required: true,
              email: true,
              pattern: /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-z\.]{2,6})$/
         },
         'telefon[]': {
              required: true,
              telefon_list_size_validator: true,
              telefon_format_validator: true

         }
      },
      messages: {
          name: 'Name muss angegeben werden!',
          anrede: 'Anrede muss angegeben werden',
          email: {
              required: 'Eine Emailadresse muss angegeben werden',
              email: 'Es muss eine gültige Adresse angegeben werden',
              pattern: 'Es muss eine gültige Adresse angegeben werden'
          },
          'telefon[]': {
              required: 'Mindestens eine Telefonnummer muss angegeben werden',
              telefon_list_size_validator: 'Maximale Anzahl von Telefonnnumern ist 4',
              telefon_format_validator: 'Überprüfen Sie das Format der angegebenen Telefonnumern'
          }
      }
  };
  var firm_form_validation_rules = {
      rules: {
          name: {
            required: true,
            nowhitespace: true
          },
          strasse_hnr: {
            required: true,
            nowhitespace: true
          },
          plz: {
              required: true,
              PLZ_Validator: true
          },
          ort: {
            required: true,
            nowhitespace: true
          },
          website: {
              required: true,
              pattern: /^(https?:\/\/)?(www?)\.([a-zA-Z0-9-\.]+)\.([a-z]{2,3})$/
          },
          land: {
              required: true,
              pattern: /(DE|CH|AT)/
          },
          branche: 'required'
      },
      messages: {
          name: 'Name muss angegeben werden',
          strasse_hnr: 'Eine Adresse muss angegeben werden',
          plz: {
              required: 'Eine Postleitzahl muss angegeben werden',
              PLZ_Validator: 'Ungültige Postleitzahl für das gewählte Land'
          },
          ort: 'Ein Ort muss angegeben werden',
          website: {
              required: 'Eine Website muss angegeben werden',
              pattern: 'Es muss eine gültige Adresse angegeben werden'
          },
          land: {
              required: "Ein Land muss angegeben werden",
              pattern: "Kein gültiges Format"
          },
          branche: 'Die Branche muss angegeben werden'
      }
  };
  return{
    ans_form_validation_rules: ans_form_validation_rules,
    firm_form_validation_rules: firm_form_validation_rules
  }
})();
