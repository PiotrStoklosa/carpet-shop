import express, {Request, Response} from 'express';
import {getAllCarpets, getCarpetById, getCarpetsByMaterial} from "./service/carpetService";
import {createOrder} from "./service/orderService";
import {getCategories} from "./service/categoryService";

const app = express();
const port = 3001;
require('./database/db')

app.get('/carpet/:id', async (req: Request, res: Response) => {
    const carpetId = req.params.id;
    res.send(await getCarpetById(carpetId));
});

app.get('/carpet/:material', async (req: Request, res: Response) => {
    const carpetMaterial = req.params.material;
    res.send(await getCarpetsByMaterial(carpetMaterial));
});

app.get('/carpet', async (_req: Request, res: Response) => {
    res.send(await getAllCarpets());
});

app.get('/category', async (_req: Request, res: Response) => {
    res.send(await getCategories());
});

interface ProductRequest extends Request {
    body: {
        products: string[];
    };
}

app.post('/order', async (req: ProductRequest, res: Response) => {

    const productList: string[] = req.body.products;
    res.send(await createOrder(productList));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});