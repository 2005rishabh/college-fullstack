const http= require('https');
http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World');
}).listen(8000);

console.log('Server running at http://localhost:8000/');