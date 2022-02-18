import { render, screen } from "@testing-library/react"
import { getSession } from "next-auth/react"
import Post, { getServerSideProps } from "../../pages/posts/[slug]"
import { getPrismicClient } from "../../services/prismic"

jest.mock("next-auth/react")
jest.mock("../../services/prismic")

const post = {
  slug: 'my-slug-fake',
  title: 'My Title Fake',
  content: 'Content Fake',
  updateAt: '14 de abril de 2015'
}

describe('Post Page', () => {

  it('Should render correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My Title Fake')).toBeInTheDocument()
    expect(screen.getByText('Content Fake')).toBeInTheDocument()
  })

  it('Redirects user if no subsciption is found', async () => {
    const getSessionMocked = jest.mocked(getSession)

    getSessionMocked.mockResolvedValue(null)

    const response = await getServerSideProps({ params: { slug: 'my-slug-fake'}} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
          permanent: false,
       })
      })
    )
  })

  it('Loads initial data', async() => {
    const getSessionMocked = jest.mocked(getSession)
    const getPrismicClientMocked = jest.mocked(getPrismicClient)

    getSessionMocked.mockResolvedValue({ activeSubscription: true } as any)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new post'}],
          content: [{ type: 'paragraph', text: 'Post excerpt'}]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getServerSideProps({ params: { slug: 'my-slug-fake'}} as any)

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