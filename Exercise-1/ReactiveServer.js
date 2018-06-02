const {Subject}=require('rxjs');
const url=require('url');
const {fork}=require('child_process');

const subject = new Subject();

function onSendFileContent(reqres){
    if(reqres.filestream==='end'){
        reqres.res.statusCode = 200;
        reqres.res.end();  
    }
    else{
        reqres.res.write(reqres.filestream);
    }
    
}

subject.subscribe(onSendFileContent,
                (err)=>console.error(err));

const http=require('http');
let filestream='';
http.createServer((req, res)=>{
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    const childProcess = fork('./fileReader.js');
    childProcess.send(query.url);
    childProcess.on('message', stream=>{
        
            if(stream==='end'){
                console.log('Killing child process');
                childProcess.kill();
            }
            subject.next({req: req, res: res, filestream:stream});
    });    
}).listen(4000, 'localhost');