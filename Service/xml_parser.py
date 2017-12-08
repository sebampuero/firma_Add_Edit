"""
Parses the XML File containing firm elements
@author Sebastian Ampuero
@date 8.12.2017
"""
import xml.etree.ElementTree as ET
from xml.dom import minidom

filename = "Data/firmendaten.xml"


# Retrieve a list of firms from the XML File
# @return the list of firms elements found in the xml file
def get_firms_from_xml():
    firms = get_root()[0].findall('firma')
    return firms


# Delete a firm in the XML File by name
def delete_firm(firma_name):
    root, tree = get_root()
    for firma in root.findall('firma'):
        name = firma.attrib['name'].lower()
        if name == firma_name:
            root.remove(firma)
    tree.write(filename)


# Insert a new firm into the XML file
def insert_firm(firma):
    root, tree = get_root()
    firma_attrib = {'name': firma.name}
    firma_element = ET.SubElement(root, 'firma', firma_attrib)
    ET.SubElement(firma_element, 'branche').text = firma.branche
    ET.SubElement(firma_element, 'strasse_hnr').text = firma.strasse_hnr
    if firma.adresszusatz != "":
        ET.SubElement(firma_element, 'adresszusatz').text = firma.adresszusatz
    ET.SubElement(firma_element, 'plz').text = firma.plz
    ET.SubElement(firma_element, 'ort').text = firma.ort
    ET.SubElement(firma_element, 'land').text = firma.land
    ET.SubElement(firma_element, 'website').text = firma.website
    for ans in firma.ansprechpartner_liste:
        ans_attrib = {'name': ans.name}
        ansprechpartner_element = ET.SubElement(firma_element, 'ansprechpartner', ans_attrib)
        ET.SubElement(ansprechpartner_element, 'anrede').text = ans.anrede
        if ans.titel != "":
            ET.SubElement(ansprechpartner_element, 'titel').text = ans.titel
        if ans.funktion != "":
            ET.SubElement(ansprechpartner_element, 'funktion').text = ans.funktion
        ET.SubElement(ansprechpartner_element, 'telefon').text = ans.telefon
        if ans.fax != "":
            ET.SubElement(ansprechpartner_element, 'fax').text = ans.fax
        ET.SubElement(ansprechpartner_element, 'email').text = ans.email
    ET.SubElement(firma_element, 'erfassungsdatum').text = firma.erfassungsdatum
    tree.write(filename)


# Get the root of the XML File
# @return the root
def get_root():
    with open(filename, 'r') as xml_file:
        tree = ET.parse(xml_file, ET.XMLParser(encoding='UTF-8'))
    return tree.getroot(), tree
