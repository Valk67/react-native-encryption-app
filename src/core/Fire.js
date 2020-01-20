import firebase from "firebase";
require("firebase/firestore");

class Fire {
    
    addPicture = async ({ localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);
        this.addSomething(remoteUri);

        // return new Promise((res, rej) => {
        //     let db = this.firestore.collection("images99").doc(this.uid);

        //     db.set({
        //         image: remoteUri
        //     })
        //     .then(ref=> {
        //         res(ref);
        //     })
        //     .catch(error => {
        //         rej(error);
        //     });
            
        // });
    };


    // uploadPhotoAsync = async uri => {
        // const path = `photos/${this.uid}/${Date.now()}.jpg`;
    uploadPhotoAsync = (uri, filename) => {

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    addSomething = ( localUri ) => {
        food = {
           image: null,
           id: null,
           time: null
        };
        food.image = localUri
        food.time = this.timestamp
        firebase.firestore()
            .collection(`${this.uid}`) 
            .add(food)
            .then((snapshot) => {
            food.id = snapshot.id;
            // food.time = `${Date.now()}`;
            snapshot.set(food);
            }).then(() => addComplete(food))
            .catch((error) => console.log(error));

    }
    delete = (id) => {
        alert(`Deleted Photo.`);
    
        firebase.firestore()
          .collection(`${this.uid}`)
          .doc(id).delete()
          .then(() => deleteComplete())
          .catch((error) => console.log(error));

    };

    //maybe needs to be async
    getFoods = async (foodsRetreived) => {

        var foodList = [];
      
        var snapshot = await firebase.firestore()
          .collection(`${this.uid}`)
          .orderBy('time')
          .get()
      
        snapshot.forEach((doc) => {
          const foodItem = doc.data();
          foodItem.id = doc.id;
          foodList.push(foodItem);
        });
      
        foodsRetreived(foodList);
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

Fire.shared = new Fire();
export default Fire;