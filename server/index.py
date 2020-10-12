# Import flask
from flask import Flask  

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