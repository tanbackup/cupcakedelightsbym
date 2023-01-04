import mongoose from 'mongoose'

const ReviewsSchema = mongoose.Schema(
	{
		user: {
			type: Object,
			default: {}
		},
		order: {
			id: {
				type: String,
				default: ''
			}
		},
		image: {
			type: String,
			default: ''
		},
		ratings: {
			type: Number,
			default: 5
		},
		reviews: {
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

const Reviews = mongoose.models.Reviews || mongoose.model('Reviews', ReviewsSchema)

export default Reviews
