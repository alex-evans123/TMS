import React from 'react';
import {  View, Text,Image, BackHandler,handleAndroidBackButton,KeyboardAvoidingView ,Button,ImageBackground,TouchableOpacity,TextInput,StyleSheet  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~Sprinter.db'})


export default class Login extends React.Component {
   
    static navigationOptions = {
        headerShown: false,
      };

      constructor(props) {
 
        super(props)
     
        this.state = {
     
         UserName: '',
         API:'',
         UserPassword: '',
         UserManager: false,
         Id: 1,
         Logo: 'http://kwtro.com/wp-content/themes/twentytwenty/Logo.png',
        }

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Settings WHERE Id=?', ['1'], (tx, results) => {
                var len = results.rows.length;
                if(len > 0) {
                  // exists owner name John
                  var row = results.rows.item(0);
                  this.setState({Logo: row.Logo});
                  this.setState({API: row.API});
                  
                }
              });
          });

          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Login WHERE Id=?', ['1'], (tx, results) => {
                var len = results.rows.length;
                if(len > 0) {
                  // exists owner name John
                  var row = results.rows.item(0);
                  this.setState({UserName: row.name});
                  this.setState({UserPassword: row.pwd});
                  
                }
              });
          });

          
      }
    
      componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          // works best when the goBack is async
          return true;
        });
      }


      Update () {

        db.transaction((tx)=> {
                       tx.executeSql(
                         'UPDATE Login set name=?, pwd=? where id=?',
                         [UserName, UserPassword, Id],
                         (tx, results) => {
                           console.log('Results',results.rowsAffected);
                           if(results.rowsAffected>0){
                               if (response.manager === false){
                             Alert.alert( 'Success', 'Updated Successfully',
                               [
                                 {onPress: () => that.props.navigation.navigate('UserDashboard')},
                               ],
                               { cancelable: false }
                             );
                       }   
                       else {
                           Alert.alert( 'Success', 'Updated Successfully',
                             [
                               {onPress: () => that.props.navigation.navigate('AdminDashboard')},
                             ],
                             { cancelable: false }
                           );
                     }   
                   
                   }else{
                             alert('Settings Updation Failed');
                           }
                         }
                       );
                     });
                   }
            
            
   UserLoginFunction = async () => {
     

    const { UserName }  = this.state ;
    const { UserPassword }  = this.state ;
    const { UserManager }  = this.state ;
    const URL = this.state.API;
    console.log(URL);

      return fetch(URL,{
        method: 'POST',//GET and ...
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
        },
        body: JSON.stringify({
            elm: "elm", //is fake
            name: UserName,
            password: UserPassword,
            manager: UserManager,
        })
       })
       .then((response)=>response.json()) //   <------ this line 
       .then((response)=>{
        console.log(response); 
        console.log(response.name);
       
        if (UserName === "" || UserPassword === ""){

            alert("Please Input all Input Fields");
        }

        
        else {

            if(response.Status === "Success"){
             

                
                if (response.manager === false){
                   
           this.props.navigation.navigate("UserDashboard");
                    console.log(response.manager);

                }

                else {

                    this.props.navigation.navigate("AdminDashboard");
                    console.log(response.manager);
                }
              
                this.Update();       
        
            }
        
            else {
                alert("Login Failed");
            }

        }


      
        return response ;

       });
      }

      render(){

    return(



     <ImageBackground source={require('./Images/loginbg.png')} style={{width: '100%' ,height: '100%' , alignItems: 'center'}}>
 <ScrollView  >
 <Image
          source={{uri: this.state.Logo}}
       style={{marginTop: '20%' , width: 160,marginLeft:50 , height : 130 , alignItems : 'center'}}
        /> 

<Text style={{ marginTop: 3,color: 'white',fontSize: 14 , marginRight:10 , marginLeft:55}}> NexGen Technologies</Text>


<Text style={{ marginTop: 30,color: 'white',fontSize: 15,marginRight:170}}> User Name</Text>


<View style={{flexDirection:'row' , justifyContent:'center' ,alignItems:'center',borderColor: 'white' ,borderRadius: 10 , borderBottomWidth:1}}>

<Image source={require('./Images/email.png')} style={{marginLeft:10}}/>
<TextInput
style={{height: 35  , width: 220, height:45,  color:'black', paddingLeft:10 }}
placeholder='User Name '
placeholderTextColor="#A0A0A0"
backgroundColor=''
onChangeText={UserName => this.setState({UserName})}
value={this.state.UserName}

/>
</View>

<Text style={{ marginTop: 20,color: 'white',fontSize: 15,marginRight:170}}> Password</Text>
<View style={{flexDirection:'row' , justifyContent:'center' ,alignItems:'center',borderColor: 'white' ,borderRadius: 10 , borderBottomWidth:1}}>

<Image source={require('./Images/pwd.png')} style={{marginLeft:10}}/>
<TextInput
style={{height: 35,  paddingLeft:10,height:45,color:'black' ,width: 220}}
placeholder='Password  '
placeholderTextColor="#A0A0A0"
backgroundColor=''
onChangeText={UserPassword => this.setState({UserPassword})}
secureTextEntry={true}
value={this.state.UserPassword}

/>

</View>

<TouchableOpacity style={{marginLeft:135}} onPress={ () => this.props.navigation.navigate('Setting') }><Text style={{ color: 'white',fontSize: 13}}> Back To Settings</Text></TouchableOpacity>

<View style={styles.buttonContainer}>

<TouchableOpacity 
 onPress={this.UserLoginFunction}><Text style={{ marginTop:20, textAlign:'center', borderRadius:5, padding:10,color: '#ffffff',fontSize: 15 , backgroundColor:'#00b894' , fontWeight:'bold'}}> Login</Text></TouchableOpacity>

</View>
</ScrollView>

</ImageBackground>
    


);

      }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
  
    buttonContainer: {
     width: 250,
     marginLeft:10,
     marginTop:10,
    
   
    },
   
  });

  