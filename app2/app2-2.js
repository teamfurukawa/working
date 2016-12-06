var http = require( 'http' ); // HTTPモジュール読み込み
var socketio = require( 'socket.io' ); // Socket.IOモジュール読み込み
var fs = require( 'fs' ); // ファイル入出力モジュール読み込み

// 8125ポートでHTTPサーバーを立てる
var server = http.createServer( function( req, res ) {
      res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
      res.end( fs.readFileSync('./button.html', 'utf-8') ); 
}).listen(8124);

// 8125ポートでHTTPサーバーを立てる
var server2 = http.createServer( function( req, res ) {
   if(req.url=="/sound"){
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

var count = 0;

// 接続確立後の通信処理部分を定義
i.sockets.on( 'connection', function( socket ) {

    // クライアント(へえ)からサーバーへのリクエスト送信ハンドラ
    socket.on( 'c2s_heee', function() {

        count++;

        // サーバーからクライアント(カウンタ)へる送
        o.sockets.emit( 's2c_message', { value : count } );
        
    });

});
