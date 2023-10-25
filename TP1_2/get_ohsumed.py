import os
from collections import defaultdict
from keras.preprocessing.text import text_to_word_sequence, Tokenizer

def get_info(path: str):
    data = list(os.walk(path))[1:]
    files = []
    for d in data:
        folder_name = d[0]
        for file in d[2]:
            files.append((folder_name.split('/')[-1], os.path.join(folder_name, file)))

    d = defaultdict(int)
    texts = defaultdict(list)
    for (cate, file) in files:
        with open(file, 'r') as outfile:
            text = outfile.read()
            texts[cate].append(text)
            words = text_to_word_sequence(text)
            for word in words:
                d[word] += 1
    words = sorted(d.items(), key=lambda x: x[1], reverse=True)
    return (texts, words)