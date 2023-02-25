const { Reaction } = require('../models/Reaction');
const Thought = require("../models/Thought");


module.exports = {
    async getReactions(req, res) {
        try {
            const reactions = await Reaction.find();
            console.log(reactions)
            res.json(reactions);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleReaction(req, res) {
        try { 
            // The select('-__v') here is to avoid finding
            // the version key field that is added to each document
            // however I am unsure if it would interfer with execution, more extarneous
            const reaction = await Reaction.findOne({ _id: req.params.reactionId}).select('-__v');
            if (!reaction) {
                res.status(404).json({ message: "There is no reaction with that ID"});
            } else {
                res.json(reaction)
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // logic before corrections - note to self
    // async createReaction(req, res) {
    //     try {
    //         const dbReactionData = await Reaction.create(req.body);
    //         res.json(dbReactionData);
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }
    // },

    async createReaction(req, res) {
        console.log("testing route")
        try {
            const { reactionBody, username, thoughtId } = req.body;

            await Reaction.create({ reactionBody, username }).then(async function(reactionResponse){
                console.log(reactionResponse)
                await Thought.findByIdAndUpdate({_id:thoughtId},
                    { $push: { reactions: reactionResponse._id }},
                    { new: true }
                ),res.json(reactionResponse);});
            console.log(reactionBody)
            console.log(username)            
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateReaction(req, res) {
        try {
            const updateReaction = await Reaction.findOneAndUpdate(
                { _id: req.params.reactionId},
                req.body,
                // Setting reaction info with req body values so the updated reaction is returned in the response 
                // instead of the original reaction before the update
                
                { new: true }
            );
            if (!updateReaction) {
                res.status(404).json({ message: "There is no reaction with that ID"});
            }
            res.json(updateReaction)
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            }   
    },

    // req params should have thoughtId and userId
    // /api/thoughts/:thoughtId
    async deleteReaction(req, res) {
        try { 
            const findReactionToDelete = await Reaction.deleteOne({ reactionId: req.params.reactionId});
            if (!findreactionIdToDelete) {
                res.status(404).json({ message: "There is no reaction associated with that ID"});
            }
            
            Reaction.findOneAndUpdate(
                { reactions: req.params.reactionId },
                { $pull: { reactions: req.params.reactionId }},
                { new: true }
            ).then( resp => {
                res.json({ message: "Reaction has been deleted" });
            })
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},
    
    
    
    // async deleteReaction(req, res) {
    //         try { 
    //             const findReactionToDelete = await reaction.deleteOne({ _id: req.params.reactionId});
    //             if (!findReactionToDelete) {
    //                 res.status(404).json({ message: "There is no reaction with that ID"});
    //             }
    //             res.json({ message: "Reaction has been deleted" });
    //         } catch (err) {
    //             console.log(err);
    //             res.status(500).json(err);
    //         }
    //     },
}