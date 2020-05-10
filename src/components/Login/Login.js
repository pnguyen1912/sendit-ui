import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

export default function LogIn(props) {
  const [page, setPage] = React.useState('signin');

  return (
    <div>
      {page === 'signin' && <SignIn setPage={setPage} updateLogin={props.updateLogin} setUser={props.setUser} setUserAddress={props.setUserAddress} />}
      {page === 'signup' && <SignUp setPage={setPage} updateLogin={props.updateLogin} setUser={props.setUser}/>}
    </div>
  )
}