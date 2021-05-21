import React, { useState, useContext } from 'react'

import { AppAuthContext } from '../services/AppAuthContext'

export const Login: React.FC = () => {
  const { logic } = useContext(AppAuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEvent =
    (
      setter: (val: string) => void
    ): React.ChangeEventHandler<HTMLInputElement> =>
    (val) =>
      setter(val.target.value)

  const submit = () => logic.login(email, password)

  return (
    <div>
      <h3>You are anonymous</h3>
      <h3>Please login</h3>
      <input value={email} type='text' onChange={onChangeEvent(setEmail)} />
      <input
        value={password}
        type='password'
        onChange={onChangeEvent(setPassword)}
      />
      <button onClick={submit}>Login</button>
    </div>
  )
}
