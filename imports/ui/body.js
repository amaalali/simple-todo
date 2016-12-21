import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './body.html';

Template.body.helpers({
	tasks() {
		return Tasks.find({});
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
