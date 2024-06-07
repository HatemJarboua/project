const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

// Importation de firebase.config.js


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Configuration de la connexion MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@polyprojets.8ujpysd.mongodb.net/?retryWrites=true&w=majority&appName=polyprojets`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connexion au client MongoDB
    await client.connect();
    console.log("Successfully connected to MongoDB.");

    const db = client.db("mernPolyProjets");
    const projetsCollections = db.collection("demoProjets");

    // Middleware pour vérifier le rôle de l'utilisateur
    const checkUserRole = (requiredRole) => async (req, res, next) => {
      const userId = req.userId; // Supposons que vous ayez extrait cela du JWT
      const user = await getUserById(userId); // Implémentez cette fonction selon votre logique de base de données
      if (user && user.role === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: "Accès refusé" });
      }
    };

    // Utilisation du middleware
    app.get("/post-projet", checkUserRole(["administration", "enseignant"]), (req, res) => {
      res.send("Bienvenue dans la zone réservée aux administrations et enseignants");
    });

    // Routes
    app.post("/post-projet", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await projetsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Cannot insert! Try again later",
          status: false
        });
      }
    });

    //get all projects
    app.get("/all-projects", async (req, res) => {
      const projets = await projetsCollections.find({}).toArray();
      res.send(projets);
    });

    //get single project using id
    app.get("/all-projects/:id", async(req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
      }
      const project = await projetsCollections.findOne({
        _id: new ObjectId(id)
      });
      if (!project) {
        return res.status(404).send({ message: 'Project not found' });
      }
      res.send(project);
    });

    // get projects by email 
    app.get("/myProjects/:email", async (req, res) => {
      //console.log(req.params.email);
      const projects = await projetsCollections.find({posterEmail: req.params.email }).toArray();
      res.send(projects);
    });
// delete a project
app.delete("/project/:id", async(req, res) => {
  try {
      const id = req.params.id;
      
      // Supprimez l'élément de la base de données
      const result = await projetsCollections.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 1) {
          // L'élément a été supprimé avec succès
          res.json({ acknowledged: true, message: "L'élément a été supprimé avec succès." });
      } else {
          // Aucun élément n'a été supprimé (peut-être que l'ID n'existe pas)
          res.status(404).json({ acknowledged: false, message: "Aucun élément trouvé avec cet ID." });
      }
  } catch (error) {
      // Erreur lors de la suppression
      res.status(500).json({ acknowledged: false, error: error.message });
  }
});


    // update a project
    app.patch("/update-project/:id", async(req, res) => {
      const id = req.params.id;
      const projectData = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updateDoc = {
        $set: {
          ...projectData
        },
      };
      const result = await projetsCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // route pour l'envoie de candidature 
    app.post("/apply-project/:id", async (req, res) => {
      const id = req.params.id;
      const { applicationUrl } = req.body;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
      }

      try {
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $push: {
            applications: { url: applicationUrl, createdAt: new Date() }
          }
        };

        const result = await projetsCollections.updateOne(filter, updateDoc);
        
        if (result.modifiedCount === 1) {
          return res.status(200).send({ message: 'Application sent successfully!' });
        } else {
          return res.status(404).send({ message: 'Project not found or could not update' });
        }
      } catch (error) {
        return res.status(500).send({ message: 'Error sending application', error });
      }
    });

    const getUserById = async (userId) => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return null;
      }
    };

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

run().catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello PolyProjets!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
