function start() {
alert("Hello!");
}
;
//определяем по какому елементу был клик
window.onload=function () {
var columns=document.getElementsByTagName("td");
var num=columns.length;
for (var i=0;i<num;i++) {
columns[i].onclick=showAnswer;
}
};

//функция вызываемая при клике
function showAnswer(event) {
	var column=event.target;
	if(column.className=="red"||column.className=="blue"){
	alert("Вы уже сюда стреляли!!!!");	
	}else{
	var id=column.id;
	alert(id);
	var shut=0;
	for (var k in ship) {
	if (id==ship[k]){
		shut=1;
	}}
	if (shut==1) {
		column.setAttribute("class","red");	
	}else {column.setAttribute("class","blue");}}
}	


//определяем длину корабля

var number=4;
var position=Math.floor(Math.random()*6);
var ship=[];
for (var i=0;i<number;i++) {
ship.push("0"+position);
position++;
}