import mongoose from 'mongoose'

const ReceiptSchema = mongoose.Schema(
	{
		user: {
			type: String,
			default: ''
		},
		order: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		subtotal: {
			type: String,
			default: ''
		},
		discount: {
			type: String,
			default: ''
		},
		total: {
			type: String,
			default: ''
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

const Receipts = mongoose.models.Receipts || mongoose.model('Receipts', ReceiptSchema)

export default Receipts
