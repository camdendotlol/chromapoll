import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useHistory } from 'react-router'
import { useTrail } from 'react-spring'
import { useAppDispatch } from '../../hooks'
import { resetUIColor } from '../../reducers/colorReducer'
import { setErrorMessage } from '../../reducers/errorReducer'
import { createPoll } from '../../reducers/pollReducer'
import { NewPollObject } from '../../types'
import { CenteredHeader, CenteredSubtitle, FormInput } from '../common/styledComponents'
import { generateRandomColor } from '../lib'
import { ChoiceItem, ExpansionButtons, FormItem, PollFormContainer, SubmitButton } from './styledComponents'
import errorMessages from '../../errorMessages'

const CreatePoll: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    document.title = 'Chromapoll - Create a poll'
  }, [])

  useEffect(() => {
    dispatch(resetUIColor())
  }, [])

  const createNewPoll = async (data: NewPollObject) => {
    try {
      const res = await dispatch(createPoll(data)).unwrap()
      history.push(`/poll/${res._id}`)
    } catch(e) {
      dispatch(setErrorMessage(e.message))
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

  const trail = useTrail(fields.length, {
    from: { opacity: 0, translateY: '-30px' },
    to: { opacity: 1, translateY: '0px' },
    config: {
      duration: 120
    }
  })

  const addChoice = () => {
    if (fields.length < 8) {
      append({ name: '', color: generateRandomColor() })
    }
  }

  const removeChoice = () => {
    if (fields.length > 2) {
      remove(fields.length - 1)
    }
  }

  const handleAddButton = () => {
    if (fields.length < 8) {
      return (
        <button
          type='button'
          onClick={() => addChoice()}
        >
          <span>+</span>
        </button>
      )
    }
  }

  const handleRemoveButton = () => {
    if (fields.length > 2) {
      return (
        <button
          type='button'
          onClick={() => removeChoice()}
        >
          <span>-</span>
        </button>
      )
    }
  }

  return (
    <PollFormContainer>
      <CenteredHeader>Create a poll</CenteredHeader>
      <form onSubmit={handleSubmit(createNewPoll)}>
        <FormItem>
          <label htmlFor='title'>Question</label>
          <br />
          <ErrorMessage errors={errors} name='title' />
          <FormInput type='text' id='title' {...register('title', {
            required: 'Title is required.',
            maxLength: {
              value: 64,
              message: errorMessages.TooLong('Titles', 64)
            }
          })} />
        </FormItem>
        <CenteredSubtitle>Choices</CenteredSubtitle>
        {trail.map((style, index) => (
          <div key={index}>
            <ErrorMessage errors={errors} name={`choices.${index}.name`} />
            <ErrorMessage errors={errors} name={`choices.${index}.color`} />
            <ChoiceItem style={style}>
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
                  {...register(`choices.${index}.name`,
                    {
                      required: errorMessages.MissingLabel, maxLength: {
                        value: 32,
                        message: errorMessages.TooLong('Choices', 32)
                      }
                    })}
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
                  {...register(`choices.${index}.color`, {
                    required: errorMessages.MissingColor,
                    pattern: /^#[A-Fa-f0-9]{6}$/
                  })}
                />
              </FormItem>
            </ChoiceItem>
          </div>
        ))}
        <ExpansionButtons>
          {handleAddButton()}
          {handleRemoveButton()}
        </ExpansionButtons>
        <SubmitButton type='submit'>Submit</SubmitButton>
      </form>
    </PollFormContainer>
  )
}

export default CreatePoll