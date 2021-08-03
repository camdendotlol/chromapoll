import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'

const CreatePoll: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])

  return (
   <form onSubmit={handleSubmit(() => console.log('submitted!'))}>
     <input defaultValue="first" {...register("first")} />
   </form>
  )
}

export default CreatePoll