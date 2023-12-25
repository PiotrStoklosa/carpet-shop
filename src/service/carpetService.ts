import mongoose, {Schema} from 'mongoose';

interface Carpet {
    _id: String,
    shape: String,
    color: String,
    material: String,
    image: String
}


const CarpetSchema = new Schema({
    _id: String,
    shape: String,
    color: String,
    material: String,
    image: String
});

const Carpet = mongoose.model<Carpet>('Carpet', CarpetSchema);

export async function getAllCarpets(): Promise<Carpet[]> {
    try {
        return await Carpet.find({});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCarpetsByMaterial(material: string): Promise<Carpet[]> {
    try {
        return await Carpet.find({material: material});
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCarpetById(carpetId: string): Promise<Carpet | null> {
    try {
        return await Carpet.findById(carpetId);
    } catch (error) {
        console.error(error);
        throw error;
    }
}
