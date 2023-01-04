import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			required: true
		},
		image: {
			type: String,
			default: ''
		},
		contact: {
			type: String,
			default: ''
		},
		gender: {
			type: String,
			default: ''
		},
		address: {
			region: {
				type: String,
				default: ''
			},
			city: {
				type: String,
				default: ''
			},
			barangay: {
				type: String,
				default: ''
			},
			streets: {
				type: String,
				default: ''
			},
			postal: {
				type: String,
				default: ''
			}
		},
		role: {
			type: String,
			default: 'Customer'
		},
		status: {
			type: String,
			default: 'Active'
		},
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

const Users = mongoose.models.Users || mongoose.model('Users', UserSchema)

export default Users
