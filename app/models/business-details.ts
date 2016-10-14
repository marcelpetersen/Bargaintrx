export class BusinessDetailsModel
{

    constructor(
    public key:string,
    public name:string,
    public email:string,
    public phone:string,
    public address:string,
    public city:string,
    public state:string,
    public pin:number,
    public category:string,
    public imageURL:string,
    public rating:string,
    public distance:string,
    public location:number[]
    )
    {
         
    }

}