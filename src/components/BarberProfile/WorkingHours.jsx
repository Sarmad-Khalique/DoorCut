import React from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme';
import FormInput from '../shared/FormInput';
import Button from '../shared/Button';
import {BarbersContext} from '../../context/barbers/barbers.provider';
import {Switch} from 'react-native-switch';
import {act} from 'react-test-renderer';

const WorkingHours = () => {
  const [active, setActive] = React.useState(false);

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [workingHours, setWorkingHours] = React.useState([
    {
      day: 'Sun',
      active: false,
      from: '',
      to: '',
    },
    {
      day: 'Mon',
      active: false,
      from: '',
      to: '',
    },
    {
      day: 'Tue',
      active: false,
      from: '',
      to: '',
    },
    {
      day: 'Wed',
      active: false,
      from: '',
      to: '',
    },
    {
      day: 'Thu',
      active: false,
      from: '',
      to: '',
    },
    {
      day: 'Fri',
      active: false,
      from: '',
      to: '',
    },
    {
      day: 'Sat',
      active: false,
      from: '',
      to: '',
    },
  ]);

  const time = [
    {key: '1:00', value: '1:00'},
    {key: '2:00', value: '2:00'},
    {key: '3:00', value: '3:00'},
    {key: '4:00', value: '4:00'},
    {key: '5:00', value: '5:00'},
    {key: '6:00', value: '6:00'},
    {key: '7:00', value: '7:00'},
    {key: '8:00', value: '8:00'},
    {key: '9:00', value: '9:00'},
    {key: '10:00', value: '10:00'},
    {key: '11:00', value: '11:00'},
    {key: '12:00', value: '12:00'},
    {key: '13:00', value: '13:00'},
    {key: '14:00', value: '14:00'},
    {key: '15:00', value: '15:00'},
    {key: '16:00', value: '16:00'},
    {key: '17:00', value: '17:00'},
    {key: '18:00', value: '18:00'},
    {key: '19:00', value: '19:00'},
    {key: '20:00', value: '20:00'},
    {key: '21:00', value: '21:00'},
    {key: '22:00', value: '22:00'},
    {key: '23:00', value: '23:00'},
    {key: '24:00', value: '24:00'},
  ];

  return (
    <ScrollView
      style={{
        marginBottom: '20%',
      }}>
      {DAYS.map((day, index) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View
            style={{
              height: '100%',
              backgroundColor: COLORS.white,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <Switch
              value={active}
              onValueChange={val => setActive(val)}
              disabled={false}
              circleSize={20}
              backgroundActive={COLORS.primary}
              backgroundInactive={'#E300001A'}
              circleActiveColor={COLORS.white}
              circleInActiveColor={COLORS.primary}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }} // style for inner animated circle for what you (may) be rendering inside the circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
            <Text
              style={{
                fontSize: 14,
                color: COLORS.textPrimary,
                marginLeft: 10,
                fontFamily: 'Montserrat',
              }}>
              {day}
            </Text>
          </View>
          <FormInput
            type="select"
            setSelected={val => {
              console.log(val);
            }}
            search={false}
            data={time}
            defaultOption={{key: '1:00', value: '1:00'}}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default WorkingHours;
