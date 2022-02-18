import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import PostPreview, { getStaticProps } from "../../pages/posts/preview/[slug]"
import { getPrismicClient } from "../../services/prismic"

jest.mock("next-auth/react")
jest.mock("../../services/prismic")
jest.mock("next/router")

const post = {
  slug: 'my-slug-fake',
  title: 'My Title Fake',
  content: 'Content Fake',
  updateAt: '14 de abril de 2015'
}

describe('Post Preview Page', () => {

  it('Should render correctly', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({} as any)

    render(<PostPreview post={post} />)

    expect(screen.getByText('My Title Fake')).toBeInTheDocument()
    expect(screen.getByText('Content Fake')).toBeInTheDocument()
    expect(screen.getByText('Wanna continuew reading?')).toBeInTheDocument()
  })

  it('Redirects user if subscription is found', async () => {
    const useSessionMocked = jest.mocked(useSession)
    const useRouterMocked = jest.mocked(useRouter)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: true
      }
    } as any)
    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<PostPreview post={post} />)

    expect(pushMocked).toHaveBeenCalled()
    
  })

  it('Loads initial data', async() => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new post'}],
          content: [{ type: 'paragraph', text: 'Post excerpt'}]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getStaticProps({ params: { slug: 'my-slug-fake'}} as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-slug-fake',
            title: 'My new post',
            content: '<p>Post excerpt</p>',
            updateAt: '01 de abril de 2021'
          }
        }
      })
    )

  })
})