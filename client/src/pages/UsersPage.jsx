import { useEffect, useState } from 'react'
import './user.css'

export default function UsersPage() {
  
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/users')
      const data = await response.json()
      console.log(data)
      setCharacters(data)
    }

    fetchData()

  }, [])

  return <div>
    <table className='table'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
      characters.map(character => {
        return (
          <tr key={character.id}>
            <td>{character.username}</td>
            <td>{character.email}</td>
            <td>Update | Delete</td>
          </tr>
        )
      })
    }
      </tbody>
    </table>
    
  </div>
}