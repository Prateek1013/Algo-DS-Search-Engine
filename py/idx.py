import numpy
import re
import string
import json
import os
from gensim.parsing.preprocessing import remove_stopwords,STOPWORDS
all_stopwords= STOPWORDS.union(set(['cses','input','output','example','testcase','submit','leetcode','codeforces','codechef','chef','code']),set(string.ascii_lowercase),set(string.punctuation),set(string.digits),set(string.ascii_uppercase),set(string.printable),set(string.hexdigits))
file_names=open('./prob_names.txt','r').read().split('\n')
file_names=set(file_names)
data_path='./Database/'
General=[]
with open('uniqueKeys.json','r') as f:
    General=json.load(f)

Documents=[]
for file_name in file_names:
    if os.path.exists(data_path+file_name+'.txt'):
        keywords=re.findall("[\w']+",open(data_path+file_name+'.txt','r').read().lower())
        keywords=[word for word in keywords if not word in all_stopwords]
        Documents.append(keywords)
idx=[]
for keyword in General:
    k=0
    for doc in Documents:
        if keyword in doc:
            k+=1
    if k>0:
        idx.append(numpy.log((len(Documents))/k))
    else:
        idx.append(k)
with open('idx_vec.json','w') as tf:
    json.dump(idx,tf)
print(len(idx),len(General))
# l=[]
# with open('idx_vec.json','r') as tf:
#     l=json.load(tf)
# print(len(l))