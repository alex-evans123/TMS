import React from 'react';
import {  View, Text,Image,Alert, PermissionsAndroid,ToastAndroid,BackHandler,ImageBackground,TouchableOpacity,TextInput,StyleSheet ,Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~Sprinter.db'})


export default class Setting extends React.Component {

    static navigationOptions = {
      headerShown: false,
      };

 
      constructor(props) {
        super(props)
    
        this.state = {
          Logo: "https://image.flaticon.com/icons/png/512/38/38334.png",
          API: "http://nexgenapi.dyndns.org:1024",
          Id: 1,
         
        };
  
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Settings WHERE Id=?', ['1'], (tx, results) => {
              var len = results.rows.length;
              if(len > 0) {
                // exists owner name John
                var row = results.rows.item(0);
                this.setState({Logo: row.Logo});
                console.log(Logo);
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
   
  
    componentWillUnmount() {
      this.backHandler.remove();
    }

   
    // getExtention = (filename) => {
    //   return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
    //     undefined;
    // }
  
  
    updateUser = () => {
      var that=this;
      const { Logo } = this.state;
      const { API } = this.state;
      const { Id } = this.state;
      
      console.log(Id);
console.log(API);
console.log(Logo);
      
     if (Logo === "" || API === ""){

      alert("Please Input all Input Fields");}
      else {
            db.transaction((tx)=> {
              tx.executeSql(
                'UPDATE Settings set API=?, Logo=? where Id=?',
                [API+"/Home/Login", Logo, Id],
                (tx, results) => {
                  console.log('Results',results.rowsAffected);
                  if(results.rowsAffected > 0){
                    Alert.alert( 'Success', 'Settings updated successfully',
                      [
                        {onPress: () => that.props.navigation.navigate('Login')},
                      ],
                      { cancelable: false }
                    );
                  }else{
                    alert('Settings Updation Failed');
                  }
                }
              );
            });
          
          }

          }

      render(){
    return(

     
      <ImageBackground source={require('./Images/settingbg.png')} style={{width: '100%' ,height: '100%' ,   alignItems: 'center'}}>
 <ScrollView  >
        <Image
          source={{uri: this.state.Logo}}
       style={{marginTop: '25%' , width: 160,marginLeft:50 , height : 130 , alignItems : 'center'}}
        /> 

<Text style={{ marginTop: 3,color: 'white',fontSize: 14 , marginRight:10 , marginLeft:55}}> NexGen Technologies</Text>


<Text style={{ marginTop: 20,color: 'white',fontSize: 15,marginRight:210}}> API</Text>
<View style={{flexDirection:'row' , justifyContent:'center' ,alignItems:'center',borderColor: 'white' ,borderRadius: 10 , borderBottomWidth:1}}>

<Image source={require('./Images/api.png')} style={{marginLeft:10}}/>
<TextInput
value={this.state.API}
style={{height: 35,  opacity: 0.7,paddingLeft:10, width: 220, height:45,  color:'black'}}
placeholder='API '
placeholderTextColor="#A0A0A0"
backgroundColor=''
onChangeText={API => this.setState({API})}
/>

</View>
<Text style={{ marginTop: 20,color: 'white',fontSize: 15,marginRight:200 , }}> Logo</Text>
<View style={{flexDirection:'row' , justifyContent:'center' ,alignItems:'center',borderColor: 'white' ,borderRadius: 10 , borderBottomWidth:1}}>

<Image source={require('./Images/api.png')} style={{marginLeft:10}}/>
<TextInput
value={this.state.Logo}

style={{height: 35, opacity: 0.7,paddingLeft:10, width: 220, height:45,  color:'black' }}
placeholder='Logo '
placeholderTextColor="#A0A0A0"
backgroundColor=''
onChangeText={Logo => this.setState({Logo})}
/>
</View>



<View style={styles.buttonContainer}>

<TouchableOpacity  onPress={ this.updateUser} ><Text style={{ marginTop:20, textAlign:'center', borderRadius:5, padding:10,color: '#ffffff',fontSize: 15 , backgroundColor:'#ffaf00' , fontWeight:'bold'}}> Save Settings</Text></TouchableOpacity>


</View>
</ScrollView>
        </ImageBackground>

    );}}


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
       
        containerStyle: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            opacity: 0.9,
            elevation: 1,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 20,
            alignItems: 'center' ,
            backgroundColor:'white',
            width:340,
            height: 280,
        }
       
        
      }); 