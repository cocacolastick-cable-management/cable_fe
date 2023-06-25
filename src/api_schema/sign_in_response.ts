interface SignInResponse
{
   email: string
   role: string
   name: string
   authToken: {
      accessToken: string,
      refreshToken: string
   }
}

export default SignInResponse