const EventEmitter=require("events");
const events=new EventEmitter();
const amqplib = require('amqplib/callback_api');
const queue = 'tasks';
const queue2 = 'data';


amqplib.connect('amqps://djoyqpuc:YQ3g6ll71GahF0CETU17TbKvP1wjVf8o@dingo.rmq.cloudamqp.com/djoyqpuc',{


}, (err, conn) => {
  if (err) throw err;

else{



      // Listener
  conn.createChannel((err, ch2) => {
    if (err) throw err;

    ch2.assertQueue(queue);
    

    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        console.log("Coming from rabbit mq",msg.content.toString());
        ch2.ack(msg);

        // you can invoke your script --->from here 

        // you 
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });


      // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    events.on("data",(data)=>{

     //   console.log("event recevd ready for pushing to rqbbit mq",data)
        // Push to rabbit mq

        ch1.assertQueue(queue);
        ch1.assertQueue(queue2)


        // it is sending the data through the channel we created to the queue
        ch1.sendToQueue(queue, Buffer.from(data));
        ch1.sendToQueue(queue2, Buffer.from(data));

    })

 



  });

}

})







module.exports=events;
