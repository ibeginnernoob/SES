import { StyleSheet } from "react-native";

//@ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';

import { useState } from "react";

import { View, Text, TextInput } from "react-native";

var items = [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
];

type item={
    id:number
    name:string
}

const MAX_HEIGHT = 100;

export default function Main(){
    const [height, setHeight] = useState(40);
    const [selectedItems,setSelectedItems]=useState<[item?]>([])

    return(
        <View className="h-screen flex flex-col justify-center items-center">
            <Text>
                This is the main page
            </Text>
            <TextInput
                style={[styles.input, { height: Math.min(height, MAX_HEIGHT) }]}
                multiline
                onContentSizeChange={(event) =>
                setHeight(event.nativeEvent.contentSize.height)
                }
                placeholder="Type here..."
            />
            {/* <SearchableDropdown 
                placeholder='Dropdown input'
                items={items}
                onItemSelect={(item:{
                    id:Number,
                    name:string
                })=>{
                    setSelectedItem(item)
                }}
                resetValue={false}
                defaultIndex={2}
            /> */}
            <SearchableDropdown
            onItemSelect={(item:{
                id:number,
                name:string
            }) => {
              const items = [...selectedItems];
              items.push(item)
              //@ts-ignore
              setSelectedItems(items);
            }}
            containerStyle={{ padding: 5 }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            selectedItems={selectedItems}
            items={items}
            resetValue={false}
            textInputProps={
              {
                placeholder: "placeholder",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: (text:string) => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        width: 400, 
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        textAlignVertical: "top",
        overflow: "hidden",
    },
});