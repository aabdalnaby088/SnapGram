import  {useCallback, useState} from 'react'
import { FileWithPath, useDropzone } from "react-dropzone";

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

type ProfileUploaderProps = {
    fieldChange: (files: File[]) => void;
    imageUrl: string;
};
export default function ProfileUploader({ fieldChange ,  imageUrl }: ProfileUploaderProps) {
    const [file , setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState<string>(imageUrl);
    // console.log(imageUrl);

    const onDrop = useCallback( (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles)
            fieldChange(acceptedFiles)
            setFileUrl(convertFileToUrl(acceptedFiles[0]))
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
        <input {...getInputProps()} className='cursor-pointer' />
        {
            <div className='cursor-pointer flex-center gap-4'>
                            <img
            src={fileUrl || "/assets/icons/profile-placeholder.svg"}
            alt="image"
            className="h-24 w-24 rounded-full object-cover object-top"
            />
            <p className="text-primary-500 small-regular md:bbase-semibold">
            Change profile photo
        </p>
            </div>
        }
        </div>
    )
}