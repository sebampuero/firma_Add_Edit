"""
Service for creating, editing and retrieving firms
@author Sebastian Ampuero
@date 8.12.2017
"""
from Entities.Ansprechpartner import Ansprechpartner
from Entities.Firma import Firma
from Service.xml_parser import get_firms_from_xml, insert_firm, delete_firm


# Edit a firm. Delete and then create a new element with the new data
def edit_firm(content):
    firma_dict = content
    delete_firm(firma_dict['name'].lower())
    status, code = create_firm(content)
    return status, code


# Insert a new firm
def create_firm(content):
    try:
        firma_dict = content
        ansprechpartner_list = []
        for ans in firma_dict['ansprechpartner']:
            ansprechpartner = Ansprechpartner(ans['name'], ans['anrede'], ans['telefon'], ans['email'], ans['titel'],
                                              ans['funktion'], ans['fax'])
            ansprechpartner_list.append(ansprechpartner)
        firma = Firma(firma_dict['name'], firma_dict['branche'], firma_dict['strasse_hnr'], firma_dict['plz'],
                      firma_dict['ort'],
                      firma_dict['land'], firma_dict['website'], ansprechpartner_list, firma_dict['erfassungsdatum'],
                      firma_dict['adresszusatz'])
        insert_firm(firma)
        return "ok", 200
    except:
        return "error", 500


# Retrieve a firm from the list by name
# @return the searched firm, None is returned when not found
def get_firms_by_name(name):
    firms_elements = get_firms_from_xml()
    firmas_list = []
    for f_element in firms_elements:
        if name in f_element.attrib['name'].lower():
            firmas_list = get_list_of_firms_from_xml(f_element, firmas_list)
    return firmas_list


# Retrive a list with all the firms
# @return the list of firms
def get_all_firms():
    firms_elements = get_firms_from_xml()
    firms_list = []
    for f_element in firms_elements:
        firms_list = get_list_of_firms_from_xml(f_element, firms_list)
    return firms_list


# Retrieve a list of branchs
# @return the list of branchs
def get_firm_branchs():
    firms = get_all_firms()
    branchs_list = []
    for a_firm in firms:
        branchs_list.append(a_firm.branche)
    return list(set(branchs_list))


# Populate the list of firms with the XML data
# @return the populated list
def get_list_of_firms_from_xml(f_element, firmas_list):
    ansprechpartner_list = []
    for a_element in f_element.findall('ansprechpartner'):
        ansprechpartner = Ansprechpartner(a_element.attrib['name'], a_element.find('anrede').text,
                                          a_element.find('telefon').text, a_element.find('email').text,
                                          "" if a_element.find('titel') is None else a_element.find(
                                              'titel').text,
                                          "" if a_element.find('funktion') is None else a_element.find(
                                              'funktion').text,
                                          "" if a_element.find('fax') is None else a_element.find('fax').text)
        ansprechpartner_list.append(ansprechpartner)
    firma = Firma(f_element.attrib['name'], f_element.find('branche').text, f_element.find('strasse_hnr').text,
                  f_element.find('plz').text, f_element.find('ort').text, f_element.find('land').text,
                  f_element.find('website').text, ansprechpartner_list, f_element.find('erfassungsdatum').text,
                  "" if f_element.find('adresszusatz') is None else f_element.find('adresszusatz').text)
    firmas_list.append(firma)
    return firmas_list
