import json
import numpy as np 
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize,word_tokenize
import requests
import re
from flask import Flask,request
from flask import request,jsonify
import nltk
from flask_cors import CORS
import newspaper

app = Flask(__name__)
CORS(app)

PORT=8087

import csv

li_all=[]
key_name_all=[]
with open('sites.csv') as csvDataFile:
	csvReader = csv.reader(csvDataFile)
	for row in csvReader:
		li_all.append(row[1])
		key_name_all.append(row[0])


		
		


print(key_name_all)
		
		
		

# print(li)

@app.route("/",methods=['POST','GET'])
def hello():
	
	print("li: ")
	li=li_all[0:20]
	print(li)
	print()
	
	res_data=dict()
	for url in li:

		
		
		#request.get_json()['language']
		toi=newspaper.build(url,memoize_articles=True,language='en')
		
		d=dict()
		k=0
		for article in toi.articles:
			try:
				article.download() 
				article.parse() 
				# article.nlp() 

				summary = driver(article.text,2)

				info=dict()
				info['url']=article.url
				info['title']=article.title
				info['text']=summary
				# info['summary']=article.summary
				# info['keywords']=article.keywords
				info['top_image']=article.top_image
				# print("article.publish_date : "+article.publish_date)

				

				d[k]=info
				k+=1
				if k==5:
					break
			except Exception as e:
				print("Entered except block :"+str(e))
				pass
		# d['length']=len(toi.articles)
		d['length']=k
		res_data[url]=d

		print(url+"   NewArticles : "+str(k))

		
		
    
    

	result={
		'success':True,
		'alldata':res_data,
		'allsite':li,
		'allsite_key':key_name_all
	}
	return json.dumps(result)


def clean(sentences):
	lemmatizer = WordNetLemmatizer()
	cleaned_sentences = []
	for sentence in sentences:
		sentence = sentence.lower()
		sentence = re.sub(r'[^a-zA-Z]',' ',sentence)
		sentence = sentence.split()
		sentence = [lemmatizer.lemmatize(word) for word in sentence if word not in set(stopwords.words('english'))]
		sentence = ' '.join(sentence)
		cleaned_sentences.append(sentence)
	return cleaned_sentences

def init_probability(sentences):
	probability_dict = {}
	words = word_tokenize('. '.join(sentences))
	total_words = len(set(words))
	for word in words:
		if word!='.':
			if not probability_dict.get(word):
				probability_dict[word] = 1
			else:
				probability_dict[word] += 1

	for word,count in probability_dict.items():
		probability_dict[word] = count/total_words 
	
	return probability_dict

def update_probability(probability_dict,word):
	if probability_dict.get(word):
		probability_dict[word] = probability_dict[word]**2
	return probability_dict

def average_sentence_weights(sentences,probability_dict):
	sentence_weights = {}
	for index,sentence in enumerate(sentences):
		if len(sentence) != 0:
			average_proba = sum([probability_dict[word] for word in sentence if word in probability_dict.keys()])
			average_proba /= len(sentence)
			sentence_weights[index] = average_proba 
	return sentence_weights

def generate_summary(sentence_weights,probability_dict,cleaned_article,tokenized_article,summary_length = 30):
	summary = ""
	current_length = 0
	while current_length < summary_length :
		highest_probability_word = max(probability_dict,key=probability_dict.get)
		sentences_with_max_word= [index for index,sentence in enumerate(cleaned_article) if highest_probability_word in set(word_tokenize(sentence))]
		sentence_list = sorted([[index,sentence_weights[index]] for index in sentences_with_max_word],key=lambda x:x[1],reverse=True)
		summary += tokenized_article[sentence_list[0][0]] + "\n"
		for word in word_tokenize(cleaned_article[sentence_list[0][0]]):
			probability_dict = update_probability(probability_dict,word)
		current_length+=1
	return summary

def driver(article,required_length):
	required_length = int(required_length)
	tokenized_article = sent_tokenize(article)
	cleaned_article = clean(tokenized_article) 
	probability_dict = init_probability(cleaned_article)
	sentence_weights = average_sentence_weights(cleaned_article,probability_dict)
	summary = generate_summary(sentence_weights,probability_dict,cleaned_article,tokenized_article,required_length)
	return summary

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)