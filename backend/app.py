from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

tasks = []
current_id = 1

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    global current_id
    task_data = request.json
    task = {'id': current_id, 'task': task_data['task']}
    tasks.append(task)
    current_id += 1
    logging.info(f"Added task: {task}")
    return jsonify(task)

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task['id'] != id]
    logging.info(f"Deleted task with id: {id}")
    return jsonify({'result': True})

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task_data = request.json
    for task in tasks:
        if task['id'] == id:
            task['task'] = task_data['task']
            logging.info(f"Updated task with id: {id} to {task['task']}")
            break
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)
