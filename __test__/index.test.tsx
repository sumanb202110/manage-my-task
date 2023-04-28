import { fireEvent, render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '../pages/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { act } from 'react-dom/test-utils'

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <Provider store={store}>

        <Home tasks={[]} />
      </Provider>
    )

    const heading = screen.getByRole('heading', {
      name: "Manage my task",
    })

    expect(heading).toBeInTheDocument()
  })

  it('home getStaticProps check ', async () => {
    const props  = await getStaticProps()
    
    expect(props.props.tasks.length).toBeGreaterThan(0)
  })

  it('change username', async () => {
    const handleEditFunc = jest.fn();


    await act(async () => render(
      <Provider store={store}>

        <Home tasks={[]} />
      </Provider>
  ));

    const usernameHeading = screen.getByText('UserName : Test user')
    expect(usernameHeading).toBeInTheDocument()


    
    const usernameEditButton = screen.getByTestId('username-tag-edit-button')
    fireEvent.change(usernameEditButton, {target: {onclick: handleEditFunc}})

    fireEvent.click(usernameEditButton)


    expect(handleEditFunc).toHaveBeenCalled();

    const usernameInput = screen.getByTestId('username-tag-input')
    fireEvent.change(usernameInput.querySelector('input') as HTMLInputElement, {target: {value: "suman"}})

    const usernameSaveButton = screen.getByTestId('username-tag-save-button')
    fireEvent.click(usernameSaveButton)

    const usernameHeadingChanged = screen.getByText('UserName : suman')
    expect(usernameHeadingChanged).toBeInTheDocument()



  })
})