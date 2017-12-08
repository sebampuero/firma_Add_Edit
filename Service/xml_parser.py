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
    with open(filename, 'r') as xml_file:
        tree = ET.parse(xml_file, ET.XMLParser(encoding='UTF-8'))
    root = tree.getroot()
    firms = root.findall('firma')
    return firms
