from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'POST':
        task = request.json.get('task')
        if task:
            tasks.append(task)
            return jsonify({'task': task}), 201
        return jsonify({'error': 'Task content is required'}), 400
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True)
