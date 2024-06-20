import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Dimensions,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {SvgTop} from '../components/SvgTop';
import { ButtonGradient } from '../components/ButtonGradient';
import { useAppDispatch, useAppSelector } from '../Redux/Store/hook';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../types';
import { setAuthenticated } from '../Redux/ReducerConfig/Reducers/Aunthenticated';

const { width } = Dimensions.get('window');

interface FormData {
  email: string;
  password: string;
}

export const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.AuthenticatedSlice);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const showToast = (error: string) => {
    ToastAndroid.show(error, ToastAndroid.SHORT);
  };

  const onSubmit = (data: FormData) => {
    const findUser = users.find(
      user =>
        user.email.toLowerCase().trim() === data.email.toLowerCase().trim(),
    );

    try {
      if (!findUser) {
        throw new Error('No existing user');
      }

      if (
        findUser.password.toLowerCase().trim() !==
        data.password.toLowerCase().trim()
      ) {
        throw new Error('Invalid password');
      }

      //Authentication Success
      dispatch(setAuthenticated(true));
      navigation.navigate('TabBottomScreen');
      showToast(`Welcome ${findUser.name}`);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      } else {
        showToast('An unknown error occurred');
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <SvgTop />
      </View>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Sign In to your account</Text>

        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                placeholder="example@gmail.com"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                placeholder="password"
                placeholderTextColor={'gray'}
                style={styles.textInput}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
          name="password"
        />

        <Text style={styles.forgotPassword}>Forgot your password?</Text>
          <ButtonGradient onSubmit={handleSubmit(onSubmit)} />
        <Text style={styles.forgotPassword}>Don't have an account?</Text>
        <StatusBar barStyle={'default'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  containerSVG: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 20,
    color: '#101010',
  },
  textInput: {
    padding: 10,
    color: '#000',
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
});
