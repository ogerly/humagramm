<?PHP 
/*
    define('HOST',"localhost");
	define('USER',"root");
	define('PASSWORD',"x");
	define('DB',"humagramm");

    define('DTR',"#|#"); // Datensatztrenner  
    define('FTR',"#$#"); // Feldtrenner  

    define('SUCCESS','OK');
    define('ERROR','ERROR');
 
 */

require_once('setup/setup.php');

        
    /*
       Function: sql_db

       Die Schnittstelle zum SQL

       Parameters:
          string - die vollständige sql anfrage

       Returns:
          string mit den zentralen FTR und DTR  

    */


    function sql_db($query, $typ){
	 
	$db = @new mysqli(HOST, USER, PASSWORD, DB); 
	 
	 
   if (mysqli_connect_errno()) { 
       die ('Konnte keine Verbindung zur Datenbank aufbauen: '.mysqli_connect_error().'('.mysqli_connect_errno().')'); 
   } 
    mysqli_set_charset($db, 'utf8');
   $result = mysqli_query($db ,$query); 

   
   
    
    // print_r( $result );  
     if($result === true) {
     	
	     	if ($typ == "INSERT" || $typ == "DELETE" ) {
			    $theID =  $db->insert_id;  // last INSERT ID  zurück geben  
			    return $theID;
             
			}
			 if(  $typ == "UPDATE"  ) {
				$theID =  $db->insert_id;  // last INSERT ID  zurück geben 
			    return $theID;
			    
			}else {
			   return SUCCESS ;
			}
		
     	  
     }
	  if(!$result) return ERROR;
	   
   

	
	$db->close();
	
	$str = "";
	if($typ == "SELECT") {
		$col_count =  mysqli_num_fields ($result);
	   
	     
		while(  ($row_array = mysqli_fetch_row ($result )) != false)
		{
			for ($i = 0; $i < $col_count; $i++){
				//TODO sind die nächsten zwei Zeilen oki? (texte mit zeilenumbrüchen)
				$str = $str .  str_replace("\r",'',$row_array[$i]);
				$str = str_replace("<br>",'',$str);
				if ($col_count - 1  > $i)
				{
					$str = $str . FTR; //Feldtrenner
				}   
			}
			$str = $str . DTR; //Datentrenner
		}
		mysqli_free_result ($result);
		$str = substr($str,0, strlen($str) - strlen(DTR));
	
   }
     
	return $str;
}
 
 

 //Aufruf:
        //echo zufallsstring(6); //G3pgIA
	function zufallsstring($laenge) {
	   //Mögliche Zeichen für den String
	   $zeichen = '0123456789';
	   $zeichen .= 'abcdefghijklmnopqrstuvwxyz';
	   $zeichen .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	 
	   //String wird generiert
	   $str = '';
	   $anz = strlen($zeichen);
	   for ($i=0; $i<$laenge; $i++) {
	      $str .= $zeichen[rand(0,$anz-1)];
	   }
	   return $str;
	}
	 


 




switch($_POST["typ"]) {
        

    case "save_new_human":
         // speichert einen neuen Menschen
        /*
        [titel] => 
    [sex] => 
    [vorname] => 
    [nachname] =>
    [plz] => 
    [ort] => 
    [strasse] => 
    [adress1] => 
    [email1] => 
    [email2] => 
    [tel1] => 
    [tel2] => 
    [www1] => 
    [www2] => 
    [facebook] => 
    [youtube] => 
    [twitter] => 
    [google] => 
    [zusatz] => 
    [typ] => save_new_human
    [img] => data:image/png;base
        */
        
        $string =  'tmp_'. zufallsstring(35).'.png';

        // requires php5
	define('UPLOAD_DIR', 'images/menschen/');
	$img = $_POST['img'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR .$string;
	$success = file_put_contents($file, $data);
	
        
        $sql = 'INSERT INTO `zz_menschen`(`id`, `titel`, `gender`, `vorname`, `nachname`, `ort`, `plz`, `strasse_nr`, `adresse2`, `bundesland`, `land`, `e-mail1`, `e-mail2`, `tel1`, `tel2`, `www1`, `www2`, `dates`, `zusatz`, `youtube`, `facebook`, `google`, `twitter`, `img`) VALUES ';
        
        $sql .= '(NULL, "'. $_POST["titel"] .'","'. $_POST["sex"] .'","'. $_POST["vorname"] .'","'. $_POST["nachname"] .'","'. $_POST["ort"]        .'","'. $_POST["plz"] .'","'. $_POST["strasse"] .'","'. $_POST["adress1"] .'","'. $_POST["bundesland"] .'","'. $_POST["land"] .'","'. $_POST["e-mail1"] .'","'. $_POST["e-mail2"] .'","'. $_POST["tel1"] .'","'. $_POST["tel2"] .'","'. $_POST["www1"] .'","'. $_POST["www2"] .'", CURRENT_TIMESTAMP, "'. $_POST["zusatz"] .'","'. $_POST["youtube"] .'","'. $_POST["facebook"] .'","'. $_POST["google"] .'","'. $_POST["twitter"] .'","'. $string .'")';
          //   echo  $sql ; 
     
        
        echo sql_db($sql, "INSERT"); 
        
        break;
        
        
        
    case "load_menschen":
         // lädt 100 Menschen
        $sql = 'SELECT * FROM `zz_menschen` ORDER BY dates DESC LIMIT 100 ';
         echo sql_db($sql, "SELECT"); 
        break;
        
    case "load_human_duallist":
         // lädt 100 Menschen
        $sql = 'SELECT `id`,`vorname`,`nachname`,`ort` FROM `zz_menschen`';
         echo sql_db($sql, "SELECT"); 
        break;   
    
     case "load_orgas_duallist":
         // lädt 100 Menschen
        $sql = 'SELECT `id`,`name`,`ort` FROM `zz_orgas`';
         echo sql_db($sql, "SELECT"); 
        break;
        
        
    case "load_proj_duallist":
         // lädt 100 Menschen
        $sql = 'SELECT `id`,`name`,`ort` FROM `zz_projects`';
         echo sql_db($sql, "SELECT"); 
        break;     
        
        
        
     case "load_only_human":
         // lädt 100 Menschen
         $sql = 'SELECT * FROM `zz_menschen` WHERE `id`=  '. $_POST["id"] .'';
         echo sql_db($sql, "SELECT"); 
        break;   
        
      case "load_only_orga":
         // lädt 100 Menschen
          $sql = 'SELECT * FROM `zz_orgas` WHERE `id`=  '. $_POST["id"] .'';
         echo sql_db($sql, "SELECT"); 
        break; 
        
        case "load_only_proj":
         // lädt 100 Menschen
          $sql = 'SELECT * FROM `zz_projects` WHERE `id`=  '. $_POST["id"] .'';
         echo sql_db($sql, "SELECT"); 
        break; 
        
        
    case "save_new_orga":
        
         print_r($_POST);
        
        
         // speichert einen neuen Menschen
            /*
                [name] => 
                [orgatyp] => 
                [plz] => 
                [ort] => 
                [str_nr] => 
                [adresse2] => 
                [bundesland] => 
                [land] => 
                [e-mail1] => 
                [e-mail2] => 
                [tel1] => 
                [tel2] => 
                [ansprech] => 
                [zusatz] => 
                [typ] => save_new_orga
                [img] => data:image/png;base64,
                [humanTOorga] => 3 ,4 ,8 ,9 
                 [projTOorga] => 4 ,5 

            */
    
          
        
        $string =  'tmpO_'. zufallsstring(35).'.png';

        // requires php5
        define('UPLOAD_DIR', 'images/orgas/');
        $img = $_POST['img'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR .$string;
        $success = file_put_contents($file, $data);

        
        
        $sql=' INSERT INTO `zz_orgas`(`id`, `name`, `orgatyp`, `plz`, `ort`, `str_nr`, `adresse2`, `bundesland`, `land`, `email1`, `email2`, `tel1`, `tel2`, `ansprech`, `zusatz`, `img`) VALUES';
        $sql.='( NULL ,"'. $_POST["name"] .'","'. $_POST["orgatyp"] .'","'. $_POST["plz"] .'","'. $_POST["ort"] .'","'. $_POST["str_nr"] .'","'. $_POST["adresse2"] .'","'. $_POST["bundesland"] .'","'. $_POST["land"] .'","'. $_POST["email1"] .'","'. $_POST["email2"] .'","'. $_POST["tel1"] .'","'. $_POST["tel2"] .'","'. $_POST["ansprech"] .'","'. $_POST["zusatz"] .'","'. $string .'")';
        
        $orgaid =  sql_db($sql, "INSERT");

        
        // human to orga speichern
        // INSERT INTO `human_IN_orga`(`orgaID`, `humanID`) VALUES ([value-1],[value-2])
         $arr =  explode(" ,",$_POST["humanTOorga"]); 
         $l =  COUNT($arr);
        $i = 0;
        for ($i;$i<$l;$i++){
           echo $sql='INSERT INTO `zz_human_IN_orga`(`orgaID`, `humanID`) VALUES ('.$orgaid.','.$arr[$i].')';
             echo sql_db($sql, "INSERT"); 
        }
        
        // projekte to orga speichern 
        // INSERT INTO `orga_IN_proj`(`orgaID`, `projID`) VALUES ([value-1],[value-2])
         $arr1 =  explode(" ,",$_POST["projTOorga"]); 
         $ll =  COUNT($arr1);
        $y = 0;
        for ($y;$y<$ll;$y++){
           echo $sql1='INSERT INTO `zz_orga_IN_proj`(`orgaID`, `projID`) VALUES ('.$orgaid.','.$arr1[$y].')';
             echo sql_db($sql1, "INSERT"); 
        }
        break;
        
        
         
    case "load_orga":
        // lädt 100 Menschen
          $sql = 'SELECT * FROM `zz_orgas` ORDER BY dates DESC LIMIT 100';
        echo sql_db($sql, "SELECT"); 
        break;
        
        
    case"save_new_proj":
        
       // print_r($_POST);
         
        $string =  'tmpO_'. zufallsstring(35).'.png';

        // requires php5
        define('UPLOAD_DIR', 'images/proje/');
        $img = $_POST['img'];
        $img = str_replace('data:image/png;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $file = UPLOAD_DIR .$string;
        $success = file_put_contents($file, $data);

            /*
            [name] => khkjjhhj
            [desc] => hh
            [plz] => hh
            [ort] => h
            [str_nr] => jhkjh
            [adresse2] => jhjk
            [bundesland] => hjkh
            [land] => jkhjkhjkhjk
            [ansprech] => hjkh
            [email1] => jkhjk
            [email2] => hjk
            [tel1] => hj
            [tel2] => kjjkhkjhkj
            [www1] => hjkh
            [www2] => jkh
            [facebook] => kjh
            [youtube] => jkhk
            [twitter] => kjhjh
            [google] => khj
            [ZUSATZ] => sdfsfsdfs df s fsf sdfs dfsdfdfsd fs dfsdfsdfsdf sdfdfsdfsd fsd fs dfsdfsd fsdf sd fsf
            [typ] => save_new_proj
            [img] => data:image/png;base64,i
            [humanTOproj] => 3 ,4 ,8 ,9 
            [orgaTOproj] => 4 ,5 
                */
        
            $sql  ='INSERT INTO `zz_projects`(`id`, `name`, `descs`, `plz`, `ort`, `str_nr`, `adresse2`, `bundesland`, `land`,'; 
            $sql .='`ansprech`, `email1`, `email2`, `tel1`, `tel2`, `zusatz`, `img`,'; 
            $sql .='`www1`, `www2`, `dates`, `facebook`, `twitter`, `youtube`, `google`) VALUES ';        
            $sql .='(NULL,"'. $_POST["name"] .'","'. $_POST["desc"] .'","'. $_POST["plz"] .'","'. $_POST["ort"] .'","'. $_POST["str_nr"] .'","'. $_POST["adresse2"] .'","'. $_POST["bundesland"] .'","'. $_POST["land"] .'",';
            $sql .='"'. $_POST["ansprech"] .'","'. $_POST["email1"] .'","'. $_POST["email2"] .'","'. $_POST["tel1"] .'","'. $_POST["tel2"] .'","'. $_POST["zusatz"] .'","'. $string .'",';
            $sql .='"'. $_POST["www1"] .'","'. $_POST["www2"] .'",CURRENT_TIMESTAMP,"'. $_POST["facebook"] .'","'. $_POST["twitter"] .'","'. $_POST["youtube"] .'","'. $_POST["google"] .'")';
        
            //echo $sql;
            $projID = sql_db($sql, "INSERT");
        
            // human to proj speichern
            // INSERT INTO `human_IN_orga`(`orgaID`, `humanID`) VALUES ([value-1],[value-2])
            $arr =  explode(" ,",$_POST["humanTOproj"]); 
            $l =  COUNT($arr);
            $i = 0;
            for ($i;$i<$l;$i++){
                echo $sql='INSERT INTO `zz_human_IN_proj`(`humanID`, `projID`) VALUES ('.$projID.','.$arr[$i].')';
                echo sql_db($sql, "INSERT"); 
            }
        
            // orga  to proj speichern 
            // INSERT INTO `proj_IN_orga`(`orgaID`, `projID`) VALUES ([value-1],[value-2])
            $arr1 =  explode(" ,",$_POST["orgaTOproj"]); 
            $ll =  COUNT($arr1);
            $y = 0;
            for ($y;$y<$ll;$y++){
                echo "arr1y => " . $arr1[$y];
                echo "projID => " .$projID;
                echo $sql1='INSERT INTO `zz_orga_IN_proj`(`orgaID`, `projID`) VALUES ('.$arr1[$y].','.$projID.')';
                echo sql_db($sql1, "INSERT"); 
            }
        
        
        break;
        
        
        case "load_proj":
            // lädt 100 Menschen
            $sql = 'SELECT * FROM `zz_projects` ORDER BY  dates DESC LIMIT 100';
            echo sql_db($sql, "SELECT"); 
        break;
        
        
        
        
        
        
        
        
}
?>