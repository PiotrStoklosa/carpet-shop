import mongoose, {Schema} from 'mongoose';

interface Category {
    category: String
}


const CarpetSchema = new Schema({
    category: String
});

const Category = mongoose.model<Category>('Category', CarpetSchema);

export async function getCategories(): Promise<Category[]> {
    try {
        return await Category.find({});
    } catch (error) {
        console.error(error);
        return []
    }
}
