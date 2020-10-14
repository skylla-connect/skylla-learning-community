# Import flask
from flask import Flask 
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../config.json"
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

firebase_admin.initialize_app()

db = firestore.client()

doc_ref = db.collection(u'admin').document(u'Ronnie')
doc_ref.set({
    u'fname': u'Ronnie',
    u'lname': u'Namwanza',
    u'born': 1993
})

users_ref = db.collection(u'admin')
docs = users_ref.stream()

for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')
  
  
# Setup the flask app by creating an instance of Flask
app = Flask(__name__, static_url_path='')  

# When someone goes to / on the server, execute the following function
@app.route('/')  
def home():
    # Return index.html from the static folder
    return app.send_static_file('index.html')  

# If the script that was run is this script (we have not been imported)
if __name__ == '__main__':  
    # Start the server
    app.run()  