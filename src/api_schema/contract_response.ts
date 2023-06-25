// type ContractRes struct {
//    Id             uuid.UUID `json:"id"`
//    Counter        uint      `json:"counter"`
//    Name           string    `json:"name"`
//    SupplierId     uuid.UUID `json:"supplierId"`
//    SupplierEmail  string    `json:"supplierEmail"`
//    SupplierStatus bool      `json:"supplierStatus"`
//    CableAmount    uint      `json:"cableAmount"`
//    Stock          uint      `json:"stock"`
//    StartDay       time.Time `json:"startDay"`
//    EndDay         time.Time `json:"endDay"`
//    IsAvailable    bool      `json:"isAvailable"`
//    CreatedAt      time.Time `json:"createdAt"`
// }

interface ContractRes
{
   id: string
   counter: number
   name: string //
   supplierId: string
   supplierEmail: string //
   supplierStatus: boolean
   cableAmount: number //
   stock: number //
   startDay: Date //
   endDay: Date //
   isAvailable: boolean //
   createdAt: Date
}
export default ContractRes