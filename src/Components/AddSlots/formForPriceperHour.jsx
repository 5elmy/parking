import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";

export function FormForPricePerHour({ele}) {
  let [loading, setLoading] = useState(false)

  let updatePricePerHour= useFormik({
    initialValues:{
      slot_price:0
    },
    onSubmit: async (values) => {
      console.log({ values });
      setLoading(true)

      await axios.put(`http://128.16.66.98:9090/api/Configs/slot-price`,values).then(res=>{
        console.log({res});
      setLoading(false)
      notify({msg:"update Slots Price", type:"success"})


      }).catch(err=>{
        console.log(err);
        setLoading(false)
      })
    }
  })
  useEffect(()=>{},[loading])
  return (
    <>

    <form onSubmit={updatePricePerHour.handleSubmit} className="flex justify-between items-center  gap-5 w-[90%] my-3">
      <Input  onChange={updatePricePerHour.handleChange} onBlur={updatePricePerHour.handleBlur} name="slot_price" defaultValue={ele.slot_price} placeholder="price Per Hour" className="" />
      <Button type="submit" className="bg-[#09c] text-white">
        {loading?  <Spinner color="current" /> :"Save"}
      </Button>
    </form>
    
    
    </>
  );
}