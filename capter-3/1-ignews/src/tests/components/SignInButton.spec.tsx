import { render, screen } from "@testing-library/react"
import { mocked } from 'ts-jest/utils'
import { useSession } from "next-auth/react"
import { SignInButton } from "../../components/SignInButton"

jest.mock('next-auth/react')

describe('Sign In Button component', () => {

  it('Render correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValue({
      data: null,
      status: 'unauthenticated'
    })
    render(<SignInButton />)  
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('Render correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValue({
      data: {user: { name: 'Rafael'}} as any,
      status: 'authenticated'
    })
    render(<SignInButton />)  
    expect(screen.getByText('Rafael')).toBeInTheDocument()
  })
  
})