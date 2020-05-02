import json
import numpy as np 
import urllib
from urllib.request import urlopen
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
import time

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
		source_csv.columns = ['name','link']
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
			
			req = urllib.request.Request('https://raw.githubusercontent.com/codequipo/TheDailyNews/flask_deploy/format.json')
			with urllib.request.urlopen(req) as f:
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

def getSourceData():
	url = 'https://raw.githubusercontent.com/codequipo/TheDailyNews/deploy/sites.csv'
	df = pd.read_csv(url, error_bad_lines=False)
	url_list = []
	key_list = []
	url_list = df["http://www.huffingtonpost.com"].values.tolist()
	key_list = df["huffingtonpost"].values.tolist()
	url_list = ["http://www.huffingtonpost.com"] + url_list
	key_list = ["huffingtonpost"] + key_list
	return key_list,url_list

key_list, url_list= getSourceData()

@app.route("/db",methods=['POST','GET'])
def build_database():
	tic=time.time()
	# key_list,url_list = getSourceData()
	json_body=request.get_json(force=True)
	currCount = int(json_body.get('currCount'))
	numOfSources = int(json_body.get('numOfSources'))
	numOfArticlesPerSources = int(json_body.get('numOfArticlesPerSources'))
	num_of_sentences_in_summary = int(json_body.get('num_of_sentences_in_summary'))

	print('currCount : '+str(currCount))

	
	response_data=dict()
	for i in range(currCount,currCount+numOfSources):
		url=url_list[i]
		source = newspaper.build( url, memoize_articles=True, language='en')
		
		d=dict() # Holds articles from current selected source 
		k=0
		
		for article in source.articles:
			try:
				article.download() 
				article.parse() 
				summary = driver(article.text,num_of_sentences_in_summary)
				
				article_info=dict()
				article_info['url']=article.url
				article_info['title']=article.title
				print('i:'+str(i)+'  k:'+str(k)+'  title  => '+article_info['title'])
				article_info['text']=summary
				article_info['top_image']=article.top_image

				d[k]=article_info
				
				
				k+=1
				if k == numOfArticlesPerSources:
					break
			except Exception as e:
				print("Entered except block :"+str(e))
				pass
		d['length']=k
		response_data[url]=d

		print(url+"   NewArticles : "+str(k))

	result={
		'success':True,
		'alldata':response_data,
		'allsite':url_list[currCount:currCount+numOfSources],
		'allsite_key':key_list[currCount:currCount+numOfSources]
	}
	toc=time.time()
	diff=toc-tic
	print("# Time required for function to execute is :"+str(diff)+" # ")
	print()
	print()
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
