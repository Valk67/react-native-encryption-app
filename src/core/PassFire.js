import firebase from "firebase";

class PassFire {
    setKey = async ({ text }) => {

        return new Promise((res, rej) => {
            let db = this.firestore.collection(`key/${this.uid}/key`).doc(this.uid);

            db.set({
                key: text
            })
            .then(ref=> {
                res(ref);
            })
            .catch(error => {
                rej(error);
            });
            
        });
    };


    addPost = async ( { text } ) => {
        CryptoJS = require("crypto-js");

        food = {
           text: null,
           id: null,
           time: null
        };
        
        fire = await firebase.firestore().collection(`key/${this.uid}/key`).get();
        keyBox = [];
        fire.forEach((doc) => {
          a = doc.data();
          keyBox.push(a);
        });
        if (keyBox[0] != null) {
            cipherText = CryptoJS.AES.encrypt(text, keyBox[0].key.toString());
            food.text = cipherText.toString(); 
            food.time = this.timestamp
            firebase.firestore()
                .collection(`pass/${this.uid}/pass`) 
                .add(food)
                .then((snapshot) => {
                food.id = snapshot.id;
                snapshot.set(food);
                }).then(() => addComplete(food))
                .catch((error) => console.log(error));
        } else {
            alert("Must make a key for encryption/decryption first, press red button below to do so.");
        }


    };
    delete = (id, text) => {
        alert(`Deleted: ${text}`);
    
        firebase.firestore()
          .collection(`pass/${this.uid}/pass`)
          .doc(id).delete()
          .then(() => deleteComplete())
          .catch((error) => console.log(error));

    };

    
    getFoods = async (foodsRetreived) => {
        CryptoJS = require("crypto-js");

        var PassList = [];
      
        var snapshot = await firebase.firestore()
          .collection(`pass/${this.uid}/pass`)
          .orderBy('time')
          .get();

        fire = await firebase.firestore().collection(`key/${this.uid}/key`).get();
        keyBox = [];
        fire.forEach((doc) => {
            a = doc.data();
            keyBox.push(a);
        });
      
        snapshot.forEach((doc) => {
          PassItem = doc.data();
          PassItem.id = doc.id;
          bytes  = CryptoJS.AES.decrypt(PassItem.text.toString(), keyBox[0].key.toString());
          PassItem.text = bytes.toString(CryptoJS.enc.Utf8);
          if (PassItem.text == '') {
              PassItem.text = "Key was changed. Unless key is changed back, data is lost."
          }
        //   foodItem.text = foodItem.text;
          PassList.push(PassItem);
        });
        
      
        foodsRetreived(PassList);
    }

    

    

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

PassFire.shared = new PassFire();
export default PassFire;