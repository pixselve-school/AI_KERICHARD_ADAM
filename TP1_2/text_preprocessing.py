from nltk.tokenize import RegexpTokenizer

tokenizer = RegexpTokenizer(r'\w+')
tokenizer.tokenize('Eighty-seven (miles it\'s  %to go, yet.  Onward! 3.88')
"""
['Eighty', 'seven', 'miles', 'it', 's', 'to', 'go', 'yet', 'Onward', '3', '88']
"""
