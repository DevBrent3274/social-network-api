const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        console.log("here")
        try {
            const thoughts = await Thought.find();
            console.log(thoughts)
            res.json({thoughts});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try { 
            // The select('-__v') here is to avoid finding
            // the version key field that is added to each document
            // however I am unsure if it would interfer with execution, more extarneous
            const thought = await Thought.findOne({ _id: req.params.thoughtId}).select('-__v');
            if (!thought) {
                res.status(404).json({ message: "There is no thought associated with that ID"});
            } else {
                res.json(thought)
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        console.log("testing route")
        try {
            const { thoughtText, username, userId } = req.body;

            await Thought.create({ thoughtText, username }).then(async function(thoughtModelResponse){
                console.log(thoughtModelResponse)
                await User.findByIdAndUpdate({_id:userId},
                    { $push: { thoughts: thoughtModelResponse._id }},
                    { new: true }
                ),res.json(thoughtModelResponse);});
            console.log(thoughtText)
            console.log(username)
            
            // const getUser = await User.findByIdAndUpdate(userId,
            //     { $push: { thoughts: newThought._id }},
            //     { new: true }
            // );

            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId}, {thoughtText: req.body.thoughtText},
                // Setting thought info with req body values so the updated Thought is returned in the response 
                // instead of the original thought before the update
                { new: true }
            );

            if (!updatedThought) {
                res.status(404).json({ message: "There is no thought associated with that ID"});
            }
            res.json(updatedThought)
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            }   
    },

    // req params should have thoughtId and userId
    // /api/thoughts/:thoughtId
    async deleteThought(req, res) {
            try { 
                const findThoughtToDelete = await Thought.deleteOne({ _id: req.params.thoughtId});
                if (!findThoughtToDelete) {
                    res.status(404).json({ message: "There is no thought associated with that ID"});
                }
                
                User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                ).then( resp => {
                    res.json({ message: "Thought has been deleted" });
                })
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    },

  
    async createReaction(req, res) {
        try {
            const findThought = await Thought.findByIdAndUpdate(req.params.thoughtId,
                { $addToSet: { reactions: {username: req.body.username, reactionBody: req.body.reactionBody}}},
                { new: true });

            res.json(findThought)

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const findThought = await Thought.findByIdAndUpdate(req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.body.reactionId }}},
                { new: true });

            res.json(findThought)

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}