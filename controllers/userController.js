const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Method to get all users
  async getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },

  // Method to get a single user
  async getSingleUser(req, res) {
    try { 
        // The select('-__v') here is to avoid finding
        // the version key field that is added to each document
        // however I am unsure if it would interfer with execution, more extarneous
        const user = await User.findOne({ _id: req.params.userId}).select('-__v');
        if (!user) {
            res.status(404).json({ message: "There is no user with that ID"});
        } else {
            res.json(user)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

// Method to create a single user
async createUser(req, res) {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

async updateUser(req, res) {
    try {
        const updateUser = await User.findOneAndUpdate({ _id: req.params.userId},
            {username: req.body.username, email: req.body.email },
            // Setting user info with req body values so the updated User is returned in the response 
            // instead of the original user before the update
            { new: true }
        );
        if (!updateUser) {
            res.status(404).json({ message: "There is no User with that ID "});
        }
        res.json(updateUser)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }   
},

// Delete a user and remove the users associated thoughts when deleted
async deleteUser(req, res) {
    try { 
        const findUserToDelete = await User.deleteOne({ _id: req.params.userId});
        if (!findUserToDelete) {
            res.status(404).json({ message: "There is no User with that ID"});
        }
        //Delete all the associated thoughts of the user found in the last query
        await Thought.deleteMany({ username: findUserToDelete.username});
        res.json({ message: "User and their thougts has been deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
// /users/:userId/friends/:friendId
async addFriendToFriendList(req, res) {
    try {
        const userId = req.params.userId;
        const friendIdToPush = req.params.friendId;
        // Find a specific user and push data to the 'friends' array 
        const findUser = await User.findByIdAndUpdate(userId,
            { $push: { friends: friendIdToPush}},
            { new: true })
        res.json(findUser)

    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
},

async deleteFriend(req, res) {
    try {
        const userId = req.params.userId;
        const friendIdToDelete = req.params.friendId;

        const findUser = await User.findByIdAndUpdate(userId,
            { $pull: { friends: friendIdToDelete}},
            { new: true})
        
        res.json(findUser);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

async createUserThought(req, res){
    console.log("route worked!")
}
}


