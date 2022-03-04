import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  SectionList,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Row,
  ImageBackground,
} from 'react-native';
import { Dimensions } from 'react-native';
import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
// for video player
// import YoutubePlayer from 'react-native-youtube-iframe';

// for testing purposes
// import location from '../localtestdata/Projects.json';

function ListingScreen({ route }) {
  //
  const [flexDirection, setflexDirection] = useState('column');
  const [error, setError] = useState('');
  // ability to use and change data
  const [listing, setData] = useState([]);

  const navigation = useNavigation();
  const context = useContext(UserContext);

  // fetch data from backend and set it to state
  const getListing = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/listing/' + route.params.location_id
      );
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect is a hook that runs a piece of code based on a given condition
  useEffect(() => {
    getListing();
  }, []);

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 4500);
  };

  //get request to db to see if like already exists with current user
  const checkLikes = async (snome_id) => {
    const likeObj = {
      snome_user_id: context.user_data.user_id,
      snome_id: snome_id,
    };
    try {
      const checkLikes = await fetch(
        'http://localhost:3000/snome/like/exists/' + likeObj.snome_id +
        '/' +
        likeObj.snome_user_id
      );
      const likeStatus = await checkLikes.json();
      console.log(likeStatus)
      return likeStatus.case;
    } catch (error) {
      console.error(error);
    }
  };

  //post request to the db to add this listing to users likes
  const addToLikes = async (snome_id) => {
    const status = {
      likes: await checkLikes(snome_id),
    };

    if (status.likes) {
      return updateError("You have already liked this Snome", setError)
    } else {
      //console.log(context)
      const likeObj = {
        snome_user_id: context.user_data.user_id,
        snome_id: snome_id,
      };
      axios.post(
        'http://localhost:3000/snome/like/' +
        likeObj.snome_id +
        '/' +
        likeObj.snome_user_id,
        {}
      );
      console.log('you like me!');
      console.log(likeObj);
      //.catch(error)console.error(error);
    }
  };

  return (
    <ScrollView>
      {error ? <Text style={styles.invalidInput}>{error}</Text> : null}
      {listing.map((listing) => (
        <React.Fragment key={listing.snome_id}>
          <View id="listing" style={styles.containerOne}>
            <TouchableOpacity onPress={() => navigation.navigate("Description", { snome_id: listing.snome_id })}>
              <Text style={{ margin: 15, marginTop: 20 }}>{listing.header}</Text>
            </TouchableOpacity>
            <Text>{listing.snome_id}</Text>
            {listing.url.map((url, index) => (
              <React.Fragment key={index}>
                <Image style={styles.pic} source={{ uri: url }} />
              </React.Fragment>
            ))}
            <Text style={{ margin: 15, marginTop: 20 }}>
              {'\n'}
              {listing.description}
              {'\n'}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              title="like this!"
              onPress={() => addToLikes(listing.snome_id)}
            >
              <Text>Like This! </Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerOne: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 1,
    margin: 20,
    padding: 12,
  },
  containerTwo: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    margin: 20,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  pic: {
    flex: 2,
    width: 300,
    height: 500,
    marginTop: 30,
    padding: 10,
    alignSelf: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#448EB1',
    color: 'white',
    fontFamily: 'Arial',
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    marginTop: 20,
  },
  invalidInput: {
    color: 'red',
    backgroundColor: 'lightgray',
    borderColor: 'red',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8,
    width: '95%',
  }
});

export default ListingScreen;
