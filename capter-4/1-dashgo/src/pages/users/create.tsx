import {
   Box,
   Button,
   Divider,
   Flex,
   Heading,
   HStack,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

type CreateUserFormData = {
   name: string
   email: string
   password: string
   password_confirmation: string
}

const CreateUserFormSchema = yup.object().shape({
   name: yup.string().required('Nome obriatório'),
   email: yup.string().required('E-mail obriatório').email('E-mail inválido'),
   password: yup
      .string()
      .required('Senha obrigatória')
      .min(6, 'No minimo 6 caracteres'),
   password_confirmation: yup.string().oneOf([null, yup.ref('password')],"As senhas não conferem"),
})

export default function CreateUser() {
   const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(CreateUserFormSchema),
   })

   const { errors } = formState

   const handleCreateUser: SubmitHandler<CreateUserFormData> = values => {
      console.log(values)
   }

   return (
      <Box>
         <Header />

         <Flex w="100%" my={6} maxWidth={1480} mx="auto" px={6}>
            <Sidebar />

            <Box
               as="form"
               onSubmit={handleSubmit(handleCreateUser)}
               flex="1"
               borderRadius={8}
               bg="gray.800"
               p={['6', '8']}
            >
               <Heading size="lg" fontWeight="normal">
                  Criar usuário
               </Heading>
               <Divider my="6" borderColor="gray.700" />
               <VStack spacing={['6', '8']}>
                  <SimpleGrid
                     minChildWidth="240px"
                     spacing={['6', '8']}
                     w="100%"
                  >
                     <Input
                        name="name"
                        label="name"
                        {...register('name')}
                        error={errors.name}
                     />
                     {
                        <Input
                           name="email"
                           label="E-mail"
                           {...register('email')}
                           error={errors.email}
                        />
                     }
                  </SimpleGrid>
                  <SimpleGrid
                     minChildWidth="240px"
                     spacing={['6', '8']}
                     w="100%"
                  >
                     {
                        <Input
                           name="password"
                           type="password"
                           label="Senha"
                           {...register('password')}
                           error={errors.password}
                        />
                     }
                     {
                        <Input
                           name="password_confirmation"
                           type="password"
                           label="Confirmação da senha"
                           {...register('password_confirmation')}
                           error={errors.password_confirmation}
                        />
                     }
                  </SimpleGrid>
               </VStack>
               <Flex mt={8} justify="flex-end">
                  <HStack spacing={4}>
                     <Link href="/users" passHref>
                        <Button colorScheme="whiteAlpha">Cancelar</Button>
                     </Link>
                     <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                        Salvar
                     </Button>
                  </HStack>
               </Flex>
            </Box>
         </Flex>
      </Box>
   )
}
