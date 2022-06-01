from operator import le
import numpy
import re
import string
import json
import os,re
from gensim.parsing.preprocessing import remove_stopwords,STOPWORDS
all_stopwords= STOPWORDS.union(set(['cses','input','output','example','testcase','submit','leetcode','codeforces','codechef','chef','code']),set(string.ascii_lowercase),set(string.punctuation),set(string.digits),set(string.ascii_uppercase),set(string.printable),set(string.hexdigits))

general=[]
cnt=0
file_names=open('./prob_names.txt','r').read().split('\n')
data_path='./Database/'
for file_name in file_names:
    pth=data_path+file_name+'.txt'
    if os.path.exists(pth):
        cnt+=1
        datas=re.sub('[^a-zA-Z0-9 \n\.]','',open(str(pth),'r').read().lower())
        keywords = re.findall("[\w']+",datas)
        keywords=[word for word in keywords if not word in all_stopwords]
        for k in keywords:
            general.append(k)
unique_keywords=list(set(general))
l=[]
for wrd in unique_keywords:
    if wrd[0] in string.digits or wrd[0] in string.punctuation or wrd[len(wrd)-1] in string.digits:
        continue
    if len(wrd) <=12:
        l.append(wrd)
with open('uniqueKeys.json','w') as fd:
    json.dump(l,fd)
print(len(l))