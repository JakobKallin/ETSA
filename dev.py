import sys

from bs4 import BeautifulSoup as parse_html

print sys.argv[1]
html = open(sys.argv[1]).read().decode('utf-8', 'ignore')
doc = parse_html(html)
open(sys.argv[2], 'w').write(doc.prettify().encode('utf-8'))