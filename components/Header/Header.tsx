import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Header;
