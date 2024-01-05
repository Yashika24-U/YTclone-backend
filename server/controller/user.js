import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      //   console.log(req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    console.log(req.user.subscribedUers);
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription succesfull.");
  } catch (err) {
    next(err);
  }

};

// export const subscribe = async (req, res, next) => {
//   try {
//       const userToUpdate = await User.findByIdAndUpdate(req.user.id, {
//           $push: { subscribedUsers: req.params.id },
//       });

//       if (!userToUpdate) {
//           // If the user to update (req.user.id) is not found
//           return res.status(404).json({ error: "User to update not found." });
//       }

//       const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//           $inc: { subscribers: 1 },
//       });

//       if (!updatedUser) {
//           // If the user to be updated (req.params.id) is not found
//           return res.status(404).json({ error: "User to be updated not found." });
//       }

//       res.status(200).json("Subscription successful.");
//   } catch (err) {
//       // Log the error for debugging
//       console.error(err);
//       next(err);
//   }
// };

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("unSubscription succesfull.");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try{
    await Video.findByIdAndUpdate(videoId,{
      $addToSet : {likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.");
  }catch(err){
    next(err);
  }
  }

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try{
    await Video.findByIdAndUpdate(videoId,{
      $addToSet : {dislikes:id},
      $pull:{likes:id}
    })
    res.status(200).json("The video has been disliked.");
  }catch(err){
    next(err);
  }
  
};