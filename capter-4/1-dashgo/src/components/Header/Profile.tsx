import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
   showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
   return (
      <Flex align="center">
         {showProfileData && (
            <Box mr={4} textAlign="right">
               <Text>Rafael Menezes</Text>
               <Text color="gray.300" fontSize="small">
                  menezes@gmail.com
               </Text>
            </Box>
         )}
         <Avatar
            size="md"
            name="Rafael Menezes"
            src="https://avatars.githubusercontent.com/u/89926211?v=4"
         />
      </Flex>
   )
}
