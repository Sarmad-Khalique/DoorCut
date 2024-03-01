import ZIM from 'zego-zim-react-native';

ZIM.create({appID: 0, appSign: ''});

var zim = ZIM.getInstance();

var userInfo = {userID: 'xxxx', userName: 'xxxx'};

zim
  .login(userInfo, '')
  .then(function () {
    // Login successful.
  })
  .catch(function (err) {
    // Login failed.
  });

  var toUserID = 'xxxx1';
var config = { 
    priority: 1 // Set priority for the message. 1: Low (by default). 2: Medium. 3: High.
};
var type = 0; // Session type. Values are: 0: One-on-one chat.  1: Chat room  2: Group chat.
var notification = {
    onMessageAttached: function(message) {
        // todo: Loading
    }
};

// Send one-to-one text messages. 
var messageTextObj = { type: 1, message: 'Text message content' };
zim.sendMessage(messageTextObj, toUserID, type, config, notification)
    .then(function ({ message }) {
        // Message sent successfully.
    })
    .catch(function (err) {
        // Failed to send the message.
    });