"""
Service for creating, editing and retrieving firms
@author Sebastian Ampuero
@date 8.12.2017
"""
from Entities.Ansprechpartner import Ansprechpartner
from Entities.Firma import Firma
from Service.xml_parser import get_firms_from_xml, insert_firm,delete_firm


def edit_firm(content):
    firma_dict = content
    delete_firm(firma_dict['name'].lower())
    create_firm(content)


# Insert a new firm
def create_firm(content):
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


# Retrieve a firm from the list by name
# @return the searched firm, None is returned when not found
def get_firm_by_name(name):
    firms_elements = get_firms_from_xml()
    for f_element in firms_elements:
        if name in f_element.attrib['name'].lower():
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
            return firma
