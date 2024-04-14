import { Button, Input, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";

export function FormForVisitPrice({ele}) {
  let [loading, setLoading] = useState(false)


  let updateVisitPrice = useFormik({
    initialValues:{
      visit_price:ele.visit_price
    },
    onSubmit: async (values) => {
      console.log({ values });
      setLoading(true)

      await axios.put(`http://128.16.66.98:9090/api/Configs/visit-price`,values).then(res=>{
        console.log({res});
        setLoading(false)
        notify({msg:"update Visit Price Successfully", type:"success"})



      }).catch(err=>{
        console.log(err);
        setLoading(false)
      })
    }
  })
  useEffect(()=>{},[loading])
  return (
    <>
    <form onSubmit={updateVisitPrice.handleSubmit} className="flex justify-between items-center gap-5 w-[90%] my-3">
      <Input name="visit_price" onChange={updateVisitPrice.handleChange} onBlur={updateVisitPrice.handleBlur} defaultValue={ele.visit_price} placeholder="visit price" className="" />
      <Button type="submit" className="bg-[#09c] text-white">
      {loading?  <Spinner color="current" /> :"Save"}
      </Button>
    </form>
    
    
    </>
  );
}