import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const joinPlanet = async variables => {
  const { login } = await request(
    null,
    gql`
      mutation joinPlanet($name: String!) {
        joinPlanet(name: $name)
      }
    `,
    variables
  )
  return login
}

export const useJoinPlanetMutation = () => useMutation(joinPlanet)