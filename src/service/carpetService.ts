import mongoose, {Schema} from 'mongoose';

interface Carpet {
    _id: Number,
    shape: String,
    color: String,
    material: String,
    image: String,
    description: String
}


const CarpetSchema = new Schema({
    _id: Number,
    shape: String,
    color: String,
    material: String,
    image: String,
    description: String
});

const Carpet = mongoose.model<Carpet>('Carpet', CarpetSchema);

export async function getAllCarpets(): Promise<Carpet[]> {
    try {
        return await Carpet.find({}).exec();
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getCarpetsByMaterial(material: string): Promise<Carpet[]> {
    try {
        return await Carpet.find({material: material});
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function getCarpetById(carpetId: number): Promise<Carpet | null> {
    try {
        return await Carpet.findOne({_id: carpetId});
    } catch (error) {
        console.error(error);
        return null
    }
}
