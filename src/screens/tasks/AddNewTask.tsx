import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import Container from '../../components/Container';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import {TaskModel} from '../../models/TaskModel';
import ButtonComponent from '../../components/ButtonComponent';
import DropdownPicker from '../../components/DropdownPicker';
import { SelectModel } from '../../models/SelectModel';
import firestore from '@react-native-firebase/firestore'

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    await firestore()
    .collection('users')
    .get()
    .then(snap => {

      if(snap.empty) {
        console.log("Users data not found")
      } else {
        const items: SelectModel[] = []

        snap.forEach(item => {
          items.push({
            label: item.data().name,
            value: item.id
          });
        });

        setUserSelect(items);
      }
    })
    .catch((error: any) => {
      console.log(`Can not get users, ${error.message}`);
    });
  }

  const handleChangeValue = (id: string, value: string | string[] | Date) => {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    console.log(taskDetail);
  };

  return (
    <Container isScroll back title="Add new task">
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChange={val => handleChangeValue('description', val)}
          title="Description"
          allowClear
          placeholder="Content"
          multible
          numberOfLine={3}
        />

        <DateTimePickerComponent
          selected={taskDetail.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
          placeholder="Choice"
          type="date"
          title="Due date"
        />

        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              type="time"
              onSelect={val => handleChangeValue('start', val)}
              title="Start"
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.end}
              onSelect={val => handleChangeValue('end', val)}
              title="End"
              type="time"
            />
          </View>
        </RowComponent>

        <DropdownPicker 
          selected={taskDetail.uids}
          items={userSelect}
          onSelect={val => handleChangeValue('uids', val)}
          multible
          title="Members"
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          text="Save"
          onPress={handleAddNewTask}
        />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
