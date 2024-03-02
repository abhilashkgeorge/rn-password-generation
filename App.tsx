import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'

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

  const generatePasswordString = (passwordLength: Number) => {
    
  }


  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})