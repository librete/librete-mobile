import { JsonConvert } from 'json2typescript';

import { Task } from './task';

describe('Models: Task', () => {

  function deserializeTasks() {
    const ISOString = new Date().toISOString();
    const first_task_raw = {
      'url': 'api/tasks/1',
      'name': 'Task name',
      'author': 'api/users/1',
      'category': 'api/categories/1',
      'description': 'Task description',
      'parent': null,
      'status': 'active',
      'priority': 'high',
      'start_date': ISOString,
      'end_date': ISOString,
      'created_at': ISOString,
      'updated_at': ISOString
    };
    const second_task_raw = {
      'url': 'api/tasks/2',
      'name': 'Second task name',
      'author': 'api/users/1',
      'category': 'api/categories/2',
      'description': 'Second task description',
      'parent': null,
      'status': 'finished',
      'priority': 'low',
      'start_date': ISOString,
      'end_date': ISOString,
      'created_at': ISOString,
      'updated_at': ISOString
    };
    const tasks_raw = [first_task_raw, second_task_raw];
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeArray(tasks_raw, Task);
  }

  it('Should be successfully deserialized', () => {
    const ISOString = new Date().toISOString();
    const first_task_raw = {
      'url': 'api/tasks/1',
      'name': 'Task name',
      'author': 'api/users/1',
      'category': 'api/categories/1',
      'description': 'Task description',
      'parent': null,
      'status': 'active',
      'priority': 'high',
      'start_date': ISOString,
      'end_date': ISOString,
      'created_at': ISOString,
      'updated_at': ISOString
    };
    const second_task_raw = {
      'url': 'api/tasks/2',
      'name': 'Second task name',
      'author': 'api/users/1',
      'category': 'api/categories/2',
      'description': 'Second task description',
      'parent': null,
      'status': 'finished',
      'priority': 'low',
      'start_date': ISOString,
      'end_date': ISOString,
      'created_at': ISOString,
      'updated_at': ISOString
    };
    const tasks_raw = [first_task_raw, second_task_raw];

    const jsonConvert = new JsonConvert();
    const tasks = jsonConvert.deserializeArray(tasks_raw, Task);

    expect(tasks.length).toEqual(tasks_raw.length);

    const first_task = tasks[0];
    const second_task = tasks[1];

    expect(first_task).toEqual(
      jasmine.objectContaining({
        url: first_task_raw.url,
        name: first_task_raw.name,
        authorUrl: first_task_raw.author,
        categoryUrl: first_task_raw.category,
        description: first_task_raw.description,
        status: first_task_raw.status,
        priority: first_task_raw.priority,
        startDate: first_task_raw.start_date,
        endDate: first_task_raw.end_date,
        createdAt: first_task_raw.created_at,
        updatedAt: first_task_raw.created_at
      })
    );

    expect(second_task).toEqual(
      jasmine.objectContaining({
        url: second_task_raw.url,
        name: second_task_raw.name,
        authorUrl: second_task_raw.author,
        categoryUrl: second_task_raw.category,
        description: second_task_raw.description,
        status: second_task_raw.status,
        priority: second_task_raw.priority,
        startDate: second_task_raw.start_date,
        endDate: second_task_raw.end_date,
        createdAt: second_task_raw.created_at,
        updatedAt: second_task_raw.created_at
      })
    );

  });

  it('Should have status options', () => {
    const options = Task.statusOptions;
    expect(options.length).toBe(2);
    expect(options).toContain(
      jasmine.objectContaining({ name: 'active', label: 'tasks.common.statuses.active' })
    );
    expect(options).toContain(
      jasmine.objectContaining({ name: 'finished', label: 'tasks.common.statuses.finished' })
    );
  });

  it('Should have priority options', () => {
    const options = Task.priorityOptions;
    expect(options.length).toBe(3);
    expect(options).toContain(
      jasmine.objectContaining({ name: 'high', label: 'tasks.common.priorities.high' })
    );
    expect(options).toContain(
      jasmine.objectContaining({ name: 'medium', label: 'tasks.common.priorities.medium' })
    );
    expect(options).toContain(
      jasmine.objectContaining({ name: 'low', label: 'tasks.common.priorities.low' })
    );
  });

  it('Should have status label', () => {
    const tasks = deserializeTasks();

    const firstStatusLabel = tasks[0].statusLabel;
    const firstExpectedLabel = 'tasks.common.statuses.active';
    expect(firstStatusLabel).toBe(firstExpectedLabel);

    const secondStatusLabel = tasks[1].statusLabel;
    const secondExpectedLabel = 'tasks.common.statuses.finished';
    expect(secondStatusLabel).toBe(secondExpectedLabel);
  });

  it('Should have priority label', () => {
    const tasks = deserializeTasks();

    const firstPrioritylabel = tasks[0].priorityLabel;
    const firstExpectedLabel = 'tasks.common.priorities.high';
    expect(firstPrioritylabel).toBe(firstExpectedLabel);

    const secondPrioritylabel = tasks[1].priorityLabel;
    const secondExpectedLabel = 'tasks.common.priorities.low';
    expect(secondPrioritylabel).toBe(secondExpectedLabel);
  });

});
