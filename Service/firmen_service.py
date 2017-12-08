"""
Service for creating, editing and retrieving firms
@author Sebastian Ampuero
@date 8.12.2017
"""
from Entities.Ansprechpartner import Ansprechpartner
from Entities.Firma import Firma
from Service.xml_parser import get_firms_from_xml


def edit_firm():
    pass


def create_firm():
    pass


def get_firms():
    firms_elements = get_firms_from_xml()
    firms_list = []
    for f_element in firms_elements:
        ansprechpartner_list = []
        for a_element in f_element.findall('ansprechpartner'):
            ansprechpartner = Ansprechpartner(a_element.attrib['name'],a_element.find('anrede').text,
                                              a_element.find('telefon').text,a_element.find('email').text,
                                              "" if a_element.find('titel') is None else a_element.find('titel').text,
                                              "" if a_element.find('funktion') is None else a_element.find('funktion').text,
                                              "" if a_element.find('fax') is None else a_element.find('fax').text)
            ansprechpartner_list.append(ansprechpartner)
        firma = Firma(f_element.attrib['name'],f_element.find('branche').text,f_element.find('strasse_hnr').text,
                      f_element.find('plz').text,f_element.find('ort').text,f_element.find('land').text,
                      f_element.find('website').text,ansprechpartner_list,f_element.find('erfassungsdatum').text,
                      "" if f_element.find('adresszusatz') is None else f_element.find('adresszusatz').text)
        firms_list.append(firma)
    return firms_list


def get_firm_by_name():
    pass
