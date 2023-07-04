import axios, { AxiosError } from "axios";





export class axiosError extends Error {
    
    public response;
    public status;

    constructor(err:AxiosError)
    {
    super(err.message)
    this.response=err.response
    this.status=err.status
    }

    toString()
    {
        const error =`\naxios message: ${this.message}\nstatus: ${this.status} \nresponse error: ${this.response?JSON.stringify(this.response.data,null,2):" No responses "}`
        return error        
    }
}


export default function errorHandler(err:any)
{
if(err instanceof AxiosError)
{   
    const axiosError_ = new axiosError(err)
    console.error(axiosError_.toString());
}
else{
    console.error("errorHandler: ",err)
    console.error(JSON.stringify(err,null,2))
}
}