import mongoose, {Schema} from "mongoose";

interface CarpetItem {
    _id: String;
    carpetId: String;
    amount: number;
}

interface OrderDocument extends Document {
    orderId: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    carpets: CarpetItem[];
}

const carpetItemSchema = new Schema<CarpetItem>({
    _id: {type: Number, required: true},
    carpetId: {type: String, required: true},
    amount: {type: Number, required: true},
});

const orderSchema = new Schema<OrderDocument>({
    orderId: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
    carpets: {type: [carpetItemSchema], required: true},
});

const Order = mongoose.model('Order', orderSchema);

export async function createOrder(itemIds: string[]): Promise<string> {
    try {

        const order = await Order.create({items: itemIds});
        const orderNumber = order._id;
        return orderNumber.toString();

    } catch (error) {
        console.error(error);
        throw error;
    }
}