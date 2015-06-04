 //função liga/desliga aquecedor//    
            
                    function ChangeImageSrcOn(){
                       var img = document.getElementById('myImage'); 
                       img.src = "images/temperature2.png";    
                    }
                    
                    function ChangeImageSrcOff(){
                       var img = document.getElementById('myImage'); 
                       img.src = "images/temperature.png";    
                    }
            
            
            //função para conectar-se ao server//
            $(function(){ 
		var socket = io.connect("http://192.168.0.100:4000");
                    
                    socket.on('connected',function(){
                       
                        navigator.notification.alert(
                            "Great Job!",  // message
                            "",
                            'You are Connected!',            // title
                            'Ok'                  // buttonName
                        );
                    });
                    
                
            //função para mostrar a temperatura na caixa de texto//
                
                    socket.on('vaca',function(data){
                        var newItem = data;
                        $('#valor').empty();
                        $('#valor').append(' ' + newItem);
                    });             
                    
            //função para ligar e desligar os leds dos quartos//      
                
                    $("#quarto1_switch").change(function(){
                        socket.emit("state1Changed", this.checked);
                    });
                    
                    $("#quarto2_switch").change(function(){
                        socket.emit("state2Changed", this.checked);
                    });
            
            //função para abrir e fechar o portão (motor de passo)//
                
                    $("#portao-btn").click(function(){
                        socket.emit("portao");
                    });
                
            //função alarme
                
                    $("#alarme-swt").change(function(){
                        liga=this.checked;
                        socket.emit("alarme", this.checked);
                        
                    });
                
                    socket.on('alarmeon',function(){
                        
                        $('#alarme-status').empty();
                        $('#alarme-status').append('***Alarme Ativado*** ---> Sua casa está segura!');
                    });        
                
                    socket.on('alarmeoff',function(){
                        
                        $('#alarme-status').empty();
                        $('#alarme-status').append('***Alarme Desativado*** ---> Sua casa está desprotegida!');
                    });        
                    
                    socket.on('touro',function(data2){
                        var newItem2 = data2;
                        if(liga==true && newItem2<18){
                        alert("Sua casa foi invadida!!");
                        $('#alarme-status').empty();
                        $('#alarme-status').append('***Alarme Disparado*** ---> Sua casa está em perigo!');
                        }
                    }); 
		});
