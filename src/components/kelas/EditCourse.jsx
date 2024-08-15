'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import TitleCard from "../ui/TitleCard"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import toast from "react-hot-toast";
import axios from "axios"
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button"

export default function EditCourse() {
    const params = useParams()
    const router = useRouter()
    const {data:session} = useSession()
    const [loading, setLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        id: params.courseId,
        mentorId: session?.user.id,
        image:"",
        title:"", 
        description:"", 
        price:"", 
        discPrice:"",
        categoryId:"",
        limitSeat:"",
        modul1title:"",
        modul1desc:"",
        modul2title:"",
        modul2desc:"",
        modul3title:"",
        modul3desc:"",
        modul4title:"",
        modul4desc:"",
        modul5title:"",
        modul5desc:"",
        benefit1:"",
        benefit2:"",
        career:"",
        isPublished: true,
    })
    const { image, title, description, price, categoryId } = formValues;
    const [options, setOptions] = useState([])

    const getCourse = async () => { 
        try {
            const response = await axios.get(`/api/courses/detail/${params.courseId}`)
            console.log(response.data)
            setFormValues(response.data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };

    async function fetchData() {
        // Fetch data
        const { data } = await axios.get("/api/courses/category");
        const results = []
        console.log("my category :", data)
        data.forEach((value) => {
          results.push({
            label: value.name,
            value: value.id,
          });
        });

        setOptions([
          {key: 'Select a company', value: ''}, 
          ...results
        ])
    }

    useEffect(() => {
        getCourse()
        fetchData();
    }, []);

    async function handleSubmit() {
        setLoading(true);
        try {
            const response = await fetch('/api/courses/edit', {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            
            if (response.ok) {
                toast.success("Berhasil mengubah data kelas");
                router.push('/course')
                setLoading(false);
            } 
        }   catch (error) {
                console.error("Network Error:", error);
                setLoading(false);
        }
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(formValues);
    };

    const saveAvatar = (url) => {
      setFormValues(formValues => ({
          ...formValues,
          image : url
      }))
    }

    const handleSelect = (value, meta) => {
      setFormValues({ ...formValues, [meta.name]: value.value});
      console.log(formValues)
    };


    return(
      <TitleCard title="Edit Course" topMargin="mt-2"  >
        <ImageUpload onUploadSuccess={saveAvatar} url={image} sizes="w-[400px] h-[200px]" btnWidth="w-[400px] " />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
                type="text"
                value={title}
                placeholder="Course Title"
                label="Title"
                name="title"
                onChange={handleChange}
            />
            <InputField
                type="text"
                value={description}
                placeholder="Course Description"
                label="Description"
                name="description"
                onChange={handleChange}
            />
            <InputField
                type="number"
                value={price}
                placeholder="Course Price"
                label="Price"
                name="price"
                onChange={handleChange}
            />
            <InputField
                type="number"
                value={formValues.discPrice}
                placeholder="Discount Price"
                label="Discount Price"
                name="discPrice"
                onChange={handleChange}
            />
            <InputField
                type="number"
                value={formValues.limitSeat}
                label="Seat Available"
                placeholder="30"
                name="limitSeat"
                onChange={handleChange}
            />
            <SelectField
              value={options.find(({value}) => value === formValues.categoryId)}
              label="Course Category"
              name="categoryId"
              options={options}
              onChange={(value, meta) => handleSelect(value, meta)}
            />
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            type="text"
            value={formValues.modul1title}
            label="Judul Modul 1"
            placeholder="Modul 1"
            name="modul1title"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul1desc}
            label="Deskripsi Modul 1"
            placeholder="Modul 1"
            name="modul1desc"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul2title}
            label="Judul Modul 2"
            placeholder="Modul 2"
            name="modul2title"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul2desc}
            label="Deskripsi Modul 2"
            placeholder="Modul 2"
            name="modul2desc"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul3title}
            label="Judul Modul 3"
            placeholder="Modul 3"
            name="modul3title"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul3desc}
            label="Deskripsi Modul 3"
            placeholder="Modul 3"
            name="modul3desc"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul4title}
            label="Judul Modul 4"
            placeholder="Modul 4"
            name="modul4title"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul4desc}
            label="Deskripsi Modul 4"
            placeholder="Modul 4"
            name="modul4desc"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul5title}
            label="Judul Modul 5"
            placeholder="Modul 5"
            name="modul5title"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.modul5desc}
            label="Deskripsi Modul 5"
            placeholder="Modul 5"
            name="modul5desc"
            onChange={handleChange}
          />
        </div>

        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InputField
            type="text"
            value={formValues.benefit1}
            label="Keunggulan Kelas"
            placeholder="Mendapat Sertifikat"
            name="benefit1"
            onChange={handleChange}
          />
          <InputField
            type="text"
            value={formValues.benefit2}
            label="Keunggulan Kelas"
            placeholder="Dicari oleh perusahaan besar"
            name="benefit2"
            onChange={handleChange}
          />
        </div>

        <Button handleSubmit={handleSubmit} text={"Submit Edit Course"} loading={loading} />
      </TitleCard>
    )
}