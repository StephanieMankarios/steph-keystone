var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UserModel Model
 * ==========
 */
var UserModel = new keystone.List('UserModel');

UserModel.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
UserModel.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
UserModel.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
UserModel.defaultColumns = 'name, email, isAdmin';
UserModel.register();
