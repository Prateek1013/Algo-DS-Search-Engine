
from logging.config import dictConfig
import operator
import numpy as np
import re
import string
import json
import os
from gensim.parsing.preprocessing import remove_stopwords,STOPWORDS
all_stopwords= STOPWORDS.union(set(['cses','input','output','example','testcase','submit','leetcode','codeforces','codechef','chef','code']),set(string.ascii_lowercase),set(string.punctuation),set(string.digits),set(string.ascii_uppercase),set(string.printable),set(string.hexdigits))
#bm25 params
k=1.25
b=0.75
file_names=open('./prob_names.txt','r').read().split('\n')
file_names=set(file_names)
data_path='./Database/'
unique_keywords=[]
with open('uniqueKeys.json','r') as uk:
    unique_keywords=json.load(uk)
idx=[]
with open('idx_vec.json','r') as dx:
    idx=json.load(dx)

d=0
N=0
for file_name in file_names:
    if os.path.exists(data_path+file_name+'.txt'):
        N+=1
        keywords=re.findall("[\w']+",open(data_path+file_name+'.txt','r').read().lower())
        keywords=[word for word in keywords if not word in all_stopwords]
        d=d+len(keywords)
davg=d/N

d=dict.fromkeys([name for name in file_names],[])
for file_name in file_names:
    if os.path.exists(data_path+file_name+'.txt'):
        keywords=re.findall("[\w']+",open(data_path+file_name+'.txt','r').read().lower())
        keywords=[word for word in keywords if not word in all_stopwords]
        temp=[]
        for id,word in enumerate(unique_keywords):
            cnt=keywords.count(word)>0
            if cnt>0:
                temp.append([id,cnt*idx[id]*(k+1)])
        if len(temp)>0:
            for i in range(len(temp)):
                temp[i][1]=temp[i][1]/(len(temp)+k*(1-b+b*(len(keywords)/davg)))
        # for i in range(len(temp)):
        #     temp[i][1]*=idx[temp[i][0]]
        d[file_name]=temp
print(len(file_names),len(d))
            
with open('tf-idf.json','w') as fi:
    json.dump(d,fi)
# d={}
# with open('tf-idf.json','r') as tf:
#     d=json.load(tf)
# print(len(d))

# print(d['Maximum Subarray Sum'][864])