// type UserRes struct {
//    Id        uuid.UUID `json:"id"`
//    Name      string    `json:"name"`
//    Email     string    `json:"email"`
//    Role      string    `json:"role"`
//    IsActive  bool      `json:"isActive"`
//    CreatedAt time.Time `json:"createdAt"`
// }

interface UserRes
{
   id: string
   name: string
   email: string
   role: string
   isActive: boolean
   createdAt: Date
}

export default UserRes