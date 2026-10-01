// const { ObjectId } = require("mongodb");
// const { getDb } = require("../utils/database");

// class Product {
//   constructor(title, price, imageUrl, userId, id) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.userId = userId;
//     this._id = id;
//   }

//   async save() {
//     try {
//       const db = getDb();
//       let response;
//       if (this._id) {
//         response = await db
//           .collection("products")
//           .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
//       } else {
//         response = await db.collection("products").insertOne({
//           title: this.title,
//           price: this.price,
//           imageUrl: this.imageUrl,
//           userId: this.userId,
//         });
//       }

//       return response;
//     } catch (err) {
//       console.error("Save Product Error:", err);
//       throw err;
//     }
//   }
//   static async getAll() {
//     try {
//       const db = getDb();
//       const response = await db.collection("products").find().toArray();
//       return response;
//     } catch (err) {
//       console.error("Save Product Error:", err);
//       throw err;
//     }
//   }
//   static async (productId) {
//     try {
//       const db = getDb();

//       const product = await db.collection("products").findOne({
//         _id: new ObjectId(productId),
//       });
//       return new Product(
//         product.title,
//         product.price,
//         product.imageUrl,
//         product.userId,
//         product._id,
//       );
//     } catch (err) {
//       console.error("Save Product Error:", err);
//       throw err;
//     }
//   }
// }
// module.exports = Product;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
