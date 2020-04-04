import React from 'react';
import { View, Text, Image, FlatList, ScrollView, StatusBar, TextInput, ImageBackground, BackHandler, TouchableOpacity, StyleSheet, Button, Dimensions, LayoutAnimation, UIManager, Platform, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import CustomMenu from './CustomMenu';
import { Left, Right, List } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';


var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~Sprinter.db' })



export default class AdminDashboard extends React.Component {

  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)

    this.state = {
      date: "",
      dataSource: [],
      EmployeeId: null,
      EmployeeName: '',
      showSearch: false,
      Logo: "http://kwtro.com/wp-content/themes/twentytwenty/Logo.png",
      isChecked: true,
      isLoading: true,
      selectAll: false,
      text: '',
      data: [],
      dataBackup: [],
      searchWord: ''
    };
    // this.state = {  };
    this.arrayholder = [];


    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Settings WHERE Id=?', ['1'], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          // exists owner name John
          var row = results.rows.item(0);
          this.setState({ Logo: row.Logo });
          console.log(db);
        }
      });

    });
  }
  componentDidMount() {
    const data = require('../src/data.json')
    console.log('data : ', data)
    this.setState({ data: data, dataBackup: data })
    // th
  }
  componentDidUpdate() {

    // fetch('http://nexgenapi.dyndns.org:1024/Home/GetEmployees', {
    //   method: 'POST',//GET and ...
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log('responseJson : ',responseJson)
    //     this.setState(
    //       {
    //         isLoading: false,
    //         dataSource: responseJson,

    //       },
    //       function () {
    //         this.arrayholder = responseJson;
    //       }
    //     );

    //     console.log(responseJson);


    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });



  }



  CheckIn = () => {
    return fetch('http://nexgenapi.dyndns.org:1024/Home/AppendTransaction', {
      method: 'POST',//GET and ...
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
      },
      body: JSON.stringify({

      })
    })
      .then((response) => response.json()) //   <------ this line 
      .then((response) => {




        console.log(response);

        if (response != null) {

          alert("Successfully Check In");

        }
        else {

          alert("Sorry Check In Failed");
        }

        return response;

      });

  }

  CheckOut = () => {
    return fetch('http://nexgenapi.dyndns.org:1024/Home/AppendTransaction', {
      method: 'POST',//GET and ...
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
      },
      body: JSON.stringify({

      })
    })
      .then((response) => response.json()) //   <------ this line 
      .then((response) => {


        console.log(response);

        if (response != null) {

          alert("Successfully Check Out");

        }
        else {

          alert("Sorry Check Out Failed");
        }

        return response;

      });

  }

  Insert = () => {
    return fetch('http://nexgenapi.dyndns.org:1024/Home/GetEmployees', {
      method: 'POST',//GET and ...
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
      },
      body: JSON.stringify({
        EmployeeId: null,
        EmployeeName: '',
      })
    })
      .then((response) => response.json()) //   <------ this line 
      .then((response) => {


        return response;

      });

  }


  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function (item) {
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

  toggleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showSearch: !this.state.showSearch })
  }

  showSearch = () => {
    if (this.state.showSearch === true) {
      return (
        <TextInput
          onChangeText={t => this.setState({ searchWord: t })}
          style={{
            height: 4 * vh,
            width: 75 * vw,
            fontSize: 2.5 * vh,
            padding: 0,
            textAlignVertical: 'center',
            marginLeft: 3 * vw,
            borderRadius: 5,
            borderWidth: 1,
            paddingLeft: 3 * vw,
            color: '#fff',
            borderColor: 'white'
          }}
          placeholder='Search'
          placeholderTextColor='#fff'
        />
      )
    } else {
      return (
        <Text style={{ fontSize: 2.5 * vh, marginLeft: 3 * vw, fontWeight: 'bold', color: '#FFF', height: 8 * vh, textAlignVertical: 'center' }}>
          Sprinter
        </Text>
      )
    }
  }
  renderSelectAllIcon = () => {
    if (this.state.selectAll === true) {
      return (
        <Image style={{ height: 2.5 * vh, width: 2.5 * vh, resizeMode: 'contain', marginRight: 5 * vw }} source={require('./Images/check.png')} />
      )
    } else {
      return (
        <Image style={{ height: 2.5 * vh, width: 2.5 * vh, resizeMode: 'contain', marginRight: 5 * vw }} source={require('./Images/unchecked.png')} />
      )
    }
  }

  selectAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ selectAll: !this.state.selectAll }, () => {
      this.state.data.map((item, index) => {
        var data = this.state.data
        data[index].isSelected = this.state.selectAll
        this.setState({ data: data })
      })
    })
  }
  updateUser = (item, index) => {
    var data = this.state.data
    data[index].isSelected = data[index].isSelected ? !data[index].isSelected : true
    this.setState({ data: data })
  }
  renderUser = ({ item, index }) => {
    if (this.state.showSearch === true) {
      if (this.state.searchWord.length > 0) {
        let name = item.name.toUpperCase()
        let shouldShow = name.includes(this.state.searchWord.toUpperCase())
        if (shouldShow === false) {
          return null;
        }
      }
    }
    return (
      <TouchableOpacity onPress={() => this.updateUser(item, index)} style={{ height: 8 * vh, width: 92 * vw, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'space-between' }}>
        <Image style={{ height: 5 * vh, width: 10 * vh, resizeMode: 'contain' }} source={require('./Images/Person.png')} />
        <View style={{ width: 65 * vw }}>
          <Text style={{ fontSize: 2 * vh, fontWeight: 'bold' }}>{item.name}</Text>
          <Text>

          </Text>
        </View>
        {(item.isSelected === true || this.state.selectAll === true) ?
          <Image style={{ height: 2.5 * vh, width: 2.5 * vh, resizeMode: 'contain', marginRight: 5 * vw }} source={require('./Images/check.png')} />
          : <Image style={{ height: 2.5 * vh, width: 2.5 * vh, resizeMode: 'contain', marginRight: 5 * vw }} source={require('./Images/unchecked.png')} />}
      </TouchableOpacity>
    )
  }
  checkIn = () => {
    this.setState({ isLoading: true })
    var dataToPost = []
    let date = new Date().toLocaleString()
    console.log(date.split(' '))
    this.state.data.map(item => {
      if (item.login != null) {
        if (item.isSelected === true) {
          dataToPost.push({
            login: item.login,
            UserName: item.name,
            checktimestr: date,
            CheckType: 1,
            Latitude: 232,
            Longitude: 232,
            LocationName: "Dolmen Mall Tariq Road"
          })
        }
      }
    })
    if(dataToPost.length > 0){
    this.postData(dataToPost)
     
    }else{
      alert('Please select data')
      return
    }
  }
  postData = (data) => {
    const url = "http://nexgen-demo.dyndns.org:1012/Home/AppendBulkTransaction"
    const config = {
      method:'POST',
      body:JSON.stringify(data),
      Authorization: 'Basic U3ByaW50ZXJBcHBVc2VyOmMzQnlhVzUwWlhKQU1qQXhPQT09'
    }
    fetch(url,config)
    .then(d=>{
      d.json()
      .then(res=>{
        console.log(res)
        this.setState({isLoading:false})
        Alert.alert('Succes','Data posted successfully',[{text:'OK'}])
      }).catch(e=>{
        console.log(e)
        Alert.alert('Error','Could not post data',[{text:'OK'}])
    })
    }).catch(e=>{
        console.log(e)
        Alert.alert('Error','Could not post data',[{text:'OK'}])

    })
  }
  checkOut = () => {
    // {
    //   login:2,
    //   checktimestr:04/25/2019 18:25:30,
    //   CheckType:0,
    //   Latitude:232,
    //   Longitude:232,”
    //   LocationName”:”Dolmen Mall Tariq Road”
    //   },
    this.setState({ isLoading: true })
    var dataToPost = []
    let date = new Date().toLocaleString()
    console.log(date.split(' '))
    this.state.data.map(item => {
      if (item.login != null) {
        if (item.isSelected === true) {
          dataToPost.push({
            login: item.login,
            UserName: item.name,
            
            checktimestr: date,
            CheckType: 0,
            Latitude: 232,
            Longitude: 232,
            LocationName: "Dolmen Mall Tariq Road"
          })
        }
      }
    })
    if(dataToPost.length > 0){
      this.postData(dataToPost)
       
      }else{
        alert('Please select data')
        return
      }
  }
  render() {
    let datetime = new Date().toLocaleString().split(' ')
    let time = datetime[1]
    let date = datetime[0].replace(',','')
    return (


      <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        <StatusBar
          translucent={false}
          backgroundColor='#105EF9'
        />
        <View style={{ height: 8 * vh, elevation: 10, backgroundColor: '#105EF9', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          {this.showSearch()}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.toggleSearch} style={{ justifyContent: 'center', marginRight: 2 * vw }}>
              <Image style={{ resizeMode: 'contain', height: 2.5 * vh, width: 2.5 * vh }} source={require('./Images/searchWhite.png')} />
            </TouchableOpacity>
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
                this.props.navigation.navigate("Setting");
              }}
              option2Click={() => { this.props.navigation.navigate("AdminDashboard"); }}
              option3Click={() => { this.props.navigation.navigate("Login"); }}

            />
          </View>

        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0 }}
          colors={['#4A89FA', '#101CD1']} style={{ height: 20 * vh, width: '100%' }}>
          <View style={{ flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 6 * vw, alignItems: 'center', justifyContent: 'center', width: 42 * vw, marginTop: 2.5 * vh, height: 6 * vh, borderWidth: 1, borderColor: '#FFF', borderRadius: 2 * vw }}>
              <Text style={{ color: '#fff', fontSize: 2.5 * vh }}>{date}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.checkIn} style={{ marginLeft: 6 * vw, alignItems: 'center', justifyContent: 'center', width: 42 * vw, marginTop: 2.5 * vh, height: 6 * vh, borderWidth: 1, borderColor: '#FFF', borderRadius: 2 * vw }}>
              <Text style={{ color: '#fff', fontSize: 2.5 * vh }}>CheckIn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 6 * vw, alignItems: 'center', justifyContent: 'center', width: 42 * vw, marginTop: 2.5 * vh, height: 6 * vh, borderWidth: 1, borderColor: '#FFF', borderRadius: 2 * vw }}>
              <Text style={{ color: '#fff', fontSize: 2.5 * vh }}>{time}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.checkOut} style={{ marginLeft: 6 * vw, alignItems: 'center', justifyContent: 'center', width: 42 * vw, marginTop: 2.5 * vh, height: 6 * vh, borderWidth: 1, borderColor: '#FFF', borderRadius: 2 * vw }}>
              <Text style={{ color: '#fff', fontSize: 2.5 * vh }}>CheckOut</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={{ width: 100 * vw, height: 8 * vh, backgroundColor: 'white', marginVertical: 2 * vh, flexDirection: 'row', paddingHorizontal: 3 * vw, justifyContent: 'flex-end', alignItems: 'center' }}>

          <Text style={{ fontSize: 2 * vh, fontWeight: 'bold', marginRight: 3 * vw }}>Select All</Text>
          <TouchableOpacity onPress={() => this.selectAll()}>
            {this.renderSelectAllIcon()}
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderUser}
          contentContainerStyle={{
            alignItems: 'center'
          }}
        />
        {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
        {/* <View style={styles.viewStyle}>

          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
          />

        </View>

        <View style={{ width: '90%', alignItems: 'center', marginTop: 10, height: 94, backgroundColor: '#085ef9', borderRadius: 5 }}>


          <View style={{ flexDirection: 'row', marginLeft: 10, paddingTop: 5 }}>

            <DatePicker
              style={{ marginRight: 10, height: 40, color: 'white', width: 130, opacity: 0.9 }}
              date={this.state.date}
              onDateChange={date => this.setState({ date })}

            />

            <DatePicker
              style={{ width: 130, marginRight: 10, opacity: 0.9, height: 40 }}
              date={this.state.time}
              mode="time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              minuteInterval={10}
              onDateChange={(time) => { this.setState({ time: time }); }}
            />
          </View>


          <View style={{ flexDirection: 'row', marginTop: 5 }}>


            <TouchableOpacity onPress={() => this.CheckIn()}><Text style={{ marginRight: 20, textAlign: 'center', borderRadius: 5, borderColor: 'white', padding: 8, color: '#fff', fontSize: 15, borderWidth: 1, width: 120, fontWeight: 'bold' }}> Check In</Text></TouchableOpacity>

            <TouchableOpacity onPress={() => this.CheckOut()}><Text style={{ marginRight: 10, textAlign: 'center', borderColor: 'white', borderRadius: 5, borderWidth: 1, padding: 8, color: '#fff', fontSize: 15, width: 122, fontWeight: 'bold' }}> Check Out</Text></TouchableOpacity>
          </View>



        </View>

        <View style={{ width: "90%", borderRadius: 7, borderRadius: 5, marginTop: '3%' }}>
          <ScrollView>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: '45%', fontSize: 15 }}>Select All</Text>

              <CheckBox
                style={{ flex: 1, marginLeft: '7%' }}

                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
                  })
                }}
                isChecked={this.state.isChecked}

              />
            </View>
            <FlatList

              data={this.state.dataSource}
              renderItem={({ item }) => (


                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 5, paddingBottom: 5, borderRadius: 5 }}>

                  <Image style={{ width: 40, height: 40, marginTop: 5, marginLeft: 20 }}
                    Person
                    source={require('./Images/Person.png')}
                  />
                  <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                    <Text style={{ marginTop: 8, width: 140 }}>{item.name}  </Text>
                    <Text style={{ marginTop: 2, fontSize: 10 }}>{item.login}</Text>
                  </View>
                  <CheckBox
                    style={{ flex: 1, padding: 10, marginTop: 5, marginLeft: '10%' }}

                    onClick={() => {
                      this.setState({
                        isChecked: !this.state.isChecked
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

        </View> */}

      </View>


    );
  }
}


const styles = StyleSheet.create({
  button: {
    width: 40 * vw
  },
  buttonText: {

  },
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
    backgroundColor: 'white',
    width: 340,
    height: 400,


  },
  datePickerBox: {
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: 'center',

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
    marginBottom: 5,
    padding: 16,
    width: "90%",

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
    borderRadius: 5,

  },
});
const vw = Dimensions.get('window').width * 0.01
const vh = Dimensions.get('window').height * 0.01
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}