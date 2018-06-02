const fs=require('fs');
process.on('message', (filePath)=>{
    const completePath='./'+filePath;
    const readable=fs.createReadStream(completePath, 
                                        {encoding: 'utf8', highWaterMark: 16*1024});

    readable.on('data', function(chunk){
        process.send(chunk);
    });
    readable.on('end', ()=>{
        process.send('end');
    })
                                    
});

