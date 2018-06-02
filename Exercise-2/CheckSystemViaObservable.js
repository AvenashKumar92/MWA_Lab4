const os=require('os');
const {from}=require('rxjs');

function checkSystem(){
    return new Promise(function(resolve, reject){
        console.log('Checking your system...');

        const totalMemory=os.totalmem()/(1024*1024*1024);
        if(totalMemory<4){
            reject('This app needs at least 4 GB of RAM');
        }
        else if(os.cpus().length<2){
            reject('Processor is not supported');
        }
        else{
            resolve('System is checked successfully.');
        }
    })
}
from(checkSystem())
    .subscribe((e)=>console.log(e),
                (err)=>console.error(err));
