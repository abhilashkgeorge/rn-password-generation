import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Formik } from 'formik'

//Form Validation 
import * as Yup from 'yup'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .required("Password is mandatory")
})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = ''
    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const digits = '1234567890'
    const specialCharacters = '!@#$%^&*()-_+=?><|'

    if (lowerCase) {
      characterList += lowerCaseCharacters
    }

    if (upperCase) {
      characterList += upperCaseCharacters
    }

    if (number) {
      characterList += digits
    }

    if (symbol) {
      characterList += specialCharacters
    }

    const passwordResult  = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPasswordGenerated(true)

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setLowerCase(false)
    setUpperCase(false)
    setIsPasswordGenerated(false)
    setNumber(false)
    setSymbol(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> Password Generator </Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={ values => {
              console.log(values)
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleReset,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <>
                  <View style={styles.inputColumn}>
                    <Text style={styles.inputLabel}>Password Length</Text>
                    <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex 8'
                    keyboardType='numeric'
                    />
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}> Include Lowercase </Text>
                      <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowerCase}
                      onPress={() => { setLowerCase(!lowerCase)}} 
                      fillColor='red'
                      ></BouncyCheckbox>
                </View>
                      
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}> Include Uppercase </Text>
                      <BouncyCheckbox
                      disableBuiltInState
                      isChecked={upperCase}
                      onPress={() => { setUpperCase(!upperCase)}} 
                      fillColor='green'
                      ></BouncyCheckbox>
                </View>
                
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}> Include Number </Text>
                      <BouncyCheckbox
                      disableBuiltInState
                      isChecked={number}
                      onPress={() => { setNumber(!number)}} 
                      fillColor='blue'
                      ></BouncyCheckbox>
                </View>
               
                <View style={styles.inputWrapper}>
                <Text style={styles.heading}> Include Symbols </Text>
                      <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbol}
                      onPress={() => { setSymbol(!symbol)}} 
                      fillColor='orange'
                      ></BouncyCheckbox>
                </View>
                

                <View style={styles.formActions}>
                  <TouchableOpacity
                  disabled={!isValid}
                  style={styles.primaryButton}
                  onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    handleReset()
                    resetPasswordState()
                  }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>

                </View>


              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text selectable style={styles.passwordText}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {},
  formContainer: {},
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginTop: 30,
  }, 
  formActions: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    marginHorizontal: 8,
    marginTop: 10,
  },
  buttonText: {},
  inputWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    padding: 6,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    elevation: 2
    
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 15, 
    marginVertical: 10,

  }, 
  inputColumn: {
    elevation: 6, 
    borderRadius: 10, 
    marginHorizontal: 15, 
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
  }, 
  inputStyle: {
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    fontWeight: '400',
    marginVertical: 10,
    elevation: 4,
    backgroundColor: '#EDEDED',
    
  }, 
  errorText: {
    color: 'red', 
    fontSize: 12, 
    fontWeight: '600', 
    marginHorizontal: 15,
  },
  heading: {
    fontSize: 15, 
    fontWeight: '600',
    marginHorizontal: 15
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 4
  },
  secondaryButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 4,
  },
  passwordText: {
    fontSize: 18,
    fontWeight: '800',
    marginHorizontal: 15, 
    marginVertical: 10,
    color: 'green'
  },
  card: {
    marginHorizontal: 16, 
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  cardElevated: {
    elevation: 4,
    shadowColor: 'green',
    shadowOffset: {
      width: 1, 
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1, 

  },

}) 