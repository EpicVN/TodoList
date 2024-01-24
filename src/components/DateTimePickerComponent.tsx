import { ArrowDown2, CloseCircle, Crop } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Button, Modal, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import ButtonComponent from './ButtonComponent';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title: string;
  placeholder?: string;
  selected?: Date;
  onSelect: (val: Date) => void;
}

const DateTimePickerComponent = (props: Props) => {
  const {selected, onSelect, placeholder, title, type} = props;

  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);
  const [date, setDate] = useState(selected ?? new Date());
  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title}/>}
        <RowComponent
          onPress={() => setIsVisibleModalDateTime(true)}
          styles={[
            globalStyles.inputContainer,
            {marginTop: title ? 8 : 0, paddingVertical: 16}
        ]}>
          <TextComponent 
            flex={1}
            text={
              selected
                ? type === 'time'
                  ? `${selected.getHours()}:${selected.getMinutes()}`
                  : `${selected.getDate()}/${
                      selected.getMonth() + 1
                    }/${selected.getFullYear()}`
                : placeholder
                ? placeholder
                : ''
            }
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text}/>
        </RowComponent>
      </View>

      <Modal 
        visible={isVisibleModalDateTime} 
        transparent
        animationType='slide'
      >
        <View 
          style={{
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        >
            <View 
              style={{
                margin: 20, 
                width: '90%',
                backgroundColor: colors.white,
                padding: 20,
                borderRadius: 20
              }}
            >
              <View 
                style={{
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <TitleComponent text="Date time picker" color={colors.blue}/>
                <CloseCircle
                  size="32"
                  color = {colors.blue}
                  onPress={() => setIsVisibleModalDateTime(false)}
                />
              </View>

              <SpaceComponent height={10}/>

              <View>
                <DatePicker 
                  mode={type}
                  date={date}
                  onDateChange={val => setDate(val)}
                  androidVariant = 'nativeAndroid'
                  textColor={colors.gray}
                  locale='vi'
                />
              </View>

              <SpaceComponent height={20}/>

              <ButtonComponent
                text="Confirm"
                onPress={() => {
                  onSelect(date);
                  setIsVisibleModalDateTime(false)
                }}
              />
            </View>
        </View>
      </Modal>
    </>
  );
};

export default DateTimePickerComponent;
