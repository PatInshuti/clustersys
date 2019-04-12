const express = require('express');
const app = express();
const cluster = require("cluster");
const numCPUs = require('os').cpus().length;
const processId = process.pid;

if(cluster.isMaster){
    console.log("master running with a Process ID " + processId);
    
    //create as many workers as the available number of number of CPUs
    for(let counter = 0; counter <(numCPUs-1); counter++){
        cluster.fork(); // let each worker fork the master. Basically each worker runs its own version of the application
    }

    // //After forking process finishes the master is replaced by workers. Considered dead,
    // //This is why we have no to run the application using workers and checking that they are not master
    // cluster.on('exit', (worker, code, signal) => {
    //     console.log(`worker ${worker.process.pid} died`);
    // });
}

else{
    //accept all requests using workers
    console.log("workers working")
    app.get("/", ()=> res.send("workers at it") );
}

const port = 3838;
app.listen(port, ()=> console.log(port + ' lunched and running'));