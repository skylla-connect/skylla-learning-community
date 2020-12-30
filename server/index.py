# Import flask
from flask_cors import CORS
from flask import Flask, request, json, jsonify
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./config.json"
import firebase_admin
from firebase_admin import credentials, messaging
from firebase_admin import firestore
from pyfcm import FCMNotification

cred = credentials.Certificate('./config.json')
admin = firebase_admin.initialize_app(cred)



db = firestore.client()

# doc_ref = db.collection(u'admin').document(u'Ronnie')
# doc_ref.set({
#     u'fname': u'Ronnie',
#     u'lname': u'Namwanza',
#     u'born': 1993
# })

# users_ref = db.collection(u'admin')
# docs = users_ref.stream()

# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')
  
def sendNotificationToClient(tokens, data):
    #  Send a message to the devices corresponding to the provided
    #  registration tokens.
    return messaging.MulticastMessage(tokens, data)
      
# Setup the flask app by creating an instance of Flask
app = Flask(__name__, static_url_path='')  
cors = CORS(app, resources={r'/api/*': {"origins": "*"}})

# When someone goes to / on the server, execute the following function
@app.route('/')  
def home():
    # Return index.html from the static folder
    return app.send_static_file('index.html')  
@app.route('/api/v1/broadcast', methods=['POST'])  
def sendMulticastMessages():
    tokens = request.json.get("tokens")
    data = request.json.get('data')
    print(data)
    
    return sendNotificationToClient(tokens, data)


# If the script that was run is this script (we have not been imported)
if __name__ == '__main__':  
    # Start the server
    app.run()  