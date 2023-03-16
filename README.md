# Store-Manager

Project done at Trybe, an API using a MySQL DB and MSC architecture, with basic CRUD operations using node and docker, that is responsible for managing sales on a store

## Installation and use

The DB port is 3306

Login: root

Password: password

```bash
# First clone the repo
git clone https://github.com/ThiDurante/StoreManager.git
# Now let's get into the folder
cd StoreManager
# It's all about docker compose
docker-compose up -d
# Let's get inside the docker container terminal
docker exec -it store_manager bash
# Install everything we need to make it work
npm install
# Populate the DB
npm run migrate && npm run seed
# Run the app!
npm run dev
```

And its ready to use, you can send requisitions using postman, insomnia or thunderclient

## Screenshots

I use a pattern to organize my commits, check it out:

![App Screenshot](https://i.imgur.com/k4lxMh8.png)
![App Screenshot](https://i.imgur.com/lSwGDmv.png)
![App Screenshot](https://i.imgur.com/G3dQaVC.png)

## References

- [Trybe Course](https://www.betrybe.com/)

## Things I learned in this Project!

- Use node to create a server
- CRUD operations on node
- Using docker to manage the app with containers
- Working with MSC architecture
- Working with MySQL without Sequelize
- Making querys on the DB
- Logic for managing and checking if data is correct or missing
- Testing and API with mocha, chai and sinon
- Connecting to DB and using enviorement variables

## 🚀 About me

Im a backend web developer!!

## Author

- [@ThiDurante](https://www.github.com/ThiDurante)
- [Linkedin](https://www.linkedin.com/in/thidurante/)
