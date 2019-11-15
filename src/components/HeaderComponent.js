import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Button, Icon } from "native-base"

const HeaderComponent = ({ handleSearch, handleQ }) => {
  return <View style={styles.headerWrapper}>
          <TextInput 
            onSubmitEditing={ handleSearch }
            style={styles.searchInput}
            placeholder="Search"
            autoFocus={true}
            placeholderTextColor= "white"
            onChangeText={(keyword) => handleQ(keyword) } />
          <Button 
            transparent 
            onPress={ handleSearch }>
            <Icon name="ios-search" style={styles.headerText} />
          </Button>
        </View>
}

const styles = StyleSheet.create({
  headerWrapper: { 
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  searchInput: { 
    fontSize: 21, 
    flex: 1,
    margin:0, 
    padding:0, 
    width: "100%",
    color: "#FFF"
  },
  headerText: {
    color: "#FFF"
  }
})

export default HeaderComponent