import express, {Request, Response} from 'express';
import {getAllCarpets, getCarpetById, getCarpetsByMaterial} from "./service/carpetService";
import {createOrder} from "./service/orderService";
import {getCategories} from "./service/categoryService";

const app = express();
const port = 3001;
require('./database/db')

app.get('/carpet/:id', (req: Request, res: Response) => {
    const carpetId = req.params.id;
    res.send(getCarpetById(carpetId));
});

app.get('/carpet/:material', (req: Request, res: Response) => {
    const carpetMaterial = req.params.material;
    res.send(getCarpetsByMaterial(carpetMaterial));
});

app.get('/carpet', (_req: Request, res: Response) => {
    res.send(getAllCarpets());
});

app.get('/category', (_req: Request, res: Response) => {
    res.send(getCategories());
});

interface ProductRequest extends Request {
    body: {
        products: string[];
    };
}

app.post('/order', (req: ProductRequest, res: Response) => {

    const productList: string[] = req.body.products;
    res.send(createOrder(productList));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});