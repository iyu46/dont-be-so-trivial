import mysql.connector
import json
import urllib.parse
import random
import glob

categoryMap = {
    'General Knowledge': 'General Knowledge',
    'Books': 'Arts & Literature',
    'Film': 'Entertainment',
    'Music': 'Arts & Literature',
    'Musicals & Theatres': 'Arts & Literature',
    'Television': 'Entertainment',
    'Video Games': 'Entertainment',
    'Board Games': 'Entertainment',
    'Science & Nature': 'Science & Technology',
    'Computers': 'Science & Technology',
    'Mathematics': 'Science & Technology',
    'Mythology': 'Arts & Literature',
    'Sports': 'Sports & Vehicles',
    'Geography': 'World Knowledge',
    'History': 'World Knowledge',
    'Politics': 'World Knowledge',
    'Art': 'Arts & Literature',
    'Celebrities': 'Entertainment',
    'Animals': 'Science & Technology',
    'Vehicles': 'Sports & Vehicles',
    'Comics': 'Entertainment',
    'Gadgets': 'Science & Technology',
    'Japanese Anime & Manga': 'Entertainment',
    'Cartoon & Animations': 'Entertainment'

}


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="triviagame"
)
mycursor = mydb.cursor()

for file in glob.glob('*.txt'):
    f = open(file, 'r')
    count = 0
    for line in f:
        obj = json.loads(line)
        topic = urllib.parse.unquote(obj['category'])
        if ':' in topic:
            topic = topic.split(': ')[1]
        category = categoryMap[topic]
        difficulty = obj['difficulty']
        question = urllib.parse.unquote(obj['question'])
        correctAnswer = urllib.parse.unquote(obj['correct_answer'])
        #Decode all incorrect answers into an array of strings
        answers = [urllib.parse.unquote(ans) for ans in obj['incorrect_answers']]
        answers.append(correctAnswer)
        #Shuffle the answers
        random.shuffle(answers)
        answers = json.dumps(answers)

        #Insert into the DB
        sql = "INSERT INTO quickstarterquestions (Category, Topic, Difficulty, Question, CorrectAnswer, Answers) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (category, topic, difficulty, question, correctAnswer, answers)
        mycursor.execute(sql, val)
        mydb.commit()
        count += 1

    print(f'{file}: {count} records added')
    f.close()

