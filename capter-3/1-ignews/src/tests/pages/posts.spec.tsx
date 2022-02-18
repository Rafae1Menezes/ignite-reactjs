import { render, screen, fireEvent } from "@testing-library/react"
import { useSession } from "next-auth/react"
import Posts, { getStaticProps } from "../../pages/posts"
import { getPrismicClient } from "../../services/prismic"

jest.mock('next-auth/react')
jest.mock('../../services/prismic')

const posts = [
  {
    slug: 'slug-fake',
    title: 'title-fake',
    excerpt: 'excerpt-fake',
    updatedAt: 'updatedAt-fake'
  }
]

describe('Posts Page', () => {
  it('Should render correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: {  activeSubscription: false }} as any)

    render( <Posts posts={posts} />)

    expect(screen.getByText('title-fake')).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const useSessionMocked = jest.mocked(useSession)
    const getPrismicClientMoked = jest.mocked(getPrismicClient)

    useSessionMocked.mockReturnValueOnce({
      data: {  activeSubscription: false }} as any)
      
    getPrismicClientMoked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'may-new-post',
            data: { 
              title:  [{ type: 'heading', text: 'My new post'}],
              content: [{ type: 'paragraph', text: 'Post excerpt'}],
            },
            last_publication_date: '04-01-2021',
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})
    
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'may-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2021'
            }
          ]
        }
      })
    )

  })

})