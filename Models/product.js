import mongoose from 'mongoose';


const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    rating: {
        type: Number,
        required: true
    }, 
    comment: {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
})
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true, })

const Product = mongoose.model('Product', productSchema);
export default Product;