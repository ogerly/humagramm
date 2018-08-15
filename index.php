<?php 

      session_start();
$LOGIN = false;  

    error_reporting(E_ALL);
    error_reporting(-1);
    ini_set('error_reporting', E_ALL);
  
    header("Access-Control-Allow-Headers: x-requested-with");

    if (isset($_SESSION['login'])){ 
       
         $LOGIN = true;          
       
    } else {
    	
        $LOGIN = false;
        $NAME = "Gast";        
      
    }

?>


<!doctype html>
<html lang="de">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Humagramm</title>
        <!-- bootstrap-css -->
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
        <!-- bootstrap-css -->
        <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all" />
        
       
        <link href="plugins/dataTables/datatables.min.css" rel="stylesheet">
         <link href="plugins/dualListbox/bootstrap-duallistbox.min.css" rel="stylesheet">
        <link href="plugins/cropper/cropper.min.css" rel="stylesheet">


          
        <style>
            .header { background-color: cadetblue; height: 60px}
            #content_form { background-color: rosybrown; padding: 10px 5px 10px 5px}
            .img-preview-sm {
                height: 300px;
                width: 200px;
            }
            .img-container, .img-preview {
                overflow: hidden;
                text-align: center;
                width: 300px;
            }
            
            .cropper-container {
                position: relative;
                overflow: hidden;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
            }
            .pointer{cursor: pointer;}
        </style>
        <script>
            // GLOVAL VARIABLE
            LOGIN = false;
        </script>
    </head>
    <body>
        
        
         <div id="header" class="col-md-12 header"><h2>@Humagramm</h2></div>
        

        
            <?php  if ( $LOGIN )  { include "start_login.html"; } else {  include "login.php";  }  ?>   
        
        
            <!-- Trigger the modal with a button
            <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button> -->

        
        
           <!-- Modal Formular -->
            <div id="myModal_form" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Formular</h4>
                  </div>
                  <div class="modal-body">
                    <p id="form_desc">Menschen Daten bearbeiten.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">schließen</button>
                  </div>
                </div>

              </div>
            </div>
        
        
        
           <!-- Modal Bild -->
            <div id="myModal_img" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Bild</h4>
                  </div>
                  <div class="modal-body">
                    <p id="form_desc">Lade ein neues Bild.</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">schließen</button>
                  </div>
                </div>

              </div>
            </div>
        
        
        
           <!-- Modal toTO -->
            <div id="myModal_toTO" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Menschen</h4>
                  </div>
                  <div class="modal-body">
                     
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">schließen</button>
                  </div>
                </div>

              </div>
            </div>
        
        
         
        
   
    </body>
    
     <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/bootstrap.js"></script>
        
         <!-- Dual Listbox -->
        <script src="plugins/dualListbox/jquery.bootstrap-duallistbox.js"></script>
        <script src="plugins/dataTables/datatables.min.js"></script>
        
         <!-- Image cropper -->
        <script src="plugins/cropper/cropper.min.js"></script>
        <script src="js.js"></script>

             
        <script>
            $(document).ready(function($) { 
         
            
                // START MENSCHEN laden 
             
                
                
            }); // document readey
            
           
        </script>
    
</html>