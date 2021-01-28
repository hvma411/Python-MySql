from flask import Flask, request, Response, render_template, jsonify
import json
import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    # port=3306,
    user="root",
    password="root",
    database='newsletter_db'
)

connection.autocommit = True

app = Flask(__name__, static_folder="static")
# CORS(app)
cursor = connection.cursor()

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/emailsList')
def emailsList():
    return render_template('emailsList.html')

@app.route('/showEmails')
def showEmails():
    querySelect = ("SELECT * "
                   "FROM subscribers")
    cursor.execute(querySelect)

    json_data = []
    json_tuples = cursor.fetchall()

    for obj in json_tuples:
        json_data.append(dict({"id": obj[0], "name": obj[1], "email": obj[2]}))

    return json.dumps(json_data)

@app.route('/addEmail', methods=['POST'])
def addEmail():
    try:
        if request.is_json and request.json.get('name') and request.json.get('email'):

            name = request.json.get('name')
            email = request.json.get('email')

            query = (' INSERT INTO subscribers VALUES(NULL, %s, %s)')

            cursor.execute(query, (name, email))
            return "True"

    except:

        return "Something went wrong", 500


if __name__ == '__main__':
    app.run()
