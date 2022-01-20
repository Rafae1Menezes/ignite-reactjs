import { Button, Flex, Stack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input'

type SignInFormData = {
   email: string
   password: string
}

const SignInFormSchema = yup.object().shape({
   email: yup.string().required('E-mail obriatório').email('E-mail inválido'),
   password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
   const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(SignInFormSchema)
   })

   const { errors } = formState

   const handleSignIn: SubmitHandler<SignInFormData> = values => {
      console.log(errors)
   }

   return (
      <Flex w="100vw" h="100vh" align="center" justify="center">
         <Flex
            as="form"
            onSubmit={handleSubmit(handleSignIn)}
            w="100%"
            maxW={360}
            bg="gray.800"
            p="8"
            borderRadius={8}
            flexDir="column"
         >
            <Stack spacing="4">
               <Input
                  name="email"
                  label="E-maiil"
                  type="email"
                  error={errors.email}
                  {...register('email')}
               />
               <Input
                  name="password"
                  label="Senha"
                  type="password"
                  error={errors.password}
                  {...register('password')}
               />
            </Stack>
            <Button
               type="submit"
               mt="6"
               colorScheme="pink"
               size="lg"
               isLoading={formState.isSubmitting}
            >
               Entrar
            </Button>
         </Flex>
      </Flex>
   )
}
