const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = async function (product) {
  try {
    const updateCartItems = this.cart?.items ? [...this.cart.items] : [];
    const cartProductIndex = updateCartItems.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      newQuantity = updateCartItems[cartProductIndex].quantity + 1;
      updateCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updateCartItems.push({
        productId: product._id,
        quantity: 1,
      });
    }
    const updateCart = {
      items: updateCartItems,
    };
    this.cart = updateCart;
    return this.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
userSchema.methods.removeFromCart = async function (productId) {
  const updateProductFromCart = this.cart.items.filter((e) => {
    return e.productId.toString() !== productId.toString();
  });
  this.cart.items = updateProductFromCart;
  return this.save();
};

userSchema.methods.clearCart = async function (productId) {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
// const { ObjectId } = require("mongodb");
// const { getDb } = require("../utils/database");

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }
//   async save() {
//     try {
//       const db = getDb();
//       const newUser = await db.collection("users").insertOne({
//         username: this.username,
//         email: this.email,
//       });
//       return newUser;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async addToCart(product) {
//     try {
//       const updateCartItems = this.cart?.items ? [...this.cart.items] : [];
//       const cartProductIndex = updateCartItems.findIndex((cp) => {
//         return cp.productId.toString() === product._id.toString();
//       });
//       let newQuantity = 1;
//       if (cartProductIndex >= 0) {
//         newQuantity = updateCartItems[cartProductIndex].quantity + 1;
//         updateCartItems[cartProductIndex].quantity = newQuantity;
//       } else {
//         updateCartItems.push({
//           productId: new ObjectId(product._id),
//           quantity: 1,
//         });
//       }
//       const updateCart = {
//         items: updateCartItems,
//       };
//       const db = getDb();
//       const updateUserCart = await db.collection("users").updateOne(
//         {
//           _id: new ObjectId(this._id),
//         },
//         {
//           $set: {
//             cart: updateCart,
//           },
//         },
//       );
//       return updateUserCart;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
//   async getCart() {
//     try {
//       const db = getDb();
//       const productId = this.cart.items.map((e) => e.productId);
//       const products = await db
//         .collection("products")
//         .find({ _id: { $in: productId } })
//         .toArray();
//       const product = products.map((p) => ({
//         ...p,
//         quantity: this.cart.items.find(
//           (e) => e.productId.toString() === p._id.toString(),
//         ).quantity,
//       }));
//       return product;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getDeleteProductFromCart(productId) {
//     try {
//       const updateProductFromCart = this.cart.items.filter((e) => {
//         return e.productId.toString() !== productId.toString();
//       });
//       const db = getDb();
//       return db.collection("users").updateOne(
//         {
//           _id: new ObjectId(this._id),
//         },
//         {
//           $set: {
//             cart: { items: updateProductFromCart },
//           },
//         },
//       );
//     } catch (error) {
//       throw error;
//     }
//   }

//   async addOrder() {
//     const db = getDb();
//     const cartProductDetails = await this.getCart();
//     const order = {
//       items: cartProductDetails,
//       user: {
//         _id: new ObjectId(this._id),
//         username: this.username,
//         email: this.email,
//       },
//     };
//     const addItem = await db.collection("orders").insertOne(order);
//     this.cart = [];
//     return db.collection("users").updateOne(
//       {
//         _id: new ObjectId(this._id),
//       },
//       {
//         $set: {
//           cart: { items: [] },
//         },
//       },
//     );
//   }
//   async getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray();
//   }
//   static async findById(userId) {
//     try {
//       const db = getDb();
//       const user = await db.collection("users").findOne({
//         _id: new ObjectId(userId),
//       });
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// module.exports = User;
