import firebase from "../Config/firebase";
import fb from 'firebase/app'
// import * as admin from 'firebase-admin'

export const addOrder=async (order)=>{
    try {
        await firebase.db
        .collection('orders')
        .add(order)
        order.products.map(async item=>{
            await firebase.db
            .collection('productos')
            .doc(item.product)
            .update({'Sold': fb.firestore.FieldValue.increment(1), 'Cantidad': fb.firestore.FieldValue.increment(-1) })
        })
    }catch(e){
        console.log(e)
    }
}

export const getOrderById=async (id)=>{
    try {
        const order = await firebase.db
        .collection('orders')
        .doc(id)
        .get()
        return {'orderId': id,...order.data()}
    }catch(e){
        console.log(e)
    }
}

export const getOrdersByAttribute = async (key,value)=>{
    try {
        let orders = []
        const docs = await firebase.db
        .collection('orders')
        .where(key,'==',value)
        .get()
        docs.forEach(item => {
            orders.push({"orderId": item.id, ...item.data()})
        });
        return orders
    }catch(e){
        console.log(e)
    }
}

export const getAllOrders= async ()=>{
    try {
        let orders = []
        const docs = await firebase.db
        .collection('orders')
        .orderBy('date')
        .get()
        docs.forEach(item => {
            orders.push({"orderId": item.id, ...item.data()})
        });
        return orders
    }catch(e){
        console.log(e)
    }
}

export const getAllProductsFromArray = async (arrayProduct)=>{
    const plainArray = arrayProduct.map(item=>item.product)
    const docs =await firebase.db
    .collection('productos')
    .where('__name__','in',plainArray)
    .get()    
    //.where('id','==','zbnBMlA0qVcLvKI7NFu7')
    //const prodsCollectionRef =  
    let mergedData=[]
    docs.forEach(item=>{
        mergedData.push({'productid': item.id, 'key': item.id, ...item.data()})})
    return mergedData
}

export const getOrdersWithProducts = async (key,value)=>{
    try {
        const docs = await getOrdersByAttribute(key,value)
        return [docs.map(async item => {
                //let docProducts = []
                const {products} = item
                const productsdetail = await getAllProductsFromArray(products);
                return({...item,'productsdetail': productsdetail});
        })];
    }catch(e){
        console.log(e)
    }
}

export const updateOrderStatus = async (id,value)=>{
    try {
        await firebase.db
        .collection('orders')
        .doc(id)
        .update({"delivered":value})
    }catch(e){
        console.log(e)
    }
}