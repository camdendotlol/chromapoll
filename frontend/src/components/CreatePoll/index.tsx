import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { createPoll } from '../../reducers/pollReducer'
import { NewPollObject } from '../../types'
import { CenteredHeader, CenteredSubtitle, FormInput } from '../common/styledComponents'
import { generateRandomColor } from '../lib'
import { ChoiceItem, ExpansionButtons, FormItem, PollFormContainer, SubmitButton } from './styledComponents'

const CreatePoll: React.FC = () => {
  const { control, register, handleSubmit, watch } = useForm()
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])

  const createNewPoll = async (data: NewPollObject) => {
    const dataToSend = {
      title: data.title,
      choices: data.choices.forEach(choice => ({
        name: choice.name,
        color: choice.color
      }))
    }
    try {
      const res = await dispatch(createPoll(data)).unwrap()

      history.push(`/polls/${res.id}`)
    } catch(e) {
      throw new Error(e)
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices'
  })

  // Populate the first two choices on component load
  useEffect(() => {
    append([
      { name: '', color: generateRandomColor() },
      { name: '', color: generateRandomColor() }]
    )
  }, [])

  const addChoice = () => {
    append({ name: '', color: generateRandomColor() })
  }

  const removeChoice = () => {
    if (fields.length > 2) {
      remove(fields.length - 1)
    }
  }

  return (
    <PollFormContainer>
      <CenteredHeader>Create a poll</CenteredHeader>
      <form onSubmit={handleSubmit(createNewPoll)}>
        <FormItem>
          <label htmlFor='title'>Question</label>
          <br />
          <FormInput type='text' id='title' {...register('title')} />
        </FormItem>
        <CenteredSubtitle>Choices</CenteredSubtitle>
        <ExpansionButtons>
          <button
            type='button'
            onClick={() => addChoice()}
          >
            <span>+</span>
          </button>
          <button
            type='button'
            onClick={() => removeChoice()}
          >
            <span>-</span>
          </button>
        </ExpansionButtons>
        {fields.map((field, index) => (
          <ChoiceItem key={field.id}>
            <FormItem>
              <label
                htmlFor={`choice${index}Name`}
              >
                Choice
              </label>
              <br />
              <input
                type='text'
                id={`choice${index}Name`}
                {...register(`choices.${index}.name`)}
              />
            </FormItem>
            <FormItem>
              <label
                htmlFor={`choice${index}Color`}
              >
                Color
              </label>
              <br />
              <input
                type='color'
                id={`choice${index}Color`}
                {...register(`choices.${index}.color`)}
              />
            </FormItem>
          </ChoiceItem>
        ))}
        <SubmitButton type='submit'>Submit</SubmitButton>
      </form>
    </PollFormContainer>
  )
}

export default CreatePoll