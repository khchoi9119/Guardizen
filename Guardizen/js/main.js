/*var startTime;
var checkTime;

//Initialize function

var init = function () {
   // TODO:: Do your initialization job
   console.log("init() called");
   
   powerOn();
   // add eventListener for tizenhwkey
   document.addEventListener('tizenhwkey', function(e) {
      if(e.keyName == "back") {
         try {
            tizen.application.getCurrentApplication().exit();
         } catch (error) {
            console.error("getCurrentApplication(): " + error.message);
         }
      }
   });
};
// window.onload can work without <body onload="">
window.onload = init;
( function () {
   window.addEventListener( 'tizenhwkey', function( ev ) {
      if( ev.keyName == "back" ) {
         var page = document.getElementsByClassName( 'ui-page-active' )[0],
            pageid = page ? page.id : "";
         if( pageid === "main" ) {
            try {
               tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
            }
         } else {
            window.history.back();
         }
      }
   } );
} () );


// Bluetooth code
var adapter = tizen.bluetooth.getDefaultAdapter();
var bluetoothSwitchAppControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/edit", null, "application/x-bluetooth-on-off");
var u=0;
var manager = tizen.bluetooth;
function controlManager(manager){
	if(manager.deviceMajor==0x01){
		alert("computer");
	}
}
function onBondingSuccess(device) {
    console.log("Device Name:" + device.name);
    console.log("Device Address:" + device.address);
    console.log("Device Service UUIDs:" + device.uuids.join("\n"));
}

function hex2a(hexx) {
   var hex = hexx.toString(); //force conversion
   var str = '';
   for (var i = 0; i < hex.length; i += 2)
   str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
   return str;
}

function bluetoothClick() {
   startDiscovery();
   
   //adapter.createBonding("A0:B4:A5:6E:B6:3D", onBondingSuccessCallback, onErrorCallback);
   //adapter.createBonding("A0:B4:A5:6E:B6:3D", onBondingSuccess, onError);
}







function SocketOpen() 
{
   //device.connectToServiceByUUID("fa87c0d0-afac-11de-8a39-0800200c9a66", function(socket) {
	   device.connectToServiceByUUID("5BCE9431-6C75-32AB-AFE0-2EC108A30860", function(socket) {    
         alert("socket connected");
         socket = sock;
         onSocketConnected(sock);
       var data = socket.readData();
       var recvmsg = "";
       for(var i = 0; i < data.length; i++) {
          recvmsg += String.fromCharCode(data[i]);
       }
       console.log(data);
          
       alert(recvmsg);
      
   }
   ,function(error)
   {
      console.log("Error while connecting: " + error.message);
   });
}






function onBondingSuccessCallback(device)
{
   alert("A bonding is created - name: " + device.name);
   
   device.connectToServiceByUUID("5BCE9431-6C75-32AB-AFE0-2EC108A30860", function(socket) {
         alert("socket connected");
//         socket = sock;
         onSocketConnected(socket);
       var data = socket.readData();
       var recvmsg = "";
       for(var i = 0; i < data.length; i++) {
          recvmsg += String.fromCharCode(data[i]);
       }
       console.log(data);
          
       alert(recvmsg);
      
   }
   ,function(error)
   {
      console.log("Error while connecting: " + error.message);
   });
}

//삭제할 것
function onSocketConnected(socket) {
   socket.onmessage = function() {
      alert("message receive");
      var data = socket.readData();
       var recvmsg = "";
       for(var i = 0; i < data.length; i++) {
          recvmsg += String.fromCharCode(data[i]);
       }
          
       alert(recvmsg);
       
       u++;
       if(devices.length != u) {
          alert("hey");
          adapter.getDevice(devices[u].address,onBondingSuccessCallback,function(e) {
               console.log("Fail : " + e); 
               
             });
       }
   }
}

function onErrorCallback(e)
{
   alert("Cannot create a bonding, reason: " + e.message);
}


// Bluetooth On
function powerOn() 
{
     // If adapter is not powered on 
     if(!adapter.powered) {
          // Initiates power on
          adapter.setPowered(true, function() {
             console.log("Bluetooth powered on success.");
             showMe();
          },
          function(e) {
              console.log("Failed to power on Bluetooth: " + e.message);
          });
     }
}

// Bluetooth visible
function showMe()
{
     if (adapter.visible == false) {
         //Shows device
         adapter.setVisible(true, 
                            function() { console.log ("Device is visible to other devices for 3 minutes."); },
                            function(e) { console.log ("Error: ' + e.message + '(' + e.name + ')"); });
     }
     else {
          console.log("Device is already in discoverable mode.");
     }
}

//connecting bluetooth devices name
var discoverDevicesSuccessCallback =
{
   ondevicefound: function(device)
   {
      alert("Found device - name: " + device.name);
   }
}

// connecting bluetooth devices number
function onGotDevices(devices)
{
   alert("The number of known devices: " + devices.length);
}

function startDiscovery() {
     var discoverDevicesSuccessCallback = {
         onstarted: function() { 
        	 controlManager(manager);
             console.log ("Device discovery started...") ;
         },
         ondevicefound: function(device) {
             console.log("Found device - name: " + device.name + ", Address: "+ device.address);
             // Shows the device to user to check if this is the device user is looking for.
             // For example, add this to list view.
             cancelDiscovery();
         },
         ondevicedisappeared: function(address) {
             console.log("Device disappeared: " + address);
             // Removes from list, as it is no longer valid.
         },
         onfinished: function(devices) { 
             console.log("Found Devices");
             document.getElementById("menu").innerHTML = "";
             for (var i = 0; i < devices.length; i++) {
                 document.getElementById("menu").innerHTML += "Name: " + devices[i].name + ", Address: " + devices[i].address + "<br>";
             }
             console.log("Total: " + devices.length);
             
             alert("Dis-Com");
             adapter.
             adapter.getDevice(devices[u].address,onBondingSuccessCallback,function(e) {
               console.log("Fail : " + e); 
               
             });
             
//             adapter.getDevice("A0:B4:A5:6E:B6:3D",onBondingSuccessCallback,function(e) {
//                console.log("Fail : " + e); 
//             });
             
             
             //A0:B4:A5:6E:B6:3D             
         }
     };
     // Starts searching for nearby devices, for about 12 sec.
     adapter.discoverDevices(discoverDevicesSuccessCallback, function(e){
         console.log ("Failed to search devices: " + e.message + "(" + e.name + ")");
     });
}




function testClick()
{
	var gw_name = "hi";
	alert("1");
	$.ajax({

		type:"POST",
		
		url : "http://jong1.dothome.co.kr/khtest.php",

		data : "ref1="+gw_name,

		dataType : "jsonp",

		jsonpCallback : "myCallback",

		success: function(data) {

		alert('성공 - ', data);



		if(data != null)    {

		alert(data.message + "[" + data.time + "]" + data.gate_name);

		}

		},

		error: function(xhr) {

			alert('실패 - ', xhr);

		}

		});
	alert("2");
}




function testClick2()
{
	alert("시작");
	var url = "http://jong1.dothome.co.kr/test2.php";

	http=new XMLHttpRequest();
	http.open("POST", url, true);

	http.setRequestHeader("Content-type", "application/json");
	http.setRequestHeader("Connection", "close");

	// create the data in a data structure named post_data
	var JSONText = JSON.stringify("post_data=1");
	http.send(JSONText);
	alert("끝");
	var xmlhttp, xmlhttp2;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
//	  xmlhttp2=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  try{
		  xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
	  }catch(tryMS){
		  try{
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }catch(failed){
			  
		  }
	  }
//	  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	
	xmlhttp.onreadystatechange = alertContents;

	var data = FormData();
	data.append('post_data', '3');
	
	xmlhttp.open('POST','http://jong1.dothome.co.kr/test.php',true);
//	xmlhttp2.open('GET','http://jong1.dothome.co.kr/test.php',true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//	xmlhttp2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(data);
//	xmlhttp2.send("get_data=3");

}


function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
function post_to_url(path, params, method) {
	  
	   method = method || "post"; // Set method to post by default, if not specified.
	   
	   // The rest of this code assumes you are not using a library.
	   // It can be made less wordy if you use one.
	   var form = document.createElement("form");
	    form.setAttribute("method", method);
	       form.setAttribute("action", path);
	  
	   for ( var key in params) {
	   
	    var hiddenField = document.createElement("input");
	    hiddenField.setAttribute("type", "hidden");
	    hiddenField.setAttribute("name", key);
	    hiddenField.setAttribute("value", params[key]);
	    
	    form.appendChild(hiddenField);
	   }

	   document.body.appendChild(form);
	   form.submit();
	  }


$(document).ready(function()
		{
		    var contentType ="application/x-www-form-urlencoded; charset=utf-8";
		 
		    if(window.XDomainRequest)
		        contentType = "text/plain";
		 
		    $("#postdata").click(function()
		    {
		        $.ajax({
		         url:"http://jong1.dothome.co.kr/post.php",
		         data:"name=Ravi&age=12",
		         type:"POST",
		         dataType:"json",   
		         contentType:contentType,    
		         success:function(data)
		         {
		            alert("Data from Server"+JSON.stringify(data));
		         },
		         error:function(jqXHR,textStatus,errorThrown)
		         {
		            alert("You can not send Cross Domain AJAX requests: "+errorThrown);
		         }
		        });
		 
		    });
		 
		    $("#getdata").click(function()
		    {
		        $.ajax(
		        {
		         url:"http://hayageektest.appspot.com/cross-domain-cors/get.php?name=Ravi&age=32",
		         dataType:"json",
		         contentType:contentType,
		         success:function(data)
		         {
		            alert("Data from Server"+JSON.stringify(data));
		         },
		         error:function(jqXHR,textStatus,errorThrown)
		         {
		            alert("You can not send Cross Domain AJAX requests : "+errorThrown);
		         }
		        });
		 
		    });
		 
		});*/
//
//function do_sum(param1, param2, cfunction) { 
//   
//     // send ajax response to server 
//     $.ajax({ 
//         type: 'POST',  
//         url: 'http://jong1.dothome.co.kr/post.php',  
//         crossDomain: true, 
//         dataType: 'json', 
//         data: 'action=sum&param1=' + param1 + '&param2=' + param2, 
//         success: function(json) { 
//             // and evoke client's function 
//             cfunction(json); 
//         }  
//     }); 
// } 
//   
// function do_sub(param1, param2, cfunction) { 
//   
//     // send ajax response to server 
//     $.ajax({ 
//         type: 'POST',  
//         url: 'http://jong1.dothome.co.kr/post.php',  
//         crossDomain: true, 
//         dataType: 'json', 
//         data: 'action=sub&param1=' + param1 + '&param2=' + param2, 
//         success: function(json) { 
//             // and evoke client's function 
//             cfunction(json); 
//         }  
//     }); 
// } 
//   
// function do_mul(param1, param2, cfunction) { 
//   
//     // send ajax response to server 
//     $.ajax({ 
//         type: 'POST',  
//         url: 'http://jong1.dothome.co.kr/post.php',  
//         crossDomain: true, 
//         dataType: 'json', 
//         data: 'action=mul&param1=' + param1 + '&param2=' + param2, 
//         success: function(json) { 
//             // and evoke client's function 
//             cfunction(json); 
//         }  
//     }); 
// } 
//   
// function do_div(param1, param2, cfunction) { 
//   
//     // send ajax response to server 
//     $.ajax({ 
//         type: 'POST',  
//         url: 'http://jong1.dothome.co.kr/post.php',  
//         crossDomain: true, 
//         dataType: 'json', 
//         data: 'action=div&param1=' + param1 + '&param2=' + param2, 
//        success: function(json) { 
//            // and evoke client's function 
//             cfunction(json); 
//         }  
//     }); 
// } 
// 
// $(document).ready(function() {  
//	   
//     // execute method 1 (sum) by server 
//     var param1 = 5; 
//     var param2 = 10; 
//     do_sum(param1, param2, function(data) { 
//         $('#results').append(param1 + ' + ' + param2 + ' = ' + data.result + '<br />'); 
//   
//         // execute method 2 (sub) by server 
//         param1 = 25; 
//         param2 = 15; 
//         do_sub(param1, param2, function(data) { 
//             $('#results').append(param1 + ' - ' + param2 + ' = ' + data.result + '<br />'); 
//   
//             // execute method 3 (mul) by server 
//             param1 = 8; 
//             param2 = 5; 
//             do_mul(param1, param2, function(data) { 
//                 $('#results').append(param1 + ' * ' + param2 + ' = ' + data.result + '<br />'); 
//   
//                 // execute method 4 (sub) by server 
//                 param1 = 33; 
//                 param2 = 11; 
//                 do_sub(param1, param2, function(data) { 
//                     $('#results').append(param1 + ' / ' + param2 + ' = ' + data.result + '<br />'); 
//                 }); 
//             }); 
//   
//         }); 
//     }); 
// }); 



 function scb() { 
	 console.log("success callback is called"); 
}
 
 function ecb(e) { 
	 console.log("error callback is called : " + e.message + " : " + e.code); 
}
 
 var statuscb = {
   onsuccess: function() {
     console.log("onsuccess func is called");
     tizen.networkbearerselection.releaseRouteToHost("CELLULAR", "www.google.com", scb, ecb);
   },
   ondisconnected: function() { console.log("ondisconnected func is called"); }
 };
 tizen.networkbearerselection.requestRouteToHost("CELLULAR", "www.google.com", statuscb, ecb);

 
function test(){


}