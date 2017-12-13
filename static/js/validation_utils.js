/*
* Validation rules, methods and messages for forms
* @author Sebastian Ampuero
* @date 05.12.2017
*/

/*
* Custom validation method for the PLZ input in the firm form. Depending on the selecting Country (DE, AT, CH) , it
* evaluates the correct PLZ.
* @return true if the validation was successful, false otherwise
*/
function validate_PLZ(value, element) {
    var land = $('select#land_select').val();
    var valid = false;
    switch(land){
        case 'DE':
            if(/(^\d{5}$)/i.test(value)){
                valid = true;
            }break;
        case 'CH':
            if(/(^\d{4}$)/i.test(value)){
                valid = true;
            }break;
        case 'AT':
            if(/(^\d{4}$)|(^\d{4}-\d{4}$)/i.test(value)){
                valid = true;
            }break;
    }
    return this.optional(element) || valid;
}
/*
* Custom validation method for the amount of given cellphone numbers
* @return true if the amount is less than 4, false otherwise
*/
function validate_telefon_list_size(value, element){
    //check regex here too
    var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val(),
        telefon_list = telefon_input.split(',');
    return this.optional(element) || telefon_list.length <= 4;
}
/*
* Custom validation method for format of the given cellphone numbers
* @return true if the validation was successful, false otherwise
*/
function validate_telefon_format(value, element){
    var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val(),
        telefon_list = telefon_input.split(','),
        regex = /^(\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d\s*\d?\s*\d?\s*)$/;
    for(var i=0; i<telefon_list.length; i++){
        if(!regex.test(telefon_list[i].trim()))
            return false;
    }
    return this.optional(element) || true;
}
$.validator.addMethod("PLZ_Validator", validate_PLZ);
$.validator.addMethod("Telefon_list_size_validator",validate_telefon_list_size);
$.validator.addMethod("Telefon_format_validator",validate_telefon_format);

// ------------------------ Validation rules ---------------------------------------

var ans_form_validation_rules = {
    rules: {
       name: 'required',
       anrede: 'required',
       email: {
            required: true,
            email: true,
            pattern: /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-z\.]{2,6})$/
       },
       'telefon[]': {
            required: true,
            Telefon_list_size_validator: true,
            Telefon_format_validator: true

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
            Telefon_list_size_validator: 'Maximale Anzahl von Telefonnnumern ist 4',
            Telefon_format_validator: 'Überprüfen Sie das Format der angegebenen Telefonnumern'
        }
    }
};
var firm_form_validation_rules = {
    rules: {
        name: 'required',
        strasse_hnr: 'required',
        plz: {
            required: true,
            PLZ_Validator: true
        },
        ort: 'required',
        website: {
            required: true,
            pattern: /^(https?:\/\/)?(www?)\.([a-zA-Z0-9-\.]+)\.([a-z]{2,3})$/
        },
        erfassungsdatum: 'required',
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
        erfassungsdatum: 'Erfassungsdatum ist pflicht',
        land: {
            required: "Ein Land muss angegeben werden",
            pattern: "Kein gültiges Format"
        },
        branche: 'Die Branche muss angegeben werden'
    }
};