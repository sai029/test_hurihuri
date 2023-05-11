eff = new Howl({
    src: ["/SoundSamples/se01.wav"],
    autoplay: false,
    loop: false,
    volume: 0.8
});


function ClickRequestDeviceSensor(){
//デバイスのイベントへのリクエスト許可確認
DeviceOrientationEvent.requestPermission().then( function( response ){
if( response === 'granted' ){
//許可されたらイベントを実行する
window.addEventListener("devicemotion", devicemotionHandler);
//許可ボタンを消す
$('#sensorrequest').css( 'display', 'none' );
}
}).catch( function( e ){
console.log( e );
});
}


//$(function(){
window.onload = () => {

if( window.DeviceOrientationEvent ){
if( DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function' ){

var banner = '<div  onclick="ClickRequestDeviceSensor();" class="btn" id="sensorrequest">加速度センサーの有効化</div>';
$('#demo_info').append( banner );

}else{
window.addEventListener("devicemotion", devicemotionHandler);
}



}

};

function devicemotionHandler(event) {


// X軸
var x = event.acceleration.x;
// Y軸
var y = event.acceleration.y;
// Z軸
var z = event.acceleration.z;

var l = 7;
if (x > l) {
$('#demo_data span').html('<b>右</b>に振りました！');
sf();
}
else if (x < -l) {
$('#demo_data span').html('<b>左</b>に振りました！');
sf();
}
else if (y > l) {
$('#demo_data span').html('<b>上</b>に振りました！');
sf();
}
else if (y < -l) {
$('#demo_data span').html('<b>下</b>に振りました！');
sf();
}
else return;

}

function sf(){
eff = new Howl({
    src: ["/sound/demo/click/003.mp3"],
    autoplay: false,
    loop: false,
    volume: 0.8
});
eff.play();
$(".demo_icon").removeClass("poyon").addClass("poyon");

$(".demo_icon").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
$(".demo_icon").removeClass('poyon');
});
$(".demo_icon").addClass('poyon');
}
