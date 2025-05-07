import mongoose, { Schema } from 'mongoose';

const sliderSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
})


const imageSlider = mongoose.model("imageSlider", sliderSchema)

export default imageSlider