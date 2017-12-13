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
    var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val();
    var telefon_list = telefon_input.split(',');
    return this.optional(element) || telefon_list.length <= 4;
}
/*
* Custom validation method for format of the given cellphone numbers
* @return true if the validation was successful, false otherwise
*/
function validate_telefon_format(value, element){
    var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val();
    var telefon_list = telefon_input.split(',');
    for(var i=0, tested_telefon_index=0; i<telefon_list.length; i++){
        //test every telefon with regex
        //if there is one invalid phone, return false with the indicated telefon index
    }
    return this.optional(element) || true;
}
$.validator.addMethod("PLZ_Validator", validate_PLZ);
$.validator.addMethod("Telefon_list_size_validator",validate_telefon_list_size);

// ------------------------ Validation rules ---------------------------------------

var ans_form_validation_rules = {
    rules: {
       name: 'required',
       anrede: 'required',
       email: {
            required: true,
            email: true,
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
       },
       'telefon[]': {
            required: true,
            Telefon_list_size_validator: true

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
            Telefon_list_size_validator: 'Maximale Anzahl von Telefonnnumern ist 4'
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
            required: true
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
            required: 'Eine Website muss angegeben werden'
        },
        erfassungsdatum: 'Erfassungsdatum ist pflicht',
        land: {
            required: "Ein Land muss angegeben werden",
            pattern: "Kein gültiges Format"
        },
        branche: 'Die Branche muss angegeben werden'
    }
};