import requests
import json
import os
#import mysql.connector

categories = {
    9: 'GeneralKnowledge',
    10: 'Books',
    11: 'Film',
    12: 'Music',
    13: 'MusicalsPlays',
    14: 'Television',
    15: 'VideoGames',
    16: 'BoardGames',
    17: 'ScienceNature',
    18: 'Computers',
    19: 'Mathematics',
    20: 'Mythology',
    21: 'Sports',
    22: 'Geography',
    23: 'History',
    24: 'Politics',
    25: 'Art',
    26: 'Celebrities',
    27: 'Animals',
    28: 'Vehicles',
    29: 'Comics',
    30: 'Gadgets',
    31: 'JapaneseAnimeManga',
    32: 'CartoonAnimation'
}
difficulties = ['easy', 'medium', 'hard']

sessionToken = requests.get('https://opentdb.com/api_token.php?command=request').json()['token']
print(sessionToken)

for i in categories:
    categoryName = categories[i]
    f = open(f'{categoryName}.txt', 'w+')

    code = 0
    count = 0
    url = f"https://opentdb.com/api.php?amount=5&category={i}&type=multiple&encode=url3986&token={sessionToken}"
    while code == 0:
        r = requests.get(url).json()
        count += 1
        code = r['response_code']
        if code != 0:
            print(r)
            print(f'{categoryName}: Called api {count} times')
            if code == 3:
                sessionToken = requests.get('https://opentdb.com/api_token.php?command=request').json()['token']
        else:
            resultsArray = r['results']
            stringsArray = [json.dumps(res) + '\n' for res in resultsArray]
            f.writelines(stringsArray)

    f.close()
