
let Notificationmodel = require('./app/models/notifications');

const models = require('./app/models');
const socketio = require('socket.io');
const follow = models.follow;
const likeModel = models.like;
const bookmarkModel = models.bookmarks;

module.exports.listen = function (server){
  io = socketio.listen(server);
  
  io.on('connection' ,(socket) => {
    console.log('socket connected  ',socket.id);
    socket.on('getNotifications', async (userData) => {
      console.log(userData);
      try{
        let where = {};
        let result = {
          total : 0,
          notifications : []
        }
        if(userData.user_id){
          let followedIds = []; 
          let followData = await follow.findAll({
            where: {
                user_id: userData.user_id,
                action_type : 1,
            },
            attributes : ['corresponding_id'],
            raw:true
          });
          followData.forEach(data => {
            followedIds.push(data.corresponding_id);
          });
          let likeData = await likeModel.findAll({
            where: {
                user_id: userData.user_id,
                status : 1
            },
            attributes : ['article_id'],
            raw:true
          });
          likeData.forEach(data => {
            followedIds.push(data.article_id);
          });
  
          let bookmarkData = await bookmarkModel.findAll({
            where: {
                user_id: userData.user_id,
                status : 1
            },
            attributes : ['article_id'],
            raw:true
          });
          bookmarkData.forEach(data => {
            followedIds.push(data.article_id);
          });
          
          console.log('followids', followedIds);
          where = {
            '$or' : [
              { ['userids.'+userData.user_id] : 0 },
              { $and : [
                {created_by : {$ne : userData.user_id}},
                { ['userids.'+userData.user_id] : {$ne : 1}},
                {corresponding_id : { $in : followedIds}},
                {subtype : {$in : ['comment', 'article_edits']}}
                ]
              },
            ]
          }
          console.log('where query :',JSON.stringify(where));
          let notifications = await Notificationmodel.find(where).sort({_id : -1}).limit(10);
          result.total = notifications.length;
          result.notifications = notifications;
        }
        socket.emit('newnotifications', result);
      }catch(err){
        console.log('Error is : ', err);
      }

    });
  });
  return io;
}