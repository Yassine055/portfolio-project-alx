from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

@app.route('/tasks', methods=['POST'])
def add_task():
    new_task = request.json.get('task')
    if new_task:
        tasks.append(new_task)
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True)
