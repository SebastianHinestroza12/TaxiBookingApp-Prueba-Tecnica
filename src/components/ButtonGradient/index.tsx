import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const ButtonGradient = ({ onSubmit }: {onSubmit: any}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=> onSubmit()}>
      <LinearGradient
        colors={['#FFB84D', '#E38800']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.button}>
        <Text style={styles.text}>SIGN IN</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 200,
    marginTop: 60,
  },

  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
