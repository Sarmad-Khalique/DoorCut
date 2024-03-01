import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../theme';

const TabContainer = ({onActiveTabChange, isBarber}) => {
  const BarberTabs = [
    {
      id: 1,
      title: 'Offers',
      active: true,
    },
    {
      id: 2,
      title: 'Ongoing',
      active: false,
    },
    {
      id: 3,
      title: 'Completed',
      active: false,
    },
    {
      id: 4,
      title: 'Cancelled',
      active: false,
    },
  ];
  const clientTabs = [
    {
      id: 1,
      title: 'Services',
      active: true,
    },
    {
      id: 2,
      title: 'Packages',
      active: false,
    },
    {
      id: 3,
      title: 'Gallery',
      active: false,
    },
    {
      id: 4,
      title: 'Review',
      active: false,
    },
    {
      id: 5,
      title: 'About',
      active: false,
    },
  ];
  const [tabs, setTabs] = React.useState([]);

  React.useEffect(() => {
    if (isBarber) {
      setTabs(BarberTabs);
    } else {
      setTabs(clientTabs);
    }
  }, [isBarber]);
  return (
    <View style={styles.container}>
      <View style={isBarber ? styles.barbersTabList : styles.tabsList}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabItem,
              {
                borderBottomColor: item.active ? COLORS.primary : 'transparent',
                borderBottomWidth: item.active ? 4 : 0,
              },
            ]}
            onPress={() => {
              const newTabs = tabs.map(tab =>
                tab.id === item.id
                  ? {...tab, active: true}
                  : {...tab, active: false},
              );
              onActiveTabChange(item.title);
              setTabs(newTabs);
            }}>
            <Text
              style={{
                color: item.active ? COLORS.primary : COLORS.textSecondary,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TabContainer;

const styles = StyleSheet.create({
  tabsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  barbersTabList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
});
