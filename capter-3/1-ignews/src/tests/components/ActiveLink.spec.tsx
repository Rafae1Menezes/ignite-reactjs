import { render } from '@testing-library/react'
import { get } from 'https'
import { useRouter } from 'next/router'
import { ActiveLInk } from '../../components/ActiveLink'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe("ActiveLink component", () => {

  it('Renders correctly', () => {

    const { getByText } = render(
      <ActiveLInk href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLInk>
    )

    expect(getByText('Home')).toBeInTheDocument()
  })

  it('Is receinging active active class', () => {
    const { asPath } = useRouter()


    const { getByText } = render(
      <ActiveLInk href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLInk>
    )

    expect(getByText('Home')).toHaveClass('active')
  })
})

