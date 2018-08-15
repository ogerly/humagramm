 <?php

require_once('setup/setup.php');

 
$username = $password = $userError = $passError = '';
    if(isset($_POST['sub'])){
        $username = $_POST['username']; 
        $password = $_POST['password'];
        
        if($username === 'humagramm' && $password === '678zuz476!'){
            $_SESSION['login'] = true; 
            header("Refresh:0");
            die();
        }
        if($username !== 'humagramm')$userError = 'Invalid Username';
        if($password !== '678zuz476!')$passError = 'Invalid Password';
    }
?>

     <div id="login_box" class=" col-md-12 header">
           <form name='input' action='<?php echo $_SERVER['PHP_SELF'];?>' method='post'>
               <label for='username'></label>
               <input type='text' value='<?php echo $username;?>' id='username' name='username' />
               <div class='error'><?php echo $userError;?></div>
               <label for='password'></label>
               <input type='password' value='<?php echo $password;?>' id='password' name='password' />
               <div class='error'><?php echo $passError;?></div>
               <input type='submit' value='Home' name='sub' />
         </form>
    </div>
       
        