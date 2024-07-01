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
    task = {'id': current_id, 'task': task_data['task'], 'completed': False, 'subtasks': []}  # Initialize with completed and subtasks
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
            task['completed'] = task_data.get('completed', task['completed'])  # Update completed status
            task['subtasks'] = task_data.get('subtasks', task['subtasks'])  # Update subtasks
            logging.info(f"Updated task with id: {id} to {task}")
            break
    return jsonify({'result': True})

@app.route('/tasks/<int:id>/complete', methods=['PUT'])
def complete_task(id):
    for task in tasks:
        if task['id'] == id:
            task['completed'] = not task['completed']
            logging.info(f"Completed status of task with id: {id} set to {task['completed']}")
            return jsonify(task)
    return jsonify({'error': 'Task not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
