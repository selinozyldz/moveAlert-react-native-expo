import { View, Text, Image } from 'react-native';
import React from 'react';

const Header = (props) => {
  return (
    <View style={{ backgroundColor: '#F0F0F0' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 28 }}>
        {props.name}
      </Text>
    </View>
  );
};

export default Header;