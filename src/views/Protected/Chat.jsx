import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import ZIM from 'zego-zim-react-native';
import useLoading from '../../hooks/useLoading';
import WithLoader from '../../components/HOC/WithLoader';
import BottomNavigation from '../../components/shared/BottomNavigation';
import useAuth from '../../hooks/useAuth';
import {CarousalImage} from '../../constants';
import FormInput from '../../components/shared/FormInput';
import {BarbersContext} from '../../context/barbers/barbers.provider';

const Chat = ({route}) => {
  const {conversation_id, barber_image, barber_name} = route.params || {};
  const [messages, setMessages] = React.useState([]);
  const [conversationId, setConversationId] = React.useState(conversation_id);
  const [showModal, setShowModal] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const navigation = useNavigation();
  const {setLoading} = useLoading();

  const {fetchBarbers, allBarbers: barbers} = React.useContext(BarbersContext);

  const {user} = useAuth();

  ZIM.create({
    appID: 537731057,
    appSign: '4d3b408cb138eb8e6eae1936d2a9f388e7d92138cfc12cced9e4735fa6645d2a',
  });
  const zim = ZIM.getInstance();
  zim.on('error', function (zim, errorInfo) {
    console.log('Chat Error: ', errorInfo.code, errorInfo.message);
  });

  // Set up and listen for the callback for connection status changes.
  zim.on(
    'connectionStateChanged',
    function (zim, {state, event, extendedData}) {
      console.log('Chat ConnectionStateChanged', state, event, extendedData);
    },
  );

  // Set up and listen for the callback for receiving one-to-one messages.
  zim.on(
    'receivePeerMessage',
    function (zim, {messageList, fromConversationID}) {
      console.log('Chat ReceivePeerMessage', messageList, fromConversationID);
      setMessages([...messageList, messages]);
    },
  );

  const conversationType = 0; // Conversation type, 1-on-1 chat: 0. In-room chat: 1. Group chat: 2.
  let config = {
    nextMessage: null, // NextMessage is null on the first query.
    count: 30,
    reverse: true,
    priority: 3,
  };

  const sendMessage = () => {
    const messageTextObj = {
      type: 1,
      message: message,
    };

    const notification = {
      onMessageAttached: function (message) {
        setLoading(true);
      },
    };

    zim
      .sendMessage(
        messageTextObj,
        conversationId,
        conversationType,
        config,
        notification,
      )
      .then(function ({message}) {
        // Extension info of the message (optional)
        console.log('Chat Message Sent: ', messages);
        setMessages([...messages, message]);
        setMessage('');
      })
      .catch(function (err) {
        // Extension info of the message (optional)
        console.log('Chat Error: ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchMessages = () => {
    console.log('Fetching Messages ', conversationId);
    zim
      .queryHistoryMessage(conversationId, 0, config)
      .then(({messageList}) => {
        console.log('Chat Messages: ', messageList);
        setMessages([...messageList, messages]);
      })
      .catch(err => console.log('Fetch Messages Error: ', err))
      .finally(() => {
        setLoading(false);
      });
  };

  const login = () => {
    zim
      .login({
        userID: `${user.user.name}_${user.user.userId}`,
        userName: user.user.name,
      })
      .then(function () {
        setLoading(false);
        fetchMessages();
      })
      .catch(function (err) {
        setLoading(false);
        console.log('Chat Error: ', err);
        Alert.alert('Error', 'Failed to login to chat', [
          {
            text: 'Retry',
            onPress: () => login(),
          },
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
          },
        ]);
      });
  };

  useEffect(() => {
    fetchBarbers();
    login();

    return () => {
      zim.logout();
    };
  }, []);

  useEffect(() => {
    if (conversationId) fetchMessages();
  }, [conversationId]);

  return (
    <WithLoader>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 20,
              opacity: 0,
            }}
            onPress={() => navigation.goBack()}>
            <AntDesignIcons name="arrowleft" size={25} color={COLORS.primary} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Montserrat',
              fontWeight: '500',
              color: COLORS.textPrimary,
            }}>
            Messages
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: COLORS.white,
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate('Notifications')}>
            <IonIcons
              name="notifications-outline"
              size={25}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginTop: 20,
                paddingHorizontal: 40,
              }}
              placeholder="Search"
              onChangeText={text => console.log(text)}
            />
            <AntDesignIcons
              name="search1"
              size={20}
              color={COLORS.primary}
              style={{
                position: 'absolute',
                top: 30,
                left: 10,
              }}
            />
          </View>
        </View>
        <FlatList
          data={barbers}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 70,
                  backgroundColor: COLORS.white,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 20,
                  marginHorizontal: '5%',
                  borderRadius: 10,
                }}
                onPress={() => {
                  setShowModal(true);
                  setConversationId(`${item.name}_${item.userId}`);
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={item.image || CarousalImage}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat',
                      fontWeight: '500',
                      color: COLORS.textPrimary,
                      marginLeft: 10,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <BottomNavigation active={'chat'} />
        <Modal
          visible={showModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowModal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.gray,
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: COLORS.gray,
                padding: 10,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: COLORS.white,
                    borderRadius: 20,
                  }}
                  onPress={() => setShowModal(false)}>
                  <AntDesignIcons
                    name="arrowleft"
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={barber_image || CarousalImage}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginEnd: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Montserrat',
                      fontWeight: '500',
                      color: COLORS.textPrimary,
                    }}>
                    {conversationId?.split('_')[0]}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: COLORS.white,
                    borderRadius: 20,
                    opacity: 0,
                  }}
                  onPress={() => navigation.navigate('Notifications')}>
                  <IonIcons
                    name="notifications-outline"
                    size={25}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginBottom: '45%',
              }}>
              <FlatList
                data={messages}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width: '100%',
                        padding: 10,
                        flexDirection:
                          item.senderUserID === conversationId
                            ? 'row'
                            : 'row-reverse',
                      }}>
                      <View
                        style={{
                          backgroundColor:
                            item.senderUserID === conversationId
                              ? COLORS.white
                              : COLORS.primary,
                          padding: 10,
                          borderRadius: 10,
                          marginHorizontal: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color:
                              item.senderUserID === conversationId
                                ? COLORS.textPrimary
                                : COLORS.white,
                            fontFamily: 'Montserrat',
                          }}>
                          {item.message}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: '10%',
                backgroundColor: COLORS.white,
                position: 'absolute',
                bottom: 0,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  height: 40,
                  borderRadius: 10,
                  padding: 10,
                  width: '80%',
                  marginStart: '10%',
                  backgroundColor: '#DADADA',
                }}
                placeholder="Type here"
                value={message}
                onChangeText={text => setMessage(text)}
              />
              <TouchableOpacity
                style={{
                  padding: 10,
                }}
                onPress={() => sendMessage()}>
                <IonIcons name="send" size={25} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </WithLoader>
  );
};

export default Chat;
