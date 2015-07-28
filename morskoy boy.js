
//определяем по какому елементу был клик
window.onload=function () {
var table=document.getElementById('computer');
var columns=table.getElementsByTagName("td");
var num=columns.length;
for (var i=0;i<num;i++) {
columns[i].onclick=showAnswer;
}
var tableUser=document.getElementById('user');
var columnsUser=tableUser.getElementsByTagName("td");
var numUser=columnsUser.length;
for(var k=0;k<numUser;k++){
	columnsUser[k].onmouseover=raspUserShip;
	columnsUser[k].onmouseout=clearClass;
	columnsUser[k].onclick=enterUserShip;
	
}
document.onkeypress=turnLocation;
};

var busyArea=[];

//функция добавления занятых координат.


/*
функция проверки расположения корабля разрешенным координатам. возвращает истину или ложь. 
*/

var allShips=createAllShips();

//функция вызываемая при клике
function showAnswer(event) {
	//определяем координаты ячейки, по которой стрельнули 
	var column=event.target;
	if(column.className=="red"||column.className=="blue"){
		alert("Вы уже сюда стреляли!!!!");	
	}else{
		var id=column.id;
		var shut=0;
		for (var k in allShips) {
			var location=allShips[k].location;
			for(var n in location){
				if (id==location[n]){
					shut=1;
				}
			}
			if (shut==1) {
				column.setAttribute("class","red");	
			}else {
				column.setAttribute("class","blue");
				}
			}	
		}
}	

/******** Создание кораблей противника(компьютера) ***/

//определение координат

function createLocation(array,rasp,num,loc1,loc2){
	for(var i=0;i<num;i++){
		if(loc1>=0&&loc2>=0&&loc1<10&&loc2<10){
		array.push(loc1.toString()+loc2.toString());	
		}
		if(rasp){
			loc2++;
		}else{
			loc1++;
		}
	}
	return array;
}

//функция создания корабля, передаваемый параметр - количество клеток,
//возвращает объект корабль, со свойствами: вертикального или горизонтального
//расположения, массив координат корабля и количеством выстрелов.

function createShip(number){
var rasp=Math.floor(Math.random()*2);
var ship={
	rasp:0,
	location:[],
	shuts:0
};
if(rasp===1){
	var loc1=Math.floor(Math.random()*10);
	var loc2=Math.floor(Math.random()*7);
createLocation(ship.location,rasp,number,loc1,loc2);
	ship.rasp=1;	
}else{
	var loc2=Math.floor(Math.random()*10);
	var loc1=Math.floor(Math.random()*7);
createLocation(ship.location,rasp,number,loc1,loc2);	
}
return ship;	
}

//функция создания запрещенной области координат, возвращает массив координат. 

function createBusyArea(ship){
	var location=ship.location[0];
	console.log(location);
	var rasp=ship.rasp;
	var loc1=parseInt(location.charAt(0));
	var loc2=parseInt(location.charAt(1));
	var number=ship.location.length;
	if(rasp==1){
		createLocation(busyArea,rasp,number+2,loc1,loc2-1);
		createLocation(busyArea,rasp,number+2,loc1+1,loc2-1);
		createLocation(busyArea,rasp,number+2,loc1-1,loc2-1);
	}else{
		createLocation(busyArea,rasp,number+2,loc1-1,loc2);
		createLocation(busyArea,rasp,number+2,loc1-1,loc2+1);
		createLocation(busyArea,rasp,number+2,loc1-1,loc2-1);
	}
}

function createAllShips(){
	var ships=[];
	var number=[4,3,3,2,2,2,1,1,1,1];
	for (var num in number){
		if(num==0){
			ship=createShip(number[num]);
			ships.push(ship);
			createBusyArea(ship);
		}else{
			do{
				ship=createShip(number[num]);
			}while(correctLocation(ship.location)===false)
			createBusyArea(ship);
			ships.push(ship);	
		}
	}
	return ships;
}


function correctLocation(locShip){
	for(var index in locShip){
		for(var k in busyArea){
			if(locShip[index]===busyArea[k]){
				return false;
			}
			
		}
	}
	return true;
}

/****** Расстановка кораблей пользователем **********/

//функция определения вертикального или горизонтального расположения, 
//возвращает истину при горизонтальном расположении

var userShips=[]; //хранит расположение всех кораблей пользователя
var numUser=4;
var userShip=[];
var key=0;// определяет горизонтальное или вертикальное расположение корабля
function showInstruction(){
	
}

function raspUserShip(event){
	var id=event.target.id;
	var num=numUser;
	userShip=createUserShip(id,num);
	createClass(userShip,"green");
}

//функция определения типа корабля 
function determineNum(){
	var index=userShips.length;
	if(index===undefined){
		index=0;
	}
	var number=[4,3,3,2,2,2,1,1,1,1];
	var num=number[index];
	return num;
}

//определение координат корабля

function createUserShip(id,number){
	var horiz=parseInt(id.charAt(1));
	var vert=parseInt(id.charAt(2));
	var userShip=[];
	for(var i=0;i<number;i++){
		if((vert+number)<11){
			coordinats="1"+horiz.toString()+(vert+i).toString();
			userShip.push(coordinats);
		}
	}
	console.log(userShip);
	return userShip;
}

//создание класса для корабля
function createClass(ship,className){
	for (index in ship){
		coordinats=document.getElementById(ship[index]);
		coordinats.setAttribute("class",className);
	}
}

//ввод координат корабля
function enterUserShip(){
	var userShipLocation=userShip;
	userShips.push(userShipLocation);
	createClass(userShipLocation,"blue");
}

//очищаем класс при перемещении курсора
function clearClass(event){
	column=event.target;
	if(column.className=="green"){
		var userShipLocation=userShip;
		createClass(userShipLocation,"white");

	}
}

function turnLocation(event){
	if(event.keyCode==118){
		key=1;
	}else if(event.keyCode==103){
		key=0;
	}
	
}