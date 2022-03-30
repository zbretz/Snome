import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, SectionList, ScrollView, ListView, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import UserContext from '../Context/UserContext';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const axios = require('axios');


const styles = {
  card: {
    margin: 4,
    borderWidth: 2,
    flex: 1
  },
  input: {
    height: 60,
    lineHeight: 20,
    borderWidth: 2,
    borderColor: '#e1861b',
    padding: 10,
    backgroundColor: "white",
  },
  headerButton: {
    backgroundColor: "white",
    padding: 6,
    height: 50,
    width: '100%',
    textAlign: 'center'
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
};

// const MessageCard = ({ message, setShowThread, user_id }) => {
const MessageCard = ({ message, selectedConvo, setSelectedConvo, setView, user_id }) => {
console.log('selectedConvo message card: ', selectedConvo)
  return (

    <>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row' }}
        onPress={() => {
          setView('selected thread')
          setSelectedConvo(message.sender_id === user_id ? message.recipient_id : message.sender_id)
          // return selectedConvo
        }}>
        <View //style={[styles.card, message.sender_id === user_id && styles.selectedConvo]}
        >
          <View >
            {/* <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>message_sender: {message.sender_id}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>message_recipient: {message.recipient_id}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>{message.time}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>{message.message_text}</Text>
            <Text style={[message.sender_id === user_id && styles.selectedConvoText]}>{message.id}</Text> */}

            <Text style={{backgroundColor:'white'}}>message_sender: {message.sender_id}</Text>
            <Text>message_recipient: {message.recipient_id}</Text>
            <Text>{message.time}</Text>
            <Text>{message.message_text}</Text>
            <Text>{message.id}</Text>

            <Text>selectedConvo{selectedConvo}</Text>


          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const MessageScreen = () => {

  const context = useContext(UserContext)
  const user_id = context.user_data.user_id
  console.log(user_id)

  const [view, setView] = useState('all threads')
  const [selectedConvo, setSelectedConvo] = useState(null)

  const [newMessage, setNewMessage] = useState()
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [windowHeight, setWindowHeight] = useState(0)
  const tabBarHeight = useBottomTabBarHeight();

  const [conversations, setConversations] = useState()

  const sendMessage = async () => {

    axios.post(
      'http://localhost:3000/messages/',
      { sender_id: user_id, recipient_id: showThread, message_text: newMessage }
    )
      .then((new_message) => {
        console.log('NEW MESSAGE DATA POST: ', new_message.data)
        context.setMessages([new_message.data, ...context.messages])
      }
      )
      .catch(error => {
        console.error(error);
        console.log('Snome not able to be added to snome_message ', error)
      })

  };

  const groupMessagesByOtherUser = (messages) => {
    const conversationThreads = {}//{other_user: null, messages:[]}
    messages.forEach(msg => {
      let other_user = msg.recipient_id === user_id ? msg.sender_id : msg.recipient_id
      if (!conversationThreads.hasOwnProperty(other_user)) { conversationThreads[other_user] = [] }
      conversationThreads[other_user].push(msg)
    })
    console.log(conversationThreads)
    Object.values(conversationThreads).map(i => { console.log(i[0]) })
    console.log('map: ', Object.values(conversationThreads).map(i => i[0].id)
    )
    setConversations(conversationThreads)
    // return conversationThreads
  }

  useEffect(() => {

    if (context.messages) {
      // sortMessagesByOtherUser(context.messages)
      groupMessagesByOtherUser(context.messages)
      console.log(context.messages)
    }

    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(() => {
        return (e.endCoordinates.height - tabBarHeight)
      })
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
      setKeyboardHeight(0)
    });

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    // setWindow(`${windowWidth} ${windowHeight}`)
    setWindowHeight(windowHeight)

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };

  }, [context.messages])

  const renderItem = ({ item }) => {
    console.log('selectedConvo renderItem: ', selectedConvo)

    return (
      // Object.entries(item).map((entry)=><Text key={entry.id}>{entry}</Text>)
      <MessageCard
        key={item.id}
        // style={{ flex: 1, flexDirection: 'row-reverse', }}
        message={item}
        setView={setView}
        selectedConvo = {selectedConvo}
        setSelectedConvo = {setSelectedConvo}
        user_id={user_id}
      // setShowThread={setShowThread}
      // user_id={user_id}
      />
    )
  }

  console.log('message screen main: ', selectedConvo)


  return (



    <UserContext.Consumer>
      {context => (
        <>

          {conversations &&
            view === 'all threads' &&
            <>
              {/* <Text style={styles.headerButton}>Your Conversations</Text> */}
              <FlatList
                //map over the FIRST (index 0) message from each conversation
                data={Object.values(conversations).map(i => i[0])}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </>
          }
          {conversations &&
            view === 'selected thread' &&
            <>
            <Text>{selectedConvo}</Text>
              {/* <View
                style={{
                  //the static numbers represent the text input height (with padding) and the headerButton height (padding)
                  height: windowHeight - keyboardHeight - tabBarHeight - 80 - 62
                }}
              >

                <TouchableOpacity  >
                  <Text style={styles.headerButton} onPress={() => setShowThread(false)}>Back to Messages</Text>
                </TouchableOpacity>
                <FlatList
                  data={context.messages.filter(msg => msg.sender_id === showThread || msg.recipient_id === showThread)}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />

              </View> */}

              <TextInput
                style={{
                  height: 60,
                  lineHeight: 20,
                  borderWidth: 2,
                  borderColor: '#e1861b',
                  padding: 10,
                  backgroundColor: "white",
                  position: 'absolute',
                  bottom: keyboardHeight,
                  width: '100%'
                }}
                onChangeText={setNewMessage}
                value={newMessage}
                onSubmitEditing={sendMessage}

              />

            </>

          }

        </>
      )}
    </UserContext.Consumer>

  );
};


export default MessageScreen;