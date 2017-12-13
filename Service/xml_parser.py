"""
Parses the XML File containing firm elements
@author Sebastian Ampuero
@date 8.12.2017
"""
import xml.etree.ElementTree as ET

filename = "Data/firmendaten.xml"


# Retrieve a list of firms from the XML File
# @return the list of firms elements found in the xml file
def get_firms_from_xml():
    try:
        firms = get_root()[0].findall('firma')
        return firms
    except Exception:
        return None


# Delete a firm in the XML File by name
def delete_firm(firma_name):
    try:
        root, tree = get_root()
        for firma in root.findall('firma'):
            name = firma.attrib['name'].lower()
            if name == firma_name:
                root.remove(firma)
        indent(root)
        tree.write(filename, encoding="utf-8", xml_declaration=True)
    except Exception:
        return None


# Insert a new firm into the XML file
def insert_firm(firma):
    try:
        root, tree = get_root()
        firma_attrib = {'name': firma.name, 'letztes_speichern_datum': firma.letztes_speichern_datum}
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
            for telefon in ans.telefon:
                ET.SubElement(ansprechpartner_element, 'telefon').text = telefon
            if ans.fax != "":
                ET.SubElement(ansprechpartner_element, 'fax').text = ans.fax
            ET.SubElement(ansprechpartner_element, 'email').text = ans.email
        ET.SubElement(firma_element, 'erfassungsdatum').text = firma.erfassungsdatum
        indent(root)
        tree.write(filename, encoding="utf-8", xml_declaration=True)
    except Exception:
        return None


# Get the root of the XML File
# @return the root
def get_root():
    try:
        with open(filename, 'r') as xml_file:
            tree = ET.parse(xml_file)
        return tree.getroot(), tree
    except Exception:
        return None


# Apply an indent to the XML File write whenever a firm gets updated or created. Useful utility function taken from
# https://exceptionshub.com/pretty-printing-xml-in-python.html Without this function, added firms are appended to
# the XML File in a single line
# @return the root element with indents
def indent(elem, level=0):
    i = "\n" + level * "  "
    j = "\n" + (level - 1) * "  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for subelem in elem:
            indent(subelem, level + 1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = j
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = j
    return elem
