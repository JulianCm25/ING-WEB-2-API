const {Router} = require('express')
const admin = require("firebase-admin");
const router = Router();

const db = admin.firestore();

//Insertar Producto
router.post("/api/products", async (req, res) => {
    try {
      await db
        .collection("products")
        .doc("/" + req.body.id + "/")
        .create({ 
          name: req.body.name,
          descript: req.body.descript,
          date: req.body.date,
          img: req.body.img 
        });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  //Obtener todos los productos
  router.get("/api/products", async (req, res) => {
    try {
      const query = db.collection("products");
      const querySnapshot = await query.get();
  
      const response = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        descript: doc.data().descript,
        date: doc.data().date,
        img: doc.data().img
      }));
      return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
  });
  
  //Obtener producto por ID de producto
  router.get("/api/products/:product_id", (req, res) => {
    (async () => {
      try {
        const doc = db.collection("products").doc(req.params.product_id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response);
      } catch (error) {
        return res.status(500).json(error);
      }
    })();
  });
  
  // Eliminar producto por ID
  router.delete("/api/products/:products_id", async (req, res) => {
    try {
      const query = db.collection("products").doc(req.params.products_id);
      await query.delete();
      return res.status(200).json("Eliminado");
    } catch (error) {
        return res.status(500).json(error);
    }
  });
  
  // Editar producto por ID
  router.put("/api/products/:products_id", async (req, res) => {
      try {
          const query = db.collection('products').doc(req.params.products_id)
          await query.update({
              name: req.body.name,
              descript: req.body.descript,
              date: req.body.date,
              img: req.body.img 
          })
          return res.status(200).json("Editado");
      } catch (error) {
        return res.status(500).json(error);
      }
  })

module.exports = router;
