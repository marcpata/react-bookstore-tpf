import firebase from "../Config/firebase";

export const getAllProducts = async (sort='Nombre', direction='asc') => {
  const docs = await firebase.db.collection("productos").orderBy(sort,direction).get();
  let libros = [];
  docs.forEach((doc) => libros.push({ 'id': doc.id,'key': doc.id, ...doc.data() }));
  return libros;
};

export const getProductsByAttribute = async (attrib, value) => {
  const docs = await firebase.db
    .collection("productos")
    .where(attrib, "==", String(value))
    .get();
  let libros = [];
  docs.forEach((doc) => libros.push({ 'id': doc.id, ...doc.data() }));
  return libros;
};

export const getProductById = async (id) => {
  const doc = await firebase.db.collection("productos").doc(id).get();
  return { id: id, ...doc.data() };
};

export const editProduct = async (data)=> {
  const {productId, ...productData} = data
  const refProducts = firebase.db.collection("productos")
  if(productId!=='') {
    try {
      await refProducts.doc(productId).set(productData)
    } catch(e) {
      console.log(e)
    }
  } else {
    try {
      await refProducts.add(productData)
    } catch(e) {
      console.log(e)
    }
  }
}
export const deleteProduct = async (id)=>{
  try {
    await  firebase.db
    .collection("productos")
    .doc(id)
    .delete();
  } catch(e) {
    console.log(e)
  }
}