// export interface Product {
//   _id: string;
//   isRecommended: boolean;
//   isDiscount: boolean;
//   isOrganic: boolean;
//   isFavourite: boolean;
//   discount: number;
//   rating: number;
//   front: string;
//   back: string;
//   side: string;
//   title: string;
//   isAvailable: boolean;
//   price: number;
//   quantity: number;
//   brand: string;
//   description: string;
//   productQuantity: number;
//   skuNumber: string;
//   count:number;
//   newprice:number;
//   type: string;
//   review: number;
//   mfgDate:string;
//   life:string;
//   product_name:string;
//   product_description:string;
//   unit_price:number;
//   product_image:string;

//   // category:string;
//   // tags:string;
// }

export interface Product {
    product_sub_category: string;
    product_category: string;
    _id: string;
    isRecommended: boolean;
    isDiscount: boolean;
    isOrganic: boolean;
    isFavourite: boolean;
    discount: number;
    rating: number;
    front: string;
    back: string;
    side: string;
    title: string;
    isAvailable: boolean;
    price: number;
    quantity: number;
    brand: string;
    description: string;
    productQuantity: number;
    skuNumber: string;
    count: number;
    newprice: number;
    type: string;
    review: number;
    mfgDate: string;
    life: string;
    category: string;
    tags: string;
    speacialtag: string;
    additionalInformation: string;
    isNewArrival: boolean;
    isBestSeller: boolean;
    imageArray: string;
    product_name: string;
    product_description: string;
    unit_price: number;
    product_image: string;
    catelog_book_id?: any;
    expired?: boolean;

}

export interface MainCategory {
    "_id": string;
    "name": string ;
}
export interface SubCategory {
    "_id": string;
    "name": string;
    "mainCategoryId": string | MainCategory;
}
