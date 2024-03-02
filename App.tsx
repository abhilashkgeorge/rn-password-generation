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
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})