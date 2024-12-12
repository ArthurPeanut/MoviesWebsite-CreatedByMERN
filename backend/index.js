import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

async function main(){

    dotenv.config()

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000

    // try {
    //     await client.connect();
    //     await client.db("admin").command({ping:1});
    //     console.log("Connected to Mongodb");
    // } finally {
    //     await client.close();
    // }

    try {
        await client.connect();

        app.listen(port, () => {
            console.log('Server is running on port:' + port);
        })
    } catch(e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);