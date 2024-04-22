from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

@app.route('/send-email', methods=['POST'])
def send_email():
    # Get data from the POST request
    data = request.get_json()

    # Email configuration
    sender_email = "keerthanaradjendirane@gmail.com"
    receiver_email = "vickeydvk4@gmail.com"
    password = "jsromkntsftugyxp"

    # Create a MIME object
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "Email from Flask API"

    # Email body
    body = data.get("text", "")
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to SMTP server (Gmail in this example)
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)

        # Send email
        server.sendmail(sender_email, receiver_email, message.as_string())

        # Close SMTP connection
        server.quit()

        # Set CORS headers in the response
        response = jsonify({"message": "Email sent successfully"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response, 200
    except Exception as e:
        response = jsonify({"error": str(e)})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        return response, 500

if __name__ == '_main_':
    app.run(debug=True)