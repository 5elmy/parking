import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";

export function FormForFine({ele}) {
  let [loading, setLoading] = useState(false)


  let updateFine = useFormik({
    initialValues:{
      fine:ele.fine
    },
    onSubmit: async (values) => {
      console.log(
        { values }
      );
        setLoading(true)
      await axios.put(`http://128.16.66.98:9090/api/Configs/fine`,values).then(res=>{
        console.log({res});
           setLoading(false);
           notify({msg:"update Fine Successfully", type:"success"})

      }).catch(err=>{
        console.log(err);
        setLoading(false);
      })
    }
  })


  return (
    <>





    <form onSubmit={updateFine.handleSubmit} className="flex justify-between items-center gap-5 w-[90%] my-3 ">
      <Input name="fine" onChange={updateFine.handleChange} onBlur={updateFine.handleBlur} defaultValue={ele.fine} placeholder="Enter fine..." className="text-[18px]" />
      <Button type="submit" className="bg-[#09c] text-white">
      {loading?  <Spinner color="current" /> :"Save"}
      </Button>
    </form>


    
    
    </>
  );
}