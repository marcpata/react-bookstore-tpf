import firebase from '../Config/firebase'

export const getUserById=async (userId)=>{
    const doc = await firebase.db
    .collection('usuarios')
    .doc(userId)
    .get()
    return {...doc[0].data()}
}

export const getUserByAttribute= async (key,value) => {
    const docs = await firebase.db
        .collection("usuarios")
        .where(key, "==", value)
        .get();

    let users = []
    docs.forEach(item => {
        users.push(item.data())
    });
    return (users); 
}