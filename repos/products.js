import Repository from "./repository";

class ProductsRepository extends Repository {

}

const productsRepo = new ProductsRepository('products.json');
export default productsRepo;