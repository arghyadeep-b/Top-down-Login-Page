import React, { useContext } from "react";
import { useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { downloadFile } from "./downloadFile";
import Axios from "axios";



export function SignupForm(props) {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });



  // this exists to download the JSON data so we know its being converted correctly
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a); // append the link to the document body
    a.click(); // simulate a click event on the link
    window.URL.revokeObjectURL(url); // revoke the object URL
    document.body.removeChild(a); // remove the link from the document body
  };

  // Send user data to the backend
  const register = async (e) => {
    e.preventDefault()

    await Axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData,
      withCredentials: true,
      url: "/register",
    }).then((res) => {
      console.log(res.data)
      switchToSignin()
    }).catch((err) => {
      console.error(err)
    })
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const jsonString = JSON.stringify(formData);

  //   downloadFile({
  //     data: jsonString,
  //     fileName: "form-data.json",
  //     fileType: "text/json"
  //   })
  // }



  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer onSubmit={register}>
        <Input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <Input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <Input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={register}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
