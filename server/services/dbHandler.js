async function addDoc(obj) {
    const result = await obj.save();
    if (result) {

    } else {
        throw new Error("Error while saving new object");
    }
}

module.exports = {addDoc};