import json
import numpy as np 
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize,word_tokenize
import requests
import re
from flask import Flask,request,jsonify,make_response
import nltk
from flask_cors import CORS
import newspaper
import pandas as pd
import json
import requests

url = "https://graph.facebook.com/v2.6/me/messages"
ngrok_url = 'https://the-daily-news-app.herokuapp.com/api/'

source_csv = pd.read_csv('https://raw.githubusercontent.com/codequipo/TheDailyNews/deploy/sites.csv')

app = Flask(__name__)
CORS(app)

PORT=8087

import csv

li_all=[]
key_name_all=[]

@app.route('/',methods = ['GET','POST'])
def base():
	return 'hello world'


@app.route('/webhook', methods=['GET', 'POST'])
def webhook():
	req = request.get_json(force=True)
	print("-"*80)
	print(req.get('queryResult').get('intent').get('displayName'))
	print("-"*80)
	if req.get('queryResult').get('intent').get('displayName') == 'summarize_intent':
		database_id = req.get('queryResult').get('queryText').strip('Summarize:')
		summary_url = ngrok_url + 'getSummary'
		data2 = {'unique_id': database_id }
		summary = requests.post(summary_url,data = data2)
		article_dict = json.loads(summary.text)
		article_summary = article_dict['article'][0]['text']
		articl_image = article_dict['article'][0]['top_image']
		return {'fulfillmentText': article_summary}

	if req.get('queryResult').get('intent').get('displayName') == 'source_intent':
		source_name = req.get('queryResult').get('queryText')[7:]
		source_link = source_csv['link'][source_csv.loc[source_csv['name']==source_name].index[0]]
		news_url = ngrok_url + 'getnewsbysources'
		data1 = {'main_urls':source_link }
		post_articles = requests.post(news_url,data = data1)
		list_of_articles = json.loads(post_articles.text)
		li = list_of_articles['articles']
		messages = []
		print(len(li))
		for index,item in enumerate(li):
			temp = dict()
			with open('https://raw.githubusercontent.com/codequipo/TheDailyNews/deploy/flask_server/format.json','r') as f:
				temp = json.load(f)

			temp['card']['buttons'][0]['postback'] = 'Summarize:'+item['unique_id']
			temp['card']['title'] = item['title']
			temp['card']['imageUri'] = item['top_image']
			print(item['url'])
			temp['card']['buttons'][1]['postback'] = item['url']
			messages.append(temp)

		messages = messages[:10]
		# print(messages)
		return jsonify({'fulfillmentMessages': messages })  
	

	return{'fulfillmentText':"Please check your responses again  "}



@app.route("/db",methods=['POST','GET'])
def build_database():

	with open('https://raw.githubusercontent.com/codequipo/TheDailyNews/deploy/sites.csv') as csvDataFile:
		csvReader = csv.reader(csvDataFile)
		for row in csvReader:
			li_all.append(row[1])
			key_name_all.append(row[0])
			print(key_name_all)

	print("li: ")
	li=li_all[0:20]
	li2=key_name_all[0:20]
	print(li)
	print()
	
	res_data=dict()
	for url in li:
		toi=newspaper.build(url,memoize_articles=True,language='en')
		
		d=dict()
		k=0
		for article in toi.articles:
			try:
				article.download() 
				article.parse() 
				summary = driver(article.text,2)
				info=dict()
				info['url']=article.url
				info['title']=article.title
				print('title:::::::::::::'+info['title'])
				info['text']=summary
				info['top_image']=article.top_image

				d[k]=info
				k+=1
				if k==5:
					break
			except Exception as e:
				print("Entered except block :"+str(e))
				pass
		d['length']=k
		res_data[url]=d

		print(url+"   NewArticles : "+str(k))

	result={
		'success':True,
		'alldata':res_data,
		'allsite':li,
		'allsite_key':li2
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
    app.run(port=PORT)
