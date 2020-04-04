import React from 'react';
import {  View, Text ,Image,FlatList ,ScrollView,StatusBar,TextInput ,ImageBackground,BackHandler,TouchableOpacity,StyleSheet, Button  } from 'react-native';
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import CustomMenu from './CustomMenu';
import { Left, Right, List } from 'native-base';



var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~Sprinter.db'})



export default class AdminDashboard extends React.Component {

    static navigationOptions = ({ navigation }) =>{
              
        return {
        title: 'Sprinter - Time & Attendance',
      
        headerStyle: {
          backgroundColor: '#085ef9',
        },
        headerTintColor: '#000',
      
            headerRight: (
  
                <CustomMenu
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
                option2Click={() => {   navigation.navigate("AdminDashboard");}}
                option3Click={() => {   navigation.navigate("Login");}}
               
              />
            
              ),
              headerLeft:(null),
         
            };
          };
      
          constructor(props) {
            super(props)
        
            this.state = {
            date:"",
            dataSource: "", 
            EmployeeId: null,
            EmployeeName: '',
            Logo: "http://kwtro.com/wp-content/themes/twentytwenty/Logo.png",    
            isChecked: true,
              
        
    
          };
          this.state = { isLoading: true, text: '' };
            this.arrayholder = [];
       

            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM Settings WHERE Id=?', ['1'], (tx, results) => {
                  var len = results.rows.length;
                  if(len > 0) {
                    // exists owner name John
                    var row = results.rows.item(0);
                    this.setState({Logo: row.Logo});
                    console.log(db);
                  }
                });
              
            });
        }

     componentDidUpdate() {

    
          return fetch('http://nexgenapi.dyndns.org:1024/Home/GetEmployees',{
            method: 'POST',//GET and ...
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
            },
           })
           .then(response => response.json())
           .then(responseJson => {
            this.setState(
              {
                isLoading: false,
                dataSource: responseJson,
              
              },
              function() {
                this.arrayholder = responseJson;
              }
            );
    
            console.log(responseJson); 
    
            return responseJson ;
    
           })
           .catch(error => {
            console.error(error);
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

Insert = () =>{
  return fetch('http://nexgenapi.dyndns.org:1024/Home/GetEmployees',{
    method: 'POST',//GET and ...
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
    },
    body: JSON.stringify({                      
      EmployeeId: null,
      EmployeeName: '',
    })
   })
   .then((response)=>response.json()) //   <------ this line 
   .then((response)=>{
  

    return response ;

   });

}


SearchFilterFunction(text) {
  //passing the inserted text in textinput
  const newData = this.arrayholder.filter(function(item) {
    //applying filter for the inserted text in search bar
    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  this.setState({
    //setting the filtered newData on datasource
    //After setting the data it will automatically re-render the view
    dataSource: newData,
    text: text,
  });
}
ListViewItemSeparator = () => {
  //Item sparator view
  return (
    <View
      style={{
        height: 0.3,
        width: '90%',
        backgroundColor: '#080808',
      }}
    />
  );
};


  
      render(){
        const { navigate } = this.props.navigation;
return(
   

  <View style={{  alignItems: 'center' ,width: '100%' , alignItems: 'center'}}>



<View style={{width:"90%",borderRadius:7,borderRadius:5 ,marginTop:'3%' }}>
<ScrollView>

<View style={{flexDirection:'row' }}>
<Text style={{marginLeft:'45%' , fontSize:15 }}>Select All</Text>

   <CheckBox
                style={{flex: 1,marginLeft:'7%'}}
             
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
                isChecked={this.state.isChecked}
               
            />
</View>
   <FlatList
  
          data={this.state.dataSource}
          renderItem={({ item }) => (
           

            <View style={{flexDirection:'row' , backgroundColor:'white' ,marginTop:5 ,paddingBottom:5,borderRadius:5}}>

            <Image style={{width: 40, height: 40  , marginTop:5 , marginLeft:20}}
                   Person
                   source={require('./Images/Person.png')}
                   />
            <View style={{flexDirection:'column' , marginLeft:10}}>
            <Text style={{marginTop:8 , width:140 }}>{item.name}  </Text>
            <Text style={{marginTop:2 , fontSize:10}}>{item.login}</Text>
            </View>
            <CheckBox
                style={{flex: 1, padding: 10,marginTop:5 ,marginLeft:'10%'}}
             
                onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
                isChecked={this.state.isChecked}
               
            />
            </View>
      
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />


</ScrollView>

</View>

</View>


    );
}
}


const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        opacity: 0.9,
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: -5,
        backgroundColor:'white',
        width:340,
        height: 400,
       
        
    },
    datePickerBox:{
        marginTop: 9,
        borderColor: '#FF5722',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent:'center',
        
      },
     
      datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#f00',
       
      },
    
      viewStyle: {
        justifyContent: 'center',
        flex: 1,
        marginTop: 15,
        marginBottom:5,
        padding: 16,
        width:"90%",
      
      },
      textStyle: {
        padding: 10,
       
      },
      textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#000',
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        
      },
  }); 