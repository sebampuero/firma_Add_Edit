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
function validate_telefon_list_size(value, element){
    var telefon_input = $(this.currentForm).find('input[name="telefon[]"]').val();
    var telefon_list = telefon_input.split(',');
    return this.optional(element) || telefon_list.length <= 4;
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
            Telefon_list_size_validator: true,
            pattern: /[0-9]*(\+49)*[ ]*(\([0-9]+\))*([ ]*(-|–)*[ ]*[0-9]+)*/

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
            required: 'Eine Telefonnummer muss angegeben werden',
            Telefon_list_size_validator: 'Maximale Anzahl von Telefonnnumern ist 4',
            pattern: 'Ungültiges Format'
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