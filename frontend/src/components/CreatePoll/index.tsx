import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useAppDispatch } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { createPoll } from '../../reducers/pollReducer'
import { NewPollObject } from '../../types'
import Button from '../common/Button'
import { CenteredHeader, FormInput, Subtitle } from '../common/styledComponents'
import { ChoiceItem, ExpansionButtons, FormItem, PollFormContainer, SubmitButton } from './styledComponents'

const CreatePoll: React.FC = () => {
  const { control, register, handleSubmit } = useForm()
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])

  const createNewPoll = async (data: NewPollObject) => {
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
      { name: '', color: '#ff0000' },
      { name: '', color: '#0000ff' }]
    )
  }, [])

  // TODO: generate a random hex code for new choices
  const addChoice = () => {
    append({ name: '', color: '#000000' })
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
          <label htmlFor='title'>Name</label>
          <FormInput id='title' {...register('title')} />
        </FormItem>
        <Subtitle>Choices</Subtitle>
        <ExpansionButtons>
          <button onClick={() => addChoice()}>+</button>
          <button onClick={() => removeChoice()}>-</button>
        </ExpansionButtons>
        {fields.map((field, index) => (
          <div key={field.id}>
            <ChoiceItem>
              <FormItem>
                <label
                  htmlFor={`choice${index}Name`}
                >
                  Label
                </label>
                <input
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
                <input
                  type='color'
                  id={`choice${index}Color`}
                  {...register(`choices.${index}.color`)}
                />
              </FormItem>
            </ChoiceItem>
          </div>
        ))}
        <SubmitButton type='submit'>Submit</SubmitButton>
      </form>
    </PollFormContainer>
  )
}

export default CreatePoll