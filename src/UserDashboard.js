import React from 'react';
import {  View, Text,Image,ImageBackground ,BackHandler,TouchableOpacity, Icon,TextInput,StyleSheet ,Animated,Platform } from 'react-native';
import CustomMenuIcon from './CustomMenuIcon';
import { ScrollView } from 'react-native-gesture-handler';
import ImageSlider from 'react-native-image-slider';


var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~assets/Database.db'})


export default class UserDashboard extends React.Component {

        static navigationOptions = ({ navigation }) =>{
              
            return {
            title: 'Sprinter - Time & Attendance',
            headerStyle: {
              backgroundColor: '#085ef9',
            },
            headerTintColor: '#000',
          
                headerRight: (
                    <CustomMenuIcon
                    //Menu Text
                    menutext="Menu"
                    //Menu View Style
                    menustyle={{
                      marginRight: 16,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    
                            
                    
                    }}
                    //Menu Text Style
                    textStyle={{
                      color: 'white',
                      
                    }}
                    //Click functions for the menu items
                    option1Click={() => {
                      navigation.navigate("Setting");
                    }}
                    option2Click={() => {   navigation.navigate("Login");}}
                
                  />
                  ),
                  headerLeft:null,
                };
              };
              constructor(props) {
                super(props)
            
                this.state = {
                  Logo: "http://kwtro.com/wp-content/themes/twentytwenty/Logo.png",
                 
                };
          
                db.transaction((tx) => {
                  tx.executeSql('SELECT * FROM Settings WHERE Id=?', ['1'], (tx, results) => {
                      var len = results.rows.length;
                      if(len > 0) {
                        // exists owner name John
                        var row = results.rows.item(0);
                        this.setState({Logo: row.Logo});
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
  
    

            CheckIn = () =>{
                  return fetch('http://nexgenapi.dyndns.org:1024/Home/AppendTransaction',{
                    method: 'POST',//GET and ...
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
                    },
                    body: JSON.stringify({                      
                       
                    })
                   })
                   .then((response)=>response.json()) //   <------ this line 
                   .then((response)=>{
                  
        
                       console.log(response); 

                       if(response != null){

                        alert("Successfully Check In");

                       }
                else {

                alert("Sorry Check In Failed");          
                }
             
                    return response ;
            
                   });
            
            }

            CheckOut = () =>{
                return fetch('http://nexgenapi.dyndns.org:1024/Home/AppendTransaction',{
                  method: 'POST',//GET and ...
                  headers:{
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
                  },
                  body: JSON.stringify({                      
                     
                  })
                 })
                 .then((response)=>response.json()) //   <------ this line 
                 .then((response)=>{
                
      
                     console.log(response); 

                     if(response != null){

                      alert("Successfully Check Out");

                     }
              else {

              alert("Sorry Check Out Failed");          
              }
           
                  return response ;
          
                 });
          
          }

          BreakIn = () =>{
                return fetch('http://nexgenapi.dyndns.org:1024/Home/AppendTransaction',{
                  method: 'POST',//GET and ...
                  headers:{
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
                  },
                  body: JSON.stringify({                      
                     
                  })
                 })
                 .then((response)=>response.json()) //   <------ this line 
                 .then((response)=>{
                
      
                     console.log(response); 

                     if(response != null){

                      alert("Successfully Break In");

                     }
              else {

              alert("Sorry Break In Failed");          
              }
           
                  return response ;
          
                 });
          
          }


          BreakOut = () =>{
                return fetch('http://nexgenapi.dyndns.org:1024/Home/AppendTransaction',{
                  method: 'POST',//GET and ...
                  headers:{
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
                  },
                  body: JSON.stringify({                      
                     
                  })
                 })
                 .then((response)=>response.json()) //   <------ this line 
                 .then((response)=>{
                
      
                     console.log(response); 

                     if(response != null){

                      alert("Successfully Break Out");

                     }
              else {

              alert("Sorry Break Out Failed");          
              }
           
                  return response ;
          
                 });
          
          }

                         
      render(){
        const { navigate } = this.props.navigation;
        const images = [
       
          'http://kwtro.com/wp-content/uploads/2020/03/sliderone.jpg',
          'http://kwtro.com/wp-content/uploads/2020/03/slidertwo.jpg',
            'http://kwtro.com/wp-content/uploads/2020/03/sliderthree.jpg',
           
          ];
    return(

        <ScrollView>
         
     <View style={{  alignItems: 'center' }}>
  <View style={{width: '100%', height: 550 , alignItems: 'center'}}>

             <ImageSlider style={{height:'10%'}}
          loop
          autoPlayWithInterval={3000}
          images={images}
          onPress={({ index }) => alert(index)}
          customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <View
              key={index}
              style={[
                style,
                styles.customSlide,
                { backgroundColor: index % 2 === 0 ? 'yellow' : 'green' },
              ]}
            >
              <Image source={{ uri: item }} style={styles.customImage} />
            </View>
          )}
         
        />


<View style={{flexDirection: 'row', marginBottom:50 }}>



<TouchableOpacity  onPress={ () => this.CheckIn() } style={{  borderWidth: 1,borderRadius: 10,borderColor: '#ddd',borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8, shadowRadius: 2, elevation: 1 ,marginRight: 20,marginTop: 10 ,backgroundColor:'white',width:140, height: 150}} >
<Image
        source={require('./Images/CheckIn.png')}
       style={{marginTop: 10 ,marginLeft:20, width: 100 , height : 100 , alignItems : 'center'}}
        />
<Text  style={{color:'#000000' ,marginTop: 10 ,marginLeft:35,  alignItems : 'center' ,fontWeight:'bold'}}> Check In</Text>

</TouchableOpacity>

<TouchableOpacity  onPress={ () => this.CheckOut() } style={{  borderWidth: 1,borderRadius: 10,borderColor: '#ddd',borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8, shadowRadius: 2, elevation: 1,marginRight: 0 ,marginTop: 10 ,backgroundColor:'white',width:140, height: 150}}>

<Image
        source={require('./Images/CheckOut.png')}
       style={{marginTop: 10 ,marginLeft:20, width: 100 , height : 100 , alignItems : 'center'}}
        />
<Text  style={{color:'#000000' ,marginTop: 10 ,marginLeft:35,  alignItems : 'center' ,fontWeight:'bold'}}> Check Out</Text>

</TouchableOpacity>

</View>

<View style={{flexDirection: 'row', flex:1,marginTop:-40}}>
<TouchableOpacity  onPress={ () => this.BreakIn() } style={{  borderWidth: 1,borderRadius: 10,borderColor: '#ddd',borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8, shadowRadius: 2, elevation: 1 ,marginRight: 20 ,backgroundColor:'white',width:140, height: 150}}>

<Image
        source={require('./Images/BreakIn.png')}
       style={{marginTop: 10 ,marginLeft:20, width: 100 , height : 100 , alignItems : 'center'}}
        />
<Text  style={{color:'#000000' ,marginTop: 10 ,marginLeft:40,  alignItems : 'center' ,fontWeight:'bold'}}> Break In</Text>

</TouchableOpacity>

<TouchableOpacity  onPress={ () => this.BreakOut() } style={{  borderWidth: 1,borderRadius: 10,borderColor: '#ddd',borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8, shadowRadius: 2, elevation: 1,marginRight: 0 ,backgroundColor:'white',width:140, height: 150}}>
<Image
        source={require('./Images/BreakOut.png')}
       style={{marginTop: 10 ,marginLeft:20, width: 100 , height : 100 , alignItems : 'center'}}
        />


<Text  style={{color:'#000000' ,marginTop: 10 ,marginLeft:35,  alignItems : 'center'  ,fontWeight:'bold'}}> Break Out</Text>

</TouchableOpacity>

</View>



</View>


</View>

</ScrollView>

    );}}


    const styles = StyleSheet.create({
        
        containerStyle: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2, elevation: 1,marginRight: 5,marginTop: 20,alignItems: 'center' ,backgroundColor:'white',width:150, height: 150,
        },
        customSlide: {
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          },
          customImage: {
            width: "100%",
            height: "100%",
          },
       
        
      }); 