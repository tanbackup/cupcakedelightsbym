import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema(
	{
		image: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		stocks: {
			type: Number,
			default: 0
		},
		price: {
			type: Number,
			default: 0
		},
		discount: {
			percentage: {
				type: Number,
				default: 0
			}
		},
		sold: {
			type: Number,
			default: 0
		},
		sales: {
			type: Number,
			default: 0
		},
		status: {
			type: String,
			default: 'Published'
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

const Products = mongoose.models.Products || mongoose.model('Products', ProductSchema)

export default Products
