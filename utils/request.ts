import axios from "axios";
const BASE_URL = 'https://api.supersconto24.com/v1/api'
// const BASE_URL = 'http://localhost:3000/v1/api'

const requests = {
    fetchCatelogs: `${BASE_URL}/catelog/book`,
    findCatalogById: (id: string) => `${BASE_URL}/catelog/book/find/${id}`,
    getCatalogBookPageItemByIds:`${BASE_URL}/catelog/item/find-list`,
    getLatestItemId : `${BASE_URL}/catelog/item`,
    allShops : `${BASE_URL}/shop`,
    findShopById : (id :string) => `${BASE_URL}/shop/find/${id}`,
    allNews : `${BASE_URL}/news`,
    allCategory : `${BASE_URL}/category/categories`,
    // allCategory : 'https://api.supersconto24.com/v1/api/category/categories',


}
export const http = axios.create({
    baseURL: BASE_URL ,
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default requests