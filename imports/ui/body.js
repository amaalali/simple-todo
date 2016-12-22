import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';
import './task.html';


Template.body.helpers({
	tasks() {
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
});

Template.body.events({
	'submit .new-task' (events) {
		event.preventDefault();
		const text = event.target.text.value;
		Tasks.insert({
			text,
			createdAt: new Date(),
		});	
		event.target.text.value = '';
	},
});
