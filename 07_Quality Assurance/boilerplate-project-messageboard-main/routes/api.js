'use strict';
const Thread = require('../models/thread.js');
const Reply = require('../models/reply.js');

module.exports = function (app) {
  app.route('/api/threads/:board')

  .post(async function (req, res) {
    let {board, text, delete_password} = req.body;
    if (!board) board = req.params.board;
    // console.log('Posting thread: ', board, text, delete_password);
    try{
      if (!board || !text || !delete_password) {
        res.send("missing required field(s)");
      } else {
        const dateObj = new Date();
        const newThread = new Thread(
          {
            text: text,
            delete_password: delete_password,
            board: board,
            created_on: dateObj,
            bumped_on: dateObj
          }
          );
        await newThread.save();
        return res.redirect(`/b/${board}/`);
      }
    } catch(err){
      console.log(err);
    }

}).get(async function (req, res){
  // console.log('Getting board: ', req.body, req.params);
  if (!req.params.board){
    const board = 'general'
  } else {
    const board = req.params.board;
  }
  /*
  Return array of the most recent 10 bumped threads on the board
  with only the most recent 3 replies for each. The reported and
  delete_password fields will not be sent to the client.
  */
  let localThreads = await Thread.find({board: req.params.board}).sort({bumped_on: 'desc'})
    .limit(10).select(['-reported', '-delete_password', '-replyNext', '-board']);
    for (const thread of localThreads){
      // console.log(thread);
      if (thread['replies'].length > 0){
        thread['replies'].sort((a,b) => b.date - a.date).splice(3);
      }}
  res.json(localThreads);

}).delete(async function (req, res){
  // console.log('Deleting thread: ', req.body, req.params);
  let localThread = await Thread.findById(req.body.thread_id);
  if (!localThread){
    res.json({error: 'an error has occurred'});
  }
  if (localThread.delete_password == req.body.delete_password){
    await Thread.findByIdAndDelete(req.body.thread_id);
    res.send(`success`);
  } else {res.send("incorrect password")};

}).put(async function (req, res){
  // console.log('Reporting thread: ', req.body, req.params);
  try {
    await Thread.findByIdAndUpdate(req.body.thread_id, {reported: true});
    res.send("reported");
  } catch(err) {
    res.json({'error': err.message});
  }
})

  app.route('/api/replies/:board')

  .post(async function (req, res){
    console.log('Posting reply:', req.body);
    const board = req.params.board;
    let thisThread = await Thread.findById(req.body.thread_id);
    if (!thisThread){
      res.send('Cannot find Thread');
    } else {
      const replyId = thisThread.replyNext;
      const dateObj = new Date();
      const newReply = {
        _id: replyId,
        text: req.body.text,
        delete_password: req.body.delete_password,
        created_on: dateObj,
        reported: true,
      }
      thisThread.replyNext++;
      thisThread.replies.push(newReply);
      thisThread.bumped_on = dateObj;
      await thisThread.save();
      return res.redirect(`/b/${board}/${req.body.thread_id}`)
    }
  })

  .delete(async function (req, res){
    // console.log('Deleting reply:', req.body);
    let thisThread = await Thread.findById(req.body.thread_id).select('+replies.delete_password');
    if (!thisThread){
      res.send('Cannot find Thread');
    } else {
      if (thisThread.replies.find(r => r._id === Number(req.body.reply_id)).delete_password === req.body.delete_password){
        thisThread.replies.find(r => r._id === Number(req.body.reply_id)).text = '[deleted]'
        await thisThread.save();
        return res.send('success');
      } else {
        return res.send('incorrect password');
      }
    }
  })

  .put(async function (req, res){
    console.log('Reporting reply:', req.body);
    let thisThread = await Thread.findById(req.body.thread_id);
    if (!thisThread){
      res.send('Cannot find Thread');
    } else {
      thisThread.replies.find(t => t._id === Number(req.body.reply_id)).reported = true;
      await thisThread.save();
      res.send("reported");
    }

  }).get(async function (req, res){
    // console.log("Getting thread:", req.query, req.params);
    try {
      let thisThread = await Thread.findById(req.query.thread_id)
        .select('-replies.delete_password -replies.reported -reported -delete_password');
      // console.log(thisThread);
      if (!thisThread){
        res.send('Cannot find Thread');
      } else {
        console.log(thisThread);
        res.json(thisThread);
      }
    }catch (err){
      console.log(err.message);
    }
  });
};