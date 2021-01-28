from flask import Flask, request, Response, render_template
import json
import mysql.connector
# from flask_cors import CORS

# LET's CREATE A REST API FOR NEWSLETTER
# it needs 2 endpoints
# One GET endpoint ('/showEmails/) that will show all the emails saved on the server in JSON format (response: JSON)
# One POST endpoint ('/addEmail/) that will receive a `name` and an `email` in the Request body as JSON (request: JSON)
# it will also return 'True' or 'False' wether you saved it successfully or not (response: STRING)
# save all new emails in a file, do not replace the old ones

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
    return json.dumps(cursor.fetchall(), indent=4)

@app.route('/addEmail', methods=['POST'])
def addEmail():
    try:
        with open('emails.json') as json_file:
            json_data = json.load(json_file)

            last_id = json_data[-1]['id']

            post_data = request.get_json()
            post_data['id'] = last_id + 1

            json_data.append(post_data)

            json_updated = json.dumps(json_data, indent=4)

        file = open('emails.json', "w")
        file.write(json_updated)

        return json_updated
    except:

        return "Something went wrong", 500


if __name__ == '__main__':
    app.run()
