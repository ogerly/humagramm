
//txt to link
function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blamk">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
    

function init_Cropper(){
 		var $image = $(".image-crop > img"),
 			$dataX = $("#dataX"),
         $dataY = $("#dataY"),
         $dataHeight = $("#dataHeight"),
         $dataWidth = $("#dataWidth");
          $($image).cropper({
               aspectRatio: 1 / 1,
               data: {
               	x: 60,
               	y: 60,
               	width: 200,
               	height: 200,
               	maxWidth: 500,
               	maxHeight: 500
           		},
            preview: ".img-preview",
            done: function(data) {
            			$dataX.val(Math.round(data.x));
            			$dataY.val(Math.round(data.y));
            			$dataHeight.val(Math.round(data.height));
            			$dataWidth.val(Math.round(data.width));
                 	}
         });

                            var $inputImage = $("#inputImage");
                            if (window.FileReader) {
                                console.log("window.FileReader start");
                                $inputImage.change(function() {
                                    console.log("inputImage.change");
                                    var fileReader = new FileReader(),
                                            files = this.files,
                                            file;

                                    if (!files.length) {
                                        return;
                                    }

                                    file = files[0];
                                    console.log("file => " + file);
                                    if (/^image\/\w+$/.test(file.type)) {
                                        fileReader.readAsDataURL(file);
                                        fileReader.onload = function () {
                                            $inputImage.val("");
                                            $image.cropper("reset", true).cropper("replace", this.result);
                                        };
                                    } else {
                                        showMessage("Please choose an image file.");
                                    }
                                });
                            } else {
                                $inputImage.addClass("hide");
                            }
                          
                          
                          var $inputImageurl = $("#imgurl");
                            if (window.FileReader) {
                                console.log("window.FileReader start");
                                $inputImageurl.change(function() {
                                    console.log("$inputImageurl.change");
                                 
                                    var fileReader = new FileReader();
                                    
                                    var blob = $("#imgurl").val();
                                   var  file = fileReader.readAsDataURL(blob);  
                                    
                                    
                                    console.log("file => " + file);
                                    if (/^image\/\w+$/.test(file.type)) {
                                        fileReader.readAsDataURL(file);
                                        fileReader.onload = function () {
                                            $inputImageurl.val("");
                                            $image.cropper("reset", true).cropper("replace", this.result);
                                        };
                                    } else {
                                        showMessage("Please choose an image file.");
                                    }
                                });
                            } else {
                                $inputImageurl.addClass("hide");
                            }
                          
                          
                            }  // function ende initcropper
                            

                    
                
                
                
function init_bootstrapDualList(){
                        $('.dual_select').bootstrapDualListbox({
                            selectorMinimalHeight: 160
                        });
                    }




// lädt eine übersicht datenblatt
/*
  typ = [human], [orga], [proj]

*/
function load_uebersicht(typ,id,name) {
    // ein tab hinzufügen
        
    var html,tabbox;
    
    if ( typ == "human"){
        html  = '<li id="li-'+typ+''+id+'"   onclick="load_only_human('+id+')">';
        html += '<a  id="tabbox-'+typ+''+id+'"  class="tab_data data-human" data-toggle="tab" href="#tab-'+typ+''+id+'">'+name+'  <span class="pointer" onclick="tabDelete(\''+typ+'\','+id+')"> X</span></a>  ';
        html += '</li>';
        
        tabbox  = '<div id="tab-'+typ+''+id+'" class="tab-pane active">';
        tabbox += '     <div class="panel-body"></div></div>';
 
    }

    if ( typ == "orga"){
        html  = '<li id="li-'+typ+''+id+'"   onclick="load_only_orga('+id+')">';
        html += '<a  id="tabbox-'+typ+''+id+'"  class="tab_data data-human" data-toggle="tab" href="#tab-'+typ+''+id+'">'+name+'  <span class="pointer" onclick="tabDelete(\''+typ+'\','+id+')"> X</span></a>  ';
        html += '</li>';
        
        tabbox  = '<div id="tab-'+typ+''+id+'" class="tab-pane active">';
        tabbox += '     <div class="panel-body"></div></div>';

    }
        
    if ( typ == "proj"){
        html  = '<li id="li-'+typ+''+id+'"   onclick="load_only_proj('+id+')">';
        html += '<a  id="tabbox-'+typ+''+id+'"  class="tab_data data-human" data-toggle="tab" href="#tab-'+typ+''+id+'">'+name+'  <span class="pointer" onclick="tabDelete(\''+typ+'\','+id+')"> X</span></a>  ';
        html += '</li>';
        
        tabbox  = '<div id="tab-'+typ+''+id+'" class="tab-pane active">';
        tabbox += '     <div class="panel-body"></div></div>';
      
    }
        

    $("#tab-box").append(html);
    $("#tab_contBOX").append(tabbox);
          
    setTimeout(function(){  $("#tabbox-"+typ+''+id+"").click();   }, 200);
}


function tabDelete(typ,id){
    $("#tab-"+typ+""+id+"").remove();
    $("#tabbox-"+typ+""+id+"").remove();
    $("#li-"+typ+""+id+"").remove();
     setTimeout(function(){
         
         
             $( "#tab-box li" ).last().find("a").click();
           
        

    }, 200);
   
}






function load_only_human(id){
    
    if ( $("#tab-human"+id+" .panel-body").html() != "" ) { return null; } 
        $.ajax({
            url: "php.php",
            type: "POST",
            data:    {typ: "load_only_human", id:id},   
            success: function(data) {
                console.log( data );
                if (data != "ERROR") {
                    console.log("load_only_human data => " + data);
                             
                    var html, 
                        tarr = data.split('#|#'), tdata,                            
                        l = tarr.length, i=0;
                              
                    for (i;i<l;i++){
                        tdata = tarr[i].split('#$#');
                                     
                                     
                                     
                         //  0`id`, `titel`, `gender`, 3`vorname`, 4`nachname`, `ort`, `plz`, 7`strasse_nr`, 
                         // 8`adresse2`, `bundesland`, `land`, `e-mail1`, 12`e-mail2`, `tel1`, `tel2`, `www1`, 16`www2`, 
                         // 17`dates`, `zusatz`, `youtube`, 20`facebook`, `google`, `twitter`, 23`img`
                         html  = "<div class='col-sm-4'><img src='images/menschen/"+tdata[23]+"' height='250'>";

                         html  += "<br><small >Eingetragen am: "+tdata[17]+"</small><br><br>";
                         html  += "<br><br><label class='btn btn-success' onclick='loadMordalform_img(\"human\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_img' >Bild bearbeiten </label>";
                         html  += "<br><br><label class='btn btn-info' onclick='loadMordalform_formdata(\"human\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_form' >Daten bearbeiten </label>";
                         html  += "</div>";


                         html += "<div class='col-sm-7'>";


                         // Geschlecht 
                         html += "<div >"+tdata[2]+"</div> ";

                         if (tdata[1] != "" ){
                             // Titel
                             html += "<div >"+tdata[1]+"</div> ";
                         }

                         // name
                         html += "<h2>"+tdata[3]+" "+tdata[4]+"</h2>";

                         if (tdata[18] != "" ){
                             // zusatz
                             html += "<div >"+urlify(tdata[18])+"</div><br> <hr> <br>";
                         }



                         if (tdata[5] != "" ){
                             // plz + Ort
                             html += "<div >"+tdata[6]+" "+tdata[5]+"</div><br>";
                          }
                         if (tdata[7] != "" ){
                             // strasse_nr
                             html += "<div >"+tdata[7]+"</div><br>";
                         }
                         if (tdata[8] != "" ){
                             // adresse2
                             html += "<div >"+tdata[8]+"</div><br>";
                         }
                         if (tdata[9] != "" ){
                             // bundesland
                             html += "<div >"+tdata[9]+"</div><br>";
                         }
                         if (tdata[10] != "" ){
                             // land
                             html += "<div >"+tdata[10]+"</div><br>";
                         }
                         if (tdata[11] != "" ){
                             // email1
                             html += "<div >"+tdata[11]+"</div><br>";
                         }
                         if (tdata[12] != "" ){
                             // email2
                             html += "<div >"+tdata[12]+"</div><br>";
                         }
                         if (tdata[13] != "" ){
                             // tel1
                             html += "<div >"+tdata[13]+"</div><br>";
                         }
                         if (tdata[14] != "" ){
                             // tel2
                             html += "<div >"+tdata[14]+"</div><br>";
                         }
                         if (tdata[15] != "" ){
                             // www1
                             html += "<a href='"+tdata[15]+"' target='_blank'>"+tdata[15]+"</a><br>";
                         }
                         if (tdata[16] != "" ){
                             // www2
                             html += "<a href='"+tdata[16]+"' target='_blank'>"+tdata[16]+"</a><br>";
                         }


                         if (tdata[19] != "" ){
                             // youtube
                             html += "<a href='"+tdata[19]+"' target='_blank'>Youtube</a> <br>";
                         }
                         if (tdata[20] != "" ){
                             //facebook
                             html += "<a href='"+tdata[20]+"' target='_blank'>Facebook</a> <br>";
                         }
                         if (tdata[21] != "" ){
                             // twitter
                             html += "<a href='"+tdata[21]+"' target='_blank'>Twitter</a> <br>";
                         }
                         if (tdata[22] != "" ){
                             // google
                             html += "<a href='"+tdata[22]+"' target='_blank'>Google</a> <br>";

                         }

                          html += " <hr><h3>in Organisationen </h3><label class='btn-xs btn-warning' onclick='loadMordalform_toTO(\"orga\","+tdata[0]+")'  data-toggle='modal' data-target='#myModal_toTO'>Organistation hinzufügen</label>";
                          html += " <hr><h3>in Projekten </h3><label class='btn-xs btn-warning' onclick='loadMordalform_toTO(\"proj\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_toTO'>Projekt hinzufügen</label>";


                         html += " <br> <br> <br></div>";


                                      
                        $("#tab-human"+id+" .panel-body").append(html);
                    }
                }
            }
        });
    
    }


function load_only_orga(id){
     if ( $("#tab-orga"+id+" .panel-body").html() != "" ) { return null; } 
    $.ajax({
        url: "php.php",
        type: "POST",
        data:    {typ: "load_only_orga", id:id},   
        success: function(data) {
            console.log( data );
            if (data != "ERROR") {
                console.log("load_only_orga data => " + data);

                var html, 
                    tarr = data.split('#|#'), tdata,                            
                    l = tarr.length, i=0;

                for (i;i<l;i++){

                    tdata = tarr[i].split('#$#');


                    //  0`id`, `name`, 2`orgatyp`, `plz`, `ort`, 5`str_nr`, `adresse2`, `bundesland`, `land`, 9`email1`, 
                    // 10`email2`, `tel1`, `tel2`, 13`ansprech`, 14`zusatz`, `img`, `dates`, `www1`, 18`www2`, 
                    // 19`facebook`, `twitter`, `youtube`, 22`google`
                    html  = "<div class='col-sm-4'><img src='images/orgas/"+tdata[15]+"' height='250'>";

                    html  += "<br><small >Eingetragen am: "+tdata[16]+"</small><br><br>";
                    html  += "<br><br><label class='btn btn-success' onclick='loadMordalform_img(\"orga\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_img' >Bild bearbeiten </label>";
                    html  += "<br><br><label class='btn btn-info' onclick='loadMordalform_formdata(\"orga\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_form' >Daten bearbeiten </label>";
                    html  += "</div>";
                    html += "<div class='col-sm-7'>";

                    
                    // orgatyp 
                    html += "<div >"+tdata[2]+"</div> ";

                    // name
                    html += "<h2>"+tdata[1]+"</h2>";

                    if (tdata[14] != "" ){
                        // zusatz
                        html += "<div >"+urlify(tdata[14])+"</div><br> <hr> <br>";
                    }



                    if (tdata[4] != "" ){
                        // plz + Ort
                        html += "<div >"+tdata[3]+" "+tdata[4]+"</div><br>";
                    }
                    if (tdata[5] != "" ){
                        // strasse_nr
                        html += "<div >"+tdata[5]+"</div><br>";
                    }
                    if (tdata[6] != "" ){
                        // adresse2
                        html += "<div >"+tdata[6]+"</div><br>";
                    }
                    if (tdata[7] != "" ){
                        // bundesland
                        html += "<div >"+tdata[7]+"</div><br>";
                    }
                    if (tdata[8] != "" ){
                        // land
                        html += "<div >"+tdata[8]+"</div><br>";
                    }
                    if (tdata[9] != "" ){
                        // email1
                        html += "<div >"+tdata[9]+"</div><br>";
                    }
                    if (tdata[10] != "" ){
                        // email2
                        html += "<div >"+tdata[10]+"</div><br>";
                    }
                    if (tdata[11] != "" ){
                        // tel1
                        html += "<div >"+tdata[11]+"</div><br>";
                    }
                     if (tdata[12] != "" ){
                         // tel2
                         html += "<div >"+tdata[12]+"</div><br>";
                     }
                     if (tdata[13] != "" ){
                         // ansprechpartner
                         html += "<a href='#' target='_blank'>"+tdata[13]+"</a><br>";
                     }


                     if (tdata[17] != "" ){
                         // www1
                         html += "<a href='"+tdata[17]+"' target='_blank'>"+tdata[17]+"</a><br>";
                     }
                     if (tdata[18] != "" ){
                         // www2
                         html += "<a href='"+tdata[18]+"' target='_blank'>"+tdata[18]+"</a><br>";
                     }


                     if (tdata[19] != "" ){
                         // youtube
                         html += "<a href='"+tdata[19]+"' target='_blank'>Youtube</a> <br>";
                     }
                     if (tdata[20] != "" ){
                         //facebook
                         html += "<a href='"+tdata[20]+"' target='_blank'>Facebook</a> <br>";
                     }
                     if (tdata[21] != "" ){
                         // twitter
                         html += "<a href='"+tdata[21]+"' target='_blank'>Twitter</a> <br>";
                     }
                     if (tdata[22] != "" ){
                         // google
                         html += "<a href='"+tdata[22]+"' target='_blank'>Google</a> <br>";

                     }

                      html += " <hr><h3>die Menschen</h3><label class='btn-xs btn-warning' onclick='loadMordalform_toTO(\"human\","+tdata[0]+")'  data-toggle='modal' data-target='#myModal_toTO'>Menschen hinzufügen</label>";
                      html += " <hr><h3>die Projekte</h3><label class='btn-xs btn-warning' onclick='loadMordalform_toTO(\"proj\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_toTO'>Projekt hinzufügen</label>";


                     html += " <br> <br> <br></div>";

                      $("#tab-orga"+id+" .panel-body").append(html);


                                    
                }
            }
        }
    });
    
}


function load_only_proj(id){
     if ( $("#tab-proj"+id+" .panel-body").html() != "" ) { return null; } 
       $.ajax({
            url: "php.php",
            type: "POST",
            data:    {typ: "load_only_proj", id:id},   
            success: function(data) {
                console.log("load_only_proj data => " + data);
                if (data != "ERROR") {
                    console.log("load_only_proj data  E  => " + data);

                     var html, 
                        tarr = data.split('#|#'), tdata,                            
                        l = tarr.length, i=0;

                     for (i;i<l;i++){

                         tdata = tarr[i].split('#$#');
                            //  0`id`, `name`, `descs`, `plz`, `ort`, 5`str_nr`, `adresse2`, `bundesland`, 8`land`, 
                            // 9`ansprech`, `email1`, `email2`, `tel1`, 13`tel2`, `zusatz`, `img`, `www1`, 17`www2`, 
                         // 18`dates`, `facebook`, `twitter`, `youtube`, 22`google`

                         html  = "<div class='col-sm-4'><img src='images/proje/"+tdata[15]+"' height='250'>";

                         html  += "<br><small >Eingetragen am: "+tdata[18]+"</small><br><br>";
                          html  += "<br><br><label class='btn btn-success' onclick='loadMordalform_img(\"proj\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_img' >Bild bearbeiten </label>";
                         html  += "<br><br><label class='btn btn-info' onclick='loadMordalform_formdata(\"proj\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_form' >Daten bearbeiten </label>";
                         html  += "</div>";
                         html += "<div class='col-sm-7'>";



                         // name
                         html += "<h2>"+tdata[1]+"</h2>";

                         if (tdata[14] != "" ){
                             // zusatz
                             html += "<div >"+urlify(tdata[14])+"</div><br> <hr> <br>";
                         }



                         if (tdata[4] != "" ){
                             // plz + Ort
                             html += "<div >"+tdata[3]+" "+tdata[4]+"</div><br>";
                          }
                         if (tdata[5] != "" ){
                             // strasse_nr
                             html += "<div >"+tdata[5]+"</div><br>";
                         }
                         if (tdata[6] != "" ){
                             // adresse2
                             html += "<div >"+tdata[6]+"</div><br>";
                         }
                         if (tdata[7] != "" ){
                             // bundesland
                             html += "<div >"+tdata[7]+"</div><br>";
                         }
                         if (tdata[8] != "" ){
                             // land
                             html += "<div >"+tdata[8]+"</div><br>";
                         }
                         if (tdata[9] != "" ){
                             // email1
                             html += "<div >"+tdata[9]+"</div><br>";
                         }
                         if (tdata[10] != "" ){
                             // email2
                             html += "<div >"+tdata[10]+"</div><br>";
                         }
                         if (tdata[11] != "" ){
                             // tel1
                             html += "<div >"+tdata[11]+"</div><br>";
                         }
                         if (tdata[12] != "" ){
                             // tel2
                             html += "<div >"+tdata[12]+"</div><br>";
                         }
                         if (tdata[13] != "" ){
                             // ansprechpartner
                             html += "<a href='#' target='_blank'>"+tdata[13]+"</a><br>";
                         }


                         if (tdata[17] != "" ){
                             // www1
                             html += "<a href='"+tdata[17]+"' target='_blank'>"+tdata[17]+"</a><br>";
                         }
                         if (tdata[18] != "" ){
                             // www2
                             html += "<a href='"+tdata[18]+"' target='_blank'>"+tdata[18]+"</a><br>";
                         }


                         if (tdata[19] != "" ){
                             // youtube
                             html += "<a href='"+tdata[19]+"' target='_blank'>Youtube</a> <br>";
                         }
                         if (tdata[20] != "" ){
                             //facebook
                             html += "<a href='"+tdata[20]+"' target='_blank'>Facebook</a> <br>";
                         }
                         if (tdata[21] != "" ){
                             // twitter
                             html += "<a href='"+tdata[21]+"' target='_blank'>Twitter</a> <br>";
                         }
                         if (tdata[22] != "" ){
                             // google
                             html += "<a href='"+tdata[22]+"' target='_blank'>Google</a> <br>";

                         }

                          html += "<hr><h3>die Menschen</h3><label class='btn-xs btn-warning' onclick='loadMordalform_toTO(\"human\","+tdata[0]+")' data-toggle='modal' data-target='#myModal_toTO'>Menschen hinzufügen</label>";
                          html += "<hr><h3>in Organisationen </h3><label class='btn-xs btn-warning' onclick='loadMordalform_toTO(\"orga\","+tdata[0]+")'  data-toggle='modal' data-target='#myModal_toTO'>Organistation hinzufügen</label>";


                         html += " <br> <br> <br></div>";

                          $("#tab-proj"+id+" .panel-body").append(html);
 

                                
                     }
                }
            }
       });
    
}








function loadMordalform_img(typ, id){
    console.log("loadMordalform_human typ => " + typ + " ; id => " +id);
    $("#myModal_img .modal-body").load("imgbox.html", function(){
        init_Cropper();
    });
}


function loadMordalform_formdata(typ, id){
    console.log("loadMordalform_formdata  typ => " + typ + " ; id => " +id);
    
    if ( typ == "human") {
        $("#myModal_form .modal-body").html($("#tab-1").html(function(){
             $("#imgbox_human").load("imgbox.html" , function(){
                   init_Cropper();
                     init_bootstrapDualList();
                    // >>>>>>>> LOAD Organisationen in dualbox
                // >>>>>>>> LOAD Projekte in dualbox
                });
            
        }));
    }
    
     if ( typ == "orga") {
         
                console.log( "typ => " + typ );
          
         var html2 = $("#tab-2").html();
           $("#myModal_form .modal-body").html(html2);
         
         $("#myModal_form .modal-body").html(function(){
             
             
             
             $("#myModal_form .modal-body").find("#imgbox_orga").load("imgbox.html" , function(){
                 init_Cropper();
             }); // load 1
             
             
             
              var   html ='<lable>Menschen zu Organisation</lable><select id="humanTOorga" class="form-control dual_select" multiple ></select>';
                    html +='<br><br><lable>Projkete zu Organistation</lable><select id="projTOorga" class="form-control dual_select" multiple ></select>';
                       
             
             
              $("#myModal_form .modal-body").find("#duallistbox_orga").html(html);
              $("#myModal_form .modal-body").find("#duallistbox_orga").html( function(){
                    // >>>>>>>> LOAD MENSCHEN in dualbox
                    $.ajax({
                        url: "php.php",
                        type: "POST",
                        data:    {typ: "load_human_duallist"},   
                        success: function(data) {
                            console.log( data );
                            if (data != "ERROR") {
                                console.log("load_human_duallist data => " + data);
                             
                                $("#humanTOorga").html("");
                                var html, 
                                    tarr = data.split('#|#'), tdata,                            
                                    l = tarr.length, i=0;
                              
                                 for (i;i<l;i++){

                                     tdata = tarr[i].split('#$#');
                                     // `id`,`vorname`,`nachname`,`ort`

                                     html='<option value="'+tdata[0]+'">'+tdata[1]+' '+tdata[2]+', '+tdata[3]+'</option>';

                                     $("#humanTOorga").append(html);
                                 }
                             
                                
                            }
                               
                        }, // success
                        complete: function(){
                        
                           // >>>>>>>> LOAD Projekte in dualbox
                
                                $.ajax({
                                    url: "php.php",
                                    type: "POST",
                                    data:    {typ: "load_proj_duallist"},   
                                    success: function(data) {

                                         if (data != "ERROR") {
                                             console.log("load_proj_duallist data => " + data);

                                           $("#projTOorga").html("");
                                              var html, 
                                                  tarr = data.split('#|#'), tdata,                            
                                                  l = tarr.length, i=0;

                                             for (i;i<l;i++){

                                                 tdata = tarr[i].split('#$#');
                                                 // `id`,`vorname`,`nachname`,`ort`

                                                 html='<option value="'+tdata[0]+'">'+tdata[1]+', '+tdata[2]+'</option>';

                                                 $("#projTOorga").append(html);
                                             }


                                         }
                                         
                                    }, // success
                                    complete: function(){ // suc
                                        init_bootstrapDualList();
                                    }   // complete 2  
                                    
                        
                                }); // ajax load_proj_duallist
                 
                       
                        } // complete 1
                    }); // ajax 1  
              
              });
              }); // html function
         }
                                             
    if ( typ == "proj") {
        var html = $("#tab-3").html();
        $("#myModal_form .modal-body").html(html);
        $("#myModal_form .modal-body").html(function(){
            
            $("#myModal_form .modal-body").find("#imgbox_proj").load("imgbox.html" , function(){
                   init_Cropper();
                });
              // >>>>>>>> LOAD MENSCHEN in dualbox
                $("#myModal_form .modal-body").find("#duallistbox_proj").load("dualbox_proj.html" , function(){
                
                 $.ajax({
                     url: "php.php",
                     type: "POST",
                     data:    {typ: "load_human_duallist"},   
                     success: function(data) {
                         console.log( data );
                         if (data != "ERROR") {
                             console.log("load_human_duallist data => " + data);
                             
                           $("#humanTOproj").html("");
                              var html, 
                                  tarr = data.split('#|#'), tdata,                            
                                  l = tarr.length, i=0;
                              
                             for (i;i<l;i++){
                                 
                                 tdata = tarr[i].split('#$#');
                                 // `id`,`vorname`,`nachname`,`ort`
                                 
                                 html='<option value="'+tdata[0]+'">'+tdata[1]+' '+tdata[2]+', '+tdata[3]+'</option>';
                                 
                                 $("#humanTOproj").append(html);
                             }
                             
                             
                         }
                     } // success
                 }); // ajax
                
               
                
                // >>>>>>>> LOAD Organisationen in dualbox
                
                  $.ajax({
                     url: "php.php",
                     type: "POST",
                     data:    {typ: "load_orgas_duallist"},   
                     success: function(data) {
                         
                         if (data != "ERROR") {
                             console.log("load_orgas_duallist data => " + data);
                             
                           $("#orgaTOproj").html("");
                              var html, 
                                  tarr = data.split('#|#'), tdata,                            
                                  l = tarr.length, i=0;
                              
                             for (i;i<l;i++){
                                 
                                 tdata = tarr[i].split('#$#');
                                 // `id`,`vorname`,`nachname`,`ort`
                                 
                                 html='<option value="'+tdata[0]+'">'+tdata[1]+', '+tdata[2]+'</option>';
                                 
                                 $("#orgaTOproj").append(html);
                             }
                             
                              
                         }
                          init_bootstrapDualList();
                     } , // success
                                    complete: function(){ // suc
                                        init_bootstrapDualList();
                                    }   // complete 2  
                 }); // ajax
                
                  }); // load 
              
            
        });
    }
        
        
        
    }

     



function loadMordalform_toTO(typ,id){
    console.log("loadMordalform_toTO  typ => " + typ + " ; id => " +id);
    
    var html = '<select id="dualList" class="form-control dual_select" multiple ></select>',
        title;
    if ( typ == "human") { title = "Menschen hinzufügen"}
    else if ( typ == "orga" ) { title = "Organisation hinzufügen"}
    else  { title = "Projekt hinzufügen"}
    $("#myModal_toTO .modal-title").html(title);
    $("#myModal_toTO .modal-body").html(html);
    
    
    init_bootstrapDualList();
    
}


$(document).ready(function($) { 
         
            
    // START MENSCHEN laden 
                 
          
    
            
    $(document).on("click", "#login_btn", function(){
                
                   
        var nam = $("#l_name").val();
        var pwd = $("#l_pwd").val();
                
        alert(nam + " - " + pwd);
                    
        if (nam == "alexIP" && pwd == "6438u4893j"){
            LOGIN = true;
            $("#login_box").addClass("hidden");
            $("#suche").removeClass("hidden");
        }
    });  //login HTMLButtonElement
            
             
            
                
  /*  $(document).on("click",".tab_new", function(){
        
         
                   
                    
        switch($(this).attr("id")){
                            
                
            case "tab_newHuman":
                $("#imgbox_human").load("imgbox.html" , function(){
                   init_Cropper();
                    init_bootstrapDualList();
                    // >>>>>>>> LOAD Organisationen in dualbox
                // >>>>>>>> LOAD Projekte in dualbox
                });
                break;
                
                
            case "tab_newOrga":
                
                $("#duallistbox_orga").load("dualbox_orga.html" , function(){
                    // >>>>>>>> LOAD MENSCHEN in dualbox
                    $.ajax({
                        url: "php.php",
                        type: "POST",
                        data:    {typ: "load_human_duallist"},   
                        success: function(data) {
                            console.log( data );
                            if (data != "ERROR") {
                                console.log("load_human_duallist data => " + data);
                             
                                $("#humanTOorga").html("");
                                var html, 
                                    tarr = data.split('#|#'), tdata,                            
                                    l = tarr.length, i=0;
                              
                                 for (i;i<l;i++){

                                     tdata = tarr[i].split('#$#');
                                     // `id`,`vorname`,`nachname`,`ort`

                                     html='<option value="'+tdata[0]+'">'+tdata[1]+' '+tdata[2]+', '+tdata[3]+'</option>';

                                     $("#humanTOorga").append(html);
                                 }
                             
                                
                                
                                
                                // >>>>>>>> LOAD Projekte in dualbox
                
                                $.ajax({
                                    url: "php.php",
                                    type: "POST",
                                    data:    {typ: "load_proj_duallist"},   
                                    success: function(data) {

                                         if (data != "ERROR") {
                                             console.log("load_proj_duallist data => " + data);

                                           $("#projTOorga").html("");
                                              var html, 
                                                  tarr = data.split('#|#'), tdata,                            
                                                  l = tarr.length, i=0;

                                             for (i;i<l;i++){

                                                 tdata = tarr[i].split('#$#');
                                                 // `id`,`vorname`,`nachname`,`ort`

                                                 html='<option value="'+tdata[0]+'">'+tdata[1]+', '+tdata[2]+'</option>';

                                                 $("#projTOorga").append(html);
                                             }


                                         }
                                        init_bootstrapDualList();
                                    } // success
                                }); // ajax2

                                
                             
                            }
                        } // success
                    }); // ajax1
                
               
                
                    
                       
                }); // load 2
                    
                    $("#imgbox_orga").load("imgbox.html" , function(){
                        init_Cropper();
                    }); // load 1
                
                break;
                
            case "tab_newProg":
                $("#imgbox_proj").load("imgbox.html" , function(){
                   init_Cropper();
                });

                // >>>>>>>> LOAD MENSCHEN in dualbox
                $("#duallistbox_proj").load("dualbox_proj.html" , function(){
                
                 $.ajax({
                     url: "php.php",
                     type: "POST",
                     data:    {typ: "load_human_duallist"},   
                     success: function(data) {
                         console.log( data );
                         if (data != "ERROR") {
                             console.log("load_human_duallist data => " + data);
                             
                           $("#humanTOproj").html("");
                              var html, 
                                  tarr = data.split('#|#'), tdata,                            
                                  l = tarr.length, i=0;
                              
                             for (i;i<l;i++){
                                 
                                 tdata = tarr[i].split('#$#');
                                 // `id`,`vorname`,`nachname`,`ort`
                                 
                                 html='<option value="'+tdata[0]+'">'+tdata[1]+' '+tdata[2]+', '+tdata[3]+'</option>';
                                 
                                 $("#humanTOproj").append(html);
                             }
                             
                             
                         }
                     } // success
                 }); // ajax
                
               
                
                // >>>>>>>> LOAD Organisationen in dualbox
                
                  $.ajax({
                     url: "php.php",
                     type: "POST",
                     data:    {typ: "load_orgas_duallist"},   
                     success: function(data) {
                         
                         if (data != "ERROR") {
                             console.log("load_orgas_duallist data => " + data);
                             
                           $("#orgaTOproj").html("");
                              var html, 
                                  tarr = data.split('#|#'), tdata,                            
                                  l = tarr.length, i=0;
                              
                             for (i;i<l;i++){
                                 
                                 tdata = tarr[i].split('#$#');
                                 // `id`,`vorname`,`nachname`,`ort`
                                 
                                 html='<option value="'+tdata[0]+'">'+tdata[1]+', '+tdata[2]+'</option>';
                                 
                                 $("#orgaTOproj").append(html);
                             }
                             
                              
                         }
                          init_bootstrapDualList();
                     } // success
                 }); // ajax
                
                  }); // load 
                            
                break;
                            
                                 } // switch 
                            
                      
                 
                     
    }); */
                
                
                
            
    $(document).on("click","#save_new_human", function(){
                   
        var serial = $("#new_human").serialize(),
            $image = $(".image-crop > img");
        console.log("serial =>" + serial );
        var img = $image.cropper("getDataURL");
                     
        $.ajax({
            url: "php.php",
            type: "POST",
            data:    serial + "&typ=save_new_human&img="+img,   
            success: function(data) {
                console.log( data );
                if (data != "ERROR") {
                    $("#new_human").trigger('reset');
                    $(".modal-header > .close").click();
                    $("#tab_ov_human").click();
                }
            }
        });
                     
    });
    
 
               
    
    
                
    $(document).on("click","#save_new_orga", function(){
                   
        var serial = $("form#new_orga").serialize(),
            $image = $(".image-crop > img");
                    
                    
        // menschen in orga zum array
        var humanTOorga = [];
        $( "#humanTOorga option:selected" ).each(function() {
            humanTOorga.push( $( this ).val() + " " );
        });
                    
        // projekte  in orga zum array
        var projTOorga = [];
        $( "#projTOorga option:selected" ).each(function() {
            projTOorga.push( $( this ).val() + " " );
        });
                    
                    
        console.log("serial =>" + serial );
        console.log("humanTOorga =>" + humanTOorga );
        console.log("projTOorga =>" + projTOorga );
        console.log("data =>" +  serial + "&typ=save_new_orga&img="+img+"&humanTOorga="+humanTOorga+"&projTOorga="+projTOorga  );
                    
                    
        var img = $image.cropper("getDataURL");
        
      
        
        /* name=kjkljj&orgatyp=ljlj&plz=lj&ort=ljl&str_nr=jkl&adresse2=jkl&bundesland=jkl&land=jkl&e-mail1=jlk&e-mail2=jlk&tel1=jlk&tel2=jl&ansprech=jkjjkklj&menschen=Austria&menschen=Bahamas&menschen=Barbados&menschen=Belgium&menschen=Cameroon&projekte=Austria&projekte=Bahamas&projekte=Barbados&projekte=Bermuda&projekte=Bulgaria */
        $.ajax({
            url: "php.php",
            type: "POST",
            data:    serial + "&typ=save_new_orga&img="+img+"&humanTOorga="+humanTOorga+"&projTOorga="+projTOorga ,   
            success: function( data ) {
                console.log( data );
                 if (data != "ERROR") {
                    $("#new_orga").trigger('reset');
                     // $(".modal-header > .close").click();
                     // $("#tab_ov_orga").click();
                }
            }
        });
                     
    });
                
                

            
    $(document).on("click","#save_new_proj", function(){
                   
        var serial = $("#new_proj").serialize(),
            $image = $(".image-crop > img");
                    
                    
        // menschen in orga zum array
        var humanTOproj = [];
        $( "#humanTOproj option:selected" ).each(function() {
            humanTOproj.push( $( this ).val() + " " );
        });
                    
        // projekte  in orga zum array
        var orgaTOproj = [];
        $( "#orgaTOproj option:selected" ).each(function() {
            orgaTOproj.push( $( this ).val() + " " );
        });
                    
                    
        console.log("serial =>" + serial );
        console.log("humanTOproj =>" + humanTOproj );
        console.log("orgaTOproj =>" + orgaTOproj );
                    
                    
        var img = $image.cropper("getDataURL");
        /* name=kjkljj&orgatyp=ljlj&plz=lj&ort=ljl&str_nr=jkl&adresse2=jkl&bundesland=jkl&land=jkl&e-mail1=jlk&e-mail2=jlk&tel1=jlk&tel2=jl&ansprech=jkjjkklj&menschen=Austria&menschen=Bahamas&menschen=Barbados&menschen=Belgium&menschen=Cameroon&projekte=Austria&projekte=Bahamas&projekte=Barbados&projekte=Bermuda&projekte=Bulgaria */
        $.ajax({
            url: "php.php",
            type: "POST",
            data:    serial + "&typ=save_new_proj&img="+img+"&humanTOproj="+humanTOproj+"&orgaTOproj="+orgaTOproj ,   
            success: function( data ) {
                console.log( data ); 
                $("#new_proj").trigger('reset');
                $(".modal-header > .close").click();
                $("#tab_ov_proj").click();
            }
        });
                     
    }); 

                
                

                
                
    /*
                 
                 ÜBERSICHT 
                     
                     Menschen, Oragnnisationen, Projekte
                
                
                */
                 
    $(document).on("click",".tab_ov", function(){
                     console.log($(this).attr("id"));
                      
 
        
                      switch($(this).attr("id")){
                             
                          case"tab_ov_human":
                              $.ajax({
                                  url: "php.php",
                                  type: "POST",
                                  data: {
                                      typ: "load_menschen"
                                  },
                                  success: function(data) {
                                      
                                      console.log(data);
                                      
                                      var html, 
                                          tarr = data.split('#|#'), tdata,                            
                                          l = tarr.length, i=0;
                                      
                                      $(".dataTables-example-human").DataTable().destroy();
                                       $("#content_list_menschen").html("");
                                      
                                      
                                      for (i;i<l;i++) {
                                          /*`id`, `titel`, `gender`, 3`vorname`, `nachname`, `ort`, `plz`, 7`strasse_nr`, 
                                          `adresse2`, `bundesland`, 10`land`, `e-mail1`, `e-mail2`, 13`tel1`, `tel2`, 
                                          `www1`, 16`www2`, `dates`, `zusatz`, `youtube`, 20`facebook`, `google`, 
                                          `twitter`, 23`img`
                                          
                                          <th>Bild</th>
                                          <th>Name</th>
                                          <th>Info</th>
                                          <th>Plz + Ort</th>
                                          <th>Social Network</th>*/
                                          
                                          
                                
                                          tdata = tarr[i].split('#$#');
                                     
                                                html =' <tr class="gradeX">';
                                                html +='<td class="center" onclick="load_uebersicht(\'human\','+tdata[0]+', \''+tdata[3]+' '+tdata[4]+'\')"><img src="images/menschen/'+tdata[23]+'" height="150px"></td>';
                                                html +='<td>'+tdata[3]+' <b>'+tdata[4]+'</b></td>';
                                                html +='<td>'+tdata[18]+'</td>';
                                                html +='<td>'+tdata[6]+' '+tdata[5]+'</td>';
                                                html +='<td class="center"> ';
                                                html +='<a href="'+tdata[20]+'" target="_blank"><label class="btn">Facebook</label></a>';
                                                html +='</td>'; 
                                                html +='<td>';
                                                html +='<span  class="fa fa-edit pointer hover" title="Bearbeiten">   </span> &nbsp;  &nbsp;  &nbsp;  ';
                                                html +='<span   class="fa fa-trash-alt pointer hover"  onclick="deleteHuman('+tdata[0]+')" title="löschen">  </span>';
                                                html +='</td>';
                                                html +='</tr>';
                                
                                          $("#content_list_menschen").append(html);
                                
                                      }
                            
                                     // init_dataTables();
                                      
                                       // datatable init
                                      $(".dataTables-example-human").DataTable({
                                          "oLanguage": {
                                              "sSearch" : "suche",
                                              "sLengthMenu" : "zeige _MENU_ Einträge",
                                              oPaginate : {
                                                  "sNext" : "weiter", 
                                                  "sPrevious" : "zurück" 
                                              }
                                          },      
                                          "pageLength": 10,
                                          "responsive": true,           
                                          "bSortClasses": false,
                                          "bLengthChange": true,
                                          "bInfo": false,
                                          "bAutoWidth": true,
                                          "bProcessing": true
                                      });
                                      
                             
                                  }
                              });
                              break;
                              
                          case"tab_ov_orga":
                              
                                $.ajax({
                                  url: "php.php",
                                  type: "POST",
                                  data: {
                                      typ: "load_orga"
                                  },
                                  success: function(data) {
                                      console.log(data);
                                      
                                      
                                      $(".dataTables-example-orga").DataTable().destroy();
                                       $("#content_list_orgas").html("");
                                        var html, 
                                          tarr = data.split('#|#'), tdata,                            
                                          l = tarr.length, i=0;
                            
                                      for (i;i<l;i++) {
                                          /*`    `id`, 1`name`, `orgatyp`, `plz`, 4`ort`, `str_nr`, `adresse2`, `bundesland`, 
                                          8`land`, `email1`, `email2`, `tel1`, 12`tel2`, `ansprech`, `zusatz`, `img`, 16`dates
                                          , `www1`, `www2`, 19`facebook`, `twitter`, `youtube`, 22`google`
                                          */
                                          
                                        
                                          
                                          
                                          tdata = tarr[i].split('#$#');
                                     
                                          
                                          
                                          console.log("0=> "+tdata[0]);
                                          console.log("1=> "+tdata[1]);
                                          console.log("2=> "+tdata[2]);
                                          console.log("3=> "+tdata[3]);
                                          console.log("4=> "+tdata[4]);
                                          console.log("5=> "+tdata[5]);
                                          console.log("6=> "+tdata[6]);
                                          console.log("7=> "+tdata[7]);
                                          console.log("8=> "+tdata[8]);
                                          console.log("9=> "+tdata[9]);
                                          console.log("10=> "+tdata[10]);
                                          console.log("11=> "+tdata[11]);
                                          console.log("12=> "+tdata[12]);
                                          console.log("13=> "+tdata[13]);
                                          console.log("14=> "+tdata[14]);
                                          console.log("15=> "+tdata[15]);
                                          console.log("16=> "+tdata[16]);
                                          console.log("17=> "+tdata[17]);
                                          console.log("18=> "+tdata[18]);
                                          console.log("19=> "+tdata[19]);
                                          console.log("20=> "+tdata[20]);
                                          console.log("21=> "+tdata[21]);
                                          console.log("22=> "+tdata[22]);
                                          
                                          
                                          html =' <tr class="gradeX">';
                                          html +='  <td class="center"><img  onclick="load_uebersicht(\'orga\','+tdata[0]+', \''+tdata[1]+'\')" src="images/orgas/'+tdata[15]+'" height="150px"></td>';
                                          html +='  <td> ';
                                          html +='   <b>'+tdata[1]+'</b> ';
                                           if (tdata[17] != "") {   html +='<br><a href="'+tdata[17]+'" target="_blank"><label class="btn">'+tdata[17]+'</label></a><br>';  }
                                           if (tdata[18] != "") {   html +='<br><a href="'+tdata[18]+'" target="_blank"><label class="btn">'+tdata[18]+'</label></a><br>';  }

                                          html +='   </td>';
                                          html +='  <td class="center"> ';
                                  
                                          if (tdata[19] != "") {   html +='<a href="'+tdata[19]+'" target="_blank"><label class="btn">Facebook</label></a><br>';  }
                                          if (tdata[20] != "") {   html +='<a href="'+tdata[20]+'" target="_blank"><label class="btn">Twitter</label></a><br>';  }
                                          if (tdata[21] != "") {   html +='<a href="'+tdata[21]+'" target="_blank"><label class="btn">Youtube</label></a><br>';  }
                                          if (tdata[22] != "") {   html +='<a href="'+tdata[22]+'" target="_blank"><label class="btn">Google+</label></a><br>';  }
                                        
                                          html +='  </td>';
                                          html +='      <td>';
                                          if (tdata[5]) html +='  <div>'+tdata[5]+'</div>';
                                          html +='      <div>'+tdata[3]+' '+tdata[4]+'</div>';
                                          html +='       </td>';
                                          html +='  <td>'+tdata[14]+'</td>';
                                            html +='<td>';
                                                html +='<span  class="fa fa-edit pointer hover" title="Bearbeiten">   </span> &nbsp;  &nbsp;  &nbsp;  ';
                                                html +='<span   class="fa fa-trash-alt pointer hover"  onclick="deleteOrga('+tdata[0]+')" title="löschen">  </span>';
                                                html +='</td>';
                                          html +='</tr>';
                                
                                          $("#content_list_orgas").append(html);
                                
                                      }
                                      // init_dataTables();
                                      
                                      // datatable init
                                      $(".dataTables-example-orga").DataTable({
                                          "oLanguage": {
                                              "sSearch" : "suche",
                                              "sLengthMenu" : "zeige _MENU_ Einträge",
                                              oPaginate : {
                                                  "sNext" : "weiter", 
                                                  "sPrevious" : "zurück" 
                                              }
                                          },      
                                          "pageLength": 10,
                                          "responsive": true,           
                                          "bSortClasses": false,
                                          "bLengthChange": true,
                                          "bInfo": false,
                                          "bAutoWidth": true,
                                          "bProcessing": true
                                      });
                                      
                                      
                                  }
                                });
                              
                              break;
                              
                          case"tab_ov_proj":
                              
                                $.ajax({
                                  url: "php.php",
                                  type: "POST",
                                  data: {
                                      typ: "load_proj"
                                  },
                                  success: function(data) {
                                      console.log(data);
                                      
                                       $(".dataTables-example-proj").DataTable().destroy();
                                      $("#content_list_projects").html("");
                                     
                                        var html, 
                                          tarr = data.split('#|#'), tdata,                            
                                          l = tarr.length, i=0;
                            
                                      for (i;i<l;i++) {
                                          /*`   `id`, `name`, `descs`, `plz`, 4`ort`, `str_nr`, `adresse2`, `bundesland`, 8`land`, 
                                          `ansprech`, `email1`, `email2`, 12`tel1`, `tel2`, `zusatz`, 15`img`, `www1`, `www2`, 18`dates`, 
                                          `facebook`, 20`twitter`, `youtube`, 22`google` 
                                          <th>Bild</th>
                                          <th>Name</th>
                                          <th>Info</th>
                                          <th>Plz + Ort</th>
                                          <th>Social Network</th>*/
                                
                                          tdata = tarr[i].split('#$#');
                                     
                                            html =' <tr class="gradeX">';
                                            html +='<td class="center"><img onclick="load_uebersicht(\'proj\','+tdata[0]+', \''+tdata[1]+'\')" src="images/proje/'+tdata[15]+'" height="150px"></td>';
                                            html +='<td><b>'+tdata[1]+'</b></td>';
                                            html +='<td>'+tdata[2]+'</td>';
                                            html +='<td>'+tdata[3]+' '+tdata[4]+'</td>';
                                            html +='<td class="center"> ';
                                            html +='<a href="'+tdata[19]+'" target="_blank"><label class="btn">Facebook</label></a>';
                                            html +='</td>';
                                            html +='<td>';
                                                html +='<span  class="fa fa-edit pointer hover" title="Bearbeiten">   </span> &nbsp;  &nbsp;  &nbsp;  ';
                                                html +='<span   class="fa fa-trash-alt pointer hover"  onclick="deleteProj('+tdata[0]+')" title="löschen">  </span>';
                                                html +='</td>';
                                            html +='</tr>';
                                
                                          $("#content_list_projects").append(html);
                                
                                      }
                                      // init_dataTables();
                                      
                                      // datatable init
                                      $(".dataTables-example-proj").DataTable({
                                          "oLanguage": {
                                              "sSearch" : "suche",
                                              "sLengthMenu" : "zeige _MENU_ Einträge",
                                              oPaginate : {
                                                  "sNext" : "weiter", 
                                                  "sPrevious" : "zurück" 
                                              }
                                          },      
                                          "pageLength": 10,
                                          "responsive": true,           
                                          "bSortClasses": false,
                                          "bLengthChange": true,
                                          "bInfo": false,
                                          "bAutoWidth": true,
                                          "bProcessing": true
                                      });
                                  }
                                });
                              
                              
                              break;
                              
                                        
                                               } // switch ende 
                       
                  });
                
               
                
                
       
                
            }); // document readey


          
        function deleteHuman(idi){
           console.log("deleteHuman  id => " + idi  );  
            
            swal({
              title: 'Wirklich löschen?',
              text: "Du löschst den Menschen aus der Datenbank und alle Verknüpfungen dazu!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ja, löschen!'
            }).then((result) => {
              if (result.value) {
                  
                         $.ajax({
            url: "php.php",
            type: "POST",
            data:   {typ:"deleteHuman", id:idi},   
            success: function(data) {
                console.log( "deleteHuman =>" + data );
                
                if ( data != "ERROR"){
                    $("#tab_ov_human").click();
                      swal(
                  'gelöscht!',
                  'Der Mensch und alle Verknüpfungen sind aus der Datenbank gelöscht',
                  'success'
                )
                    
                }
               
            }
        });
                  
                  
              
              }
            })
            
            
         
               
           }


      function deleteOrga(idi){
           console.log("deleteOrga  id => " + idi  );  
            
            swal({
              title: 'Wirklich löschen?',
              text: "Du löschst eine Organisation aus der Datenbank und alle Verknüpfungen dazu!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ja, löschen!'
            }).then((result) => {
              if (result.value) {
                  
                         $.ajax({
            url: "php.php",
            type: "POST",
            data:   {typ:"deleteOrga", id:idi},   
            success: function(data) {
                console.log( "deleteHOrga =>" + data );
                
                if ( data != "ERROR"){
                    $("#tab_ov_orga").click();
                      swal(
                  'gelöscht!',
                  'Die Organisation und alle Verknüpfungen sind aus der Datenbank gelöscht',
                  'success'
                )
                    
                }
               
            }
        });
                  
                  
              
              }
            })
            
            
         
               
           }





      function deleteProj(idi){
           console.log("deleteProj  id => " + idi  );  
            
            swal({
              title: 'Wirklich löschen?',
              text: "Du löschst ein Projekt aus der Datenbank und alle Verknüpfungen dazu!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ja, löschen!'
            }).then((result) => {
              if (result.value) {
                  
                         $.ajax({
            url: "php.php",
            type: "POST",
            data:   {typ:"deleteProj", id:idi},   
            success: function(data) {
                console.log( "deleteProj =>" + data );
                
                if ( data != "ERROR"){
                    $("#tab_ov_proj").click();
                      swal(
                  'gelöscht!',
                  'Das Projekt und alle Verknüpfungen sind aus der Datenbank gelöscht',
                  'success'
                )
                    
                }
               
            }
        });
                  
                  
              
              }
            })
            
            
         
               
           }