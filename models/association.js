import Comment from "./comment.model.js";
import Follow from "./follow.model.js";
import Like from "./like.model.js";
import Post from "./post.model.js";
import User from "./user.model.js";

// one user can post mutiples posts
User.hasMany(Post,{ foreignKey: 'userId'});
Post.belongsTo(User, { foreignKey: 'userId'});

// one Post can have multiple Comments
Post.hasMany(Comment,{foreignKey:'postId'});
Comment.belongsTo(Post,{foreignKey: 'postId'});

// one user can do multiple Comments
User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User, {foreignKey: 'userId'});

// One Post can have multiple Likes
Post.hasMany(Like, {foreignKey: 'postId'});
Like.belongsTo(Post, {foreignKey: 'postId'});

// One User can do mutiple Likes
User.hasMany(Like, {foreignKey: 'userId'});
Like.belongsTo(User, {foreignKey: 'userId'});

// one user can follow many users as Followers by Follow table and followingId
User.belongsToMany(User, {as: 'Followers' ,through: Follow, foreignKey: 'followingId'});
// many user can follow one user as following and followerId
User.belongsToMany(User, {as: 'Following' ,through: Follow, foreignKey: 'followerId'});

export {User, Post, Comment,Like, Follow};

