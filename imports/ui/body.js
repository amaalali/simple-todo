import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';
import './task.html';

Template.body.onCreated(function bodyOnCreated(){
	this.state = new ReactiveDict();
	Meteor.subscribe('tasks');
});

Template.body.helpers({
	tasks() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			return Tasks.find({ checked: { $ne: true }}, { sort: { createdAt: -1 } });
		}
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
	incompleteCount() {
		return Tasks.find({ checked: { $ne: true }}).count();
	},
});

Template.body.events({
	'submit .new-task' (events) {
		event.preventDefault();
		const target = event.target;	
		const text = target.text.value;
		Meteor.call('tasks.insert', text);
		// event.target.text.value = '';
		target.text.value = '';
	},
	'change .hide-completed input' (event, instance) {
		instance.state.set('hideCompleted', event.target.checked);
	},
});
