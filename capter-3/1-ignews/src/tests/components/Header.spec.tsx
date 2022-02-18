import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";

jest.mock('next/router',() => {
  return {
    useRouter(){
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession(){
      return {
        data: null,
        status: 'unauthenticated'
      }
    }
  }
})

describe("Header component", () => {

  it('Renders correctçy', () => {
    render(
      <Header />
    )

      screen.logTestingPlaygroundURL()

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})