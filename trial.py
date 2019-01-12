from bs4 import BeautifulSoup

data = open('table.html').read()

parser = BeautifulSoup(data, 'html.parser')

table = parser.find('table')

if table == None : 
    print('No table')
    exit()

rows = table.find_all('tr')
print(rows)