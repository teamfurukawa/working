var http = require( 'http' ); // HTTPモジュール読み込み
var socketio = require( 'socket.io' ); // Socket.IOモジュール読み込み
var fs = require( 'fs' ); // ファイル入出力モジュール読み込み

// 8124でHTTPサーバーを立てる
var server = http.createServer( function( req, res ) {
      res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
      res.end( fs.readFileSync('./button.html', 'utf-8') ); 
}).listen(8124);

// 8125ポートでHTTPサーバーを立てる
var server2 = http.createServer( function( req, res ) {
   if(req.url=="/coin"){
      fs.readFile('./coin.mp3','binary',
         function(err, data) {
            res.writeHead(200, { 'Content-Type' : 'audio/mpeg' }); // ヘッダ出力
            res.write(data, 'binary');
            res.end();
         }
      );
   }else if(req.url=="/1up"){
      fs.readFile('./1up.mp3','binary',
         function(err, data) {
            res.writeHead(200, { 'Content-Type' : 'audio/mpeg' }); // ヘッダ出力
            res.write(data, 'binary');
            res.end();
         }
      );
   }else if(req.url=="/sound2"){
      fs.readFile('./se_maoudamashii_voice_human04.mp3','binary',
         function(err, data) {
            res.writeHead(200, { 'Content-Type' : 'audio/mpeg' }); // ヘッダ出力
            res.write(data, 'binary');
            res.end();
         }
      );
   }else{
      res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
      res.end( fs.readFileSync('./count.html', 'utf-8') );  // count.htmlの内容を出力
   }
}).listen(8125);

// サーバーをソケットに紐付ける
var i = socketio.listen( server );
var o = socketio.listen( server2 );

var count1 = 0;
var count2 = 0;
var count_answerA = 0;
var count_answerB = 0;
var count_answerC = 0;
var count_answerD = 0;


// 接続確立後の通信処理部分を定義
i.sockets.on( 'connection', function( socket ) {

    socket.on( 'c2s_button1', function() {
        count1++;
        o.sockets.emit( 's2c_button1', { value : count1 } );
    });
    
    socket.on( 'c2s_button2', function() {
        count2++;
        o.sockets.emit( 's2c_button2', { value : count2 } );
        
    });
    socket.on( 'c2s_answerA', function() {
        count_answerA++;
        o.sockets.emit( 's2c_answerA', { value : count_answerA } );
        
    });
    socket.on( 'c2s_answerB', function() {
        count_answerB++;
        o.sockets.emit( 's2c_answerB', { value : count_answerB } );
        
    });
    socket.on( 'c2s_answerC', function() {
        count_answerC++;
        o.sockets.emit( 's2c_answerC', { value : count_answerC } );
        
    });
    socket.on( 'c2s_answerD', function() {
        count_answerD++;
        o.sockets.emit( 's2c_answerD', { value : count_answerD } );
        
    });

});

o.sockets.on( 'connection', function( socket ) {
    socket.on( 'c2s_reset', function() {
        count_answerA = 0;
        count_answerB = 0;
        count_answerC = 0;
        count_answerD = 0;
        
        o.sockets.emit( 's2c_answerA', { value : count_answerA } );
        o.sockets.emit( 's2c_answerB', { value : count_answerB } );
        o.sockets.emit( 's2c_answerC', { value : count_answerC } );
        o.sockets.emit( 's2c_answerD', { value : count_answerD } );
    });
});


